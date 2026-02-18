// Generated - do not edit. To change, update scripts/idl.ts and run 'pnpm run generate:c-ops'
#ifndef QTS_PERFORM_SET_IDX_STRING_H
#define QTS_PERFORM_SET_IDX_STRING_H

#include "command.h"

/**
 * Set array element by index to string
 * @param env Command execution environment
 * @param target_slot Target object to modify
 * @param flags SetPropFlags: property flags controlling set vs define behavior
 * @param str_ptr String value pointer
 * @param str_len String value length
 * @param index Array index
 */
QTS_CommandStatus perform_set_idx_string(QTS_CommandEnv *env, JSValueSlot target_slot, SetPropFlags flags, char *str_ptr, uint32_t str_len, uint32_t index);

#endif // QTS_PERFORM_SET_IDX_STRING_H
