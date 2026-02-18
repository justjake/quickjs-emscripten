// Generated - do not edit. To change, update scripts/idl.ts and run 'pnpm run generate:c-ops'
#ifndef QTS_PERFORM_NEW_ARRAYBUFFER_H
#define QTS_PERFORM_NEW_ARRAYBUFFER_H

#include "command.h"

/**
 * Create an ArrayBuffer by copying data (JS_NewArrayBufferCopy)
 * @param env Command execution environment
 * @param result_slot result will be written to this slot
 * @param data_ptr Pointer to source data
 * @param data_len Length of data in bytes
 */
QTS_CommandStatus perform_new_arraybuffer(QTS_CommandEnv *env, JSValueSlot result_slot, char *data_ptr, uint32_t data_len);

#endif // QTS_PERFORM_NEW_ARRAYBUFFER_H
