import type { SlotType } from "@jitl/quickjs-ffi-types"
import { CommandRefType, type CommandRef } from "./command-types"
import {
  forEachConsumedRef,
  forEachReadRef,
  forEachWriteRef,
  type Command,
} from "./ops"

export const enum PlanCode {
  /** Command was admitted and emitted into the current batch. */
  PLANNED = 0,
  /** Command could not be admitted; executor should flush and retry the same command. */
  BATCH_FULL_BEFORE_COMMAND = 1,
  /** Command cannot fit in an empty batch under this policy. */
  FATAL_CAPACITY_ERROR = 2,
}

export const enum RefLocation {
  UNMATERIALIZED = 0,
  IN_SLOT = 1,
  SPILLED = 2,
  DEAD = 3,
}

/** Source command index in `commands` (0-based). */
export type CommandPc = number
/** Command count (non-negative integer). */
export type CommandCount = number
/** Source command index or sentinel `-1` (none / no failure). */
export type CommandPcOrNone = number
/** Slot index in a bank-local slot array (0-based). */
export type SlotIndex = number
/** Slot index or sentinel `-1` (allocation failure / unknown). */
export type SlotIndexOrNone = number
/** WASM byte pointer to spill storage. */
export type SpillPtr = number

export interface PolicyContext {
  /** Immutable source commands in source order (`pc` index). */
  readonly commands: readonly Command[]
  readonly prepass: PrepassView
  readonly refs: RefStateView
  readonly slots: SlotPlanner
  readonly batch: BatchStateView
  readonly emit: PlannerEmitter
  readonly spill: SpillFacade | null
  readonly diagnostics: DiagnosticsSink
}

export interface PrepassView {
  firstUse(ref: CommandRef): CommandPc
  lastUse(ref: CommandRef): CommandPc
  nextUseAfter(ref: CommandRef, pc: CommandPc): CommandPcOrNone
  producedAt(ref: CommandRef): CommandPcOrNone
  isReturned(ref: CommandRef): boolean
}

export interface RefStateView {
  location(ref: CommandRef): RefLocation
  slotOf(ref: CommandRef): SlotIndex
  spillPtrOf(ref: CommandRef): SpillPtr
  markInSlot(ref: CommandRef, slot: SlotIndex): void
  markSpilled(ref: CommandRef, spillPtr: SpillPtr): void
  markDead(ref: CommandRef): void
}

export interface SlotPlanner {
  tryAlloc(bank: SlotType): SlotIndexOrNone
  free(bank: SlotType, slot: SlotIndex): void
  forEachLiveRefInBank(
    bank: SlotType,
    visit: (ref: CommandRef, slot: SlotIndex) => void,
  ): void
}

export interface BatchStateView {
  remainingCommandCapacity(): CommandCount
  isEmpty(): boolean
}

export interface PlannerEmitter {
  emitPlannerOp(op: Command): void
  emitSourceCommand(pc: CommandPc): void
}

export interface SpillFacade {
  allocateSpill(bank: SlotType): SpillPtr
  emitStore(bank: SlotType, slot: SlotIndex, spillPtr: SpillPtr): void
  emitLoad(bank: SlotType, slot: SlotIndex, spillPtr: SpillPtr): void
}

export interface DiagnosticsSink {
  setFatalPlanningError(message: string): void
}

export abstract class BasePolicy {
  /**
   * Called once at execute() start before any command planning.
   * Implementations may reset scratch state and retain `ctx` for later calls.
   * Implementations must not emit commands from `begin`.
   */
  abstract begin(ctx: PolicyContext): void
  /**
   * Plans source command `pc`.
   * The same `pc` may be presented multiple times if the prior result was
   * `BATCH_FULL_BEFORE_COMMAND` and the executor retried after flushing.
   */
  abstract planAt(pc: CommandPc): PlanCode
  /**
   * Called after each batch flush returns from C.
   * `batchStartPc`/`batchLen` describe the submitted source-command span and
   * `successfulInBatch` is the returned success count for that flush.
   */
  abstract onBatchFlushed(
    batchStartPc: CommandPc,
    batchLen: CommandCount,
    successfulInBatch: CommandCount,
  ): void
  /**
   * Called once before execute() returns.
   * `failedPc` is `-1` when execution fully succeeds.
   */
  abstract end(totalSuccessful: CommandCount, failedPc: CommandPcOrNone): void
}

type PendingAllocation = {
  ref: CommandRef
  bank: SlotType
  slot: SlotIndex
}

function pushUniqueRef(refs: CommandRef[], ref: CommandRef): void {
  for (let i = 0; i < refs.length; i++) {
    if (refs[i] === ref) {
      return
    }
  }
  refs.push(ref)
}

export class NoSpillBatchCutPolicy extends BasePolicy {
  private ctx?: PolicyContext
  private readonly readRefs: CommandRef[] = []
  private readonly writeRefs: CommandRef[] = []
  private readonly touchedRefs: CommandRef[] = []
  private readonly allocations: PendingAllocation[] = []

  begin(ctx: PolicyContext): void {
    this.ctx = ctx
    this.readRefs.length = 0
    this.writeRefs.length = 0
    this.touchedRefs.length = 0
    this.allocations.length = 0
  }

  planAt(pc: CommandPc): PlanCode {
    const ctx = this.assertBegun()

    const remainingCapacity = ctx.batch.remainingCommandCapacity()
    if (remainingCapacity <= 0) {
      if (ctx.batch.isEmpty()) {
        ctx.diagnostics.setFatalPlanningError(
          "NoSpillBatchCutPolicy cannot plan command: empty batch has zero command capacity",
        )
        return PlanCode.FATAL_CAPACITY_ERROR
      }
      return PlanCode.BATCH_FULL_BEFORE_COMMAND
    }

    const command = ctx.commands[pc]
    if (!command) {
      ctx.diagnostics.setFatalPlanningError(`Invalid command index: ${pc}`)
      return PlanCode.FATAL_CAPACITY_ERROR
    }

    this.collectRefs(command)

    for (let i = 0; i < this.readRefs.length; i++) {
      const ref = this.readRefs[i]
      const location = ctx.refs.location(ref)
      switch (location) {
        case RefLocation.IN_SLOT:
          break
        case RefLocation.UNMATERIALIZED:
          if (!this.reserveSlot(ref)) {
            return this.onSlotExhausted(pc, ref)
          }
          break
        case RefLocation.SPILLED:
          this.clearPendingAllocations()
          ctx.diagnostics.setFatalPlanningError(
            `NoSpillBatchCutPolicy cannot restore spilled ref ${ref} at command ${pc}`,
          )
          return PlanCode.FATAL_CAPACITY_ERROR
        case RefLocation.DEAD:
          this.clearPendingAllocations()
          ctx.diagnostics.setFatalPlanningError(
            `NoSpillBatchCutPolicy read dead ref ${ref} at command ${pc}`,
          )
          return PlanCode.FATAL_CAPACITY_ERROR
        default:
          this.clearPendingAllocations()
          ctx.diagnostics.setFatalPlanningError(
            `NoSpillBatchCutPolicy encountered unknown ref location for ref ${ref}`,
          )
          return PlanCode.FATAL_CAPACITY_ERROR
      }
    }

    for (let i = 0; i < this.writeRefs.length; i++) {
      const ref = this.writeRefs[i]
      const location = ctx.refs.location(ref)
      switch (location) {
        case RefLocation.UNMATERIALIZED:
        case RefLocation.DEAD:
          if (!this.reserveSlot(ref)) {
            return this.onSlotExhausted(pc, ref)
          }
          break
        case RefLocation.IN_SLOT:
        case RefLocation.SPILLED:
          this.clearPendingAllocations()
          ctx.diagnostics.setFatalPlanningError(
            `NoSpillBatchCutPolicy cannot write already-live ref ${ref} at command ${pc}`,
          )
          return PlanCode.FATAL_CAPACITY_ERROR
        default:
          this.clearPendingAllocations()
          ctx.diagnostics.setFatalPlanningError(
            `NoSpillBatchCutPolicy encountered unknown ref location for write ref ${ref}`,
          )
          return PlanCode.FATAL_CAPACITY_ERROR
      }
    }

    for (let i = 0; i < this.allocations.length; i++) {
      const allocation = this.allocations[i]
      ctx.refs.markInSlot(allocation.ref, allocation.slot)
    }
    this.allocations.length = 0

    ctx.emit.emitSourceCommand(pc)
    this.releaseDeadRefs(pc)
    return PlanCode.PLANNED
  }

  onBatchFlushed(
    _batchStartPc: CommandPc,
    _batchLen: CommandCount,
    _successfulInBatch: CommandCount,
  ): void {
    // No batch-local bookkeeping in v0 policy.
  }

  end(_totalSuccessful: CommandCount, _failedPc: CommandPcOrNone): void {
    this.ctx = undefined
    this.readRefs.length = 0
    this.writeRefs.length = 0
    this.touchedRefs.length = 0
    this.allocations.length = 0
  }

  private assertBegun(): PolicyContext {
    if (!this.ctx) {
      throw new Error("NoSpillBatchCutPolicy.begin() must be called before planAt()")
    }
    return this.ctx
  }

  private collectRefs(command: Command): void {
    this.readRefs.length = 0
    this.writeRefs.length = 0
    this.touchedRefs.length = 0

    forEachReadRef(command, (ref) => {
      pushUniqueRef(this.readRefs, ref)
      pushUniqueRef(this.touchedRefs, ref)
    })
    forEachConsumedRef(command, (ref) => {
      pushUniqueRef(this.readRefs, ref)
      pushUniqueRef(this.touchedRefs, ref)
    })
    forEachWriteRef(command, (ref) => {
      pushUniqueRef(this.writeRefs, ref)
      pushUniqueRef(this.touchedRefs, ref)
    })
  }

  private reserveSlot(ref: CommandRef): boolean {
    const ctx = this.assertBegun()
    const bank = CommandRefType(ref)
    const slot = ctx.slots.tryAlloc(bank)
    if (slot < 0) {
      return false
    }
    this.allocations.push({ ref, bank, slot })
    return true
  }

  private clearPendingAllocations(): void {
    const ctx = this.assertBegun()
    for (let i = this.allocations.length - 1; i >= 0; i--) {
      const allocation = this.allocations[i]
      ctx.slots.free(allocation.bank, allocation.slot)
    }
    this.allocations.length = 0
  }

  private onSlotExhausted(pc: CommandPc, ref: CommandRef): PlanCode {
    const ctx = this.assertBegun()
    this.clearPendingAllocations()

    if (ctx.batch.isEmpty()) {
      const bank = CommandRefType(ref)
      ctx.diagnostics.setFatalPlanningError(
        `NoSpillBatchCutPolicy cannot fit command ${pc} in empty batch: exhausted slots for bank ${bank}`,
      )
      return PlanCode.FATAL_CAPACITY_ERROR
    }
    return PlanCode.BATCH_FULL_BEFORE_COMMAND
  }

  private releaseDeadRefs(pc: CommandPc): void {
    const ctx = this.assertBegun()
    for (let i = 0; i < this.touchedRefs.length; i++) {
      const ref = this.touchedRefs[i]
      if (ctx.prepass.isReturned(ref)) {
        continue
      }

      const lastUse = ctx.prepass.lastUse(ref)
      const producedAt = ctx.prepass.producedAt(ref)
      const deadAfterCommand =
        lastUse === pc || (producedAt === pc && (lastUse < 0 || lastUse < producedAt))

      if (!deadAfterCommand) {
        continue
      }

      const location = ctx.refs.location(ref)
      if (location === RefLocation.IN_SLOT) {
        const slot = ctx.refs.slotOf(ref)
        ctx.slots.free(CommandRefType(ref), slot)
      }
      ctx.refs.markDead(ref)
    }
  }
}
