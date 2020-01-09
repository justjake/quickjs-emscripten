#include <string.h>
#include <stdio.h>
#include <math.h>  // For NAN
#include <stdbool.h>
#include "../quickjs/quickjs.h"
#include "../quickjs/quickjs-libc.h"

#define PKG "quickjs-emscripten: "

#ifdef QTS_DEBUG
#define QTS_DEBUG(msg) qts_log(msg);
#define QTS_DUMP(value) qts_dump(ctx, value);
#else
#define QTS_DEBUG(msg) ;
#define QTS_DUMP(value) ;
#endif

void qts_log(char* msg) {
  fputs(PKG, stdout);
  fputs(msg, stdout);
  fputs("\n", stdout);
}

void qts_dump(JSContext *ctx, JSValueConst value) {
  const char *str = JS_ToCString(ctx, value);
  if (!str) {
    QTS_DEBUG("QTS_DUMP: can't dump");
    return;
  }
  fputs(str, stdout);
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
  if  (result) {
    memcpy(result, &value, sizeof(JSValue));
  }
  return result;
}

/**
 * C -> Host JS calls support
 */

// When host javascript loads this Emscripten module, it should set `bound_callback` to a dispatcher function
typedef JSValue* QTS_C_To_HostCallbackFunc(JSContext *ctx, JSValueConst *this_ptr, int argc, JSValueConst **argv_ptrs, JSValueConst *fn_data_ptr);
QTS_C_To_HostCallbackFunc* bound_callback = NULL;

void QTS_SetHostCallback(QTS_C_To_HostCallbackFunc *fp) {
  bound_callback = fp;
}

// We always use a pointer to this function with NewCFunctionData.
JSValue qts_quickjs_to_c_callback(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv, int magic, JSValue *func_data) {
  if (bound_callback == NULL) {
    printf(PKG "callback from C, but no QTS_C_To_HostCallback set");
    abort();
  }

  JSValueConst* argv_ptrs[argc];
  int i;
  for (i = 0; i < argc; i++) {
    argv_ptrs[i] = &argv[i];
  }

  JSValue* result_ptr = (*bound_callback)(ctx, &this_val, argc, argv_ptrs, func_data);
  if (result_ptr == NULL) {
    // Exception in the host
  }
  return *result_ptr;
}

JSValue *QTS_NewFunction(JSContext *ctx, JSValue *func_data, const char* name, int min_argc) {
  JSValue func_obj = JS_NewCFunctionData(ctx, &qts_quickjs_to_c_callback, min_argc, /* unused magic */0, /* func_data len */1, func_data);
  JS_DefinePropertyValueStr(ctx, func_obj, "name", JS_NewString(ctx, name), JS_PROP_CONFIGURABLE);
  return jsvalue_to_heap(func_obj);
}


/**
 * FFI
 *
 * Functions starting with "QTS_" are exported to:
 * - interface.h for native
 * - ffi.ts for emscripten
 */
JSValueConst QTS_Undefined = JS_UNDEFINED;
JSValueConst *QTS_GetUndefined() {
  return &QTS_Undefined;
}

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

JSValue *QTS_NewFloat64(JSContext *ctx, double num) {
  return jsvalue_to_heap(JS_NewFloat64(ctx, num));
}

double QTS_GetFloat64(JSContext *ctx, JSValueConst *value) {
  double result = NAN;
  JS_ToFloat64(ctx, &result, *value);
  return result;
}

JSValue *QTS_NewString(JSContext *ctx, const char* string) {
  return jsvalue_to_heap(JS_NewString(ctx, string));
}

char* QTS_GetString(JSContext *ctx, JSValueConst *value) {
  const char* owned = JS_ToCString(ctx, *value);
  char* result = strdup(owned);
  JS_FreeCString(ctx, owned);
  return result;
}




JSValueConst *QTS_ArgvGetJSValueConstPointer(JSValueConst *argv, int index) {
  return &argv[index];
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

  qts_log("Error dumping JSON:");
  js_std_dump_error(ctx);

  // Fallback: convert to string
  return QTS_GetString(ctx, obj);
}

JSValue *QTS_Eval(JSContext *ctx, const char* js_code) {
  return jsvalue_to_heap(JS_Eval(ctx, js_code, strlen(js_code), "eval.js", JS_EVAL_TYPE_GLOBAL));
}

char* QTS_Typeof(JSContext *ctx, JSValueConst *value) {
  const char* result = "";

  if (JS_IsNumber(*value)) { result = "number"; }
  else if (JS_IsBool(*value)) { result = "boolean"; }
  else if (JS_IsNull(*value)) { result = "object"; }
  else if (JS_IsUndefined(*value)) { result = "undefined"; }
  else if (JS_IsUninitialized(*value)) { result = "undefined"; }
  else if (JS_IsString(*value)) { result = "string"; }
  else if (JS_IsSymbol(*value)) { result = "symbol"; }
  else if (JS_IsObject(*value)) { result = "object"; }
  else if (JS_IsFunction(ctx, *value)) { result = "function"; }

  char* out = malloc(sizeof(char) * strlen(result));
  strcpy(out, result);
  return out;
}

void QTS_Debug() {
  QTS_DEBUG(sizeof(JSValue *));
}

JSValue *QTS_GetGlobalObject(JSContext *ctx) {
  return jsvalue_to_heap(JS_GetGlobalObject(ctx));
}
