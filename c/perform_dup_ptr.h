// Generated - do not edit. To change, update scripts/idl.ts and run 'pnpm run generate:c-ops'
#ifndef QTS_PERFORM_DUP_PTR_H
#define QTS_PERFORM_DUP_PTR_H

#include "command.h"

/**
 * Duplicate a JSValue* pointer into a JSValueSlot
 * @param env Command execution environment
 * @param result_slot result will be written to this slot
 * @param value_ptr Pointer to value to duplicate
 */
QTS_CommandStatus perform_dup_ptr(QTS_CommandEnv *env, JSValueSlot result_slot, JSValue *value_ptr);

#endif // QTS_PERFORM_DUP_PTR_H
