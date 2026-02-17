// Generated - do not edit
#ifndef QTS_UTIL_H
#define QTS_UTIL_H

#include <stdio.h>
#include "op.h"

#define QTS_UNIMPLEMENTED(env, name) do { \
    (env)->error = "UNIMPLEMENTED: " name; \
    return QTS_COMMAND_ERROR; \
} while(0)

#endif // QTS_UTIL_H
