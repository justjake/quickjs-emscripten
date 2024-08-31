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

/** @private */
export type HeapTypedArray<JS extends TypedArray, C extends number> = Lifetime<{
  typedArray: JS
  ptr: C
}>

/**
 * @private
 */
export class ModuleMemory {
  constructor(public module: EitherModule) {}

  toPointerArray(handleArray: QuickJSHandle[]): Lifetime<JSValueConstPointerPointer> {
    const typedArray = new Int32Array(handleArray.map((handle) => handle.value))
    const numBytes = typedArray.length * typedArray.BYTES_PER_ELEMENT
    const ptr = this.module._malloc(numBytes) as JSValueConstPointerPointer
    const heapBytes = new Uint8Array(this.module.HEAPU8.buffer, ptr, numBytes)
    heapBytes.set(new Uint8Array(typedArray.buffer))
    return new Lifetime(ptr, undefined, (ptr) => this.module._free(ptr))
  }

  newTypedArray<JS extends TypedArray, C extends number>(
    kind: TypedArrayConstructor<JS>,
    length: number,
  ): HeapTypedArray<JS, C> {
    const zeros = new kind(new Array(length).fill(0))
    const numBytes = zeros.length * zeros.BYTES_PER_ELEMENT
    const ptr = this.module._malloc(numBytes) as C
    const typedArray = new kind(this.module.HEAPU8.buffer, ptr, length)
    typedArray.set(zeros)
    return new Lifetime({ typedArray, ptr }, undefined, (value) => this.module._free(value.ptr))
  }

  // TODO: shouldn't this be Uint32 instead of Int32?
  newMutablePointerArray<T extends number>(
    length: number,
  ): Lifetime<{ typedArray: Int32Array; ptr: T }> {
    return this.newTypedArray(Int32Array, length)
  }

  newHeapCharPointer(string: string): Lifetime<{ ptr: OwnedHeapCharPointer; strlen: number }> {
    const strlen = this.module.lengthBytesUTF8(string)
    const dataBytes = strlen + 1
    const ptr: OwnedHeapCharPointer = this.module._malloc(dataBytes) as OwnedHeapCharPointer
    this.module.stringToUTF8(string, ptr, dataBytes)
    return new Lifetime({ ptr, strlen }, undefined, (value) => this.module._free(value.ptr))
  }

  newHeapBufferPointer(buffer: Uint8Array): Lifetime<HeapUint8Array> {
    const numBytes = buffer.byteLength
    const ptr: JSVoidPointer = this.module._malloc(numBytes) as JSVoidPointer
    this.module.HEAPU8.set(buffer, ptr)
    return new Lifetime({ pointer: ptr, numBytes }, undefined, (value) =>
      this.module._free(value.pointer),
    )
  }

  consumeHeapCharPointer(ptr: OwnedHeapCharPointer): string {
    const str = this.module.UTF8ToString(ptr)
    this.module._free(ptr)
    return str
  }
}
