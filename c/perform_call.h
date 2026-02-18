// Generated - do not edit. To change, update scripts/idl.ts and run 'pnpm run generate:c-ops'
#ifndef QTS_PERFORM_CALL_H
#define QTS_PERFORM_CALL_H

#include "command.h"

/**
 * Call a function (JS_Call) eg `func(args)`
 * @param env Command execution environment
 * @param result_slot result will be written to this slot
 * @param func_slot Function slot
 * @param this_slot This value slot; 0=undefined
 * @param argv Pointer to argument array
 * @param argc Number of arguments
 */
QTS_CommandStatus perform_call(QTS_CommandEnv *env, JSValueSlot result_slot, JSValueSlot func_slot, JSValueSlot this_slot, JSValue *argv, uint32_t argc);

#endif // QTS_PERFORM_CALL_H
