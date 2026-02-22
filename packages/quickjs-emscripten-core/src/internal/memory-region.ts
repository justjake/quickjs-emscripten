export type ArenaRawMemory = ArrayBuffer | Uint8Array

export type Memory<Ptr extends number = number> = {
  epoch: () => number
  uint32: () => Uint32Array
  uint8: () => Uint8Array
  malloc: (size: number) => Ptr
  realloc: (ptr: Ptr, size: number) => Ptr
  free: (ptr: Ptr) => void
}

export type MemoryViewState = {
  token: unknown
  bytes: Uint8Array
  words?: Uint32Array
  byteLength: number
}

export class ArrayBufferMemory implements Memory<number> {
  private bytes: Uint8Array
  private epochValue = 0
  free = (_ptr: number): void => {}

  constructor(
    memory: ArrayBuffer | Uint8Array | number,
    private readonly basePtr = 0,
  ) {
    if (!Number.isInteger(basePtr) || basePtr < 0) {
      throw new Error(`Invalid basePtr: ${basePtr}`)
    }
    if (typeof memory === "number") {
      if (!Number.isInteger(memory) || memory <= 0) {
        throw new Error(`Invalid memory size: ${memory}`)
      }
      this.bytes = new Uint8Array(memory)
      return
    }
    this.bytes = memory instanceof Uint8Array ? memory : new Uint8Array(memory)
  }
  epoch(): number {
    return this.epochValue
  }

  uint8(): Uint8Array {
    return this.bytes
  }

  uint32(): Uint32Array {
    return new Uint32Array(this.bytes.buffer, this.bytes.byteOffset, this.bytes.byteLength >>> 2)
  }

  malloc(size: number): number {
    this.ensureWindow(this.basePtr, size)
    return this.basePtr
  }

  realloc(ptr: number, size: number): number {
    if (ptr !== this.basePtr) {
      throw new Error(`realloc ptr mismatch: got ${ptr}, expected ${this.basePtr}`)
    }
    this.ensureWindow(ptr, size)
    return this.basePtr
  }

  private ensureWindow(ptr: number, size: number): void {
    if (!Number.isInteger(size) || size < 0) {
      throw new Error(`Invalid size: ${size}`)
    }
    const needed = ptr + size
    if (needed <= this.bytes.byteLength) {
      return
    }

    const next = new Uint8Array(needed)
    next.set(this.bytes.subarray(0, Math.min(this.bytes.byteLength, next.byteLength)), 0)
    this.bytes = next
    this.epochValue++
  }
}

export function isMemoryObject<Ptr extends number = number>(value: unknown): value is Memory<Ptr> {
  return (
    typeof value === "object" &&
    value !== null &&
    "epoch" in value &&
    "uint32" in value &&
    "uint8" in value &&
    "malloc" in value &&
    "realloc" in value &&
    "free" in value
  )
}

export function memoryLength(raw: ArenaRawMemory): number {
  return raw.byteLength
}

export function createMemoryViewState(raw: ArenaRawMemory): MemoryViewState {
  const bytes = raw instanceof Uint8Array ? raw : new Uint8Array(raw)

  let words: Uint32Array | undefined
  if ((bytes.byteOffset & 3) === 0 && (bytes.byteLength & 3) === 0) {
    words = new Uint32Array(bytes.buffer, bytes.byteOffset, bytes.byteLength >>> 2)
  }

  return {
    token: raw,
    bytes,
    words,
    byteLength: bytes.byteLength,
  }
}

export function createMemoryViewStateFromViews(
  token: unknown,
  bytes: Uint8Array,
  wordsMaybe: Uint32Array,
): MemoryViewState {
  let words: Uint32Array | undefined

  if (
    wordsMaybe.buffer === bytes.buffer &&
    wordsMaybe.byteOffset === bytes.byteOffset &&
    wordsMaybe.byteLength === bytes.byteLength
  ) {
    words = wordsMaybe
  } else if ((bytes.byteOffset & 3) === 0 && (bytes.byteLength & 3) === 0) {
    words = new Uint32Array(bytes.buffer, bytes.byteOffset, bytes.byteLength >>> 2)
  }

  return {
    token,
    bytes,
    words,
    byteLength: bytes.byteLength,
  }
}

export function copyBytes(
  src: MemoryViewState,
  srcByteOffset: number,
  dst: MemoryViewState,
  dstByteOffset: number,
  byteLength: number,
): void {
  const canUseWords =
    src.words !== undefined &&
    dst.words !== undefined &&
    (srcByteOffset & 3) === 0 &&
    (dstByteOffset & 3) === 0 &&
    (byteLength & 3) === 0

  if (canUseWords) {
    const srcWords = src.words as Uint32Array
    const dstWords = dst.words as Uint32Array
    const srcWord = srcByteOffset >>> 2
    const dstWord = dstByteOffset >>> 2
    const words = byteLength >>> 2

    for (let i = 0; i < words; i++) {
      dstWords[dstWord + i] = srcWords[srcWord + i]
    }
    return
  }

  const srcBytes = src.bytes
  const dstBytes = dst.bytes
  for (let i = 0; i < byteLength; i++) {
    dstBytes[dstByteOffset + i] = srcBytes[srcByteOffset + i]
  }
}

export function assertByteRange(total: number, offset: number, len: number, label: string): number {
  if (!Number.isInteger(offset) || offset < 0) {
    throw new Error(`Invalid ${label} byte offset: ${offset}`)
  }

  const end = offset + len
  if (end > total) {
    throw new Error(`${label} range out of bounds: offset=${offset}, len=${len}, total=${total}`)
  }

  return offset
}

export function assertStorageWindow(
  raw: ArenaRawMemory,
  basePtr: number,
  requiredByteLength: number,
  strictExact = false,
): void {
  const total = memoryLength(raw)

  if (!Number.isInteger(basePtr) || basePtr < 0) {
    throw new Error(`Invalid ptr: ${basePtr}`)
  }
  if (!Number.isInteger(requiredByteLength) || requiredByteLength < 0) {
    throw new Error(`Invalid byte length: ${requiredByteLength}`)
  }

  if (strictExact) {
    if (total !== requiredByteLength) {
      throw new Error(
        `When ptr is omitted, memory length must equal ${requiredByteLength}, got ${total}`,
      )
    }
    return
  }

  if (basePtr + requiredByteLength > total) {
    throw new Error(
      `Memory window out of bounds: ptr=${basePtr}, bytes=${requiredByteLength}, total=${total}`,
    )
  }
}

export function getDirectMemoryViews<Ptr extends number>(
  memory: Memory<Ptr>,
): { bytes: Uint8Array; words: Uint32Array } {
  const bytes = memory.uint8()
  const words = memory.uint32()

  if (!(bytes instanceof Uint8Array)) {
    throw new Error("Memory.uint8() must return Uint8Array")
  }
  if (!(words instanceof Uint32Array)) {
    throw new Error("Memory.uint32() must return Uint32Array")
  }
  if (words.buffer !== bytes.buffer) {
    throw new Error("Memory.uint8() and Memory.uint32() must share the same ArrayBuffer")
  }

  return { bytes, words }
}

export function getWritableRegion<Ptr extends number>(
  memory: Memory<Ptr>,
  ptr: Ptr,
  byteLength: number,
): Uint8Array {
  const { bytes } = getDirectMemoryViews(memory)
  assertStorageWindow(bytes, ptr as number, byteLength, false)
  return bytes.subarray(ptr as number, (ptr as number) + byteLength)
}
