#include "perform_set_idx_bigint.h"

/**
 * Set array element by index to BigInt
 * @param env Command execution environment
 * @param target_slot Target object to modify
 * @param flags SetPropFlags: property flags controlling set vs define behavior
 * @param i64_val The int64 value
 * @param index Array index
 */
QTS_CommandStatus perform_set_idx_bigint(QTS_CommandEnv *env, JSValueSlot target_slot, SetPropFlags flags, int64_t i64_val, uint32_t index) {
    JSValue target = OP_GET_JSVALUE(env, target_slot, "set_idx_bigint: target");
    int ret = qts_set_or_define_prop_uint32(env->ctx, target, index, JS_NewBigInt64(env->ctx, i64_val), flags);
    OP_ERROR_IF(env, ret < 0, "set_idx_bigint: exception");
    return QTS_COMMAND_OK;
}
