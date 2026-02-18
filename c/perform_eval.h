// Generated - do not edit. To change, update scripts/idl.ts and run 'pnpm run generate:c-ops'
#ifndef QTS_PERFORM_EVAL_H
#define QTS_PERFORM_EVAL_H

#include "command.h"

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
QTS_CommandStatus perform_eval(QTS_CommandEnv *env, JSValueSlot result_slot, uint8_t maybe_filename_len, EvalFlags call_flags, char *code_ptr, uint32_t code_len, char *filename);

#endif // QTS_PERFORM_EVAL_H
