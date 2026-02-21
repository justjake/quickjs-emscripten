// Generated - do not edit. To change, update scripts/idl.ts and run 'pnpm run ops:c'
#ifndef QTS_PERFORM_SLOT_STORE_H
#define QTS_PERFORM_SLOT_STORE_H

#include "command.h"

/**
 * Copy slot memory contents to a memory location owned by the caller
 * @param env Command execution environment
 * @param in_slot The slot to save
 * @param in_slot_type The type of the slot
 * @param out_ptr Pointer to the memory location to copy the slot memory contents to
 */
QTS_CommandStatus perform_slot_store(QTS_CommandEnv *env, AnySlot in_slot, SlotType in_slot_type, void *out_ptr);

#endif // QTS_PERFORM_SLOT_STORE_H
