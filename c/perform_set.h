// Generated - do not edit. To change, update scripts/idl.ts and run 'pnpm run generate:c-ops'
#ifndef QTS_PERFORM_SET_H
#define QTS_PERFORM_SET_H

#include "command.h"

/**
 * Set property using JSValue key (JS_SetProperty)
 * @param env Command execution environment
 * @param target_slot Target object to modify
 * @param key_slot slot containing property key
 * @param value_slot slot containing value
 * @param flags SetPropFlags: property flags controlling set vs define behavior
 */
QTS_CommandStatus perform_set(QTS_CommandEnv *env, JSValueSlot target_slot, JSValueSlot key_slot, JSValueSlot value_slot, SetPropFlags flags);

#endif // QTS_PERFORM_SET_H
