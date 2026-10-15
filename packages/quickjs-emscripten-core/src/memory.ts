import type {
  EitherModule,
  OwnedHeapCharPointer,
  JSValueConstPointerPointer,
  JSVoidPointer,
} from "@jitl/quickjs-ffi-types"
import { Lifetime } from "./lifetime"
import type { QuickJSHandle } from "./types"

/**
 * @private
 */
export type HeapUint8Array = {
  pointer: JSVoidPointer
  numBytes: number
}

/**
 * Add more types as needed.
 * @private
 */
export type TypedArray = Int32Array | Uint32Array

/** @private */
export interface TypedArrayConstructor<T> {
  new (length: number): T
  new (array: ArrayLike<number> | ArrayBufferLike): T
  new (buffer: ArrayBufferLike, byteOffset?: number, length?: number): T
  BYTES_PER_ELEMENT: number
}

/**
 * A TypedArray view into WASM memory that automatically refreshes when memory grows.
 *
 * When Emscripten's WASM memory grows (due to -sALLOW_MEMORY_GROWTH), all existing
 * TypedArray views become detached because the underlying ArrayBuffer is replaced.
 * This class lazily recreates the view when the buffer changes.
 *
 * @private
 */
export class RefreshableTypedArray<T extends TypedArray> {
  private cachedArray: T | undefined
  private lastBuffer: ArrayBufferLike | undefined

  constructor(
    private readonly module: EitherModule,
    private readonly kind: TypedArrayConstructor<T>,
    private readonly ptr: number,
    private readonly length: number,
  ) {}

  get value(): T {
    const currentBuffer = this.module.HEAPU8.buffer
    if (this.cachedArray === undefined || this.lastBuffer !== currentBuffer) {
      this.cachedArray = new this.kind(currentBuffer, this.ptr, this.length)
      this.lastBuffer = currentBuffer
    }
    return this.cachedArray
  }
}

/** @private */
export type HeapTypedArray<JS extends TypedArray, C extends number> = Lifetime<{
  typedArray: RefreshableTypedArray<JS>
  ptr: C
}>

/**
 * @private
 */
export class ModuleMemory {
  constructor(public module: EitherModule) {}

  /** `_malloc` that throws instead of returning a null pointer we would then write through. */
  private malloc<T extends number>(numBytes: number): T {
    const ptr = this.module._malloc(numBytes)
    if (!ptr && numBytes > 0) {
      throw new Error(`Failed to allocate ${numBytes} bytes in the WASM heap (out of memory)`)
    }
    return ptr as T
  }

  toPointerArray(handleArray: QuickJSHandle[]): Lifetime<JSValueConstPointerPointer> {
    const typedArray = new Uint32Array(handleArray.map((handle) => handle.value))
    const numBytes = typedArray.length * typedArray.BYTES_PER_ELEMENT
    const ptr = this.malloc<JSValueConstPointerPointer>(numBytes)
    const heapBytes = new Uint8Array(this.module.HEAPU8.buffer, ptr, numBytes)
    heapBytes.set(new Uint8Array(typedArray.buffer))
    return new Lifetime(ptr, undefined, (ptr) => this.module._free(ptr))
  }

  newTypedArray<JS extends TypedArray, C extends number>(
    kind: TypedArrayConstructor<JS>,
    length: number,
  ): HeapTypedArray<JS, C> {
    const numBytes = length * kind.BYTES_PER_ELEMENT
    const ptr = this.malloc<C>(numBytes)
    const typedArray = new RefreshableTypedArray(this.module, kind, ptr, length)
    typedArray.value.fill(0)
    return new Lifetime({ typedArray, ptr }, undefined, (value) => this.module._free(value.ptr))
  }

  /** Pointers are unsigned: heap addresses of 2 GiB and above must not read back negative. */
  newMutablePointerArray<T extends number>(
    length: number,
  ): Lifetime<{ typedArray: RefreshableTypedArray<Uint32Array<ArrayBuffer>>; ptr: T }> {
    return this.newTypedArray(Uint32Array, length)
  }

  newHeapCharPointer(string: string): Lifetime<{ ptr: OwnedHeapCharPointer; strlen: number }> {
    const strlen = this.module.lengthBytesUTF8(string)
    const dataBytes = strlen + 1
    const ptr = this.malloc<OwnedHeapCharPointer>(dataBytes)
    this.module.stringToUTF8(string, ptr, dataBytes)
    return new Lifetime({ ptr, strlen }, undefined, (value) => this.module._free(value.ptr))
  }

  newHeapBufferPointer(buffer: Uint8Array): Lifetime<HeapUint8Array> {
    const numBytes = buffer.byteLength
    const ptr = this.malloc<JSVoidPointer>(numBytes)
    this.module.HEAPU8.set(buffer, ptr)
    return new Lifetime({ pointer: ptr, numBytes }, undefined, (value) =>
      this.module._free(value.pointer),
    )
  }

  consumeHeapCharPointer(ptr: OwnedHeapCharPointer): string {
    try {
      return this.module.UTF8ToString(ptr)
    } finally {
      this.module._free(ptr)
    }
  }
}
