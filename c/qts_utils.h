/**
 * qts_utils.h
 *
 * Shared utilities for interface.c and perform_op.c implementations.
 * NOT generated - edit manually.
 */

#ifndef QTS_UTILS_H
#define QTS_UTILS_H

#ifdef QTS_USE_QUICKJS_NG
#include "../vendor/quickjs-ng/quickjs.h"
#else
#include "../vendor/quickjs/quickjs.h"
#endif

#include <stdbool.h>
#include <stdint.h>
#include <stdio.h>


typedef uint8_t JSPropFlags;   /** JS_PROP_* flags */
typedef int32_t HostRefId;     /** Host callback reference ID */

// Slot types - used for indexing into the command environment arrays
typedef uint8_t JSValueSlot;
typedef uint8_t FuncListSlot;

/**
 * A funclist is a dynamically allocated JSCFunctionListEntry array.
 * Used for bulk-defining properties on objects with JS_SetPropertyFunctionList.
 */
typedef struct QTS_FuncList {
    JSCFunctionListEntry *entries;
    uint32_t count;
} QTS_FuncList;


/** Debug macros for op implementations */
#ifdef QTS_DEBUG_MODE
#define OP_DEBUG(ctx, msg) do { \
    if (qts_get_context_rt_data(ctx)->debug_log) qts_log(msg); \
} while(0)
#define OP_DUMP(ctx, value) do { \
    if (qts_get_context_rt_data(ctx)->debug_log) qts_dump(ctx, value); \
} while(0)
#else
#define OP_DEBUG(ctx, msg) do {} while(0)
#define OP_DUMP(ctx, value) do {} while(0)
#endif

// ----------------------------------------------------------------------------
// Runtime metadata
// ----------------------------------------------------------------------------

typedef struct qts_RuntimeData {
  bool debug_log;
} qts_RuntimeData;

/**
 * Get or initialize runtime data for the given runtime.
 * Allocates and attaches a qts_RuntimeData if not already present.
 */
qts_RuntimeData *qts_get_runtime_data(JSRuntime *rt);

/**
 * Get runtime data from context's runtime.
 */
qts_RuntimeData *qts_get_context_rt_data(JSContext *ctx);

// ----------------------------------------------------------------------------
// Heap allocation for JSValue pointers
// ----------------------------------------------------------------------------

/**
 * Allocate a JSValue on the heap and copy the given value.
 * This is used to return JSValue* to the host environment.
 * Caller is responsible for freeing the returned pointer.
 */
JSValue *jsvalue_to_heap(JSValueConst value);

// ----------------------------------------------------------------------------
// Host reference support
// ----------------------------------------------------------------------------

/**
 * A HostRef holds a reference ID that maps to a host (JavaScript) callback.
 * The host ref class has a GC finalizer that notifies the host when the
 * ref is no longer needed.
 */
typedef struct HostRef {
  int32_t id;
} HostRef;

/**
 * Initialize the HostRef class for the given runtime.
 * Must be called once per runtime before creating host refs.
 * Returns 0 on success, -1 on failure.
 */
int host_ref_class_init(JSRuntime *rt);

/**
 * Create a new HostRef object with the given reference ID.
 * Returns the new object on success, JS_EXCEPTION on failure.
 */
JSValue new_host_ref(JSContext *ctx, int32_t id);

/**
 * Get the class ID for HostRef objects.
 * Used by interface.c to access opaque data.
 */
JSClassID qts_get_host_ref_class_id(void);

// ----------------------------------------------------------------------------
// Debug utilities
// ----------------------------------------------------------------------------

/**
 * Log a message to stderr with the quickjs-emscripten prefix.
 */
void qts_log(char *msg);

/**
 * Dump a JSValue to stderr (converts to string first).
 */
void qts_dump(JSContext *ctx, JSValueConst value);

// ----------------------------------------------------------------------------
// Funclist callback trampolines
// These functions are used as callbacks in JSCFunctionListEntry entries.
// They use the magic field to store the host_ref_id and call back to the host.
// Declared here, defined in interface.c where qts_host_call_function is available.
// ----------------------------------------------------------------------------

/**
 * Trampoline for JS_DEF_CFUNC entries using generic_magic.
 * The magic parameter is used as the host_ref_id.
 */
JSValue qts_funclist_call_function(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv, int magic);

/**
 * Trampoline for JS_DEF_CFUNC constructor entries using constructor_magic.
 * The magic parameter is used as the host_ref_id.
 */
JSValue qts_funclist_call_constructor(JSContext *ctx, JSValueConst new_target, int argc, JSValueConst *argv, int magic);

/**
 * Trampoline for getter in JS_DEF_CGETSET_MAGIC entries.
 * The magic parameter is used as the host_ref_id for the getter.
 */
JSValue qts_funclist_getter(JSContext *ctx, JSValueConst this_val, int magic);

/**
 * Trampoline for setter in JS_DEF_CGETSET_MAGIC entries.
 * The magic parameter is used as the host_ref_id for the setter.
 */
JSValue qts_funclist_setter(JSContext *ctx, JSValueConst this_val, JSValueConst val, int magic);

#endif // QTS_UTILS_H
