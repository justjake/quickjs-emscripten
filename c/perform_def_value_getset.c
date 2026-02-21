#include "perform_def_value_getset.h"

// Perform op DEF_VALUE_GETSET
// To change function signature, update scripts/idl.ts and run 'pnpm run ops:c'.
// Add new utilities to qts_utils.{h,c} if needed.

/**
 * define a getter/setter property on object
 * @param env Command execution environment
 * @param target_slot Target object to modify
 * @param maybe_key_len if >0, length of key_ptr. if 0, key_ptr is null-terminated
 * @param flags JS_PROP_* property flags
 * @param getter_ref Host reference ID for getter (0 = none)
 * @param setter_ref Host reference ID for setter (0 = none)
 * @param key_ptr Property name/key string; must be null-terminated if maybe_name_len is not set
 */
QTS_CommandStatus perform_def_value_getset(QTS_CommandEnv *env, JSValueSlot target_slot, uint8_t maybe_key_len, JSPropFlags flags, HostRefId getter_ref, HostRefId setter_ref, char *key_ptr) {
    JSValue target = OP_GET_JSVALUE(env, target_slot, "def_value_getset: target");

    QTS_CommandStatus status = QTS_COMMAND_ERROR;
    JSAtom key_atom = QTS_NewAtomMaybeLen(env->ctx, key_ptr, maybe_key_len);
    OP_ERROR_IF_GOTO(env, key_atom == JS_ATOM_NULL, "def_value_getset: failed to create key atom", cleanup);

    JSValue getter = JS_UNDEFINED;
    if (getter_ref != 0) {
        JSValue getter_host_ref = new_host_ref(env->ctx, getter_ref);
        OP_ERROR_IF_GOTO(env, JS_IsException(getter_host_ref), "def_value_getset: failed to create getter host ref", cleanup);
        getter = JS_NewCFunctionData(
            env->ctx,
            (JSCFunctionData *)qts_funclist_getter,
            0,
            getter_ref,
            1,
            &getter_host_ref
        );
        JS_FreeValue(env->ctx, getter_host_ref);
        OP_ERROR_IF_GOTO(env, JS_IsException(getter), "def_value_getset: failed to create getter function", cleanup);
    }

    JSValue setter = JS_UNDEFINED;
    if (setter_ref != 0) {
        JSValue setter_host_ref = new_host_ref(env->ctx, setter_ref);
        OP_ERROR_IF_GOTO(env, JS_IsException(setter_host_ref), "def_value_getset: failed to create setter host ref", cleanup);
        setter = JS_NewCFunctionData(
            env->ctx,
            (JSCFunctionData *)qts_funclist_setter,
            1,
            setter_ref,
            1,
            &setter_host_ref
        );
        JS_FreeValue(env->ctx, setter_host_ref);
        OP_ERROR_IF_GOTO(env, JS_IsException(setter), "def_value_getset: failed to create setter function", cleanup);
    }

    int ret = JS_DefinePropertyGetSet(
        env->ctx,
        target,
        key_atom,
        getter,
        setter,
        flags | JS_PROP_HAS_GET | JS_PROP_HAS_SET
    );
    JS_FreeAtom(env->ctx, key_atom);
    key_atom = JS_ATOM_NULL;
    getter = JS_UNDEFINED;
    setter = JS_UNDEFINED;
    OP_ERROR_IF_GOTO(env, ret < 0, "def_value_getset: exception", cleanup);
    status = QTS_COMMAND_OK;
    goto cleanup;

cleanup:
    if (key_atom != JS_ATOM_NULL) {
        JS_FreeAtom(env->ctx, key_atom);
    }
    if (!JS_IsUndefined(getter)) {
        JS_FreeValue(env->ctx, getter);
    }
    if (!JS_IsUndefined(setter)) {
        JS_FreeValue(env->ctx, setter);
    }
    return status;
}
