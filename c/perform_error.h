// Generated - do not edit
#ifndef QTS_PERFORM_ERROR_H
#define QTS_PERFORM_ERROR_H

#include "command.h"

/** Create an Error object (JS_NewError or JS_New*Error) */
QTS_CommandStatus perform_error(QTS_CommandEnv *env, JSValueSlot result, uint8_t error_type, char *message_ptr, uint32_t message_len);

#endif // QTS_PERFORM_ERROR_H
