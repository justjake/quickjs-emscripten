#include "perform_bytecode_read.h"

// Perform op BYTECODE_READ
// To change function signature, update scripts/idl.ts and run 'pnpm run generate:c-ops'.
// Add new utilities to qts_utils.{h,c} if needed.

/**
 * Deserialize a value from binary (JS_ReadObject)
 * @param env Command execution environment
 * @param result_slot result will be written to this slot
 * @param source_slot ArrayBuffer JSValue containing serialized data
 * @param flags JS_READ_OBJ_* flags
 */
QTS_CommandStatus perform_bytecode_read(QTS_CommandEnv *env, JSValueSlot result_slot, JSValueSlot source_slot, uint32_t flags) {
    OP_UNIMPLEMENTED(env, "perform_bytecode_read");
}
