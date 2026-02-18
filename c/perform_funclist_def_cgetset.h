// Generated - do not edit. To change, update scripts/idl.ts and run 'pnpm run generate:c-ops'
#ifndef QTS_PERFORM_FUNCLIST_DEF_CGETSET_H
#define QTS_PERFORM_FUNCLIST_DEF_CGETSET_H

#include "command.h"

/**
 * Set funclist entry to JS_DEF_CGETSET
 * @param env Command execution environment
 * @param target_funclist_slot Target funclist to modify
 * @param index Index to set in the target funclist (0-255 / uint8_t)
 * @param flags JS_PROP_* property flags
 * @param key_ptr Property name/key string; must be null-terminated if maybe_name_len is not set
 * @param getter_ptr Getter c function pointer (0=no getter)
 * @param setter_ptr Setter c function pointer (0=no setter)
 */
QTS_CommandStatus perform_funclist_def_cgetset(QTS_CommandEnv *env, FuncListSlot target_funclist_slot, uint8_t index, JSPropFlags flags, char *key_ptr, JSCFunctionType *getter_ptr, JSCFunctionType *setter_ptr);

#endif // QTS_PERFORM_FUNCLIST_DEF_CGETSET_H
