#include "perform_get.h"

// Perform op GET
// To change function signature, update scripts/idl.ts and run 'pnpm run generate:c-ops'.
// Add new utilities to qts_utils.{h,c} if needed.

/**
 * Get property using JSValue key (JS_GetProperty)
 * @param env Command execution environment
 * @param result_slot result will be written to this slot
 * @param source_slot source value will be read from this slot
 * @param key_slot slot containing property key
 */
QTS_CommandStatus perform_get(QTS_CommandEnv *env, JSValueSlot result_slot, JSValueSlot source_slot, JSValueSlot key_slot) {
    JSValue source, key, result;
    source = OP_GET_JSVALUE(env, source_slot, "get: source value");
    key = OP_GET_JSVALUE(env, key_slot, "get: key value"); 

    JSAtom key_atom = JS_ValueToAtom(env->ctx, key);
    OP_ERROR_IF(env, key_atom == JS_ATOM_NULL, "get: failed to convert key to atom");

    result = JS_GetProperty(env->ctx, source, key_atom);
    JS_FreeAtom(env->ctx, key_atom);
    OP_SET_JSVALUE(env, result_slot, result);

    OP_ERROR_IF(env, JS_IsException(result), "get: threw an exception");
    return QTS_COMMAND_OK;
}
