#include "perform_set_idx_f64.h"

/**
 * Set array element by index to float64
 * @param env Command execution environment
 * @param target_slot Target object to modify
 * @param f64_val The float64 value
 * @param index Array index
 */
QTS_CommandStatus perform_set_idx_f64(QTS_CommandEnv *env, JSValueSlot target_slot, double f64_val, uint32_t index) {
    JSValue target = OP_GET_JSVALUE(env, target_slot, "set_idx_f64: target");
    int ret = JS_SetPropertyUint32(env->ctx, target, index, JS_NewFloat64(env->ctx, f64_val));
    OP_ERROR_IF(env, ret < 0, "set_idx_f64: exception");
    return QTS_COMMAND_OK;
}
