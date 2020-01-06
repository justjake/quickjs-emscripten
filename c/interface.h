#include <string.h>
#include <stdio.h>
#include <math.h>  // For NAN
#include "../quickjs/quickjs.h"
#include "../quickjs/quickjs-libc.h"

char* QTS_EvalToJSON(char* js_code);
JSRuntime *QTS_NewRuntime();
void QTS_FreeRuntime(JSRuntime *rt);
JSContext *QTS_NewContext(JSRuntime *rt);
void QTS_FreeContext(JSContext *rt);
void QTS_FreeValuePointer(JSContext *ctx, JSValue *value);
JSValue *QTS_NewObject(JSContext *ctx);
JSValue *QTS_NewFloat64(JSContext *ctx, double num);
double QTS_GetFloat64(JSContext *ctx, JSValue *value);
JSValue *QTS_NewString(JSContext *ctx, const char* string);
char* QTS_GetString(JSContext *ctx, JSValue *value);
char* QTS_Typeof(JSContext *ctx, JSValue *value);
