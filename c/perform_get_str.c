#include "perform_get_str.h"

QTS_CommandStatus perform_get_str(QTS_CommandEnv *env, JSValueSlot result_slot, JSValueSlot source_slot, char *key_ptr, uint32_t key_len) {
    OP_ERROR_IF(env, result_slot >= env->jsvalue_slots_count, "get_str: result out of range");
    JSValue source = OP_GET_JSVALUE(env, source_slot, "get_str: source");

    JSAtom key_atom = JS_ATOM_NULL;
    key_atom = JS_NewAtomLen(env->ctx, key_ptr, key_len);
    OP_ERROR_IF(env, key_atom == JS_ATOM_NULL, "get_str: failed to create atom");

    JSValue result = JS_GetProperty(env->ctx, source, key_atom);
    JS_FreeAtom(env->ctx, key_atom);
    OP_SET_JSVALUE(env, result_slot, result);

    OP_ERROR_IF(env, JS_IsException(result), "get_str: threw an exception");
    return QTS_COMMAND_OK;
}
