#include "perform_new_func.h"

/**
 * Create a host function (QTS_NewFunction)
 * @param env Command execution environment
 * @param result_slot Slot to store the function
 * @param arity Function.length (arity)
 * @param is_constructor 1 if callable as constructor
 * @param name_ptr Pointer to function name
 * @param name_len Length of function name
 * @param host_ref_id Host reference ID for callback
 */
QTS_CommandStatus perform_new_func(QTS_CommandEnv *env, JSValueSlot result_slot, uint8_t arity, uint8_t is_constructor, char *name_ptr, uint32_t name_len, HostRefId host_ref_id) {
    // Create a host ref object to hold the callback ID
    JSValue host_ref = new_host_ref(env->ctx, host_ref_id);
    OP_ERROR_IF(env, JS_IsException(host_ref), "new_func: failed to create host ref");

    // Create the function with the host ref as data
    // The function callback will extract the host_ref_id and call back to the host
    JSValue func = JS_NewCFunctionData(
        env->ctx,
        // We need a function pointer here - this should be defined in interface.c
        // For now, this is a placeholder that needs to be wired up properly
        (JSCFunctionData *)qts_funclist_call_function,
        arity,            // length (arity)
        host_ref_id,      // magic - used to identify the callback
        1,                // data_len
        &host_ref         // data array
    );
    JS_FreeValue(env->ctx, host_ref);
    OP_ERROR_IF(env, JS_IsException(func), "new_func: failed to create function");

    // Set the function name if provided
    if (name_ptr && name_len > 0) {
        JSAtom name_atom = JS_NewAtomLen(env->ctx, name_ptr, name_len);
        if (name_atom != JS_ATOM_NULL) {
            JS_DefinePropertyValueStr(env->ctx, func, "name",
                JS_AtomToString(env->ctx, name_atom),
                JS_PROP_CONFIGURABLE);
            JS_FreeAtom(env->ctx, name_atom);
        }
    }

    if (is_constructor) {
        JS_SetConstructorBit(env->ctx, func, is_constructor);
    }

    OP_SET_JSVALUE(env, result_slot, func);
    return QTS_COMMAND_OK;
}
