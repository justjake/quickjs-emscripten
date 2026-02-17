// Generated - do not edit
#ifndef QTS_PERFORM_SYMBOL_H
#define QTS_PERFORM_SYMBOL_H

#include "command.h"

/** Create a Symbol (JS_NewSymbol or global symbol) */
QTS_CommandStatus perform_symbol(QTS_CommandEnv *env, JSValueSlot result, uint8_t is_global, char *desc_ptr, uint32_t desc_len);

#endif // QTS_PERFORM_SYMBOL_H
