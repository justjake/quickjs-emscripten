import {
  assertByteRange,
  assertStorageWindow as assertStorageWindowRaw,
  copyBytes,
  createMemoryViewState,
  createMemoryViewStateFromViews,
  getDirectMemoryViews,
  isMemoryObject,
  memoryLength,
  type ArenaRawMemory,
  type Memory,
  type MemoryViewState,
} from "./memory-region"

export type SlotArenaMemory<Ptr extends number = number> =
  | ArenaRawMemory
  | (() => ArenaRawMemory)
  | Memory<Ptr>

export interface SlotArenaOptions {
  disableAssertions?: boolean
}

export type { ArenaRawMemory, Memory } from "./memory-region"

type Writable<T> = { -readonly [K in keyof T]: T[K] }

/** @private */
export class FreeList<SlotT extends number = number> {
  readonly capacity: number
  private nextFresh = 0
  private recycledTop = 0
  private recycled: Int32Array
  private inUse?: Uint8Array
  private usedValue = 0
  private readonly assertions: boolean

  constructor(capacity: number, disableAssertions?: boolean) {
    if (!Number.isInteger(capacity) || capacity <= 0) {
      throw new Error(`Invalid capacity: ${capacity}`)
    }

    this.capacity = capacity
    this.recycled = new Int32Array(capacity)
    this.assertions = !disableAssertions

    if (this.assertions) {
      this.inUse = new Uint8Array(capacity)
    }
  }

  get used(): number {
    return this.usedValue
  }

  get available(): number {
    return this.capacity - this.usedValue
  }

  alloc(): SlotT {
    let slot = -1

    if (this.recycledTop > 0) {
      slot = this.recycled[--this.recycledTop]
    } else if (this.nextFresh < this.capacity) {
      slot = this.nextFresh
      this.nextFresh++
    } else {
      throw new Error("FreeList is full")
    }

    if (this.assertions) {
      const inUse = this.inUse as Uint8Array
      if (slot < 0 || slot >= this.capacity) {
        throw new Error(`FreeList produced invalid slot: ${slot}`)
      }
      if (inUse[slot] !== 0) {
        throw new Error(`FreeList produced in-use slot: ${slot}`)
      }
      inUse[slot] = 1
    }

    this.usedValue++
    return slot as SlotT
  }

  free(slotValue: SlotT): void {
    const slot = slotValue as number

    if (this.assertions) {
      if (!Number.isInteger(slot) || slot < 0 || slot >= this.capacity) {
        throw new Error(`Slot out of range: ${slot}`)
      }
      const inUse = this.inUse as Uint8Array
      if (inUse[slot] === 0) {
        throw new Error(`Double free or never-allocated slot: ${slot}`)
      }
      inUse[slot] = 0
    }

    this.recycled[this.recycledTop++] = slot
    this.usedValue--
  }

  reset(): void {
    this.nextFresh = 0
    this.recycledTop = 0
    this.usedValue = 0

    if (this.assertions) {
      ;(this.inUse as Uint8Array).fill(0)
    }
  }

  grow(newCap: number): void {
    if (!Number.isInteger(newCap) || newCap <= 0) {
      throw new Error(`Invalid new capacity: ${newCap}`)
    }
    if (newCap < this.capacity) {
      throw new Error(`Cannot shrink FreeList capacity from ${this.capacity} to ${newCap}`)
    }
    if (newCap === this.capacity) {
      return
    }

    const nextRecycled = new Int32Array(newCap)
    nextRecycled.set(this.recycled.subarray(0, this.recycledTop), 0)
    this.recycled = nextRecycled

    if (this.assertions) {
      const nextInUse = new Uint8Array(newCap)
      nextInUse.set(this.inUse as Uint8Array, 0)
      this.inUse = nextInUse
    }

    ;(this as Writable<this>).capacity = newCap
  }
}

function assertPowerOfTwoAtLeastFour(value: number, label: string): void {
  if (!Number.isInteger(value) || value < 4 || (value & (value - 1)) !== 0) {
    throw new Error(`${label} must be a power-of-two integer >= 4: ${value}`)
  }
}

function assertPositiveInt(value: number, label: string): void {
  if (!Number.isInteger(value) || value <= 0) {
    throw new Error(`${label} must be a positive integer: ${value}`)
  }
}

export class SlotArena<SlotT extends number = number, Ptr extends number = number> {
  readonly slotSize: number
  readonly capacity: number
  readonly byteLength: number
  readonly ptr: Ptr

  private readonly assertions: boolean
  private readonly allocator: FreeList<SlotT>

  private readonly staticStorage: boolean
  private readonly internalStorage: boolean
  private readonly directMemory?: Memory<Ptr>
  private readonly storageProvider?: () => ArenaRawMemory
  private staticRaw?: ArenaRawMemory

  private arenaView?: MemoryViewState
  private externalViewCache?: MemoryViewState

  constructor(
    slotSize: number,
    capacity: number,
    memory?: SlotArenaMemory<Ptr>,
    ptr?: Ptr,
    options: SlotArenaOptions = {},
  ) {
    assertPowerOfTwoAtLeastFour(slotSize, "slotSize")
    assertPositiveInt(capacity, "capacity")

    this.slotSize = slotSize
    this.capacity = capacity
    this.byteLength = slotSize * capacity
    this.assertions = !options.disableAssertions
    this.allocator = new FreeList<SlotT>(capacity, options.disableAssertions)

    if (memory === undefined) {
      if (ptr !== undefined) {
        throw new Error("ptr is only valid when memory is provided")
      }

      this.ptr = 0 as Ptr
      this.staticStorage = true
      this.internalStorage = true
      this.staticRaw = new ArrayBuffer(this.byteLength)
      this.arenaView = createMemoryViewState(this.staticRaw)
      return
    }

    if (isMemoryObject<Ptr>(memory)) {
      const basePtr = ptr ?? memory.malloc(this.byteLength)
      if (!Number.isInteger(basePtr) || basePtr < 0) {
        throw new Error(`Invalid ptr: ${basePtr}`)
      }

      this.ptr = basePtr
      this.staticStorage = false
      this.internalStorage = false
      this.directMemory = memory
      this.assertDirectMemoryWindow(memory, this.ptr as number)
      return
    }

    const basePtr = (ptr ?? 0) as Ptr
    if (!Number.isInteger(basePtr) || basePtr < 0) {
      throw new Error(`Invalid ptr: ${basePtr}`)
    }
    this.ptr = basePtr

    if (typeof memory === "function") {
      this.staticStorage = false
      this.internalStorage = false
      this.storageProvider = memory

      const initial = this.storageProvider()
      this.assertStorageWindow(initial, this.ptr as number, ptr === undefined)
      return
    }

    this.staticStorage = true
    this.internalStorage = false
    this.staticRaw = memory
    this.assertStorageWindow(memory, this.ptr as number, ptr === undefined)
    this.arenaView = createMemoryViewState(memory)
  }

  alloc(): SlotT {
    return this.allocator.alloc()
  }

  free(slot: SlotT): void {
    this.allocator.free(slot)
  }

  resetAllocator(): void {
    this.allocator.reset()
  }

  copyFromBytes(src: ArenaRawMemory, srcByteOffset: number, dstSlot: SlotT): void {
    const srcView = this.resolveExternalView(src)
    const srcOffset = this.assertions
      ? this.assertRange(srcView.byteLength, srcByteOffset, this.slotSize, "source")
      : srcByteOffset

    const dstOffset = this.slotOffset(dstSlot)
    const arena = this.resolveArenaView()

    if (this.assertions) {
      this.assertRange(arena.byteLength, dstOffset, this.slotSize, "arena")
    }

    copyBytes(srcView, srcOffset, arena, dstOffset, this.slotSize)
  }

  copyToBytes(srcSlot: SlotT, dst: ArenaRawMemory, dstByteOffset: number): void {
    const srcOffset = this.slotOffset(srcSlot)
    const arena = this.resolveArenaView()

    if (this.assertions) {
      this.assertRange(arena.byteLength, srcOffset, this.slotSize, "arena")
    }

    const dstView = this.resolveExternalView(dst)
    const dstOffset = this.assertions
      ? this.assertRange(dstView.byteLength, dstByteOffset, this.slotSize, "destination")
      : dstByteOffset

    copyBytes(arena, srcOffset, dstView, dstOffset, this.slotSize)
  }

  copySlot(srcSlot: SlotT, dstSlot: SlotT): void {
    const srcOffset = this.slotOffset(srcSlot)
    const dstOffset = this.slotOffset(dstSlot)

    if (srcOffset === dstOffset) {
      return
    }

    const arena = this.resolveArenaView()
    if (this.assertions) {
      this.assertRange(arena.byteLength, srcOffset, this.slotSize, "arena src")
      this.assertRange(arena.byteLength, dstOffset, this.slotSize, "arena dst")
    }

    copyBytes(arena, srcOffset, arena, dstOffset, this.slotSize)
  }

  grow(newCap: number): void {
    assertPositiveInt(newCap, "newCap")
    if (newCap < this.capacity) {
      throw new Error(`Cannot shrink capacity from ${this.capacity} to ${newCap}`)
    }
    if (newCap === this.capacity) {
      return
    }

    const nextByteLength = this.slotSize * newCap

    if (this.internalStorage) {
      const current = this.resolveArenaView()
      const nextRaw = new ArrayBuffer(nextByteLength)
      const nextView = createMemoryViewState(nextRaw)
      nextView.bytes.set(current.bytes.subarray(0, this.byteLength), 0)

      this.arenaView = nextView
      this.staticRaw = nextRaw
      ;(this as Writable<this>).capacity = newCap
      ;(this as Writable<this>).byteLength = nextByteLength
      this.allocator.grow(newCap)
      return
    }

    if (this.directMemory) {
      const nextPtr = this.directMemory.realloc(this.ptr, nextByteLength)
      if (!Number.isInteger(nextPtr) || nextPtr < 0) {
        throw new Error(`realloc() returned invalid ptr: ${nextPtr}`)
      }

      this.assertDirectMemoryWindow(this.directMemory, nextPtr as number, nextByteLength)
      ;(this as Writable<this>).ptr = nextPtr
      this.arenaView = undefined
      ;(this as Writable<this>).capacity = newCap
      ;(this as Writable<this>).byteLength = nextByteLength
      this.allocator.grow(newCap)
      return
    }

    throw new Error("grow() is only supported for internal memory or Memory object")
  }

  private slotOffset(slotValue: SlotT): number {
    const slot = slotValue as number

    if (this.assertions) {
      if (!Number.isInteger(slot) || slot < 0 || slot >= this.capacity) {
        throw new Error(`Slot out of range: ${slot}`)
      }
    }

    const basePtr = this.directMemory ? 0 : (this.ptr as number)
    return basePtr + slot * this.slotSize
  }

  private assertRange(total: number, offset: number, len: number, label: string): number {
    return assertByteRange(total, offset, len, label)
  }

  private assertStorageWindow(
    raw: ArenaRawMemory,
    basePtr: number,
    strictExact: boolean,
    requiredByteLength = this.byteLength,
  ): void {
    assertStorageWindowRaw(raw, basePtr, requiredByteLength, strictExact)
  }

  private computeWordStartIndex(words: Uint32Array, bytes: Uint8Array, basePtr: number): number {
    if ((basePtr & 3) !== 0) {
      throw new Error(`ptr must be 4-byte aligned for uint32 view access: ${basePtr}`)
    }

    const arenaByteStart = bytes.byteOffset + basePtr
    const delta = arenaByteStart - words.byteOffset
    if (delta < 0 || (delta & 3) !== 0) {
      throw new Error(
        `Cannot map byte ptr to uint32 index (bytes.byteOffset=${bytes.byteOffset}, words.byteOffset=${words.byteOffset}, ptr=${basePtr})`,
      )
    }

    return delta >>> 2
  }

  private assertDirectMemoryWindow(
    memory: Memory<Ptr>,
    basePtr: number,
    requiredByteLength = this.byteLength,
  ): void {
    const { bytes, words } = getDirectMemoryViews(memory)
    if ((requiredByteLength & 3) !== 0) {
      throw new Error(`SlotArena byte length must be 4-byte aligned, got ${requiredByteLength}`)
    }

    this.assertStorageWindow(bytes, basePtr, false, requiredByteLength)
    const wordStart = this.computeWordStartIndex(words, bytes, basePtr)
    const wordLen = requiredByteLength >>> 2
    if (wordStart + wordLen > words.length) {
      throw new Error(
        `Memory uint32 window out of bounds: wordStart=${wordStart}, wordLen=${wordLen}, wordsLen=${words.length}`,
      )
    }
  }

  private resolveArenaRaw(): ArenaRawMemory {
    if (this.staticStorage) {
      return this.staticRaw as ArenaRawMemory
    }

    const provider = this.storageProvider
    if (!provider) {
      throw new Error("SlotArena has no memory provider")
    }

    const raw = provider()
    if (!(raw instanceof Uint8Array) && !(raw instanceof ArrayBuffer)) {
      throw new Error("memory() must return ArrayBuffer or Uint8Array")
    }

    if (this.assertions) {
      this.assertStorageWindow(raw, this.ptr as number, false)
    }

    return raw
  }

  private resolveArenaView(): MemoryViewState {
    if (this.directMemory) {
      const { bytes, words } = getDirectMemoryViews(this.directMemory)

      const byteStart = this.ptr as number
      const byteEnd = byteStart + this.byteLength
      const wordStart = this.computeWordStartIndex(words, bytes, byteStart)
      const wordLen = this.byteLength >>> 2
      if (this.assertions) {
        this.assertDirectMemoryWindow(this.directMemory, byteStart)
      }

      const bytesWindow = bytes.subarray(byteStart, byteEnd)
      const wordsWindow = words.subarray(wordStart, wordStart + wordLen)

      const token = bytes.buffer
      if (
        this.arenaView &&
        this.arenaView.token === token &&
        this.arenaView.byteLength === this.byteLength &&
        this.arenaView.bytes.byteOffset === bytesWindow.byteOffset
      ) {
        return this.arenaView
      }

      this.arenaView = createMemoryViewStateFromViews(token, bytesWindow, wordsWindow)
      return this.arenaView
    }

    const raw = this.resolveArenaRaw()

    if (
      this.arenaView &&
      this.arenaView.token === raw &&
      this.arenaView.byteLength === memoryLength(raw)
    ) {
      return this.arenaView
    }

    this.arenaView = createMemoryViewState(raw)
    return this.arenaView
  }

  private resolveExternalView(raw: ArenaRawMemory): MemoryViewState {
    if (
      this.externalViewCache &&
      this.externalViewCache.token === raw &&
      this.externalViewCache.byteLength === memoryLength(raw)
    ) {
      return this.externalViewCache
    }

    this.externalViewCache = createMemoryViewState(raw)
    return this.externalViewCache
  }
}
