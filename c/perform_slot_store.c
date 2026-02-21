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
 * @param len Max bytes to copy
 */
QTS_CommandStatus perform_slot_store(QTS_CommandEnv *env, AnySlot in_slot, SlotType in_slot_type, void *out_ptr, uint32_t len) {
    OP_ERROR_IF(env, !out_ptr, "slot_store: out_ptr is null");

    const void *src = NULL;
    uint32_t item_size = 0;

    switch (in_slot_type) {
        case QTS_SLOT_TYPE_JSVALUE:
            OP_ERROR_IF(env, in_slot >= env->jsvalue_slots_count, "slot_store: jsvalue slot out of range");
            OP_ERROR_IF(env, len != sizeof(JSValue), "slot_store: jsvalue slot size mismatch");
            src = &env->jsvalue_slots[in_slot];
            item_size = sizeof(JSValue);
            break;
        case QTS_SLOT_TYPE_FUNCLIST:
            OP_ERROR_IF(env, in_slot >= env->funclist_slots_count, "slot_store: funclist slot out of range");
            OP_ERROR_IF(env, len != sizeof(QTS_FuncList), "slot_store: funclist slot size mismatch");
            src = &env->funclist_slots[in_slot];
            item_size = sizeof(QTS_FuncList);
            break;
        default:
            OP_ERROR(env, "slot_store: unknown slot type");
    }

    memcpy(out_ptr, src, len);
    return QTS_COMMAND_OK;
}
