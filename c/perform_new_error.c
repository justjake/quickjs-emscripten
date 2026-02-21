#include "perform_new_error.h"
#include <string.h>

static const char *qts_error_name_from_flags(NewErrorFlags flags) {
    // Mapping: 0 = Error, 1..8 follow QuickJS native error order.
    switch (flags) {
        case 1: return "EvalError";
        case 2: return "RangeError";
        case 3: return "ReferenceError";
        case 4: return "SyntaxError";
        case 5: return "TypeError";
        case 6: return "URIError";
        case 7: return "InternalError";
        case 8: return "AggregateError";
        default: return "Error";
    }
}

/**
 * Create an Error object (JS_NewError or JS_New*Error)
 * @param env Command execution environment
 * @param result_slot result will be written to this slot
 * @param maybe_name_len If >0, length of error_name_ptr. if 0, error_name_ptr is null-terminated or not set
 * @param new_error_flags Flags used when creating the error; specifies the error type
 * @param message_ptr Pointer to error message
 * @param message_len Length of error message
 * @param name_ptr Optional. If given, override `error.name = NAME`. Otherwise use default name for given flags
 */
QTS_CommandStatus perform_new_error(QTS_CommandEnv *env, JSValueSlot result_slot, uint8_t maybe_name_len, NewErrorFlags new_error_flags, char *message_ptr, uint32_t message_len, char *name_ptr) {
    QTS_CommandStatus status = QTS_COMMAND_ERROR;
    JSValue error = JS_UNDEFINED;
    JSValue global = JS_UNDEFINED;
    JSValue ctor = JS_UNDEFINED;
    JSValue message = JS_UNDEFINED;
    JSValue name = JS_UNDEFINED;

    const char *ctor_name = qts_error_name_from_flags(new_error_flags);
    if (ctor_name && strcmp(ctor_name, "Error") != 0) {
        global = JS_GetGlobalObject(env->ctx);
        OP_ERROR_IF_GOTO(env, JS_IsException(global), "new_error: failed to get global object", cleanup);
        ctor = JS_GetPropertyStr(env->ctx, global, ctor_name);
        JS_FreeValue(env->ctx, global);
        global = JS_UNDEFINED;
        OP_ERROR_IF_GOTO(env, JS_IsException(ctor), "new_error: failed to get error constructor", cleanup);
        error = JS_CallConstructor(env->ctx, ctor, 0, NULL);
        JS_FreeValue(env->ctx, ctor);
        ctor = JS_UNDEFINED;
    } else {
        error = JS_NewError(env->ctx);
    }
    OP_ERROR_IF_GOTO(env, JS_IsException(error), "new_error: failed to create error", cleanup);

    message = JS_NewStringLen(env->ctx, message_ptr, message_len);
    OP_ERROR_IF_GOTO(env, JS_IsException(message), "new_error: failed to create message string", cleanup);
    int message_ret = JS_DefinePropertyValueStr(env->ctx, error, "message", message, JS_PROP_WRITABLE | JS_PROP_CONFIGURABLE);
    message = JS_UNDEFINED;
    OP_ERROR_IF_GOTO(env, message_ret < 0, "new_error: failed to set message", cleanup);

    if (name_ptr) {
        size_t name_len = maybe_name_len > 0 ? maybe_name_len : strlen(name_ptr);
        name = JS_NewStringLen(env->ctx, name_ptr, name_len);
        OP_ERROR_IF_GOTO(env, JS_IsException(name), "new_error: failed to create name string", cleanup);
        int name_ret = JS_DefinePropertyValueStr(env->ctx, error, "name", name, JS_PROP_WRITABLE | JS_PROP_CONFIGURABLE);
        name = JS_UNDEFINED;
        OP_ERROR_IF_GOTO(env, name_ret < 0, "new_error: failed to set name", cleanup);
    }

    OP_SET_JSVALUE(env, result_slot, error);
    error = JS_UNDEFINED;
    status = QTS_COMMAND_OK;

cleanup:
    if (!JS_IsUndefined(message)) {
        JS_FreeValue(env->ctx, message);
    }
    if (!JS_IsUndefined(name)) {
        JS_FreeValue(env->ctx, name);
    }
    if (!JS_IsUndefined(ctor)) {
        JS_FreeValue(env->ctx, ctor);
    }
    if (!JS_IsUndefined(global)) {
        JS_FreeValue(env->ctx, global);
    }
    if (!JS_IsUndefined(error)) {
        JS_FreeValue(env->ctx, error);
    }
    return status;
}
