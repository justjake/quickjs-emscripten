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
    JSValue global = JS_GetGlobalObject(env->ctx);
    JSValue Symbol = JS_GetPropertyStr(env->ctx, global, "Symbol");
    JS_FreeValue(env->ctx, global);

    JSValue descriptionValue = JS_NewStringLen(env->ctx, desc_ptr, desc_len);
    JSValue symbol;

    if (is_global) {
        JSValue Symbol_for = JS_GetPropertyStr(env->ctx, Symbol, "for");
        symbol = JS_Call(env->ctx, Symbol_for, Symbol, 1, &descriptionValue);
        JS_FreeValue(env->ctx, Symbol_for);
    } else {
        symbol = JS_Call(env->ctx, Symbol, JS_UNDEFINED, 1, &descriptionValue);
    }

    JS_FreeValue(env->ctx, descriptionValue);
    JS_FreeValue(env->ctx, Symbol);

    OP_SET_JSVALUE(env, result_slot, symbol);
    OP_ERROR_IF(env, JS_IsException(symbol), "new_symbol: exception");
    return QTS_COMMAND_OK;
}
