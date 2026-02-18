#include "perform_get_idx.h"

/**
 * Get property by numeric index (JS_GetPropertyUint32)
 * @param env Command execution environment
 * @param result_slot result will be written to this slot
 * @param source_slot source value will be read from this slot
 * @param index Array index
 */
QTS_CommandStatus perform_get_idx(QTS_CommandEnv *env, JSValueSlot result_slot, JSValueSlot source_slot, uint32_t index) {
    JSValue source = OP_GET_JSVALUE(env, source_slot, "get_idx: source");
    JSValue result = JS_GetPropertyUint32(env->ctx, source, index);
    OP_SET_JSVALUE(env, result_slot, result);

    OP_ERROR_IF(env, JS_IsException(result), "get_idx: exception");
    return QTS_COMMAND_OK;
}