// Generated - do not edit
#ifndef QTS_PERFORM_DUP_H
#define QTS_PERFORM_DUP_H

#include "command.h"

/** Duplicate a value (JS_DupValue) - increment refcount */
QTS_CommandStatus perform_dup(QTS_CommandEnv *env, JSValueSlot result, JSValueSlot src);

#endif // QTS_PERFORM_DUP_H
