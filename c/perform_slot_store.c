#include "perform_slot_store.h"
#include <string.h>

// Perform op SLOT_STORE
// To change function signature, update scripts/idl.ts and run 'pnpm run ops:c'.
// Add new utilities to qts_utils.{h,c} if needed.

/**
 * Copy slot memory contents to a memory location owned by the caller
 * @param env Command execution environment
 * @param in_slot The slot to save
 * @param in_slot_type The type of the slot
 * @param out_ptr Pointer to the memory location to copy the slot memory contents to
 */
QTS_CommandStatus perform_slot_store(QTS_CommandEnv *env, AnySlot in_slot, SlotType in_slot_type, void *out_ptr) {
    OP_ERROR_IF(env, !out_ptr, "slot_store: out_ptr is null");

    const void *src = NULL;
    uint32_t item_size = QTS_SlotTypeItemBytes(in_slot_type);
    OP_ERROR_IF(env, item_size == 0, "slot_store: unknown slot type");

    switch (in_slot_type) {
        case QTS_SLOT_TYPE_JSVALUE:
            OP_ERROR_IF(env, in_slot >= env->jsvalue_slots_count, "slot_store: jsvalue slot out of range");
            src = &env->jsvalue_slots[in_slot];
            break;
        case QTS_SLOT_TYPE_FUNCLIST:
            OP_ERROR_IF(env, in_slot >= env->funclist_slots_count, "slot_store: funclist slot out of range");
            src = &env->funclist_slots[in_slot];
            break;
        default:
            OP_ERROR(env, "slot_store: unknown slot type");
    }

    memcpy(out_ptr, src, item_size);
    return QTS_COMMAND_OK;
}
