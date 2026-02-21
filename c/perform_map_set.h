// Generated - do not edit. To change, update scripts/idl.ts and run 'pnpm run ops:c'
#ifndef QTS_PERFORM_MAP_SET_H
#define QTS_PERFORM_MAP_SET_H

#include "command.h"

/**
 * Call map.set(key, value) using JSValue key
 * @param env Command execution environment
 * @param target_slot Target object to modify
 * @param key_slot slot containing property key
 * @param value_slot slot containing value
 */
QTS_CommandStatus perform_map_set(QTS_CommandEnv *env, JSValueSlot target_slot, JSValueSlot key_slot, JSValueSlot value_slot);

#endif // QTS_PERFORM_MAP_SET_H
