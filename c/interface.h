#include <string.h>
#include <stdio.h>
#include <math.h>  // For NAN
#include <stdbool.h>
#include "../quickjs/quickjs.h"
#include "../quickjs/quickjs-libc.h"

void QTS_SetHostCallback(QTS_C_To_HostCallbackFunc *fp);
JSValue *QTS_NewFunction(JSContext *ctx, JSValue *func_data, const char* name, int min_argc);
JSValueConst *QTS_GetUndefined();
JSRuntime *QTS_NewRuntime();
void QTS_FreeRuntime(JSRuntime *rt);
JSContext *QTS_NewContext(JSRuntime *rt);
void QTS_FreeContext(JSContext *ctx);
void QTS_FreeValuePointer(JSContext *ctx, JSValue *value);
JSValue *QTS_DupValuePointer(JSContext* ctx, JSValueConst *val);
JSValue *QTS_NewObject(JSContext *ctx);
JSValue *QTS_NewObjectProto(JSContext *ctx, JSValueConst *proto);
JSValue *QTS_NewFloat64(JSContext *ctx, double num);
double QTS_GetFloat64(JSContext *ctx, JSValueConst *value);
JSValue *QTS_NewString(JSContext *ctx, const char* string);
char* QTS_GetString(JSContext *ctx, JSValueConst *value);
JSValueConst *QTS_ArgvGetJSValueConstPointer(JSValueConst *argv, int index);
JSValue *QTS_GetProp(JSContext *ctx, JSValueConst *this_val, JSValueConst *prop_name);
void QTS_SetProp(JSContext *ctx, JSValueConst *this_val, JSValueConst *prop_name, JSValueConst *prop_value);
void QTS_DefineProp(JSContext *ctx, JSValueConst *this_val, JSValueConst *prop_name, JSValueConst *prop_value, JSValueConst *get, JSValueConst *set, bool configurable, bool enumerable, bool has_value);
JSValue *QTS_Call(JSContext *ctx, JSValueConst *func_obj, JSValueConst *this_obj, int argc, JSValueConst **argv_ptrs);
JSValue *QTS_ResolveException(JSContext *ctx, JSValue *maybe_exception);
char *QTS_Dump(JSContext *ctx, JSValueConst *obj);
JSValue *QTS_Eval(JSContext *ctx, const char* js_code);
char* QTS_Typeof(JSContext *ctx, JSValueConst *value);
void QTS_Debug();
JSValue *QTS_GetGlobalObject(JSContext *ctx);
