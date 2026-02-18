#include "perform_set_idx_int32.h"

/**
 * Set array element by index to int32
 * @param env Command execution environment
 * @param target_slot Target object to modify
 * @param index Array index
 * @param int_val The int32 value
 */
QTS_CommandStatus perform_set_idx_int32(QTS_CommandEnv *env, JSValueSlot target_slot, uint32_t index, int32_t int_val) {
    JSValue target = OP_GET_JSVALUE(env, target_slot, "set_idx_int32: target");
    int ret = JS_SetPropertyUint32(env->ctx, target, index, JS_NewInt32(env->ctx, int_val));
    OP_ERROR_IF(env, ret < 0, "set_idx_int32: exception");
    return QTS_COMMAND_OK;
}
