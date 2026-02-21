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

// ----------------------------------------------------------------------------
// Types
// ----------------------------------------------------------------------------

typedef uint8_t JSPropFlags;   /** JS_PROP_* flags */
typedef int32_t HostRefId;     /** Host callback reference ID */
typedef uint8_t SetPropFlags;  /** Property flags for set/define operations */

/**
 * SetPropFlags bit layout:
 * Bit 0: CONFIGURABLE (0b00001) - matches JS_PROP_CONFIGURABLE
 * Bit 1: WRITABLE     (0b00010) - matches JS_PROP_WRITABLE
 * Bit 2: ENUMERABLE   (0b00100) - matches JS_PROP_ENUMERABLE
 * Bit 3: DEFINE       (0b01000) - force define behavior
 * Bit 4: THROW        (0b10000) - maps to JS_PROP_THROW (bit 14)
 *
 * Behavior:
 * - If DEFINE bit is set OR any of W/C/E are set -> use JS_DefinePropertyValue
 * - If all bits are 0 -> use JS_SetProperty (assignment semantics)
 * - If THROW bit is set -> add JS_PROP_THROW to QuickJS flags (throw on failure)
 */
#define QTS_SET_CONFIGURABLE  (1 << 0)  // == JS_PROP_CONFIGURABLE
#define QTS_SET_WRITABLE      (1 << 1)  // == JS_PROP_WRITABLE
#define QTS_SET_ENUMERABLE    (1 << 2)  // == JS_PROP_ENUMERABLE
#define QTS_SET_DEFINE        (1 << 3)  // Force define behavior
#define QTS_SET_THROW         (1 << 4)  // Throw on failure (maps to JS_PROP_THROW)

/** Check if we should use define vs set semantics */
#define QTS_SHOULD_DEFINE(flags) ((flags) & (QTS_SET_DEFINE | 0x07))

/**
 * Convert SetPropFlags to JS_PROP_* flags for QuickJS API.
 * Lower 3 bits pass through, bit 4 maps to JS_PROP_THROW (bit 14).
 */
#define QTS_TO_JS_PROP_FLAGS(flags) \
    (((flags) & 0x07) | (((flags) & QTS_SET_THROW) ? JS_PROP_THROW : 0))

/**
 * Create an atom from a string with optional length.
 * If maybe_len > 0, uses JS_NewAtomLen with that length.
 * If maybe_len == 0, uses JS_NewAtom (null-terminated string).
 */
#define QTS_NewAtomMaybeLen(ctx, str, maybe_len) \
    ((maybe_len) > 0 ? JS_NewAtomLen((ctx), (str), (maybe_len)) : JS_NewAtom((ctx), (str)))

typedef uint8_t JSValueSlot;   /** Slot (index) of a JSValue in a command environment */
typedef uint8_t FuncListSlot;  /** Slot (index) of a FuncList in a command environment */
typedef uint8_t AnySlot;       /** Slot index in any register bank */
typedef uint8_t SlotType;      /** Register bank selector for AnySlot */
typedef uint8_t EvalFlags;     /** JS_EVAL_* flags for evaluation */
typedef uint8_t NewErrorFlags; /** Flags for NEW_ERROR op (error type selection) */
typedef uint8_t NewTypedArrayFlags; /** JSTypedArrayEnum - TypedArray type (maps to JSTypedArrayEnum) */

enum {
  QTS_SLOT_TYPE_JSVALUE = 0,
  QTS_SLOT_TYPE_FUNCLIST = 1,
};

// ----------------------------------------------------------------------------
// Debug
// ----------------------------------------------------------------------------

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

#define _QTS_DEBUG_STRINGIFY1(x) #x
#define _QTS_DEBUG_STRINGIFY(x) _QTS_DEBUG_STRINGIFY1(x)
#define QTS_DEBUG_STACKFRAME __FILE__ ":" _QTS_DEBUG_STRINGIFY(__LINE__)

/**
 * Log a message to stderr with the quickjs-emscripten prefix.
 */
void qts_log(char *msg);

/**
 * Dump a JSValue to stderr (converts to string first).
 */
void qts_dump(JSContext *ctx, JSValueConst value);

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

// ----------------------------------------------------------------------------
// Property set/define helpers
// ----------------------------------------------------------------------------

/**
 * Set or define a property by atom, depending on flags.
 * If QTS_SHOULD_DEFINE(flags), uses JS_DefinePropertyValue (define semantics).
 * Otherwise, uses JS_SetProperty (assignment semantics).
 *
 * IMPORTANT: This function CONSUMES the value (takes ownership).
 * Do NOT call JS_FreeValue on value after calling this function.
 *
 * @param ctx JSContext
 * @param target Target object
 * @param atom Property atom (caller must free)
 * @param value Value to set (consumed)
 * @param flags SetPropFlags controlling behavior
 * @return 0 on success, -1 on exception
 */
int qts_set_or_define_prop_atom(JSContext *ctx, JSValue target, JSAtom atom, JSValue value, SetPropFlags flags);

/**
 * Set or define a property by uint32 index, depending on flags.
 * If QTS_SHOULD_DEFINE(flags), uses JS_DefinePropertyValueUint32 (define semantics).
 * Otherwise, uses JS_SetPropertyUint32 (assignment semantics).
 *
 * IMPORTANT: This function CONSUMES the value (takes ownership).
 * Do NOT call JS_FreeValue on value after calling this function.
 *
 * @param ctx JSContext
 * @param target Target object
 * @param index Property index
 * @param value Value to set (consumed)
 * @param flags SetPropFlags controlling behavior
 * @return 0 on success, -1 on exception
 */
int qts_set_or_define_prop_uint32(JSContext *ctx, JSValue target, uint32_t index, JSValue value, SetPropFlags flags);

#endif // QTS_UTILS_H
