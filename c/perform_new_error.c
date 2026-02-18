#include "perform_new_error.h"

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
    // Create the base error object - for now just create a generic Error
    // The flags could be used to create specific error types (TypeError, etc.)
    JSValue error = JS_NewError(env->ctx);
    OP_ERROR_IF(env, JS_IsException(error), "new_error: failed to create error");

    // Set message property
    JSValue message = JS_NewStringLen(env->ctx, message_ptr, message_len);
    JS_DefinePropertyValueStr(env->ctx, error, "message", message, JS_PROP_WRITABLE | JS_PROP_CONFIGURABLE);

    // Optionally set name property if name_ptr is provided
    if (name_ptr) {
        size_t name_len = maybe_name_len > 0 ? maybe_name_len : strlen(name_ptr);
        JSValue name = JS_NewStringLen(env->ctx, name_ptr, name_len);
        JS_DefinePropertyValueStr(env->ctx, error, "name", name, JS_PROP_WRITABLE | JS_PROP_CONFIGURABLE);
    }

    OP_SET_JSVALUE(env, result_slot, error);
    return QTS_COMMAND_OK;
}
