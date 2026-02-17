// Generated - do not edit
#ifndef QTS_OP_H
#define QTS_OP_H

#include <stdint.h>
#include "quickjs.h"

// Slot types - used for indexing into the command environment arrays
typedef uint8_t JSValueSlot;
typedef uint8_t FuncListSlot;

typedef enum {
    QTS_OP_OBJECT = 0,
    QTS_OP_OBJECT_PROTO = 1,
    QTS_OP_ARRAY = 2,
    QTS_OP_DATE = 3,
    QTS_OP_ERROR = 4,
    QTS_OP_ARRAYBUFFER = 5,
    QTS_OP_TYPED_ARRAY = 6,
    QTS_OP_SYMBOL = 7,
    QTS_OP_FLOAT64 = 8,
    QTS_OP_STRING = 9,
    QTS_OP_BIGINT = 10,
    QTS_OP_FUNCTION = 11,
    QTS_OP_SET_STR_SLOT = 12,
    QTS_OP_SET_STR_NULL = 13,
    QTS_OP_SET_STR_UNDEF = 14,
    QTS_OP_SET_STR_BOOL = 15,
    QTS_OP_SET_STR_INT32 = 16,
    QTS_OP_SET_STR_F64 = 17,
    QTS_OP_SET_STR_BIGINT = 18,
    QTS_OP_SET_STR_STRING = 19,
    QTS_OP_SET_IDX_SLOT = 20,
    QTS_OP_SET_IDX_NULL = 21,
    QTS_OP_SET_IDX_UNDEF = 22,
    QTS_OP_SET_IDX_BOOL = 23,
    QTS_OP_SET_IDX_INT32 = 24,
    QTS_OP_SET_IDX_F64 = 25,
    QTS_OP_SET_IDX_BIGINT = 26,
    QTS_OP_SET_IDX_STRING = 27,
    QTS_OP_SET_PROP = 28,
    QTS_OP_GET_PROP = 29,
    QTS_OP_GET_STR = 30,
    QTS_OP_GET_IDX = 31,
    QTS_OP_GET_GLOBAL = 32,
    QTS_OP_MAP_SET = 33,
    QTS_OP_MAP_SET_STR = 34,
    QTS_OP_SET_ADD = 35,
    QTS_OP_DEF_CFUNC = 36,
    QTS_OP_DEF_CFUNC_CTOR = 37,
    QTS_OP_DEF_CGETSET = 38,
    QTS_OP_DEF_PROP_SLOT = 39,
    QTS_OP_DEF_PROP_NULL = 40,
    QTS_OP_DEF_PROP_UNDEF = 41,
    QTS_OP_DEF_PROP_BOOL = 42,
    QTS_OP_DEF_PROP_INT32 = 43,
    QTS_OP_DEF_PROP_I64 = 44,
    QTS_OP_DEF_PROP_F64 = 45,
    QTS_OP_DEF_PROP_STRING = 46,
    QTS_OP_DEFINE_VALUE = 47,
    QTS_OP_DEFINE_GETSET = 48,
    QTS_OP_CALL = 49,
    QTS_OP_CALL_CONSTRUCT = 50,
    QTS_OP_EVAL = 51,
    QTS_OP_THROW = 52,
    QTS_OP_RESOLVE_EXC = 53,
    QTS_OP_DUP = 54,
    QTS_OP_FREE = 55,
    QTS_OP_WRITE_OBJECT = 56,
    QTS_OP_READ_OBJECT = 57,
    QTS_OP_FUNCLIST_NEW = 58,
    QTS_OP_FUNCLIST_APPLY = 59,
    QTS_OP_FUNCLIST_FREE = 60,
    QTS_OP_FUNCLIST_CFUNC = 61,
    QTS_OP_FUNCLIST_CFUNC_CTOR = 62,
    QTS_OP_FUNCLIST_CGETSET = 63,
    QTS_OP_FUNCLIST_CGETSET_MAGIC = 64,
    QTS_OP_FUNCLIST_PROP_STRING = 65,
    QTS_OP_FUNCLIST_PROP_INT32 = 66,
    QTS_OP_FUNCLIST_PROP_INT64 = 67,
    QTS_OP_FUNCLIST_PROP_DOUBLE = 68,
    QTS_OP_FUNCLIST_PROP_UNDEFINED = 69,
    QTS_OP_FUNCLIST_ALIAS = 70,
    QTS_OP_FUNCLIST_OBJECT = 71
} QTS_Opcode;

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

_Static_assert(sizeof(QTS_Command) == 16, "QTS_Command must be 16 bytes");

typedef struct QTS_CommandEnv {
    JSContext *ctx;
    JSValue *jsvalue_slots;
    uint32_t jsvalue_slots_count;
    // TODO: funclist slots?
    const char *error;
} QTS_CommandEnv;

typedef enum {
    QTS_COMMAND_OK = 0,
    QTS_COMMAND_ERROR = 1,
} QTS_CommandStatus;

#endif // QTS_OP_H
