#include "perform_call_ctor.h"

// Perform op CALL_CTOR
// To change function signature, update scripts/idl.ts and run 'pnpm run generate:c-ops'.
// Add new utilities to qts_utils.{h,c} if needed.

/**
 * Call a constructor (JS_CallConstructor) eg `new Ctor(args)`
 * @param env Command execution environment
 * @param result_slot result will be written to this slot
 * @param ctor_slot Constructor function slot
 * @param argv Pointer to argument array
 * @param argc Number of arguments
 */
QTS_CommandStatus perform_call_ctor(QTS_CommandEnv *env, JSValueSlot result_slot, JSValueSlot ctor_slot, JSValue *argv, uint32_t argc) {
    OP_UNIMPLEMENTED(env, "perform_call_ctor");
}
