// Generated - do not edit. To change, update scripts/idl.ts and run 'pnpm run generate:c-ops'
#ifndef QTS_PERFORM_SET_IDX_NULL_H
#define QTS_PERFORM_SET_IDX_NULL_H

#include "command.h"

/**
 * Set array element by index to null
 * @param env Command execution environment
 * @param target_slot Target object to modify
 * @param index Array index
 */
QTS_CommandStatus perform_set_idx_null(QTS_CommandEnv *env, JSValueSlot target_slot, uint32_t index);

#endif // QTS_PERFORM_SET_IDX_NULL_H
