import {
  ByteRegionAllocator,
  type ByteRegionAllocatorOptions,
} from "./ByteRegionAllocator"
import {
  assertStorageWindow,
  getDirectMemoryViews,
  getWritableRegion,
  type Memory,
} from "./memory-region"

export type StringAllocation = {
  ptrs: Uint32Array | number[]
  byteLengths: Uint32Array
}

export interface StringAllocatorOptions extends ByteRegionAllocatorOptions {
  initialCapacityBytes?: number
  initialStringCapacity?: number
}

const EMPTY_PTRS = new Uint32Array(0)
const EMPTY_BYTE_LENGTHS = new Uint32Array(0)

function assertPositiveInt(value: number, label: string): void {
  if (!Number.isInteger(value) || value <= 0) {
    throw new Error(`${label} must be a positive integer: ${value}`)
  }
}

/**
 * Returns the UTF-8 payload length for `value` without allocating temporary buffers.
 */
export function utf8ByteLength(value: string): number {
  let total = 0

  for (let i = 0; i < value.length; i++) {
    const code = value.charCodeAt(i)

    if (code <= 0x7f) {
      total += 1
      continue
    }
    if (code <= 0x7ff) {
      total += 2
      continue
    }
    if (code >= 0xd800 && code <= 0xdbff) {
      const next = i + 1 < value.length ? value.charCodeAt(i + 1) : 0
      if (next >= 0xdc00 && next <= 0xdfff) {
        total += 4
        i++
      } else {
        total += 3
      }
      continue
    }
    if (code >= 0xdc00 && code <= 0xdfff) {
      total += 3
      continue
    }

    total += 3
  }

  return total
}

export class StringAllocator<Ptr extends number = number> {
  private readonly encoder = new TextEncoder()
  private readonly assertions: boolean
  private readonly initialCapacityBytes: number
  private readonly disableAssertions: boolean

  private allocator?: ByteRegionAllocator<Ptr>
  private regionPtr?: Ptr
  private regionCapacityBytes = 0

  private strings: string[]
  private utf8Lengths: number[]
  private count = 0

  private resultPtrs: Uint32Array
  private resultByteLengths: Uint32Array

  constructor(
    private readonly memory: Memory<Ptr>,
    options: StringAllocatorOptions = {},
  ) {
    const initialStringCapacity = options.initialStringCapacity ?? 16
    assertPositiveInt(initialStringCapacity, "initialStringCapacity")

    this.initialCapacityBytes = options.initialCapacityBytes ?? 256
    assertPositiveInt(this.initialCapacityBytes, "initialCapacityBytes")
    this.disableAssertions = Boolean(options.disableAssertions)
    this.assertions = !this.disableAssertions

    this.strings = new Array<string>(initialStringCapacity)
    this.utf8Lengths = new Array<number>(initialStringCapacity)
    this.resultPtrs = new Uint32Array(initialStringCapacity)
    this.resultByteLengths = new Uint32Array(initialStringCapacity)
  }

  reset(): void {
    this.count = 0
    this.allocator?.reset()
  }

  addString(value: string): number {
    const index = this.count
    this.count++

    this.ensureStringCapacity(this.count)
    this.strings[index] = value
    this.utf8Lengths[index] = utf8ByteLength(value)
    return index
  }

  finish(): StringAllocation {
    if (this.count === 0) {
      return {
        ptrs: EMPTY_PTRS,
        byteLengths: EMPTY_BYTE_LENGTHS,
      }
    }

    this.ensureResultCapacity(this.count)

    let totalBytes = 0
    for (let i = 0; i < this.count; i++) {
      totalBytes += this.utf8Lengths[i] + 1
    }

    this.ensureRegionCapacity(totalBytes)

    const allocator = this.allocator as ByteRegionAllocator<Ptr>
    allocator.reset()
    const basePtr = allocator.reserve(totalBytes)
    const region = getWritableRegion(this.memory, basePtr, totalBytes)

    let cursor = 0
    for (let i = 0; i < this.count; i++) {
      const value = this.strings[i]
      const expectedBytes = this.utf8Lengths[i]

      const target = region.subarray(cursor, cursor + expectedBytes)
      const encoded = this.encoder.encodeInto(value, target)

      if (this.assertions) {
        if (encoded.read !== value.length || encoded.written !== expectedBytes) {
          throw new Error(
            `encodeInto wrote unexpected size for string ${i}: read=${encoded.read}, written=${encoded.written}, expected=${expectedBytes}`,
          )
        }
      } else if (encoded.written !== expectedBytes) {
        const fallback = this.encoder.encode(value)
        if (fallback.byteLength !== expectedBytes) {
          throw new Error(
            `UTF-8 length mismatch for string ${i}: fallback=${fallback.byteLength}, expected=${expectedBytes}`,
          )
        }
        region.set(fallback, cursor)
      }

      region[cursor + expectedBytes] = 0

      const ptr = (basePtr as number) + cursor
      if (ptr < 0 || ptr > 0xffffffff) {
        throw new Error(`Ptr out of uint32 range at string ${i}: ${ptr}`)
      }
      this.resultPtrs[i] = ptr
      this.resultByteLengths[i] = expectedBytes

      cursor += expectedBytes + 1
    }

    return {
      ptrs: this.resultPtrs.subarray(0, this.count),
      byteLengths: this.resultByteLengths.subarray(0, this.count),
    }
  }

  private ensureRegionCapacity(requiredBytes: number): void {
    if (requiredBytes <= this.regionCapacityBytes && this.allocator) {
      return
    }

    let nextCapacity =
      this.regionCapacityBytes === 0 ? this.initialCapacityBytes : this.regionCapacityBytes
    while (nextCapacity < requiredBytes) {
      nextCapacity <<= 1
    }

    const nextPtr =
      this.regionPtr === undefined
        ? this.memory.malloc(nextCapacity)
        : this.memory.realloc(this.regionPtr, nextCapacity)

    if (!Number.isInteger(nextPtr) || nextPtr < 0) {
      throw new Error(`Memory allocator returned invalid ptr: ${nextPtr}`)
    }

    if (this.assertions) {
      const { bytes } = getDirectMemoryViews(this.memory)
      assertStorageWindow(bytes, nextPtr as number, nextCapacity, false)
    }

    this.regionPtr = nextPtr
    this.regionCapacityBytes = nextCapacity

    if (this.allocator) {
      this.allocator.setRegion(nextPtr, nextCapacity)
    } else {
      this.allocator = new ByteRegionAllocator(nextPtr, nextCapacity, {
        disableAssertions: this.disableAssertions,
      })
    }
  }

  private ensureStringCapacity(required: number): void {
    if (required <= this.strings.length) {
      return
    }

    let next = this.strings.length
    while (next < required) {
      next <<= 1
    }

    const nextStrings = new Array<string>(next)
    const nextLengths = new Array<number>(next)

    for (let i = 0; i < this.count; i++) {
      nextStrings[i] = this.strings[i]
      nextLengths[i] = this.utf8Lengths[i]
    }

    this.strings = nextStrings
    this.utf8Lengths = nextLengths
  }

  private ensureResultCapacity(required: number): void {
    if (required <= this.resultPtrs.length) {
      return
    }

    let next = this.resultPtrs.length
    while (next < required) {
      next <<= 1
    }

    const nextPtrs = new Uint32Array(next)
    const nextByteLengths = new Uint32Array(next)
    nextPtrs.set(this.resultPtrs, 0)
    nextByteLengths.set(this.resultByteLengths, 0)

    this.resultPtrs = nextPtrs
    this.resultByteLengths = nextByteLengths
  }
}
