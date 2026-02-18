// Generated - do not edit. To change, update scripts/idl.ts and run 'pnpm run generate:c-ops'
#ifndef QTS_PERFORM_DEF_GETSET_H
#define QTS_PERFORM_DEF_GETSET_H

#include "command.h"

/**
 * define a getter/setter property on object
 * @param env Command execution environment
 * @param target_slot Target object to modify
 * @param maybe_key_len if >0, length of key_ptr. if 0, key_ptr is null-terminated
 * @param flags JS_PROP_* property flags
 * @param getter_ref Host reference ID for getter (0 = none)
 * @param setter_ref Host reference ID for setter (0 = none)
 * @param key_ptr Property name/key string; must be null-terminated if maybe_name_len is not set
 */
QTS_CommandStatus perform_def_getset(QTS_CommandEnv *env, JSValueSlot target_slot, uint8_t maybe_key_len, JSPropFlags flags, HostRefId getter_ref, HostRefId setter_ref, char *key_ptr);

#endif // QTS_PERFORM_DEF_GETSET_H
