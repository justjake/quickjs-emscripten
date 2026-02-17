// Generated - do not edit
#ifndef QTS_PERFORM_FREE_H
#define QTS_PERFORM_FREE_H

#include "command.h"

/** Free a value (JS_FreeValue) - decrement refcount */
QTS_CommandStatus perform_free(QTS_CommandEnv *env, JSValueSlot slot);

#endif // QTS_PERFORM_FREE_H
