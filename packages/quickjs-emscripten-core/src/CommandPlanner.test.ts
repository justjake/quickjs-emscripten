import assert from "assert"
import * as fs from "fs"
import * as path from "path"
import { describe, it } from "vitest"
import type { CommandRef } from "./command-types"
import { CommandBuilder } from "./CommandBuilder"
import {
  type BankId,
  type CommandOperandAccessors,
  type CommandShape,
  type ExecuteCommandPlanOptions,
  type QuickJSBatchDriver,
  QuickJSBatchExecutionError,
  executeCommandPlan,
  packRef,
  refBankId,
} from "./CommandPlanner"
import type { QuickJSContext } from "./context"
import { QuickJSWrongOwner } from "./errors"
import { HostRefMap } from "./host-ref"
import { JSValueLifetime } from "./lifetime"
import * as Op from "./ops"
import { appendStructuredClone } from "./StructuredCloneCommandProducer"
import type { QuickJSHandle } from "./types"

const JS_VALUE_BANK = 0 as const
const FUNC_LIST_BANK = 1 as const

type EmittedCommand = {
  type: "command"
  kind: string
  readSlots: string[]
  writeSlots: string[]
  indexInBatch: number
}

type EmittedFree = {
  type: "free"
  bankId: BankId
  slot: number
  indexInBatch: number
}

type EmittedRecord = EmittedCommand | EmittedFree

type ParkedAlias = {
  token: number
}

type TestCommand = CommandShape & {
  readA?: CommandRef
  readB?: CommandRef
  write?: CommandRef
}

const NO_OPERAND_ACCESSORS: CommandOperandAccessors<CommandShape> = {
  forEachReadRef() {},
  forEachWriteRef() {},
}

const TEST_OPERAND_ACCESSORS: CommandOperandAccessors<TestCommand> = {
  forEachReadRef(command, visit) {
    if (command.readA !== undefined) visit(command.readA)
    if (command.readB !== undefined) visit(command.readB)
  },
  forEachWriteRef(command, visit) {
    if (command.write !== undefined) visit(command.write)
  },
}

class FakeDriver<TCommand extends CommandShape = CommandShape> implements QuickJSBatchDriver<
  TCommand,
  ParkedAlias
> {
  readonly emitted: EmittedRecord[] = []
  readonly batchSizes: number[] = []
  readonly setSlotCalls: Array<{ bankId: BankId; slot: number; alias: ParkedAlias }> = []
  readonly getSlotCalls: Array<{ bankId: BankId; slot: number; alias: ParkedAlias }> = []

  private nextAlias = 1

  constructor(
    private readonly slotCapacities: readonly number[],
    readonly commandCapacity: number,
    readonly bankCount: number = slotCapacities.length,
    private executeOverride?: (count: number) => number,
    private operandAccessors: CommandOperandAccessors<TCommand> = NO_OPERAND_ACCESSORS as CommandOperandAccessors<TCommand>,
  ) {}

  getSlotCapacity(bankId: BankId): number {
    const capacity = this.slotCapacities[bankId]
    if (capacity === undefined) {
      throw new Error(`No slot capacity configured for bank ${bankId}`)
    }
    return capacity
  }

  emit(command: TCommand, resolveSlot: (ref: CommandRef) => number, indexInBatch: number): void {
    const readSlots: string[] = []
    const writeSlots: string[] = []
    this.operandAccessors.forEachReadRef(command, (ref) => {
      readSlots.push(`${refBankId(ref)}:${resolveSlot(ref)}`)
    })
    this.operandAccessors.forEachWriteRef(command, (ref) => {
      writeSlots.push(`${refBankId(ref)}:${resolveSlot(ref)}`)
    })
    this.emitted.push({
      type: "command",
      kind: command.label ?? String(command.kind),
      readSlots,
      writeSlots,
      indexInBatch,
    })
  }

  emitFree(bankId: BankId, slot: number, indexInBatch: number): void {
    this.emitted.push({
      type: "free",
      bankId,
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

  getSlot(bankId: BankId, slot: number): ParkedAlias {
    const alias = { token: this.nextAlias++ }
    this.getSlotCalls.push({ bankId, slot, alias })
    return alias
  }

  setSlot(bankId: BankId, slot: number, alias: ParkedAlias): void {
    this.setSlotCalls.push({ bankId, slot, alias })
  }
}

function ref(bankId: BankId, valueId: number): CommandRef {
  return packRef(bankId, valueId)
}

function makeOwnedHandle(owner: unknown): QuickJSHandle {
  return new JSValueLifetime(0 as any, undefined, undefined, owner) as unknown as QuickJSHandle
}

function makeCloneContext(owner: unknown = { name: "owner" }): QuickJSContext {
  const runtime = {
    hostRefs: new HostRefMap(),
    assertOwned(handle: QuickJSHandle) {
      if (handle.owner && handle.owner !== owner) {
        throw new QuickJSWrongOwner("Handle is not owned by target runtime")
      }
    },
  }

  return {
    runtime,
    true: makeOwnedHandle(owner),
    false: makeOwnedHandle(owner),
    null: makeOwnedHandle(owner),
    undefined: makeOwnedHandle(owner),
  } as unknown as QuickJSContext
}

let nextKind = 1
function cmd(kind: string, config: Omit<TestCommand, "kind" | "label"> = {}): TestCommand {
  return {
    kind: nextKind++,
    label: kind,
    ...config,
  }
}

function runTestPlan(
  commands: readonly TestCommand[],
  driver: FakeDriver<TestCommand>,
  options: Omit<ExecuteCommandPlanOptions<ParkedAlias, TestCommand>, "operandAccessors"> = {},
) {
  return executeCommandPlan(commands, driver, {
    ...options,
    operandAccessors: TEST_OPERAND_ACCESSORS,
  })
}

describe("executeCommandPlan", () => {
  it("emits commands in order and inserts FREE at last use", () => {
    const driver = new FakeDriver<TestCommand>([8, 8], 256, 2, undefined, TEST_OPERAND_ACCESSORS)

    const commands = [
      cmd("NEW_A", { write: ref(JS_VALUE_BANK, 1) }),
      cmd("MAKE_B_FROM_A", { readA: ref(JS_VALUE_BANK, 1), write: ref(JS_VALUE_BANK, 2) }),
      cmd("RETURN_B", { readA: ref(JS_VALUE_BANK, 2) }),
    ]

    const result = runTestPlan(commands, driver, {
      retainedRefs: [ref(JS_VALUE_BANK, 2)],
    })

    assert.strictEqual(result.commandsExecuted, 4)
    assert.strictEqual(driver.batchSizes.length, 1)

    const recordKinds = driver.emitted.map((r) => (r.type === "free" ? `FREE:${r.bankId}` : r.kind))
    assert.deepStrictEqual(recordKinds, ["NEW_A", "MAKE_B_FROM_A", "FREE:0", "RETURN_B"])
  })

  it("enforces hard barriers by flushing around barrier commands", () => {
    const driver = new FakeDriver<TestCommand>([8, 8], 256, 2, undefined, TEST_OPERAND_ACCESSORS)

    const commands = [
      cmd("A", { write: ref(JS_VALUE_BANK, 1) }),
      cmd("CALL", { readA: ref(JS_VALUE_BANK, 1), write: ref(JS_VALUE_BANK, 2), barrier: true }),
      cmd("B", { readA: ref(JS_VALUE_BANK, 2) }),
    ]

    runTestPlan(commands, driver, {
      retainedRefs: [ref(JS_VALUE_BANK, 2)],
    })

    assert.ok(driver.batchSizes.length >= 3)
    assert.strictEqual(driver.batchSizes[0], 1)
    assert.strictEqual(driver.batchSizes[driver.batchSizes.length - 1], 1)
  })

  it("splits batches at command capacity", () => {
    const driver = new FakeDriver<TestCommand>([8, 8], 2, 2, undefined, TEST_OPERAND_ACCESSORS)

    const commands = [
      cmd("A", { write: ref(JS_VALUE_BANK, 1) }),
      cmd("B", { readA: ref(JS_VALUE_BANK, 1), write: ref(JS_VALUE_BANK, 2) }),
      cmd("C", { readA: ref(JS_VALUE_BANK, 2), write: ref(JS_VALUE_BANK, 3) }),
    ]

    runTestPlan(commands, driver, {
      retainedRefs: [ref(JS_VALUE_BANK, 3)],
    })

    assert.ok(driver.batchSizes.length >= 2)
    assert.ok(driver.batchSizes.every((size) => size <= 2))
    assert.ok(driver.batchSizes.some((size) => size === 2))
  })

  it("parks and restores slots when resident pressure exceeds slot capacity", () => {
    const driver = new FakeDriver<TestCommand>([2, 2], 256, 2, undefined, TEST_OPERAND_ACCESSORS)

    const commands = [
      cmd("V1", { write: ref(JS_VALUE_BANK, 1) }),
      cmd("V2", { write: ref(JS_VALUE_BANK, 2) }),
      cmd("V3_FROM_V1", { readA: ref(JS_VALUE_BANK, 1), write: ref(JS_VALUE_BANK, 3) }),
      cmd("USE_V2_V3", { readA: ref(JS_VALUE_BANK, 2), readB: ref(JS_VALUE_BANK, 3) }),
    ]

    runTestPlan(commands, driver, {
      retainedRefs: [ref(JS_VALUE_BANK, 3)],
      enableFastPath: false,
    })

    assert.ok(driver.getSlotCalls.length >= 1)
    assert.ok(driver.setSlotCalls.length >= 1)
  })

  it("tracks banks independently and frees in the correct bank", () => {
    const driver = new FakeDriver<TestCommand>([8, 1], 256, 2, undefined, TEST_OPERAND_ACCESSORS)

    const commands = [
      cmd("NEW_FUNC", { write: ref(FUNC_LIST_BANK, 10) }),
      cmd("USE_FUNC", { readA: ref(FUNC_LIST_BANK, 10) }),
    ]

    runTestPlan(commands, driver)

    const frees = driver.emitted.filter((x): x is EmittedFree => x.type === "free")
    assert.strictEqual(frees.length, 1)
    assert.strictEqual(frees[0].bankId, FUNC_LIST_BANK)
  })

  it("throws deterministic execution metadata on partial batch failure", () => {
    const driver = new FakeDriver<TestCommand>([8, 8], 256, 2, () => 1, TEST_OPERAND_ACCESSORS)

    const commands = [
      cmd("A", { write: ref(JS_VALUE_BANK, 1) }),
      cmd("B", { readA: ref(JS_VALUE_BANK, 1), write: ref(JS_VALUE_BANK, 2) }),
    ]

    assert.throws(
      () => runTestPlan(commands, driver),
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

describe("appendStructuredClone", () => {
  it("preserves cycles and shared references", () => {
    const context = makeCloneContext()
    const builder = new CommandBuilder(context)
    const shared: Record<string, unknown> = { x: 1 }
    const root: Record<string, unknown> = { a: shared, b: shared }
    root.self = root

    appendStructuredClone(builder, root)

    const commands = builder.getCommands()
    const newObjectCount = commands.filter((command) => command.kind === Op.NEW_OBJECT).length
    assert.strictEqual(newObjectCount, 2)
  })

  it("emits NEW_MAP/NEW_SET and their mutator commands", () => {
    const context = makeCloneContext()
    const builder = new CommandBuilder(context)
    const input = {
      m: new Map<unknown, unknown>([["k", 1]]),
      s: new Set<unknown>([2]),
    }

    appendStructuredClone(builder, input)
    const kinds = builder.getCommands().map((command) => command.kind)
    assert.ok(kinds.includes(Op.NEW_MAP))
    assert.ok(kinds.includes(Op.NEW_SET))
    assert.ok(kinds.includes(Op.MAP_SET))
    assert.ok(kinds.includes(Op.SET_ADD))
  })

  it("collects embedded handles once per identity", () => {
    const owner = { name: "owner" }
    const context = makeCloneContext(owner)
    const builder = new CommandBuilder(context)
    const handle = makeOwnedHandle(owner)

    const result = appendStructuredClone(builder, { a: handle, b: handle })
    assert.strictEqual(result.encounteredHandles.size, 1)
    assert.strictEqual(result.encounteredHandles.has(handle), true)
  })

  it("throws on wrong-owner handles", () => {
    const targetOwner = { name: "target" }
    const wrongOwner = { name: "wrong" }
    const context = makeCloneContext(targetOwner)
    const builder = new CommandBuilder(context)
    const badHandle = makeOwnedHandle(wrongOwner)

    assert.throws(
      () => appendStructuredClone(builder, { bad: badHandle }),
      (error) => error instanceof QuickJSWrongOwner,
    )
  })

  it("appends commands without clearing existing builder state", () => {
    const context = makeCloneContext()
    const builder = new CommandBuilder(context)
    builder.newObject()
    const beforeCount = builder.getCommands().length

    appendStructuredClone(builder, { x: 1 })

    assert.strictEqual(beforeCount, 1)
    assert.ok(builder.getCommands().length > beforeCount)
    assert.strictEqual(builder.getCommands()[0]?.kind, Op.NEW_OBJECT)
  })
})

describe("generated command artifacts", () => {
  const srcDir = __dirname

  it("generates BaseCommand inheritance and omits runtime pointer metadata exports", () => {
    const opsSource = fs.readFileSync(path.join(srcDir, "ops.ts"), "utf8")
    assert.ok(opsSource.includes("export interface NewObjectCommand extends BaseCommand"))
    assert.ok(!opsSource.includes('from "./CommandPlanner"'))
    assert.ok(!opsSource.includes("COMMAND_PARAM_META"))
    assert.ok(!opsSource.includes("COMMAND_BARRIER"))
    assert.ok(!opsSource.includes("PointerParamConfig"))
  })

  it("generates planner accessors with variable-length argv reads", () => {
    const opsSource = fs.readFileSync(path.join(srcDir, "ops.ts"), "utf8")
    assert.ok(opsSource.includes("command.argv.forEach(visit)"))
  })
})
