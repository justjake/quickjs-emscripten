import type { HostRefId } from "@jitl/quickjs-ffi-types/ffi-types";
import { QuickJSHostRefInvalid, QuickJSHostRefRangeExceeded } from "./errors";
import type { QuickJSHandle } from "./types";
import type { QuickJSRuntime } from "./runtime";
import { UsingDisposable } from "./lifetime";

const INT32_MIN = -2147483648
const INT32_MAX = 2147483647
export const INVALID_HOST_REF_ID = 0 as HostRefId

function getGroupId(id: HostRefId): number {
  return id >> 8
}

/**
 * HostRefMap stores references to host JavaScript based on an auto-incrementing id.
 */
export class HostRefMap {
  private nextId = INT32_MIN
  private freelist: HostRefId[] = []
  private groups = new Map<number, Map<HostRefId, object>>()

  put(value: object): HostRefId {
    const id = this.allocateId()
    const groupId = getGroupId(id)
    let group = this.groups.get(groupId)
    if (!group) {
      group = new Map()
      this.groups.set(groupId, group)
    }
    group.set(id, value)
    return id
  }

  get(id: HostRefId): object {
    if (id === INVALID_HOST_REF_ID) {
      throw new QuickJSHostRefInvalid("no host reference id defined")
    }

    const groupId = getGroupId(id)
    const group = this.groups.get(groupId)
    if (!group) {
      throw new QuickJSHostRefInvalid(`host reference id ${id} is not defined`)
    }

    const value = group.get(id)
    if (!value) {
      throw new QuickJSHostRefInvalid(`host reference id ${id} is not defined`)
    }

    return value
  }

  delete(id: HostRefId): void {
    if (id === INVALID_HOST_REF_ID) {
      throw new QuickJSHostRefInvalid("no host reference id defined")
    }

    const groupId = getGroupId(id)
    const group = this.groups.get(groupId)
    if (!group) {
      throw new QuickJSHostRefInvalid(`host reference id ${id} is not defined`)
    }

    group.delete(id)
    if (group.size === 0) {
      this.groups.delete(groupId)
    }

    this.freelist.push(id)
  }

  private allocateId(): HostRefId {
    if (this.freelist.length > 0) {
      return this.freelist.shift()!
    }

    if (this.nextId === INVALID_HOST_REF_ID) {
      this.nextId++
    }

    if (this.nextId > INT32_MAX) {
      throw new QuickJSHostRefRangeExceeded(`HostRefMap: too many host refs created without disposing. Max simultaneous host refs: ${INT32_MAX - INT32_MIN}`)
    }

    return this.nextId++ as HostRefId
  }
}

/**
 * HostRef represents a reference to a host value from a QuickJS guest.
 * 
 * The host value is stored with a strong reference in a map within the runtime.
 * Once all references to the HostRef's handle are disposed and there are no
 * more references from the guest, the host value will be removed from the map.
 * 
 * This abstraction allows passing values to the guest that need to keep a host
 * value alive for their method callbacks.
 * 
 * Note that there may be multiple HostRef instances pointing to the same host
 * value slot in the runtime.
 */
export class HostRef<T extends object> extends UsingDisposable implements Disposable {
  constructor(
    public readonly runtime: QuickJSRuntime,
    public readonly handle: QuickJSHandle,
    public readonly id: HostRefId,
  ) {
    if (id === INVALID_HOST_REF_ID) {
      throw new QuickJSHostRefInvalid("cannot create HostRef with undefined id")
    }

    super()
  }

  /** true if *this instance's* handle is alive */
  get alive(): boolean {
    return this.handle.alive
  }

  /** Dispose this instance's handle */
  dispose(): void {
    this.handle.dispose()
  }

  /**
   * Retrieve the host value
   * @throws {@link QuickJSHostRefInvalid} if the host value was freed once all reference handles were disposed
   */
  get value(): T {
    return this.runtime.hostRefs.get(this.id) as T
  }
}