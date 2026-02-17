# Command Buffer Operations - Semantic Design

This document lists all operations needed for the command buffer, organized by use case.
Focus is on **semantics** (what inputs, what outputs), not encoding/layout.

## Conventions

- `str` = pointer + length (not necessarily null-terminated)
- `jsval` = JSValue* (pointer to a JSValue somewhere in WASM memory)
- `-> result` = operation produces a JSValue that caller may want to read
- `-> void` = operation has no meaningful return value for caller
- `slot` = when we say "store result in slot N", that's an implementation detail

---

# 1. structuredClone Operations

For `handle = context.structuredCloneIn(hostJsValue)`, we need to serialize
any JS value from the host into QuickJS. Types supported by structuredClone:

## 1.1 Primitives (inline in property set ops, no separate create needed)

These are values, not operations. They appear as the "value" argument in SET_* ops:
- null
- undefined
- boolean (true/false)
- int32
- float64
- bigint (i64 or arbitrary precision?)
- string (ptr + len)

## 1.2 Container Creation

```
CREATE_OBJECT() -> result              // JS_NewObject
CREATE_OBJECT_PROTO(proto: jsval) -> result  // JS_NewObjectProto
CREATE_ARRAY() -> result               // JS_NewArray
```

**Map, Set via CALL_CONSTRUCT** (no QuickJS built-in):
```
GET_GLOBAL() -> g
GET_PROP_STR(g, "Map") -> MapCtor
CALL_CONSTRUCT(MapCtor, argc=0, argv=[]) -> map
```

## 1.3 Special Type Creation

```
CREATE_DATE(timestamp: f64) -> result  // JS_NewDate

CREATE_ERROR(
    type: enum,     // Error, RangeError, TypeError, SyntaxError, ReferenceError, InternalError
    message: str
) -> result
    // Maps to JS_NewError (type=Error) or JS_New*Error (quickjs-ng)
    // For bellard/quickjs with specific error types, falls back to CALL_CONSTRUCT

CREATE_ARRAYBUFFER(data: ptr, len: u32) -> result  // JS_NewArrayBufferCopy

CREATE_TYPED_ARRAY(
    buffer: jsval,      // ArrayBuffer
    type: enum,         // Int8, Uint8, Uint8Clamped, Int16, Uint16, Int32, Uint32,
                        // Float32, Float64, BigInt64, BigUint64
    byteOffset: u32,
    length: u32
) -> result             // JS_NewTypedArray

CREATE_SYMBOL(description: str, is_global: bool) -> result
    // JS_NewSymbol (quickjs-ng) or CALL_CONSTRUCT (bellard/quickjs)

CREATE_PROMISE() -> (promise: jsval, resolve: jsval, reject: jsval)
    // JS_NewPromiseCapability - returns 3 values
```

**RegExp, DataView via CALL_CONSTRUCT** (no QuickJS built-in):
```
GET_GLOBAL() -> g
GET_PROP_STR(g, "RegExp") -> RegExpCtor
CREATE_STRING(pattern) -> s0
CREATE_STRING(flags) -> s1
CALL_CONSTRUCT(RegExpCtor, argc=2, argv=[s0, s1]) -> regexp
```

## 1.4 Property Set by String Key

```
SET_PROP_STR(obj: jsval, name: str, value: jsval) -> void
SET_PROP_STR_NULL(obj: jsval, name: str) -> void
SET_PROP_STR_UNDEFINED(obj: jsval, name: str) -> void
SET_PROP_STR_BOOL(obj: jsval, name: str, value: bool) -> void
SET_PROP_STR_INT32(obj: jsval, name: str, value: i32) -> void
SET_PROP_STR_FLOAT64(obj: jsval, name: str, value: f64) -> void
SET_PROP_STR_BIGINT(obj: jsval, name: str, value: i64) -> void
SET_PROP_STR_STRING(obj: jsval, name: str, value: str) -> void
```

## 1.5 Property Set by Index

```
SET_PROP_IDX(arr: jsval, index: u32, value: jsval) -> void
SET_PROP_IDX_NULL(arr: jsval, index: u32) -> void
SET_PROP_IDX_UNDEFINED(arr: jsval, index: u32) -> void
SET_PROP_IDX_BOOL(arr: jsval, index: u32, value: bool) -> void
SET_PROP_IDX_INT32(arr: jsval, index: u32, value: i32) -> void
SET_PROP_IDX_FLOAT64(arr: jsval, index: u32, value: f64) -> void
SET_PROP_IDX_BIGINT(arr: jsval, index: u32, value: i64) -> void
SET_PROP_IDX_STRING(arr: jsval, index: u32, value: str) -> void
```

## 1.6 Map Operations

```
MAP_SET(map: jsval, key: jsval, value: jsval) -> void

// Common case: string keys
MAP_SET_STR_KEY(map: jsval, key: str, value: jsval) -> void

// For primitive values with string keys (very common in structuredClone):
MAP_SET_STR_NULL(map: jsval, key: str) -> void
MAP_SET_STR_BOOL(map: jsval, key: str, value: bool) -> void
MAP_SET_STR_INT32(map: jsval, key: str, value: i32) -> void
MAP_SET_STR_FLOAT64(map: jsval, key: str, value: f64) -> void
MAP_SET_STR_STRING(map: jsval, key: str, value: str) -> void
```

## 1.7 Set Operations

```
SET_ADD(set: jsval, value: jsval) -> void

// For primitive values:
SET_ADD_NULL(set: jsval) -> void
SET_ADD_BOOL(set: jsval, value: bool) -> void
SET_ADD_INT32(set: jsval, value: i32) -> void
SET_ADD_FLOAT64(set: jsval, value: f64) -> void
SET_ADD_STRING(set: jsval, value: str) -> void
```

## 1.8 Circular Reference Support

When structuredClone encounters an object it has already serialized,
it needs to reference the previously-created jsval:

```
// No special op needed - just use the jsval* of the previously created object
// The serializer tracks: Map<hostObject, jsval*>
```

---

# 2. JSCFunctionListEntry Operations

For building `JSCFunctionListEntry` arrays to pass to `JS_SetPropertyFunctionList()`.
This is the efficient way to bulk-define properties on objects (modules, classes, prototypes).

## 2.1 Lifecycle

```
FUNCLIST_NEW(count: u32) -> funclist_ptr
    // Allocate array of JSCFunctionListEntry with `count` entries
    // Returns pointer to the array (not a JSValue)

FUNCLIST_APPLY(obj: jsval, funclist: ptr, count: u32) -> void
    // JS_SetPropertyFunctionList(ctx, obj, funclist, count)
    // Defines all properties in the list on the object

FUNCLIST_FREE(funclist: ptr) -> void
    // Free the allocated array
```

## 2.2 Entry Setters - Functions

```
FUNCLIST_CFUNC(
    funclist: ptr,
    index: u32,
    name: str,
    length: u8,         // function.length
    host_ref_id: i32,   // HostRefId for the callback
    flags: u8           // JS_PROP_* flags
) -> void
    // Sets funclist[index] to JS_DEF_CFUNC entry

FUNCLIST_CFUNC_CONSTRUCTOR(
    funclist: ptr,
    index: u32,
    name: str,
    length: u8,
    host_ref_id: i32,
    flags: u8
) -> void
    // Sets funclist[index] to JS_DEF_CFUNC with constructor proto

FUNCLIST_CGETSET(
    funclist: ptr,
    index: u32,
    name: str,
    getter_ref: i32,    // HostRefId for getter (0 = no getter)
    setter_ref: i32,    // HostRefId for setter (0 = no setter)
    flags: u8
) -> void
    // Sets funclist[index] to JS_DEF_CGETSET entry

FUNCLIST_CGETSET_MAGIC(
    funclist: ptr,
    index: u32,
    name: str,
    getter_ref: i32,
    setter_ref: i32,
    magic: i16,
    flags: u8
) -> void
    // Sets funclist[index] to JS_DEF_CGETSET_MAGIC entry
```

## 2.3 Entry Setters - Property Values

```
FUNCLIST_PROP_STRING(funclist: ptr, index: u32, name: str, value: str, flags: u8) -> void
FUNCLIST_PROP_INT32(funclist: ptr, index: u32, name: str, value: i32, flags: u8) -> void
FUNCLIST_PROP_INT64(funclist: ptr, index: u32, name: str, value: i64, flags: u8) -> void
FUNCLIST_PROP_DOUBLE(funclist: ptr, index: u32, name: str, value: f64, flags: u8) -> void
FUNCLIST_PROP_UNDEFINED(funclist: ptr, index: u32, name: str, flags: u8) -> void
```

## 2.4 Entry Setters - Other

```
FUNCLIST_ALIAS(funclist: ptr, index: u32, name: str, from: str, flags: u8) -> void
    // JS_DEF_ALIAS - alias `name` to existing property `from`

FUNCLIST_OBJECT(funclist: ptr, index: u32, name: str, nested_list: ptr, nested_count: u32, flags: u8) -> void
    // JS_DEF_OBJECT - nested object with its own property list
```

## 2.5 Notes

- `funclist_ptr` is NOT a JSValue - it's a raw pointer to `JSCFunctionListEntry[]`
- Strings in entries must remain valid until after `FUNCLIST_APPLY` is called
- After `FUNCLIST_APPLY`, the array can be freed with `FUNCLIST_FREE`
- For one-off property definitions, use the simpler `SET_PROP_*` ops instead

---

# 3. interface.c Surface Area Operations

Mapping current QTS_* functions to command buffer ops.

## 3.1 Value Creation

```
// Already covered above:
// CREATE_OBJECT, CREATE_ARRAY, CREATE_ARRAYBUFFER, CREATE_ERROR

CREATE_OBJECT_PROTO(proto: jsval) -> result

CREATE_FLOAT64(value: f64) -> result
    // Note: Usually inlined in SET_*, but sometimes need standalone

CREATE_STRING(value: str) -> result
    // Note: Usually inlined in SET_*, but sometimes need standalone

CREATE_BIGINT(value: i64) -> result
    // Or: CREATE_BIGINT_STR(value: str) for arbitrary precision

CREATE_SYMBOL(description: str, is_global: bool) -> result

CREATE_FUNCTION(
    name: str,
    host_ref_id: i32,
    length: u8,
    is_constructor: bool
) -> result

CREATE_PROMISE() -> result
    // Returns promise; resolve/reject functions stored separately?
    // Or: CREATE_PROMISE() -> (promise, resolve, reject) - 3 results
```

## 3.2 Value Access (Getters)

These produce results that the caller wants to read.

```
GET_GLOBAL() -> result                          // JS_GetGlobalObject
GET_PROP(obj: jsval, key: jsval) -> result      // JS_GetProperty
GET_PROP_STR(obj: jsval, name: str) -> result   // JS_GetPropertyStr
GET_PROP_IDX(obj: jsval, index: u32) -> result  // JS_GetPropertyUint32
```

**Too specific for command buffer (keep as FFI calls):**
- `GET_LENGTH` → just use `GET_PROP_STR(obj, "length")`
- `GET_OWN_PROPERTY_NAMES` → niche, returns array of property names
- `GET_TYPEOF` → niche, or JS reads tag directly
- `GET_PROMISE_STATE` → niche promise introspection
- `GET_PROMISE_RESULT` → niche promise introspection
- `GET_MODULE_NAMESPACE` → ES module loading only
- `IS_GLOBAL_SYMBOL` → very niche
- `IS_EQUAL` → comparison semantics, maybe keep as FFI

## 3.3 Value Extraction (to host)

These extract primitive values from JSValue to host memory.
Not command buffer ops per se - JS reads directly from JSValue memory.

```
// JS can read these directly from JSValue bytes:
// - int32 (tag=0, read u.int32)
// - bool (tag=1, read u.int32)
// - float64 (tag=8, read u.float64)
// - null (tag=2)
// - undefined (tag=3)

// These need FFI calls to extract:
EXTRACT_STRING(value: jsval) -> (ptr, len)
    // Returns pointer to string data + length
    // Caller must not free; valid until value is freed

EXTRACT_ARRAYBUFFER(value: jsval) -> (ptr, len)
    // Returns pointer to ArrayBuffer data + length

EXTRACT_SYMBOL_DESCRIPTION(value: jsval) -> (ptr, len)

EXTRACT_BIGINT(value: jsval) -> i64
    // Or returns string for arbitrary precision
```

## 3.4 Property Mutation

```
// Already covered in structuredClone section:
// SET_PROP_STR, SET_PROP_IDX, etc.

// General form with jsval key:
SET_PROP(obj: jsval, key: jsval, value: jsval) -> void
```

## 3.5 Function Calls

```
CALL(
    func: jsval,
    this: jsval,
    argc: u32,
    argv: jsval[]       // Array of JSValue pointers
) -> result
    // JS_Call

CALL_CONSTRUCT(
    constructor: jsval,
    argc: u32,
    argv: jsval[]
) -> result
    // JS_CallConstructor - for `new Ctor(args)`
    // Needed for Map, Set, RegExp, DataView, and custom classes
```

## 3.6 Eval

```
EVAL(
    code: str,
    filename: str,
    flags: u32          // JS_EVAL_TYPE_*, JS_EVAL_FLAG_*
) -> result
```

## 3.7 Error Handling

```
THROW(error: jsval) -> void
    // Sets the exception state

RESOLVE_EXCEPTION() -> result
    // If current state is exception, returns the exception value
    // Otherwise returns null
```

## 3.8 Reference Counting

```
DUP(value: jsval) -> result
    // JS_DupValue - increments refcount, returns same value
    // Needed to persist values beyond command buffer lifetime

FREE(value: jsval) -> void
    // JS_FreeValue - decrements refcount
```

## 3.9 Comparison

```
IS_EQUAL(a: jsval, b: jsval, op: enum) -> result
    // op: strict_eq, same_value, same_value_zero
    // Returns bool
```

---

# 4. Complete QTS_* Function Mapping

Every QTS_* function in interface.c, mapped to command buffer ops or marked as excluded.

## 4.1 Runtime/Context Management (NOT in command buffer)

These operate on runtime/context level, not value level:

| Function | Why Excluded |
|----------|--------------|
| `QTS_NewRuntime()` | Runtime creation - one-time setup |
| `QTS_FreeRuntime(rt)` | Runtime destruction |
| `QTS_NewContext(rt, intrinsics)` | Context creation - one-time setup |
| `QTS_FreeContext(ctx)` | Context destruction |
| `QTS_RuntimeSetMemoryLimit(rt, limit)` | Runtime configuration |
| `QTS_RuntimeSetMaxStackSize(rt, stack_size)` | Runtime configuration |
| `QTS_RuntimeEnableInterruptHandler(rt)` | Runtime configuration |
| `QTS_RuntimeDisableInterruptHandler(rt)` | Runtime configuration |
| `QTS_RuntimeEnableModuleLoader(rt, use_custom_normalize)` | Runtime configuration |
| `QTS_RuntimeDisableModuleLoader(rt)` | Runtime configuration |
| `QTS_IsJobPending(rt)` | Job queue query - returns simple bool |
| `QTS_ExecutePendingJob(rt, maxJobs, lastJobContext)` | Job execution - complex async semantics |

## 4.2 Build/Debug Introspection (NOT in command buffer)

Static queries, no value operations:

| Function | Why Excluded |
|----------|--------------|
| `QTS_BuildIsDebug()` | Build-time constant |
| `QTS_BuildIsAsyncify()` | Build-time constant |
| `QTS_BuildIsSanitizeLeak()` | Build-time constant |
| `QTS_GetDebugLogEnabled(rt)` | Debug config query |
| `QTS_SetDebugLogEnabled(rt, is_enabled)` | Debug config set |
| `QTS_RecoverableLeakCheck()` | Testing utility |
| `QTS_TestStringArg(string)` | Testing utility |
| `QTS_RuntimeComputeMemoryUsage(rt, ctx)` | Introspection |
| `QTS_RuntimeDumpMemoryUsage(rt)` | Introspection |

## 4.3 Singleton Constants (NOT in command buffer)

These return pointers to static JSValues - JS can read directly:

| Function | Why Excluded |
|----------|--------------|
| `QTS_GetUndefined()` | Returns &QTS_Undefined (static) |
| `QTS_GetNull()` | Returns &QTS_Null (static) |
| `QTS_GetTrue()` | Returns &QTS_True (static) |
| `QTS_GetFalse()` | Returns &QTS_False (static) |

JS can just use the known addresses of these singletons.

## 4.4 Value Creation → Command Buffer Ops

| Function | Command Buffer Op(s) |
|----------|---------------------|
| `QTS_NewObject(ctx)` | `CREATE_OBJECT() -> jsval` |
| `QTS_NewObjectProto(ctx, proto)` | `CREATE_OBJECT_PROTO(proto: jsval) -> jsval` |
| `QTS_NewArray(ctx)` | `CREATE_ARRAY() -> jsval` |
| `QTS_NewArrayBuffer(ctx, buffer, length)` | `CREATE_ARRAYBUFFER(data: ptr, len: u32) -> jsval` |
| `QTS_NewFloat64(ctx, num)` | `CREATE_FLOAT64(value: f64) -> jsval` |
| `QTS_NewString(ctx, string)` | `CREATE_STRING(value: str) -> jsval` |
| `QTS_NewSymbol(ctx, description, isGlobal)` | `CREATE_SYMBOL(description: str, is_global: bool) -> jsval` |
| `QTS_NewError(ctx)` | `CREATE_ERROR() -> jsval` (empty Error) |
| `QTS_NewFunction(ctx, name, arg_length, is_constructor, host_ref_id)` | `CREATE_FUNCTION(name: str, host_ref_id: i32, length: u8, is_constructor: bool) -> jsval` |
| `QTS_NewPromiseCapability(ctx, resolve_funcs_out)` | `CREATE_PROMISE() -> (promise: jsval, resolve: jsval, reject: jsval)` — returns 3 values |
| `QTS_NewHostRef(ctx, id)` | `CREATE_HOST_REF(id: i32) -> jsval` — internal, wraps HostRefId |

## 4.5 Value Getters → Command Buffer Ops

| Function | Command Buffer Op(s) |
|----------|---------------------|
| `QTS_GetGlobalObject(ctx)` | `GET_GLOBAL() -> jsval` |
| `QTS_GetProp(ctx, this_val, prop_name)` | `GET_PROP(obj: jsval, key: jsval) -> jsval` |
| `QTS_GetPropNumber(ctx, this_val, prop_name)` | `GET_PROP_IDX(obj: jsval, index: u32) -> jsval` |
| `QTS_GetOwnPropertyNames(...)` | Keep as FFI call — niche, complex return |
| `QTS_GetLength(ctx, out_len, value)` | Use `GET_PROP_STR(obj, "length")` — not a dedicated op |
| `QTS_GetModuleNamespace(...)` | Keep as FFI call — ES module loading only |
| `QTS_PromiseState(ctx, promise)` | Keep as FFI call — niche |
| `QTS_PromiseResult(ctx, promise)` | Keep as FFI call — niche |

## 4.6 Value Extraction (to host memory) → Command Buffer Ops

| Function | Command Buffer Op(s) |
|----------|---------------------|
| `QTS_GetFloat64(ctx, value)` | No op needed — JS reads f64 directly from JSValue bytes |
| `QTS_GetString(ctx, value)` | `EXTRACT_STRING(value: jsval) -> (ptr, len)` — returns pointer to string data |
| `QTS_GetArrayBuffer(ctx, data)` | `EXTRACT_ARRAYBUFFER(value: jsval) -> (ptr, len)` |
| `QTS_GetArrayBufferLength(ctx, data)` | Part of `EXTRACT_ARRAYBUFFER` |
| `QTS_GetSymbolDescriptionOrKey(ctx, value)` | `EXTRACT_SYMBOL_DESCRIPTION(value: jsval) -> (ptr, len)` |
| `QTS_IsGlobalSymbol(ctx, value)` | `IS_GLOBAL_SYMBOL(value: jsval) -> bool` |
| `QTS_GetHostRefId(value)` | No op needed — JS reads HostRefId directly from JSValue bytes |
| `QTS_Typeof(ctx, value)` | `TYPEOF(value: jsval) -> jsval` (string) — or return enum |
| `QTS_Dump(ctx, obj)` | `DUMP(value: jsval) -> (ptr, len)` — JSON string |

## 4.7 Value Mutation → Command Buffer Ops

| Function | Command Buffer Op(s) |
|----------|---------------------|
| `QTS_SetProp(ctx, this_val, prop_name, prop_value)` | `SET_PROP(obj: jsval, key: jsval, value: jsval) -> void` |
| `QTS_DefineProp(ctx, this_val, prop_name, prop_value, get, set, configurable, enumerable, has_value)` | `DEFINE_PROP(obj: jsval, key: jsval, value: jsval, getter: jsval, setter: jsval, flags: u8) -> void` |

Note: `SET_PROP` variants with inline primitives (SET_PROP_STR_INT32, etc.) are optimizations that combine multiple QTS_* calls.

## 4.8 Function Calls → Command Buffer Ops

| Function | Command Buffer Op(s) |
|----------|---------------------|
| `QTS_Call(ctx, func_obj, this_obj, argc, argv_ptrs)` | `CALL(func: jsval, this: jsval, argc: u32, argv: jsval*) -> jsval` |
| `QTS_Eval(ctx, js_code, js_code_length, filename, detectModule, evalFlags)` | `EVAL(code: str, filename: str, flags: u32) -> jsval` |
| `QTS_DetectModule(input, input_len)` | Not needed — JS can do module detection |

## 4.9 Error Handling → Command Buffer Ops

| Function | Command Buffer Op(s) |
|----------|---------------------|
| `QTS_Throw(ctx, error)` | `THROW(error: jsval) -> void` |
| `QTS_ResolveException(ctx, maybe_exception)` | `RESOLVE_EXCEPTION(maybe_exception: jsval) -> jsval` — returns exception or null |

## 4.10 Reference Counting → Command Buffer Ops

| Function | Command Buffer Op(s) |
|----------|---------------------|
| `QTS_DupValuePointer(ctx, val)` | `DUP(value: jsval) -> jsval` |
| `QTS_FreeValuePointer(ctx, value)` | `FREE(value: jsval) -> void` |
| `QTS_FreeValuePointerRuntime(rt, value)` | `FREE(value: jsval) -> void` (same op, runtime variant) |
| `QTS_FreeCString(ctx, str)` | Not an op — JS manages borrowed string lifetime |
| `QTS_FreeVoidPointer(ctx, ptr)` | Not an op — internal memory management |

## 4.11 Comparison → Command Buffer Ops

| Function | Command Buffer Op(s) |
|----------|---------------------|
| `QTS_IsEqual(ctx, a, b, op)` | `IS_EQUAL(a: jsval, b: jsval, op: enum) -> bool` |

## 4.12 Serialization → Command Buffer Ops

| Function | Command Buffer Op(s) |
|----------|---------------------|
| `QTS_bjson_encode(ctx, val)` | `BJSON_ENCODE(value: jsval) -> jsval` (ArrayBuffer) |
| `QTS_bjson_decode(ctx, data)` | `BJSON_DECODE(data: jsval) -> jsval` |

## 4.13 Internal/Callback Helpers (NOT in command buffer)

| Function | Why Excluded |
|----------|--------------|
| `QTS_ArgvGetJSValueConstPointer(argv, index)` | Internal — used in C callback implementation |

---

# 5. Result Handling

## 5.1 Which ops produce results?

**Produce JSValue result (caller wants to read/use):**
- All CREATE_* ops
- All GET_* ops
- CALL
- EVAL
- DUP
- RESOLVE_EXCEPTION

**No result (side effect only):**
- All SET_PROP_* ops
- All DEF_* ops
- MAP_SET_*, SET_ADD_*
- THROW
- FREE

## 5.2 Error Handling

On failure:
- Execution stops at the failed op
- Return: (success_count: u32, error: JSValue)
- success_count = number of ops that completed successfully
- error = the exception value (if JS exception) or synthetic error

## 5.3 Result Storage

Options for where results go:
1. **Pre-allocated result array**: Results written to `JSValue results[N]` at indices specified by ops
2. **Inline in command**: Each op that produces result specifies destination slot
3. **Sequential**: Results written sequentially to result array, caller tracks which op produced which result

Recommendation: Option 1 or 2 - explicit result slot per op that needs one.

---

# 6. Summary: Complete Op Set

Grouping by category, here's the complete set that will be in the command buffer.

**Note:** Map, Set, RegExp, DataView have no QuickJS built-in functions - use CALL_CONSTRUCT.

## Container Creation (3 ops)
- OBJECT
- OBJECT_PROTO
- ARRAY

## Special Type Creation (5 ops)
- DATE (JS_NewDate)
- ERROR (JS_NewError / JS_New*Error)
- ARRAYBUFFER (JS_NewArrayBufferCopy)
- TYPED_ARRAY (JS_NewTypedArray)
- SYMBOL (JS_NewSymbol)

## Standalone Value Creation (4 ops)
- FLOAT64
- STRING
- BIGINT
- FUNCTION

## Property Set by String Key (8 ops)
- SET_STR_SLOT (jsval value)
- SET_STR_NULL
- SET_STR_UNDEF
- SET_STR_BOOL
- SET_STR_INT32
- SET_STR_F64
- SET_STR_BIGINT
- SET_STR_STRING

## Property Set by Index (8 ops)
- SET_IDX_SLOT (jsval value)
- SET_IDX_NULL
- SET_IDX_UNDEF
- SET_IDX_BOOL
- SET_IDX_INT32
- SET_IDX_F64
- SET_IDX_BIGINT
- SET_IDX_STRING

## Property Set by JSValue Key (1 op)
- SET_PROP (jsval key, jsval value)

## Map/Set Operations (3 ops)
- MAP_SET (jsval key, jsval value)
- MAP_SET_STR (str key, jsval value)
- SET_ADD (jsval value)

## Property Get (4 ops)
- GET_PROP (jsval key)
- GET_STR (str key)
- GET_IDX (u32 index)
- GET_GLOBAL

## Host Function Definition (3 ops)
- DEF_CFUNC
- DEF_CFUNC_CTOR
- DEF_CGETSET

## Property Definition with inline values (8 ops)
- DEF_PROP_SLOT (jsval value + flags)
- DEF_PROP_NULL
- DEF_PROP_UNDEF
- DEF_PROP_BOOL
- DEF_PROP_INT32
- DEF_PROP_I64
- DEF_PROP_F64
- DEF_PROP_STRING

## Full Property Definition (2 ops)
- DEFINE_VALUE (obj, name, value_slot, flags)
- DEFINE_GETSET (obj, name, getter_slot, setter_slot, flags)

## Call/Eval (3 ops)
- CALL
- CALL_CONSTRUCT
- EVAL

## Error Handling (2 ops)
- THROW
- RESOLVE_EXC

## Reference Counting (2 ops)
- DUP
- FREE

## Serialization (2 ops)
- WRITE_OBJECT (JS_WriteObject)
- READ_OBJECT (JS_ReadObject)

---

**Total: 58 ops**

Breakdown:
- 24 are primitive-value variants (NULL/UNDEF/BOOL/INT32/F64/BIGINT/STRING/I64)
- 34 are unique operations

**Ops that produce JSValue results: 19**
(OBJECT, OBJECT_PROTO, ARRAY, DATE, ERROR, ARRAYBUFFER, TYPED_ARRAY, SYMBOL, FLOAT64, STRING, BIGINT, FUNCTION, GET_*, CALL, CALL_CONSTRUCT, EVAL, DUP, RESOLVE_EXC, WRITE_OBJECT, READ_OBJECT)

**Ops that are side-effect only: 39**
(SET_STR_*, SET_IDX_*, SET_PROP, MAP_SET*, SET_ADD, DEF_*, DEFINE_*, THROW, FREE)

---

## Kept as FFI calls (not in command buffer)

These are too niche or complex for the command buffer:
- CREATE_PROMISE → 3 return values, awkward in command buffer
- GET_OWN_PROPERTY_NAMES → complex return (array of property descriptors)
- GET_PROMISE_STATE / GET_PROMISE_RESULT → niche promise introspection
- GET_MODULE_NAMESPACE → ES module loading only
- IS_GLOBAL_SYMBOL → very niche
- IS_EQUAL → comparison semantics, JS can use === for most cases
- TYPEOF → JS can read tag directly from JSValue bytes
- DUMP → debugging only
- All EXTRACT_* → read-back phase, not batch creation

---

# 7. Concrete Representation (C Structs)

## 7.1 Command Struct (16 bytes)

```c
// All commands are exactly 16 bytes
// Assumes wasm32 (32-bit pointers)
typedef struct QTS_Command {
    uint8_t opcode;       // byte 0: operation type
    uint8_t slot_a;       // byte 1: typically result slot or object slot
    uint8_t slot_b;       // byte 2: typically source/value slot, or flags
    uint8_t slot_c;       // byte 3: additional slot, or small value (bool, enum)
    union {
        // Generic u32 access
        struct {
            uint32_t d1;              // bytes 4-7
            uint32_t d2;              // bytes 8-11
            uint32_t d3;              // bytes 12-15
        } raw;

        // f64 value (CREATE_FLOAT64, CREATE_DATE, SET_*_F64)
        struct {
            double   value;           // bytes 4-11
            uint32_t extra;           // bytes 12-15
        } f64;

        // i64 value (CREATE_BIGINT, SET_*_BIGINT)
        struct {
            int64_t  value;           // bytes 4-11
            uint32_t extra;           // bytes 12-15
        } i64;

        // ptr+len buffer (CREATE_STRING, CREATE_ARRAYBUFFER)
        struct {
            char    *ptr;             // bytes 4-7 (4 bytes in wasm32)
            uint32_t len;             // bytes 8-11
            uint32_t extra;           // bytes 12-15
        } buf;

        // argv for function calls (CALL, CALL_CONSTRUCT)
        struct {
            JSValue *argv;            // bytes 4-7: pointer to array of JSValue
            uint32_t argc;            // bytes 8-11: argument count
            uint32_t extra;           // bytes 12-15
        } call;
    } data;
} QTS_Command;

_Static_assert(sizeof(void*) == 4, "QTS_Command requires wasm32 (32-bit pointers)");
_Static_assert(sizeof(QTS_Command) == 16, "QTS_Command must be 16 bytes");
```

## 7.2 Field Usage Reference

Legend:
- `name_ptr` = pointer to null-terminated string (property names, common case)
- `data.buf.ptr` + `data.buf.len` = pointer + length (string values, binary data)
- `data.call.argv` + `data.call.argc` = pointer to JSValue array + count (function calls)
- `slot_a`, `slot_b`, `slot_c` = slot indices (0-127) or small values (bool, enum, flags)

| Opcode | slot_a | slot_b | slot_c | data |
|--------|--------|--------|--------|------|
| **Container Creation** |
| OBJECT | result | - | - | - |
| OBJECT_PROTO | result | proto | - | - |
| ARRAY | result | - | - | - |
| **Special Type Creation** |
| DATE | result | - | - | `f64.value`=timestamp |
| ERROR | result | type | - | `buf.ptr`=msg, `buf.len` |
| ARRAYBUFFER | result | - | - | `buf.ptr`, `buf.len` |
| TYPED_ARRAY | result | buffer | type | `raw.d1`=byteOffset, `raw.d2`=length |
| SYMBOL | result | is_global | - | `buf.ptr`=desc, `buf.len` |
| FUNCTION | result | length | is_ctor | `buf.ptr`=name, `buf.len`, `buf.extra`=host_ref |
| **Value Creation** |
| FLOAT64 | result | - | - | `f64.value` |
| STRING | result | - | - | `buf.ptr`, `buf.len` |
| BIGINT | result | - | - | `i64.value` |
| **SET_PROP by String** |
| SET_STR_SLOT | obj | val | - | `buf.ptr`=name, `buf.len` |
| SET_STR_NULL | obj | - | - | `buf.ptr`=name, `buf.len` |
| SET_STR_UNDEF | obj | - | - | `buf.ptr`=name, `buf.len` |
| SET_STR_BOOL | obj | 0\|1 | - | `buf.ptr`=name, `buf.len` |
| SET_STR_INT32 | obj | - | - | `buf.ptr`=name, `buf.len`, `buf.extra`=value |
| SET_STR_F64 | obj | - | - | `raw.d1`=name_ptr (null-term), `f64.value` |
| SET_STR_BIGINT | obj | - | - | `raw.d1`=name_ptr (null-term), `i64.value` |
| SET_STR_STRING | obj | - | - | `buf.ptr`=val, `buf.len`, `buf.extra`=name_ptr (null-term) |
| **SET_PROP by Index** |
| SET_IDX_SLOT | obj | val | - | `raw.d1`=index |
| SET_IDX_NULL | obj | - | - | `raw.d1`=index |
| SET_IDX_UNDEF | obj | - | - | `raw.d1`=index |
| SET_IDX_BOOL | obj | 0\|1 | - | `raw.d1`=index |
| SET_IDX_INT32 | obj | - | - | `raw.d1`=index, `raw.d2`=value |
| SET_IDX_F64 | obj | - | - | `raw.d1`=index, `f64.value` (bytes 8-15) |
| SET_IDX_BIGINT | obj | - | - | `raw.d1`=index, `i64.value` (bytes 8-15) |
| SET_IDX_STRING | obj | - | - | `buf.ptr`=val, `buf.len`, `buf.extra`=index |
| **SET_PROP by Key** |
| SET_PROP | obj | key | val | - |
| **GET_PROP** |
| GET_PROP | result | obj | key | - |
| GET_STR | result | obj | - | `buf.ptr`=name, `buf.len` |
| GET_IDX | result | obj | - | `raw.d1`=index |
| GET_GLOBAL | result | - | - | - |
| **Map/Set** |
| MAP_SET | map | key | val | - |
| MAP_SET_STR | map | val | - | `buf.ptr`=key, `buf.len` |
| SET_ADD | set | val | - | - |
| **Host Function Def** |
| DEF_CFUNC | obj | length | flags | `buf.ptr`=name, `buf.len`, `buf.extra`=host_ref |
| DEF_CFUNC_CTOR | obj | length | flags | `buf.ptr`=name, `buf.len`, `buf.extra`=host_ref |
| DEF_CGETSET | obj | flags | - | `raw.d1`=name_ptr, `raw.d2`=getter_ref, `raw.d3`=setter_ref |
| **Property Def (inline)** |
| DEF_PROP_SLOT | obj | val | flags | `buf.ptr`=name, `buf.len` |
| DEF_PROP_NULL | obj | flags | - | `buf.ptr`=name, `buf.len` |
| DEF_PROP_UNDEF | obj | flags | - | `buf.ptr`=name, `buf.len` |
| DEF_PROP_BOOL | obj | flags | 0\|1 | `buf.ptr`=name, `buf.len` |
| DEF_PROP_INT32 | obj | flags | - | `buf.ptr`=name, `buf.len`, `buf.extra`=value |
| DEF_PROP_I64 | obj | flags | - | `raw.d1`=name_ptr (null-term), `i64.value` |
| DEF_PROP_F64 | obj | flags | - | `raw.d1`=name_ptr (null-term), `f64.value` |
| DEF_PROP_STRING | obj | flags | - | `buf.ptr`=val, `buf.len`, `buf.extra`=name_ptr (null-term) |
| **Full Property Def** |
| DEFINE_VALUE | obj | val | flags | `buf.ptr`=name, `buf.len` |
| DEFINE_GETSET | obj | getter | setter | `buf.ptr`=name, `buf.len`, `buf.extra`=flags |
| **Call/Eval** |
| CALL | result | func | this | `call.argv`, `call.argc` |
| CALL_CONSTRUCT | result | ctor | - | `call.argv`, `call.argc` |
| EVAL | result | - | - | `buf.ptr`=code, `buf.len`, `buf.extra`=filename_ptr\|(flags<<16) |
| **Error** |
| THROW | error | - | - | - |
| RESOLVE_EXC | result | maybe | - | - |
| **Refcount** |
| DUP | result | src | - | - |
| FREE | slot | - | - | - |
| **Serialization** |
| WRITE_OBJECT | result | val | - | `raw.d1`=flags |
| READ_OBJECT | result | data | - | `raw.d1`=flags |
| **FuncList Lifecycle** (slot holds raw ptr, not JSValue) |
| FUNCLIST_NEW | result | - | - | `raw.d1`=count |
| FUNCLIST_APPLY | obj | list | - | `raw.d1`=count |
| FUNCLIST_FREE | list | - | - | - |
| **FuncList Entry Setters** |
| FUNCLIST_CFUNC | list | len | flags | `raw.d1`=index, `raw.d2`=name_ptr, `raw.d3`=host_ref |
| FUNCLIST_CFUNC_CTOR | list | len | flags | `raw.d1`=index, `raw.d2`=name_ptr, `raw.d3`=host_ref |
| FUNCLIST_CGETSET | list | flags | - | `raw.d1`=index, `raw.d2`=name_ptr, `raw.d3`=getter\|setter (packed) |
| FUNCLIST_CGETSET_MAGIC | list | flags | magic | `raw.d1`=index, `raw.d2`=name_ptr, `raw.d3`=getter\|setter (packed) |
| FUNCLIST_PROP_STRING | list | flags | - | `raw.d1`=index, `raw.d2`=name_ptr, `raw.d3`=val_ptr |
| FUNCLIST_PROP_INT32 | list | flags | - | `raw.d1`=index, `raw.d2`=name_ptr, `raw.d3`=value |
| FUNCLIST_PROP_INT64 | list | flags | index | `raw.d1`=name_ptr, `i64.value` |
| FUNCLIST_PROP_DOUBLE | list | flags | index | `raw.d1`=name_ptr, `f64.value` |
| FUNCLIST_PROP_UNDEFINED | list | flags | - | `raw.d1`=index, `raw.d2`=name_ptr |
| FUNCLIST_ALIAS | list | flags | - | `raw.d1`=index, `raw.d2`=name_ptr, `raw.d3`=from_ptr |
| FUNCLIST_OBJECT | list | flags | - | `raw.d1`=index, `raw.d2`=name_ptr, `raw.d3`=nested_list\|count (packed) |

## 7.3 Notes on Representation

**String encoding**:

Most ops use `data.buf.ptr` + `data.buf.len` for strings, supporting arbitrary content including null bytes.

**Exceptions using null-terminated strings** (can't fit len due to f64/i64 taking 8 bytes):
- SET_STR_F64, SET_STR_BIGINT: `data.raw.d1`=name_ptr (null-term)
- DEF_PROP_F64, DEF_PROP_I64: `data.raw.d1`=name_ptr (null-term)
- DEF_CGETSET: `data.raw.d1`=name_ptr (null-term, needs getter_ref + setter_ref)
- SET_STR_STRING, DEF_PROP_STRING: `data.buf.extra`=name_ptr (null-term, value uses buf.ptr+len)

**Property name with null byte** (rare edge case): Fall back to slot-based ops:
```
CREATE_STRING(ptr, len) -> key_slot   // key with null byte
SET_PROP(obj_slot, key_slot, val_slot)
```

**f64/i64 in data union**: When an operation needs a 64-bit value, it uses `data.f64_val` or `data.i64_val` which spans d1+d2 (bytes 4-11). The d3 field (bytes 12-15) is available for other uses, or named as `f64_extra`/`i64_extra` in the union.

**Slot sentinels**: For DEFINE_GETSET, slot value 0xFF means "no getter" or "no setter".

**Argument passing (CALL/CALL_CONSTRUCT)**: Pass `data.call.argv` (pointer to contiguous JSValue array) and `data.call.argc` (count). Arguments can be in the slots array (`&slots[start]`) or anywhere else in WASM memory.

**EVAL flags encoding**: `data.d3 = filename_ptrset | (eval_flags << 16)`. Filename offset is 16 bits (max 65535), flags are 16 bits.

**FUNCLIST ops**:
- Slots hold raw `JSCFunctionListEntry*` pointers, not JSValues
- All property names use null-terminated strings (property names rarely have null bytes)
- FUNCLIST_CGETSET packs getter_ref and setter_ref into 16 bits each: `raw.d3 = (getter & 0xFFFF) | (setter << 16)`
- FUNCLIST_PROP_INT64/DOUBLE use slot_c for index (limited to 0-255) to fit i64/f64 in data
- FUNCLIST_OBJECT packs nested_list ptr and count: `raw.d3 = (list_ptr & 0xFFFF) | (count << 16)` or similar
- String values in FUNCLIST_PROP_STRING are also null-terminated (can't fit two ptr+len pairs)
