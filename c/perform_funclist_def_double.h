// Generated - do not edit. To change, update scripts/idl.ts and run 'pnpm run ops:c'
#ifndef QTS_PERFORM_FUNCLIST_DEF_DOUBLE_H
#define QTS_PERFORM_FUNCLIST_DEF_DOUBLE_H

#include "command.h"

/**
 * Set funclist entry to JS_DEF_PROP_DOUBLE (index in slot_c)
 * @param env Command execution environment
 * @param target_funclist_slot Target funclist to modify
 * @param index Index to set in the target funclist (0-255 / uint8_t)
 * @param flags JS_PROP_* property flags
 * @param f64_val The double value
 * @param key_ptr Property name/key string; must be null-terminated if maybe_name_len is not set
 */
QTS_CommandStatus perform_funclist_def_double(QTS_CommandEnv *env, FuncListSlot target_funclist_slot, uint8_t index, JSPropFlags flags, double f64_val, char *key_ptr);

#endif // QTS_PERFORM_FUNCLIST_DEF_DOUBLE_H
