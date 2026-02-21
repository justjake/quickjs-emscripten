// Generated - do not edit. To change, update scripts/idl.ts and run 'pnpm run ops:c'
#ifndef QTS_PERFORM_SLOT_LOAD_H
#define QTS_PERFORM_SLOT_LOAD_H

#include "command.h"

/**
 * Copy data from a memory location into a slot
 * @param env Command execution environment
 * @param out_slot The slot load into
 * @param out_slot_type The type of the slot
 * @param in_ptr Pointer to the memory location to copy the slot memory contents from
 * @param len Max bytes to copy
 */
QTS_CommandStatus perform_slot_load(QTS_CommandEnv *env, AnySlot out_slot, SlotType out_slot_type, void *in_ptr, uint32_t len);

#endif // QTS_PERFORM_SLOT_LOAD_H
