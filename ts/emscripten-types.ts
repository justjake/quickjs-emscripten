// This is a subset of the Emscripten type definitions from @types/emscripten
// Project: http://kripken.github.io/emscripten-site/index.html
// Definitions by: Kensuke Matsuzaki <https://github.com/zakki>
//                 Periklis Tsirakidis <https://github.com/periklis>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
//
// quickjs-emscripten doesn't use the full EmscriptenModule type from @types/emscripten because:
//
// - the upstream types define many properties that don't exist on our module due
//   to our build settings
// - some upstream types reference web-only ambient types like WebGL stuff, which
//   we don't use.
// - Up

import { EnabledIncomingModuleJsApis } from "./generated/emscripten-module-apis"
import {
  BorrowedHeapCharPointer,
  JSContextPointer,
  JSRuntimePointer,
  JSValueConstPointer,
  JSValuePointer,
  OwnedHeapCharPointer,
} from "./types-ffi"

declare namespace Emscripten {
  interface FileSystemType {}
  type EnvironmentType = "WEB" | "NODE" | "SHELL" | "WORKER"
  type ValueType = "number" | "string" | "array" | "boolean"
  type TypeCompatibleWithC = number | string | any[] | boolean

  type WebAssemblyImports = Array<{
    name: string
    kind: string
  }>

  type WebAssemblyExports = Array<{
    module: string
    name: string
    kind: string
  }>

  interface CCallOpts {
    async?: boolean
  }
}

/**
 * Typings for the features we use to interface with our Emscripten build of
 * QuickJS.
 *
 * TODO: consider adding more of incomingModuleJsApis.json to these types.
 * @see https://emscripten.org/docs/api_reference/module.html
 */
interface EmscriptenModule {
  // No longer needed:
  // addFunction(fn: Function, type: string): number
  // removeFunction(pointer: number): void

  /**
   * Write JS `str` to HeapChar pointer.
   * https://emscripten.org/docs/api_reference/preamble.js.html#stringToUTF8
   */
  stringToUTF8(str: string, outPtr: OwnedHeapCharPointer, maxBytesToRead?: number): void
  /**
   * HeapChar to JS string.
   * https://emscripten.org/docs/api_reference/preamble.js.html#UTF8ToString
   */
  UTF8ToString(ptr: BorrowedHeapCharPointer, maxBytesToRead?: number): string
  lengthBytesUTF8(str: string): number

  _malloc(size: number): number
  _free(ptr: number): void
  cwrap(
    ident: string,
    returnType: Emscripten.ValueType | null,
    argTypes: Emscripten.ValueType[],
    opts?: Emscripten.CCallOpts
  ): (...args: any[]) => any

  // USE_TYPED_ARRAYS == 2
  HEAP8: Int8Array
  HEAP16: Int16Array
  HEAP32: Int32Array
  HEAPU8: Uint8Array
  HEAPU16: Uint16Array
  HEAPU32: Uint32Array
  HEAPF32: Float32Array
  HEAPF64: Float64Array

  TOTAL_STACK: number
  TOTAL_MEMORY: number
  FAST_MEMORY: number
}

// This isn't the real return type of handleAsync, but it's better to treat it this way.
declare const AsyncifySleepReturnValue: unique symbol
/** @private */
export type AsyncifySleepResult<T> = T & typeof AsyncifySleepReturnValue

/**
 * Allows us to optionally suspend the Emscripten runtime to wait for a promise.
 * https://emscripten.org/docs/porting/asyncify.html#ways-to-use-async-apis-in-older-engines
 * ```
 * EM_JS(int, do_fetch, (), {
 *   return Asyncify.handleSleep(function (wakeUp) {
 *     out("waiting for a fetch");
 *     fetch("a.html").then(function (response) {
 *       out("got the fetch response");
 *       // (normally you would do something with the fetch here)
 *       wakeUp(42);
 *     });
 *   });
 * });
 * ```
 * @private
 */
export interface Asyncify {
  handleSleep<T>(maybeAsyncFn: (wakeUp: (result: T) => void) => void): AsyncifySleepResult<T>
  // Because this one requires a promise, it's going to be less efficient than
  // the callback system. Plus it seems like we'd need to use SyncPromise to
  // avoid suspending.
  // handleAsync<T>(asyncFn: () => T | Promise<T>): AsyncifySleepResult<T>
}

/**
 * @private
 */
export interface EmscriptenModuleCallbacks {
  callFunction: (
    asyncify: Asyncify | undefined,
    ctx: JSContextPointer,
    this_ptr: JSValueConstPointer,
    argc: number,
    argv: JSValueConstPointer,
    fn_id: number
  ) => JSValuePointer | AsyncifySleepResult<JSValuePointer>

  loadModuleSource: (
    asyncify: Asyncify | undefined,
    rt: JSRuntimePointer,
    ctx: JSContextPointer,
    module_name: string
  ) => BorrowedHeapCharPointer | AsyncifySleepResult<BorrowedHeapCharPointer>

  normalizeModule: (
    asyncify: Asyncify | undefined,
    rt: JSRuntimePointer,
    ctx: JSContextPointer,
    module_base_name: string,
    module_name: string
  ) => BorrowedHeapCharPointer | AsyncifySleepResult<BorrowedHeapCharPointer>

  shouldInterrupt: (
    asyncify: Asyncify | undefined,
    rt: JSRuntimePointer
  ) => 0 | 1 | AsyncifySleepResult<0 | 1>
}

export interface QuickJSEmscriptenModule extends EmscriptenModule {
  type: "sync"
  callbacks: EmscriptenModuleCallbacks
}

export interface QuickJSAsyncEmscriptenModule extends EmscriptenModule {
  /** @todo Implement this field */
  type: "async"
  callbacks: EmscriptenModuleCallbacks
}

export type EitherModule = QuickJSEmscriptenModule | QuickJSAsyncEmscriptenModule

type TODO<T> = T

/**
 * Note: each name must be present in the `incomingModuleJsApis.json` file, or
 * Emscripten will ignore it.
 *
 * https://emscripten.org/docs/api_reference/module.html#affecting-execution
 */
export interface EmscriptenModuleOptions {
  /**
   * Environment type the module should use.  Usually this is inferred
   * automatically, but can be useful to override it.
   */
  ENVIRONMENT: Emscripten.EnvironmentType
  INITIAL_MEMORY: TODO<unknown>
  /** https://emscripten.org/docs/api_reference/module.html#Module.wasmMemory */
  wasmMemory: WebAssembly.Memory
  /**
   * Return a path or URL where the given file is located. The specific behavior
   * of file loading depends on [[ENVIRONMENT]].
   */
  locateFile(
    /**
     * The basename of the file Emscripten needs to load>
     * Example: `"hello_world.wasm"`
     */
    fileName: string,
    /**
     * The dirname (ending with a /) where Emscripten inferred the module.js
     * file resides, comparable to __dirname in NodeJS.
     * Example: `"...node_modules/quickjs-emscripten/dist/generated/"`
     * https://emscripten.org/docs/api_reference/module.html
     */
    prefix: string
  ): string
  /**
   * Binary content of the WASM module to execute. Overriding this will avoid
   * Emscripten (re)loading the WASM module itself.
   *
   * https://github.com/emscripten-core/emscripten/blob/500d8267b4eb22fcc6606aa695a1a076c0f40375/src/preamble.js#L835
   */
  wasmBinary: ArrayBuffer
  /** https://emscripten.org/docs/api_reference/module.html#Module.print */
  print(str: string): void
  /** https://emscripten.org/docs/api_reference/module.html#Module.printErr */
  printErr(str: string): void
  /** https://emscripten.org/docs/api_reference/module.html#Module.preInit */
  preInit: Array<{ (): void }>
  preRun: Array<{ (): void }>
}

type Assert<T, U extends T> = U

// type _assertAllModuleOptionsHaveTypes = Assert<
//   Record<EnabledIncomingModuleJsApis, unknown>,
//   EmscriptenModuleOptions
// >

// type _assertNoExtraModuleOptions = Assert<
//   EnabledIncomingModuleJsApis,
//   keyof EmscriptenModuleOptions
// >

export interface EmscriptenModuleLoader<T extends EmscriptenModule> {
  (moduleOverrides?: Partial<EmscriptenModuleOptions>): Promise<T>
}
