// Generated - do not edit. To change, update scripts/idl.ts and run 'pnpm run generate:c-ops'
#ifndef QTS_PERFORM_SET_IDX_F64_H
#define QTS_PERFORM_SET_IDX_F64_H

#include "command.h"

/**
 * Set array element by index to float64
 * @param env Command execution environment
 * @param target_slot Target object to modify
 * @param f64_val The float64 value
 * @param index Array index
 */
QTS_CommandStatus perform_set_idx_f64(QTS_CommandEnv *env, JSValueSlot target_slot, double f64_val, uint32_t index);

#endif // QTS_PERFORM_SET_IDX_F64_H
