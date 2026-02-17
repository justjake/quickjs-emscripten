// Generated - do not edit
#ifndef QTS_PERFORM_TYPED_ARRAY_H
#define QTS_PERFORM_TYPED_ARRAY_H

#include "command.h"

/** Create a TypedArray view (JS_NewTypedArray) */
QTS_CommandStatus perform_typed_array(QTS_CommandEnv *env, JSValueSlot result, JSValueSlot buffer, uint8_t array_type, uint32_t byte_offset, uint32_t length);

#endif // QTS_PERFORM_TYPED_ARRAY_H
