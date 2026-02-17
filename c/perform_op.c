// Generated - do not edit
#include "perform_op.h"
#include "perform_object.h"
#include "perform_object_proto.h"
#include "perform_array.h"
#include "perform_date.h"
#include "perform_error.h"
#include "perform_arraybuffer.h"
#include "perform_typed_array.h"
#include "perform_symbol.h"
#include "perform_float64.h"
#include "perform_string.h"
#include "perform_bigint.h"
#include "perform_function.h"
#include "perform_set_str_slot.h"
#include "perform_set_str_null.h"
#include "perform_set_str_undef.h"
#include "perform_set_str_bool.h"
#include "perform_set_str_int32.h"
#include "perform_set_str_f64.h"
#include "perform_set_str_bigint.h"
#include "perform_set_str_string.h"
#include "perform_set_idx_slot.h"
#include "perform_set_idx_null.h"
#include "perform_set_idx_undef.h"
#include "perform_set_idx_bool.h"
#include "perform_set_idx_int32.h"
#include "perform_set_idx_f64.h"
#include "perform_set_idx_bigint.h"
#include "perform_set_idx_string.h"
#include "perform_set_prop.h"
#include "perform_get_prop.h"
#include "perform_get_str.h"
#include "perform_get_idx.h"
#include "perform_get_global.h"
#include "perform_map_set.h"
#include "perform_map_set_str.h"
#include "perform_set_add.h"
#include "perform_def_cfunc.h"
#include "perform_def_cfunc_ctor.h"
#include "perform_def_cgetset.h"
#include "perform_def_prop_slot.h"
#include "perform_def_prop_null.h"
#include "perform_def_prop_undef.h"
#include "perform_def_prop_bool.h"
#include "perform_def_prop_int32.h"
#include "perform_def_prop_i64.h"
#include "perform_def_prop_f64.h"
#include "perform_def_prop_string.h"
#include "perform_define_value.h"
#include "perform_define_getset.h"
#include "perform_call.h"
#include "perform_call_construct.h"
#include "perform_eval.h"
#include "perform_throw.h"
#include "perform_resolve_exc.h"
#include "perform_dup.h"
#include "perform_free.h"
#include "perform_write_object.h"
#include "perform_read_object.h"
#include "perform_funclist_new.h"
#include "perform_funclist_apply.h"
#include "perform_funclist_free.h"
#include "perform_funclist_cfunc.h"
#include "perform_funclist_cfunc_ctor.h"
#include "perform_funclist_cgetset.h"
#include "perform_funclist_cgetset_magic.h"
#include "perform_funclist_prop_string.h"
#include "perform_funclist_prop_int32.h"
#include "perform_funclist_prop_int64.h"
#include "perform_funclist_prop_double.h"
#include "perform_funclist_prop_undefined.h"
#include "perform_funclist_alias.h"
#include "perform_funclist_object.h"

QTS_CommandStatus QTS_PerformOp(QTS_CommandEnv *env, QTS_Command cmd) {
    switch (cmd.opcode) {
        case QTS_OP_INVALID:
            env->error = "Invalid opcode (uninitialized command)";
            return QTS_COMMAND_ERROR;
        case QTS_OP_OBJECT: return perform_object(env, cmd.slot_a);
        case QTS_OP_OBJECT_PROTO: return perform_object_proto(env, cmd.slot_a, cmd.slot_b);
        case QTS_OP_ARRAY: return perform_array(env, cmd.slot_a);
        case QTS_OP_DATE: return perform_date(env, cmd.slot_a, cmd.data.f64.value);
        case QTS_OP_ERROR: return perform_error(env, cmd.slot_a, cmd.slot_b, cmd.data.buf.ptr, cmd.data.buf.len);
        case QTS_OP_ARRAYBUFFER: return perform_arraybuffer(env, cmd.slot_a, cmd.data.buf.ptr, cmd.data.buf.len);
        case QTS_OP_TYPED_ARRAY: return perform_typed_array(env, cmd.slot_a, cmd.slot_b, cmd.slot_c, cmd.data.raw.d1, cmd.data.raw.d2);
        case QTS_OP_SYMBOL: return perform_symbol(env, cmd.slot_a, cmd.slot_b, cmd.data.buf.ptr, cmd.data.buf.len);
        case QTS_OP_FLOAT64: return perform_float64(env, cmd.slot_a, cmd.data.f64.value);
        case QTS_OP_STRING: return perform_string(env, cmd.slot_a, cmd.data.buf.ptr, cmd.data.buf.len);
        case QTS_OP_BIGINT: return perform_bigint(env, cmd.slot_a, cmd.data.i64.value);
        case QTS_OP_FUNCTION: return perform_function(env, cmd.slot_a, cmd.slot_b, cmd.slot_c, cmd.data.buf.ptr, cmd.data.buf.len, cmd.data.buf.extra);
        case QTS_OP_SET_STR_SLOT: return perform_set_str_slot(env, cmd.slot_a, cmd.slot_b, cmd.data.buf.ptr, cmd.data.buf.len);
        case QTS_OP_SET_STR_NULL: return perform_set_str_null(env, cmd.slot_a, cmd.data.buf.ptr, cmd.data.buf.len);
        case QTS_OP_SET_STR_UNDEF: return perform_set_str_undef(env, cmd.slot_a, cmd.data.buf.ptr, cmd.data.buf.len);
        case QTS_OP_SET_STR_BOOL: return perform_set_str_bool(env, cmd.slot_a, cmd.slot_b, cmd.data.buf.ptr, cmd.data.buf.len);
        case QTS_OP_SET_STR_INT32: return perform_set_str_int32(env, cmd.slot_a, cmd.data.buf.ptr, cmd.data.buf.len, cmd.data.buf.extra);
        case QTS_OP_SET_STR_F64: return perform_set_str_f64(env, cmd.slot_a, cmd.data.f64.value, cmd.data.f64.extra);
        case QTS_OP_SET_STR_BIGINT: return perform_set_str_bigint(env, cmd.slot_a, cmd.data.i64.value, cmd.data.i64.extra);
        case QTS_OP_SET_STR_STRING: return perform_set_str_string(env, cmd.slot_a, cmd.data.buf.ptr, cmd.data.buf.len, cmd.data.buf.extra);
        case QTS_OP_SET_IDX_SLOT: return perform_set_idx_slot(env, cmd.slot_a, cmd.slot_b, cmd.data.raw.d1);
        case QTS_OP_SET_IDX_NULL: return perform_set_idx_null(env, cmd.slot_a, cmd.data.raw.d1);
        case QTS_OP_SET_IDX_UNDEF: return perform_set_idx_undef(env, cmd.slot_a, cmd.data.raw.d1);
        case QTS_OP_SET_IDX_BOOL: return perform_set_idx_bool(env, cmd.slot_a, cmd.slot_b, cmd.data.raw.d1);
        case QTS_OP_SET_IDX_INT32: return perform_set_idx_int32(env, cmd.slot_a, cmd.data.raw.d1, cmd.data.raw.d2);
        case QTS_OP_SET_IDX_F64: return perform_set_idx_f64(env, cmd.slot_a, cmd.data.f64.value, cmd.data.f64.extra);
        case QTS_OP_SET_IDX_BIGINT: return perform_set_idx_bigint(env, cmd.slot_a, cmd.data.i64.value, cmd.data.i64.extra);
        case QTS_OP_SET_IDX_STRING: return perform_set_idx_string(env, cmd.slot_a, cmd.data.buf.ptr, cmd.data.buf.len, cmd.data.buf.extra);
        case QTS_OP_SET_PROP: return perform_set_prop(env, cmd.slot_a, cmd.slot_b, cmd.slot_c);
        case QTS_OP_GET_PROP: return perform_get_prop(env, cmd.slot_a, cmd.slot_b, cmd.slot_c);
        case QTS_OP_GET_STR: return perform_get_str(env, cmd.slot_a, cmd.slot_b, cmd.data.buf.ptr, cmd.data.buf.len);
        case QTS_OP_GET_IDX: return perform_get_idx(env, cmd.slot_a, cmd.slot_b, cmd.data.raw.d1);
        case QTS_OP_GET_GLOBAL: return perform_get_global(env, cmd.slot_a);
        case QTS_OP_MAP_SET: return perform_map_set(env, cmd.slot_a, cmd.slot_b, cmd.slot_c);
        case QTS_OP_MAP_SET_STR: return perform_map_set_str(env, cmd.slot_a, cmd.slot_b, cmd.data.buf.ptr, cmd.data.buf.len);
        case QTS_OP_SET_ADD: return perform_set_add(env, cmd.slot_a, cmd.slot_b);
        case QTS_OP_DEF_CFUNC: return perform_def_cfunc(env, cmd.slot_a, cmd.slot_b, cmd.slot_c, cmd.data.buf.ptr, cmd.data.buf.len, cmd.data.buf.extra);
        case QTS_OP_DEF_CFUNC_CTOR: return perform_def_cfunc_ctor(env, cmd.slot_a, cmd.slot_b, cmd.slot_c, cmd.data.buf.ptr, cmd.data.buf.len, cmd.data.buf.extra);
        case QTS_OP_DEF_CGETSET: return perform_def_cgetset(env, cmd.slot_a, cmd.slot_b, cmd.data.raw.d1, cmd.data.raw.d2, cmd.data.raw.d3);
        case QTS_OP_DEF_PROP_SLOT: return perform_def_prop_slot(env, cmd.slot_a, cmd.slot_b, cmd.slot_c, cmd.data.buf.ptr, cmd.data.buf.len);
        case QTS_OP_DEF_PROP_NULL: return perform_def_prop_null(env, cmd.slot_a, cmd.slot_b, cmd.data.buf.ptr, cmd.data.buf.len);
        case QTS_OP_DEF_PROP_UNDEF: return perform_def_prop_undef(env, cmd.slot_a, cmd.slot_b, cmd.data.buf.ptr, cmd.data.buf.len);
        case QTS_OP_DEF_PROP_BOOL: return perform_def_prop_bool(env, cmd.slot_a, cmd.slot_b, cmd.slot_c, cmd.data.buf.ptr, cmd.data.buf.len);
        case QTS_OP_DEF_PROP_INT32: return perform_def_prop_int32(env, cmd.slot_a, cmd.slot_b, cmd.data.buf.ptr, cmd.data.buf.len, cmd.data.buf.extra);
        case QTS_OP_DEF_PROP_I64: return perform_def_prop_i64(env, cmd.slot_a, cmd.slot_b, cmd.data.i64.value, cmd.data.i64.extra);
        case QTS_OP_DEF_PROP_F64: return perform_def_prop_f64(env, cmd.slot_a, cmd.slot_b, cmd.data.f64.value, cmd.data.f64.extra);
        case QTS_OP_DEF_PROP_STRING: return perform_def_prop_string(env, cmd.slot_a, cmd.slot_b, cmd.data.buf.ptr, cmd.data.buf.len, cmd.data.buf.extra);
        case QTS_OP_DEFINE_VALUE: return perform_define_value(env, cmd.slot_a, cmd.slot_b, cmd.slot_c, cmd.data.buf.ptr, cmd.data.buf.len);
        case QTS_OP_DEFINE_GETSET: return perform_define_getset(env, cmd.slot_a, cmd.slot_b, cmd.slot_c, cmd.data.buf.ptr, cmd.data.buf.len, cmd.data.buf.extra);
        case QTS_OP_CALL: return perform_call(env, cmd.slot_a, cmd.slot_b, cmd.slot_c, cmd.data.jsvalues.ptr, cmd.data.jsvalues.len);
        case QTS_OP_CALL_CONSTRUCT: return perform_call_construct(env, cmd.slot_a, cmd.slot_b, cmd.data.jsvalues.ptr, cmd.data.jsvalues.len);
        case QTS_OP_EVAL: return perform_eval(env, cmd.slot_a, cmd.data.buf.ptr, cmd.data.buf.len, cmd.data.buf.extra);
        case QTS_OP_THROW: return perform_throw(env, cmd.slot_a);
        case QTS_OP_RESOLVE_EXC: return perform_resolve_exc(env, cmd.slot_a, cmd.slot_b);
        case QTS_OP_DUP: return perform_dup(env, cmd.slot_a, cmd.slot_b);
        case QTS_OP_FREE: return perform_free(env, cmd.slot_a);
        case QTS_OP_WRITE_OBJECT: return perform_write_object(env, cmd.slot_a, cmd.slot_b, cmd.data.raw.d1);
        case QTS_OP_READ_OBJECT: return perform_read_object(env, cmd.slot_a, cmd.slot_b, cmd.data.raw.d1);
        case QTS_OP_FUNCLIST_NEW: return perform_funclist_new(env, cmd.slot_a, cmd.data.raw.d1);
        case QTS_OP_FUNCLIST_APPLY: return perform_funclist_apply(env, cmd.slot_a, cmd.slot_b, cmd.data.raw.d1);
        case QTS_OP_FUNCLIST_FREE: return perform_funclist_free(env, cmd.slot_a);
        case QTS_OP_FUNCLIST_CFUNC: return perform_funclist_cfunc(env, cmd.slot_a, cmd.slot_b, cmd.slot_c, cmd.data.raw.d1, cmd.data.raw.d2, cmd.data.raw.d3);
        case QTS_OP_FUNCLIST_CFUNC_CTOR: return perform_funclist_cfunc_ctor(env, cmd.slot_a, cmd.slot_b, cmd.slot_c, cmd.data.raw.d1, cmd.data.raw.d2, cmd.data.raw.d3);
        case QTS_OP_FUNCLIST_CGETSET: return perform_funclist_cgetset(env, cmd.slot_a, cmd.slot_b, cmd.data.raw.d1, cmd.data.raw.d2, cmd.data.raw.d3);
        case QTS_OP_FUNCLIST_CGETSET_MAGIC: return perform_funclist_cgetset_magic(env, cmd.slot_a, cmd.slot_b, cmd.slot_c, cmd.data.raw.d1, cmd.data.raw.d2, cmd.data.raw.d3);
        case QTS_OP_FUNCLIST_PROP_STRING: return perform_funclist_prop_string(env, cmd.slot_a, cmd.slot_b, cmd.data.raw.d1, cmd.data.raw.d2, cmd.data.raw.d3);
        case QTS_OP_FUNCLIST_PROP_INT32: return perform_funclist_prop_int32(env, cmd.slot_a, cmd.slot_b, cmd.data.raw.d1, cmd.data.raw.d2, cmd.data.raw.d3);
        case QTS_OP_FUNCLIST_PROP_INT64: return perform_funclist_prop_int64(env, cmd.slot_a, cmd.slot_b, cmd.slot_c, cmd.data.i64.value, cmd.data.i64.extra);
        case QTS_OP_FUNCLIST_PROP_DOUBLE: return perform_funclist_prop_double(env, cmd.slot_a, cmd.slot_b, cmd.slot_c, cmd.data.f64.value, cmd.data.f64.extra);
        case QTS_OP_FUNCLIST_PROP_UNDEFINED: return perform_funclist_prop_undefined(env, cmd.slot_a, cmd.slot_b, cmd.data.raw.d1, cmd.data.raw.d2);
        case QTS_OP_FUNCLIST_ALIAS: return perform_funclist_alias(env, cmd.slot_a, cmd.slot_b, cmd.data.raw.d1, cmd.data.raw.d2, cmd.data.raw.d3);
        case QTS_OP_FUNCLIST_OBJECT: return perform_funclist_object(env, cmd.slot_a, cmd.slot_b, cmd.data.raw.d1, cmd.data.raw.d2, cmd.data.raw.d3);
        default:
            env->error = "Unknown opcode";
            return QTS_COMMAND_ERROR;
    }
}
