import { SlotType, type SetPropFlags } from "@jitl/quickjs-ffi-types"
import { describe, expect, it } from "vitest"
import { CommandRef, type CommandRef as CommandRefType } from "./command-types"
import {
  NoSpillBatchCutPolicy,
  PlanCode,
  RefLocation,
  type BatchStateView,
  type CommandCount,
  type CommandPc,
  type CommandPcOrNone,
  type DiagnosticsSink,
  type PlannerEmitter,
  type PrepassView,
  type RefStateView,
  type SlotIndex,
  type SlotIndexOrNone,
  type SlotPlanner,
  type SpillPtr,
} from "./CommandExecutorPolicy"
import type { Command } from "./ops"
import * as Ops from "./ops"

type RefMetadata = {
  firstUse?: CommandPc
  lastUse?: CommandPc
  producedAt?: CommandPcOrNone
  returned?: boolean
  executorOwned?: boolean
}

class FakePrepass implements PrepassView {
  private readonly metadata = new Map<number, RefMetadata>()

  set(ref: CommandRefType, metadata: RefMetadata): void {
    this.metadata.set(ref as number, metadata)
  }

  firstUse(ref: CommandRefType): CommandPc {
    return this.metadata.get(ref as number)?.firstUse ?? -1
  }

  lastUse(ref: CommandRefType): CommandPc {
    return this.metadata.get(ref as number)?.lastUse ?? -1
  }

  nextUseAfter(ref: CommandRefType, pc: CommandPc): CommandPcOrNone {
    const lastUse = this.lastUse(ref)
    return lastUse > pc ? lastUse : -1
  }

  producedAt(ref: CommandRefType): CommandPcOrNone {
    return this.metadata.get(ref as number)?.producedAt ?? -1
  }

  isReturned(ref: CommandRefType): boolean {
    return this.metadata.get(ref as number)?.returned ?? false
  }

  isExecutorOwned(ref: CommandRefType): boolean {
    return this.metadata.get(ref as number)?.executorOwned ?? true
  }
}

type RefStateRecord = {
  location: RefLocation
  slot: SlotIndex
  spillPtr: SpillPtr
}

class FakeRefs implements RefStateView {
  private readonly records = new Map<number, RefStateRecord>()

  set(
    ref: CommandRefType,
    location: RefLocation,
    slot: SlotIndex = -1,
    spillPtr: SpillPtr = -1,
  ): void {
    this.records.set(ref as number, { location, slot, spillPtr })
  }

  location(ref: CommandRefType): RefLocation {
    return this.record(ref).location
  }

  slotOf(ref: CommandRefType): SlotIndex {
    return this.record(ref).slot
  }

  spillPtrOf(ref: CommandRefType): SpillPtr {
    return this.record(ref).spillPtr
  }

  markInSlot(ref: CommandRefType, slot: SlotIndex): void {
    const record = this.record(ref)
    record.location = RefLocation.IN_SLOT
    record.slot = slot
    record.spillPtr = -1
  }

  markSpilled(ref: CommandRefType, spillPtr: SpillPtr): void {
    const record = this.record(ref)
    record.location = RefLocation.SPILLED
    record.slot = -1
    record.spillPtr = spillPtr
  }

  markDead(ref: CommandRefType): void {
    const record = this.record(ref)
    record.location = RefLocation.DEAD
    record.slot = -1
    record.spillPtr = -1
  }

  private record(ref: CommandRefType): RefStateRecord {
    const record = this.records.get(ref as number)
    if (!record) {
      throw new Error(`Unknown ref ${ref}`)
    }
    return record
  }
}

class FakeSlots implements SlotPlanner {
  private readonly freeByBank = new Map<number, SlotIndex[]>()

  constructor(capacities: Readonly<Record<number, number>>) {
    for (const [bankKey, capacity] of Object.entries(capacities)) {
      const bank = Number(bankKey)
      const free: SlotIndex[] = []
      for (let slot = capacity - 1; slot >= 0; slot--) {
        free.push(slot)
      }
      this.freeByBank.set(bank, free)
    }
  }

  tryAlloc(bank: number): SlotIndexOrNone {
    const free = this.freeByBank.get(bank)
    if (!free || free.length === 0) {
      return -1
    }
    return free.pop() as SlotIndex
  }

  free(bank: number, slot: SlotIndex): void {
    const free = this.freeByBank.get(bank)
    if (!free) {
      throw new Error(`Unknown bank ${bank}`)
    }
    free.push(slot)
  }

  forEachLiveRefInBank(): void {
    // Not needed by NoSpillBatchCutPolicy.
  }

  available(bank: number): number {
    return this.freeByBank.get(bank)?.length ?? 0
  }
}

class FakeBatch implements BatchStateView {
  encodedInBatch = 0

  constructor(private readonly capacity: CommandCount) {}

  remainingCommandCapacity(): CommandCount {
    return this.capacity - this.encodedInBatch
  }

  isEmpty(): boolean {
    return this.encodedInBatch === 0
  }

  onCommandEncoded(): void {
    this.encodedInBatch++
  }
}

class FakeEmitter implements PlannerEmitter {
  readonly plannedPcs: CommandPc[] = []
  readonly plannerOps: Command[] = []

  constructor(private readonly batch: FakeBatch) {}

  emitPlannerOp(op: Command): void {
    this.plannerOps.push(op)
    this.batch.onCommandEncoded()
  }

  emitSourceCommand(pc: CommandPc): void {
    this.plannedPcs.push(pc)
    this.batch.onCommandEncoded()
  }
}

class FakeDiagnostics implements DiagnosticsSink {
  readonly messages: string[] = []

  setFatalPlanningError(message: string): void {
    this.messages.push(message)
  }
}

function jsRef(id: number): CommandRefType {
  return CommandRef(SlotType.JSValueSlotType, id)
}

describe("NoSpillBatchCutPolicy", () => {
  it("plans command, assigns slots, and releases dead refs", () => {
    const policy = new NoSpillBatchCutPolicy()
    const prepass = new FakePrepass()
    const refs = new FakeRefs()
    const slots = new FakeSlots({ [SlotType.JSValueSlotType]: 1 })
    const batch = new FakeBatch(8)
    const emit = new FakeEmitter(batch)
    const diagnostics = new FakeDiagnostics()

    const out = jsRef(1)
    refs.set(out, RefLocation.UNMATERIALIZED)
    prepass.set(out, { producedAt: 0, lastUse: -1, returned: false })

    policy.begin({
      commands: [Ops.NewObjectCmd(out as any)],
      prepass,
      refs,
      slots,
      batch,
      emit,
      spill: null,
      diagnostics,
    })

    const result = policy.planAt(0)
    expect(result).toBe(PlanCode.PLANNED)
    expect(emit.plannedPcs).toEqual([0])
    expect(emit.plannerOps).toHaveLength(1)
    expect(emit.plannerOps[0]?.opcode).toBe(Ops.SLOT_FREE)
    expect(refs.location(out)).toBe(RefLocation.DEAD)
    expect(slots.available(SlotType.JSValueSlotType)).toBe(1)
    expect(diagnostics.messages).toHaveLength(0)
  })

  it("returns batch-full when slot pressure exceeds capacity in non-empty batch", () => {
    const policy = new NoSpillBatchCutPolicy()
    const prepass = new FakePrepass()
    const refs = new FakeRefs()
    const slots = new FakeSlots({ [SlotType.JSValueSlotType]: 1 })
    const batch = new FakeBatch(8)
    const emit = new FakeEmitter(batch)
    const diagnostics = new FakeDiagnostics()

    const a = jsRef(1)
    const b = jsRef(2)
    refs.set(a, RefLocation.UNMATERIALIZED)
    refs.set(b, RefLocation.UNMATERIALIZED)
    prepass.set(a, { producedAt: 0, lastUse: 1, returned: false })
    prepass.set(b, { producedAt: 1, lastUse: -1, returned: false })

    policy.begin({
      commands: [Ops.NewObjectCmd(a as any), Ops.NewObjectCmd(b as any)],
      prepass,
      refs,
      slots,
      batch,
      emit,
      spill: null,
      diagnostics,
    })

    expect(policy.planAt(0)).toBe(PlanCode.PLANNED)
    expect(refs.location(a)).toBe(RefLocation.IN_SLOT)
    expect(batch.isEmpty()).toBe(false)

    const second = policy.planAt(1)
    expect(second).toBe(PlanCode.BATCH_FULL_BEFORE_COMMAND)
    expect(emit.plannedPcs).toEqual([0])
    expect(diagnostics.messages).toHaveLength(0)
  })

  it("returns fatal-capacity for commands that cannot fit in an empty batch", () => {
    const policy = new NoSpillBatchCutPolicy()
    const prepass = new FakePrepass()
    const refs = new FakeRefs()
    const slots = new FakeSlots({ [SlotType.JSValueSlotType]: 2 })
    const batch = new FakeBatch(8)
    const emit = new FakeEmitter(batch)
    const diagnostics = new FakeDiagnostics()

    const target = jsRef(1)
    const key = jsRef(2)
    const value = jsRef(3)
    refs.set(target, RefLocation.UNMATERIALIZED)
    refs.set(key, RefLocation.UNMATERIALIZED)
    refs.set(value, RefLocation.UNMATERIALIZED)
    prepass.set(target, { lastUse: 0 })
    prepass.set(key, { lastUse: 0 })
    prepass.set(value, { lastUse: 0 })

    policy.begin({
      commands: [Ops.SetValueValueCmd(target as any, key as any, value as any, 0 as SetPropFlags)],
      prepass,
      refs,
      slots,
      batch,
      emit,
      spill: null,
      diagnostics,
    })

    const result = policy.planAt(0)
    expect(result).toBe(PlanCode.FATAL_CAPACITY_ERROR)
    expect(diagnostics.messages[0]).toContain("cannot fit command")
    expect(emit.plannedPcs).toHaveLength(0)
  })

  it("fails when a command requires spill restore", () => {
    const policy = new NoSpillBatchCutPolicy()
    const prepass = new FakePrepass()
    const refs = new FakeRefs()
    const slots = new FakeSlots({ [SlotType.JSValueSlotType]: 2 })
    const batch = new FakeBatch(8)
    const emit = new FakeEmitter(batch)
    const diagnostics = new FakeDiagnostics()

    const target = jsRef(1)
    refs.set(target, RefLocation.SPILLED, -1, 128)
    prepass.set(target, { lastUse: 0 })

    policy.begin({
      commands: [Ops.SetStrNullCmd(target as any, 0 as SetPropFlags, "k")],
      prepass,
      refs,
      slots,
      batch,
      emit,
      spill: null,
      diagnostics,
    })

    const result = policy.planAt(0)
    expect(result).toBe(PlanCode.FATAL_CAPACITY_ERROR)
    expect(diagnostics.messages[0]).toContain("cannot restore spilled ref")
    expect(emit.plannedPcs).toHaveLength(0)
  })
})
