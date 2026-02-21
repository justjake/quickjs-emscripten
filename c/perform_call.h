// Generated - do not edit. To change, update scripts/idl.ts and run 'pnpm run ops:c'
#ifndef QTS_PERFORM_CALL_H
#define QTS_PERFORM_CALL_H

#include "command.h"

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
QTS_CommandStatus perform_call(QTS_CommandEnv *env, JSValueSlot result_slot, JSValueSlot func_slot, JSValueSlot this_slot, uint8_t argc, JSValueSlot arg1, JSValueSlot arg2, JSValueSlot arg3, JSValueSlot arg4, JSValueSlot arg5, JSValueSlot arg6, JSValueSlot arg7, JSValueSlot arg8, JSValueSlot arg9, JSValueSlot arg10, uint8_t call_as_constructor);

#endif // QTS_PERFORM_CALL_H
