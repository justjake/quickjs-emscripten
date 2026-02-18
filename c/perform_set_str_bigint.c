#include "perform_set_str_bigint.h"

/**
 * Set property by string key to BigInt
 * @param env Command execution environment
 * @param target_slot Target object to modify
 * @param maybe_key_len if >0, length of key_ptr. if 0, key_ptr is null-terminated
 * @param flags SetPropFlags: property flags controlling set vs define behavior
 * @param i64_val The int64 value
 * @param key_ptr Property name/key string; must be null-terminated if maybe_name_len is not set
 */
QTS_CommandStatus perform_set_str_bigint(QTS_CommandEnv *env, JSValueSlot target_slot, uint8_t maybe_key_len, SetPropFlags flags, int64_t i64_val, char *key_ptr) {
    JSValue target = OP_GET_JSVALUE(env, target_slot, "set_str_bigint: target");

    JSAtom key_atom = QTS_NewAtomMaybeLen(env->ctx, key_ptr, maybe_key_len);
    OP_ERROR_IF(env, key_atom == JS_ATOM_NULL, "set_str_bigint: failed to create key atom");

    int ret = qts_set_or_define_prop_atom(env->ctx, target, key_atom, JS_NewBigInt64(env->ctx, i64_val), flags);
    JS_FreeAtom(env->ctx, key_atom);
    OP_ERROR_IF(env, ret < 0, "set_str_bigint: exception");
    return QTS_COMMAND_OK;
}
