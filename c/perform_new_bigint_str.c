#include "perform_new_bigint_str.h"

// Perform op NEW_BIGINT_STR
// To change function signature, update scripts/idl.ts and run 'pnpm run ops:c'.
// Add new utilities to qts_utils.{h,c} if needed.

/**
 * Create a BigInt value from a decimal string
 * @param env Command execution environment
 * @param result_slot result will be written to this slot
 * @param str_ptr Pointer to decimal string data
 * @param str_len Length of string in bytes
 */
QTS_CommandStatus perform_new_bigint_str(QTS_CommandEnv *env, JSValueSlot result_slot, char *str_ptr, uint32_t str_len) {
    QTS_CommandStatus status = QTS_COMMAND_ERROR;
    JSValue global = JS_UNDEFINED;
    JSValue bigint_ctor = JS_UNDEFINED;
    JSValue str_value = JS_UNDEFINED;
    JSValue bigint = JS_UNDEFINED;

    global = JS_GetGlobalObject(env->ctx);
    OP_ERROR_IF_GOTO(env, JS_IsException(global), "new_bigint_str: failed to get global object", cleanup);

    bigint_ctor = JS_GetPropertyStr(env->ctx, global, "BigInt");
    JS_FreeValue(env->ctx, global);
    global = JS_UNDEFINED;
    OP_ERROR_IF_GOTO(env, JS_IsException(bigint_ctor), "new_bigint_str: failed to get BigInt", cleanup);

    str_value = JS_NewStringLen(env->ctx, str_ptr, str_len);
    OP_ERROR_IF_GOTO(env, JS_IsException(str_value), "new_bigint_str: failed to create string", cleanup);

    bigint = JS_Call(env->ctx, bigint_ctor, JS_UNDEFINED, 1, &str_value);
    OP_ERROR_IF_GOTO(env, JS_IsException(bigint), "new_bigint_str: exception", cleanup);

    OP_SET_JSVALUE(env, result_slot, bigint);
    bigint = JS_UNDEFINED;
    status = QTS_COMMAND_OK;

cleanup:
    if (!JS_IsUndefined(str_value)) {
        JS_FreeValue(env->ctx, str_value);
    }
    if (!JS_IsUndefined(bigint_ctor)) {
        JS_FreeValue(env->ctx, bigint_ctor);
    }
    if (!JS_IsUndefined(global)) {
        JS_FreeValue(env->ctx, global);
    }
    if (!JS_IsUndefined(bigint)) {
        JS_FreeValue(env->ctx, bigint);
    }
    return status;
}
