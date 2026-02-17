/**
 * command.h
 *
 * Command buffer structures for batch execution of QuickJS operations.
 * NOT generated - edit manually.
 */

#ifndef QTS_COMMAND_H
#define QTS_COMMAND_H

#include <stdint.h>
#include "qts_utils.h"  // Provides JSValueSlot, FuncListSlot, JSPropFlags, HostRefId
#include "op.h"         // Provides QTS_Opcode enum

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
        struct { JSValue *argv; uint32_t argc; uint32_t extra; } jsvalues;
    } data;
} QTS_Command;

/**
 * A funclist is a dynamically allocated JSCFunctionListEntry array.
 * Used for bulk-defining properties on objects with JS_SetPropertyFunctionList.
 */
typedef struct QTS_FuncList {
    JSCFunctionListEntry *entries;
    uint32_t count;
} QTS_FuncList;

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

/** Return an error from an op implementation indicating it's not yet implemented */
#define OP_UNIMPLEMENTED(env, name) do { \
    (env)->error = "UNIMPLEMENTED: " name; \
    return QTS_COMMAND_ERROR; \
} while(0)

/** Debug macros for op implementations */
#ifdef QTS_DEBUG_MODE
#define OP_DEBUG(ctx, msg) do { \
    if (qts_get_context_rt_data(ctx)->debug_log) qts_log(msg); \
} while(0)
#define OP_DUMP(ctx, value) do { \
    if (qts_get_context_rt_data(ctx)->debug_log) qts_dump(ctx, value); \
} while(0)
#else
#define OP_DEBUG(ctx, msg) do {} while(0)
#define OP_DUMP(ctx, value) do {} while(0)
#endif

#endif // QTS_COMMAND_H
