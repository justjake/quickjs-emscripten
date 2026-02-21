#include "perform_new_arraybuffer.h"

/**
 * Create an ArrayBuffer by copying data (JS_NewArrayBufferCopy)
 * @param env Command execution environment
 * @param result_slot result will be written to this slot
 * @param class_is_shared_array_buffer 1 if the ArrayBuffer is a SharedArrayBuffer
 * @param data_ptr Pointer to source data
 * @param data_len Length of data in bytes
 */
QTS_CommandStatus perform_new_arraybuffer(QTS_CommandEnv *env, JSValueSlot result_slot, uint8_t class_is_shared_array_buffer, uint8_t *data_ptr, uint32_t data_len) {
    OP_ERROR_IF(env, class_is_shared_array_buffer != 0, "new_arraybuffer: SharedArrayBuffer is not implemented");

    JSValue result = JS_NewArrayBufferCopy(env->ctx, data_ptr, data_len);
    OP_SET_JSVALUE(env, result_slot, result);
    OP_ERROR_IF(env, JS_IsException(result), "new_arraybuffer: JS_NewArrayBufferCopy failed");
    return QTS_COMMAND_OK;
}
