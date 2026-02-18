// Generated - do not edit. To change, update scripts/idl.ts and run 'pnpm run generate:c-ops'
#ifndef QTS_PERFORM_THROW_H
#define QTS_PERFORM_THROW_H

#include "command.h"

/**
 * Throw an exception (JS_Throw)
 * @param env Command execution environment
 * @param error_slot Error value slot to throw
 */
QTS_CommandStatus perform_throw(QTS_CommandEnv *env, JSValueSlot error_slot);

#endif // QTS_PERFORM_THROW_H
