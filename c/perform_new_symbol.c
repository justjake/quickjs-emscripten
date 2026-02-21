#include "perform_new_symbol.h"

/**
 * Create a Symbol (JS_NewSymbol or global symbol)
 * @param env Command execution environment
 * @param result_slot result will be written to this slot
 * @param is_global 1 for global symbol, 0 for local
 * @param desc_ptr Pointer to description string
 * @param desc_len Length of description
 */
QTS_CommandStatus perform_new_symbol(QTS_CommandEnv *env, JSValueSlot result_slot, uint8_t is_global, char *desc_ptr, uint32_t desc_len) {
    QTS_CommandStatus status = QTS_COMMAND_ERROR;
    JSValue global = JS_UNDEFINED;
    JSValue symbol_ctor = JS_UNDEFINED;
    JSValue description_value = JS_UNDEFINED;
    JSValue symbol_for = JS_UNDEFINED;
    JSValue symbol = JS_UNDEFINED;

    global = JS_GetGlobalObject(env->ctx);
    OP_ERROR_IF_GOTO(env, JS_IsException(global), "new_symbol: failed to get global object", cleanup);

    symbol_ctor = JS_GetPropertyStr(env->ctx, global, "Symbol");
    JS_FreeValue(env->ctx, global);
    global = JS_UNDEFINED;
    OP_ERROR_IF_GOTO(env, JS_IsException(symbol_ctor), "new_symbol: failed to get Symbol", cleanup);

    description_value = JS_NewStringLen(env->ctx, desc_ptr, desc_len);
    OP_ERROR_IF_GOTO(env, JS_IsException(description_value), "new_symbol: failed to create description string", cleanup);

    if (is_global) {
        symbol_for = JS_GetPropertyStr(env->ctx, symbol_ctor, "for");
        OP_ERROR_IF_GOTO(env, JS_IsException(symbol_for), "new_symbol: failed to get Symbol.for", cleanup);
        symbol = JS_Call(env->ctx, symbol_for, symbol_ctor, 1, &description_value);
    } else {
        symbol = JS_Call(env->ctx, symbol_ctor, JS_UNDEFINED, 1, &description_value);
    }
    OP_ERROR_IF_GOTO(env, JS_IsException(symbol), "new_symbol: exception", cleanup);

    OP_SET_JSVALUE(env, result_slot, symbol);
    symbol = JS_UNDEFINED;
    status = QTS_COMMAND_OK;
    goto cleanup;

cleanup:
    if (!JS_IsUndefined(symbol_for)) {
        JS_FreeValue(env->ctx, symbol_for);
    }
    if (!JS_IsUndefined(description_value)) {
        JS_FreeValue(env->ctx, description_value);
    }
    if (!JS_IsUndefined(symbol_ctor)) {
        JS_FreeValue(env->ctx, symbol_ctor);
    }
    if (!JS_IsUndefined(global)) {
        JS_FreeValue(env->ctx, global);
    }
    if (!JS_IsUndefined(symbol)) {
        JS_FreeValue(env->ctx, symbol);
    }
    return status;
}
