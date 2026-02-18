#include "perform_free_ptr.h"

// Perform op FREE_PTR
// To change function signature, update scripts/idl.ts and run 'pnpm run generate:c-ops'.
// Add new utilities to qts_utils.{h,c} if needed.

/**
 * Free a JSValue* pointer - JS_FreeValue the value, then free the pointer
 * @param env Command execution environment
 * @param value_ptr Pointer to value to free
 */
QTS_CommandStatus perform_free_ptr(QTS_CommandEnv *env, JSValue *value_ptr) {
    OP_UNIMPLEMENTED(env, "perform_free_ptr");
}
