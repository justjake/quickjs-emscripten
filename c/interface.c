#include <string.h>
#include <stdio.h>
#include <math.h>  // For NAN
#include <stdbool.h>
#include "../quickjs/quickjs.h"
#include "../quickjs/quickjs-libc.h"

#define QJS_TYPESCRIPT "QuickJS-Typescript: "
#define QJS_DEBUG(msg) qjs_log(msg);
#define QJS_DUMP(value) qjs_dump(ctx, value);

void qjs_log(char* msg) {
  fputs(QJS_TYPESCRIPT, stdout);
  fputs(msg, stdout);
  fputs("\n", stdout);
}

void qjs_dump(JSContext *ctx, JSValueConst value) {
  const char *str = JS_ToCString(ctx, value);
  if (!str) {
    QJS_DEBUG("QJS_DUMP: can't dump");
    return;
  }
  fputs(str, stdout);
  JS_FreeCString(ctx, str);
  putchar('\n');
}

/**
 * Framework: stuff we'll use to bridge the host and QuickJS VM
 * Typescript type:
 * type SuccessOrFail<T> = { result: T } | { error: unknown }
 */

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


JSValue wrap_error(JSContext *ctx, JSValueConst error) {
  const char* error_prop = "error";
  JSValue result = JS_NewObject(ctx);

  // Try #1: { ...error, stack, message }
  // Clone via JSON.parse(JSON.stringify(error))
  JSValue error_json = JS_JSONStringify(ctx, error, JS_UNDEFINED, JS_UNDEFINED);
  if (!JS_IsException(error_json)) {
    QJS_DEBUG("converted error to json");
    const char* error_json_cstring = JS_ToCString(ctx, error_json);
    JS_FreeValue(ctx, error_json);
    if (error_json_cstring != NULL) {
      JSValue error_props = JS_ParseJSON(ctx, error_json_cstring, strlen(error_json_cstring), error_prop);
      JS_FreeCString(ctx, error_json_cstring);
      if (!JS_IsException(error_props)) {
        // Fill in error properties if they exist
        copy_prop_if_needed(ctx, error_props, error, "name");
        copy_prop_if_needed(ctx, error_props, error, "message");
        copy_prop_if_needed(ctx, error_props, error, "stack");

        JS_SetPropertyStr(ctx, result, error_prop, error_props);
        // no FreeValue: SetProperty consumes the value
        QJS_DEBUG("set { error: error json }");
        return result;
      }
    }
  }

  // Try #2: Error to string
  JSValue error_as_string = JS_ToString(ctx, error);
  if (!JS_IsException(error_as_string)) {
    QJS_DEBUG("converted error to string")
    JS_SetPropertyStr(ctx, result, error_prop, error_as_string);
    // no FreeValue: SetProperty consumes the value
    return result;
  }

  // Last resort: set to a fixed error string.
  QJS_DEBUG("Failed to convert error to string:")
  js_std_dump_error(ctx);
  JSValue best_we_could_do = JS_NewString(ctx, QJS_TYPESCRIPT "failed to create error");
  JS_SetPropertyStr(ctx, result, error_prop, best_we_could_do);
  // no FreeValue: SetProperty consumes the value
  return result;
}

JSValue wrap_success(JSContext *ctx, JSValue success) {
  const char* success_prop = "value";
  JSValue result = JS_NewObject(ctx);
  JS_SetPropertyStr(ctx, result, success_prop, success);
  return result;
}

char* to_result_json(JSContext* ctx, JSValue result, int handle_json_error) {
  JSValue wrapped;
  if (JS_IsException(result)) {
    QJS_DEBUG("handling exception")
    JSValue error = JS_GetException(ctx);
    QJS_DUMP(error);
    wrapped = wrap_error(ctx, error);
    JS_FreeValue(ctx, error);
    JS_FreeValue(ctx, result);
    QJS_DEBUG("freed error & result");
  } else {
    wrapped = wrap_success(ctx, result);
    // wrap_success consumes result;no free
    QJS_DEBUG("wrapped success")
  }

  QJS_DEBUG("convert wrapped to json string")
  JSValue wrapped_as_json = JS_JSONStringify(ctx, wrapped, JS_NULL, JS_NULL);
  QJS_DEBUG("convert wrapped to json string: ok")
  JS_FreeValue(ctx, wrapped);
  QJS_DEBUG("free wrapped")
  if (JS_IsException(wrapped_as_json)) {
    QJS_DEBUG("failed to convert to json");
    if (handle_json_error) {
      QJS_DEBUG("recursing to return error")
      return to_result_json(ctx, wrapped_as_json, 0);
    }

    QJS_DEBUG("failed to convert error path to json; bailing")
    return (QJS_TYPESCRIPT "failed to serialize value to JSON");
  }

  const char* owned_cstring = JS_ToCString(ctx, wrapped_as_json);
  JS_FreeValue(ctx, wrapped_as_json);
  QJS_DEBUG("extracted cstring")
  if (!owned_cstring) {
    return NULL;
  }
  char* out = strdup(owned_cstring);
  QJS_DEBUG("duplicated cstring");
  JS_FreeCString(ctx, owned_cstring);
  QJS_DEBUG("freed cstring. done!");
  return out;
}

/**
 * APIs
 */

char* QTS_EvalToJSON(char* js_code) {
  const char* result = "none";
  // Startup
  JSRuntime *runtime = JS_NewRuntime();
  JSContext *ctx = JS_NewContext(runtime);

  // Do stuff
  JSValue value = JS_Eval(ctx, js_code, strlen(js_code), "eval.js", 0);
  result = to_result_json(ctx, value, 1);
  // value consumed by to_result_json
  QJS_DEBUG("got a result");
  /*QJS_DEBUG(result);*/
  /*QJS_DUMP(value);*/

  // Free JS stuff
  JS_FreeContext(ctx);
  JS_FreeRuntime(runtime);

  return result;
}



/**
 * FFI
 *
 * Functions starting with "QTS_" are exported to:
 * - interface.h for native
 * - ffi.ts for emscripten
 */
JSValueConst QTS_Undefined = JS_UNDEFINED;
JSValue *QTS_GetUndefined() {
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

void QTS_FreeContext(JSContext *rt) {
  JS_FreeContext(rt);
}

JSValue *jsvalue_to_heap(JSValueConst value) {
  JSValue* result = malloc(sizeof(JSValue));
  if  (result) {
    memcpy(result, &value, sizeof(JSValue));
  }
  return result;
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

JSValue *QTS_NewFunction(JSContext *ctx, JSCFunction *fn, const char* name) {
  return jsvalue_to_heap(JS_NewCFunction(ctx, fn, name, strlen(name)));
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

void QTS_DefineProp(JSContext *ctx, JSValueConst *this_val, JSValueConst *prop_name, JSValueConst *prop_value, JSValueConst *get, JSValueConst *set, bool configurable, bool enumerable) {
  JSAtom prop_atom = JS_ValueToAtom(ctx, *prop_name);

  int flags = 0;
  if (configurable) {
    flags = flags | JS_PROP_HAS_CONFIGURABLE;
  }
  if (enumerable) {
    flags = flags | JS_PROP_HAS_ENUMERABLE;
  }
  if (!JS_IsUndefined(*get)) {
    flags = flags | JS_PROP_HAS_GET;
  }
  if (!JS_IsUndefined(*set)) {
    flags = flags | JS_PROP_HAS_SET;
  }
  if (!JS_IsUndefined(*prop_value)) {
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
        char * result = QTS_GetString(ctx, &enumerable_json);
        JS_FreeValue(ctx, enumerable_json);
        return result;
      }
    }
  }

  QJS_DEBUG("Error dumping JSON:");
  js_std_dump_error(ctx);

  // Fallback: convert to string
  return QTS_GetString(ctx, obj);
}

JSValue *QTS_Eval(JSContext *ctx, const char* js_code) {
  return jsvalue_to_heap(JS_Eval(ctx, js_code, strlen(js_code), "eval.js", 0));
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
