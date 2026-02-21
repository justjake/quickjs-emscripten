// Generated - do not edit. To change, update scripts/idl.ts and run 'pnpm run ops:c'
#ifndef QTS_PERFORM_GLOBAL_H
#define QTS_PERFORM_GLOBAL_H

#include "command.h"

/**
 * Get the global object (JS_GetGlobalObject)
 * @param env Command execution environment
 * @param result_slot result will be written to this slot
 */
QTS_CommandStatus perform_global(QTS_CommandEnv *env, JSValueSlot result_slot);

#endif // QTS_PERFORM_GLOBAL_H
