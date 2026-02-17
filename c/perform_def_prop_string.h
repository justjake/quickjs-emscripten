// Generated - do not edit
#ifndef QTS_PERFORM_DEF_PROP_STRING_H
#define QTS_PERFORM_DEF_PROP_STRING_H

#include "command.h"

/** Define property with string value (name must be null-terminated) */
QTS_CommandStatus perform_def_prop_string(QTS_CommandEnv*env, JSValueSlot obj, JSPropFlags flags, char*str_ptr, uint32_t str_len, uint32_t name_ptr);

#endif // QTS_PERFORM_DEF_PROP_STRING_H
