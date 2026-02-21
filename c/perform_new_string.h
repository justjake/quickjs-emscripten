// Generated - do not edit. To change, update scripts/idl.ts and run 'pnpm run ops:c'
#ifndef QTS_PERFORM_NEW_STRING_H
#define QTS_PERFORM_NEW_STRING_H

#include "command.h"

/**
 * Create a string value (JS_NewStringLen)
 * @param env Command execution environment
 * @param result_slot result will be written to this slot
 * @param str_ptr Pointer to string data
 * @param str_len Length of string in bytes
 */
QTS_CommandStatus perform_new_string(QTS_CommandEnv *env, JSValueSlot result_slot, char *str_ptr, uint32_t str_len);

#endif // QTS_PERFORM_NEW_STRING_H
