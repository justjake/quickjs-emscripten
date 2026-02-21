#include "perform_global_set_str.h"

// Perform op GLOBAL_SET_STR
// To change function signature, update scripts/idl.ts and run 'pnpm run ops:c'.
// Add new utilities to qts_utils.{h,c} if needed.

/**
 * Set property by string key on global object (JS_SetPropertyStr)
 * @param env Command execution environment
 * @param value_slot slot containing value
 * @param flags JS_PROP_* property flags
 * @param key_ptr Property name/key string; must be null-terminated if maybe_name_len is not set
 * @param key_len Property name/key length
 */
QTS_CommandStatus perform_global_set_str(QTS_CommandEnv *env, JSValueSlot value_slot, JSPropFlags flags, char *key_ptr, uint32_t key_len) {
    JSValue value = OP_GET_JSVALUE(env, value_slot, "global_set_str: value");
    JSValue global = JS_GetGlobalObject(env->ctx);
    JSAtom key_atom = JS_NewAtomLen(env->ctx, key_ptr, key_len);
    if (key_atom == JS_ATOM_NULL) {
        JS_FreeValue(env->ctx, global);
        OP_ERROR(env, "global_set_str: failed to create key atom");
    }

    // JS_DefinePropertyValue consumes the value, so we need to dup it
    int ret = JS_DefinePropertyValue(env->ctx, global, key_atom, JS_DupValue(env->ctx, value), flags);
    JS_FreeAtom(env->ctx, key_atom);
    JS_FreeValue(env->ctx, global);

    OP_ERROR_IF(env, ret < 0, "global_set_str: exception");
    return QTS_COMMAND_OK;
}
