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

    JSAtom key_atom = QTS_NewAtomMaybeLen(env->ctx, key_ptr, maybe_key_len);
    OP_ERROR_IF(env, key_atom == JS_ATOM_NULL, "def_value_getset: failed to create key atom");

    JSValue getter = JS_UNDEFINED;
    if (getter_ref != 0) {
        JSValue getter_host_ref = new_host_ref(env->ctx, getter_ref);
        if (JS_IsException(getter_host_ref)) {
            JS_FreeAtom(env->ctx, key_atom);
            OP_ERROR(env, "def_value_getset: failed to create getter host ref");
        }
        getter = JS_NewCFunctionData(
            env->ctx,
            (JSCFunctionData *)qts_funclist_getter,
            0,
            getter_ref,
            1,
            &getter_host_ref
        );
        if (JS_IsException(getter)) {
            JS_FreeAtom(env->ctx, key_atom);
            OP_ERROR(env, "def_value_getset: failed to create getter function");
        }
    }

    JSValue setter = JS_UNDEFINED;
    if (setter_ref != 0) {
        JSValue setter_host_ref = new_host_ref(env->ctx, setter_ref);
        if (JS_IsException(setter_host_ref)) {
            JS_FreeValue(env->ctx, getter);
            JS_FreeAtom(env->ctx, key_atom);
            OP_ERROR(env, "def_value_getset: failed to create setter host ref");
        }
        setter = JS_NewCFunctionData(
            env->ctx,
            (JSCFunctionData *)qts_funclist_setter,
            1,
            setter_ref,
            1,
            &setter_host_ref
        );
        if (JS_IsException(setter)) {
            JS_FreeValue(env->ctx, getter);
            JS_FreeAtom(env->ctx, key_atom);
            OP_ERROR(env, "def_value_getset: failed to create setter function");
        }
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
    OP_ERROR_IF(env, ret < 0, "def_value_getset: exception");
    return QTS_COMMAND_OK;
}
