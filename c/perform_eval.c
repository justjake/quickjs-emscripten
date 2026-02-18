#include "perform_eval.h"

// Perform op EVAL
// To change function signature, update scripts/idl.ts and run 'pnpm run generate:c-ops'.
// Add new utilities to qts_utils.{h,c} if needed.

/**
 * Evaluate JavaScript code (JS_Eval)
 * @param env Command execution environment
 * @param result_slot result will be written to this slot
 * @param maybe_filename_len Length of filename; 0=filename is null-terminated (or no filename)
 * @param call_flags Eval flags
 * @param code_ptr Pointer to code string
 * @param code_len Length of code in bytes
 * @param filename Filename used for error messages
 */
QTS_CommandStatus perform_eval(QTS_CommandEnv *env, JSValueSlot result_slot, uint8_t maybe_filename_len, EvalFlags call_flags, char *code_ptr, uint32_t code_len, char *filename) {
    OP_UNIMPLEMENTED(env, "perform_eval");
}
