// Generated - do not edit. To change, update scripts/idl.ts and run 'pnpm run generate:c-ops'
#ifndef QTS_PERFORM_NEW_SET_H
#define QTS_PERFORM_NEW_SET_H

#include "command.h"

/**
 * Create a new empty Set (new Set())
 * @param env Command execution environment
 * @param result_slot result will be written to this slot
 */
QTS_CommandStatus perform_new_set(QTS_CommandEnv *env, JSValueSlot result_slot);

#endif // QTS_PERFORM_NEW_SET_H
