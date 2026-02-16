/**
 * interface-mquickjs.c
 *
 * Implementation of the QTS_* interface for mquickjs.
 * mquickjs is a minimal QuickJS variant that lacks many features:
 * - No JSRuntime (only JSContext)
 * - No modules
 * - No promises
 * - No symbols (built-in support)
 * - No BigInt
 * - No intrinsics configuration
 *
 * This file provides the same QTS_* interface as interface.c but returns
 * errors for unsupported operations and adapts to mquickjs's different API.
 */

#ifdef __EMSCRIPTEN__
#include <emscripten.h>
#endif

#include <math.h>
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include "../vendor/mquickjs/mquickjs.h"
#include "../vendor/mquickjs/cutils.h"

#define PKG "quickjs-emscripten: "
#define LOG_LEN 500

#ifdef QTS_DEBUG_MODE
#define QTS_DEBUG(msg) qts_log(msg);
#else
#define QTS_DEBUG(msg) ;
#endif

/**
 * Signal to our FFI code generator that this string argument should be passed as a pointer
 * allocated by the caller on the heap, not a JS string on the stack.
 */
#define BorrowedHeapChar const char
#define OwnedHeapChar char
#define JSBorrowedChar const char

/**
 * Signal to our FFI code generator that this function should be called
 * asynchronously when compiled with ASYNCIFY.
 */
#define MaybeAsync(T) T

/**
 * Signal to our FFI code generator that this function is only available in
 * ASYNCIFY builds.
 */
#define AsyncifyOnly(T) T

#define JSVoid void

#define EvalFlags int
#define IntrinsicsFlags int
#define EvalDetectModule int

// In mquickjs, JSValue and JSValueConst are the same type (just an integer)
typedef JSValue JSValueConst;

/**
 * mquickjs doesn't have JSRuntime, so we create a fake one that holds context references.
 * We use the context pointer as the "runtime" pointer to simplify things.
 */
typedef JSContext JSRuntime;

/**
 * Runtime data stored in context opaque
 */
typedef struct qts_RuntimeData {
  bool debug_log;
  void *interrupt_opaque;
  int (*interrupt_handler)(JSContext *ctx, void *opaque);
} qts_RuntimeData;

qts_RuntimeData *qts_get_runtime_data(JSContext *ctx) {
  qts_RuntimeData *data = (qts_RuntimeData *)JS_GetContextOpaque(ctx);
  if (data == NULL) {
    data = malloc(sizeof(qts_RuntimeData));
    data->debug_log = false;
    data->interrupt_opaque = NULL;
    data->interrupt_handler = NULL;
    JS_SetContextOpaque(ctx, data);
  }
  return data;
}

// Helper function for compatibility - context is runtime in mquickjs
static inline JSContext *JS_GetRuntime(JSContext *ctx) {
  return ctx;
}

void qts_log(char *msg) {
  fputs(PKG, stderr);
  fputs(msg, stderr);
  fputs("\n", stderr);
}

void qts_dump(JSContext *ctx, JSValue value) {
  JSCStringBuf buf;
  const char *str = JS_ToCString(ctx, value, &buf);
  if (!str) {
    QTS_DEBUG("QTS_DUMP: can't dump");
    return;
  }
  fputs(str, stderr);
  putchar('\n');
}

JSValue *jsvalue_to_heap(JSValue value) {
  JSValue *result = malloc(sizeof(JSValue));
  if (result) {
    *result = value;
  }
  return result;
}

JSValue *QTS_Throw(JSContext *ctx, JSValueConst *error) {
  // mquickjs JS_Throw takes the value directly, not a copy
  return jsvalue_to_heap(JS_Throw(ctx, *error));
}

JSValue *QTS_NewError(JSContext *ctx) {
  // mquickjs doesn't have JS_NewError, create a generic error
  return jsvalue_to_heap(JS_ThrowError(ctx, JS_CLASS_ERROR, "Error"));
}

/**
 * Limits - mquickjs doesn't support memory limits
 */
void QTS_RuntimeSetMemoryLimit(JSRuntime *rt, size_t limit) {
  // Not supported in mquickjs - silently ignore
}

/**
 * Memory diagnostics - not supported in mquickjs
 */
JSValue *QTS_RuntimeComputeMemoryUsage(JSRuntime *rt, JSContext *ctx) {
  // Return an empty object - memory diagnostics not supported
  return jsvalue_to_heap(JS_NewObject(ctx));
}

OwnedHeapChar *QTS_RuntimeDumpMemoryUsage(JSRuntime *rt) {
  char *result = strdup("mquickjs: memory diagnostics not supported");
  return result;
}

int QTS_RecoverableLeakCheck() {
  return 0;
}

int QTS_BuildIsSanitizeLeak() {
#ifdef QTS_SANITIZE_LEAK
  return 1;
#else
  return 0;
#endif
}

/**
 * Set the stack size limit - not directly supported in mquickjs
 */
void QTS_RuntimeSetMaxStackSize(JSRuntime *rt, size_t stack_size) {
  // mquickjs has JS_StackCheck but no way to set the limit dynamically
}

/**
 * Constant pointers.
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
 * Host references - mquickjs doesn't support custom classes, so we use a simple
 * integer-based approach storing the ID directly in an object property.
 */
typedef int32_t HostRefId;

JSValue *QTS_NewHostRef(JSContext *ctx, HostRefId id) {
  // mquickjs doesn't have the full class system, so we store the ID in an object property
  JSValue obj = JS_NewObject(ctx);
  if (JS_IsException(obj)) {
    return jsvalue_to_heap(obj);
  }
  JSValue id_val = JS_NewFloat64(ctx, (double)id);
  JS_SetPropertyStr(ctx, obj, "$$hostRefId$$", id_val);
  return jsvalue_to_heap(obj);
}

HostRefId QTS_GetHostRefId(JSValueConst *value) {
  // Since we can't use JS_GetOpaque without a class, check if it's our host ref object
  // For mquickjs, we just return 0 (invalid) since we can't reliably detect host refs
  // This effectively disables host ref functionality in mquickjs
  return 0;
}

/**
 * Standard FFI functions
 */

// Pre-allocated memory for mquickjs context
// mquickjs requires pre-allocated memory
#define MQUICKJS_HEAP_SIZE (4 * 1024 * 1024)  // 4MB default
static uint8_t *mquickjs_heap = NULL;

JSRuntime *QTS_NewRuntime() {
  // mquickjs doesn't have separate runtime, we create a context directly
  // The "runtime" is just the context pointer
  if (mquickjs_heap == NULL) {
    mquickjs_heap = malloc(MQUICKJS_HEAP_SIZE);
    if (mquickjs_heap == NULL) {
      return NULL;
    }
  }

  JSContext *ctx = JS_NewContext(mquickjs_heap, MQUICKJS_HEAP_SIZE, NULL);
  return ctx;  // JSRuntime* is actually JSContext* for mquickjs
}

void QTS_FreeRuntime(JSRuntime *rt) {
  JSContext *ctx = (JSContext *)rt;
  qts_RuntimeData *data = (qts_RuntimeData *)JS_GetContextOpaque(ctx);
  if (data) {
    free(data);
  }
  JS_FreeContext(ctx);
}

// Intrinsics enum - for compatibility, but mquickjs doesn't support intrinsics selection
enum QTS_Intrinsic {
  QTS_Intrinsic_BaseObjects = 1 << 0,
  QTS_Intrinsic_Date = 1 << 1,
  QTS_Intrinsic_Eval = 1 << 2,
  QTS_Intrinsic_StringNormalize = 1 << 3,
  QTS_Intrinsic_RegExp = 1 << 4,
  QTS_Intrinsic_RegExpCompiler = 1 << 5,
  QTS_Intrinsic_JSON = 1 << 6,
  QTS_Intrinsic_Proxy = 1 << 7,
  QTS_Intrinsic_MapSet = 1 << 8,
  QTS_Intrinsic_TypedArrays = 1 << 9,
  QTS_Intrinsic_Promise = 1 << 10,
  QTS_Intrinsic_BigInt = 1 << 11,
  QTS_Intrinsic_BigFloat = 1 << 12,
  QTS_Intrinsic_BigDecimal = 1 << 13,
  QTS_Intrinsic_OperatorOverloading = 1 << 14,
  QTS_Intrinsic_BignumExt = 1 << 15,
};

JSContext *QTS_NewContext(JSRuntime *rt, IntrinsicsFlags intrinsics) {
  // mquickjs doesn't have separate context creation from runtime
  // The runtime IS the context, just return it
  // Intrinsics are ignored in mquickjs
  return (JSContext *)rt;
}

void QTS_FreeContext(JSContext *ctx) {
  // In mquickjs, context is freed with the runtime
  // Don't free here since QTS_FreeRuntime handles it
}

void QTS_FreeValuePointer(JSContext *ctx, JSValue *value) {
  // mquickjs doesn't have reference counting like quickjs
  // Just free the heap allocation
  free(value);
}

void QTS_FreeValuePointerRuntime(JSRuntime *rt, JSValue *value) {
  free(value);
}

void QTS_FreeVoidPointer(JSContext *ctx, JSVoid *ptr) {
  free(ptr);
}

void QTS_FreeCString(JSContext *ctx, JSBorrowedChar *str) {
  // mquickjs uses a buffer for ToCString, no need to free
  // The string is valid only until next ToCString call
}

JSValue *QTS_DupValuePointer(JSContext *ctx, JSValueConst *val) {
  // mquickjs doesn't have JS_DupValue - values are simple integers
  return jsvalue_to_heap(*val);
}

JSValue *QTS_NewObject(JSContext *ctx) {
  return jsvalue_to_heap(JS_NewObject(ctx));
}

JSValue *QTS_NewObjectProto(JSContext *ctx, JSValueConst *proto) {
  // mquickjs doesn't have JS_NewObjectProto - just create a basic object
  return jsvalue_to_heap(JS_NewObject(ctx));
}

JSValue *QTS_NewArray(JSContext *ctx) {
  return jsvalue_to_heap(JS_NewArray(ctx, 0));
}

JSValue *QTS_NewArrayBuffer(JSContext *ctx, JSVoid *buffer, size_t length) {
  // mquickjs has ArrayBuffer support via typed arrays
  // For now, return an exception - not directly supported
  return jsvalue_to_heap(JS_ThrowInternalError(ctx, "ArrayBuffer not supported in mquickjs"));
}

JSValue *QTS_NewFloat64(JSContext *ctx, double num) {
  return jsvalue_to_heap(JS_NewFloat64(ctx, num));
}

double QTS_GetFloat64(JSContext *ctx, JSValueConst *value) {
  double result = NAN;
  JS_ToNumber(ctx, &result, *value);
  return result;
}

JSValue *QTS_NewString(JSContext *ctx, BorrowedHeapChar *string) {
  return jsvalue_to_heap(JS_NewString(ctx, string));
}

JSBorrowedChar *QTS_GetString(JSContext *ctx, JSValueConst *value) {
  // Note: mquickjs uses a static buffer for ToCString
  // We need to copy the string to heap for our API
  JSCStringBuf buf;
  const char *str = JS_ToCString(ctx, *value, &buf);
  if (str == NULL) {
    return NULL;
  }
  return strdup(str);
}

JSVoid *QTS_GetArrayBuffer(JSContext *ctx, JSValueConst *data) {
  // Not supported in mquickjs
  return NULL;
}

size_t QTS_GetArrayBufferLength(JSContext *ctx, JSValueConst *data) {
  return 0;
}

JSValue *QTS_NewSymbol(JSContext *ctx, BorrowedHeapChar *description, int isGlobal) {
  // Symbols not supported in mquickjs
  return jsvalue_to_heap(JS_ThrowInternalError(ctx, "Symbols not supported in mquickjs"));
}

MaybeAsync(JSBorrowedChar *) QTS_GetSymbolDescriptionOrKey(JSContext *ctx, JSValueConst *value) {
  return strdup("symbols not supported");
}

int QTS_IsGlobalSymbol(JSContext *ctx, JSValueConst *value) {
  return 0;
}

int QTS_IsJobPending(JSRuntime *rt) {
  // No job queue in mquickjs
  return 0;
}

MaybeAsync(JSValue *) QTS_ExecutePendingJob(JSRuntime *rt, int maxJobsToExecute, JSContext **lastJobContext) {
  // No jobs in mquickjs
  *lastJobContext = (JSContext *)rt;
  return jsvalue_to_heap(JS_NewInt32((JSContext *)rt, 0));
}

MaybeAsync(JSValue *) QTS_GetProp(JSContext *ctx, JSValueConst *this_val, JSValueConst *prop_name) {
  JSCStringBuf buf;
  const char *prop_str = JS_ToCString(ctx, *prop_name, &buf);
  if (prop_str == NULL) {
    return jsvalue_to_heap(JS_EXCEPTION);
  }
  JSValue result = JS_GetPropertyStr(ctx, *this_val, prop_str);
  return jsvalue_to_heap(result);
}

MaybeAsync(JSValue *) QTS_GetPropNumber(JSContext *ctx, JSValueConst *this_val, int prop_name) {
  JSValue prop_val = JS_GetPropertyUint32(ctx, *this_val, (uint32_t)prop_name);
  return jsvalue_to_heap(prop_val);
}

MaybeAsync(void) QTS_SetProp(JSContext *ctx, JSValueConst *this_val, JSValueConst *prop_name, JSValueConst *prop_value) {
  JSCStringBuf buf;
  const char *prop_str = JS_ToCString(ctx, *prop_name, &buf);
  if (prop_str == NULL) {
    return;
  }
  JS_SetPropertyStr(ctx, *this_val, prop_str, *prop_value);
}

void QTS_DefineProp(JSContext *ctx, JSValueConst *this_val, JSValueConst *prop_name, JSValueConst *prop_value, JSValueConst *get, JSValueConst *set, bool configurable, bool enumerable, bool has_value) {
  // mquickjs doesn't have JS_DefineProperty
  // Fall back to simple SetProperty
  if (has_value) {
    QTS_SetProp(ctx, this_val, prop_name, prop_value);
  }
}

MaybeAsync(JSValue *) QTS_GetOwnPropertyNames(JSContext *ctx, JSValue ***out_ptrs, uint32_t *out_len, JSValueConst *obj, int flags) {
  // mquickjs doesn't have JS_GetOwnPropertyNames
  // Return empty array
  *out_len = 0;
  *out_ptrs = NULL;
  return NULL;
}

MaybeAsync(JSValue *) QTS_Call(JSContext *ctx, JSValueConst *func_obj, JSValueConst *this_obj, int argc, JSValueConst **argv_ptrs) {
  // mquickjs has a different calling convention - arguments are pushed onto a stack
  // Push this, then args
  for (int i = argc - 1; i >= 0; i--) {
    JS_PushArg(ctx, *(argv_ptrs[i]));
  }
  JS_PushArg(ctx, *this_obj);
  JS_PushArg(ctx, *func_obj);

  JSValue result = JS_Call(ctx, argc);
  return jsvalue_to_heap(result);
}

JSValue *QTS_ResolveException(JSContext *ctx, JSValue *maybe_exception) {
  if (JS_IsException(*maybe_exception)) {
    return jsvalue_to_heap(JS_GetException(ctx));
  }
  return NULL;
}

MaybeAsync(JSBorrowedChar *) QTS_Dump(JSContext *ctx, JSValueConst *obj) {
  // Simple dump - just convert to string
  JSCStringBuf buf;
  const char *str = JS_ToCString(ctx, *obj, &buf);
  if (str == NULL) {
    return strdup("null");
  }
  return strdup(str);
}

MaybeAsync(JSValue *) QTS_Eval(JSContext *ctx, BorrowedHeapChar *js_code, size_t js_code_length, const char *filename, EvalDetectModule detectModule, EvalFlags evalFlags) {
  // mquickjs doesn't support modules
  if (evalFlags & 0x20) {  // JS_EVAL_TYPE_MODULE = 0x20 in quickjs
    return jsvalue_to_heap(JS_ThrowInternalError(ctx, "Modules not supported in mquickjs"));
  }

  int mquickjs_flags = JS_EVAL_RETVAL;  // We want the return value
  JSValue result = JS_Eval(ctx, js_code, js_code_length, filename, mquickjs_flags);
  return jsvalue_to_heap(result);
}

JSValue *QTS_GetModuleNamespace(JSContext *ctx, JSValueConst *module_func_obj) {
  return jsvalue_to_heap(JS_ThrowInternalError(ctx, "Modules not supported in mquickjs"));
}

OwnedHeapChar *QTS_Typeof(JSContext *ctx, JSValueConst *value) {
  const char *result = "unknown";
  JSValue val = *value;

  if (JS_IsNumber(ctx, val)) {
    result = "number";
  } else if (JS_IsFunction(ctx, val)) {
    result = "function";
  } else if (JS_IsBool(val)) {
    result = "boolean";
  } else if (JS_IsNull(val)) {
    result = "object";
  } else if (JS_IsUndefined(val)) {
    result = "undefined";
  } else if (JS_IsString(ctx, val)) {
    result = "string";
  } else if (JS_IsPtr(val)) {
    // Could be object or other pointer type
    result = "object";
  }

  return strdup(result);
}

int QTS_GetLength(JSContext *ctx, uint32_t *out_len, JSValueConst *value) {
  JSValue len_val = JS_GetPropertyStr(ctx, *value, "length");
  if (JS_IsException(len_val)) {
    return -1;
  }

  int result = JS_ToUint32(ctx, out_len, len_val);
  return result;
}

typedef enum IsEqualOp {
  QTS_EqualOp_StrictEq = 0,
  QTS_EqualOp_SameValue = 1,
  QTS_EqualOp_SameValueZero = 2,
} IsEqualOp;

int QTS_IsEqual(JSContext *ctx, JSValueConst *a, JSValueConst *b, IsEqualOp op) {
  // mquickjs doesn't have these comparison functions
  // Simple equality check
  return *a == *b ? 1 : 0;
}

JSValue *QTS_GetGlobalObject(JSContext *ctx) {
  return jsvalue_to_heap(JS_GetGlobalObject(ctx));
}

JSValue *QTS_NewPromiseCapability(JSContext *ctx, JSValue **resolve_funcs_out) {
  // Promises not supported in mquickjs
  resolve_funcs_out[0] = jsvalue_to_heap(JS_UNDEFINED);
  resolve_funcs_out[1] = jsvalue_to_heap(JS_UNDEFINED);
  return jsvalue_to_heap(JS_ThrowInternalError(ctx, "Promises not supported in mquickjs"));
}

// JSPromiseStateEnum equivalent for compatibility
typedef enum {
  JS_PROMISE_PENDING,
  JS_PROMISE_FULFILLED,
  JS_PROMISE_REJECTED,
} JSPromiseStateEnum;

JSPromiseStateEnum QTS_PromiseState(JSContext *ctx, JSValueConst *promise) {
  return -1;  // Not a promise
}

JSValue *QTS_PromiseResult(JSContext *ctx, JSValueConst *promise) {
  return jsvalue_to_heap(JS_UNDEFINED);
}

void QTS_TestStringArg(const char *string) {
  // pass
}

int QTS_GetDebugLogEnabled(JSRuntime *rt) {
  qts_RuntimeData *data = qts_get_runtime_data((JSContext *)rt);
  return data->debug_log ? 1 : 0;
}

void QTS_SetDebugLogEnabled(JSRuntime *rt, int is_enabled) {
#ifdef QTS_DEBUG_MODE
  qts_RuntimeData *data = qts_get_runtime_data((JSContext *)rt);
  data->debug_log = (bool)is_enabled;
#endif
}

int QTS_BuildIsDebug() {
#ifdef QTS_DEBUG_MODE
  return 1;
#else
  return 0;
#endif
}

int QTS_BuildIsAsyncify() {
#ifdef QTS_ASYNCIFY
  return 1;
#else
  return 0;
#endif
}

// ----------------------------------------------------------------------------
// Feature detection - mquickjs has limited feature support

int QTS_HasModuleSupport() {
  return 0;  // No module support
}

int QTS_HasPromiseSupport() {
  return 0;  // No promise support
}

int QTS_HasSymbolSupport() {
  return 0;  // No symbol support
}

int QTS_HasBigIntSupport() {
  return 0;  // No BigInt support
}

int QTS_HasIntrinsicsSupport() {
  return 0;  // No intrinsics configuration support
}

int QTS_HasEvalSupport() {
  return 1;  // Basic eval is supported
}

// ----------------------------------------------------------------------------
// C -> Host Callbacks

#ifdef __EMSCRIPTEN__
EM_JS(MaybeAsync(JSValue *), qts_host_call_function, (JSContext * ctx, JSValueConst *this_ptr, int argc, JSValueConst *argv, uint32_t magic_func_id), {
#ifdef QTS_ASYNCIFY
  const asyncify = {['handleSleep'] : Asyncify.handleSleep};
#else
  const asyncify = undefined;
#endif
  return Module['callbacks']['callFunction'](asyncify, ctx, this_ptr, argc, argv, magic_func_id);
});
#endif

// Callback storage for C functions
typedef struct {
  uint32_t func_id;
  JSContext *ctx;
} QTSFunctionData;

// Function callback wrapper
JSValue qts_call_function_wrapper(JSContext *ctx, JSValue *this_val, int argc, JSValue *argv) {
  // This is simplified - mquickjs has different function calling
  return JS_UNDEFINED;
}

JSValue *QTS_NewFunction(JSContext *ctx, uint32_t func_id, const char *name) {
  // mquickjs has a very different function creation model
  // For now, return an error
  return jsvalue_to_heap(JS_ThrowInternalError(ctx, "Custom functions not yet supported in mquickjs binding"));
}

JSValueConst *QTS_ArgvGetJSValueConstPointer(JSValueConst *argv, int index) {
  return &argv[index];
}

// Interrupt handler wrapper
int qts_mquickjs_interrupt_handler(JSContext *ctx, void *opaque) {
  qts_RuntimeData *data = qts_get_runtime_data(ctx);
  if (data->interrupt_handler) {
    return data->interrupt_handler(ctx, data->interrupt_opaque);
  }
  return 0;
}

#ifdef __EMSCRIPTEN__
EM_JS(int, qts_host_interrupt_handler, (JSRuntime * rt), {
  const asyncify = undefined;
  return Module['callbacks']['shouldInterrupt'](asyncify, rt);
});
#endif

int qts_interrupt_handler(JSContext *ctx, void *_unused) {
  return qts_host_interrupt_handler(ctx);
}

void QTS_RuntimeEnableInterruptHandler(JSRuntime *rt) {
  JS_SetInterruptHandler((JSContext *)rt, &qts_interrupt_handler);
}

void QTS_RuntimeDisableInterruptHandler(JSRuntime *rt) {
  JS_SetInterruptHandler((JSContext *)rt, NULL);
}

// Module loading - not supported in mquickjs
#ifdef __EMSCRIPTEN__
EM_JS(MaybeAsync(char *), qts_host_load_module_source, (JSRuntime * rt, JSContext *ctx, const char *module_name), {
  // Not supported
  return 0;
});

EM_JS(MaybeAsync(char *), qts_host_normalize_module, (JSRuntime * rt, JSContext *ctx, const char *module_base_name, const char *module_name), {
  // Not supported
  return 0;
});
#endif

void QTS_RuntimeEnableModuleLoader(JSRuntime *rt, int use_custom_normalize) {
  // Module loading not supported in mquickjs - silently ignore
}

void QTS_RuntimeDisableModuleLoader(JSRuntime *rt) {
  // Module loading not supported in mquickjs
}

JSValue *QTS_bjson_encode(JSContext *ctx, JSValueConst *val) {
  // Binary JSON not supported in mquickjs
  return jsvalue_to_heap(JS_ThrowInternalError(ctx, "Binary JSON not supported in mquickjs"));
}

JSValue *QTS_bjson_decode(JSContext *ctx, JSValueConst *data) {
  return jsvalue_to_heap(JS_ThrowInternalError(ctx, "Binary JSON not supported in mquickjs"));
}
