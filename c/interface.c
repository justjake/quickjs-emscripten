#include <string.h>
#include <stdio.h>
#include <math.h>  // For NAN
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
    /*QJS_DUMP(error);*/
    wrapped = wrap_error(ctx, error);
    QJS_DEBUG("wrapped error");
    QJS_DEBUG("wrapped error, now freeing");
    JS_FreeValue(ctx, error);
    JS_FreeValue(ctx, result);
    QJS_DEBUG("freed error");
    /*QJS_DUMP(wrapped);*/
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

char* eval(char* js_code) {
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
 */

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

JSValue *QTS_NewObject(JSContext *ctx) {
  return jsvalue_to_heap(JS_NewObject(ctx));
}

JSValue *QTS_NewFloat64(JSContext *ctx, double num) {
  return jsvalue_to_heap(JS_NewFloat64(ctx, num));
}

double QTS_GetFloat64(JSContext *ctx, JSValue *value) {
  double result = NAN;
  JS_ToFloat64(ctx, &result, *value);
  return result;
}

JSValue *QTS_NewString(JSContext *ctx, const char* string) {
  return jsvalue_to_heap(JS_NewString(ctx, string));
}

char* QTS_GetString(JSContext *ctx, JSValue *value) {
  const char* owned = JS_ToCString(ctx, *value);
  char* result = strdup(owned);
  JS_FreeCString(ctx, owned);
  return result;
}

char* QTS_Typeof(JSContext *ctx, JSValue *value) {
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
