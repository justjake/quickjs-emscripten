#include "perform_new_object_proto.h"

/**
 * Create a new object with prototype (JS_NewObjectProto)
 * @param env Command execution environment
 * @param result_slot result will be written to this slot
 * @param proto_slot Prototype object slot
 */
QTS_CommandStatus perform_new_object_proto(QTS_CommandEnv *env, JSValueSlot result_slot, JSValueSlot proto_slot) {
    JSValue proto = OP_GET_JSVALUE(env, proto_slot, "new_object_proto: proto");
    JSValue result = JS_NewObjectProto(env->ctx, proto);
    OP_SET_JSVALUE(env, result_slot, result);
    OP_ERROR_IF(env, JS_IsException(result), "new_object_proto: exception");
    return QTS_COMMAND_OK;
}
