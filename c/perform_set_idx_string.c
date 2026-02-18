#include "perform_set_idx_string.h"

/**
 * Set array element by index to string
 * @param env Command execution environment
 * @param target_slot Target object to modify
 * @param flags SetPropFlags: property flags controlling set vs define behavior
 * @param str_ptr String value pointer
 * @param str_len String value length
 * @param index Array index
 */
QTS_CommandStatus perform_set_idx_string(QTS_CommandEnv *env, JSValueSlot target_slot, SetPropFlags flags, char *str_ptr, uint32_t str_len, uint32_t index) {
    JSValue target = OP_GET_JSVALUE(env, target_slot, "set_idx_string: target");
    int ret = qts_set_or_define_prop_uint32(env->ctx, target, index, JS_NewStringLen(env->ctx, str_ptr, str_len), flags);
    OP_ERROR_IF(env, ret < 0, "set_idx_string: exception");
    return QTS_COMMAND_OK;
}
