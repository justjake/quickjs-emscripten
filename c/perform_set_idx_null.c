#include "perform_set_idx_null.h"

/**
 * Set array element by index to null
 * @param env Command execution environment
 * @param target_slot Target object to modify
 * @param index Array index
 */
QTS_CommandStatus perform_set_idx_null(QTS_CommandEnv *env, JSValueSlot target_slot, uint32_t index) {
    JSValue target = OP_GET_JSVALUE(env, target_slot, "set_idx_null: target");
    int ret = JS_SetPropertyUint32(env->ctx, target, index, JS_NULL);
    OP_ERROR_IF(env, ret < 0, "set_idx_null: exception");
    return QTS_COMMAND_OK;
}
