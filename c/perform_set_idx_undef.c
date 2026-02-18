#include "perform_set_idx_undef.h"

/**
 * Set array element by index to undefined
 * @param env Command execution environment
 * @param target_slot Target object to modify
 * @param index Array index
 */
QTS_CommandStatus perform_set_idx_undef(QTS_CommandEnv *env, JSValueSlot target_slot, uint32_t index) {
    JSValue target = OP_GET_JSVALUE(env, target_slot, "set_idx_undef: target");
    int ret = JS_SetPropertyUint32(env->ctx, target, index, JS_UNDEFINED);
    OP_ERROR_IF(env, ret < 0, "set_idx_undef: exception");
    return QTS_COMMAND_OK;
}
