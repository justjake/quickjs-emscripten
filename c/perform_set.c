#include "perform_set.h"

// Perform op SET
// To change function signature, update scripts/idl.ts and run 'pnpm run generate:c-ops'.
// Add new utilities to qts_utils.{h,c} if needed.

/**
 * Set property using JSValue key (JS_SetProperty)
 * @param env Command execution environment
 * @param target_slot Target object to modify
 * @param key_slot slot containing property key
 * @param value_slot slot containing value
 * @param flags JS_PROP_* property flags
 */
QTS_CommandStatus perform_set(QTS_CommandEnv *env, JSValueSlot target_slot, JSValueSlot key_slot, JSValueSlot value_slot, JSPropFlags flags) {
    JSValue target = OP_GET_JSVALUE(env, target_slot, "set: target");
    JSValue key = OP_GET_JSVALUE(env, key_slot, "set: key");
    JSValue value = OP_GET_JSVALUE(env, value_slot, "set: value");

    // Convert key to atom
    JSAtom key_atom = JS_ValueToAtom(env->ctx, key);
    OP_ERROR_IF(env, key_atom == JS_ATOM_NULL, "set: failed to convert key to atom");

    // JS_DefinePropertyValue consumes the value, so we need to dup it
    int ret = JS_DefinePropertyValue(env->ctx, target, key_atom, JS_DupValue(env->ctx, value), flags);
    JS_FreeAtom(env->ctx, key_atom);
    OP_ERROR_IF(env, ret < 0, "set: exception");
    return QTS_COMMAND_OK;
}
