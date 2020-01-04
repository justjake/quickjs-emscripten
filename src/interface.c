#include <string.h>
#include "../quickjs/quickjs.h"
#include "../quickjs/quickjs-libc.h"

/**
 * Framework: stuff we'll use to bridge the host and QuickJS VM
 * Typescript type:
 * type SuccessOrFail<T> = { result: T } | { error: unknown }
 */

#define QJS_TYPESCRIPT "QuickJS-Typescript: "

JSValue wrap_error(JSContext *ctx, JSValueConst error) {
  const char* error_prop = "error";
  JSValue result = JS_NewObject(ctx);
  js_std_dump_error(ctx);

  // Try #1: { ...error, stack, message }
  // Clone via JSON.parse(JSON.stringify(error))
  JSValue stack = JS_GetPropertyStr(ctx, error, "stack");
  JSValue message = JS_GetPropertyStr(ctx, error, "message");
  JSValue error_json = JS_JSONStringify(ctx, error, JS_UNDEFINED, JS_UNDEFINED);
  if (!JS_IsException(error_json)) {
    const char* error_json_cstring = JS_ToCString(ctx, error_json);
    JS_FreeValue(ctx, error_json);
    if (error_json_cstring != NULL) {
      JSValue error_props = JS_ParseJSON(ctx, error_json_cstring, strlen(error_json_cstring), error_prop);
      JS_FreeCString(ctx, error_json_cstring);
      if (!JS_IsException(error_props)) {
        // Set possibly non-enumerable props stack and message on error
        if (!JS_IsException(stack) && !JS_IsUndefined(stack)) {
          JS_SetPropertyStr(ctx, error_props, "stack", stack);
          JS_FreeValue(ctx, stack);
        }
        if (!JS_IsException(message) && !JS_IsUndefined(message)) {
          JS_SetPropertyStr(ctx, error_props, "message", message);
          JS_FreeValue(ctx, message);
        }

        JS_SetPropertyStr(ctx, result, error_prop, error_props);
        JS_FreeValue(ctx, error_props);

        return result;
      }
    }
  }
  // Clean up stack & message if we had an error
  JS_FreeValue(ctx, stack);
  JS_FreeValue(ctx, message);

  // Try #2: Error to string
  JSValue error_as_string = JS_ToString(ctx, error);
  if (!JS_IsException(error_as_string)) {
    JS_SetPropertyStr(ctx, result, error_prop, error_as_string);
    JS_FreeValue(ctx, error_as_string);
    return result;
  }

  // Last resort: set to a fixed error string.
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

const char* to_result_json(JSContext* ctx, JSValueConst result, int handle_json_error) {
  JSValue wrapped;
  if (JS_IsException(result)) {
    JSValue error = JS_GetException(ctx);
    wrapped = wrap_error(ctx, error);
    JS_FreeValue(ctx, error);
  } else {
    wrapped = wrap_success(ctx, result);
  }

  JSValue wrapped_as_json = JS_JSONStringify(ctx, wrapped, JS_UNDEFINED, JS_UNDEFINED);
  JS_FreeValue(ctx, wrapped);
  if (JS_IsException(wrapped_as_json)) {
    if (handle_json_error) {
      return to_result_json(ctx, wrapped_as_json, 0);
    }

    return (QJS_TYPESCRIPT "failed to serialize value to JSON");
  }

  const char* owned_cstring = JS_ToCString(ctx, wrapped_as_json);
  JS_FreeValue(ctx, wrapped_as_json);
  if (!owned_cstring) {
    return NULL;
  }
  const char* out = strdup(owned_cstring);
  JS_FreeCString(ctx, owned_cstring);
  return out;
}

/**
 * APIs
 */

const char* eval(char* js_code) {
  // Startup
  JSRuntime *runtime = JS_NewRuntime();
  JSContext *ctx = JS_NewContext(runtime);

  // Do stuff
  JSValue value = JS_Eval(ctx, js_code, strlen(js_code), "eval.js", 0);
  const char* result = to_result_json(ctx, value, 1);
  JS_FreeValue(ctx, value);

  // Free JS stuff
  JS_FreeContext(ctx);
  JS_FreeRuntime(runtime);

  return result;
}
