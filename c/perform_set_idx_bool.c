#include "perform_set_idx_bool.h"

/**
 * Set array element by index to boolean
 * @param env Command execution environment
 * @param target_slot Target object to modify
 * @param bool_val Boolean value (0 or 1)
 * @param index Array index
 */
QTS_CommandStatus perform_set_idx_bool(QTS_CommandEnv *env, JSValueSlot target_slot, uint8_t bool_val, uint32_t index) {
    JSValue target = OP_GET_JSVALUE(env, target_slot, "set_idx_bool: target");
    int ret = JS_SetPropertyUint32(env->ctx, target, index, JS_NewBool(env->ctx, bool_val));
    OP_ERROR_IF(env, ret < 0, "set_idx_bool: exception");
    return QTS_COMMAND_OK;
}
