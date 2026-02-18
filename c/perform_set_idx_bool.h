// Generated - do not edit. To change, update scripts/idl.ts and run 'pnpm run generate:c-ops'
#ifndef QTS_PERFORM_SET_IDX_BOOL_H
#define QTS_PERFORM_SET_IDX_BOOL_H

#include "command.h"

/**
 * Set array element by index to boolean
 * @param env Command execution environment
 * @param target_slot Target object to modify
 * @param bool_val Boolean value (0 or 1)
 * @param index Array index
 */
QTS_CommandStatus perform_set_idx_bool(QTS_CommandEnv *env, JSValueSlot target_slot, uint8_t bool_val, uint32_t index);

#endif // QTS_PERFORM_SET_IDX_BOOL_H
