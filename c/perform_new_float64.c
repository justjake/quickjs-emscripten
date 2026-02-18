#include "perform_new_float64.h"

/**
 * Create a float64 number value (JS_NewFloat64)
 * @param env Command execution environment
 * @param result_slot result will be written to this slot
 * @param value The float64 value
 */
QTS_CommandStatus perform_new_float64(QTS_CommandEnv *env, JSValueSlot result_slot, double value) {
    OP_SET_JSVALUE(env, result_slot, JS_NewFloat64(env->ctx, value));
    return QTS_COMMAND_OK;
}
