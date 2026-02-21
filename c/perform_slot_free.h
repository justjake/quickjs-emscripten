// Generated - do not edit. To change, update scripts/idl.ts and run 'pnpm run generate:c-ops'
#ifndef QTS_PERFORM_SLOT_FREE_H
#define QTS_PERFORM_SLOT_FREE_H

#include "command.h"

/**
 * Free a slot: for JSValueSlot, call JS_FreeValue to decrement refcount; for FuncListSlot, free the array of JSCFunctionListEntry
 * @param env Command execution environment
 * @param target_slot The slot to free
 * @param target_slot_type The type of the slot
 */
QTS_CommandStatus perform_slot_free(QTS_CommandEnv *env, AnySlot target_slot, SlotType target_slot_type);

#endif // QTS_PERFORM_SLOT_FREE_H
