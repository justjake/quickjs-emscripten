#include "perform_set_add.h"

/**
 * Call set.add(value)
 * @param env Command execution environment
 * @param target_slot Target object to modify
 * @param value_slot slot containing value
 */
QTS_CommandStatus perform_set_add(QTS_CommandEnv *env, JSValueSlot target_slot, JSValueSlot value_slot) {
    JSValue set = OP_GET_JSVALUE(env, target_slot, "set_add: target");
    JSValue value = OP_GET_JSVALUE(env, value_slot, "set_add: value");

    // Get the 'add' method from the set
    JSValue add_method = JS_GetPropertyStr(env->ctx, set, "add");
    OP_ERROR_IF(env, JS_IsException(add_method), "set_add: failed to get add method");

    // Call set.add(value)
    JSValue result = JS_Call(env->ctx, add_method, set, 1, &value);
    JS_FreeValue(env->ctx, add_method);
    JS_FreeValue(env->ctx, result); // set.add returns the set itself, which we don't need

    OP_ERROR_IF(env, JS_IsException(result), "set_add: exception");
    return QTS_COMMAND_OK;
}
