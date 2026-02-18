// Generated - do not edit
#include "perform_op.h"
#include "perform_new_object.h"
#include "perform_new_object_proto.h"
#include "perform_new_array.h"
#include "perform_new_date.h"
#include "perform_new_error.h"
#include "perform_new_arraybuffer.h"
#include "perform_new_typed_array.h"
#include "perform_new_symbol.h"
#include "perform_new_float64.h"
#include "perform_new_string.h"
#include "perform_new_bigint.h"
#include "perform_new_func.h"
#include "perform_set_str_value.h"
#include "perform_set_str_null.h"
#include "perform_set_str_undef.h"
#include "perform_set_str_bool.h"
#include "perform_set_str_int32.h"
#include "perform_set_str_f64.h"
#include "perform_set_str_bigint.h"
#include "perform_set_str_string.h"
#include "perform_set_idx_value.h"
#include "perform_set_idx_null.h"
#include "perform_set_idx_undef.h"
#include "perform_set_idx_bool.h"
#include "perform_set_idx_int32.h"
#include "perform_set_idx_f64.h"
#include "perform_set_idx_bigint.h"
#include "perform_set_idx_string.h"
#include "perform_set.h"
#include "perform_def_getset.h"
#include "perform_get.h"
#include "perform_get_str.h"
#include "perform_get_idx.h"
#include "perform_global.h"
#include "perform_global_get_str.h"
#include "perform_global_set_str.h"
#include "perform_map_set.h"
#include "perform_map_set_str.h"
#include "perform_set_add.h"
#include "perform_call.h"
#include "perform_call_ctor.h"
#include "perform_eval.h"
#include "perform_throw.h"
#include "perform_resolve_exc.h"
#include "perform_dup.h"
#include "perform_dup_ptr.h"
#include "perform_free.h"
#include "perform_free_ptr.h"
#include "perform_bytecode_write.h"
#include "perform_bytecode_read.h"
#include "perform_funclist_new.h"
#include "perform_funclist_assign.h"
#include "perform_funclist_free.h"
#include "perform_funclist_def_cfunc.h"
#include "perform_funclist_def_cfunc_ctor.h"
#include "perform_funclist_def_cgetset.h"
#include "perform_funclist_def_string.h"
#include "perform_funclist_def_int32.h"
#include "perform_funclist_def_int64.h"
#include "perform_funclist_def_double.h"
#include "perform_funclist_def_null.h"
#include "perform_funclist_def_undefined.h"
#include "perform_funclist_def_object.h"

QTS_CommandStatus QTS_PerformOp(QTS_CommandEnv *env, QTS_Command cmd) {
    switch (cmd.opcode) {
        case QTS_OP_INVALID:
            env->error = "Invalid opcode (uninitialized command)";
            return QTS_COMMAND_ERROR;
        case QTS_OP_NEW_OBJECT: return perform_new_object(env, (JSValueSlot)cmd.slot_a);
        case QTS_OP_NEW_OBJECT_PROTO: return perform_new_object_proto(env, (JSValueSlot)cmd.slot_a, (JSValueSlot)cmd.slot_b);
        case QTS_OP_NEW_ARRAY: return perform_new_array(env, (JSValueSlot)cmd.slot_a);
        case QTS_OP_NEW_DATE: return perform_new_date(env, (JSValueSlot)cmd.slot_a, cmd.data.f64.value);
        case QTS_OP_NEW_ERROR: return perform_new_error(env, (JSValueSlot)cmd.slot_a, cmd.slot_b, (NewErrorFlags)cmd.slot_c, cmd.data.buf.ptr, cmd.data.buf.len, (char*)cmd.data.buf.extra);
        case QTS_OP_NEW_ARRAYBUFFER: return perform_new_arraybuffer(env, (JSValueSlot)cmd.slot_a, cmd.data.buf.ptr, cmd.data.buf.len);
        case QTS_OP_NEW_TYPED_ARRAY: return perform_new_typed_array(env, (JSValueSlot)cmd.slot_a, (JSValueSlot)cmd.slot_b, (NewTypedArrayFlags)cmd.slot_c, cmd.data.raw.d1, cmd.data.raw.d2);
        case QTS_OP_NEW_SYMBOL: return perform_new_symbol(env, (JSValueSlot)cmd.slot_a, cmd.slot_b, cmd.data.buf.ptr, cmd.data.buf.len);
        case QTS_OP_NEW_FLOAT64: return perform_new_float64(env, (JSValueSlot)cmd.slot_a, cmd.data.f64.value);
        case QTS_OP_NEW_STRING: return perform_new_string(env, (JSValueSlot)cmd.slot_a, cmd.data.buf.ptr, cmd.data.buf.len);
        case QTS_OP_NEW_BIGINT: return perform_new_bigint(env, (JSValueSlot)cmd.slot_a, cmd.data.i64.value);
        case QTS_OP_NEW_FUNC: return perform_new_func(env, (JSValueSlot)cmd.slot_a, cmd.slot_b, cmd.slot_c, cmd.data.buf.ptr, cmd.data.buf.len, (HostRefId)cmd.data.buf.extra);
        case QTS_OP_SET_STR_VALUE: return perform_set_str_value(env, (JSValueSlot)cmd.slot_a, (JSValueSlot)cmd.slot_b, (SetPropFlags)cmd.slot_c, cmd.data.buf.ptr, cmd.data.buf.len);
        case QTS_OP_SET_STR_NULL: return perform_set_str_null(env, (JSValueSlot)cmd.slot_a, (SetPropFlags)cmd.slot_c, cmd.data.buf.ptr, cmd.data.buf.len);
        case QTS_OP_SET_STR_UNDEF: return perform_set_str_undef(env, (JSValueSlot)cmd.slot_a, (SetPropFlags)cmd.slot_c, cmd.data.buf.ptr, cmd.data.buf.len);
        case QTS_OP_SET_STR_BOOL: return perform_set_str_bool(env, (JSValueSlot)cmd.slot_a, cmd.slot_b, (SetPropFlags)cmd.slot_c, cmd.data.buf.ptr, cmd.data.buf.len);
        case QTS_OP_SET_STR_INT32: return perform_set_str_int32(env, (JSValueSlot)cmd.slot_a, (SetPropFlags)cmd.slot_c, cmd.data.buf.ptr, cmd.data.buf.len, (int32_t)cmd.data.buf.extra);
        case QTS_OP_SET_STR_F64: return perform_set_str_f64(env, (JSValueSlot)cmd.slot_a, cmd.slot_b, (SetPropFlags)cmd.slot_c, cmd.data.f64.value, (char*)cmd.data.f64.extra);
        case QTS_OP_SET_STR_BIGINT: return perform_set_str_bigint(env, (JSValueSlot)cmd.slot_a, cmd.slot_b, (SetPropFlags)cmd.slot_c, cmd.data.i64.value, (char*)cmd.data.i64.extra);
        case QTS_OP_SET_STR_STRING: return perform_set_str_string(env, (JSValueSlot)cmd.slot_a, cmd.slot_b, (SetPropFlags)cmd.slot_c, cmd.data.buf.ptr, cmd.data.buf.len, (char*)cmd.data.buf.extra);
        case QTS_OP_SET_IDX_VALUE: return perform_set_idx_value(env, (JSValueSlot)cmd.slot_a, (JSValueSlot)cmd.slot_b, (SetPropFlags)cmd.slot_c, cmd.data.raw.d1);
        case QTS_OP_SET_IDX_NULL: return perform_set_idx_null(env, (JSValueSlot)cmd.slot_a, (SetPropFlags)cmd.slot_c, cmd.data.raw.d1);
        case QTS_OP_SET_IDX_UNDEF: return perform_set_idx_undef(env, (JSValueSlot)cmd.slot_a, (SetPropFlags)cmd.slot_c, cmd.data.raw.d1);
        case QTS_OP_SET_IDX_BOOL: return perform_set_idx_bool(env, (JSValueSlot)cmd.slot_a, cmd.slot_b, (SetPropFlags)cmd.slot_c, cmd.data.raw.d1);
        case QTS_OP_SET_IDX_INT32: return perform_set_idx_int32(env, (JSValueSlot)cmd.slot_a, (SetPropFlags)cmd.slot_c, cmd.data.raw.d1, (int32_t)cmd.data.raw.d2);
        case QTS_OP_SET_IDX_F64: return perform_set_idx_f64(env, (JSValueSlot)cmd.slot_a, (SetPropFlags)cmd.slot_c, cmd.data.f64.value, cmd.data.f64.extra);
        case QTS_OP_SET_IDX_BIGINT: return perform_set_idx_bigint(env, (JSValueSlot)cmd.slot_a, (SetPropFlags)cmd.slot_c, cmd.data.i64.value, cmd.data.i64.extra);
        case QTS_OP_SET_IDX_STRING: return perform_set_idx_string(env, (JSValueSlot)cmd.slot_a, (SetPropFlags)cmd.slot_c, cmd.data.buf.ptr, cmd.data.buf.len, cmd.data.buf.extra);
        case QTS_OP_SET: return perform_set(env, (JSValueSlot)cmd.slot_a, (JSValueSlot)cmd.slot_b, (JSValueSlot)cmd.slot_c, (SetPropFlags)cmd.data.raw.d1);
        case QTS_OP_DEF_GETSET: return perform_def_getset(env, (JSValueSlot)cmd.slot_a, cmd.slot_b, (JSPropFlags)cmd.slot_c, (HostRefId)cmd.data.raw.d1, (HostRefId)cmd.data.raw.d2, (char*)cmd.data.raw.d3);
        case QTS_OP_GET: return perform_get(env, (JSValueSlot)cmd.slot_a, (JSValueSlot)cmd.slot_b, (JSValueSlot)cmd.slot_c);
        case QTS_OP_GET_STR: return perform_get_str(env, (JSValueSlot)cmd.slot_a, (JSValueSlot)cmd.slot_b, cmd.data.buf.ptr, cmd.data.buf.len);
        case QTS_OP_GET_IDX: return perform_get_idx(env, (JSValueSlot)cmd.slot_a, (JSValueSlot)cmd.slot_b, cmd.data.raw.d1);
        case QTS_OP_GLOBAL: return perform_global(env, (JSValueSlot)cmd.slot_a);
        case QTS_OP_GLOBAL_GET_STR: return perform_global_get_str(env, (JSValueSlot)cmd.slot_a, cmd.data.buf.ptr, cmd.data.buf.len);
        case QTS_OP_GLOBAL_SET_STR: return perform_global_set_str(env, (JSValueSlot)cmd.slot_a, (JSPropFlags)cmd.slot_c, cmd.data.buf.ptr, cmd.data.buf.len);
        case QTS_OP_MAP_SET: return perform_map_set(env, (JSValueSlot)cmd.slot_a, (JSValueSlot)cmd.slot_b, (JSValueSlot)cmd.slot_c);
        case QTS_OP_MAP_SET_STR: return perform_map_set_str(env, (JSValueSlot)cmd.slot_a, (JSValueSlot)cmd.slot_b, cmd.data.buf.ptr, cmd.data.buf.len);
        case QTS_OP_SET_ADD: return perform_set_add(env, (JSValueSlot)cmd.slot_a, (JSValueSlot)cmd.slot_b);
        case QTS_OP_CALL: return perform_call(env, (JSValueSlot)cmd.slot_a, (JSValueSlot)cmd.slot_b, (JSValueSlot)cmd.slot_c, cmd.data.jsvalues.ptr, cmd.data.jsvalues.len);
        case QTS_OP_CALL_CTOR: return perform_call_ctor(env, (JSValueSlot)cmd.slot_a, (JSValueSlot)cmd.slot_b, cmd.data.jsvalues.ptr, cmd.data.jsvalues.len);
        case QTS_OP_EVAL: return perform_eval(env, (JSValueSlot)cmd.slot_a, cmd.slot_b, (EvalFlags)cmd.slot_c, cmd.data.buf.ptr, cmd.data.buf.len, (char*)cmd.data.buf.extra);
        case QTS_OP_THROW: return perform_throw(env, (JSValueSlot)cmd.slot_a);
        case QTS_OP_RESOLVE_EXC: return perform_resolve_exc(env, (JSValueSlot)cmd.slot_a, (JSValueSlot)cmd.slot_b);
        case QTS_OP_DUP: return perform_dup(env, (JSValueSlot)cmd.slot_a, (JSValueSlot)cmd.slot_b);
        case QTS_OP_DUP_PTR: return perform_dup_ptr(env, (JSValueSlot)cmd.slot_a, (JSValue*)cmd.data.raw.d1);
        case QTS_OP_FREE: return perform_free(env, (JSValueSlot)cmd.slot_a);
        case QTS_OP_FREE_PTR: return perform_free_ptr(env, (JSValue*)cmd.data.raw.d1);
        case QTS_OP_BYTECODE_WRITE: return perform_bytecode_write(env, (JSValueSlot)cmd.slot_a, (JSValueSlot)cmd.slot_b, cmd.data.raw.d1);
        case QTS_OP_BYTECODE_READ: return perform_bytecode_read(env, (JSValueSlot)cmd.slot_a, (JSValueSlot)cmd.slot_b, cmd.data.raw.d1);
        case QTS_OP_FUNCLIST_NEW: return perform_funclist_new(env, (FuncListSlot)cmd.slot_a, cmd.data.raw.d1);
        case QTS_OP_FUNCLIST_ASSIGN: return perform_funclist_assign(env, (JSValueSlot)cmd.slot_a, (FuncListSlot)cmd.slot_b);
        case QTS_OP_FUNCLIST_FREE: return perform_funclist_free(env, (FuncListSlot)cmd.slot_a);
        case QTS_OP_FUNCLIST_DEF_CFUNC: return perform_funclist_def_cfunc(env, (FuncListSlot)cmd.slot_a, cmd.slot_b, (JSPropFlags)cmd.slot_c, cmd.data.raw.d1, (char*)cmd.data.raw.d2, (JSCFunctionType*)cmd.data.raw.d3);
        case QTS_OP_FUNCLIST_DEF_CFUNC_CTOR: return perform_funclist_def_cfunc_ctor(env, (FuncListSlot)cmd.slot_a, cmd.slot_b, (JSPropFlags)cmd.slot_c, cmd.data.raw.d1, (char*)cmd.data.raw.d2, (JSCFunctionType*)cmd.data.raw.d3);
        case QTS_OP_FUNCLIST_DEF_CGETSET: return perform_funclist_def_cgetset(env, (FuncListSlot)cmd.slot_a, cmd.slot_b, (JSPropFlags)cmd.slot_c, (char*)cmd.data.raw.d1, (JSCFunctionType*)cmd.data.raw.d2, (JSCFunctionType*)cmd.data.raw.d3);
        case QTS_OP_FUNCLIST_DEF_STRING: return perform_funclist_def_string(env, (FuncListSlot)cmd.slot_a, cmd.slot_b, (JSPropFlags)cmd.slot_c, cmd.data.buf.ptr, cmd.data.buf.len, (char*)cmd.data.buf.extra);
        case QTS_OP_FUNCLIST_DEF_INT32: return perform_funclist_def_int32(env, (FuncListSlot)cmd.slot_a, cmd.slot_b, (JSPropFlags)cmd.slot_c, cmd.data.raw.d1, (int32_t)cmd.data.raw.d2, (char*)cmd.data.raw.d3);
        case QTS_OP_FUNCLIST_DEF_INT64: return perform_funclist_def_int64(env, (FuncListSlot)cmd.slot_a, cmd.slot_b, (JSPropFlags)cmd.slot_c, cmd.data.i64.value, (char*)cmd.data.i64.extra);
        case QTS_OP_FUNCLIST_DEF_DOUBLE: return perform_funclist_def_double(env, (FuncListSlot)cmd.slot_a, cmd.slot_b, (JSPropFlags)cmd.slot_c, cmd.data.f64.value, (char*)cmd.data.f64.extra);
        case QTS_OP_FUNCLIST_DEF_NULL: return perform_funclist_def_null(env, (FuncListSlot)cmd.slot_a, (JSPropFlags)cmd.slot_c, cmd.data.buf.ptr, cmd.data.buf.len, cmd.data.buf.extra);
        case QTS_OP_FUNCLIST_DEF_UNDEFINED: return perform_funclist_def_undefined(env, (FuncListSlot)cmd.slot_a, (JSPropFlags)cmd.slot_c, cmd.data.buf.ptr, cmd.data.buf.len, cmd.data.buf.extra);
        case QTS_OP_FUNCLIST_DEF_OBJECT: return perform_funclist_def_object(env, (FuncListSlot)cmd.slot_a, (FuncListSlot)cmd.slot_b, (JSPropFlags)cmd.slot_c, cmd.data.buf.ptr, cmd.data.buf.len, cmd.data.buf.extra);
        default:
            env->error = "Unknown opcode";
            return QTS_COMMAND_ERROR;
    }
}
