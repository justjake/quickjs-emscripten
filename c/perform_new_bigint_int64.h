// Generated - do not edit. To change, update scripts/idl.ts and run 'pnpm run ops:c'
#ifndef QTS_PERFORM_NEW_BIGINT_INT64_H
#define QTS_PERFORM_NEW_BIGINT_INT64_H

#include "command.h"

/**
 * Create a BigInt value from i64 (JS_NewBigInt64)
 * @param env Command execution environment
 * @param result_slot result will be written to this slot
 * @param value The int64 value
 */
QTS_CommandStatus perform_new_bigint_int64(QTS_CommandEnv *env, JSValueSlot result_slot, int64_t value);

#endif // QTS_PERFORM_NEW_BIGINT_INT64_H
