// Generated - do not edit
#ifndef QTS_PERFORM_CALL_H
#define QTS_PERFORM_CALL_H

#include "command.h"

/** Call a function (JS_Call) */
QTS_CommandStatus perform_call(QTS_CommandEnv*env, JSValueSlot result, JSValueSlot func, JSValueSlot this_val, JSValue*argv, uint32_t argc);

#endif // QTS_PERFORM_CALL_H
