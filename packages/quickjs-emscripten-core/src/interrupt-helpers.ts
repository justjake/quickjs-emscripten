import type { InterruptHandler } from "./runtime"

/**
 * Returns an interrupt handler that interrupts Javascript execution after a deadline time.
 *
 * @param deadline - Interrupt execution if it's still running after this time.
 *   Number values are compared against `Date.now()`
 */
export function shouldInterruptAfterDeadline(deadline: Date | number): InterruptHandler {
  const deadlineAsNumber = typeof deadline === "number" ? deadline : deadline.getTime()

  return function () {
    return Date.now() > deadlineAsNumber
  }
}
