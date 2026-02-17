/**
 * command.h
 *
 * Command buffer structures for batch execution of QuickJS operations.
 * This file should only contain types relevant to Command infrastructure.
 * Command implementation related types should be written in qts_utils.{h,c}.
 */

#ifndef QTS_COMMAND_H
#define QTS_COMMAND_H

#include <stdint.h>
#include "qts_utils.h"
#include "op.h"

/**
 * A command in the command buffer.
 * Layout designed for efficient encoding from JavaScript.
 */
typedef struct QTS_Command {
    uint8_t opcode;
    uint8_t slot_a;
    uint8_t slot_b;
    uint8_t slot_c;
    union {
        struct { uint32_t d1, d2, d3; } raw;
        struct { double value; uint32_t extra; } f64;
        struct { int64_t value; uint32_t extra; } i64;
        struct { char *ptr; uint32_t len; uint32_t extra; } buf;
        struct { JSValue *ptr; uint32_t len; uint32_t extra; } jsvalues;
    } data;
} QTS_Command;

/**
 * Environment for command execution.
 * Provides context and slot arrays for the command interpreter.
 */
typedef struct QTS_CommandEnv {
    JSContext *ctx;
    JSValue *jsvalue_slots;
    uint32_t jsvalue_slots_count;
    QTS_FuncList *funclist_slots;
    uint32_t funclist_slots_count;
    const char *error;
} QTS_CommandEnv;

/**
 * Return status from command execution.
 */
typedef enum {
    QTS_COMMAND_OK = 0,
    QTS_COMMAND_ERROR = 1,
} QTS_CommandStatus;

// ----------------------------------------------------------------------------
// Op implementation utilities
// ----------------------------------------------------------------------------

/**
 * Uint16Pair: Two uint16 values packed into one uint32.
 *
 * Bit layout: low 16 bits = first value, high 16 bits = second value.
 * Access via .low and .high fields directly.
 *
 * Memory layout on little-endian (wasm is always little-endian):
 * A uint32_t 0xHHHHLLLL is stored as bytes [LL, LL, HH, HH].
 * The first struct field (low) gets bytes 0-1 = bits 0-15.
 * The second struct field (high) gets bytes 2-3 = bits 16-31.
 */
typedef struct {
    uint16_t low;
    uint16_t high;
} Uint16Pair;

/** Set the error message and return an error */
#define OP_ERROR(env, msg) do { \
    (env)->error = msg; \
    return QTS_COMMAND_ERROR; \
} while(0)

/** If condition is true, set the error message and return an error */
#define OP_ERROR_IF(env, cond, msg) do { \
    if (cond) { \
        (env)->error = msg; \
        return QTS_COMMAND_ERROR; \
    } \
} while(0)

/** Return an error from an op implementation indicating it's not yet implemented */
#define OP_UNIMPLEMENTED(env, name) OP_ERROR(env, "UNIMPLEMENTED: " name)

#endif // QTS_COMMAND_H
