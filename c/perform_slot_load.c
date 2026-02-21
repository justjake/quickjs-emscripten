#include "perform_slot_load.h"
#include <string.h>

// Perform op SLOT_LOAD
// To change function signature, update scripts/idl.ts and run 'pnpm run generate:c-ops'.
// Add new utilities to qts_utils.{h,c} if needed.

/**
 * Copy data from a memory location into a slot
 * @param env Command execution environment
 * @param out_slot The slot load into
 * @param out_slot_type The type of the slot
 * @param in_ptr Pointer to the memory location to copy the slot memory contents from
 * @param len Max bytes to copy
 */
QTS_CommandStatus perform_slot_load(QTS_CommandEnv *env, AnySlot out_slot, SlotType out_slot_type, void *in_ptr, uint32_t len) {
    OP_ERROR_IF(env, !in_ptr, "slot_load: in_ptr is null");

    void *dst = NULL;

    switch (out_slot_type) {
        case QTS_SLOT_TYPE_JSVALUE:
            OP_ERROR_IF(env, out_slot >= env->jsvalue_slots_count, "slot_load: jsvalue slot out of range");
            OP_ERROR_IF(env, len != sizeof(JSValue), "slot_load: jsvalue slot size mismatch");
            dst = &env->jsvalue_slots[out_slot];
            break;
        case QTS_SLOT_TYPE_FUNCLIST:
            OP_ERROR_IF(env, out_slot >= env->funclist_slots_count, "slot_load: funclist slot out of range");
            OP_ERROR_IF(env, len != sizeof(QTS_FuncList), "slot_load: funclist slot size mismatch");
            dst = &env->funclist_slots[out_slot];
            break;
        default:
            OP_ERROR(env, "slot_load: unknown slot type");
    }

    memcpy(dst, in_ptr, len);
    return QTS_COMMAND_OK;
}
