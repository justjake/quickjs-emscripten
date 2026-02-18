#include "perform_new_object.h"

/**
 * Create a new empty object (JS_NewObject)
 * @param env Command execution environment
 * @param result_slot result will be written to this slot
 */
QTS_CommandStatus perform_new_object(QTS_CommandEnv *env, JSValueSlot result_slot) {
    OP_UNIMPLEMENTED(env, "perform_new_object");
}
