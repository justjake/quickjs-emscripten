#include "perform_set_value_value.h"

// Perform op SET_VALUE_VALUE
// To change function signature, update scripts/idl.ts and run 'pnpm run generate:c-ops'.
// Add new utilities to qts_utils.{h,c} if needed.

/**
 * Set property using JSValue key (JS_SetProperty)
 * @param env Command execution environment
 * @param target_slot Target object to modify
 * @param key_slot slot containing property key
 * @param value_slot slot containing value
 * @param flags SetPropFlags: property flags controlling set vs define behavior
 */
QTS_CommandStatus perform_set_value_value(QTS_CommandEnv *env, JSValueSlot target_slot, JSValueSlot key_slot, JSValueSlot value_slot, SetPropFlags flags) {
    JSValue target = OP_GET_JSVALUE(env, target_slot, "set_value_value: target");
    JSValue key = OP_GET_JSVALUE(env, key_slot, "set_value_value: key");
    JSValue value = OP_GET_JSVALUE(env, value_slot, "set_value_value: value");

    JSAtom key_atom = JS_ValueToAtom(env->ctx, key);
    OP_ERROR_IF(env, key_atom == JS_ATOM_NULL, "set_value_value: failed to convert key to atom");

    int ret =
        qts_set_or_define_prop_atom(env->ctx, target, key_atom, JS_DupValue(env->ctx, value), flags);
    JS_FreeAtom(env->ctx, key_atom);
    OP_ERROR_IF(env, ret < 0, "set_value_value: exception");
    return QTS_COMMAND_OK;
}
