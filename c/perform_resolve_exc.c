#include "perform_resolve_exc.h"

/**
 * Resolve exception - if maybe_exc is exception, return the exception value
 * @param env Command execution environment
 * @param result_slot result will be written to this slot
 * @param maybe_exc_slot Value that may be an exception
 */
QTS_CommandStatus perform_resolve_exc(QTS_CommandEnv *env, JSValueSlot result_slot, JSValueSlot maybe_exc_slot) {
    OP_UNIMPLEMENTED(env, "perform_resolve_exc");
}
