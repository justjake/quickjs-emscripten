// Generated - do not edit
#ifndef QTS_PERFORM_SET_STR_STRING_H
#define QTS_PERFORM_SET_STR_STRING_H

#include "op.h"

/** Set property by string key to string value (name must be null-terminated) */
QTS_CommandStatus perform_set_str_string(QTS_CommandEnv*env, JSValueSlot obj, char*str_ptr, uint32_t str_len, uint32_t name_ptr);

#endif // QTS_PERFORM_SET_STR_STRING_H
