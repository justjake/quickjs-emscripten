#include "perform_slot_free.h"

// Perform op SLOT_FREE
// To change function signature, update scripts/idl.ts and run 'pnpm run ops:c'.
// Add new utilities to qts_utils.{h,c} if needed.

/**
 * Free a slot: for JSValueSlot, call JS_FreeValue to decrement refcount; for FuncListSlot, free the array of JSCFunctionListEntry
 * @param env Command execution environment
 * @param target_slot The slot to free
 * @param target_slot_type The type of the slot
 */
QTS_CommandStatus perform_slot_free(QTS_CommandEnv *env, AnySlot target_slot, SlotType target_slot_type) {
    switch (target_slot_type) {
        case QTS_SLOT_TYPE_JSVALUE:
            OP_ERROR_IF(env, target_slot >= env->jsvalue_slots_count, "slot_free: jsvalue slot out of range");
            JS_FreeValue(env->ctx, env->jsvalue_slots[target_slot]);
            env->jsvalue_slots[target_slot] = JS_UNDEFINED;
            return QTS_COMMAND_OK;
        case QTS_SLOT_TYPE_FUNCLIST:
            OP_ERROR_IF(env, target_slot >= env->funclist_slots_count, "slot_free: funclist slot out of range");
            if (env->funclist_slots[target_slot].entries) {
                js_free_rt(JS_GetRuntime(env->ctx), env->funclist_slots[target_slot].entries);
                env->funclist_slots[target_slot].entries = NULL;
            }
            env->funclist_slots[target_slot].count = 0;
            return QTS_COMMAND_OK;
        default:
            OP_ERROR(env, "slot_free: unknown slot type");
    }
}
