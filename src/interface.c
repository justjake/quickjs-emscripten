#include "../quickjs/quickjs.h"
#include "../quickjs/quickjs-libc.h"
#include <string.h>

const char* eval(char* js_code) {
  JSRuntime * runtime = JS_NewRuntime();
  JSContext * ctx = JS_NewContext(runtime);
  JSValue value = JS_Eval(ctx, js_code, strlen(js_code), "eval.js", 0);
  JSValue space = JS_NewString(ctx, "  ");

  if (JS_IsException(value)) {
    js_std_dump_error(ctx);
  }

  // Extarct JSON to a C string
  JSValue jsonval = JS_JSONStringify(ctx, value, JS_NULL, space);
  const char* json_str = JS_ToCString(ctx, jsonval);
  char* json_str_copy = strdup(json_str);

  // Free JS stuff
  JS_FreeValue(ctx, value);
  JS_FreeValue(ctx, space);
  JS_FreeContext(ctx);
  JS_FreeRuntime(runtime);

  return json_str_copy;
}
