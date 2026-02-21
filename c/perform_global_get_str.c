#include "perform_global_get_str.h"

// Perform op GLOBAL_GET_STR
// To change function signature, update scripts/idl.ts and run 'pnpm run ops:c'.
// Add new utilities to qts_utils.{h,c} if needed.

/**
 * Get property by string key from global object (JS_GetPropertyStr)
 * @param env Command execution environment
 * @param result_slot result will be written to this slot
 * @param key_ptr Property name/key string; must be null-terminated if maybe_name_len is not set
 * @param key_len Property name/key length
 */
QTS_CommandStatus perform_global_get_str(QTS_CommandEnv *env, JSValueSlot result_slot, char *key_ptr, uint32_t key_len) {
    JSValue global = JS_GetGlobalObject(env->ctx);
    JSAtom key_atom = JS_NewAtomLen(env->ctx, key_ptr, key_len);
    if (key_atom == JS_ATOM_NULL) {
        JS_FreeValue(env->ctx, global);
        OP_ERROR(env, "global_get_str: failed to create key atom");
    }

    JSValue result = JS_GetProperty(env->ctx, global, key_atom);
    JS_FreeAtom(env->ctx, key_atom);
    JS_FreeValue(env->ctx, global);

    OP_SET_JSVALUE(env, result_slot, result);
    OP_ERROR_IF(env, JS_IsException(result), "global_get_str: exception");
    return QTS_COMMAND_OK;
}
