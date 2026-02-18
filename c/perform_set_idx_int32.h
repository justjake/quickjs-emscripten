// Generated - do not edit. To change, update scripts/idl.ts and run 'pnpm run generate:c-ops'
#ifndef QTS_PERFORM_SET_IDX_INT32_H
#define QTS_PERFORM_SET_IDX_INT32_H

#include "command.h"

/**
 * Set array element by index to int32
 * @param env Command execution environment
 * @param target_slot Target object to modify
 * @param flags SetPropFlags: property flags controlling set vs define behavior
 * @param index Array index
 * @param int_val The int32 value
 */
QTS_CommandStatus perform_set_idx_int32(QTS_CommandEnv *env, JSValueSlot target_slot, SetPropFlags flags, uint32_t index, int32_t int_val);

#endif // QTS_PERFORM_SET_IDX_INT32_H
