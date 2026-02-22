import { assertStorageWindow, getDirectMemoryViews, type Memory } from "./memory-region"

export interface PtrRegionOptions {
  disableAssertions?: boolean
}

export interface PtrArrayBufferOptions extends PtrRegionOptions {}

export interface PtrTypedArrayOptions extends PtrRegionOptions {}

export type TypedArray =
  | Int8Array
  | Uint8Array
  | Uint8ClampedArray
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Float32Array
  | Float64Array
  | BigInt64Array
  | BigUint64Array

export interface TypedArrayConstructor<ArrayT extends TypedArray = TypedArray> {
  readonly BYTES_PER_ELEMENT: number
  new (buffer: ArrayBufferLike, byteOffset: number, length: number): ArrayT
}

export function assertNonNegativeInt(value: number, label: string): void {
  if (!Number.isInteger(value) || value < 0) {
    throw new Error(`${label} must be a non-negative integer: ${value}`)
  }
}

function computeTypedByteLength<ArrayT extends TypedArray>(
  ArrayType: TypedArrayConstructor<ArrayT>,
  length: number,
): number {
  const byteLength = length * ArrayType.BYTES_PER_ELEMENT
  if (!Number.isSafeInteger(byteLength)) {
    throw new Error(`byteLength exceeds safe integer range: ${byteLength}`)
  }
  return byteLength
}

function resolveTypedLength<ArrayT extends TypedArray>(
  owner: string,
  ArrayType: TypedArrayConstructor<ArrayT>,
  byteLength: number,
  length?: number,
): number {
  const bytesPerElement = ArrayType.BYTES_PER_ELEMENT

  if (length !== undefined) {
    assertNonNegativeInt(length, "length")
    return length
  }

  if (byteLength % bytesPerElement !== 0) {
    throw new Error(
      `${owner} cannot infer typed-array length: bytes=${byteLength} is not divisible by ${bytesPerElement}`,
    )
  }

  return byteLength / bytesPerElement
}

/**
 * Shared ptr-region core: validates ptr windows and refreshes cached views on memory epoch changes.
 */
abstract class PtrRegion<ViewT, Ptr extends number = number> {
  protected readonly assertions: boolean
  protected _ptr: Ptr
  protected _byteLength: number
  protected _byteOffset: number

  private cachedEpoch = -1
  private cachedView?: ViewT

  protected constructor(
    protected readonly memory: Memory<Ptr>,
    ptr: Ptr,
    byteLength: number,
    byteOffset = 0,
    options: PtrRegionOptions = {},
  ) {
    this.assertions = !options.disableAssertions
    this._ptr = ptr
    this._byteLength = byteLength
    this._byteOffset = byteOffset
    this.assertRegion(ptr, byteLength, byteOffset)
  }

  epoch(): number {
    return this.memory.epoch()
  }

  protected rebindRegion(ptr: Ptr, byteLength: number, byteOffset = this._byteOffset): void {
    this.assertRegion(ptr, byteLength, byteOffset)
    this._ptr = ptr
    this._byteLength = byteLength
    this._byteOffset = byteOffset
    this.invalidateCache()
  }

  protected resolveCachedView(
    factory: (
      bytes: Uint8Array,
      regionByteOffset: number,
      absoluteByteOffset: number,
      byteLength: number,
    ) => ViewT,
  ): ViewT {
    const epoch = this.memory.epoch()
    if (this.cachedView !== undefined && this.cachedEpoch === epoch) {
      return this.cachedView
    }

    const { bytes } = getDirectMemoryViews(this.memory)
    const regionByteOffset = this.computeRegionByteOffset(this._ptr, this._byteOffset)

    if (this.assertions) {
      assertStorageWindow(bytes, regionByteOffset, this._byteLength, false)
    }

    const absoluteByteOffset = bytes.byteOffset + regionByteOffset
    const view = factory(bytes, regionByteOffset, absoluteByteOffset, this._byteLength)
    this.cachedView = view
    this.cachedEpoch = epoch
    return view
  }

  protected assertRange(byteOffset: number, byteLength: number, owner: string): void {
    if (!this.assertions) {
      return
    }

    assertNonNegativeInt(byteOffset, "byteOffset")
    assertNonNegativeInt(byteLength, "byteLength")

    if (byteOffset + byteLength > this._byteLength) {
      throw new Error(
        `${owner} range out of bounds: offset=${byteOffset}, len=${byteLength}, total=${this._byteLength}`,
      )
    }
  }

  protected invalidateCache(): void {
    this.cachedEpoch = -1
    this.cachedView = undefined
  }

  protected derivedOptions(options?: PtrRegionOptions): PtrRegionOptions {
    return options ?? { disableAssertions: !this.assertions }
  }

  protected regionPtr(relativeByteOffset = 0): Ptr {
    assertNonNegativeInt(relativeByteOffset, "byteOffset")

    const base = this.computeRegionByteOffset(this._ptr, this._byteOffset)
    const next = base + relativeByteOffset
    if (!Number.isSafeInteger(next)) {
      throw new Error(
        `Ptr byte offset exceeds safe integer: base=${base}, byteOffset=${relativeByteOffset}`,
      )
    }

    return next as Ptr
  }

  private assertRegion(ptr: Ptr, byteLength: number, byteOffset: number): void {
    assertNonNegativeInt(ptr as number, "ptr")
    assertNonNegativeInt(byteLength, "byteLength")
    assertNonNegativeInt(byteOffset, "byteOffset")

    this.computeRegionByteOffset(ptr, byteOffset)

    const end = (ptr as number) + byteOffset + byteLength
    if (!Number.isSafeInteger(end)) {
      throw new Error(
        `Ptr region exceeds safe integer: ptr=${ptr}, offset=${byteOffset}, len=${byteLength}`,
      )
    }

    if (!this.assertions) {
      return
    }

    const { bytes } = getDirectMemoryViews(this.memory)
    assertStorageWindow(bytes, (ptr as number) + byteOffset, byteLength, false)
  }

  private computeRegionByteOffset(ptr: Ptr, byteOffset: number): number {
    const regionByteOffset = (ptr as number) + byteOffset
    if (!Number.isSafeInteger(regionByteOffset)) {
      throw new Error(`Ptr byte offset exceeds safe integer: ptr=${ptr}, byteOffset=${byteOffset}`)
    }
    return regionByteOffset
  }
}

/**
 * ArrayBuffer-like ptr region. Re-binds lazily when memory epoch changes.
 */
export class PtrArrayBuffer<Ptr extends number = number> extends PtrRegion<Uint8Array, Ptr> {
  private _fullDataViewEpoch = -1
  private _fullDataView?: DataView

  constructor(
    memory: Memory<Ptr>,
    ptr: Ptr,
    byteLength: number,
    options: PtrArrayBufferOptions = {},
  ) {
    super(memory, ptr, byteLength, 0, options)
  }

  get ptr(): Ptr {
    return this._ptr
  }

  get byteLength(): number {
    return this._byteLength
  }

  rebind(ptr: Ptr, byteLength = this._byteLength): void {
    this.rebindRegion(ptr, byteLength, 0)
    this.invalidateFullDataView()
  }

  grow(newByteLength: number): void {
    assertNonNegativeInt(newByteLength, "newByteLength")
    if (newByteLength < this._byteLength) {
      throw new Error(
        `Cannot shrink PtrArrayBuffer byteLength from ${this._byteLength} to ${newByteLength}`,
      )
    }
    if (newByteLength === this._byteLength) {
      return
    }

    const nextPtr = this.memory.realloc(this.ptr, newByteLength)
    if (!Number.isInteger(nextPtr as number) || (nextPtr as number) < 0) {
      throw new Error(`realloc() returned invalid ptr: ${nextPtr}`)
    }

    this.rebind(nextPtr, newByteLength)
  }

  bytes(): Uint8Array {
    return this.resolveCachedView((bytes, regionByteOffset, _absoluteByteOffset, byteLength) =>
      bytes.subarray(regionByteOffset, regionByteOffset + byteLength),
    )
  }

  withBytes<T>(fn: (bytes: Uint8Array) => T): T {
    return fn(this.bytes())
  }

  dataView(byteOffset = 0, byteLength = this._byteLength - byteOffset): DataView {
    this.assertRange(byteOffset, byteLength, "PtrArrayBuffer")

    const full = this.resolveFullDataView()
    if (byteOffset === 0 && byteLength === this._byteLength) {
      return full
    }

    return new DataView(full.buffer, full.byteOffset + byteOffset, byteLength)
  }

  withDataView<T>(
    fn: (view: DataView) => T,
    byteOffset = 0,
    byteLength = this._byteLength - byteOffset,
  ): T {
    return fn(this.dataView(byteOffset, byteLength))
  }

  asPtrTypedArray<ArrayT extends TypedArray>(
    ArrayType: TypedArrayConstructor<ArrayT>,
    byteOffset = 0,
    length?: number,
    options?: PtrTypedArrayOptions,
  ): PtrTypedArray<ArrayT, Ptr> {
    this.assertRange(byteOffset, this._byteLength - byteOffset, "PtrArrayBuffer")

    const remaining = this._byteLength - byteOffset
    const resolvedLength = resolveTypedLength("PtrArrayBuffer", ArrayType, remaining, length)
    const byteLength = computeTypedByteLength(ArrayType, resolvedLength)
    this.assertRange(byteOffset, byteLength, "PtrArrayBuffer")

    return new PtrTypedArray(
      this.memory,
      ArrayType,
      this.regionPtr(byteOffset),
      resolvedLength,
      0,
      this.derivedOptions(options),
    )
  }

  private resolveFullDataView(): DataView {
    const epoch = this.epoch()
    if (this._fullDataView !== undefined && this._fullDataViewEpoch === epoch) {
      return this._fullDataView
    }

    const region = this.bytes()
    const next = new DataView(region.buffer, region.byteOffset, this._byteLength)
    this._fullDataView = next
    this._fullDataViewEpoch = epoch
    return next
  }

  private invalidateFullDataView(): void {
    this._fullDataView = undefined
    this._fullDataViewEpoch = -1
  }
}

/**
 * TypedArray view tied to a numeric ptr. Re-binds lazily when memory epoch changes.
 */
export class PtrTypedArray<
  ArrayT extends TypedArray,
  Ptr extends number = number,
> extends PtrRegion<ArrayT, Ptr> {
  private readonly _buffer: PtrArrayBuffer<Ptr>
  private _length: number

  constructor(
    memory: Memory<Ptr>,
    private readonly _arrayType: TypedArrayConstructor<ArrayT>,
    ptr: Ptr,
    length: number,
    byteOffset = 0,
    options: PtrTypedArrayOptions = {},
  ) {
    assertNonNegativeInt(length, "length")
    const byteLength = computeTypedByteLength(_arrayType, length)
    super(memory, ptr, byteLength, byteOffset, options)
    this._length = length
    this._buffer = new PtrArrayBuffer(
      memory,
      this.regionPtr(0),
      byteLength,
      this.derivedOptions(options),
    )
  }

  get buffer(): PtrArrayBuffer<Ptr> {
    return this._buffer
  }

  get ptr(): Ptr {
    return this._ptr
  }

  get length(): number {
    return this._length
  }

  get byteOffset(): number {
    return this._byteOffset
  }

  get byteLength(): number {
    return this._byteLength
  }

  get bytesPerElement(): number {
    return this._arrayType.BYTES_PER_ELEMENT
  }

  rebind(ptr: Ptr, length = this._length, byteOffset = this._byteOffset): void {
    assertNonNegativeInt(length, "length")
    this.rebindRegion(ptr, computeTypedByteLength(this._arrayType, length), byteOffset)
    this._length = length
    this.buffer.rebind(this.regionPtr(0), this._byteLength)
  }

  grow(newLength: number): void {
    assertNonNegativeInt(newLength, "newLength")
    if (newLength < this._length) {
      throw new Error(`Cannot shrink PtrTypedArray length from ${this._length} to ${newLength}`)
    }
    if (newLength === this._length) {
      return
    }
    if (this._byteOffset !== 0) {
      throw new Error("PtrTypedArray.grow() only supports byteOffset=0")
    }

    const nextByteLength = computeTypedByteLength(this._arrayType, newLength)
    const nextPtr = this.memory.realloc(this.ptr, nextByteLength)
    if (!Number.isInteger(nextPtr as number) || (nextPtr as number) < 0) {
      throw new Error(`realloc() returned invalid ptr: ${nextPtr}`)
    }

    this.rebind(nextPtr, newLength, 0)
  }

  typedArray(): ArrayT {
    return this.resolveView()
  }

  withTypedArray<T>(fn: (view: ArrayT) => T): T {
    return fn(this.resolveView())
  }

  dataView(byteOffset = 0, byteLength = this._byteLength - byteOffset): DataView {
    return this.buffer.dataView(byteOffset, byteLength)
  }

  withDataView<T>(
    fn: (view: DataView) => T,
    byteOffset = 0,
    byteLength = this._byteLength - byteOffset,
  ): T {
    return this.buffer.withDataView(fn, byteOffset, byteLength)
  }

  asPtrTypedArray<OutT extends TypedArray>(
    ArrayType: TypedArrayConstructor<OutT>,
    byteOffset = 0,
    length?: number,
    options?: PtrTypedArrayOptions,
  ): PtrTypedArray<OutT, Ptr> {
    return this.buffer.asPtrTypedArray(ArrayType, byteOffset, length, options)
  }

  private resolveView(): ArrayT {
    return this.resolveCachedView((bytes, _regionByteOffset, absoluteByteOffset) => {
      const alignment = this._arrayType.BYTES_PER_ELEMENT
      if ((absoluteByteOffset & (alignment - 1)) !== 0) {
        throw new Error(
          `PtrTypedArray byte offset must be ${alignment}-byte aligned: ${absoluteByteOffset}`,
        )
      }

      return new this._arrayType(bytes.buffer, absoluteByteOffset, this._length)
    })
  }

  private assertIndex(index: number): void {
    if (!Number.isInteger(index) || index < 0 || index >= this._length) {
      throw new Error(`Index out of range: ${index}`)
    }
  }
}
