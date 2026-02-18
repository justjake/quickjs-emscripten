#include "perform_new_typed_array.h"

/**
 * Create a TypedArray view (JS_NewTypedArray)
 * @param env Command execution environment
 * @param result_slot result will be written to this slot
 * @param source_slot source value will be read from this slot
 * @param array_type TypedArray type enum
 * @param source_offset Byte offset into source array buffer
 * @param length Number of elements
 */
QTS_CommandStatus perform_new_typed_array(QTS_CommandEnv *env, JSValueSlot result_slot, JSValueSlot source_slot, NewTypedArrayFlags array_type, uint32_t source_offset, uint32_t length) {
    JSValue source = OP_GET_JSVALUE(env, source_slot, "new_typed_array: source");
    // Create typed array with buffer, offset, and length
    // JS_NewTypedArray(ctx, argc, argv, type) expects argv to contain arguments
    // like new TypedArray(buffer, byteOffset, length)
    JSValue argv[3];
    argv[0] = source;                              // ArrayBuffer
    argv[1] = JS_NewInt64(env->ctx, source_offset); // byteOffset
    argv[2] = JS_NewInt64(env->ctx, length);        // length

    JSValue result = JS_NewTypedArray(env->ctx, 3, argv, (JSTypedArrayEnum)array_type);

    JS_FreeValue(env->ctx, argv[1]);
    JS_FreeValue(env->ctx, argv[2]);

    OP_SET_JSVALUE(env, result_slot, result);
    OP_ERROR_IF(env, JS_IsException(result), "new_typed_array: exception");
    return QTS_COMMAND_OK;
}
