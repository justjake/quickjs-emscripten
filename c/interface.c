#include <string.h>
#include <stdio.h>
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


JSValue wrap_error(JSContext *ctx, JSValueConst error) {
  const char* error_prop = "error";
  JSValue result = JS_NewObject(ctx);

  // Try #1: { ...error, stack, message }
  // Clone via JSON.parse(JSON.stringify(error))
  JSValue stack = JS_GetPropertyStr(ctx, error, "stack");
  JSValue message = JS_GetPropertyStr(ctx, error, "message");
  JSValue error_json = JS_JSONStringify(ctx, error, JS_UNDEFINED, JS_UNDEFINED);
  if (!JS_IsException(error_json)) {
    QJS_DEBUG("converted error to json");
    const char* error_json_cstring = JS_ToCString(ctx, error_json);
    JS_FreeValue(ctx, error_json);
    if (error_json_cstring != NULL) {
      JSValue error_props = JS_ParseJSON(ctx, error_json_cstring, strlen(error_json_cstring), error_prop);
      JS_FreeCString(ctx, error_json_cstring);
      if (!JS_IsException(error_props)) {
        // Set possibly non-enumerable props stack and message on error
        if (!JS_IsException(stack) && !JS_IsUndefined(stack)) {
          QJS_DEBUG("setting stack");
          JS_SetPropertyStr(ctx, error_props, "stack", stack);
          JS_FreeValue(ctx, stack);
          QJS_DEBUG("done: setting stack");
        }
        if (!JS_IsException(message) && !JS_IsUndefined(message)) {
          QJS_DEBUG("setting message");
          JS_SetPropertyStr(ctx, error_props, "message", message);
          JS_FreeValue(ctx, message);
          QJS_DEBUG("done: setting message");
        }

        JS_SetPropertyStr(ctx, result, error_prop, error_props);
        JS_FreeValue(ctx, error_props);
        QJS_DEBUG("set { error: error json }");

        return result;
      }
    }
  }
  // Clean up stack & message if we had an error
  JS_FreeValue(ctx, stack);
  JS_FreeValue(ctx, message);
  QJS_DEBUG("freed stack and message")

  // Try #2: Error to string
  JSValue error_as_string = JS_ToString(ctx, error);
  if (!JS_IsException(error_as_string)) {
    QJS_DEBUG("converted error to string")
    JS_SetPropertyStr(ctx, result, error_prop, error_as_string);
    JS_FreeValue(ctx, error_as_string);
    return result;
  }

  // Last resort: set to a fixed error string.
  QJS_DEBUG("last resort")
  js_std_dump_error(ctx);
  JSValue best_we_could_do = JS_NewString(ctx, QJS_TYPESCRIPT "failed to create error");
  JS_SetPropertyStr(ctx, result, error_prop, best_we_could_do);
  JS_FreeValue(ctx, best_we_could_do);
  return result;
}

JSValue wrap_success(JSContext *ctx, JSValueConst success) {
  const char* success_prop = "value";
  JSValue result = JS_NewObject(ctx);
  JS_SetPropertyStr(ctx, result, success_prop, success);
  return result;
}

char* to_result_json(JSContext* ctx, JSValueConst result, int handle_json_error) {
  JSValue wrapped;
  if (JS_IsException(result)) {
    QJS_DEBUG("handling exception")
    JSValue error = JS_GetException(ctx);
    QJS_DUMP(error);
    wrapped = wrap_error(ctx, error);
    QJS_DEBUG("wrapped error");
    /*QJS_DEBUG("wrapped error, now freeing");*/
    /*JS_FreeValue(ctx, error);*/
    /*QJS_DEBUG("freed error");*/
    QJS_DUMP(wrapped);
  } else {
    wrapped = wrap_success(ctx, result);
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
  QJS_DEBUG("got a result");
  /*QJS_DEBUG(result);*/
  QJS_DUMP(value);
  /*JS_FreeValue(ctx, value);*/

  // Free JS stuff
  JS_FreeContext(ctx);
  JS_FreeRuntime(runtime);

  return result;
}
