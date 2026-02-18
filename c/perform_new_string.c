#include "perform_new_string.h"

/**
 * Create a string value (JS_NewStringLen)
 * @param env Command execution environment
 * @param result_slot result will be written to this slot
 * @param str_ptr Pointer to string data
 * @param str_len Length of string in bytes
 */
QTS_CommandStatus perform_new_string(QTS_CommandEnv *env, JSValueSlot result_slot, char *str_ptr, uint32_t str_len) {
    OP_SET_JSVALUE(env, result_slot, JS_NewStringLen(env->ctx, str_ptr, str_len));
    return QTS_COMMAND_OK;
}
