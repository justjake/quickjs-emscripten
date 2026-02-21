// Generated - do not edit. To change, update scripts/idl.ts and run 'pnpm run ops:c'
#ifndef QTS_PERFORM_NEW_OBJECT_PROTO_H
#define QTS_PERFORM_NEW_OBJECT_PROTO_H

#include "command.h"

/**
 * Create a new object with prototype (JS_NewObjectProto)
 * @param env Command execution environment
 * @param result_slot result will be written to this slot
 * @param proto_slot Prototype object slot
 */
QTS_CommandStatus perform_new_object_proto(QTS_CommandEnv *env, JSValueSlot result_slot, JSValueSlot proto_slot);

#endif // QTS_PERFORM_NEW_OBJECT_PROTO_H
