// Generated - do not edit. To change, update scripts/idl.ts and run 'pnpm run generate:c-ops'
#ifndef QTS_PERFORM_GET_H
#define QTS_PERFORM_GET_H

#include "command.h"

/**
 * Get property using JSValue key (JS_GetProperty)
 * @param env Command execution environment
 * @param result_slot result will be written to this slot
 * @param source_slot source value will be read from this slot
 * @param key_slot slot containing property key
 */
QTS_CommandStatus perform_get(QTS_CommandEnv *env, JSValueSlot result_slot, JSValueSlot source_slot, JSValueSlot key_slot);

#endif // QTS_PERFORM_GET_H
