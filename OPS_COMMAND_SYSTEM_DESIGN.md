# Opcode Commands

Date: 2026-02-21

Status: draft, nothing is set in stone! We should update the design if there's a better way!

Intent: apply the application's intent to QuickJS with maximum perforamnce and minimum user-facing complexity.

Calling between JavaScript and WASM imposes a FFI overhead. To minimize impact of the call overhead, quickjs-emscripten can batch multiple operations together into a single FFI call using command buffers. This document describes the design of the command buffer system.

Note that the specifics of the command system are considered internal. There is no cross-version compatibility guarantees for the command system - commands and opcodes produced by one version of quickjs-emscripten may not be compatible with execution by another version.

## Overall flow

1. Application-level JavaScript code uses `CommandBuilder` api to construct a high-level list of commands and passes it to the CommandExecutor.
2. CommandExecutor decides how to execute the commands within allocated resource constraints and without memory leaks.
3. In a loop, CommandExecutor writes batches of commands to a command buffer in WASM memory, then calls `QTS_ExecuteCommands` to execute the commands.
   - If an error occurs, the loop halts, and CommandExecutor cleans up any intermediate allocations.
4. CommandExecutor extracts results requested by the application from WASM memory and returns them to the caller. Any other made during command execution are cleaned up.

Currently, the command buffer and the primary storage for arguments are fixed-size static arrays in WASM memory, although it is possible to use a dynamically allocated buffers for any call to `QTS_ExecuteCommands`.

## Commands

Commands are fixed 16 byte structs. The first byte is always the opcode. The next 3 bytes can be used to identify [slots](#slots) the command operates on, although the exact meaning of the slots is opcode-dependent. The remaining 12 bytes are used to additional data to the command.

```c
// Last updated 2026-02-21
// see c/command.h for the latest layout
typedef struct QTS_Command {
    uint8_t opcode;
    uint8_t slot_a;
    uint8_t slot_b;
    uint8_t slot_c;
    union {
        struct { uint32_t d1, d2, d3; } raw;
        struct { double value; uint32_t extra; } f64;
        struct { int64_t value; uint32_t extra; } i64;
        struct { char *ptr; uint32_t len; uint32_t extra; } buf;
        struct {
            uint8_t byte00, byte01, byte02, byte03;
            uint8_t byte04, byte05, byte06, byte07;
            uint8_t byte08, byte09, byte10, byte11;
        } bytes;
        struct { JSValue *ptr; uint32_t len; uint32_t extra; } jsvalues;
    } data;
} QTS_Command;
```

## Slots

The command buffer system uses pre-allocated "register bank" arrays of different types of values to store the command parameters. A `slot` is an index into one of these arrays. Commands may read or update value in a slot, or produce a new value and store it in a slot. This allows the results of an earlier command to be used as input to a later command without the value needing to travel from WASM -> JS -> WASM:

```c
// command pseudocode
jsvalue_slots[0] = NEW_OBJECT();
SET_STR_INT32(jsvalue_slots[0], "name", 123);
slots[1] = NEW_ARRAY();
SET_IDX_VALUE(jsvalue_slots[1], 0, jsvalue_slots[0]);
FREE_SLOT(jsvalue_slots[0]);
```

After executing the batch, JavaScript code can read `slots[1]` directly from WASM memory to retrieve the result JSValue.

Slot types:

```c
#define QTS_SLOT_COUNT 256 // uint8_t addressable
static JSValue command_jsvalue_slots[QTS_SLOT_COUNT];
static QTS_FuncList command_funclist_slots[QTS_SLOT_COUNT];
```

- `JSValueSlot`: stores `JSValue` structs. This is the most common slot type as most apis take or return `JSValue`s.
- `FuncListSlot`: stores `QTS_FuncList` structs. QuickJS uses `JSCFunctionListEntry` arrays to define methods and properties when creating classes. They can also be used to assign multiple properties to an object.
- `OutSlot`: (not yet implemented) stores generic `uint32_t` values. We plan to use this slot type to return additional values from commands. Since WASM pointers are 32-bit, any pointer can be stored in an `OutSlot` to return string or binary data pointers.

## Interface Definition Language

The source of truth for the command and register bank types is specified in [`scripts/idl.ts`](./scripts/idl.ts). This file is used to generate C and TypeScript code for passing commands across the FFI boundary. Because we have no cross-version compatibility concerns, it's okay to add ops anywhere in the IDL file, rename ops, remove ops, etc as needed with no restrictions.

```typescript
// Last updated 2026-02-21, see scripts/idl.ts for the latest definition
/**
 * Interface definition language for a command type in our command buffer
 * protocol.
 *
 * All commands are exactly 16 bytes long.
 * Assumes wasm32 (32-bit pointers).
 */
export type CommandDef = {
  doc: string
  /** True for hard barriers; scheduler must not reorder across these commands. */
  barrier?: boolean

  /** byte 0: uint8_t opcode (implicit) */
  opcode?: never
  /** byte 1: typically result slot or object slot */
  slot_a?: ParamDef<UInt8Types>
  /** byte 2: typically source/value slot, or flags */
  slot_b?: ParamDef<UInt8Types>
  /** byte 3: additional slot, or small value */
  slot_c?: ParamDef<UInt8Types>
  /** byte 4-15: 12 bytes of data */
  data?: CommandDataDef
}
```

- IDL -> TypeScrint: [`packages/quickjs-emscripten-core/src/ops.ts`](./packages/quickjs-emscripten-core/src/ops.ts)
  - `pnpm run ops:ts`
- IDL -> C: [`c/op.h`](./c/op.h), command handler implementations in [`c/perform_*`](./c/perform_op.h)
  - `pnpm run ops:c`

### Parameters

The parameters a command carries are defined with the `ParamDef` type. Besides specifying the C type (which drives encoder/decoder codegen), parameters also specify their semantics for reference counting/memory management using the `ParamUsage` type. The command executor must take this information into account when planning command exectution: it must manage/free newly created values that are not returned to the caller.

```typescript
// Last updated 2026-02-21, see scripts/idl.ts for the latest definition
/**
 * Whether the parameter is an input, output, or both.
 * Eg, if the parameter is a pointer or slot:
 * - use 'in' if the command reads from the pointer or slot
 * - use 'in-consumed' if the command implicitly consumes/frees the parameter.
 *   The command executor must take this into account: consumed parameters
 *   cannot be used again, and should not be double-freed.
 * - use 'out' if the command writes a new value to the pointer/slot.
 *   The command executor must take this into account: any new values that are
 *   not returned to the caller must be freed.
 */
export type ParamUsage = "in" | "in-consumed" | "out"

/** Describes a scalar parameter in a command. */
export type ParamDef<T extends string = string> = {
  /** Parameter name. */
  name: string
  /** Parameter c type. */
  type: T
  /** Documenatation. */
  doc: string
  /** See {@link ParamUsage}. */
  usage: ParamUsage
} & (T extends ArrayPointerTypes ? { pointer: ArrayPointerDef } : { pointer?: never })
```

### C Types

Commands should use descriptive type aliases for their parameters. Mapping between C types and TypeScript types uses a few rename rules. Types are not code-generated, they must be written by hand in both C and TypeScript.

- C types: [`c/qts_utils.h`](./c/qts_utils.h)
- TypeScript types: [`packages/quickjs-ffi-types/src/ffi-types.ts`](./packages/quickjs-ffi-types/src/ffi-types.ts)

#### Generic type alias

```typescript
type HostRefId = Brand<number, "HostRefId">
```

```c
typedef uint32_t HostRefId;
```

#### Pointer types

```typescript
// Pointer to existing quickjs c type
export type JSValuePointer = Pointer<"JSValue">
export type JSCFunctionTypePointer = Pointer<"JSCFunctionType">
```

We don't need to typedef an extra indirection type in c, just use the existing type directly.

```c
void uses_pointers(
  JSValue *jsvalue_ptr,
  JSCFunctionType *cfunc_ptr
);
```

#### Flags/Enums

```typescript
// 1. Define a branded type
export type JSPropFlags = Brand<number, "JSPropFlags">

// 2. Export a constants object for the flags
export const SetPropFlags = {
  /** Property is configurable (can be deleted, attributes can change) */
  CONFIGURABLE: 0b00001 as SetPropFlags,
  /** Property is writable */
  WRITABLE: 0b00010 as SetPropFlags,
  /** Property is enumerable (shows up in for..in) */
  ENUMERABLE: 0b00100 as SetPropFlags,
  /** Force define behavior even without other flags */
  DEFINE: 0b01000 as SetPropFlags,
  /** Throw on failure instead of returning false */
  THROW: 0b10000 as SetPropFlags,
} as const
```

```c
// non-int type alias: use scalar + defines
typedef uint8_t JSPropFlags;
#define QTS_SET_CONFIGURABLE  (1 << 0)
#define QTS_SET_WRITABLE      (1 << 1)
#define QTS_SET_ENUMERABLE    (1 << 2)
#define QTS_SET_DEFINE        (1 << 3)
#define QTS_SET_THROW         (1 << 4)

// int type alias: use C enum
typedef enum XXX {
  // ...
} XXXEnum;
```

## TypeScript interface

Goals:

- Usable high-level API similar to existing `QuickJSContext` API.
  - E.g. `context.setProp(objHandle, "name", 123)` -> `commands.setProp(objHandle, "name", 123)`
- Caller is unaware of specifics of command system like slots, conversion from JS->C, etc.
- Caller doesn't need to explicitly free intermediate values. This diverges from the existing QuickJSContext API, where the caller is responsible for managing intermediate values.
- Optimal happy-path performance: pre-allocate and/or re-use buffers, avoid GC pressure, minimize FFI calls.

```typescript
// QuickJSContext requires dispose
function createGreeterLegacy(context: QuickJSContext) {
  const func = context.newFunction(() => context.newString("hello"))
  const obj = context.newObject()
  context.setProp(obj, "greeting", func)
  func.dispose() // required or func will leak
  return obj
}

// Command API should auto-free intermediate values
// NOTE: example; specifics not implemented yet
function createGreeterCommand(context: QuickJSContext) {
  const commands = context.prepare()
  // No allocation occurs here; `funcRef` is an integer ref id
  const funcRef = commands.newFunction(() => context.newString("hello"))
  const objRef = commands.newObject()
  comamnds.set(objRef, "greeting", funcRef)
  // Hypothetical api; there may be a better way to do this
  // funcRef disposed during commands.execute()
  const { obj } = commands.execute({ returning: { obj: objRef } })
  return obj
}
```

### CommandBuilder

CommandBuilder is the core public API for the command system. sits between application-level logic and the command executor. It's responsible for turning the applications intentions into a high-level list of commands that use [CommandRef](#commandref) logical reference IDs (not slots) to identify parameters.

- A list of commands to execute
- Bindings between JavaScript input parameters and logical reference IDs used in command executor.
  - By default, input parameters are considered "borrowed" from the caller and should not be freed by command executor.

### CommandRef

Refs are a TypeScript-only concept used in command builder & execution. The command executor plans out how to lower them to concrete slots that are passed to c.

Refs are represented as a uint32_t who's high 8 bits are the slot type and the low 24 bits are the id. Using a number avoids GC pressure on the hot path. The interface must take care to never confuse a user's input `number` with a CommandRef: we cannot allow a union of `JSValueRef | number | ...`.

```typescript
// Last updated 2026-02-21, see packages/quickjs-emscripten-core/src/command-types.ts for the latest definition
export function CommandRef<S extends SlotType>(type: S, id: number): SlotToRef[S] {
  if (!isUint24(id)) {
    throw new RangeError(`ref id out not represnetable as a 24-bit unsigned integer: ${id}`)
  }
  return ((type << REF_TYPE_SHIFT) | id) as SlotToRef[S]
}
```

### CommandExecutor

CommandExecutor is an internal class that plans out how to execute a list of commands within allocated resource constraints and without memory leaks. All public interfaces that use command execution internally call down to CommandExecutor. It's responsible for:

- Lowering JavaScript input values into WASM memory, retrieving JavaScript values from WASM memory.
- Selecting concrete slots for the CommandRefs used in each command, and arranging for those slots to contain the ref's value.
- Spilling and restoring slots to/from WASM memory under register pressure.
- Writing batches of commands to WASM memory and calling `QTS_ExecuteCommands` to execute them.
- Cleaning up intermediate values that are not returned to the caller.
- Error handling and reporting.

CommandExecutor must be optimized around two very different cases:

- Executing many small/trivial command lists; batches that fit comfortably within already-available memory and parameter slots.
- Executing very large command lists that need to be broken up across multiple batches; batches with slot pressure that require spilling and restoring to/from WASM memory; large inputs (borrowed) or outputs (ownership returned to caller) that require allocation.

Implementation guidelines:

- No trivial TS allocations like function literals, array literals, objects, `new ...` etc unless they are amortized for re-use across execution or required for the public interface.
- Executor internals juggle many different `number` values representing different concepts. As such, strive to use descriptive type aliases as much as possible.
- Use assertions judiciously. Not too few, not too many.
- Use abstract interface types rather than depending on WASM or Emscripten module types directly:
  - use [`type Memory`](./packages/quickjs-emscripten-core/src/internal/memory-region.ts) instead of `Module.HEAPU8` or `Module.HEAP32`.
  - Avoid reaching deeply into internals of QuickJSContext, QuickJSRuntime, or using QuickJSFFI. Instead introduce semantic interface types for these concepts as needed.

#### Arena allocation

CommandExecutor uses a growable arena of WASM memory [ByteRegionAllocator](./packages/quickjs-emscripten-core/src/internal/ByteRegionAllocator.ts) to transfer data like strings or binary arrays between JavaScript and WASM.

The executor computes the memory requirements for the command list and grows the arena if necessary. Note the arena does not need to fit all parameters mentioned in the command list - many parameters will be passed in pre-allocated slots, and if the command list is split into multiple batches, the arena only needs to fit the needs of the largest batch.

Arena memory is owned by the CommandExecutor and must not be shared with the caller, as it will be re-used for subsequent command list executions.

#### Slot selection

Slot selection is roughly equivalent to a compiler's register allocation pass. Slots containing values that are not needed by later commands or the caller may be overridden with new values after the old value is freed.

- Data may be _loaded_ from arbitrary WASM memory (eg in the arena or from a pointer provided by the caller) into a slot using the `SLOT_LOAD` command.
- Data may be _stored_ from a slot to an arbitrary WASM memory location using the `SLOT_STORE` command.

Together the `SLOT_LOAD` and `SLOT_STORE` commands allow the command executor to "spill" register values to memory, just like a compiler's register allocator spills to the stack.

##### QuickJSHandle -> Slot

`QuickJSHandle` is a TypeScript type that wraps `JSValue*` C pointer to a QuickJS `JSValue` struct. Often the handle object owns this 16-byte allocation and will free it when the handle is disposed.

There are two pathways to place a handle's JSValue into a slot. QuickJSHandle wraps a C pointer to a QuickJS JSValue.

- Copy the JSValue at the pointer address to the memory address of the slot from JS, by touching WASM memory directly.
- Use the `SLOT_LOAD` command with the pointer address as the input parameter, and the slot as the output parameter; the copy occurs in c when the command is executed.

It's unclear which approach is better.

##### Slot -> QuickJSHandle

To return a JSValueRef describing a new JSValue produced by a command to the caller:

1. Before execution: allocate 16 bytes of WASM memory to hold the JSValue struct in a new allocation that can be moved to the caller.
2. During execution: store the JSValue struct from the slot to that memory location using the `SLOT_STORE` command.
3. After execution success: wrap the pointer in a new `QuickJSHandle` object and return it to the caller.

##### Other slot types

The approaches for JSValue generalizes to other slot types whos values escape to the heap.

Future extension: introduce a register bank for uint32_t values usable for holding pointers. This would allow c to allocate and return arbitrary memory whos ownership moves to the caller.

```c
// command pseudocode
jsvalue_slots[0] = NEW_OBJECT();

{
  uint32_slots[0] = MEM_MALLOC(16);
  // or
  uint32_slots[0] = SLOT_MALLOC(SLOT_TYPE_JSVALUE);
}

{
  MEM_COPY(uint32_slots[0], &jsvalue_slots[0], 16);
  // or
  SLOT_STORE_DEREF(uint32_slots[0], jsvalue_slots[0], SLOT_TYPE_JSVALUE);
}

// or single command?
unt32_slots[0] = SLOT_STORE_MALLOC(jsvalue_slots[0], SLOT_TYPE_JSVALUE);
```

```typescript
// executor pseudocode
const ptr = this.slots[SlotType.Uint32SlotType].readUint32(0)
return context.newHeapValueHandle(ptr)
```

#### Execution planning / compilation

Planning execution for a command list is _kind of_ like compiling a program: register selection, encoding to machine code, refcounting... But, this compiler needs to be exceedingly fast and simple.

TODO: what, if any, parts of the executor should be code-generated? Ideas: codegen information about different slot register banks. We already codegen accessors `forEachReadRef(command, visit)` and `forEachWriteRef(command, visit)` that allow the executor to reason about parameter refs.

TODO: plan representation. How to add executor-planned commands to the user-provided command list? What kinds of extra commands are needed? Ideally we perform no allocation (amortized). Consider typed arrays that are zero'd before re-use. Potentially code-gen aspects of the representation that need to be packed into typed arrays.

TODO: refcounting / cleanup algorithm. When/how to insert `SLOT_FREE` commands? How to clean up on error? Note: it's okay to allocate on the error handling sad path if that simplifies logic. From prototyping, it seems using an "undo log" approach for error handling leads to confusing/unmaintainable logic.
