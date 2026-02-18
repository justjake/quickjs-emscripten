// Generated - do not edit. To change, update scripts/idl.ts and run 'pnpm run generate:c-ops'
#ifndef QTS_PERFORM_DUP_H
#define QTS_PERFORM_DUP_H

#include "command.h"

/**
 * Duplicate a value (JS_DupValue) - increment refcount
 * @param env Command execution environment
 * @param result_slot result will be written to this slot
 * @param source_slot source value will be read from this slot
 */
QTS_CommandStatus perform_dup(QTS_CommandEnv *env, JSValueSlot result_slot, JSValueSlot source_slot);

#endif // QTS_PERFORM_DUP_H
