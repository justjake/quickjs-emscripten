// Generated - do not edit. To change, update scripts/idl.ts and run 'pnpm run generate:c-ops'
#ifndef QTS_PERFORM_FREE_H
#define QTS_PERFORM_FREE_H

#include "command.h"

/**
 * Free a value (JS_FreeValue) - decrement refcount
 * @param env Command execution environment
 * @param target_slot Target object to modify
 */
QTS_CommandStatus perform_free(QTS_CommandEnv *env, JSValueSlot target_slot);

#endif // QTS_PERFORM_FREE_H
