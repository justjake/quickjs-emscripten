#include "perform_call.h"

// Perform op CALL
// To change function signature, update scripts/idl.ts and run 'pnpm run generate:c-ops'.
// Add new utilities to qts_utils.{h,c} if needed.

/**
 * Call a function (JS_Call) eg `func(args)`
 * @param env Command execution environment
 * @param result_slot result will be written to this slot
 * @param func_slot Function slot
 * @param this_slot This value slot; 0=undefined
 * @param argv Pointer to argument array
 * @param argc Number of arguments
 */
QTS_CommandStatus perform_call(QTS_CommandEnv *env, JSValueSlot result_slot, JSValueSlot func_slot, JSValueSlot this_slot, JSValue *argv, uint32_t argc) {
    JSValue func = OP_GET_JSVALUE(env, func_slot, "call: function");
    JSValue this_val = JS_UNDEFINED;
    if (this_slot != 0) {
        this_val = OP_GET_JSVALUE(env, this_slot, "call: this value");
    }
    JSValue result = JS_Call(env->ctx, func, this_val, argc, argv);
    OP_SET_JSVALUE(env, result_slot, result);
    OP_ERROR_IF(env, JS_IsException(result), "call: exception");
    return QTS_COMMAND_OK;
}
