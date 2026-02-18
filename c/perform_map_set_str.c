#include "perform_map_set_str.h"

/**
 * Call map.set(key, value) with string key
 * @param env Command execution environment
 * @param target_slot Target object to modify
 * @param value_slot slot containing value
 * @param key_ptr Key string pointer
 * @param key_len Key string length
 */
QTS_CommandStatus perform_map_set_str(QTS_CommandEnv *env, JSValueSlot target_slot, JSValueSlot value_slot, char *key_ptr, uint32_t key_len) {
    JSValue map = OP_GET_JSVALUE(env, target_slot, "map_set_str: target");
    JSValue value = OP_GET_JSVALUE(env, value_slot, "map_set_str: value");

    // Get the 'set' method from the map
    JSValue set_method = JS_GetPropertyStr(env->ctx, map, "set");
    OP_ERROR_IF(env, JS_IsException(set_method), "map_set_str: failed to get set method");

    // Create string key
    JSValue key = JS_NewStringLen(env->ctx, key_ptr, key_len);

    // Call map.set(key, value)
    JSValue args[2] = { key, value };
    JSValue result = JS_Call(env->ctx, set_method, map, 2, args);
    JS_FreeValue(env->ctx, key);
    JS_FreeValue(env->ctx, set_method);
    JS_FreeValue(env->ctx, result); // map.set returns the map itself, which we don't need

    OP_ERROR_IF(env, JS_IsException(result), "map_set_str: exception");
    return QTS_COMMAND_OK;
}
