#include "perform_new_float64.h"

/**
 * Create a float64 number value (JS_NewFloat64)
 * @param env Command execution environment
 * @param result_slot result will be written to this slot
 * @param value The float64 value
 */
QTS_CommandStatus perform_new_float64(QTS_CommandEnv *env, JSValueSlot result_slot, double value) {
    OP_UNIMPLEMENTED(env, "perform_new_float64");
}
