#include <math.h>  // For NAN
#include <stdbool.h>
#include <stdio.h>
#include <string.h>
#include <sanitizer/lsan_interface.h>
#include "../quickjs/cutils.h"
#include "../quickjs/quickjs-libc.h"
#include "../quickjs/quickjs.h"

JSValue *QTS_Throw(JSContext *ctx, JSValueConst *error);
JSValue *QTS_NewError(JSContext *ctx);
void QTS_RuntimeSetMemoryLimit(JSRuntime *rt, size_t limit);
JSValue *QTS_RuntimeComputeMemoryUsage(JSRuntime *rt, JSContext *ctx);
OwnedHeapChar *QTS_RuntimeDumpMemoryUsage(JSRuntime *rt);
int QTS_RecoverableLeakCheck();
int QTS_BuildIsSanitizeLeak();
void QTS_RuntimeSetMaxStackSize(JSRuntime *rt, size_t stack_size);
void QTS_AddIntrinsicDate(JSContext *ctx);
void QTS_AddIntrinsicEval(JSContext *ctx);
void QTS_AddIntrinsicStringNormalize(JSContext *ctx);
void QTS_AddIntrinsicRegExpCompiler(JSContext *ctx);
void QTS_AddIntrinsicRegExp(JSContext *ctx);
void QTS_AddIntrinsicJSON(JSContext *ctx);
void QTS_AddIntrinsicProxy(JSContext *ctx);
void QTS_AddIntrinsicMapSet(JSContext *ctx);
void QTS_AddIntrinsicTypedArrays(JSContext *ctx);
void QTS_AddIntrinsicPromise(JSContext *ctx);
void QTS_AddIntrinsicBigInt(JSContext *ctx);
void QTS_AddIntrinsicBigFloat(JSContext *ctx);
void QTS_AddIntrinsicBigDecimal(JSContext *ctx);
void QTS_AddIntrinsicOperators(JSContext *ctx);
void QTS_EnableBignumExt(JSContext *ctx, bool enable);
JSValueConst *QTS_GetUndefined();
JSValueConst *QTS_GetNull();
JSValueConst *QTS_GetFalse();
JSValueConst *QTS_GetTrue();
JSRuntime *QTS_NewRuntime();
void QTS_FreeRuntime(JSRuntime *rt);
JSContext *QTS_NewContext(JSRuntime *rt);
JSContext *QTS_NewContextRaw(JSRuntime *rt);
void QTS_FreeContext(JSContext *ctx);
void QTS_FreeValuePointer(JSContext *ctx, JSValue *value);
void QTS_FreeValuePointerRuntime(JSRuntime *rt, JSValue *value);
void QTS_FreeVoidPointer(JSContext *ctx, JSVoid *ptr);
void QTS_FreeCString(JSContext *ctx, JSBorrowedChar *str);
JSValue *QTS_DupValuePointer(JSContext *ctx, JSValueConst *val);
JSValue *QTS_NewObject(JSContext *ctx);
JSValue *QTS_NewObjectProto(JSContext *ctx, JSValueConst *proto);
JSValue *QTS_NewArray(JSContext *ctx);
JSValue *QTS_NewFloat64(JSContext *ctx, double num);
double QTS_GetFloat64(JSContext *ctx, JSValueConst *value);
JSValue *QTS_NewString(JSContext *ctx, BorrowedHeapChar *string);
JSBorrowedChar *QTS_GetString(JSContext *ctx, JSValueConst *value);
JSValue *QTS_NewSymbol(JSContext *ctx, BorrowedHeapChar *description, int isGlobal);
MaybeAsync(JSBorrowedChar *) QTS_GetSymbolDescriptionOrKey(JSContext *ctx, JSValueConst *value);
int QTS_IsGlobalSymbol(JSContext *ctx, JSValueConst *value);
int QTS_IsJobPending(JSRuntime *rt);
MaybeAsync(JSValue *) QTS_ExecutePendingJob(JSRuntime *rt, int maxJobsToExecute, JSContext **lastJobContext);
MaybeAsync(JSValue *) QTS_GetProp(JSContext *ctx, JSValueConst *this_val, JSValueConst *prop_name);
MaybeAsync(void) QTS_SetProp(JSContext *ctx, JSValueConst *this_val, JSValueConst *prop_name, JSValueConst *prop_value);
void QTS_DefineProp(JSContext *ctx, JSValueConst *this_val, JSValueConst *prop_name, JSValueConst *prop_value, JSValueConst *get, JSValueConst *set, bool configurable, bool enumerable, bool has_value);
MaybeAsync(JSValue *) QTS_Call(JSContext *ctx, JSValueConst *func_obj, JSValueConst *this_obj, int argc, JSValueConst **argv_ptrs);
JSValue *QTS_ResolveException(JSContext *ctx, JSValue *maybe_exception);
MaybeAsync(JSBorrowedChar *) QTS_Dump(JSContext *ctx, JSValueConst *obj);
MaybeAsync(JSValue *) QTS_Eval(JSContext *ctx, BorrowedHeapChar *js_code, const char *filename, EvalDetectModule detectModule, EvalFlags evalFlags);
OwnedHeapChar *QTS_Typeof(JSContext *ctx, JSValueConst *value);
JSValue *QTS_GetGlobalObject(JSContext *ctx);
JSValue *QTS_NewPromiseCapability(JSContext *ctx, JSValue **resolve_funcs_out);
void QTS_TestStringArg(const char *string);
int QTS_BuildIsDebug();
int QTS_BuildIsAsyncify();
JSValue *QTS_NewFunction(JSContext *ctx, uint32_t func_id, const char *name);
JSValueConst *QTS_ArgvGetJSValueConstPointer(JSValueConst *argv, int index);
void QTS_RuntimeEnableInterruptHandler(JSRuntime *rt);
void QTS_RuntimeDisableInterruptHandler(JSRuntime *rt);
void QTS_RuntimeEnableModuleLoader(JSRuntime *rt, int use_custom_normalize);
void QTS_RuntimeDisableModuleLoader(JSRuntime *rt);
