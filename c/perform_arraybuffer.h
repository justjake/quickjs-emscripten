// Generated - do not edit
#ifndef QTS_PERFORM_ARRAYBUFFER_H
#define QTS_PERFORM_ARRAYBUFFER_H

#include "command.h"

/** Create an ArrayBuffer by copying data (JS_NewArrayBufferCopy) */
QTS_CommandStatus perform_arraybuffer(QTS_CommandEnv*env, JSValueSlot result, char*data_ptr, uint32_t data_len);

#endif // QTS_PERFORM_ARRAYBUFFER_H
