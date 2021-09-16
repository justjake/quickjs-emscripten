/**
 * interface.c
 *
 * We primarily use JSValue* (pointer to JSValue) when communicating with the
 * host javascript environment, because pointers are trivial to use for calls
 * into emscripten because they're just a number!
 *
 * As with the quickjs.h API, a JSValueConst* value is "borrowed" and should
 * not be freed. A JSValue* is "owned" and should be freed by the owner.
 *
 * Functions starting with "QTS_" are exported by generate.ts to:
 * - interface.h for native C code.
 * - ffi.ts for emscripten.
 */

#include <string.h>
#include <stdio.h>
#include <math.h>  // For NAN
#include <stdbool.h>
#include "../quickjs/quickjs.h"
#include "../quickjs/quickjs-libc.h"

#define PKG "quickjs-emscripten: "

#ifdef QTS_DEBUG_MODE
#define QTS_DEBUG(msg) qts_log(msg);
#define QTS_DUMP(value) qts_dump(ctx, value);
#else
#define QTS_DEBUG(msg) ;
#define QTS_DUMP(value) ;
#endif

/**
 * Signal to our FFI code generator that this string argument should be passed as a pointer
 * allocated by the caller on the heap, not a JS string on the stack.
 * https://github.com/emscripten-core/emscripten/issues/6860#issuecomment-405818401
 */
#define HeapChar const char

void qts_log(char* msg) {
  fputs(PKG, stderr);
  fputs(msg, stderr);
  fputs("\n", stderr);
}

void qts_dump(JSContext *ctx, JSValueConst value) {
  const char *str = JS_ToCString(ctx, value);
  if (!str) {
    QTS_DEBUG("QTS_DUMP: can't dump");
    return;
  }
  fputs(str, stderr);
  JS_FreeCString(ctx, str);
  putchar('\n');
}

void copy_prop_if_needed(JSContext* ctx, JSValueConst dest, JSValueConst src, const char* prop_name) {
  JSAtom prop_atom = JS_NewAtom(ctx, prop_name);
  JSValue dest_prop = JS_GetProperty(ctx, dest, prop_atom);
  if (JS_IsUndefined(dest_prop)) {
    JSValue src_prop = JS_GetProperty(ctx, src, prop_atom);
    if (!JS_IsUndefined(src_prop) && !JS_IsException(src_prop)) {
      JS_SetProperty(ctx, dest, prop_atom, src_prop);
    }
  } else {
    JS_FreeValue(ctx, dest_prop);
  }
  JS_FreeAtom(ctx, prop_atom);
}

JSValue *jsvalue_to_heap(JSValueConst value) {
  JSValue* result = malloc(sizeof(JSValue));
  if (result) {
    memcpy(result, &value, sizeof(JSValue));
  }
  return result;
}

/**
 * C -> Host JS calls support
 */

// When host javascript loads this Emscripten module, it should set `bound_callback` to a dispatcher function.
typedef JSValue* QTS_C_To_HostCallbackFunc(JSContext *ctx, JSValueConst *this_ptr, int argc, JSValueConst *argv, JSValueConst *fn_data_ptr);
QTS_C_To_HostCallbackFunc* bound_callback = NULL;

void QTS_SetHostCallback(QTS_C_To_HostCallbackFunc* fp) {
  bound_callback = fp;
}

// We always use a pointer to this function with NewCFunctionData.
// The host JS should do it's own dispatch based on the value of *func_data.
JSValue qts_quickjs_to_c_callback(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv, int magic, JSValue *func_data) {
  if (bound_callback == NULL) {
    printf(PKG "callback from C, but no QTS_C_To_HostCallback set");
    abort();
  }

  JSValue* result_ptr = (*bound_callback)(ctx, &this_val, argc, argv, func_data);
  if (result_ptr == NULL) {
    return JS_UNDEFINED;
  }
  JSValue result = *result_ptr;
  free(result_ptr);
  return result;
}

JSValueConst *QTS_ArgvGetJSValueConstPointer(JSValueConst *argv, int index) {
  return &argv[index];
}

JSValue *QTS_NewFunction(JSContext *ctx, JSValueConst *func_data, const char* name) {
  JSValue func_obj = JS_NewCFunctionData(ctx, &qts_quickjs_to_c_callback, /* min argc */0, /* unused magic */0, /* func_data len */1, func_data);
  JS_DefinePropertyValueStr(ctx, func_obj, "name", JS_NewString(ctx, name), JS_PROP_CONFIGURABLE);
  return jsvalue_to_heap(func_obj);
}

JSValue *QTS_Throw(JSContext *ctx, JSValueConst* error) {
  JSValue copy = JS_DupValue(ctx, *error);
  return jsvalue_to_heap(JS_Throw(ctx, copy));
}

JSValue *QTS_NewError(JSContext *ctx) {
  return jsvalue_to_heap(JS_NewError(ctx));
}


/**
 * Interrupt handler - called regularly from QuickJS. Return !=0 to interrupt.
 * TODO: because this is perf critical, really send a new func pointer for each
 * call to QTS_RuntimeEnableInterruptHandler instead of using dispatch.
 */
typedef int QTS_C_To_HostInterruptFunc(JSRuntime *rt);
QTS_C_To_HostInterruptFunc *bound_interrupt = NULL;

int qts_interrupt_handler(JSRuntime *rt, void *_unused) {
  if (bound_interrupt == NULL) {
    printf(PKG "cannot call interrupt handler because no QTS_C_To_HostInterruptFunc set");
    abort();
  }
  return (*bound_interrupt)(rt);
}

void QTS_SetInterruptCallback(QTS_C_To_HostInterruptFunc *cb) {
  bound_interrupt = cb;
}

void QTS_RuntimeEnableInterruptHandler(JSRuntime *rt) {
  if (bound_interrupt == NULL) {
    printf(PKG "cannot enable interrupt handler because no QTS_C_To_HostInterruptFunc set");
    abort();
  }

  JS_SetInterruptHandler(rt, &qts_interrupt_handler, NULL);
}

void QTS_RuntimeDisableInterruptHandler(JSRuntime *rt) {
  JS_SetInterruptHandler(rt, NULL, NULL);
}

/**
 * Limits.
 */

/**
 * Memory limit. Set to -1 to disable.
 */
void QTS_RuntimeSetMemoryLimit(JSRuntime *rt, size_t limit) {
  JS_SetMemoryLimit(rt, limit);
}

/**
 * Memory diagnostics
 */

JSValue *QTS_RuntimeComputeMemoryUsage(JSRuntime *rt, JSContext *ctx) {
  JSMemoryUsage s;
  JS_ComputeMemoryUsage(rt, &s);

  // Note that we're going to allocate more memory just to report the memory usage.
  // A more sound approach would be to bind JSMemoryUsage struct directly - but that's
  // a lot of work. This should be okay in the mean time.
  JSValue result = JS_NewObject(ctx);

  // Manually generated via editor-fu from JSMemoryUsage struct definition in quickjs.h
  JS_SetPropertyStr(ctx, result, "malloc_limit", JS_NewInt64(ctx, s.malloc_limit));
  JS_SetPropertyStr(ctx, result, "memory_used_size", JS_NewInt64(ctx, s.memory_used_size));
  JS_SetPropertyStr(ctx, result, "malloc_count", JS_NewInt64(ctx, s.malloc_count));
  JS_SetPropertyStr(ctx, result, "memory_used_count", JS_NewInt64(ctx, s.memory_used_count));
  JS_SetPropertyStr(ctx, result, "atom_count", JS_NewInt64(ctx, s.atom_count));
  JS_SetPropertyStr(ctx, result, "atom_size", JS_NewInt64(ctx, s.atom_size));
  JS_SetPropertyStr(ctx, result, "str_count", JS_NewInt64(ctx, s.str_count));
  JS_SetPropertyStr(ctx, result, "str_size", JS_NewInt64(ctx, s.str_size));
  JS_SetPropertyStr(ctx, result, "obj_count", JS_NewInt64(ctx, s.obj_count));
  JS_SetPropertyStr(ctx, result, "obj_size", JS_NewInt64(ctx, s.obj_size));
  JS_SetPropertyStr(ctx, result, "prop_count", JS_NewInt64(ctx, s.prop_count));
  JS_SetPropertyStr(ctx, result, "prop_size", JS_NewInt64(ctx, s.prop_size));
  JS_SetPropertyStr(ctx, result, "shape_count", JS_NewInt64(ctx, s.shape_count));
  JS_SetPropertyStr(ctx, result, "shape_size", JS_NewInt64(ctx, s.shape_size));
  JS_SetPropertyStr(ctx, result, "js_func_count", JS_NewInt64(ctx, s.js_func_count));
  JS_SetPropertyStr(ctx, result, "js_func_size", JS_NewInt64(ctx, s.js_func_size));
  JS_SetPropertyStr(ctx, result, "js_func_code_size", JS_NewInt64(ctx, s.js_func_code_size));
  JS_SetPropertyStr(ctx, result, "js_func_pc2line_count", JS_NewInt64(ctx, s.js_func_pc2line_count));
  JS_SetPropertyStr(ctx, result, "js_func_pc2line_size", JS_NewInt64(ctx, s.js_func_pc2line_size));
  JS_SetPropertyStr(ctx, result, "c_func_count", JS_NewInt64(ctx, s.c_func_count));
  JS_SetPropertyStr(ctx, result, "array_count", JS_NewInt64(ctx, s.array_count));
  JS_SetPropertyStr(ctx, result, "fast_array_count", JS_NewInt64(ctx, s.fast_array_count));
  JS_SetPropertyStr(ctx, result, "fast_array_elements", JS_NewInt64(ctx, s.fast_array_elements));
  JS_SetPropertyStr(ctx, result, "binary_object_count", JS_NewInt64(ctx, s.binary_object_count));
  JS_SetPropertyStr(ctx, result, "binary_object_size", JS_NewInt64(ctx, s.binary_object_size));

  return jsvalue_to_heap(result);
}

char* QTS_RuntimeDumpMemoryUsage(JSRuntime *rt) {
  char *result = malloc(sizeof(char) * 1024);
  FILE *memfile = fmemopen(result, 1024, "w");
  JSMemoryUsage s;
  JS_ComputeMemoryUsage(rt, &s);
  JS_DumpMemoryUsage(memfile, &s, rt);
  fclose(memfile);
  return result;
}

/**
 * Constant pointers. Because we always use JSValue* from the host Javascript environment,
 * we need helper fuctions to return pointers to these constants.
 */

JSValueConst QTS_Undefined = JS_UNDEFINED;
JSValueConst *QTS_GetUndefined() {
  return &QTS_Undefined;
}

JSValueConst QTS_Null = JS_NULL;
JSValueConst *QTS_GetNull() {
  return &QTS_Null;
}

JSValueConst QTS_False = JS_FALSE;
JSValueConst *QTS_GetFalse() {
  return &QTS_False;
}

JSValueConst QTS_True = JS_TRUE;
JSValueConst *QTS_GetTrue() {
  return &QTS_True;
}

/**
 * Standard FFI functions
 */

JSRuntime *QTS_NewRuntime() {
  return JS_NewRuntime();
}

void QTS_FreeRuntime(JSRuntime *rt) {
  JS_FreeRuntime(rt);
}

JSContext *QTS_NewContext(JSRuntime *rt) {
  return JS_NewContext(rt);
}

void QTS_FreeContext(JSContext *ctx) {
  JS_FreeContext(ctx);
}

void QTS_FreeValuePointer(JSContext *ctx, JSValue *value) {
  JS_FreeValue(ctx, *value);
  free(value);
}

JSValue *QTS_DupValuePointer(JSContext* ctx, JSValueConst *val) {
  return jsvalue_to_heap(JS_DupValue(ctx, *val));
}

JSValue *QTS_NewObject(JSContext *ctx) {
  return jsvalue_to_heap(JS_NewObject(ctx));
}

JSValue *QTS_NewObjectProto(JSContext *ctx, JSValueConst *proto) {
  return jsvalue_to_heap(JS_NewObjectProto(ctx, *proto));
}

JSValue *QTS_NewArray(JSContext *ctx) {
  return jsvalue_to_heap(JS_NewArray(ctx));
}

JSValue *QTS_NewFloat64(JSContext *ctx, double num) {
  return jsvalue_to_heap(JS_NewFloat64(ctx, num));
}

double QTS_GetFloat64(JSContext *ctx, JSValueConst *value) {
  double result = NAN;
  JS_ToFloat64(ctx, &result, *value);
  return result;
}

JSValue *QTS_NewString(JSContext *ctx, HeapChar *string) {
  return jsvalue_to_heap(JS_NewString(ctx, string));
}

char* QTS_GetString(JSContext *ctx, JSValueConst *value) {
  const char* owned = JS_ToCString(ctx, *value);
  char* result = strdup(owned);
  JS_FreeCString(ctx, owned);
  return result;
}

int QTS_IsJobPending(JSRuntime *rt) {
  return JS_IsJobPending(rt);
}

/*
  runs pending jobs (Promises/async functions) until it encounters
  an exception or it executed the passed maxJobsToExecute jobs.

  Passing a negative value will run the loop until there are no more
  pending jobs or an exception happened

  Returns the executed number of jobs or the exception encountered
*/
JSValue *QTS_ExecutePendingJob(JSRuntime *rt, int maxJobsToExecute) {
  JSContext *pctx;
  int status = 1;
  int executed = 0;
  while (executed != maxJobsToExecute && status == 1) {
    status = JS_ExecutePendingJob(rt, &pctx);
    if (status == -1) {
      return jsvalue_to_heap(JS_GetException(pctx));
    } else if (status == 1) {
      executed++;
    }
  }
  return jsvalue_to_heap(JS_NewFloat64(pctx, executed));
}

JSValue *QTS_GetProp(JSContext *ctx, JSValueConst *this_val, JSValueConst *prop_name) {
  JSAtom prop_atom = JS_ValueToAtom(ctx, *prop_name);
  JSValue prop_val = JS_GetProperty(ctx, *this_val, prop_atom);
  JS_FreeAtom(ctx, prop_atom);
  return jsvalue_to_heap(prop_val);
}

void QTS_SetProp(JSContext *ctx, JSValueConst *this_val, JSValueConst *prop_name, JSValueConst *prop_value) {
  JSAtom prop_atom = JS_ValueToAtom(ctx, *prop_name);
  JSValue extra_prop_value = JS_DupValue(ctx, *prop_value);
  // TODO: should we use DefineProperty internally if this object doesn't have the property yet?
  JS_SetProperty(ctx, *this_val, prop_atom, extra_prop_value); // consumes extra_prop_value
  JS_FreeAtom(ctx, prop_atom);
}

void QTS_DefineProp(JSContext *ctx, JSValueConst *this_val, JSValueConst *prop_name, JSValueConst *prop_value, JSValueConst *get, JSValueConst *set, bool configurable, bool enumerable, bool has_value) {
  JSAtom prop_atom = JS_ValueToAtom(ctx, *prop_name);

  int flags = 0;
  if (configurable) {
    flags = flags | JS_PROP_CONFIGURABLE;
    if (has_value) {
      flags = flags | JS_PROP_HAS_CONFIGURABLE;
    }
  }
  if (enumerable) {
    flags = flags | JS_PROP_ENUMERABLE;
    if (has_value) {
      flags = flags | JS_PROP_HAS_ENUMERABLE;
    }
  }
  if (!JS_IsUndefined(*get)) {
    flags = flags | JS_PROP_HAS_GET;
  }
  if (!JS_IsUndefined(*set)) {
    flags = flags | JS_PROP_HAS_SET;
  }
  if (has_value) {
    flags = flags | JS_PROP_HAS_VALUE;
  }

  JS_DefineProperty(ctx, *this_val, prop_atom, *prop_value, *get, *set, flags);
  JS_FreeAtom(ctx, prop_atom);
}


JSValue *QTS_Call(JSContext *ctx, JSValueConst *func_obj, JSValueConst *this_obj, int argc, JSValueConst **argv_ptrs) {
  // convert array of pointers to array of values
  JSValueConst argv[argc];
  int i;
  for (i=0; i<argc; i++) {
    argv[i] = *(argv_ptrs[i]);
  }

  return jsvalue_to_heap(JS_Call(ctx, *func_obj, *this_obj, argc, argv));
}

/**
 * If maybe_exception is an exception, get the error.
 * Otherwise, return NULL.
 */
JSValue *QTS_ResolveException(JSContext *ctx, JSValue *maybe_exception) {
  if (JS_IsException(*maybe_exception)) {
    return jsvalue_to_heap(JS_GetException(ctx));
  }

  return NULL;
}

char *QTS_Dump(JSContext *ctx, JSValueConst *obj) {
  JSValue obj_json_value = JS_JSONStringify(ctx, *obj, JS_UNDEFINED, JS_UNDEFINED);
  if (!JS_IsException(obj_json_value)) {
    const char* obj_json_chars = JS_ToCString(ctx, obj_json_value);
    JS_FreeValue(ctx, obj_json_value);
    if (obj_json_chars != NULL) {
      JSValue enumerable_props = JS_ParseJSON(ctx, obj_json_chars, strlen(obj_json_chars), "<dump>");
      JS_FreeCString(ctx, obj_json_chars);
      if (!JS_IsException(enumerable_props)) {
        // Copy common non-enumerable props for different object types.
        // Errors:
        copy_prop_if_needed(ctx, enumerable_props, *obj, "name");
        copy_prop_if_needed(ctx, enumerable_props, *obj, "message");
        copy_prop_if_needed(ctx, enumerable_props, *obj, "stack");

        // Serialize again.
        JSValue enumerable_json = JS_JSONStringify(ctx, enumerable_props, JS_UNDEFINED, JS_UNDEFINED);
        JS_FreeValue(ctx, enumerable_props);

        char * result = QTS_GetString(ctx, &enumerable_json);
        JS_FreeValue(ctx, enumerable_json);
        return result;
      }
    }
  }

#ifdef QTS_DEBUG_MODE
  qts_log("Error dumping JSON:");
  js_std_dump_error(ctx);
#endif

  // Fallback: convert to string
  return QTS_GetString(ctx, obj);
}

JSValue *QTS_Eval(JSContext *ctx, HeapChar *js_code, const char *filename) {
  return jsvalue_to_heap(JS_Eval(ctx, js_code, strlen(js_code), filename, JS_EVAL_TYPE_GLOBAL));
}

char* QTS_Typeof(JSContext *ctx, JSValueConst *value) {
  const char* result = "unknown";
  uint32_t tag = JS_VALUE_GET_TAG(*value);

  if (JS_IsNumber(*value)) { result = "number"; }
  else if (tag == JS_TAG_BIG_INT) { result = "bigint"; }
  else if (JS_IsBigFloat(*value)) { result = "bigfloat"; }
  else if (JS_IsBigDecimal(*value)) { result = "bigdecimal"; }
  else if (JS_IsFunction(ctx, *value)) { result = "function"; }
  else if (JS_IsBool(*value)) { result = "boolean"; }
  else if (JS_IsNull(*value)) { result = "object"; }
  else if (JS_IsUndefined(*value)) { result = "undefined"; }
  else if (JS_IsUninitialized(*value)) { result = "undefined"; }
  else if (JS_IsString(*value)) { result = "string"; }
  else if (JS_IsSymbol(*value)) { result = "symbol"; }
  else if (JS_IsObject(*value)) { result = "object"; }

  char* out = strdup(result);
  return out;
}

JSValue *QTS_GetGlobalObject(JSContext *ctx) {
  return jsvalue_to_heap(JS_GetGlobalObject(ctx));
}

JSValue *QTS_NewPromiseCapability(JSContext *ctx, JSValue **resolve_funcs_out) {
  JSValue resolve_funcs[2];
  JSValue promise = JS_NewPromiseCapability(ctx, resolve_funcs);
  resolve_funcs_out[0] = jsvalue_to_heap(resolve_funcs[0]);
  resolve_funcs_out[1] = jsvalue_to_heap(resolve_funcs[1]);
  return jsvalue_to_heap(promise);
}

void QTS_TestStringArg(const char *string) {
  // pass
}
