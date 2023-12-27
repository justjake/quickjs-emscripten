import type {
  EitherModule,
  OwnedHeapCharPointer,
  JSContextPointerPointer,
  JSValueConstPointerPointer,
  JSValuePointerPointer,
  JSVoidPointer,
} from "@jitl/quickjs-ffi-types"
import { Lifetime } from "./lifetime"
import type { QuickJSHandle } from "./types"

/**
 * @private
 */
type HeapUint8Array = {
  pointer: JSVoidPointer
  numBytes: number
}

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

  newMutablePointerArray<T extends JSContextPointerPointer | JSValuePointerPointer>(
    length: number,
  ): Lifetime<{ typedArray: Int32Array; ptr: T }> {
    const zeros = new Int32Array(new Array(length).fill(0))
    const numBytes = zeros.length * zeros.BYTES_PER_ELEMENT
    const ptr = this.module._malloc(numBytes) as T
    const typedArray = new Int32Array(this.module.HEAPU8.buffer, ptr, length)
    typedArray.set(zeros)
    return new Lifetime({ typedArray, ptr }, undefined, (value) => this.module._free(value.ptr))
  }

  newHeapCharPointer(string: string): Lifetime<OwnedHeapCharPointer> {
    const numBytes = this.module.lengthBytesUTF8(string) + 1
    const ptr: OwnedHeapCharPointer = this.module._malloc(numBytes) as OwnedHeapCharPointer
    this.module.stringToUTF8(string, ptr, numBytes)
    return new Lifetime(ptr, undefined, (value) => this.module._free(value))
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
