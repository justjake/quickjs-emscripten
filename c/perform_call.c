#include "perform_call.h"

// Perform op CALL
// To change function signature, update scripts/idl.ts and run 'pnpm run generate:c-ops'.
// Add new utilities to qts_utils.{h,c} if needed.

/**
 * Call a function (JS_Call) eg `func(args)` with up to 10 arguments in slots
 * @param env Command execution environment
 * @param result_slot result will be written to this slot
 * @param func_slot Function slot
 * @param this_slot This value slot
 * @param argc Number of arguments
 * @param arg1 Argument 1
 * @param arg2 Argument 2
 * @param arg3 Argument 3
 * @param arg4 Argument 4
 * @param arg5 Argument 5
 * @param arg6 Argument 6
 * @param arg7 Argument 7
 * @param arg8 Argument 8
 * @param arg9 Argument 9
 * @param arg10 Argument 10
 * @param call_as_constructor Whether to call the function as a constructor, eg `new func(args)`
 */
QTS_CommandStatus perform_call(QTS_CommandEnv *env, JSValueSlot result_slot, JSValueSlot func_slot, JSValueSlot this_slot, uint8_t argc, JSValueSlot arg1, JSValueSlot arg2, JSValueSlot arg3, JSValueSlot arg4, JSValueSlot arg5, JSValueSlot arg6, JSValueSlot arg7, JSValueSlot arg8, JSValueSlot arg9, JSValueSlot arg10, uint8_t call_as_constructor) {
    OP_ERROR_IF(env, argc > 10, "call: argc exceeds inline argument limit");

    JSValue func = OP_GET_JSVALUE(env, func_slot, "call: function");
    const JSValueSlot arg_slots[10] = { arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10 };
    JSValue argv[10];
    for (uint32_t i = 0; i < argc; i++) {
        argv[i] = OP_GET_JSVALUE(env, arg_slots[i], "call: argument slot");
    }

    JSValue result;
    if (call_as_constructor) {
        result = JS_CallConstructor(env->ctx, func, argc, argv);
    } else {
        JSValue this_val = OP_GET_JSVALUE(env, this_slot, "call: this value");
        result = JS_Call(env->ctx, func, this_val, argc, argv);
    }

    OP_SET_JSVALUE(env, result_slot, result);
    OP_ERROR_IF(env, JS_IsException(result), "call: exception");
    return QTS_COMMAND_OK;
}
