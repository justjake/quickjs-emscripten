#include "perform_set_idx_value.h"

// Perform op SET_IDX_VALUE
// To change function signature, update scripts/idl.ts and run 'pnpm run ops:c'.
// Add new utilities to qts_utils.{h,c} if needed.

/**
 * Set array element by index to JSValue from slot (JS_SetPropertyUint32)
 * @param env Command execution environment
 * @param target_slot Target object to modify
 * @param value_slot slot containing value
 * @param flags SetPropFlags: property flags controlling set vs define behavior
 * @param index Array index
 */
QTS_CommandStatus perform_set_idx_value(QTS_CommandEnv *env, JSValueSlot target_slot, JSValueSlot value_slot, SetPropFlags flags, uint32_t index) {
    JSValue target = OP_GET_JSVALUE(env, target_slot, "set_idx_value: target");
    JSValue value = OP_GET_JSVALUE(env, value_slot, "set_idx_value: value");

    // Helper consumes the value, so we need to dup it
    int ret = qts_set_or_define_prop_uint32(env->ctx, target, index, JS_DupValue(env->ctx, value), flags);
    OP_ERROR_IF(env, ret < 0, "set_idx_value: exception");
    return QTS_COMMAND_OK;
}
