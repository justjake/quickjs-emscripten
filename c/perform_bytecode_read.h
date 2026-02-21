// Generated - do not edit. To change, update scripts/idl.ts and run 'pnpm run ops:c'
#ifndef QTS_PERFORM_BYTECODE_READ_H
#define QTS_PERFORM_BYTECODE_READ_H

#include "command.h"

/**
 * Deserialize a value from binary (JS_ReadObject)
 * @param env Command execution environment
 * @param result_slot result will be written to this slot
 * @param source_slot ArrayBuffer JSValue containing serialized data
 * @param flags JS_READ_OBJ_* flags
 */
QTS_CommandStatus perform_bytecode_read(QTS_CommandEnv *env, JSValueSlot result_slot, JSValueSlot source_slot, uint32_t flags);

#endif // QTS_PERFORM_BYTECODE_READ_H
