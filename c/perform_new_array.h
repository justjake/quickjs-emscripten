// Generated - do not edit. To change, update scripts/idl.ts and run 'pnpm run generate:c-ops'
#ifndef QTS_PERFORM_NEW_ARRAY_H
#define QTS_PERFORM_NEW_ARRAY_H

#include "command.h"

/**
 * Create a new empty array (JS_NewArray)
 * @param env Command execution environment
 * @param result_slot result will be written to this slot
 */
QTS_CommandStatus perform_new_array(QTS_CommandEnv *env, JSValueSlot result_slot);

#endif // QTS_PERFORM_NEW_ARRAY_H
