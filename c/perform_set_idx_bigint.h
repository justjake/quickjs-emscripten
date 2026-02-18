// Generated - do not edit. To change, update scripts/idl.ts and run 'pnpm run generate:c-ops'
#ifndef QTS_PERFORM_SET_IDX_BIGINT_H
#define QTS_PERFORM_SET_IDX_BIGINT_H

#include "command.h"

/**
 * Set array element by index to BigInt
 * @param env Command execution environment
 * @param target_slot Target object to modify
 * @param flags SetPropFlags: property flags controlling set vs define behavior
 * @param i64_val The int64 value
 * @param index Array index
 */
QTS_CommandStatus perform_set_idx_bigint(QTS_CommandEnv *env, JSValueSlot target_slot, SetPropFlags flags, int64_t i64_val, uint32_t index);

#endif // QTS_PERFORM_SET_IDX_BIGINT_H
