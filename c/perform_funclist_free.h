// Generated - do not edit. To change, update scripts/idl.ts and run 'pnpm run generate:c-ops'
#ifndef QTS_PERFORM_FUNCLIST_FREE_H
#define QTS_PERFORM_FUNCLIST_FREE_H

#include "command.h"

/**
 * Free a funclist array
 * @param env Command execution environment
 * @param target_funclist_slot Target funclist to modify
 */
QTS_CommandStatus perform_funclist_free(QTS_CommandEnv *env, FuncListSlot target_funclist_slot);

#endif // QTS_PERFORM_FUNCLIST_FREE_H
