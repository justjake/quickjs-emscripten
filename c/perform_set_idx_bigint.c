#include "perform_set_idx_bigint.h"

/**
 * Set array element by index to BigInt
 * @param env Command execution environment
 * @param target_slot Target object to modify
 * @param i64_val The int64 value
 * @param index Array index
 */
QTS_CommandStatus perform_set_idx_bigint(QTS_CommandEnv *env, JSValueSlot target_slot, int64_t i64_val, uint32_t index) {
    OP_UNIMPLEMENTED(env, "perform_set_idx_bigint");
}
