#include "perform_new_date.h"

/**
 * Create a Date object from timestamp (JS_NewDate)
 * @param env Command execution environment
 * @param result_slot result will be written to this slot
 * @param timestamp Unix timestamp in milliseconds, eg from Date.now()
 */
QTS_CommandStatus perform_new_date(QTS_CommandEnv *env, JSValueSlot result_slot, double timestamp) {
    OP_UNIMPLEMENTED(env, "perform_new_date");
}
