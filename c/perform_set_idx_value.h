// Generated - do not edit. To change, update scripts/idl.ts and run 'pnpm run ops:c'
#ifndef QTS_PERFORM_SET_IDX_VALUE_H
#define QTS_PERFORM_SET_IDX_VALUE_H

#include "command.h"

/**
 * Set array element by index to JSValue from slot (JS_SetPropertyUint32)
 * @param env Command execution environment
 * @param target_slot Target object to modify
 * @param value_slot slot containing value
 * @param flags SetPropFlags: property flags controlling set vs define behavior
 * @param index Array index
 */
QTS_CommandStatus perform_set_idx_value(QTS_CommandEnv *env, JSValueSlot target_slot, JSValueSlot value_slot, SetPropFlags flags, uint32_t index);

#endif // QTS_PERFORM_SET_IDX_VALUE_H
