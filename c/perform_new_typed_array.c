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
    OP_UNIMPLEMENTED(env, "perform_new_typed_array");
}
