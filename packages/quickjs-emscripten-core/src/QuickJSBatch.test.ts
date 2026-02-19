import assert from "assert"
import * as fs from "fs"
import * as path from "path"
import { describe, it } from "vitest"
import { Lifetime } from "./lifetime"
import {
  type CommandShape,
  type CommandOperandAccessors,
  QuickJSBatchExecutionError,
  type BankId,
  type ExecuteCommandPlanOptions,
  type LogicalRef,
  type QuickJSBatchDriver,
  STRUCTURED_CLONE_KIND,
  buildStructuredCloneCommands,
  executeCommandPlan,
  executeStructuredClone,
  packRef,
  refBankId,
} from "./QuickJSBatch"
import { QuickJSWrongOwner } from "./errors"

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
  readA?: LogicalRef
  readB?: LogicalRef
  write?: LogicalRef
  consumeReadA?: boolean
  consumeReadB?: boolean
}

const NO_OPERAND_ACCESSORS: CommandOperandAccessors<CommandShape> = {
  forEachReadRef() {},
  forEachWriteRef() {},
  forEachConsumedReadRef() {},
}

const TEST_OPERAND_ACCESSORS: CommandOperandAccessors<TestCommand> = {
  forEachReadRef(command, visit) {
    if (command.readA !== undefined) visit(command.readA)
    if (command.readB !== undefined) visit(command.readB)
  },
  forEachWriteRef(command, visit) {
    if (command.write !== undefined) visit(command.write)
  },
  forEachConsumedReadRef(command, visit) {
    if (command.consumeReadA) {
      if (command.readA === undefined) {
        throw new Error("consumeReadA requires readA")
      }
      visit(command.readA)
    }
    if (command.consumeReadB) {
      if (command.readB === undefined) {
        throw new Error("consumeReadB requires readB")
      }
      visit(command.readB)
    }
  },
}

class FakeDriver<TCommand extends CommandShape = CommandShape>
  implements QuickJSBatchDriver<TCommand, ParkedAlias>
{
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

  emit(command: TCommand, resolveSlot: (ref: LogicalRef) => number, indexInBatch: number): void {
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

function ref(bankId: BankId, valueId: number): LogicalRef {
  return packRef(bankId, valueId)
}

let nextKind = 1
function cmd(
  kind: string,
  config: Omit<TestCommand, "kind" | "label"> = {},
): TestCommand {
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

    const commands = [cmd("NEW_FUNC", { write: ref(FUNC_LIST_BANK, 10) }), cmd("USE_FUNC", { readA: ref(FUNC_LIST_BANK, 10) })]

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

  it("supports consumedReads and does not emit FREE for consumed values", () => {
    const driver = new FakeDriver<TestCommand>([8, 8], 256, 2, undefined, TEST_OPERAND_ACCESSORS)
    const consumed = ref(JS_VALUE_BANK, 1)
    const produced = ref(JS_VALUE_BANK, 2)

    const commands: TestCommand[] = [
      cmd("NEW_A", { write: consumed }),
      cmd("CONSUME_A_PRODUCE_B", { readA: consumed, consumeReadA: true, write: produced }),
      cmd("USE_B", { readA: produced }),
    ]

    runTestPlan(commands, driver, {
      retainedRefs: [produced],
    })
    const recordKinds = driver.emitted.map((r) => (r.type === "free" ? `FREE:${r.bankId}` : r.kind))
    assert.ok(!recordKinds.includes("FREE:0"))
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

    const loadCounts = built.commands.filter((c) => c.kind === STRUCTURED_CLONE_KIND.NEW_OBJECT).length
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

    const driver = new FakeDriver<any>([16, 8], 256)
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

    const driver = new FakeDriver<any>([16, 8], 256, 2, () => 0)

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
    const plannerSource = fs.readFileSync(path.join(srcDir, "ops-planner.generated.ts"), "utf8")
    assert.ok(plannerSource.includes("command.argv.forEach(visit)"))
  })
})
