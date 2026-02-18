// Generated - do not edit. To change, update scripts/idl.ts and run 'pnpm run generate:c-ops'
#ifndef QTS_PERFORM_CALL_CTOR_H
#define QTS_PERFORM_CALL_CTOR_H

#include "command.h"

/**
 * Call a constructor (JS_CallConstructor) eg `new Ctor(args)`
 * @param env Command execution environment
 * @param result_slot result will be written to this slot
 * @param ctor_slot Constructor function slot
 * @param argv Pointer to argument array
 * @param argc Number of arguments
 */
QTS_CommandStatus perform_call_ctor(QTS_CommandEnv *env, JSValueSlot result_slot, JSValueSlot ctor_slot, JSValue *argv, uint32_t argc);

#endif // QTS_PERFORM_CALL_CTOR_H
