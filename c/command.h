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
#include "funclist.h"
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
        struct {
            uint8_t byte00, byte01, byte02, byte03;
            uint8_t byte04, byte05, byte06, byte07;
            uint8_t byte08, byte09, byte10, byte11;
        } bytes;
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


/** Set the error message and return an error */
#define OP_ERROR(env, msg) do { \
    (env)->error = QTS_DEBUG_STACKFRAME ": " msg; \
    return QTS_COMMAND_ERROR; \
} while(0)

/** If condition is true, set the error message and return an error */
#define OP_ERROR_IF(env, cond, msg) if (cond) { OP_ERROR(env, msg); }

#define OP_ERROR_GOTO(env, msg, label) do { \
    (env)->error = QTS_DEBUG_STACKFRAME ": " msg; \
    goto label; \
} while(0)

#define OP_ERROR_IF_GOTO(env, cond, msg, label) do { \
    if (cond) { OP_ERROR_GOTO(env, msg, label); } \
} while(0)

#define OP_GET_JSVALUE(env, slot, msg) ({ \
    OP_ERROR_IF(env, slot >= env->jsvalue_slots_count, "jsvalue slot out of range"); \
    env->jsvalue_slots[slot]; \
})

#define OP_GET_FUNCLIST(env, slot, msg) ({ \
    OP_ERROR_IF(env, slot >= env->funclist_slots_count, "funclist slot out of range: " msg); \
    OP_ERROR_IF(env, !env->funclist_slots[slot].entries, "funclist slot not allocated: " msg); \
    OP_ERROR_IF(env, env->funclist_slots[slot].count == 0, "funclist slot is empty: " msg); \
    &env->funclist_slots[slot]; \
})

#define OP_SET_JSVALUE(env, slot, value) \
    OP_ERROR_IF(env, slot >= env->jsvalue_slots_count, "jsvalue slot out of range"); \
    env->jsvalue_slots[slot] = value;

/** Return an error from an op implementation indicating it's not yet implemented */
#define OP_UNIMPLEMENTED(env, name) OP_ERROR(env, "UNIMPLEMENTED: " name)

#endif // QTS_COMMAND_H
