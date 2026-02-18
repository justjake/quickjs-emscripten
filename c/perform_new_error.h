// Generated - do not edit. To change, update scripts/idl.ts and run 'pnpm run generate:c-ops'
#ifndef QTS_PERFORM_NEW_ERROR_H
#define QTS_PERFORM_NEW_ERROR_H

#include "command.h"

/**
 * Create an Error object (JS_NewError or JS_New*Error)
 * @param env Command execution environment
 * @param result_slot result will be written to this slot
 * @param maybe_name_len If >0, length of error_name_ptr. if 0, error_name_ptr is null-terminated or not set
 * @param new_error_flags Flags used when creating the error; specifies the error type
 * @param message_ptr Pointer to error message
 * @param message_len Length of error message
 * @param name_ptr Optional. If given, override `error.name = NAME`. Otherwise use default name for given flags
 */
QTS_CommandStatus perform_new_error(QTS_CommandEnv *env, JSValueSlot result_slot, uint8_t maybe_name_len, NewErrorFlags new_error_flags, char *message_ptr, uint32_t message_len, char *name_ptr);

#endif // QTS_PERFORM_NEW_ERROR_H
