export interface ByteRegionAllocatorOptions {
  disableAssertions?: boolean
}

function assertPositiveInt(value: number, label: string): void {
  if (!Number.isInteger(value) || value <= 0) {
    throw new Error(`${label} must be a positive integer: ${value}`)
  }
}

export class ByteRegionAllocator<Ptr extends number = number> {
  private readonly assertions: boolean
  private basePtr: Ptr
  private capacityBytes: number
  private usedBytes = 0

  constructor(ptr: Ptr, capacityBytes: number, options: ByteRegionAllocatorOptions = {}) {
    if (!Number.isInteger(ptr) || ptr < 0) {
      throw new Error(`Invalid ptr: ${ptr}`)
    }
    assertPositiveInt(capacityBytes, "capacityBytes")

    this.basePtr = ptr
    this.capacityBytes = capacityBytes
    this.assertions = !options.disableAssertions
  }

  get ptr(): Ptr {
    return this.basePtr
  }

  get capacity(): number {
    return this.capacityBytes
  }

  get used(): number {
    return this.usedBytes
  }

  reset(): void {
    this.usedBytes = 0
  }

  setRegion(ptr: Ptr, capacityBytes: number): void {
    if (!Number.isInteger(ptr) || ptr < 0) {
      throw new Error(`Invalid ptr: ${ptr}`)
    }
    assertPositiveInt(capacityBytes, "capacityBytes")

    this.basePtr = ptr
    this.capacityBytes = capacityBytes
    this.usedBytes = 0
  }

  reserve(byteLength: number): Ptr {
    assertPositiveInt(byteLength, "byteLength")

    const required = this.usedBytes + byteLength
    if (required > this.capacityBytes) {
      throw new Error(
        `ByteRegionAllocator overflow: required=${required}, capacity=${this.capacityBytes}`,
      )
    }

    const ptr = ((this.basePtr as number) + this.usedBytes) as Ptr
    this.usedBytes = required

    if (this.assertions && (!Number.isInteger(ptr) || ptr < 0)) {
      throw new Error(`Invalid reserved ptr: ${ptr}`)
    }

    return ptr
  }
}

