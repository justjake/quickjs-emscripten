// Generated - do not edit. To change, update scripts/idl.ts and run 'pnpm run generate:c-ops'
#ifndef QTS_PERFORM_FUNCLIST_NEW_H
#define QTS_PERFORM_FUNCLIST_NEW_H

#include "command.h"

/**
 * Allocate a new JSCFunctionListEntry array
 * @param env Command execution environment
 * @param result_funclist_slot Slot to store the funclist pointer
 * @param count Number of entries to allocate
 */
QTS_CommandStatus perform_funclist_new(QTS_CommandEnv *env, FuncListSlot result_funclist_slot, uint32_t count);

#endif // QTS_PERFORM_FUNCLIST_NEW_H
