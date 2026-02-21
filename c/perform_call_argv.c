#include "perform_call_argv.h"

// Perform op CALL_ARGV
// To change function signature, update scripts/idl.ts and run 'pnpm run ops:c'.
// Add new utilities to qts_utils.{h,c} if needed.

/**
 * Call a function with any number of arguments stored in adjacent memory (JS_Call)
 * @param env Command execution environment
 * @param result_slot result will be written to this slot
 * @param func_slot Function slot
 * @param this_slot This value slot
 * @param argc Number of arguments in argv
 * @param argv Pointer to argument array
 * @param call_as_constructor Whether to call the function as a constructor, eg `new func(args)`
 */
QTS_CommandStatus perform_call_argv(QTS_CommandEnv *env, JSValueSlot result_slot, JSValueSlot func_slot, JSValueSlot this_slot, uint32_t argc, JSValue *argv, uint32_t call_as_constructor) {
    OP_ERROR_IF(env, argc > 0 && !argv, "call_argv: argv is null");

    JSValue func = OP_GET_JSVALUE(env, func_slot, "call_argv: function");
    JSValue result;
    if (call_as_constructor) {
        result = JS_CallConstructor(env->ctx, func, argc, argv);
    } else {
        JSValue this_val = JS_UNDEFINED;
        if (this_slot != 0) {
            this_val = OP_GET_JSVALUE(env, this_slot, "call_argv: this value");
        }
        result = JS_Call(env->ctx, func, this_val, argc, argv);
    }

    OP_SET_JSVALUE(env, result_slot, result);
    OP_ERROR_IF(env, JS_IsException(result), "call_argv: exception");
    return QTS_COMMAND_OK;
}
