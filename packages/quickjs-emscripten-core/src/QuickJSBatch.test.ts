import assert from "assert"
import { describe, it } from "vitest"
import { Lifetime } from "./lifetime"
import {
  QuickJSBatchExecutionError,
  type Command,
  type QuickJSBatchDriver,
  type ValueRef,
  buildStructuredCloneCommands,
  executeCommandPlan,
  executeStructuredClone,
  valueRef,
} from "./QuickJSBatch"
import { QuickJSWrongOwner } from "./errors"

const JS_VALUE_BANK = "jsValue" as const
const FUNC_LIST_BANK = "funcList" as const

type TestBank = typeof JS_VALUE_BANK | typeof FUNC_LIST_BANK

type TestOp = { kind: string }

type EmittedCommand = {
  type: "command"
  kind: string
  readSlots: string[]
  writeSlots: string[]
  indexInBatch: number
}

type EmittedFree = {
  type: "free"
  bank: TestBank
  slot: number
  indexInBatch: number
}

type EmittedRecord = EmittedCommand | EmittedFree

type ParkedAlias = {
  token: number
}

class FakeDriver implements QuickJSBatchDriver<TestOp, TestBank, ParkedAlias> {
  readonly emitted: EmittedRecord[] = []
  readonly batchSizes: number[] = []
  readonly setSlotCalls: Array<{ bank: TestBank; slot: number; alias: ParkedAlias }> = []
  readonly getSlotCalls: Array<{ bank: TestBank; slot: number; alias: ParkedAlias }> = []

  private nextAlias = 1

  constructor(
    readonly slotCapacities: Record<TestBank, number>,
    readonly commandCapacity: number,
    readonly slotBanks: readonly TestBank[] = [JS_VALUE_BANK, FUNC_LIST_BANK],
    private executeOverride?: (count: number) => number,
  ) {}

  getSlotCapacity(bank: TestBank): number {
    return this.slotCapacities[bank]
  }

  emit(
    command: Command<TestOp, TestBank>,
    resolveSlot: (ref: ValueRef<TestBank>) => number,
    indexInBatch: number,
  ): void {
    this.emitted.push({
      type: "command",
      kind: command.op.kind,
      readSlots: command.reads.map((ref) => `${ref.bank}:${resolveSlot(ref)}`),
      writeSlots: (command.writes ?? []).map((ref) => `${ref.bank}:${resolveSlot(ref)}`),
      indexInBatch,
    })
  }

  emitFree(bank: TestBank, slot: number, indexInBatch: number): void {
    this.emitted.push({
      type: "free",
      bank,
      slot,
      indexInBatch,
    })
  }

  executeBatch(commandCount: number): number {
    this.batchSizes.push(commandCount)
    if (this.executeOverride) {
      return this.executeOverride(commandCount)
    }
    return commandCount
  }

  getSlot(bank: TestBank, slot: number): ParkedAlias {
    const alias = { token: this.nextAlias++ }
    this.getSlotCalls.push({ bank, slot, alias })
    return alias
  }

  setSlot(bank: TestBank, slot: number, alias: ParkedAlias): void {
    this.setSlotCalls.push({ bank, slot, alias })
  }
}

function ref(bank: TestBank, valueId: number): ValueRef<TestBank> {
  return valueRef(bank, valueId)
}

function cmd(
  kind: string,
  reads: ValueRef<TestBank>[] = [],
  write?: ValueRef<TestBank>,
  isBarrier = false,
): Command<TestOp, TestBank> {
  return {
    op: { kind },
    reads,
    writes: write ? [write] : undefined,
    isBarrier,
  }
}

describe("executeCommandPlan", () => {
  it("emits commands in order and inserts FREE at last use", () => {
    const driver = new FakeDriver({
      jsValue: 8,
      funcList: 8,
    }, 256)

    const commands = [
      cmd("NEW_A", [], ref(JS_VALUE_BANK, 1)),
      cmd("MAKE_B_FROM_A", [ref(JS_VALUE_BANK, 1)], ref(JS_VALUE_BANK, 2)),
      cmd("RETURN_B", [ref(JS_VALUE_BANK, 2)]),
    ]

    const result = executeCommandPlan(commands, driver, {
      retainedRefs: [ref(JS_VALUE_BANK, 2)],
    })

    assert.strictEqual(result.commandsExecuted, 4)
    assert.strictEqual(driver.batchSizes.length, 1)

    const recordKinds = driver.emitted.map((r) => (r.type === "free" ? `FREE:${r.bank}` : r.kind))
    assert.deepStrictEqual(recordKinds, ["NEW_A", "MAKE_B_FROM_A", "FREE:jsValue", "RETURN_B"])
  })

  it("enforces hard barriers by flushing around barrier commands", () => {
    const driver = new FakeDriver({
      jsValue: 8,
      funcList: 8,
    }, 256)

    const commands = [
      cmd("A", [], ref(JS_VALUE_BANK, 1)),
      cmd("CALL", [ref(JS_VALUE_BANK, 1)], ref(JS_VALUE_BANK, 2), true),
      cmd("B", [ref(JS_VALUE_BANK, 2)]),
    ]

    executeCommandPlan(commands, driver, {
      retainedRefs: [ref(JS_VALUE_BANK, 2)],
    })

    assert.ok(driver.batchSizes.length >= 3)
    assert.strictEqual(driver.batchSizes[0], 1)
    assert.strictEqual(driver.batchSizes[driver.batchSizes.length - 1], 1)
  })

  it("splits batches at command capacity", () => {
    const driver = new FakeDriver({
      jsValue: 8,
      funcList: 8,
    }, 2)

    const commands = [
      cmd("A", [], ref(JS_VALUE_BANK, 1)),
      cmd("B", [ref(JS_VALUE_BANK, 1)], ref(JS_VALUE_BANK, 2)),
      cmd("C", [ref(JS_VALUE_BANK, 2)], ref(JS_VALUE_BANK, 3)),
    ]

    executeCommandPlan(commands, driver, {
      retainedRefs: [ref(JS_VALUE_BANK, 3)],
    })

    assert.ok(driver.batchSizes.length >= 2)
    assert.ok(driver.batchSizes.every((size) => size <= 2))
    assert.ok(driver.batchSizes.some((size) => size === 2))
  })

  it("parks and restores slots when resident pressure exceeds slot capacity", () => {
    const driver = new FakeDriver({
      jsValue: 2,
      funcList: 2,
    }, 256)

    const commands = [
      cmd("V1", [], ref(JS_VALUE_BANK, 1)),
      cmd("V2", [], ref(JS_VALUE_BANK, 2)),
      cmd("V3_FROM_V1", [ref(JS_VALUE_BANK, 1)], ref(JS_VALUE_BANK, 3)),
      cmd("USE_V2_V3", [ref(JS_VALUE_BANK, 2), ref(JS_VALUE_BANK, 3)]),
    ]

    executeCommandPlan(commands, driver, {
      retainedRefs: [ref(JS_VALUE_BANK, 3)],
      enableFastPath: false,
    })

    assert.ok(driver.getSlotCalls.length >= 1)
    assert.ok(driver.setSlotCalls.length >= 1)
  })

  it("tracks banks independently and frees in the correct bank", () => {
    const driver = new FakeDriver({
      jsValue: 8,
      funcList: 1,
    }, 256)

    const commands = [
      cmd("NEW_FUNC", [], ref(FUNC_LIST_BANK, 10)),
      cmd("USE_FUNC", [ref(FUNC_LIST_BANK, 10)]),
    ]

    executeCommandPlan(commands, driver)

    const frees = driver.emitted.filter((x): x is EmittedFree => x.type === "free")
    assert.strictEqual(frees.length, 1)
    assert.strictEqual(frees[0].bank, FUNC_LIST_BANK)
  })

  it("throws deterministic execution metadata on partial batch failure", () => {
    const driver = new FakeDriver(
      {
        jsValue: 8,
        funcList: 8,
      },
      256,
      [JS_VALUE_BANK, FUNC_LIST_BANK],
      () => 1,
    )

    const commands = [
      cmd("A", [], ref(JS_VALUE_BANK, 1)),
      cmd("B", [ref(JS_VALUE_BANK, 1)], ref(JS_VALUE_BANK, 2)),
    ]

    assert.throws(
      () => executeCommandPlan(commands, driver),
      (error) => {
        assert.ok(error instanceof QuickJSBatchExecutionError)
        assert.strictEqual(error.failedCommandIndex, 1)
        assert.strictEqual(error.executedInBatch, 1)
        assert.strictEqual(error.attemptedInBatch, 4)
        return true
      },
    )
  })
})

describe("buildStructuredCloneCommands", () => {
  it("creates a command graph for object cycles and shared references", () => {
    const shared: Record<string, unknown> = { x: 1 }
    const root: Record<string, unknown> = { a: shared, b: shared }
    root.self = root

    const built = buildStructuredCloneCommands(root)

    assert.ok(built.commands.length > 0)
    assert.ok(built.rootValueId >= 0)

    const loadCounts = built.commands.filter((c) => c.op.kind === "NEW_OBJECT").length
    assert.strictEqual(loadCounts, 2)
  })

  it("deduplicates moved handles and validates ownership", () => {
    const targetOwner = { name: "target" }
    const wrongOwner = { name: "wrong" }

    let disposedCount = 0
    const movedHandle = new Lifetime(
      1 as any,
      undefined,
      () => {
        disposedCount++
      },
      targetOwner,
    ) as any

    const input = {
      a: movedHandle,
      b: movedHandle,
    }

    const driver = new FakeDriver({
      jsValue: 16,
      funcList: 8,
    }, 256)

    executeStructuredClone({
      input,
      driver,
      options: {
        move: true,
        targetOwner,
      },
    })

    assert.strictEqual(disposedCount, 1)

    const badHandle = new Lifetime(2 as any, undefined, () => {}, wrongOwner) as any
    assert.throws(
      () =>
        buildStructuredCloneCommands({ bad: badHandle }, {
          targetOwner,
        }),
      (error) => error instanceof QuickJSWrongOwner,
    )
  })

  it("does not dispose moved handles if execution fails", () => {
    const targetOwner = { name: "target" }
    let disposedCount = 0
    const movedHandle = new Lifetime(
      1 as any,
      undefined,
      () => {
        disposedCount++
      },
      targetOwner,
    ) as any

    const driver = new FakeDriver(
      {
        jsValue: 16,
        funcList: 8,
      },
      256,
      [JS_VALUE_BANK, FUNC_LIST_BANK],
      () => 0,
    )

    assert.throws(() =>
      executeStructuredClone({
        input: { a: movedHandle },
        driver,
        options: {
          move: true,
          targetOwner,
        },
      }),
    )

    assert.strictEqual(disposedCount, 0)
  })
})
