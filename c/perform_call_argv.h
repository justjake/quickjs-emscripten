// Generated - do not edit. To change, update scripts/idl.ts and run 'pnpm run ops:c'
#ifndef QTS_PERFORM_CALL_ARGV_H
#define QTS_PERFORM_CALL_ARGV_H

#include "command.h"

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
QTS_CommandStatus perform_call_argv(QTS_CommandEnv *env, JSValueSlot result_slot, JSValueSlot func_slot, JSValueSlot this_slot, uint32_t argc, JSValue *argv, uint32_t call_as_constructor);

#endif // QTS_PERFORM_CALL_ARGV_H
