#include "perform_map_set.h"

/**
 * Call map.set(key, value) using JSValue key
 * @param env Command execution environment
 * @param target_slot Target object to modify
 * @param key_slot slot containing property key
 * @param value_slot slot containing value
 */
QTS_CommandStatus perform_map_set(QTS_CommandEnv *env, JSValueSlot target_slot, JSValueSlot key_slot, JSValueSlot value_slot) {
    JSValue map = OP_GET_JSVALUE(env, target_slot, "map_set: target");
    JSValue key = OP_GET_JSVALUE(env, key_slot, "map_set: key");
    JSValue value = OP_GET_JSVALUE(env, value_slot, "map_set: value");

    // Get the 'set' method from the map
    JSValue set_method = JS_GetPropertyStr(env->ctx, map, "set");
    OP_ERROR_IF(env, JS_IsException(set_method), "map_set: failed to get set method");

    // Call map.set(key, value)
    JSValue args[2] = { key, value };
    JSValue result = JS_Call(env->ctx, set_method, map, 2, args);
    JS_FreeValue(env->ctx, set_method);
    JS_FreeValue(env->ctx, result); // map.set returns the map itself, which we don't need

    OP_ERROR_IF(env, JS_IsException(result), "map_set: exception");
    return QTS_COMMAND_OK;
}
