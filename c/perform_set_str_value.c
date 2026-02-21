#include "perform_set_str_value.h"

// Perform op SET_STR_VALUE
// To change function signature, update scripts/idl.ts and run 'pnpm run ops:c'.
// Add new utilities to qts_utils.{h,c} if needed.

/**
 * Set property by string key to JSValue from slot (JS_SetPropertyStr)
 * @param env Command execution environment
 * @param target_slot Target object to modify
 * @param value_slot slot containing value
 * @param flags SetPropFlags: property flags controlling set vs define behavior
 * @param key_ptr Property name/key string; must be null-terminated if maybe_name_len is not set
 * @param key_len Property name/key length
 */
QTS_CommandStatus perform_set_str_value(QTS_CommandEnv *env, JSValueSlot target_slot, JSValueSlot value_slot, SetPropFlags flags, char *key_ptr, uint32_t key_len) {
    JSValue target = OP_GET_JSVALUE(env, target_slot, "set_str_value: target");
    JSValue value = OP_GET_JSVALUE(env, value_slot, "set_str_value: value");

    JSAtom key_atom = JS_NewAtomLen(env->ctx, key_ptr, key_len);
    OP_ERROR_IF(env, key_atom == JS_ATOM_NULL, "set_str_value: failed to create key atom");

    // Helper consumes the value, so we need to dup it
    int ret = qts_set_or_define_prop_atom(env->ctx, target, key_atom, JS_DupValue(env->ctx, value), flags);
    JS_FreeAtom(env->ctx, key_atom);
    OP_ERROR_IF(env, ret < 0, "set_str_value: exception");
    return QTS_COMMAND_OK;
}
