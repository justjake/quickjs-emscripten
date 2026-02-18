#include "perform_set_idx_bool.h"

/**
 * Set array element by index to boolean
 * @param env Command execution environment
 * @param target_slot Target object to modify
 * @param bool_val Boolean value (0 or 1)
 * @param flags SetPropFlags: property flags controlling set vs define behavior
 * @param index Array index
 */
QTS_CommandStatus perform_set_idx_bool(QTS_CommandEnv *env, JSValueSlot target_slot, uint8_t bool_val, SetPropFlags flags, uint32_t index) {
    JSValue target = OP_GET_JSVALUE(env, target_slot, "set_idx_bool: target");
    int ret = qts_set_or_define_prop_uint32(env->ctx, target, index, JS_NewBool(env->ctx, bool_val), flags);
    OP_ERROR_IF(env, ret < 0, "set_idx_bool: exception");
    return QTS_COMMAND_OK;
}
