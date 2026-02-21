#include "perform_bytecode_write.h"

// Perform op BYTECODE_WRITE
// To change function signature, update scripts/idl.ts and run 'pnpm run ops:c'.
// Add new utilities to qts_utils.{h,c} if needed.

/**
 * Serialize a value to binary (JS_WriteObject)
 * @param env Command execution environment
 * @param result_slot Serialized data written to this slot as a ArrayBuffer JSValue
 * @param source_slot source value will be read from this slot
 * @param flags JS_WRITE_OBJ_* flags
 */
QTS_CommandStatus perform_bytecode_write(QTS_CommandEnv *env, JSValueSlot result_slot, JSValueSlot source_slot, uint32_t flags) {
    JSValue source = OP_GET_JSVALUE(env, source_slot, "bytecode_write: source");

    size_t len;
    uint8_t *buf = JS_WriteObject(env->ctx, &len, source, flags);
    OP_ERROR_IF(env, !buf, "bytecode_write: serialization failed");

    // Create an ArrayBuffer from the serialized data
    JSValue result = JS_NewArrayBufferCopy(env->ctx, buf, len);
    js_free(env->ctx, buf);

    OP_SET_JSVALUE(env, result_slot, result);
    OP_ERROR_IF(env, JS_IsException(result), "bytecode_write: exception");
    return QTS_COMMAND_OK;
}
