// Generated - do not edit. To change, update scripts/idl.ts and run 'pnpm run ops:c'
#ifndef QTS_PERFORM_NEW_SYMBOL_H
#define QTS_PERFORM_NEW_SYMBOL_H

#include "command.h"

/**
 * Create a Symbol (JS_NewSymbol or global symbol)
 * @param env Command execution environment
 * @param result_slot result will be written to this slot
 * @param is_global 1 for global symbol, 0 for local
 * @param desc_ptr Pointer to description string
 * @param desc_len Length of description
 */
QTS_CommandStatus perform_new_symbol(QTS_CommandEnv *env, JSValueSlot result_slot, uint8_t is_global, char *desc_ptr, uint32_t desc_len);

#endif // QTS_PERFORM_NEW_SYMBOL_H
