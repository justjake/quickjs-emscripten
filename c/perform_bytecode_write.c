#include "perform_bytecode_write.h"

// Perform op BYTECODE_WRITE
// To change function signature, update scripts/idl.ts and run 'pnpm run generate:c-ops'.
// Add new utilities to qts_utils.{h,c} if needed.

/**
 * Serialize a value to binary (JS_WriteObject)
 * @param env Command execution environment
 * @param result_slot Serialized data written to this slot as a ArrayBuffer JSValue
 * @param source_slot source value will be read from this slot
 * @param flags JS_WRITE_OBJ_* flags
 */
QTS_CommandStatus perform_bytecode_write(QTS_CommandEnv *env, JSValueSlot result_slot, JSValueSlot source_slot, uint32_t flags) {
    OP_UNIMPLEMENTED(env, "perform_bytecode_write");
}
