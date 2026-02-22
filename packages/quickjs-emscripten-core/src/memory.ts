import type {
  EitherModule,
  OwnedHeapCharPointer,
  JSValueConstPointerPointer,
  JSVoidPointer,
} from "@jitl/quickjs-ffi-types"
import type { Memory } from "./internal/memory-region"
import { PtrTypedArray } from "./internal/PtrTypedArray"
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
export type HeapTypedArray<JS extends TypedArray, C extends number> = Lifetime<PtrTypedArray<JS, C>>

/**
 * @private
 */
export class ModuleMemory implements Memory<number> {
  private _buffer = this.module.HEAPU8.buffer
  private _epoch = 0
  private _allocationSize = new Map<number, number>()

  constructor(public module: EitherModule) {}

  epoch(): number {
    this.syncEpoch()
    return this._epoch
  }

  uint8(): Uint8Array {
    this.syncEpoch()
    return this.module.HEAPU8
  }

  uint32(): Uint32Array {
    this.syncEpoch()
    return this.module.HEAPU32
  }

  malloc(size: number): number {
    if (!Number.isInteger(size) || size < 0) {
      throw new Error(`Invalid malloc size: ${size}`)
    }

    const ptr = this.module._malloc(size)
    if (!Number.isInteger(ptr) || ptr < 0) {
      throw new Error(`_malloc returned invalid pointer: ${ptr}`)
    }
    this._allocationSize.set(ptr, size)
    this.syncEpoch()
    return ptr
  }

  realloc(ptr: number, size: number): number {
    if (!Number.isInteger(ptr) || ptr < 0) {
      throw new Error(`Invalid realloc pointer: ${ptr}`)
    }
    if (!Number.isInteger(size) || size < 0) {
      throw new Error(`Invalid realloc size: ${size}`)
    }

    if (!this._allocationSize.has(ptr)) {
      throw new Error(`Cannot realloc unknown pointer: ${ptr}`)
    }

    const next = this.module._realloc(ptr, size)
    if (!Number.isInteger(next) || next < 0) {
      throw new Error(`_realloc returned invalid pointer: ${next}`)
    }
    if (size > 0 && next === 0) {
      throw new Error(`_realloc returned null pointer for size ${size}`)
    }

    if (next !== ptr) {
      this._allocationSize.delete(ptr)
    }
    if (size === 0) {
      this._allocationSize.delete(next)
    } else {
      this._allocationSize.set(next, size)
    }
    this.syncEpoch()
    return next
  }

  free(ptr: number): void {
    if (!Number.isInteger(ptr) || ptr < 0) {
      throw new Error(`Invalid free pointer: ${ptr}`)
    }
    this.module._free(ptr)
    this._allocationSize.delete(ptr)
    this.syncEpoch()
  }

  toPointerArray(handleArray: QuickJSHandle[]): Lifetime<JSValueConstPointerPointer> {
    const length = handleArray.length
    const ptr = this.malloc(length * Int32Array.BYTES_PER_ELEMENT) as JSValueConstPointerPointer
    const out = new PtrTypedArray(this, Int32Array, ptr as number, length)
    const values = out.view()
    for (let i = 0; i < length; i++) {
      values[i] = handleArray[i].value
    }
    return new Lifetime(ptr, undefined, (value) => this.free(value))
  }

  newTypedArray<JS extends TypedArray, C extends number>(
    kind: TypedArrayConstructor<JS>,
    length: number,
  ): HeapTypedArray<JS, C> {
    if (!Number.isInteger(length) || length < 0) {
      throw new Error(`Invalid typed array length: ${length}`)
    }

    const numBytes = length * kind.BYTES_PER_ELEMENT
    const ptr = this.malloc(numBytes) as C
    const typedArray = new PtrTypedArray(this, kind, ptr, length) as unknown as PtrTypedArray<
      JS,
      C
    >
    typedArray.view().fill(0)
    return new Lifetime(typedArray, undefined, (value) => this.free(value.ptr))
  }

  // TODO: shouldn't this be Uint32 instead of Int32?
  newMutablePointerArray<T extends number>(length: number): HeapTypedArray<Int32Array, T> {
    return this.newTypedArray(Int32Array, length) as HeapTypedArray<Int32Array, T>
  }

  newHeapCharPointer(string: string): Lifetime<{ ptr: OwnedHeapCharPointer; strlen: number }> {
    const strlen = this.module.lengthBytesUTF8(string)
    const dataBytes = strlen + 1
    const ptr: OwnedHeapCharPointer = this.malloc(dataBytes) as OwnedHeapCharPointer
    this.module.stringToUTF8(string, ptr, dataBytes)
    return new Lifetime({ ptr, strlen }, undefined, (value) => this.free(value.ptr))
  }

  newHeapBufferPointer(buffer: Uint8Array): Lifetime<HeapUint8Array> {
    const numBytes = buffer.byteLength
    const ptr: JSVoidPointer = this.malloc(numBytes) as JSVoidPointer
    this.uint8().set(buffer, ptr)
    return new Lifetime({ pointer: ptr, numBytes }, undefined, (value) =>
      this.free(value.pointer),
    )
  }

  consumeHeapCharPointer(ptr: OwnedHeapCharPointer): string {
    const str = this.module.UTF8ToString(ptr)
    this.free(ptr)
    return str
  }

  private syncEpoch(): void {
    const next = this.module.HEAPU8.buffer
    if (next !== this._buffer) {
      this._buffer = next
      this._epoch++
    }
  }
}
