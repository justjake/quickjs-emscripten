#include "perform_set_str_undef.h"

/**
 * Set property by string key to undefined
 * @param env Command execution environment
 * @param target_slot Target object to modify
 * @param flags SetPropFlags: property flags controlling set vs define behavior
 * @param key_ptr Property name/key string; must be null-terminated if maybe_name_len is not set
 * @param key_len Property name/key length
 */
QTS_CommandStatus perform_set_str_undef(QTS_CommandEnv *env, JSValueSlot target_slot, SetPropFlags flags, char *key_ptr, uint32_t key_len) {
    JSValue target = OP_GET_JSVALUE(env, target_slot, "set_str_undef: target");

    JSAtom key_atom = JS_NewAtomLen(env->ctx, key_ptr, key_len);
    OP_ERROR_IF(env, key_atom == JS_ATOM_NULL, "set_str_undef: failed to create key atom");

    int ret = qts_set_or_define_prop_atom(env->ctx, target, key_atom, JS_UNDEFINED, flags);
    JS_FreeAtom(env->ctx, key_atom);
    OP_ERROR_IF(env, ret < 0, "set_str_undef: exception");
    return QTS_COMMAND_OK;
}
