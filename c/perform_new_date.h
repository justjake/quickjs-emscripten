// Generated - do not edit. To change, update scripts/idl.ts and run 'pnpm run ops:c'
#ifndef QTS_PERFORM_NEW_DATE_H
#define QTS_PERFORM_NEW_DATE_H

#include "command.h"

/**
 * Create a Date object from timestamp (JS_NewDate)
 * @param env Command execution environment
 * @param result_slot result will be written to this slot
 * @param timestamp Unix timestamp in milliseconds, eg from Date.now()
 */
QTS_CommandStatus perform_new_date(QTS_CommandEnv *env, JSValueSlot result_slot, double timestamp);

#endif // QTS_PERFORM_NEW_DATE_H
