#include "perform_bytecode_read.h"

// Perform op BYTECODE_READ
// To change function signature, update scripts/idl.ts and run 'pnpm run ops:c'.
// Add new utilities to qts_utils.{h,c} if needed.

/**
 * Deserialize a value from binary (JS_ReadObject)
 * @param env Command execution environment
 * @param result_slot result will be written to this slot
 * @param source_slot ArrayBuffer JSValue containing serialized data
 * @param flags JS_READ_OBJ_* flags
 */
QTS_CommandStatus perform_bytecode_read(QTS_CommandEnv *env, JSValueSlot result_slot, JSValueSlot source_slot, uint32_t flags) {
    JSValue source = OP_GET_JSVALUE(env, source_slot, "bytecode_read: source");

    // Get the ArrayBuffer data
    size_t len;
    uint8_t *buf = JS_GetArrayBuffer(env->ctx, &len, source);
    OP_ERROR_IF(env, !buf, "bytecode_read: source is not an ArrayBuffer");

    // Deserialize the data
    JSValue result = JS_ReadObject(env->ctx, buf, len, flags);
    OP_SET_JSVALUE(env, result_slot, result);
    OP_ERROR_IF(env, JS_IsException(result), "bytecode_read: exception");
    return QTS_COMMAND_OK;
}
