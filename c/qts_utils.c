/**
 * qts_utils.c
 *
 * Shared utilities for interface.c and perform_op.c implementations.
 * NOT generated - edit manually.
 */

#include "qts_utils.h"

#ifdef __EMSCRIPTEN__
#include <emscripten.h>
#endif

#include <stdlib.h>
#include <string.h>

#define PKG "quickjs-emscripten: "

// ----------------------------------------------------------------------------
// Runtime metadata
// ----------------------------------------------------------------------------

qts_RuntimeData *qts_get_runtime_data(JSRuntime *rt) {
  qts_RuntimeData *data = JS_GetRuntimeOpaque(rt);
  if (data == NULL) {
    data = malloc(sizeof(qts_RuntimeData));
    data->debug_log = false;
    JS_SetRuntimeOpaque(rt, data);
  }
  return data;
}

qts_RuntimeData *qts_get_context_rt_data(JSContext *ctx) {
  return qts_get_runtime_data(JS_GetRuntime(ctx));
}

// ----------------------------------------------------------------------------
// Debug utilities
// ----------------------------------------------------------------------------

void qts_log(char *msg) {
  fputs(PKG, stderr);
  fputs(msg, stderr);
  fputs("\n", stderr);
}

void qts_dump(JSContext *ctx, JSValueConst value) {
  const char *str = JS_ToCString(ctx, value);
  if (!str) {
    qts_log("QTS_DUMP: can't dump");
    return;
  }
  fputs(str, stderr);
  JS_FreeCString(ctx, str);
  putchar('\n');
}

// ----------------------------------------------------------------------------
// Heap allocation for JSValue pointers
// ----------------------------------------------------------------------------

JSValue *jsvalue_to_heap(JSValueConst value) {
  JSValue *result = malloc(sizeof(JSValue));
  if (result) {
    // Could be better optimized, but at -0z / -ftlo, it
    // appears to produce the same binary code as a memcpy.
    *result = value;
  }
  return result;
}

// ----------------------------------------------------------------------------
// Host reference support
// ----------------------------------------------------------------------------

#ifdef __EMSCRIPTEN__
EM_JS(void, qts_host_ref_free, (JSRuntime *rt, int32_t id), {
  // For now we don't allow for async freeHostRef.
  const asyncify = undefined;
  Module['callbacks']['freeHostRef'](asyncify, rt, id);
});
#endif

// Class ID for HostRef objects - initialized once globally
static JSClassID host_ref_class_id;

static void host_ref_finalizer(JSRuntime *rt, JSValue val) {
  HostRef *hv = JS_GetOpaque(val, host_ref_class_id);
  if (hv) {
#ifdef __EMSCRIPTEN__
    qts_host_ref_free(rt, hv->id);
#endif
    js_free_rt(rt, hv);
  }
}

static JSClassDef host_ref_class = {
  .class_name = "HostRef",
  .finalizer = host_ref_finalizer,
};

int host_ref_class_init(JSRuntime *rt) {
  // Only allocate class ID once globally
  if (host_ref_class_id == 0) {
#ifdef QTS_USE_QUICKJS_NG
    JS_NewClassID(rt, &host_ref_class_id);
#else
    JS_NewClassID(&host_ref_class_id);
#endif
  }
  // Register class with this runtime if not already registered
  // JS_NewClass returns 0 on success, -1 if already registered (which is fine)
  if (!JS_IsRegisteredClass(rt, host_ref_class_id)) {
    return JS_NewClass(rt, host_ref_class_id, &host_ref_class);
  }
  return 0;
}

JSValue new_host_ref(JSContext *ctx, int32_t id) {
  HostRef *hv;
  JSValue obj;
  obj = JS_NewObjectClass(ctx, host_ref_class_id);
  if (JS_IsException(obj)) {
    return obj;
  }

  hv = js_mallocz(ctx, sizeof(*hv));
  if (!hv) {
    // js_mallocz returns NULL on failure and sets rt.exception to OutOfMemory
    JS_FreeValue(ctx, obj);
    return JS_EXCEPTION;
  }

  hv->id = id;
  JS_SetOpaque(obj, hv);
  return obj;
}

JSClassID qts_get_host_ref_class_id(void) {
  return host_ref_class_id;
}
