// Generated - do not edit. To change, update scripts/idl.ts and run 'pnpm run ops:c'
#ifndef QTS_PERFORM_NEW_MAP_H
#define QTS_PERFORM_NEW_MAP_H

#include "command.h"

/**
 * Create a new empty Map (new Map())
 * @param env Command execution environment
 * @param result_slot result will be written to this slot
 */
QTS_CommandStatus perform_new_map(QTS_CommandEnv *env, JSValueSlot result_slot);

#endif // QTS_PERFORM_NEW_MAP_H
