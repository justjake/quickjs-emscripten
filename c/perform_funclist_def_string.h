// Generated - do not edit. To change, update scripts/idl.ts and run 'pnpm run generate:c-ops'
#ifndef QTS_PERFORM_FUNCLIST_DEF_STRING_H
#define QTS_PERFORM_FUNCLIST_DEF_STRING_H

#include "command.h"

/**
 * Set funclist entry to JS_DEF_PROP_STRING
 * @param env Command execution environment
 * @param target_funclist_slot Target funclist to modify
 * @param index Index to set in the target funclist (0-255 / uint8_t)
 * @param flags JS_PROP_* property flags
 * @param str_ptr String value pointer
 * @param str_len String value length
 * @param name_ptr Property name pointer (MUST be null-terminated)
 */
QTS_CommandStatus perform_funclist_def_string(QTS_CommandEnv *env, FuncListSlot target_funclist_slot, uint8_t index, JSPropFlags flags, char *str_ptr, uint32_t str_len, char *name_ptr);

#endif // QTS_PERFORM_FUNCLIST_DEF_STRING_H
