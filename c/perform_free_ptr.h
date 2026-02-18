// Generated - do not edit. To change, update scripts/idl.ts and run 'pnpm run generate:c-ops'
#ifndef QTS_PERFORM_FREE_PTR_H
#define QTS_PERFORM_FREE_PTR_H

#include "command.h"

/**
 * Free a JSValue* pointer - JS_FreeValue the value, then free the pointer
 * @param env Command execution environment
 * @param value_ptr Pointer to value to free
 */
QTS_CommandStatus perform_free_ptr(QTS_CommandEnv *env, JSValue *value_ptr);

#endif // QTS_PERFORM_FREE_PTR_H
