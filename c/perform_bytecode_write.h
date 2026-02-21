// Generated - do not edit. To change, update scripts/idl.ts and run 'pnpm run ops:c'
#ifndef QTS_PERFORM_BYTECODE_WRITE_H
#define QTS_PERFORM_BYTECODE_WRITE_H

#include "command.h"

/**
 * Serialize a value to binary (JS_WriteObject)
 * @param env Command execution environment
 * @param result_slot Serialized data written to this slot as a ArrayBuffer JSValue
 * @param source_slot source value will be read from this slot
 * @param flags JS_WRITE_OBJ_* flags
 */
QTS_CommandStatus perform_bytecode_write(QTS_CommandEnv *env, JSValueSlot result_slot, JSValueSlot source_slot, uint32_t flags);

#endif // QTS_PERFORM_BYTECODE_WRITE_H
