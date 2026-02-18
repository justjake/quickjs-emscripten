// Generated - do not edit. To change, update scripts/idl.ts and run 'pnpm run generate:c-ops'
#ifndef QTS_PERFORM_FUNCLIST_ASSIGN_H
#define QTS_PERFORM_FUNCLIST_ASSIGN_H

#include "command.h"

/**
 * Assign all properties defined in the funclist to the target object (JS_SetPropertyFunctionList)
 * @param env Command execution environment
 * @param target_slot Target object to modify
 * @param source_funclist_slot Funclist slot
 */
QTS_CommandStatus perform_funclist_assign(QTS_CommandEnv *env, JSValueSlot target_slot, FuncListSlot source_funclist_slot);

#endif // QTS_PERFORM_FUNCLIST_ASSIGN_H
