#include "perform_new_map.h"

// Perform op NEW_MAP
// To change function signature, update scripts/idl.ts and run 'pnpm run ops:c'.
// Add new utilities to qts_utils.{h,c} if needed.

/**
 * Create a new empty Map (new Map())
 * @param env Command execution environment
 * @param result_slot result will be written to this slot
 */
QTS_CommandStatus perform_new_map(QTS_CommandEnv *env, JSValueSlot result_slot) {
    JSValue global = JS_GetGlobalObject(env->ctx);
    JSValue ctor = JS_GetPropertyStr(env->ctx, global, "Map");
    JS_FreeValue(env->ctx, global);

    OP_ERROR_IF(env, JS_IsException(ctor), "new_map: failed to get global Map constructor");

    JSValue result = JS_CallConstructor(env->ctx, ctor, 0, NULL);
    JS_FreeValue(env->ctx, ctor);

    OP_SET_JSVALUE(env, result_slot, result);
    OP_ERROR_IF(env, JS_IsException(result), "new_map: exception");
    return QTS_COMMAND_OK;
}
