// Generated - do not edit. To change, update scripts/idl.ts and run 'pnpm run generate:c-ops'
#ifndef QTS_PERFORM_GET_IDX_H
#define QTS_PERFORM_GET_IDX_H

#include "command.h"

/**
 * Get property by numeric index (JS_GetPropertyUint32)
 * @param env Command execution environment
 * @param result_slot result will be written to this slot
 * @param source_slot source value will be read from this slot
 * @param index Array index
 */
QTS_CommandStatus perform_get_idx(QTS_CommandEnv *env, JSValueSlot result_slot, JSValueSlot source_slot, uint32_t index);

#endif // QTS_PERFORM_GET_IDX_H
