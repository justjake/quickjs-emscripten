// Generated - do not edit. To change, update scripts/idl.ts and run 'pnpm run ops:c'
#ifndef QTS_PERFORM_NEW_FLOAT64_H
#define QTS_PERFORM_NEW_FLOAT64_H

#include "command.h"

/**
 * Create a float64 number value (JS_NewFloat64)
 * @param env Command execution environment
 * @param result_slot result will be written to this slot
 * @param value The float64 value
 */
QTS_CommandStatus perform_new_float64(QTS_CommandEnv *env, JSValueSlot result_slot, double value);

#endif // QTS_PERFORM_NEW_FLOAT64_H
