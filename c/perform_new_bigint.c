#include "perform_new_bigint.h"

/**
 * Create a BigInt value from i64 (JS_NewBigInt64)
 * @param env Command execution environment
 * @param result_slot result will be written to this slot
 * @param value The int64 value
 */
QTS_CommandStatus perform_new_bigint(QTS_CommandEnv *env, JSValueSlot result_slot, int64_t value) {
    OP_UNIMPLEMENTED(env, "perform_new_bigint");
}
