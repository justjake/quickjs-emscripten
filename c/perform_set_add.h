// Generated - do not edit. To change, update scripts/idl.ts and run 'pnpm run generate:c-ops'
#ifndef QTS_PERFORM_SET_ADD_H
#define QTS_PERFORM_SET_ADD_H

#include "command.h"

/**
 * Call set.add(value)
 * @param env Command execution environment
 * @param target_slot Target object to modify
 * @param value_slot slot containing value
 */
QTS_CommandStatus perform_set_add(QTS_CommandEnv *env, JSValueSlot target_slot, JSValueSlot value_slot);

#endif // QTS_PERFORM_SET_ADD_H
