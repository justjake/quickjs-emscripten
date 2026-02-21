import type { InputBinding } from "../CommandBuilder"
import type { Command } from "../ops"
import { forEachConsumedRef } from "../ops"

function clampSuccessfulCount(successfulCount: number, commandCount: number): number {
  if (!Number.isFinite(successfulCount)) {
    return 0
  }
  const bounded = Math.trunc(successfulCount)
  if (bounded <= 0) {
    return 0
  }
  if (bounded >= commandCount) {
    return commandCount
  }
  return bounded
}

/**
 * Finalize deferred move semantics for input bindings marked consume-on-success.
 *
 * Semantics:
 * - Success: non-consumed bindings are disposed; consumed bindings are invalidated.
 * - Failure: only consumed bindings are invalidated; untouched bindings remain alive.
 */
export function finalizeConsumedInputBindings(
  bindings: readonly InputBinding[],
  commands: readonly Command[],
  successfulCount: number,
): void {
  const consumeBindings = bindings.filter((binding) => binding.mode === "consume_on_success")
  if (consumeBindings.length === 0) {
    return
  }

  const executedCount = clampSuccessfulCount(successfulCount, commands.length)
  const executionSucceeded = executedCount === commands.length
  const consumeBindingByRef = new Map<number, InputBinding>()
  for (const binding of consumeBindings) {
    consumeBindingByRef.set(binding.ref as number, binding)
  }

  const consumedRefsReached = new Set<number>()
  for (let i = 0; i < executedCount; i++) {
    const command = commands[i]
    forEachConsumedRef(command, (ref) => {
      const refKey = ref as number
      if (consumeBindingByRef.has(refKey)) {
        consumedRefsReached.add(refKey)
      }
    })
  }

  for (const binding of consumeBindings) {
    if (!binding.handle.alive) {
      continue
    }
    const wasConsumed = consumedRefsReached.has(binding.ref as number)
    if (wasConsumed) {
      binding.handle.invalidateHandle()
      continue
    }
    if (executionSucceeded) {
      binding.handle.dispose()
    }
  }
}
