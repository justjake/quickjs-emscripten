#include "perform_new_object_proto.h"

/**
 * Create a new object with prototype (JS_NewObjectProto)
 * @param env Command execution environment
 * @param result_slot result will be written to this slot
 * @param proto_slot Prototype object slot
 */
QTS_CommandStatus perform_new_object_proto(QTS_CommandEnv *env, JSValueSlot result_slot, JSValueSlot proto_slot) {
    OP_UNIMPLEMENTED(env, "perform_new_object_proto");
}
