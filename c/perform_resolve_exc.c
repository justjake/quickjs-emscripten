#include "perform_resolve_exc.h"

/**
 * Resolve exception - if maybe_exc is exception, return the exception value
 * @param env Command execution environment
 * @param result_slot result will be written to this slot
 * @param maybe_exc_slot Value that may be an exception
 */
QTS_CommandStatus perform_resolve_exc(QTS_CommandEnv *env, JSValueSlot result_slot, JSValueSlot maybe_exc_slot) {
    JSValue maybe_exc = OP_GET_JSVALUE(env, maybe_exc_slot, "resolve_exc: maybe_exc");

    if (JS_IsException(maybe_exc)) {
        // Get the actual exception value
        JSValue exc = JS_GetException(env->ctx);
        OP_SET_JSVALUE(env, result_slot, exc);
    } else {
        // Not an exception, just copy the value
        OP_SET_JSVALUE(env, result_slot, JS_DupValue(env->ctx, maybe_exc));
    }
    return QTS_COMMAND_OK;
}
