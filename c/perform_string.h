// Generated - do not edit
#ifndef QTS_PERFORM_STRING_H
#define QTS_PERFORM_STRING_H

#include "command.h"

/** Create a string value (JS_NewStringLen) */
QTS_CommandStatus perform_string(QTS_CommandEnv *env, JSValueSlot result, char *str_ptr, uint32_t str_len);

#endif // QTS_PERFORM_STRING_H
