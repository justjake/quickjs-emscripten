"use strict"
;(() => {
  var ha = Object.create
  var Rn = Object.defineProperty
  var Sa = Object.getOwnPropertyDescriptor
  var pa = Object.getOwnPropertyNames
  var Ta = Object.getPrototypeOf,
    va = Object.prototype.hasOwnProperty
  var zt = ((i) =>
    typeof require < "u"
      ? require
      : typeof Proxy < "u"
        ? new Proxy(i, { get: (l, e) => (typeof require < "u" ? require : l)[e] })
        : i)(function (i) {
    if (typeof require < "u") return require.apply(this, arguments)
    throw Error('Dynamic require of "' + i + '" is not supported')
  })
  var ar = (i, l) => () => (i && (l = i((i = 0))), l)
  var Nr = (i, l) => {
      for (var e in l) Rn(i, e, { get: l[e], enumerable: !0 })
    },
    ya = (i, l, e, T) => {
      if ((l && typeof l == "object") || typeof l == "function")
        for (let A of pa(l))
          !va.call(i, A) &&
            A !== e &&
            Rn(i, A, { get: () => l[A], enumerable: !(T = Sa(l, A)) || T.enumerable })
      return i
    }
  var Jt = (i, l, e) => (
    (e = i != null ? ha(Ta(i)) : {}),
    ya(l || !i || !i.__esModule ? Rn(e, "default", { value: i, enumerable: !0 }) : e, i)
  )
  function Ge(i) {
    return function (...l) {
      let e = i(...l)
      if (e && typeof e == "object" && e instanceof Promise)
        throw new Error("Function unexpectedly returned a Promise")
      return e
    }
  }
  var nt,
    Mt = ar(() => {
      "use strict"
      nt = {
        JS_EVAL_TYPE_GLOBAL: 0,
        JS_EVAL_TYPE_MODULE: 1,
        JS_EVAL_TYPE_DIRECT: 2,
        JS_EVAL_TYPE_INDIRECT: 3,
        JS_EVAL_TYPE_MASK: 3,
        JS_EVAL_FLAG_STRICT: 8,
        JS_EVAL_FLAG_STRIP: 16,
        JS_EVAL_FLAG_COMPILE_ONLY: 32,
        JS_EVAL_FLAG_BACKTRACE_BARRIER: 64,
      }
    })
  function* Bi(i) {
    return yield i
  }
  function ga(i) {
    return Bi(In(i))
  }
  function Ii(i, l) {
    return (...e) => {
      let T = l.call(i, Dn, ...e)
      return In(T)
    }
  }
  function Qa(i, l) {
    let e = l.call(i, Dn)
    return In(e)
  }
  function In(i) {
    function l(e) {
      return e.done
        ? e.value
        : e.value instanceof Promise
          ? e.value.then(
              (T) => l(i.next(T)),
              (T) => l(i.throw(T)),
            )
          : l(i.next(e.value))
    }
    return l(i.next())
  }
  function Pn(i, l) {
    let e
    try {
      i.dispose()
    } catch (T) {
      e = T
    }
    if (l && e)
      throw (
        (Object.assign(l, {
          message: `${l.message}
 Then, failed to dispose scope: ${e.message}`,
          disposeError: e,
        }),
        l)
      )
    if (l || e) throw l || e
  }
  function On(i) {
    if (typeof i == "number") return i
    if (i === void 0) return 0
    let { type: l, strict: e, strip: T, compileOnly: A, backtraceBarrier: N } = i,
      x = 0
    return (
      l === "global" && (x |= nt.JS_EVAL_TYPE_GLOBAL),
      l === "module" && (x |= nt.JS_EVAL_TYPE_MODULE),
      e && (x |= nt.JS_EVAL_FLAG_STRICT),
      T && (x |= nt.JS_EVAL_FLAG_STRIP),
      A && (x |= nt.JS_EVAL_FLAG_COMPILE_ONLY),
      N && (x |= nt.JS_EVAL_FLAG_BACKTRACE_BARRIER),
      x
    )
  }
  function Ea(...i) {
    let l = []
    for (let e of i) e !== void 0 && (l = l.concat(e))
    return l
  }
  function xt(i, l) {
    l.interruptHandler && i.setInterruptHandler(l.interruptHandler),
      l.maxStackSizeBytes !== void 0 && i.setMaxStackSize(l.maxStackSizeBytes),
      l.memoryLimitBytes !== void 0 && i.setMemoryLimit(l.memoryLimitBytes)
  }
  function Dt(i, l) {
    l.moduleLoader && i.setModuleLoader(l.moduleLoader),
      l.shouldInterrupt && i.setInterruptHandler(l.shouldInterrupt),
      l.memoryLimitBytes !== void 0 && i.setMemoryLimit(l.memoryLimitBytes),
      l.maxStackSizeBytes !== void 0 && i.setMaxStackSize(l.maxStackSizeBytes)
  }
  var wa,
    ba,
    ji,
    sr,
    Oi,
    kn,
    Li,
    Mn,
    xn,
    Ui,
    Gi,
    Nt,
    Dn,
    Ce,
    Jr,
    Nn,
    Fr,
    Vi,
    zi,
    ms,
    jn,
    Fa,
    $t,
    Yt,
    Aa,
    Ln,
    It,
    qt = ar(() => {
      "use strict"
      Mt()
      ;(wa = Object.defineProperty),
        (ba = (i, l) => {
          for (var e in l) wa(i, e, { get: l[e], enumerable: !0 })
        }),
        (ji = !!(typeof process == "object" && process.env.QTS_DEBUG)),
        (sr = ji ? console.log.bind(console) : () => {}),
        (Oi = {})
      ba(Oi, {
        QuickJSAsyncifyError: () => Ui,
        QuickJSAsyncifySuspended: () => Gi,
        QuickJSMemoryLeakDetected: () => Nt,
        QuickJSNotImplemented: () => xn,
        QuickJSUnwrapError: () => kn,
        QuickJSUseAfterFree: () => Mn,
        QuickJSWrongOwner: () => Li,
      })
      ;(kn = class extends Error {
        constructor(i, l) {
          super(String(i)), (this.cause = i), (this.context = l), (this.name = "QuickJSUnwrapError")
        }
      }),
        (Li = class extends Error {
          constructor() {
            super(...arguments), (this.name = "QuickJSWrongOwner")
          }
        }),
        (Mn = class extends Error {
          constructor() {
            super(...arguments), (this.name = "QuickJSUseAfterFree")
          }
        }),
        (xn = class extends Error {
          constructor() {
            super(...arguments), (this.name = "QuickJSNotImplemented")
          }
        }),
        (Ui = class extends Error {
          constructor() {
            super(...arguments), (this.name = "QuickJSAsyncifyError")
          }
        }),
        (Gi = class extends Error {
          constructor() {
            super(...arguments), (this.name = "QuickJSAsyncifySuspended")
          }
        }),
        (Nt = class extends Error {
          constructor() {
            super(...arguments), (this.name = "QuickJSMemoryLeakDetected")
          }
        })
      Dn = Bi
      Dn.of = ga
      ;(Ce = class Hi {
        constructor(l, e, T, A) {
          ;(this._value = l),
            (this.copier = e),
            (this.disposer = T),
            (this._owner = A),
            (this._alive = !0),
            (this._constructorStack = ji ? new Error("Lifetime constructed").stack : void 0)
        }
        get alive() {
          return this._alive
        }
        get value() {
          return this.assertAlive(), this._value
        }
        get owner() {
          return this._owner
        }
        get dupable() {
          return !!this.copier
        }
        dup() {
          if ((this.assertAlive(), !this.copier)) throw new Error("Non-dupable lifetime")
          return new Hi(this.copier(this._value), this.copier, this.disposer, this._owner)
        }
        consume(l) {
          this.assertAlive()
          let e = l(this)
          return this.dispose(), e
        }
        dispose() {
          this.assertAlive(), this.disposer && this.disposer(this._value), (this._alive = !1)
        }
        assertAlive() {
          if (!this.alive)
            throw this._constructorStack
              ? new Mn(`Lifetime not alive
${this._constructorStack}
Lifetime used`)
              : new Mn("Lifetime not alive")
        }
      }),
        (Jr = class extends Ce {
          constructor(i, l) {
            super(i, void 0, void 0, l)
          }
          get dupable() {
            return !0
          }
          dup() {
            return this
          }
          dispose() {}
        }),
        (Nn = class extends Ce {
          constructor(i, l, e, T) {
            super(i, l, e, T)
          }
          dispose() {
            this._alive = !1
          }
        })
      ;(Fr = class Wt {
        constructor() {
          this._disposables = new Ce(new Set())
        }
        static withScope(l) {
          let e = new Wt(),
            T
          try {
            return l(e)
          } catch (A) {
            throw ((T = A), A)
          } finally {
            Pn(e, T)
          }
        }
        static withScopeMaybeAsync(l, e) {
          return Qa(void 0, function* (T) {
            let A = new Wt(),
              N
            try {
              return yield* T.of(e.call(l, T, A))
            } catch (x) {
              throw ((N = x), x)
            } finally {
              Pn(A, N)
            }
          })
        }
        static async withScopeAsync(l) {
          let e = new Wt(),
            T
          try {
            return await l(e)
          } catch (A) {
            throw ((T = A), A)
          } finally {
            Pn(e, T)
          }
        }
        manage(l) {
          return this._disposables.value.add(l), l
        }
        get alive() {
          return this._disposables.alive
        }
        dispose() {
          let l = Array.from(this._disposables.value.values()).reverse()
          for (let e of l) e.alive && e.dispose()
          this._disposables.dispose()
        }
      }),
        (Vi = class {
          constructor(i) {
            ;(this.resolve = (l) => {
              this.resolveHandle.alive &&
                (this.context
                  .unwrapResult(
                    this.context.callFunction(
                      this.resolveHandle,
                      this.context.undefined,
                      l || this.context.undefined,
                    ),
                  )
                  .dispose(),
                this.disposeResolvers(),
                this.onSettled())
            }),
              (this.reject = (l) => {
                this.rejectHandle.alive &&
                  (this.context
                    .unwrapResult(
                      this.context.callFunction(
                        this.rejectHandle,
                        this.context.undefined,
                        l || this.context.undefined,
                      ),
                    )
                    .dispose(),
                  this.disposeResolvers(),
                  this.onSettled())
              }),
              (this.dispose = () => {
                this.handle.alive && this.handle.dispose(), this.disposeResolvers()
              }),
              (this.context = i.context),
              (this.owner = i.context.runtime),
              (this.handle = i.promiseHandle),
              (this.settled = new Promise((l) => {
                this.onSettled = l
              })),
              (this.resolveHandle = i.resolveHandle),
              (this.rejectHandle = i.rejectHandle)
          }
          get alive() {
            return this.handle.alive || this.resolveHandle.alive || this.rejectHandle.alive
          }
          disposeResolvers() {
            this.resolveHandle.alive && this.resolveHandle.dispose(),
              this.rejectHandle.alive && this.rejectHandle.dispose()
          }
        }),
        (zi = class {
          constructor(i) {
            this.module = i
          }
          toPointerArray(i) {
            let l = new Int32Array(i.map((A) => A.value)),
              e = l.length * l.BYTES_PER_ELEMENT,
              T = this.module._malloc(e)
            return (
              new Uint8Array(this.module.HEAPU8.buffer, T, e).set(new Uint8Array(l.buffer)),
              new Ce(T, void 0, (A) => this.module._free(A))
            )
          }
          newMutablePointerArray(i) {
            let l = new Int32Array(new Array(i).fill(0)),
              e = l.length * l.BYTES_PER_ELEMENT,
              T = this.module._malloc(e),
              A = new Int32Array(this.module.HEAPU8.buffer, T, i)
            return (
              A.set(l), new Ce({ typedArray: A, ptr: T }, void 0, (N) => this.module._free(N.ptr))
            )
          }
          newHeapCharPointer(i) {
            let l = this.module.lengthBytesUTF8(i) + 1,
              e = this.module._malloc(l)
            return this.module.stringToUTF8(i, e, l), new Ce(e, void 0, (T) => this.module._free(T))
          }
          newHeapBufferPointer(i) {
            let l = i.byteLength,
              e = this.module._malloc(l)
            return (
              this.module.HEAPU8.set(i, e),
              new Ce({ pointer: e, numBytes: l }, void 0, (T) => this.module._free(T.pointer))
            )
          }
          consumeHeapCharPointer(i) {
            let l = this.module.UTF8ToString(i)
            return this.module._free(i), l
          }
        }),
        (ms = Symbol("Unstable")),
        (jn = Symbol("DefaultIntrinsics"))
      ;(Fa = class extends zi {
        constructor(i) {
          super(i.module),
            (this.scope = new Fr()),
            (this.copyJSValue = (l) => this.ffi.QTS_DupValuePointer(this.ctx.value, l)),
            (this.freeJSValue = (l) => {
              this.ffi.QTS_FreeValuePointer(this.ctx.value, l)
            }),
            i.ownedLifetimes?.forEach((l) => this.scope.manage(l)),
            (this.owner = i.owner),
            (this.module = i.module),
            (this.ffi = i.ffi),
            (this.rt = i.rt),
            (this.ctx = this.scope.manage(i.ctx))
        }
        get alive() {
          return this.scope.alive
        }
        dispose() {
          return this.scope.dispose()
        }
        manage(i) {
          return this.scope.manage(i)
        }
        consumeJSCharPointer(i) {
          let l = this.module.UTF8ToString(i)
          return this.ffi.QTS_FreeCString(this.ctx.value, i), l
        }
        heapValueHandle(i) {
          return new Ce(i, this.copyJSValue, this.freeJSValue, this.owner)
        }
      }),
        ($t = class {
          constructor(i) {
            ;(this._undefined = void 0),
              (this._null = void 0),
              (this._false = void 0),
              (this._true = void 0),
              (this._global = void 0),
              (this._BigInt = void 0),
              (this.fnNextId = -32768),
              (this.fnMaps = new Map()),
              (this.cToHostCallbacks = {
                callFunction: (l, e, T, A, N) => {
                  if (l !== this.ctx.value)
                    throw new Error(
                      "QuickJSContext instance received C -> JS call with mismatched ctx",
                    )
                  let x = this.getFunction(N)
                  if (!x) throw new Error(`QuickJSContext had no callback with id ${N}`)
                  return Fr.withScopeMaybeAsync(this, function* (H, Y) {
                    let Te = Y.manage(
                        new Nn(e, this.memory.copyJSValue, this.memory.freeJSValue, this.runtime),
                      ),
                      ae = new Array(T)
                    for (let q = 0; q < T; q++) {
                      let be = this.ffi.QTS_ArgvGetJSValueConstPointer(A, q)
                      ae[q] = Y.manage(
                        new Nn(be, this.memory.copyJSValue, this.memory.freeJSValue, this.runtime),
                      )
                    }
                    try {
                      let q = yield* H(x.apply(Te, ae))
                      if (q) {
                        if ("error" in q && q.error) throw (sr("throw error", q.error), q.error)
                        let be = Y.manage(q instanceof Ce ? q : q.value)
                        return this.ffi.QTS_DupValuePointer(this.ctx.value, be.value)
                      }
                      return 0
                    } catch (q) {
                      return this.errorToHandle(q).consume((be) =>
                        this.ffi.QTS_Throw(this.ctx.value, be.value),
                      )
                    }
                  })
                },
              }),
              (this.runtime = i.runtime),
              (this.module = i.module),
              (this.ffi = i.ffi),
              (this.rt = i.rt),
              (this.ctx = i.ctx),
              (this.memory = new Fa({ ...i, owner: this.runtime })),
              i.callbacks.setContextCallbacks(this.ctx.value, this.cToHostCallbacks),
              (this.dump = this.dump.bind(this)),
              (this.getString = this.getString.bind(this)),
              (this.getNumber = this.getNumber.bind(this)),
              (this.resolvePromise = this.resolvePromise.bind(this))
          }
          get alive() {
            return this.memory.alive
          }
          dispose() {
            this.memory.dispose()
          }
          get undefined() {
            if (this._undefined) return this._undefined
            let i = this.ffi.QTS_GetUndefined()
            return (this._undefined = new Jr(i))
          }
          get null() {
            if (this._null) return this._null
            let i = this.ffi.QTS_GetNull()
            return (this._null = new Jr(i))
          }
          get true() {
            if (this._true) return this._true
            let i = this.ffi.QTS_GetTrue()
            return (this._true = new Jr(i))
          }
          get false() {
            if (this._false) return this._false
            let i = this.ffi.QTS_GetFalse()
            return (this._false = new Jr(i))
          }
          get global() {
            if (this._global) return this._global
            let i = this.ffi.QTS_GetGlobalObject(this.ctx.value)
            return (
              this.memory.manage(this.memory.heapValueHandle(i)),
              (this._global = new Jr(i, this.runtime)),
              this._global
            )
          }
          newNumber(i) {
            return this.memory.heapValueHandle(this.ffi.QTS_NewFloat64(this.ctx.value, i))
          }
          newString(i) {
            let l = this.memory
              .newHeapCharPointer(i)
              .consume((e) => this.ffi.QTS_NewString(this.ctx.value, e.value))
            return this.memory.heapValueHandle(l)
          }
          newUniqueSymbol(i) {
            let l = (typeof i == "symbol" ? i.description : i) ?? "",
              e = this.memory
                .newHeapCharPointer(l)
                .consume((T) => this.ffi.QTS_NewSymbol(this.ctx.value, T.value, 0))
            return this.memory.heapValueHandle(e)
          }
          newSymbolFor(i) {
            let l = (typeof i == "symbol" ? i.description : i) ?? "",
              e = this.memory
                .newHeapCharPointer(l)
                .consume((T) => this.ffi.QTS_NewSymbol(this.ctx.value, T.value, 1))
            return this.memory.heapValueHandle(e)
          }
          newBigInt(i) {
            if (!this._BigInt) {
              let T = this.getProp(this.global, "BigInt")
              this.memory.manage(T), (this._BigInt = new Jr(T.value, this.runtime))
            }
            let l = this._BigInt,
              e = String(i)
            return this.newString(e).consume((T) =>
              this.unwrapResult(this.callFunction(l, this.undefined, T)),
            )
          }
          newObject(i) {
            i && this.runtime.assertOwned(i)
            let l = i
              ? this.ffi.QTS_NewObjectProto(this.ctx.value, i.value)
              : this.ffi.QTS_NewObject(this.ctx.value)
            return this.memory.heapValueHandle(l)
          }
          newArray() {
            let i = this.ffi.QTS_NewArray(this.ctx.value)
            return this.memory.heapValueHandle(i)
          }
          newArrayBuffer(i) {
            let l = new Uint8Array(i),
              e = this.memory.newHeapBufferPointer(l),
              T = this.ffi.QTS_NewArrayBuffer(this.ctx.value, e.value.pointer, l.length)
            return this.memory.heapValueHandle(T)
          }
          newPromise(i) {
            let l = Fr.withScope((e) => {
              let T = e.manage(this.memory.newMutablePointerArray(2)),
                A = this.ffi.QTS_NewPromiseCapability(this.ctx.value, T.value.ptr),
                N = this.memory.heapValueHandle(A),
                [x, H] = Array.from(T.value.typedArray).map((Y) => this.memory.heapValueHandle(Y))
              return new Vi({ context: this, promiseHandle: N, resolveHandle: x, rejectHandle: H })
            })
            return (
              i && typeof i == "function" && (i = new Promise(i)),
              i &&
                Promise.resolve(i).then(l.resolve, (e) =>
                  e instanceof Ce ? l.reject(e) : this.newError(e).consume(l.reject),
                ),
              l
            )
          }
          newFunction(i, l) {
            let e = ++this.fnNextId
            return (
              this.setFunction(e, l),
              this.memory.heapValueHandle(this.ffi.QTS_NewFunction(this.ctx.value, e, i))
            )
          }
          newError(i) {
            let l = this.memory.heapValueHandle(this.ffi.QTS_NewError(this.ctx.value))
            return (
              i && typeof i == "object"
                ? (i.name !== void 0 &&
                    this.newString(i.name).consume((e) => this.setProp(l, "name", e)),
                  i.message !== void 0 &&
                    this.newString(i.message).consume((e) => this.setProp(l, "message", e)))
                : typeof i == "string"
                  ? this.newString(i).consume((e) => this.setProp(l, "message", e))
                  : i !== void 0 &&
                    this.newString(String(i)).consume((e) => this.setProp(l, "message", e)),
              l
            )
          }
          typeof(i) {
            return (
              this.runtime.assertOwned(i),
              this.memory.consumeHeapCharPointer(this.ffi.QTS_Typeof(this.ctx.value, i.value))
            )
          }
          getNumber(i) {
            return this.runtime.assertOwned(i), this.ffi.QTS_GetFloat64(this.ctx.value, i.value)
          }
          getString(i) {
            return (
              this.runtime.assertOwned(i),
              this.memory.consumeJSCharPointer(this.ffi.QTS_GetString(this.ctx.value, i.value))
            )
          }
          getSymbol(i) {
            this.runtime.assertOwned(i)
            let l = this.memory.consumeJSCharPointer(
              this.ffi.QTS_GetSymbolDescriptionOrKey(this.ctx.value, i.value),
            )
            return this.ffi.QTS_IsGlobalSymbol(this.ctx.value, i.value) ? Symbol.for(l) : Symbol(l)
          }
          getBigInt(i) {
            this.runtime.assertOwned(i)
            let l = this.getString(i)
            return BigInt(l)
          }
          getArrayBuffer(i) {
            this.runtime.assertOwned(i)
            let l = this.ffi.QTS_GetArrayBufferLength(this.ctx.value, i.value),
              e = this.ffi.QTS_GetArrayBuffer(this.ctx.value, i.value)
            if (!e) throw new Error("Couldn't allocate memory to get ArrayBuffer")
            return new Ce(this.module.HEAPU8.subarray(e, e + l), void 0, () => this.module._free(e))
          }
          resolvePromise(i) {
            this.runtime.assertOwned(i)
            let l = Fr.withScope((e) => {
              let T = e.manage(this.getProp(this.global, "Promise")),
                A = e.manage(this.getProp(T, "resolve"))
              return this.callFunction(A, T, i)
            })
            return l.error
              ? Promise.resolve(l)
              : new Promise((e) => {
                  Fr.withScope((T) => {
                    let A = T.manage(
                        this.newFunction("resolve", (Y) => {
                          e({ value: Y && Y.dup() })
                        }),
                      ),
                      N = T.manage(
                        this.newFunction("reject", (Y) => {
                          e({ error: Y && Y.dup() })
                        }),
                      ),
                      x = T.manage(l.value),
                      H = T.manage(this.getProp(x, "then"))
                    this.unwrapResult(this.callFunction(H, x, A, N)).dispose()
                  })
                })
          }
          getProp(i, l) {
            this.runtime.assertOwned(i)
            let e = this.borrowPropertyKey(l).consume((T) =>
              this.ffi.QTS_GetProp(this.ctx.value, i.value, T.value),
            )
            return this.memory.heapValueHandle(e)
          }
          setProp(i, l, e) {
            this.runtime.assertOwned(i),
              this.borrowPropertyKey(l).consume((T) =>
                this.ffi.QTS_SetProp(this.ctx.value, i.value, T.value, e.value),
              )
          }
          defineProp(i, l, e) {
            this.runtime.assertOwned(i),
              Fr.withScope((T) => {
                let A = T.manage(this.borrowPropertyKey(l)),
                  N = e.value || this.undefined,
                  x = !!e.configurable,
                  H = !!e.enumerable,
                  Y = !!e.value,
                  Te = e.get ? T.manage(this.newFunction(e.get.name, e.get)) : this.undefined,
                  ae = e.set ? T.manage(this.newFunction(e.set.name, e.set)) : this.undefined
                this.ffi.QTS_DefineProp(
                  this.ctx.value,
                  i.value,
                  A.value,
                  N.value,
                  Te.value,
                  ae.value,
                  x,
                  H,
                  Y,
                )
              })
          }
          callFunction(i, l, ...e) {
            this.runtime.assertOwned(i)
            let T = this.memory
                .toPointerArray(e)
                .consume((N) =>
                  this.ffi.QTS_Call(this.ctx.value, i.value, l.value, e.length, N.value),
                ),
              A = this.ffi.QTS_ResolveException(this.ctx.value, T)
            return A
              ? (this.ffi.QTS_FreeValuePointer(this.ctx.value, T),
                { error: this.memory.heapValueHandle(A) })
              : { value: this.memory.heapValueHandle(T) }
          }
          evalCode(i, l = "eval.js", e) {
            let T = e === void 0 ? 1 : 0,
              A = On(e),
              N = this.memory
                .newHeapCharPointer(i)
                .consume((H) => this.ffi.QTS_Eval(this.ctx.value, H.value, l, T, A)),
              x = this.ffi.QTS_ResolveException(this.ctx.value, N)
            return x
              ? (this.ffi.QTS_FreeValuePointer(this.ctx.value, N),
                { error: this.memory.heapValueHandle(x) })
              : { value: this.memory.heapValueHandle(N) }
          }
          throw(i) {
            return this.errorToHandle(i).consume((l) => this.ffi.QTS_Throw(this.ctx.value, l.value))
          }
          borrowPropertyKey(i) {
            return typeof i == "number"
              ? this.newNumber(i)
              : typeof i == "string"
                ? this.newString(i)
                : new Jr(i.value, this.runtime)
          }
          getMemory(i) {
            if (i === this.rt.value) return this.memory
            throw new Error("Private API. Cannot get memory from a different runtime")
          }
          dump(i) {
            this.runtime.assertOwned(i)
            let l = this.typeof(i)
            if (l === "string") return this.getString(i)
            if (l === "number") return this.getNumber(i)
            if (l === "bigint") return this.getBigInt(i)
            if (l === "undefined") return
            if (l === "symbol") return this.getSymbol(i)
            let e = this.memory.consumeJSCharPointer(this.ffi.QTS_Dump(this.ctx.value, i.value))
            try {
              return JSON.parse(e)
            } catch {
              return e
            }
          }
          unwrapResult(i) {
            if (i.error) {
              let l = "context" in i.error ? i.error.context : this,
                e = i.error.consume((T) => this.dump(T))
              if (e && typeof e == "object" && typeof e.message == "string") {
                let { message: T, name: A, stack: N } = e,
                  x = new kn(""),
                  H = x.stack
                throw (
                  (typeof A == "string" && (x.name = e.name),
                  typeof N == "string" &&
                    (x.stack = `${A}: ${T}
${e.stack}Host: ${H}`),
                  Object.assign(x, { cause: e, context: l, message: T }),
                  x)
                )
              }
              throw new kn(e, l)
            }
            return i.value
          }
          getFunction(i) {
            let l = i >> 8,
              e = this.fnMaps.get(l)
            if (e) return e.get(i)
          }
          setFunction(i, l) {
            let e = i >> 8,
              T = this.fnMaps.get(e)
            return T || ((T = new Map()), this.fnMaps.set(e, T)), T.set(i, l)
          }
          errorToHandle(i) {
            return i instanceof Ce ? i : this.newError(i)
          }
          encodeBinaryJSON(i) {
            let l = this.ffi.QTS_bjson_encode(this.ctx.value, i.value)
            return this.memory.heapValueHandle(l)
          }
          decodeBinaryJSON(i) {
            let l = this.ffi.QTS_bjson_decode(this.ctx.value, i.value)
            return this.memory.heapValueHandle(l)
          }
        }),
        (Yt = class {
          constructor(i) {
            ;(this.scope = new Fr()),
              (this.contextMap = new Map()),
              (this.cToHostCallbacks = {
                shouldInterrupt: (l) => {
                  if (l !== this.rt.value)
                    throw new Error(
                      "QuickJSContext instance received C -> JS interrupt with mismatched rt",
                    )
                  let e = this.interruptHandler
                  if (!e) throw new Error("QuickJSContext had no interrupt handler")
                  return e(this) ? 1 : 0
                },
                loadModuleSource: Ii(this, function* (l, e, T, A) {
                  let N = this.moduleLoader
                  if (!N) throw new Error("Runtime has no module loader")
                  if (e !== this.rt.value) throw new Error("Runtime pointer mismatch")
                  let x = this.contextMap.get(T) ?? this.newContext({ contextPointer: T })
                  try {
                    let H = yield* l(N(A, x))
                    if (typeof H == "object" && "error" in H && H.error)
                      throw (sr("cToHostLoadModule: loader returned error", H.error), H.error)
                    let Y = typeof H == "string" ? H : "value" in H ? H.value : H
                    return this.memory.newHeapCharPointer(Y).value
                  } catch (H) {
                    return sr("cToHostLoadModule: caught error", H), x.throw(H), 0
                  }
                }),
                normalizeModule: Ii(this, function* (l, e, T, A, N) {
                  let x = this.moduleNormalizer
                  if (!x) throw new Error("Runtime has no module normalizer")
                  if (e !== this.rt.value) throw new Error("Runtime pointer mismatch")
                  let H = this.contextMap.get(T) ?? this.newContext({ contextPointer: T })
                  try {
                    let Y = yield* l(x(A, N, H))
                    if (typeof Y == "object" && "error" in Y && Y.error)
                      throw (
                        (sr("cToHostNormalizeModule: normalizer returned error", Y.error), Y.error)
                      )
                    let Te = typeof Y == "string" ? Y : Y.value
                    return H.getMemory(this.rt.value).newHeapCharPointer(Te).value
                  } catch (Y) {
                    return sr("normalizeModule: caught error", Y), H.throw(Y), 0
                  }
                }),
              }),
              i.ownedLifetimes?.forEach((l) => this.scope.manage(l)),
              (this.module = i.module),
              (this.memory = new zi(this.module)),
              (this.ffi = i.ffi),
              (this.rt = i.rt),
              (this.callbacks = i.callbacks),
              this.scope.manage(this.rt),
              this.callbacks.setRuntimeCallbacks(this.rt.value, this.cToHostCallbacks),
              (this.executePendingJobs = this.executePendingJobs.bind(this))
          }
          get alive() {
            return this.scope.alive
          }
          dispose() {
            return this.scope.dispose()
          }
          newContext(i = {}) {
            if (i.intrinsics && i.intrinsics !== jn)
              throw new Error("TODO: Custom intrinsics are not supported yet")
            let l = new Ce(
                i.contextPointer || this.ffi.QTS_NewContext(this.rt.value),
                void 0,
                (T) => {
                  this.contextMap.delete(T),
                    this.callbacks.deleteContext(T),
                    this.ffi.QTS_FreeContext(T)
                },
              ),
              e = new $t({
                module: this.module,
                ctx: l,
                ffi: this.ffi,
                rt: this.rt,
                ownedLifetimes: i.ownedLifetimes,
                runtime: this,
                callbacks: this.callbacks,
              })
            return this.contextMap.set(l.value, e), e
          }
          setModuleLoader(i, l) {
            ;(this.moduleLoader = i),
              (this.moduleNormalizer = l),
              this.ffi.QTS_RuntimeEnableModuleLoader(this.rt.value, this.moduleNormalizer ? 1 : 0)
          }
          removeModuleLoader() {
            ;(this.moduleLoader = void 0), this.ffi.QTS_RuntimeDisableModuleLoader(this.rt.value)
          }
          hasPendingJob() {
            return !!this.ffi.QTS_IsJobPending(this.rt.value)
          }
          setInterruptHandler(i) {
            let l = this.interruptHandler
            ;(this.interruptHandler = i),
              l || this.ffi.QTS_RuntimeEnableInterruptHandler(this.rt.value)
          }
          removeInterruptHandler() {
            this.interruptHandler &&
              (this.ffi.QTS_RuntimeDisableInterruptHandler(this.rt.value),
              (this.interruptHandler = void 0))
          }
          executePendingJobs(i = -1) {
            let l = this.memory.newMutablePointerArray(1),
              e = this.ffi.QTS_ExecutePendingJob(this.rt.value, i ?? -1, l.value.ptr),
              T = l.value.typedArray[0]
            if ((l.dispose(), T === 0))
              return this.ffi.QTS_FreeValuePointerRuntime(this.rt.value, e), { value: 0 }
            let A = this.contextMap.get(T) ?? this.newContext({ contextPointer: T }),
              N = A.getMemory(this.rt.value).heapValueHandle(e)
            if (A.typeof(N) === "number") {
              let x = A.getNumber(N)
              return N.dispose(), { value: x }
            } else return { error: Object.assign(N, { context: A }) }
          }
          setMemoryLimit(i) {
            if (i < 0 && i !== -1)
              throw new Error("Cannot set memory limit to negative number. To unset, pass -1")
            this.ffi.QTS_RuntimeSetMemoryLimit(this.rt.value, i)
          }
          computeMemoryUsage() {
            let i = this.getSystemContext().getMemory(this.rt.value)
            return i.heapValueHandle(
              this.ffi.QTS_RuntimeComputeMemoryUsage(this.rt.value, i.ctx.value),
            )
          }
          dumpMemoryUsage() {
            return this.memory.consumeHeapCharPointer(
              this.ffi.QTS_RuntimeDumpMemoryUsage(this.rt.value),
            )
          }
          setMaxStackSize(i) {
            if (i < 0)
              throw new Error("Cannot set memory limit to negative number. To unset, pass 0.")
            this.ffi.QTS_RuntimeSetMaxStackSize(this.rt.value, i)
          }
          assertOwned(i) {
            if (i.owner && i.owner.rt !== this.rt)
              throw new Li(
                `Handle is not owned by this runtime: ${i.owner.rt.value} != ${this.rt.value}`,
              )
          }
          getSystemContext() {
            return (
              this.context || (this.context = this.scope.manage(this.newContext())), this.context
            )
          }
        }),
        (Aa = class {
          constructor(i) {
            ;(this.callFunction = i.callFunction),
              (this.shouldInterrupt = i.shouldInterrupt),
              (this.loadModuleSource = i.loadModuleSource),
              (this.normalizeModule = i.normalizeModule)
          }
        }),
        (Ln = class {
          constructor(i) {
            ;(this.contextCallbacks = new Map()),
              (this.runtimeCallbacks = new Map()),
              (this.suspendedCount = 0),
              (this.cToHostCallbacks = new Aa({
                callFunction: (l, e, T, A, N, x) =>
                  this.handleAsyncify(l, () => {
                    try {
                      let H = this.contextCallbacks.get(e)
                      if (!H)
                        throw new Error(
                          `QuickJSContext(ctx = ${e}) not found for C function call "${x}"`,
                        )
                      return H.callFunction(e, T, A, N, x)
                    } catch (H) {
                      return console.error("[C to host error: returning null]", H), 0
                    }
                  }),
                shouldInterrupt: (l, e) =>
                  this.handleAsyncify(l, () => {
                    try {
                      let T = this.runtimeCallbacks.get(e)
                      if (!T) throw new Error(`QuickJSRuntime(rt = ${e}) not found for C interrupt`)
                      return T.shouldInterrupt(e)
                    } catch (T) {
                      return console.error("[C to host interrupt: returning error]", T), 1
                    }
                  }),
                loadModuleSource: (l, e, T, A) =>
                  this.handleAsyncify(l, () => {
                    try {
                      let N = this.runtimeCallbacks.get(e)
                      if (!N)
                        throw new Error(`QuickJSRuntime(rt = ${e}) not found for C module loader`)
                      let x = N.loadModuleSource
                      if (!x)
                        throw new Error(`QuickJSRuntime(rt = ${e}) does not support module loading`)
                      return x(e, T, A)
                    } catch (N) {
                      return console.error("[C to host module loader error: returning null]", N), 0
                    }
                  }),
                normalizeModule: (l, e, T, A, N) =>
                  this.handleAsyncify(l, () => {
                    try {
                      let x = this.runtimeCallbacks.get(e)
                      if (!x)
                        throw new Error(`QuickJSRuntime(rt = ${e}) not found for C module loader`)
                      let H = x.normalizeModule
                      if (!H)
                        throw new Error(`QuickJSRuntime(rt = ${e}) does not support module loading`)
                      return H(e, T, A, N)
                    } catch (x) {
                      return console.error("[C to host module loader error: returning null]", x), 0
                    }
                  }),
              })),
              (this.module = i),
              (this.module.callbacks = this.cToHostCallbacks)
          }
          setRuntimeCallbacks(i, l) {
            this.runtimeCallbacks.set(i, l)
          }
          deleteRuntime(i) {
            this.runtimeCallbacks.delete(i)
          }
          setContextCallbacks(i, l) {
            this.contextCallbacks.set(i, l)
          }
          deleteContext(i) {
            this.contextCallbacks.delete(i)
          }
          handleAsyncify(i, l) {
            if (i)
              return i.handleSleep((T) => {
                try {
                  let A = l()
                  if (!(A instanceof Promise)) {
                    sr("asyncify.handleSleep: not suspending:", A), T(A)
                    return
                  }
                  if (this.suspended)
                    throw new Ui(`Already suspended at: ${this.suspended.stack}
Attempted to suspend at:`)
                  ;(this.suspended = new Gi(`(${this.suspendedCount++})`)),
                    sr("asyncify.handleSleep: suspending:", this.suspended),
                    A.then(
                      (N) => {
                        ;(this.suspended = void 0), sr("asyncify.handleSleep: resolved:", N), T(N)
                      },
                      (N) => {
                        sr("asyncify.handleSleep: rejected:", N),
                          console.error("QuickJS: cannot handle error in suspended function", N),
                          (this.suspended = void 0)
                      },
                    )
                } catch (A) {
                  throw (sr("asyncify.handleSleep: error:", A), (this.suspended = void 0), A)
                }
              })
            let e = l()
            if (e instanceof Promise)
              throw new Error("Promise return value not supported in non-asyncify context.")
            return e
          }
        })
      It = class {
        constructor(i, l) {
          ;(this.module = i), (this.ffi = l), (this.callbacks = new Ln(i))
        }
        newRuntime(i = {}) {
          let l = new Ce(this.ffi.QTS_NewRuntime(), void 0, (T) => {
              this.callbacks.deleteRuntime(T), this.ffi.QTS_FreeRuntime(T)
            }),
            e = new Yt({ module: this.module, callbacks: this.callbacks, ffi: this.ffi, rt: l })
          return xt(e, i), i.moduleLoader && e.setModuleLoader(i.moduleLoader), e
        }
        newContext(i = {}) {
          let l = this.newRuntime(),
            e = l.newContext({ ...i, ownedLifetimes: Ea(l, i.ownedLifetimes) })
          return (l.context = e), e
        }
        evalCode(i, l = {}) {
          return Fr.withScope((e) => {
            let T = e.manage(this.newContext())
            Dt(T.runtime, l)
            let A = T.evalCode(i, "eval.js")
            if ((l.memoryLimitBytes !== void 0 && T.runtime.setMemoryLimit(-1), A.error))
              throw T.dump(e.manage(A.error))
            return T.dump(e.manage(A.value))
          })
        }
        getFFI() {
          return this.ffi
        }
      }
    })
  var Ji,
    Wi,
    Un,
    Gn = ar(() => {
      "use strict"
      qt()
      ;(Ji = class extends $t {
        async evalCodeAsync(i, l = "eval.js", e) {
          let T = e === void 0 ? 1 : 0,
            A = On(e),
            N = 0
          try {
            N = await this.memory
              .newHeapCharPointer(i)
              .consume((H) => this.ffi.QTS_Eval_MaybeAsync(this.ctx.value, H.value, l, T, A))
          } catch (H) {
            throw (sr("QTS_Eval_MaybeAsync threw", H), H)
          }
          let x = this.ffi.QTS_ResolveException(this.ctx.value, N)
          return x
            ? (this.ffi.QTS_FreeValuePointer(this.ctx.value, N),
              { error: this.memory.heapValueHandle(x) })
            : { value: this.memory.heapValueHandle(N) }
        }
        newAsyncifiedFunction(i, l) {
          return this.newFunction(i, l)
        }
      }),
        (Wi = class extends Yt {
          constructor(i) {
            super(i)
          }
          newContext(i = {}) {
            if (i.intrinsics && i.intrinsics !== jn)
              throw new Error("TODO: Custom intrinsics are not supported yet")
            let l = new Ce(this.ffi.QTS_NewContext(this.rt.value), void 0, (T) => {
                this.contextMap.delete(T),
                  this.callbacks.deleteContext(T),
                  this.ffi.QTS_FreeContext(T)
              }),
              e = new Ji({
                module: this.module,
                ctx: l,
                ffi: this.ffi,
                rt: this.rt,
                ownedLifetimes: [],
                runtime: this,
                callbacks: this.callbacks,
              })
            return this.contextMap.set(l.value, e), e
          }
          setModuleLoader(i, l) {
            super.setModuleLoader(i, l)
          }
          setMaxStackSize(i) {
            return super.setMaxStackSize(i)
          }
        }),
        (Un = class extends It {
          constructor(i, l) {
            super(i, l), (this.ffi = l), (this.module = i)
          }
          newRuntime(i = {}) {
            let l = new Ce(this.ffi.QTS_NewRuntime(), void 0, (T) => {
                this.callbacks.deleteRuntime(T), this.ffi.QTS_FreeRuntime(T)
              }),
              e = new Wi({ module: this.module, ffi: this.ffi, rt: l, callbacks: this.callbacks })
            return xt(e, i), i.moduleLoader && e.setModuleLoader(i.moduleLoader), e
          }
          newContext(i = {}) {
            let l = this.newRuntime(),
              e = i.ownedLifetimes ? i.ownedLifetimes.concat([l]) : [l],
              T = l.newContext({ ...i, ownedLifetimes: e })
            return (l.context = T), T
          }
          evalCode() {
            throw new xn("QuickJSWASMModuleAsyncify.evalCode: use evalCodeAsync instead")
          }
          evalCodeAsync(i, l) {
            return Fr.withScopeAsync(async (e) => {
              let T = e.manage(this.newContext())
              Dt(T.runtime, l)
              let A = await T.evalCodeAsync(i, "eval.js")
              if ((l.memoryLimitBytes !== void 0 && T.runtime.setMemoryLimit(-1), A.error))
                throw T.dump(e.manage(A.error))
              return T.dump(e.manage(A.value))
            })
          }
        })
    })
  var $i = {}
  Nr($i, {
    QuickJSModuleCallbacks: () => Ln,
    QuickJSWASMModule: () => It,
    applyBaseRuntimeOptions: () => xt,
    applyModuleEvalRuntimeOptions: () => Dt,
  })
  var Yi = ar(() => {
    "use strict"
    qt()
  })
  var qi = {}
  Nr(qi, { QuickJSAsyncWASMModule: () => Un })
  var Ki = ar(() => {
    "use strict"
    Gn()
  })
  var eo = {}
  Nr(eo, { QuickJSFFI: () => Ca })
  var Ca,
    ro = ar(() => {
      "use strict"
      Ca = class {
        constructor(i) {
          ;(this.module = i),
            (this.DEBUG = !0),
            (this.QTS_Throw = this.module.cwrap("QTS_Throw", "number", ["number", "number"])),
            (this.QTS_NewError = this.module.cwrap("QTS_NewError", "number", ["number"])),
            (this.QTS_RuntimeSetMemoryLimit = this.module.cwrap("QTS_RuntimeSetMemoryLimit", null, [
              "number",
              "number",
            ])),
            (this.QTS_RuntimeComputeMemoryUsage = this.module.cwrap(
              "QTS_RuntimeComputeMemoryUsage",
              "number",
              ["number", "number"],
            )),
            (this.QTS_RuntimeDumpMemoryUsage = this.module.cwrap(
              "QTS_RuntimeDumpMemoryUsage",
              "number",
              ["number"],
            )),
            (this.QTS_RecoverableLeakCheck = this.module.cwrap(
              "QTS_RecoverableLeakCheck",
              "number",
              [],
            )),
            (this.QTS_BuildIsSanitizeLeak = this.module.cwrap(
              "QTS_BuildIsSanitizeLeak",
              "number",
              [],
            )),
            (this.QTS_RuntimeSetMaxStackSize = this.module.cwrap(
              "QTS_RuntimeSetMaxStackSize",
              null,
              ["number", "number"],
            )),
            (this.QTS_GetUndefined = this.module.cwrap("QTS_GetUndefined", "number", [])),
            (this.QTS_GetNull = this.module.cwrap("QTS_GetNull", "number", [])),
            (this.QTS_GetFalse = this.module.cwrap("QTS_GetFalse", "number", [])),
            (this.QTS_GetTrue = this.module.cwrap("QTS_GetTrue", "number", [])),
            (this.QTS_NewRuntime = this.module.cwrap("QTS_NewRuntime", "number", [])),
            (this.QTS_FreeRuntime = this.module.cwrap("QTS_FreeRuntime", null, ["number"])),
            (this.QTS_NewContext = this.module.cwrap("QTS_NewContext", "number", ["number"])),
            (this.QTS_FreeContext = this.module.cwrap("QTS_FreeContext", null, ["number"])),
            (this.QTS_FreeValuePointer = this.module.cwrap("QTS_FreeValuePointer", null, [
              "number",
              "number",
            ])),
            (this.QTS_FreeValuePointerRuntime = this.module.cwrap(
              "QTS_FreeValuePointerRuntime",
              null,
              ["number", "number"],
            )),
            (this.QTS_FreeVoidPointer = this.module.cwrap("QTS_FreeVoidPointer", null, [
              "number",
              "number",
            ])),
            (this.QTS_FreeCString = this.module.cwrap("QTS_FreeCString", null, [
              "number",
              "number",
            ])),
            (this.QTS_DupValuePointer = this.module.cwrap("QTS_DupValuePointer", "number", [
              "number",
              "number",
            ])),
            (this.QTS_NewObject = this.module.cwrap("QTS_NewObject", "number", ["number"])),
            (this.QTS_NewObjectProto = this.module.cwrap("QTS_NewObjectProto", "number", [
              "number",
              "number",
            ])),
            (this.QTS_NewArray = this.module.cwrap("QTS_NewArray", "number", ["number"])),
            (this.QTS_NewArrayBuffer = this.module.cwrap("QTS_NewArrayBuffer", "number", [
              "number",
              "number",
              "number",
            ])),
            (this.QTS_NewFloat64 = this.module.cwrap("QTS_NewFloat64", "number", [
              "number",
              "number",
            ])),
            (this.QTS_GetFloat64 = this.module.cwrap("QTS_GetFloat64", "number", [
              "number",
              "number",
            ])),
            (this.QTS_NewString = this.module.cwrap("QTS_NewString", "number", [
              "number",
              "number",
            ])),
            (this.QTS_GetString = this.module.cwrap("QTS_GetString", "number", [
              "number",
              "number",
            ])),
            (this.QTS_GetArrayBuffer = this.module.cwrap("QTS_GetArrayBuffer", "number", [
              "number",
              "number",
            ])),
            (this.QTS_GetArrayBufferLength = this.module.cwrap(
              "QTS_GetArrayBufferLength",
              "number",
              ["number", "number"],
            )),
            (this.QTS_NewSymbol = this.module.cwrap("QTS_NewSymbol", "number", [
              "number",
              "number",
              "number",
            ])),
            (this.QTS_GetSymbolDescriptionOrKey = this.module.cwrap(
              "QTS_GetSymbolDescriptionOrKey",
              "number",
              ["number", "number"],
            )),
            (this.QTS_IsGlobalSymbol = this.module.cwrap("QTS_IsGlobalSymbol", "number", [
              "number",
              "number",
            ])),
            (this.QTS_IsJobPending = this.module.cwrap("QTS_IsJobPending", "number", ["number"])),
            (this.QTS_ExecutePendingJob = this.module.cwrap("QTS_ExecutePendingJob", "number", [
              "number",
              "number",
              "number",
            ])),
            (this.QTS_GetProp = this.module.cwrap("QTS_GetProp", "number", [
              "number",
              "number",
              "number",
            ])),
            (this.QTS_SetProp = this.module.cwrap("QTS_SetProp", null, [
              "number",
              "number",
              "number",
              "number",
            ])),
            (this.QTS_DefineProp = this.module.cwrap("QTS_DefineProp", null, [
              "number",
              "number",
              "number",
              "number",
              "number",
              "number",
              "boolean",
              "boolean",
              "boolean",
            ])),
            (this.QTS_Call = this.module.cwrap("QTS_Call", "number", [
              "number",
              "number",
              "number",
              "number",
              "number",
            ])),
            (this.QTS_ResolveException = this.module.cwrap("QTS_ResolveException", "number", [
              "number",
              "number",
            ])),
            (this.QTS_Dump = this.module.cwrap("QTS_Dump", "number", ["number", "number"])),
            (this.QTS_Eval = this.module.cwrap("QTS_Eval", "number", [
              "number",
              "number",
              "string",
              "number",
              "number",
            ])),
            (this.QTS_Typeof = this.module.cwrap("QTS_Typeof", "number", ["number", "number"])),
            (this.QTS_GetGlobalObject = this.module.cwrap("QTS_GetGlobalObject", "number", [
              "number",
            ])),
            (this.QTS_NewPromiseCapability = this.module.cwrap(
              "QTS_NewPromiseCapability",
              "number",
              ["number", "number"],
            )),
            (this.QTS_TestStringArg = this.module.cwrap("QTS_TestStringArg", null, ["string"])),
            (this.QTS_BuildIsDebug = this.module.cwrap("QTS_BuildIsDebug", "number", [])),
            (this.QTS_BuildIsAsyncify = this.module.cwrap("QTS_BuildIsAsyncify", "number", [])),
            (this.QTS_NewFunction = this.module.cwrap("QTS_NewFunction", "number", [
              "number",
              "number",
              "string",
            ])),
            (this.QTS_ArgvGetJSValueConstPointer = this.module.cwrap(
              "QTS_ArgvGetJSValueConstPointer",
              "number",
              ["number", "number"],
            )),
            (this.QTS_RuntimeEnableInterruptHandler = this.module.cwrap(
              "QTS_RuntimeEnableInterruptHandler",
              null,
              ["number"],
            )),
            (this.QTS_RuntimeDisableInterruptHandler = this.module.cwrap(
              "QTS_RuntimeDisableInterruptHandler",
              null,
              ["number"],
            )),
            (this.QTS_RuntimeEnableModuleLoader = this.module.cwrap(
              "QTS_RuntimeEnableModuleLoader",
              null,
              ["number", "number"],
            )),
            (this.QTS_RuntimeDisableModuleLoader = this.module.cwrap(
              "QTS_RuntimeDisableModuleLoader",
              null,
              ["number"],
            )),
            (this.QTS_bjson_encode = this.module.cwrap("QTS_bjson_encode", "number", [
              "number",
              "number",
            ])),
            (this.QTS_bjson_decode = this.module.cwrap("QTS_bjson_decode", "number", [
              "number",
              "number",
            ]))
        }
      }
    })
  var to = {}
  Nr(to, { default: () => Pa })
  var Kt,
    Ra,
    Pa,
    no = ar(() => {
      "use strict"
      ;(Kt = {}),
        (Ra = (() => {
          var i = Kt.url
          return async function (l = {}) {
            var e = l,
              T,
              A
            ;(e.ready = new Promise((r, t) => {
              ;(T = r), (A = t)
            })),
              [
                "_QTS_Throw",
                "_QTS_NewError",
                "_QTS_RuntimeSetMemoryLimit",
                "_QTS_RuntimeComputeMemoryUsage",
                "_QTS_RuntimeDumpMemoryUsage",
                "_QTS_RecoverableLeakCheck",
                "_QTS_BuildIsSanitizeLeak",
                "_QTS_RuntimeSetMaxStackSize",
                "_QTS_GetUndefined",
                "_QTS_GetNull",
                "_QTS_GetFalse",
                "_QTS_GetTrue",
                "_QTS_NewRuntime",
                "_QTS_FreeRuntime",
                "_QTS_NewContext",
                "_QTS_FreeContext",
                "_QTS_FreeValuePointer",
                "_QTS_FreeValuePointerRuntime",
                "_QTS_FreeVoidPointer",
                "_QTS_FreeCString",
                "_QTS_DupValuePointer",
                "_QTS_NewObject",
                "_QTS_NewObjectProto",
                "_QTS_NewArray",
                "_QTS_NewArrayBuffer",
                "_QTS_NewFloat64",
                "_QTS_GetFloat64",
                "_QTS_NewString",
                "_QTS_GetString",
                "_QTS_GetArrayBuffer",
                "_QTS_GetArrayBufferLength",
                "_QTS_NewSymbol",
                "_QTS_GetSymbolDescriptionOrKey",
                "_QTS_IsGlobalSymbol",
                "_QTS_IsJobPending",
                "_QTS_ExecutePendingJob",
                "_QTS_GetProp",
                "_QTS_SetProp",
                "_QTS_DefineProp",
                "_QTS_Call",
                "_QTS_ResolveException",
                "_QTS_Dump",
                "_QTS_Eval",
                "_QTS_Typeof",
                "_QTS_GetGlobalObject",
                "_QTS_NewPromiseCapability",
                "_QTS_TestStringArg",
                "_QTS_BuildIsDebug",
                "_QTS_BuildIsAsyncify",
                "_QTS_NewFunction",
                "_QTS_ArgvGetJSValueConstPointer",
                "_QTS_RuntimeEnableInterruptHandler",
                "_QTS_RuntimeDisableInterruptHandler",
                "_QTS_RuntimeEnableModuleLoader",
                "_QTS_RuntimeDisableModuleLoader",
                "_QTS_bjson_encode",
                "_QTS_bjson_decode",
                "_malloc",
                "_free",
                "_memory",
                "_qts_host_call_function",
                "_qts_host_interrupt_handler",
                "_qts_host_load_module_source",
                "_qts_host_normalize_module",
                "___indirect_function_table",
                "_fflush",
                "___start_em_js",
                "___stop_em_js",
                "onRuntimeInitialized",
              ].forEach((r) => {
                Object.getOwnPropertyDescriptor(e.ready, r) ||
                  Object.defineProperty(e.ready, r, {
                    get: () =>
                      te(
                        "You are getting " +
                          r +
                          " on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js",
                      ),
                    set: () =>
                      te(
                        "You are setting " +
                          r +
                          " on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js",
                      ),
                  })
              })
            var N = Object.assign({}, e),
              x = [],
              H = "./this.program",
              Y = (r, t) => {
                throw t
              },
              Te = typeof window == "object",
              ae = typeof importScripts == "function",
              q =
                typeof process == "object" &&
                typeof process.versions == "object" &&
                typeof process.versions.node == "string",
              be = !Te && !q && !ae
            if (e.ENVIRONMENT)
              throw new Error(
                "Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -sENVIRONMENT=web or -sENVIRONMENT=node)",
              )
            var se = ""
            function er(r) {
              return e.locateFile ? e.locateFile(r, se) : se + r
            }
            var Re, Pe, ke
            if (q) {
              if (typeof process > "u" || !process.release || process.release.name !== "node")
                throw new Error(
                  "not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)",
                )
              var $e = process.versions.node,
                he = $e.split(".").slice(0, 3)
              he = he[0] * 1e4 + he[1] * 100 + he[2].split("-")[0] * 1
              var lr = 16e4
              if (he < 16e4)
                throw new Error(
                  "This emscripten-generated code requires node v16.0.0 (detected v" + $e + ")",
                )
              let { createRequire: r } = await import("module")
              var Ie = r(Kt.url),
                Me = Ie("fs"),
                _e = Ie("path")
              ae
                ? (se = _e.dirname(se) + "/")
                : (se = Ie("url").fileURLToPath(new URL("./", Kt.url))),
                (Re = (t, n) => (
                  (t = Q(t) ? new URL(t) : _e.normalize(t)), Me.readFileSync(t, n ? void 0 : "utf8")
                )),
                (ke = (t) => {
                  var n = Re(t, !0)
                  return n.buffer || (n = new Uint8Array(n)), g(n.buffer), n
                }),
                (Pe = (t, n, a, u = !0) => {
                  ;(t = Q(t) ? new URL(t) : _e.normalize(t)),
                    Me.readFile(t, u ? void 0 : "utf8", (h, p) => {
                      h ? a(h) : n(u ? p.buffer : p)
                    })
                }),
                !e.thisProgram &&
                  process.argv.length > 1 &&
                  (H = process.argv[1].replace(/\\/g, "/")),
                (x = process.argv.slice(2)),
                (Y = (t, n) => {
                  throw ((process.exitCode = t), n)
                }),
                (e.inspect = () => "[Emscripten Module object]")
            } else if (be) {
              if (
                (typeof process == "object" && typeof Ie == "function") ||
                typeof window == "object" ||
                typeof importScripts == "function"
              )
                throw new Error(
                  "not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)",
                )
              typeof read < "u" && (Re = read),
                (ke = (r) => {
                  if (typeof readbuffer == "function") return new Uint8Array(readbuffer(r))
                  let t = read(r, "binary")
                  return g(typeof t == "object"), t
                }),
                (Pe = (r, t, n) => {
                  setTimeout(() => t(ke(r)))
                }),
                typeof clearTimeout > "u" && (globalThis.clearTimeout = (r) => {}),
                typeof setTimeout > "u" &&
                  (globalThis.setTimeout = (r) => (typeof r == "function" ? r() : te())),
                typeof scriptArgs < "u"
                  ? (x = scriptArgs)
                  : typeof arguments < "u" && (x = arguments),
                typeof quit == "function" &&
                  (Y = (r, t) => {
                    throw (
                      (setTimeout(() => {
                        if (!(t instanceof Tt)) {
                          let n = t
                          t && typeof t == "object" && t.stack && (n = [t, t.stack]),
                            I(`exiting due to exception: ${n}`)
                        }
                        quit(r)
                      }),
                      t)
                    )
                  }),
                typeof print < "u" &&
                  (typeof console > "u" && (console = {}),
                  (console.log = print),
                  (console.warn = console.error = typeof printErr < "u" ? printErr : print))
            } else if (Te || ae) {
              if (
                (ae
                  ? (se = self.location.href)
                  : typeof document < "u" &&
                    document.currentScript &&
                    (se = document.currentScript.src),
                i && (se = i),
                se.indexOf("blob:") !== 0
                  ? (se = se.substr(0, se.replace(/[?#].*/, "").lastIndexOf("/") + 1))
                  : (se = ""),
                !(typeof window == "object" || typeof importScripts == "function"))
              )
                throw new Error(
                  "not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)",
                )
              ;(Re = (r) => {
                var t = new XMLHttpRequest()
                return t.open("GET", r, !1), t.send(null), t.responseText
              }),
                ae &&
                  (ke = (r) => {
                    var t = new XMLHttpRequest()
                    return (
                      t.open("GET", r, !1),
                      (t.responseType = "arraybuffer"),
                      t.send(null),
                      new Uint8Array(t.response)
                    )
                  }),
                (Pe = (r, t, n) => {
                  var a = new XMLHttpRequest()
                  a.open("GET", r, !0),
                    (a.responseType = "arraybuffer"),
                    (a.onload = () => {
                      if (a.status == 200 || (a.status == 0 && a.response)) {
                        t(a.response)
                        return
                      }
                      n()
                    }),
                    (a.onerror = n),
                    a.send(null)
                })
            } else throw new Error("environment detection error")
            var de = e.print || console.log.bind(console),
              I = e.printErr || console.error.bind(console)
            Object.assign(e, N),
              (N = null),
              Qi(),
              e.arguments && (x = e.arguments),
              k("arguments", "arguments_"),
              e.thisProgram && (H = e.thisProgram),
              k("thisProgram", "thisProgram"),
              e.quit && (Y = e.quit),
              k("quit", "quit_"),
              g(
                typeof e.memoryInitializerPrefixURL > "u",
                "Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead",
              ),
              g(
                typeof e.pthreadMainPrefixURL > "u",
                "Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead",
              ),
              g(
                typeof e.cdInitializerPrefixURL > "u",
                "Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead",
              ),
              g(
                typeof e.filePackagePrefixURL > "u",
                "Module.filePackagePrefixURL option was removed, use Module.locateFile instead",
              ),
              g(typeof e.read > "u", "Module.read option was removed (modify read_ in JS)"),
              g(
                typeof e.readAsync > "u",
                "Module.readAsync option was removed (modify readAsync in JS)",
              ),
              g(
                typeof e.readBinary > "u",
                "Module.readBinary option was removed (modify readBinary in JS)",
              ),
              g(
                typeof e.setWindowTitle > "u",
                "Module.setWindowTitle option was removed (modify emscripten_set_window_title in JS)",
              ),
              g(
                typeof e.TOTAL_MEMORY > "u",
                "Module.TOTAL_MEMORY has been renamed Module.INITIAL_MEMORY",
              ),
              k("asm", "wasmExports"),
              k("read", "read_"),
              k("readAsync", "readAsync"),
              k("readBinary", "readBinary"),
              k("setWindowTitle", "setWindowTitle")
            var Ne = "IDBFS is no longer included by default; build with -lidbfs.js",
              xe = "PROXYFS is no longer included by default; build with -lproxyfs.js",
              Wr = "WORKERFS is no longer included by default; build with -lworkerfs.js",
              $r = "FETCHFS is no longer included by default; build with -lfetchfs.js",
              it = "ICASEFS is no longer included by default; build with -licasefs.js",
              ur = "JSFILEFS is no longer included by default; build with -ljsfilefs.js",
              Yr = "OPFS is no longer included by default; build with -lopfs.js",
              Be = "NODEFS is no longer included by default; build with -lnodefs.js"
            g(
              !be,
              "shell environment detected but not enabled at build time.  Add 'shell' to `-sENVIRONMENT` to enable.",
            )
            var ge
            e.wasmBinary && (ge = e.wasmBinary),
              k("wasmBinary", "wasmBinary"),
              typeof WebAssembly != "object" && te("no native wasm support detected")
            var Qe,
              ue = !1,
              De
            function g(r, t) {
              r || te("Assertion failed" + (t ? ": " + t : ""))
            }
            var cr, Se, Ee, Sr, Ar, G, B, rr, dr
            function mr() {
              var r = Qe.buffer
              ;(e.HEAP8 = Se = new Int8Array(r)),
                (e.HEAP16 = Sr = new Int16Array(r)),
                (e.HEAPU8 = Ee = new Uint8Array(r)),
                (e.HEAPU16 = Ar = new Uint16Array(r)),
                (e.HEAP32 = G = new Int32Array(r)),
                (e.HEAPU32 = B = new Uint32Array(r)),
                (e.HEAPF32 = rr = new Float32Array(r)),
                (e.HEAPF64 = dr = new Float64Array(r))
            }
            g(
              !e.STACK_SIZE,
              "STACK_SIZE can no longer be set at runtime.  Use -sSTACK_SIZE at link time",
            ),
              g(
                typeof Int32Array < "u" &&
                  typeof Float64Array < "u" &&
                  Int32Array.prototype.subarray != null &&
                  Int32Array.prototype.set != null,
                "JS engine does not provide full typed array support",
              ),
              g(
                !e.wasmMemory,
                "Use of `wasmMemory` detected.  Use -sIMPORTED_MEMORY to define wasmMemory externally",
              ),
              g(
                !e.INITIAL_MEMORY,
                "Detected runtime INITIAL_MEMORY setting.  Use -sIMPORTED_MEMORY to define wasmMemory dynamically",
              )
            function je() {
              var r = X()
              g((r & 3) == 0),
                r == 0 && (r += 4),
                (B[r >> 2] = 34821223),
                (B[(r + 4) >> 2] = 2310721022),
                (B[0] = 1668509029)
            }
            function Ye() {
              if (!ue) {
                var r = X()
                r == 0 && (r += 4)
                var t = B[r >> 2],
                  n = B[(r + 4) >> 2]
                ;(t != 34821223 || n != 2310721022) &&
                  te(
                    `Stack overflow! Stack cookie has been overwritten at ${Xr(
                      r,
                    )}, expected hex dwords 0x89BACDFE and 0x2135467, but received ${Xr(n)} ${Xr(
                      t,
                    )}`,
                  ),
                  B[0] != 1668509029 &&
                    te(
                      "Runtime error: The application has corrupted its heap memory area (address zero)!",
                    )
              }
            }
            ;(function () {
              var r = new Int16Array(1),
                t = new Int8Array(r.buffer)
              if (((r[0] = 25459), t[0] !== 115 || t[1] !== 99))
                throw "Runtime error: expected the system to be little-endian! (Run with -sSUPPORT_BIG_ENDIAN to bypass)"
            })()
            var pr = [],
              _r = [],
              Tr = [],
              Cr = [],
              tr = !1,
              Rr = !1
            function M() {
              if (e.preRun)
                for (typeof e.preRun == "function" && (e.preRun = [e.preRun]); e.preRun.length; )
                  Gr(e.preRun.shift())
              at(pr)
            }
            function Ur() {
              g(!tr),
                (tr = !0),
                Ye(),
                !e.noFSInit && !o.init.initialized && o.init(),
                (o.ignorePermissions = !1),
                Xe.init(),
                at(_r)
            }
            function Pr() {
              g(!Rr), Ye(), An(), at(Tr), o.quit(), Xe.shutdown(), (Rr = !0)
            }
            function vr() {
              if ((Ye(), e.postRun))
                for (
                  typeof e.postRun == "function" && (e.postRun = [e.postRun]);
                  e.postRun.length;

                )
                  d(e.postRun.shift())
              at(Cr)
            }
            function Gr(r) {
              pr.unshift(r)
            }
            function Oe(r) {
              _r.unshift(r)
            }
            function He(r) {
              Tr.unshift(r)
            }
            function d(r) {
              Cr.unshift(r)
            }
            g(
              Math.imul,
              "This browser does not support Math.imul(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill",
            ),
              g(
                Math.fround,
                "This browser does not support Math.fround(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill",
              ),
              g(
                Math.clz32,
                "This browser does not support Math.clz32(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill",
              ),
              g(
                Math.trunc,
                "This browser does not support Math.trunc(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill",
              )
            var f = 0,
              w = null,
              F = null,
              O = {}
            function re(r) {
              for (var t = r; ; ) {
                if (!O[r]) return r
                r = t + Math.random()
              }
            }
            function L(r) {
              f++,
                e.monitorRunDependencies && e.monitorRunDependencies(f),
                r
                  ? (g(!O[r]),
                    (O[r] = 1),
                    w === null &&
                      typeof setInterval < "u" &&
                      (w = setInterval(() => {
                        if (ue) {
                          clearInterval(w), (w = null)
                          return
                        }
                        var t = !1
                        for (var n in O)
                          t || ((t = !0), I("still waiting on run dependencies:")),
                            I(`dependency: ${n}`)
                        t && I("(end of list)")
                      }, 1e4)))
                  : I("warning: run dependency added without ID")
            }
            function oe(r) {
              if (
                (f--,
                e.monitorRunDependencies && e.monitorRunDependencies(f),
                r ? (g(O[r]), delete O[r]) : I("warning: run dependency removed without ID"),
                f == 0 && (w !== null && (clearInterval(w), (w = null)), F))
              ) {
                var t = F
                ;(F = null), t()
              }
            }
            function te(r) {
              e.onAbort && e.onAbort(r), (r = "Aborted(" + r + ")"), I(r), (ue = !0), (De = 1)
              var t = new WebAssembly.RuntimeError(r)
              throw (A(t), t)
            }
            var pe = "data:application/octet-stream;base64,",
              me = (r) => r.startsWith(pe),
              Q = (r) => r.startsWith("file://")
            function E(r) {
              return function () {
                g(tr, `native function \`${r}\` called before runtime initialization`),
                  g(
                    !Rr,
                    `native function \`${r}\` called after runtime exit (use NO_EXIT_RUNTIME to keep it alive after main() exits)`,
                  )
                var t = Qr[r]
                return g(t, `exported native function \`${r}\` not found`), t.apply(null, arguments)
              }
            }
            var P
            e.locateFile
              ? ((P = "emscripten-module.wasm"), me(P) || (P = er(P)))
              : (P = new URL("emscripten-module.wasm", Kt.url).href)
            function Br(r) {
              if (r == P && ge) return new Uint8Array(ge)
              if (ke) return ke(r)
              throw "both async and sync fetching of the wasm failed"
            }
            function qr(r) {
              if (!ge && (Te || ae)) {
                if (typeof fetch == "function" && !Q(r))
                  return fetch(r, { credentials: "same-origin" })
                    .then((t) => {
                      if (!t.ok) throw "failed to load wasm binary file at '" + r + "'"
                      return t.arrayBuffer()
                    })
                    .catch(() => Br(r))
                if (Pe)
                  return new Promise((t, n) => {
                    Pe(r, (a) => t(new Uint8Array(a)), n)
                  })
              }
              return Promise.resolve().then(() => Br(r))
            }
            var Hr
            function Vr(r) {
              ;(this.version = r.version),
                (this.sources = r.sources),
                (this.names = r.names),
                (this.mapping = {}),
                (this.offsets = [])
              var t = {}
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
                .split("")
                .forEach((R, U) => (t[R] = U))
              function n(R) {
                for (var U = [], V = 0, W = 0, $ = 0; $ < R.length; ++$) {
                  var z = t[R[$]]
                  if (z === void 0) throw new Error("Invalid character (" + R[$] + ")")
                  if (((W += (z & 31) << V), z & 32)) V += 5
                  else {
                    var J = W & 1
                    ;(W >>= 1), U.push(J ? -W : W), (W = V = 0)
                  }
                }
                return U
              }
              var a = 0,
                u = 0,
                h = 1,
                p = 1,
                y = 0
              r.mappings.split(",").forEach(function (R, U) {
                if (R) {
                  var V = n(R),
                    W = {}
                  ;(a += V[0]),
                    V.length >= 2 && (W.source = u += V[1]),
                    V.length >= 3 && (W.line = h += V[2]),
                    V.length >= 4 && (W.column = p += V[3]),
                    V.length >= 5 && (W.name = y += V[4]),
                    (this.mapping[a] = W),
                    this.offsets.push(a)
                }
              }, this),
                this.offsets.sort((R, U) => R - U)
            }
            ;(Vr.prototype.lookup = function (r) {
              var t = this.normalizeOffset(r)
              if (!yr.isSameFunc(r, t)) return null
              var n = this.mapping[t]
              return n
                ? {
                    file: this.sources[n.source],
                    line: n.line,
                    column: n.column,
                    name: this.names[n.name],
                  }
                : null
            }),
              (Vr.prototype.normalizeOffset = function (r) {
                for (var t = 0, n = this.offsets.length, a; t < n; )
                  (a = Math.floor((t + n) / 2)), this.offsets[a] > r ? (n = a) : (t = a + 1)
                return this.offsets[t - 1]
              })
            var xr = "emscripten-module.wasm.map"
            me(P) || (xr = er(xr))
            function ot() {
              try {
                return JSON.parse(Re(xr))
              } catch (r) {
                te(r)
              }
            }
            function qe() {
              return (Te || ae) && typeof fetch == "function"
                ? fetch(xr, { credentials: "same-origin" })
                    .then((r) => r.json())
                    .catch(() => ot())
                : new Promise(function (r, t) {
                    r(ot())
                  })
            }
            var yr
            function fr(r, t) {
              var n = 8,
                a = 0
              ;(this.offset_map = {}),
                (this.func_starts = []),
                (this.name_map = {}),
                (this.import_functions = 0)
              var u = r
              function h() {
                var Ue = 0,
                  Mr = 0
                do {
                  var or = u[n++]
                  ;(Ue += (or & 127) << Mr), (Mr += 7)
                } while (or & 128)
                return Ue
              }
              function p() {
                var Ue = h()
                h()
                var Mr = (Ue & 1) != 0
                Mr && h()
              }
              e: for (; n < u.length; ) {
                var y = n,
                  R = u[n++],
                  U = h() + n
                switch (R) {
                  case 2:
                    for (var W = h(); W-- > 0; ) {
                      ;(n = h() + n), (n = h() + n)
                      var V = u[n++]
                      switch (V) {
                        case 0:
                          ++a, h()
                          break
                        case 1:
                          h(), p()
                          break
                        case 2:
                          p()
                          break
                        case 3:
                          n += 2
                          break
                        case 4:
                          ++n, h()
                          break
                        default:
                          throw "bad import kind: " + V
                      }
                    }
                    this.import_functions = a
                    break
                  case 10:
                    for (var W = h(); W-- > 0; ) {
                      var $ = h()
                      ;(this.offset_map[a++] = n), this.func_starts.push(n), (n += $)
                    }
                    break e
                }
                n = U
              }
              var z = WebAssembly.Module.customSections(t, "name"),
                J = z.length ? z[0] : void 0
              if (J)
                for (u = new Uint8Array(J), n = 0; n < u.length; ) {
                  var fe = u[n++],
                    Er = h()
                  if (fe != 1) {
                    n += Er
                    continue
                  }
                  for (var W = h(); W-- > 0; ) {
                    var ir = h(),
                      We = h()
                    ;(this.name_map[ir] = jr(u, n, We)), (n += We)
                  }
                }
            }
            ;(fr.prototype.convert = function (r, t) {
              return this.offset_map[r] + t
            }),
              (fr.prototype.getIndex = function (r) {
                for (var t = 0, n = this.func_starts.length, a; t < n; )
                  (a = Math.floor((t + n) / 2)), this.func_starts[a] > r ? (n = a) : (t = a + 1)
                return t + this.import_functions - 1
              }),
              (fr.prototype.isSameFunc = function (r, t) {
                return this.getIndex(r) == this.getIndex(t)
              }),
              (fr.prototype.getName = function (r) {
                var t = this.getIndex(r)
                return this.name_map[t] || "wasm-function[" + t + "]"
              })
            function Dr(r) {
              ;(Hr = new Vr(r)), oe("source-map")
            }
            function Kr(r, t, n) {
              var a
              return qr(r)
                .then((u) => ((a = u), WebAssembly.instantiate(u, t)))
                .then((u) => ((yr = new fr(a, u.module)), u))
                .then(n, (u) => {
                  I(`failed to asynchronously prepare wasm: ${u}`),
                    Q(P) &&
                      I(
                        `warning: Loading from a file URI (${P}) is not supported in most browsers. See https://emscripten.org/docs/getting_started/FAQ.html#how-do-i-run-a-local-webserver-for-testing-why-does-my-program-stall-in-downloading-or-preparing`,
                      ),
                    te(u)
                })
            }
            function c(r, t, n, a) {
              return !r &&
                typeof WebAssembly.instantiateStreaming == "function" &&
                !me(t) &&
                !Q(t) &&
                !q &&
                typeof fetch == "function"
                ? fetch(t, { credentials: "same-origin" }).then((u) => {
                    var h = WebAssembly.instantiateStreaming(u, n),
                      p = u.clone().arrayBuffer()
                    return h.then(
                      function (y) {
                        p.then(
                          (R) => {
                            ;(yr = new fr(new Uint8Array(R), y.module)), a(y)
                          },
                          (R) => I(`failed to initialize offset-converter: ${R}`),
                        )
                      },
                      function (y) {
                        return (
                          I(`wasm streaming compile failed: ${y}`),
                          I("falling back to ArrayBuffer instantiation"),
                          Kr(t, n, a)
                        )
                      },
                    )
                  })
                : Kr(t, n, a)
            }
            function _() {
              var r = { env: gn, wasi_snapshot_preview1: gn }
              function t(u, h) {
                return (
                  (Qr = u.exports),
                  (Qe = Qr.memory),
                  g(Qe, "memory not found in wasm exports"),
                  mr(),
                  Oe(Qr.__wasm_call_ctors),
                  oe("wasm-instantiate"),
                  Qr
                )
              }
              L("wasm-instantiate"), L("source-map")
              var n = e
              function a(u) {
                g(
                  e === n,
                  "the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?",
                ),
                  (n = null),
                  t(u.instance)
              }
              if (e.instantiateWasm)
                try {
                  return e.instantiateWasm(r, t)
                } catch (u) {
                  I(`Module.instantiateWasm callback failed with error: ${u}`), A(u)
                }
              return c(ge, P, r, a).catch(A), qe().then(Dr), {}
            }
            var S, b
            function k(r, t, n = !0) {
              Object.getOwnPropertyDescriptor(e, r) ||
                Object.defineProperty(e, r, {
                  configurable: !0,
                  get() {
                    let a = n
                      ? " (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)"
                      : ""
                    te(`\`Module.${r}\` has been replaced by \`${t}\`` + a)
                  },
                })
            }
            function ne(r) {
              Object.getOwnPropertyDescriptor(e, r) &&
                te(
                  `\`Module.${r}\` was supplied but \`${r}\` not included in INCOMING_MODULE_JS_API`,
                )
            }
            function ie(r) {
              return (
                r === "FS_createPath" ||
                r === "FS_createDataFile" ||
                r === "FS_createPreloadedFile" ||
                r === "FS_unlink" ||
                r === "addRunDependency" ||
                r === "FS_createLazyFile" ||
                r === "FS_createDevice" ||
                r === "removeRunDependency"
              )
            }
            function ve(r, t) {
              typeof globalThis < "u" &&
                Object.defineProperty(globalThis, r, {
                  configurable: !0,
                  get() {
                    br(`\`${r}\` is not longer defined by emscripten. ${t}`)
                  },
                })
            }
            ve("buffer", "Please use HEAP8.buffer or wasmMemory.buffer"),
              ve("asm", "Please use wasmExports instead")
            function Fe(r) {
              typeof globalThis < "u" &&
                !Object.getOwnPropertyDescriptor(globalThis, r) &&
                Object.defineProperty(globalThis, r, {
                  configurable: !0,
                  get() {
                    var t = `\`${r}\` is a library symbol and not included by default; add it to your library.js __deps or to DEFAULT_LIBRARY_FUNCS_TO_INCLUDE on the command line`,
                      n = r
                    n.startsWith("_") || (n = "$" + r),
                      (t += ` (e.g. -sDEFAULT_LIBRARY_FUNCS_TO_INCLUDE='${n}')`),
                      ie(r) &&
                        (t +=
                          ". Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you"),
                      br(t)
                  },
                }),
                Ve(r)
            }
            function Ve(r) {
              Object.getOwnPropertyDescriptor(e, r) ||
                Object.defineProperty(e, r, {
                  configurable: !0,
                  get() {
                    var t = `'${r}' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the Emscripten FAQ)`
                    ie(r) &&
                      (t +=
                        ". Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you"),
                      te(t)
                  },
                })
            }
            function Ir(r) {
              console.warn.apply(console, arguments)
            }
            function we(r, t, n, a, u) {
              return e.callbacks.callFunction(void 0, r, t, n, a, u)
            }
            function wr(r) {
              return e.callbacks.shouldInterrupt(void 0, r)
            }
            function ze(r, t, n) {
              let u = Ke(n)
              return e.callbacks.loadModuleSource(void 0, r, t, u)
            }
            function jt(r, t, n, a) {
              let h = Ke(n),
                p = Ke(a)
              return e.callbacks.normalizeModule(void 0, r, t, h, p)
            }
            function Tt(r) {
              ;(this.name = "ExitStatus"),
                (this.message = `Program terminated with exit(${r})`),
                (this.status = r)
            }
            var hr = typeof TextDecoder < "u" ? new TextDecoder("utf8") : void 0,
              jr = (r, t, n) => {
                for (var a = t + n, u = t; r[u] && !(u >= a); ) ++u
                if (u - t > 16 && r.buffer && hr) return hr.decode(r.subarray(t, u))
                for (var h = ""; t < u; ) {
                  var p = r[t++]
                  if (!(p & 128)) {
                    h += String.fromCharCode(p)
                    continue
                  }
                  var y = r[t++] & 63
                  if ((p & 224) == 192) {
                    h += String.fromCharCode(((p & 31) << 6) | y)
                    continue
                  }
                  var R = r[t++] & 63
                  if (
                    ((p & 240) == 224
                      ? (p = ((p & 15) << 12) | (y << 6) | R)
                      : ((p & 248) != 240 &&
                          br(
                            "Invalid UTF-8 leading byte " +
                              Xr(p) +
                              " encountered when deserializing a UTF-8 string in wasm memory to a JS string!",
                          ),
                        (p = ((p & 7) << 18) | (y << 12) | (R << 6) | (r[t++] & 63))),
                    p < 65536)
                  )
                    h += String.fromCharCode(p)
                  else {
                    var U = p - 65536
                    h += String.fromCharCode(55296 | (U >> 10), 56320 | (U & 1023))
                  }
                }
                return h
              },
              at = (r) => {
                for (; r.length > 0; ) r.shift()(e)
              }
            function Vn(r, t = "i8") {
              switch ((t.endsWith("*") && (t = "*"), t)) {
                case "i1":
                  return Se[r >> 0]
                case "i8":
                  return Se[r >> 0]
                case "i16":
                  return Sr[r >> 1]
                case "i32":
                  return G[r >> 2]
                case "i64":
                  te("to do getValue(i64) use WASM_BIGINT")
                case "float":
                  return rr[r >> 2]
                case "double":
                  return dr[r >> 3]
                case "*":
                  return B[r >> 2]
                default:
                  te(`invalid type for getValue: ${t}`)
              }
            }
            var rn = e.noExitRuntime || !1,
              Xr = (r) => (
                g(typeof r == "number"), (r >>>= 0), "0x" + r.toString(16).padStart(8, "0")
              )
            function tn(r, t, n = "i8") {
              switch ((n.endsWith("*") && (n = "*"), n)) {
                case "i1":
                  Se[r >> 0] = t
                  break
                case "i8":
                  Se[r >> 0] = t
                  break
                case "i16":
                  Sr[r >> 1] = t
                  break
                case "i32":
                  G[r >> 2] = t
                  break
                case "i64":
                  te("to do setValue(i64) use WASM_BIGINT")
                case "float":
                  rr[r >> 2] = t
                  break
                case "double":
                  dr[r >> 3] = t
                  break
                case "*":
                  B[r >> 2] = t
                  break
                default:
                  te(`invalid type for setValue: ${n}`)
              }
            }
            var br = (r) => {
                br.shown || (br.shown = {}),
                  br.shown[r] || ((br.shown[r] = 1), q && (r = "warning: " + r), I(r))
              },
              Ke = (r, t) => (
                g(typeof r == "number", `UTF8ToString expects a number (got ${typeof r})`),
                r ? jr(Ee, r, t) : ""
              ),
              nn = (r, t, n, a) => {
                te(
                  `Assertion failed: ${Ke(r)}, at: ` +
                    [t ? Ke(t) : "unknown filename", n, a ? Ke(a) : "unknown function"],
                )
              },
              le = {
                isAbs: (r) => r.charAt(0) === "/",
                splitPath: (r) => {
                  var t = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/
                  return t.exec(r).slice(1)
                },
                normalizeArray: (r, t) => {
                  for (var n = 0, a = r.length - 1; a >= 0; a--) {
                    var u = r[a]
                    u === "."
                      ? r.splice(a, 1)
                      : u === ".."
                        ? (r.splice(a, 1), n++)
                        : n && (r.splice(a, 1), n--)
                  }
                  if (t) for (; n; n--) r.unshift("..")
                  return r
                },
                normalize: (r) => {
                  var t = le.isAbs(r),
                    n = r.substr(-1) === "/"
                  return (
                    (r = le
                      .normalizeArray(
                        r.split("/").filter((a) => !!a),
                        !t,
                      )
                      .join("/")),
                    !r && !t && (r = "."),
                    r && n && (r += "/"),
                    (t ? "/" : "") + r
                  )
                },
                dirname: (r) => {
                  var t = le.splitPath(r),
                    n = t[0],
                    a = t[1]
                  return !n && !a ? "." : (a && (a = a.substr(0, a.length - 1)), n + a)
                },
                basename: (r) => {
                  if (r === "/") return "/"
                  ;(r = le.normalize(r)), (r = r.replace(/\/$/, ""))
                  var t = r.lastIndexOf("/")
                  return t === -1 ? r : r.substr(t + 1)
                },
                join: function () {
                  var r = Array.prototype.slice.call(arguments)
                  return le.normalize(r.join("/"))
                },
                join2: (r, t) => le.normalize(r + "/" + t),
              },
              Ot = () => {
                if (typeof crypto == "object" && typeof crypto.getRandomValues == "function")
                  return (a) => crypto.getRandomValues(a)
                if (q)
                  try {
                    var r = Ie("crypto"),
                      t = r.randomFillSync
                    if (t) return (a) => r.randomFillSync(a)
                    var n = r.randomBytes
                    return (a) => (a.set(n(a.byteLength)), a)
                  } catch {}
                te(
                  "no cryptographic support found for randomDevice. consider polyfilling it if you want to use something insecure like Math.random(), e.g. put this in a --pre-js: var crypto = { getRandomValues: (array) => { for (var i = 0; i < array.length; i++) array[i] = (Math.random()*256)|0 } };",
                )
              },
              Lt = (r) => (Lt = Ot())(r),
              gr = {
                resolve: function () {
                  for (var r = "", t = !1, n = arguments.length - 1; n >= -1 && !t; n--) {
                    var a = n >= 0 ? arguments[n] : o.cwd()
                    if (typeof a != "string")
                      throw new TypeError("Arguments to path.resolve must be strings")
                    if (!a) return ""
                    ;(r = a + "/" + r), (t = le.isAbs(a))
                  }
                  return (
                    (r = le
                      .normalizeArray(
                        r.split("/").filter((u) => !!u),
                        !t,
                      )
                      .join("/")),
                    (t ? "/" : "") + r || "."
                  )
                },
                relative: (r, t) => {
                  ;(r = gr.resolve(r).substr(1)), (t = gr.resolve(t).substr(1))
                  function n(U) {
                    for (var V = 0; V < U.length && U[V] === ""; V++);
                    for (var W = U.length - 1; W >= 0 && U[W] === ""; W--);
                    return V > W ? [] : U.slice(V, W - V + 1)
                  }
                  for (
                    var a = n(r.split("/")),
                      u = n(t.split("/")),
                      h = Math.min(a.length, u.length),
                      p = h,
                      y = 0;
                    y < h;
                    y++
                  )
                    if (a[y] !== u[y]) {
                      p = y
                      break
                    }
                  for (var R = [], y = p; y < a.length; y++) R.push("..")
                  return (R = R.concat(u.slice(p))), R.join("/")
                },
              },
              vt = [],
              Zr = (r) => {
                for (var t = 0, n = 0; n < r.length; ++n) {
                  var a = r.charCodeAt(n)
                  a <= 127
                    ? t++
                    : a <= 2047
                      ? (t += 2)
                      : a >= 55296 && a <= 57343
                        ? ((t += 4), ++n)
                        : (t += 3)
                }
                return t
              },
              yt = (r, t, n, a) => {
                if (
                  (g(typeof r == "string", `stringToUTF8Array expects a string (got ${typeof r})`),
                  !(a > 0))
                )
                  return 0
                for (var u = n, h = n + a - 1, p = 0; p < r.length; ++p) {
                  var y = r.charCodeAt(p)
                  if (y >= 55296 && y <= 57343) {
                    var R = r.charCodeAt(++p)
                    y = (65536 + ((y & 1023) << 10)) | (R & 1023)
                  }
                  if (y <= 127) {
                    if (n >= h) break
                    t[n++] = y
                  } else if (y <= 2047) {
                    if (n + 1 >= h) break
                    ;(t[n++] = 192 | (y >> 6)), (t[n++] = 128 | (y & 63))
                  } else if (y <= 65535) {
                    if (n + 2 >= h) break
                    ;(t[n++] = 224 | (y >> 12)),
                      (t[n++] = 128 | ((y >> 6) & 63)),
                      (t[n++] = 128 | (y & 63))
                  } else {
                    if (n + 3 >= h) break
                    y > 1114111 &&
                      br(
                        "Invalid Unicode code point " +
                          Xr(y) +
                          " encountered when serializing a JS string to a UTF-8 string in wasm memory! (Valid unicode code points should be in range 0-0x10FFFF).",
                      ),
                      (t[n++] = 240 | (y >> 18)),
                      (t[n++] = 128 | ((y >> 12) & 63)),
                      (t[n++] = 128 | ((y >> 6) & 63)),
                      (t[n++] = 128 | (y & 63))
                  }
                }
                return (t[n] = 0), n - u
              }
            function wt(r, t, n) {
              var a = n > 0 ? n : Zr(r) + 1,
                u = new Array(a),
                h = yt(r, u, 0, u.length)
              return t && (u.length = h), u
            }
            var on = () => {
                if (!vt.length) {
                  var r = null
                  if (q) {
                    var t = 256,
                      n = Buffer.alloc(t),
                      a = 0,
                      u = process.stdin.fd
                    try {
                      a = Me.readSync(u, n)
                    } catch (h) {
                      if (h.toString().includes("EOF")) a = 0
                      else throw h
                    }
                    a > 0 ? (r = n.slice(0, a).toString("utf-8")) : (r = null)
                  } else
                    typeof window < "u" && typeof window.prompt == "function"
                      ? ((r = window.prompt("Input: ")),
                        r !== null &&
                          (r += `
`))
                      : typeof readline == "function" &&
                        ((r = readline()),
                        r !== null &&
                          (r += `
`))
                  if (!r) return null
                  vt = wt(r, !0)
                }
                return vt.shift()
              },
              Xe = {
                ttys: [],
                init() {},
                shutdown() {},
                register(r, t) {
                  ;(Xe.ttys[r] = { input: [], output: [], ops: t }),
                    o.registerDevice(r, Xe.stream_ops)
                },
                stream_ops: {
                  open(r) {
                    var t = Xe.ttys[r.node.rdev]
                    if (!t) throw new o.ErrnoError(43)
                    ;(r.tty = t), (r.seekable = !1)
                  },
                  close(r) {
                    r.tty.ops.fsync(r.tty)
                  },
                  fsync(r) {
                    r.tty.ops.fsync(r.tty)
                  },
                  read(r, t, n, a, u) {
                    if (!r.tty || !r.tty.ops.get_char) throw new o.ErrnoError(60)
                    for (var h = 0, p = 0; p < a; p++) {
                      var y
                      try {
                        y = r.tty.ops.get_char(r.tty)
                      } catch {
                        throw new o.ErrnoError(29)
                      }
                      if (y === void 0 && h === 0) throw new o.ErrnoError(6)
                      if (y == null) break
                      h++, (t[n + p] = y)
                    }
                    return h && (r.node.timestamp = Date.now()), h
                  },
                  write(r, t, n, a, u) {
                    if (!r.tty || !r.tty.ops.put_char) throw new o.ErrnoError(60)
                    try {
                      for (var h = 0; h < a; h++) r.tty.ops.put_char(r.tty, t[n + h])
                    } catch {
                      throw new o.ErrnoError(29)
                    }
                    return a && (r.node.timestamp = Date.now()), h
                  },
                },
                default_tty_ops: {
                  get_char(r) {
                    return on()
                  },
                  put_char(r, t) {
                    t === null || t === 10
                      ? (de(jr(r.output, 0)), (r.output = []))
                      : t != 0 && r.output.push(t)
                  },
                  fsync(r) {
                    r.output && r.output.length > 0 && (de(jr(r.output, 0)), (r.output = []))
                  },
                  ioctl_tcgets(r) {
                    return {
                      c_iflag: 25856,
                      c_oflag: 5,
                      c_cflag: 191,
                      c_lflag: 35387,
                      c_cc: [
                        3, 28, 127, 21, 4, 0, 1, 0, 17, 19, 26, 0, 18, 15, 23, 22, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                      ],
                    }
                  },
                  ioctl_tcsets(r, t, n) {
                    return 0
                  },
                  ioctl_tiocgwinsz(r) {
                    return [24, 80]
                  },
                },
                default_tty1_ops: {
                  put_char(r, t) {
                    t === null || t === 10
                      ? (I(jr(r.output, 0)), (r.output = []))
                      : t != 0 && r.output.push(t)
                  },
                  fsync(r) {
                    r.output && r.output.length > 0 && (I(jr(r.output, 0)), (r.output = []))
                  },
                },
              },
              an = (r, t) => (Ee.fill(0, r, r + t), r),
              sn = (r, t) => (g(t, "alignment argument is required"), Math.ceil(r / t) * t),
              st = (r) => {
                r = sn(r, 65536)
                var t = s(65536, r)
                return t ? an(t, r) : 0
              },
              K = {
                ops_table: null,
                mount(r) {
                  return K.createNode(null, "/", 16895, 0)
                },
                createNode(r, t, n, a) {
                  if (o.isBlkdev(n) || o.isFIFO(n)) throw new o.ErrnoError(63)
                  K.ops_table ||
                    (K.ops_table = {
                      dir: {
                        node: {
                          getattr: K.node_ops.getattr,
                          setattr: K.node_ops.setattr,
                          lookup: K.node_ops.lookup,
                          mknod: K.node_ops.mknod,
                          rename: K.node_ops.rename,
                          unlink: K.node_ops.unlink,
                          rmdir: K.node_ops.rmdir,
                          readdir: K.node_ops.readdir,
                          symlink: K.node_ops.symlink,
                        },
                        stream: { llseek: K.stream_ops.llseek },
                      },
                      file: {
                        node: { getattr: K.node_ops.getattr, setattr: K.node_ops.setattr },
                        stream: {
                          llseek: K.stream_ops.llseek,
                          read: K.stream_ops.read,
                          write: K.stream_ops.write,
                          allocate: K.stream_ops.allocate,
                          mmap: K.stream_ops.mmap,
                          msync: K.stream_ops.msync,
                        },
                      },
                      link: {
                        node: {
                          getattr: K.node_ops.getattr,
                          setattr: K.node_ops.setattr,
                          readlink: K.node_ops.readlink,
                        },
                        stream: {},
                      },
                      chrdev: {
                        node: { getattr: K.node_ops.getattr, setattr: K.node_ops.setattr },
                        stream: o.chrdev_stream_ops,
                      },
                    })
                  var u = o.createNode(r, t, n, a)
                  return (
                    o.isDir(u.mode)
                      ? ((u.node_ops = K.ops_table.dir.node),
                        (u.stream_ops = K.ops_table.dir.stream),
                        (u.contents = {}))
                      : o.isFile(u.mode)
                        ? ((u.node_ops = K.ops_table.file.node),
                          (u.stream_ops = K.ops_table.file.stream),
                          (u.usedBytes = 0),
                          (u.contents = null))
                        : o.isLink(u.mode)
                          ? ((u.node_ops = K.ops_table.link.node),
                            (u.stream_ops = K.ops_table.link.stream))
                          : o.isChrdev(u.mode) &&
                            ((u.node_ops = K.ops_table.chrdev.node),
                            (u.stream_ops = K.ops_table.chrdev.stream)),
                    (u.timestamp = Date.now()),
                    r && ((r.contents[t] = u), (r.timestamp = u.timestamp)),
                    u
                  )
                },
                getFileDataAsTypedArray(r) {
                  return r.contents
                    ? r.contents.subarray
                      ? r.contents.subarray(0, r.usedBytes)
                      : new Uint8Array(r.contents)
                    : new Uint8Array(0)
                },
                expandFileStorage(r, t) {
                  var n = r.contents ? r.contents.length : 0
                  if (!(n >= t)) {
                    var a = 1024 * 1024
                    ;(t = Math.max(t, (n * (n < a ? 2 : 1.125)) >>> 0)),
                      n != 0 && (t = Math.max(t, 256))
                    var u = r.contents
                    ;(r.contents = new Uint8Array(t)),
                      r.usedBytes > 0 && r.contents.set(u.subarray(0, r.usedBytes), 0)
                  }
                },
                resizeFileStorage(r, t) {
                  if (r.usedBytes != t)
                    if (t == 0) (r.contents = null), (r.usedBytes = 0)
                    else {
                      var n = r.contents
                      ;(r.contents = new Uint8Array(t)),
                        n && r.contents.set(n.subarray(0, Math.min(t, r.usedBytes))),
                        (r.usedBytes = t)
                    }
                },
                node_ops: {
                  getattr(r) {
                    var t = {}
                    return (
                      (t.dev = o.isChrdev(r.mode) ? r.id : 1),
                      (t.ino = r.id),
                      (t.mode = r.mode),
                      (t.nlink = 1),
                      (t.uid = 0),
                      (t.gid = 0),
                      (t.rdev = r.rdev),
                      o.isDir(r.mode)
                        ? (t.size = 4096)
                        : o.isFile(r.mode)
                          ? (t.size = r.usedBytes)
                          : o.isLink(r.mode)
                            ? (t.size = r.link.length)
                            : (t.size = 0),
                      (t.atime = new Date(r.timestamp)),
                      (t.mtime = new Date(r.timestamp)),
                      (t.ctime = new Date(r.timestamp)),
                      (t.blksize = 4096),
                      (t.blocks = Math.ceil(t.size / t.blksize)),
                      t
                    )
                  },
                  setattr(r, t) {
                    t.mode !== void 0 && (r.mode = t.mode),
                      t.timestamp !== void 0 && (r.timestamp = t.timestamp),
                      t.size !== void 0 && K.resizeFileStorage(r, t.size)
                  },
                  lookup(r, t) {
                    throw o.genericErrors[44]
                  },
                  mknod(r, t, n, a) {
                    return K.createNode(r, t, n, a)
                  },
                  rename(r, t, n) {
                    if (o.isDir(r.mode)) {
                      var a
                      try {
                        a = o.lookupNode(t, n)
                      } catch {}
                      if (a) for (var u in a.contents) throw new o.ErrnoError(55)
                    }
                    delete r.parent.contents[r.name],
                      (r.parent.timestamp = Date.now()),
                      (r.name = n),
                      (t.contents[n] = r),
                      (t.timestamp = r.parent.timestamp),
                      (r.parent = t)
                  },
                  unlink(r, t) {
                    delete r.contents[t], (r.timestamp = Date.now())
                  },
                  rmdir(r, t) {
                    var n = o.lookupNode(r, t)
                    for (var a in n.contents) throw new o.ErrnoError(55)
                    delete r.contents[t], (r.timestamp = Date.now())
                  },
                  readdir(r) {
                    var t = [".", ".."]
                    for (var n in r.contents) r.contents.hasOwnProperty(n) && t.push(n)
                    return t
                  },
                  symlink(r, t, n) {
                    var a = K.createNode(r, t, 41471, 0)
                    return (a.link = n), a
                  },
                  readlink(r) {
                    if (!o.isLink(r.mode)) throw new o.ErrnoError(28)
                    return r.link
                  },
                },
                stream_ops: {
                  read(r, t, n, a, u) {
                    var h = r.node.contents
                    if (u >= r.node.usedBytes) return 0
                    var p = Math.min(r.node.usedBytes - u, a)
                    if ((g(p >= 0), p > 8 && h.subarray)) t.set(h.subarray(u, u + p), n)
                    else for (var y = 0; y < p; y++) t[n + y] = h[u + y]
                    return p
                  },
                  write(r, t, n, a, u, h) {
                    if ((g(!(t instanceof ArrayBuffer)), t.buffer === Se.buffer && (h = !1), !a))
                      return 0
                    var p = r.node
                    if (
                      ((p.timestamp = Date.now()),
                      t.subarray && (!p.contents || p.contents.subarray))
                    ) {
                      if (h)
                        return (
                          g(u === 0, "canOwn must imply no weird position inside the file"),
                          (p.contents = t.subarray(n, n + a)),
                          (p.usedBytes = a),
                          a
                        )
                      if (p.usedBytes === 0 && u === 0)
                        return (p.contents = t.slice(n, n + a)), (p.usedBytes = a), a
                      if (u + a <= p.usedBytes) return p.contents.set(t.subarray(n, n + a), u), a
                    }
                    if ((K.expandFileStorage(p, u + a), p.contents.subarray && t.subarray))
                      p.contents.set(t.subarray(n, n + a), u)
                    else for (var y = 0; y < a; y++) p.contents[u + y] = t[n + y]
                    return (p.usedBytes = Math.max(p.usedBytes, u + a)), a
                  },
                  llseek(r, t, n) {
                    var a = t
                    if (
                      (n === 1
                        ? (a += r.position)
                        : n === 2 && o.isFile(r.node.mode) && (a += r.node.usedBytes),
                      a < 0)
                    )
                      throw new o.ErrnoError(28)
                    return a
                  },
                  allocate(r, t, n) {
                    K.expandFileStorage(r.node, t + n),
                      (r.node.usedBytes = Math.max(r.node.usedBytes, t + n))
                  },
                  mmap(r, t, n, a, u) {
                    if (!o.isFile(r.node.mode)) throw new o.ErrnoError(43)
                    var h,
                      p,
                      y = r.node.contents
                    if (!(u & 2) && y.buffer === Se.buffer) (p = !1), (h = y.byteOffset)
                    else {
                      if (
                        ((n > 0 || n + t < y.length) &&
                          (y.subarray
                            ? (y = y.subarray(n, n + t))
                            : (y = Array.prototype.slice.call(y, n, n + t))),
                        (p = !0),
                        (h = st(t)),
                        !h)
                      )
                        throw new o.ErrnoError(48)
                      Se.set(y, h)
                    }
                    return { ptr: h, allocated: p }
                  },
                  msync(r, t, n, a, u) {
                    return K.stream_ops.write(r, t, 0, a, n, !1), 0
                  },
                },
              },
              ln = (r, t, n, a) => {
                var u = a ? "" : re(`al ${r}`)
                Pe(
                  r,
                  (h) => {
                    g(h, `Loading data file "${r}" failed (no arrayBuffer).`),
                      t(new Uint8Array(h)),
                      u && oe(u)
                  },
                  (h) => {
                    if (n) n()
                    else throw `Loading data file "${r}" failed.`
                  },
                ),
                  u && L(u)
              },
              un = (r, t, n, a, u, h) => {
                o.createDataFile(r, t, n, a, u, h)
              },
              lt = e.preloadPlugins || [],
              Ut = (r, t, n, a) => {
                typeof Browser < "u" && Browser.init()
                var u = !1
                return (
                  lt.forEach((h) => {
                    u || (h.canHandle(t) && (h.handle(r, t, n, a), (u = !0)))
                  }),
                  u
                )
              },
              et = (r, t, n, a, u, h, p, y, R, U) => {
                var V = t ? gr.resolve(le.join2(r, t)) : r,
                  W = re(`cp ${V}`)
                function $(z) {
                  function J(fe) {
                    U && U(), y || un(r, t, fe, a, u, R), h && h(), oe(W)
                  }
                  Ut(z, V, J, () => {
                    p && p(), oe(W)
                  }) || J(z)
                }
                L(W), typeof n == "string" ? ln(n, (z) => $(z), p) : $(n)
              },
              bt = (r) => {
                var t = { r: 0, "r+": 2, w: 577, "w+": 578, a: 1089, "a+": 1090 },
                  n = t[r]
                if (typeof n > "u") throw new Error(`Unknown file open mode: ${r}`)
                return n
              },
              gt = (r, t) => {
                var n = 0
                return r && (n |= 365), t && (n |= 146), n
              },
              cn = {
                0: "Success",
                1: "Arg list too long",
                2: "Permission denied",
                3: "Address already in use",
                4: "Address not available",
                5: "Address family not supported by protocol family",
                6: "No more processes",
                7: "Socket already connected",
                8: "Bad file number",
                9: "Trying to read unreadable message",
                10: "Mount device busy",
                11: "Operation canceled",
                12: "No children",
                13: "Connection aborted",
                14: "Connection refused",
                15: "Connection reset by peer",
                16: "File locking deadlock error",
                17: "Destination address required",
                18: "Math arg out of domain of func",
                19: "Quota exceeded",
                20: "File exists",
                21: "Bad address",
                22: "File too large",
                23: "Host is unreachable",
                24: "Identifier removed",
                25: "Illegal byte sequence",
                26: "Connection already in progress",
                27: "Interrupted system call",
                28: "Invalid argument",
                29: "I/O error",
                30: "Socket is already connected",
                31: "Is a directory",
                32: "Too many symbolic links",
                33: "Too many open files",
                34: "Too many links",
                35: "Message too long",
                36: "Multihop attempted",
                37: "File or path name too long",
                38: "Network interface is not configured",
                39: "Connection reset by network",
                40: "Network is unreachable",
                41: "Too many open files in system",
                42: "No buffer space available",
                43: "No such device",
                44: "No such file or directory",
                45: "Exec format error",
                46: "No record locks available",
                47: "The link has been severed",
                48: "Not enough core",
                49: "No message of desired type",
                50: "Protocol not available",
                51: "No space left on device",
                52: "Function not implemented",
                53: "Socket is not connected",
                54: "Not a directory",
                55: "Directory not empty",
                56: "State not recoverable",
                57: "Socket operation on non-socket",
                59: "Not a typewriter",
                60: "No such device or address",
                61: "Value too large for defined data type",
                62: "Previous owner died",
                63: "Not super-user",
                64: "Broken pipe",
                65: "Protocol error",
                66: "Unknown protocol",
                67: "Protocol wrong type for socket",
                68: "Math result not representable",
                69: "Read only file system",
                70: "Illegal seek",
                71: "No such process",
                72: "Stale file handle",
                73: "Connection timed out",
                74: "Text file busy",
                75: "Cross-device link",
                100: "Device not a stream",
                101: "Bad font file fmt",
                102: "Invalid slot",
                103: "Invalid request code",
                104: "No anode",
                105: "Block device required",
                106: "Channel number out of range",
                107: "Level 3 halted",
                108: "Level 3 reset",
                109: "Link number out of range",
                110: "Protocol driver not attached",
                111: "No CSI structure available",
                112: "Level 2 halted",
                113: "Invalid exchange",
                114: "Invalid request descriptor",
                115: "Exchange full",
                116: "No data (for no delay io)",
                117: "Timer expired",
                118: "Out of streams resources",
                119: "Machine is not on the network",
                120: "Package not installed",
                121: "The object is remote",
                122: "Advertise error",
                123: "Srmount error",
                124: "Communication error on send",
                125: "Cross mount point (not really error)",
                126: "Given log. name not unique",
                127: "f.d. invalid for this operation",
                128: "Remote address changed",
                129: "Can   access a needed shared lib",
                130: "Accessing a corrupted shared lib",
                131: ".lib section in a.out corrupted",
                132: "Attempting to link in too many libs",
                133: "Attempting to exec a shared library",
                135: "Streams pipe error",
                136: "Too many users",
                137: "Socket type not supported",
                138: "Not supported",
                139: "Protocol family not supported",
                140: "Can't send after socket shutdown",
                141: "Too many references",
                142: "Host is down",
                148: "No medium (in tape drive)",
                156: "Level 2 not synchronized",
              },
              Gt = {
                EPERM: 63,
                ENOENT: 44,
                ESRCH: 71,
                EINTR: 27,
                EIO: 29,
                ENXIO: 60,
                E2BIG: 1,
                ENOEXEC: 45,
                EBADF: 8,
                ECHILD: 12,
                EAGAIN: 6,
                EWOULDBLOCK: 6,
                ENOMEM: 48,
                EACCES: 2,
                EFAULT: 21,
                ENOTBLK: 105,
                EBUSY: 10,
                EEXIST: 20,
                EXDEV: 75,
                ENODEV: 43,
                ENOTDIR: 54,
                EISDIR: 31,
                EINVAL: 28,
                ENFILE: 41,
                EMFILE: 33,
                ENOTTY: 59,
                ETXTBSY: 74,
                EFBIG: 22,
                ENOSPC: 51,
                ESPIPE: 70,
                EROFS: 69,
                EMLINK: 34,
                EPIPE: 64,
                EDOM: 18,
                ERANGE: 68,
                ENOMSG: 49,
                EIDRM: 24,
                ECHRNG: 106,
                EL2NSYNC: 156,
                EL3HLT: 107,
                EL3RST: 108,
                ELNRNG: 109,
                EUNATCH: 110,
                ENOCSI: 111,
                EL2HLT: 112,
                EDEADLK: 16,
                ENOLCK: 46,
                EBADE: 113,
                EBADR: 114,
                EXFULL: 115,
                ENOANO: 104,
                EBADRQC: 103,
                EBADSLT: 102,
                EDEADLOCK: 16,
                EBFONT: 101,
                ENOSTR: 100,
                ENODATA: 116,
                ETIME: 117,
                ENOSR: 118,
                ENONET: 119,
                ENOPKG: 120,
                EREMOTE: 121,
                ENOLINK: 47,
                EADV: 122,
                ESRMNT: 123,
                ECOMM: 124,
                EPROTO: 65,
                EMULTIHOP: 36,
                EDOTDOT: 125,
                EBADMSG: 9,
                ENOTUNIQ: 126,
                EBADFD: 127,
                EREMCHG: 128,
                ELIBACC: 129,
                ELIBBAD: 130,
                ELIBSCN: 131,
                ELIBMAX: 132,
                ELIBEXEC: 133,
                ENOSYS: 52,
                ENOTEMPTY: 55,
                ENAMETOOLONG: 37,
                ELOOP: 32,
                EOPNOTSUPP: 138,
                EPFNOSUPPORT: 139,
                ECONNRESET: 15,
                ENOBUFS: 42,
                EAFNOSUPPORT: 5,
                EPROTOTYPE: 67,
                ENOTSOCK: 57,
                ENOPROTOOPT: 50,
                ESHUTDOWN: 140,
                ECONNREFUSED: 14,
                EADDRINUSE: 3,
                ECONNABORTED: 13,
                ENETUNREACH: 40,
                ENETDOWN: 38,
                ETIMEDOUT: 73,
                EHOSTDOWN: 142,
                EHOSTUNREACH: 23,
                EINPROGRESS: 26,
                EALREADY: 7,
                EDESTADDRREQ: 17,
                EMSGSIZE: 35,
                EPROTONOSUPPORT: 66,
                ESOCKTNOSUPPORT: 137,
                EADDRNOTAVAIL: 4,
                ENETRESET: 39,
                EISCONN: 30,
                ENOTCONN: 53,
                ETOOMANYREFS: 141,
                EUSERS: 136,
                EDQUOT: 19,
                ESTALE: 72,
                ENOTSUP: 138,
                ENOMEDIUM: 148,
                EILSEQ: 25,
                EOVERFLOW: 61,
                ECANCELED: 11,
                ENOTRECOVERABLE: 56,
                EOWNERDEAD: 62,
                ESTRPIPE: 135,
              },
              dn = (r) => (
                br("warning: build with -sDEMANGLE_SUPPORT to link in libcxxabi demangling"), r
              ),
              mn = (r) => {
                var t = /\b_Z[\w\d_]+/g
                return r.replace(t, function (n) {
                  var a = dn(n)
                  return n === a ? n : a + " [" + n + "]"
                })
              },
              o = {
                root: null,
                mounts: [],
                devices: {},
                streams: [],
                nextInode: 1,
                nameTable: null,
                currentPath: "/",
                initialized: !1,
                ignorePermissions: !0,
                ErrnoError: null,
                genericErrors: {},
                filesystems: null,
                syncFSRequests: 0,
                lookupPath(r, t = {}) {
                  if (((r = gr.resolve(r)), !r)) return { path: "", node: null }
                  var n = { follow_mount: !0, recurse_count: 0 }
                  if (((t = Object.assign(n, t)), t.recurse_count > 8)) throw new o.ErrnoError(32)
                  for (
                    var a = r.split("/").filter((W) => !!W), u = o.root, h = "/", p = 0;
                    p < a.length;
                    p++
                  ) {
                    var y = p === a.length - 1
                    if (y && t.parent) break
                    if (
                      ((u = o.lookupNode(u, a[p])),
                      (h = le.join2(h, a[p])),
                      o.isMountpoint(u) && (!y || (y && t.follow_mount)) && (u = u.mounted.root),
                      !y || t.follow)
                    )
                      for (var R = 0; o.isLink(u.mode); ) {
                        var U = o.readlink(h)
                        h = gr.resolve(le.dirname(h), U)
                        var V = o.lookupPath(h, { recurse_count: t.recurse_count + 1 })
                        if (((u = V.node), R++ > 40)) throw new o.ErrnoError(32)
                      }
                  }
                  return { path: h, node: u }
                },
                getPath(r) {
                  for (var t; ; ) {
                    if (o.isRoot(r)) {
                      var n = r.mount.mountpoint
                      return t ? (n[n.length - 1] !== "/" ? `${n}/${t}` : n + t) : n
                    }
                    ;(t = t ? `${r.name}/${t}` : r.name), (r = r.parent)
                  }
                },
                hashName(r, t) {
                  for (var n = 0, a = 0; a < t.length; a++) n = ((n << 5) - n + t.charCodeAt(a)) | 0
                  return ((r + n) >>> 0) % o.nameTable.length
                },
                hashAddNode(r) {
                  var t = o.hashName(r.parent.id, r.name)
                  ;(r.name_next = o.nameTable[t]), (o.nameTable[t] = r)
                },
                hashRemoveNode(r) {
                  var t = o.hashName(r.parent.id, r.name)
                  if (o.nameTable[t] === r) o.nameTable[t] = r.name_next
                  else
                    for (var n = o.nameTable[t]; n; ) {
                      if (n.name_next === r) {
                        n.name_next = r.name_next
                        break
                      }
                      n = n.name_next
                    }
                },
                lookupNode(r, t) {
                  var n = o.mayLookup(r)
                  if (n) throw new o.ErrnoError(n, r)
                  for (var a = o.hashName(r.id, t), u = o.nameTable[a]; u; u = u.name_next) {
                    var h = u.name
                    if (u.parent.id === r.id && h === t) return u
                  }
                  return o.lookup(r, t)
                },
                createNode(r, t, n, a) {
                  g(typeof r == "object")
                  var u = new o.FSNode(r, t, n, a)
                  return o.hashAddNode(u), u
                },
                destroyNode(r) {
                  o.hashRemoveNode(r)
                },
                isRoot(r) {
                  return r === r.parent
                },
                isMountpoint(r) {
                  return !!r.mounted
                },
                isFile(r) {
                  return (r & 61440) === 32768
                },
                isDir(r) {
                  return (r & 61440) === 16384
                },
                isLink(r) {
                  return (r & 61440) === 40960
                },
                isChrdev(r) {
                  return (r & 61440) === 8192
                },
                isBlkdev(r) {
                  return (r & 61440) === 24576
                },
                isFIFO(r) {
                  return (r & 61440) === 4096
                },
                isSocket(r) {
                  return (r & 49152) === 49152
                },
                flagsToPermissionString(r) {
                  var t = ["r", "w", "rw"][r & 3]
                  return r & 512 && (t += "w"), t
                },
                nodePermissions(r, t) {
                  return o.ignorePermissions
                    ? 0
                    : (t.includes("r") && !(r.mode & 292)) ||
                        (t.includes("w") && !(r.mode & 146)) ||
                        (t.includes("x") && !(r.mode & 73))
                      ? 2
                      : 0
                },
                mayLookup(r) {
                  var t = o.nodePermissions(r, "x")
                  return t || (r.node_ops.lookup ? 0 : 2)
                },
                mayCreate(r, t) {
                  try {
                    var n = o.lookupNode(r, t)
                    return 20
                  } catch {}
                  return o.nodePermissions(r, "wx")
                },
                mayDelete(r, t, n) {
                  var a
                  try {
                    a = o.lookupNode(r, t)
                  } catch (h) {
                    return h.errno
                  }
                  var u = o.nodePermissions(r, "wx")
                  if (u) return u
                  if (n) {
                    if (!o.isDir(a.mode)) return 54
                    if (o.isRoot(a) || o.getPath(a) === o.cwd()) return 10
                  } else if (o.isDir(a.mode)) return 31
                  return 0
                },
                mayOpen(r, t) {
                  return r
                    ? o.isLink(r.mode)
                      ? 32
                      : o.isDir(r.mode) && (o.flagsToPermissionString(t) !== "r" || t & 512)
                        ? 31
                        : o.nodePermissions(r, o.flagsToPermissionString(t))
                    : 44
                },
                MAX_OPEN_FDS: 4096,
                nextfd() {
                  for (var r = 0; r <= o.MAX_OPEN_FDS; r++) if (!o.streams[r]) return r
                  throw new o.ErrnoError(33)
                },
                getStreamChecked(r) {
                  var t = o.getStream(r)
                  if (!t) throw new o.ErrnoError(8)
                  return t
                },
                getStream: (r) => o.streams[r],
                createStream(r, t = -1) {
                  return (
                    o.FSStream ||
                      ((o.FSStream = function () {
                        this.shared = {}
                      }),
                      (o.FSStream.prototype = {}),
                      Object.defineProperties(o.FSStream.prototype, {
                        object: {
                          get() {
                            return this.node
                          },
                          set(n) {
                            this.node = n
                          },
                        },
                        isRead: {
                          get() {
                            return (this.flags & 2097155) !== 1
                          },
                        },
                        isWrite: {
                          get() {
                            return (this.flags & 2097155) !== 0
                          },
                        },
                        isAppend: {
                          get() {
                            return this.flags & 1024
                          },
                        },
                        flags: {
                          get() {
                            return this.shared.flags
                          },
                          set(n) {
                            this.shared.flags = n
                          },
                        },
                        position: {
                          get() {
                            return this.shared.position
                          },
                          set(n) {
                            this.shared.position = n
                          },
                        },
                      })),
                    (r = Object.assign(new o.FSStream(), r)),
                    t == -1 && (t = o.nextfd()),
                    (r.fd = t),
                    (o.streams[t] = r),
                    r
                  )
                },
                closeStream(r) {
                  o.streams[r] = null
                },
                chrdev_stream_ops: {
                  open(r) {
                    var t = o.getDevice(r.node.rdev)
                    ;(r.stream_ops = t.stream_ops), r.stream_ops.open && r.stream_ops.open(r)
                  },
                  llseek() {
                    throw new o.ErrnoError(70)
                  },
                },
                major: (r) => r >> 8,
                minor: (r) => r & 255,
                makedev: (r, t) => (r << 8) | t,
                registerDevice(r, t) {
                  o.devices[r] = { stream_ops: t }
                },
                getDevice: (r) => o.devices[r],
                getMounts(r) {
                  for (var t = [], n = [r]; n.length; ) {
                    var a = n.pop()
                    t.push(a), n.push.apply(n, a.mounts)
                  }
                  return t
                },
                syncfs(r, t) {
                  typeof r == "function" && ((t = r), (r = !1)),
                    o.syncFSRequests++,
                    o.syncFSRequests > 1 &&
                      I(
                        `warning: ${o.syncFSRequests} FS.syncfs operations in flight at once, probably just doing extra work`,
                      )
                  var n = o.getMounts(o.root.mount),
                    a = 0
                  function u(p) {
                    return g(o.syncFSRequests > 0), o.syncFSRequests--, t(p)
                  }
                  function h(p) {
                    if (p) return h.errored ? void 0 : ((h.errored = !0), u(p))
                    ++a >= n.length && u(null)
                  }
                  n.forEach((p) => {
                    if (!p.type.syncfs) return h(null)
                    p.type.syncfs(p, r, h)
                  })
                },
                mount(r, t, n) {
                  if (typeof r == "string") throw r
                  var a = n === "/",
                    u = !n,
                    h
                  if (a && o.root) throw new o.ErrnoError(10)
                  if (!a && !u) {
                    var p = o.lookupPath(n, { follow_mount: !1 })
                    if (((n = p.path), (h = p.node), o.isMountpoint(h))) throw new o.ErrnoError(10)
                    if (!o.isDir(h.mode)) throw new o.ErrnoError(54)
                  }
                  var y = { type: r, opts: t, mountpoint: n, mounts: [] },
                    R = r.mount(y)
                  return (
                    (R.mount = y),
                    (y.root = R),
                    a ? (o.root = R) : h && ((h.mounted = y), h.mount && h.mount.mounts.push(y)),
                    R
                  )
                },
                unmount(r) {
                  var t = o.lookupPath(r, { follow_mount: !1 })
                  if (!o.isMountpoint(t.node)) throw new o.ErrnoError(28)
                  var n = t.node,
                    a = n.mounted,
                    u = o.getMounts(a)
                  Object.keys(o.nameTable).forEach((p) => {
                    for (var y = o.nameTable[p]; y; ) {
                      var R = y.name_next
                      u.includes(y.mount) && o.destroyNode(y), (y = R)
                    }
                  }),
                    (n.mounted = null)
                  var h = n.mount.mounts.indexOf(a)
                  g(h !== -1), n.mount.mounts.splice(h, 1)
                },
                lookup(r, t) {
                  return r.node_ops.lookup(r, t)
                },
                mknod(r, t, n) {
                  var a = o.lookupPath(r, { parent: !0 }),
                    u = a.node,
                    h = le.basename(r)
                  if (!h || h === "." || h === "..") throw new o.ErrnoError(28)
                  var p = o.mayCreate(u, h)
                  if (p) throw new o.ErrnoError(p)
                  if (!u.node_ops.mknod) throw new o.ErrnoError(63)
                  return u.node_ops.mknod(u, h, t, n)
                },
                create(r, t) {
                  return (t = t !== void 0 ? t : 438), (t &= 4095), (t |= 32768), o.mknod(r, t, 0)
                },
                mkdir(r, t) {
                  return (t = t !== void 0 ? t : 511), (t &= 1023), (t |= 16384), o.mknod(r, t, 0)
                },
                mkdirTree(r, t) {
                  for (var n = r.split("/"), a = "", u = 0; u < n.length; ++u)
                    if (n[u]) {
                      a += "/" + n[u]
                      try {
                        o.mkdir(a, t)
                      } catch (h) {
                        if (h.errno != 20) throw h
                      }
                    }
                },
                mkdev(r, t, n) {
                  return typeof n > "u" && ((n = t), (t = 438)), (t |= 8192), o.mknod(r, t, n)
                },
                symlink(r, t) {
                  if (!gr.resolve(r)) throw new o.ErrnoError(44)
                  var n = o.lookupPath(t, { parent: !0 }),
                    a = n.node
                  if (!a) throw new o.ErrnoError(44)
                  var u = le.basename(t),
                    h = o.mayCreate(a, u)
                  if (h) throw new o.ErrnoError(h)
                  if (!a.node_ops.symlink) throw new o.ErrnoError(63)
                  return a.node_ops.symlink(a, u, r)
                },
                rename(r, t) {
                  var n = le.dirname(r),
                    a = le.dirname(t),
                    u = le.basename(r),
                    h = le.basename(t),
                    p,
                    y,
                    R
                  if (
                    ((p = o.lookupPath(r, { parent: !0 })),
                    (y = p.node),
                    (p = o.lookupPath(t, { parent: !0 })),
                    (R = p.node),
                    !y || !R)
                  )
                    throw new o.ErrnoError(44)
                  if (y.mount !== R.mount) throw new o.ErrnoError(75)
                  var U = o.lookupNode(y, u),
                    V = gr.relative(r, a)
                  if (V.charAt(0) !== ".") throw new o.ErrnoError(28)
                  if (((V = gr.relative(t, n)), V.charAt(0) !== ".")) throw new o.ErrnoError(55)
                  var W
                  try {
                    W = o.lookupNode(R, h)
                  } catch {}
                  if (U !== W) {
                    var $ = o.isDir(U.mode),
                      z = o.mayDelete(y, u, $)
                    if (z) throw new o.ErrnoError(z)
                    if (((z = W ? o.mayDelete(R, h, $) : o.mayCreate(R, h)), z))
                      throw new o.ErrnoError(z)
                    if (!y.node_ops.rename) throw new o.ErrnoError(63)
                    if (o.isMountpoint(U) || (W && o.isMountpoint(W))) throw new o.ErrnoError(10)
                    if (R !== y && ((z = o.nodePermissions(y, "w")), z)) throw new o.ErrnoError(z)
                    o.hashRemoveNode(U)
                    try {
                      y.node_ops.rename(U, R, h)
                    } catch (J) {
                      throw J
                    } finally {
                      o.hashAddNode(U)
                    }
                  }
                },
                rmdir(r) {
                  var t = o.lookupPath(r, { parent: !0 }),
                    n = t.node,
                    a = le.basename(r),
                    u = o.lookupNode(n, a),
                    h = o.mayDelete(n, a, !0)
                  if (h) throw new o.ErrnoError(h)
                  if (!n.node_ops.rmdir) throw new o.ErrnoError(63)
                  if (o.isMountpoint(u)) throw new o.ErrnoError(10)
                  n.node_ops.rmdir(n, a), o.destroyNode(u)
                },
                readdir(r) {
                  var t = o.lookupPath(r, { follow: !0 }),
                    n = t.node
                  if (!n.node_ops.readdir) throw new o.ErrnoError(54)
                  return n.node_ops.readdir(n)
                },
                unlink(r) {
                  var t = o.lookupPath(r, { parent: !0 }),
                    n = t.node
                  if (!n) throw new o.ErrnoError(44)
                  var a = le.basename(r),
                    u = o.lookupNode(n, a),
                    h = o.mayDelete(n, a, !1)
                  if (h) throw new o.ErrnoError(h)
                  if (!n.node_ops.unlink) throw new o.ErrnoError(63)
                  if (o.isMountpoint(u)) throw new o.ErrnoError(10)
                  n.node_ops.unlink(n, a), o.destroyNode(u)
                },
                readlink(r) {
                  var t = o.lookupPath(r),
                    n = t.node
                  if (!n) throw new o.ErrnoError(44)
                  if (!n.node_ops.readlink) throw new o.ErrnoError(28)
                  return gr.resolve(o.getPath(n.parent), n.node_ops.readlink(n))
                },
                stat(r, t) {
                  var n = o.lookupPath(r, { follow: !t }),
                    a = n.node
                  if (!a) throw new o.ErrnoError(44)
                  if (!a.node_ops.getattr) throw new o.ErrnoError(63)
                  return a.node_ops.getattr(a)
                },
                lstat(r) {
                  return o.stat(r, !0)
                },
                chmod(r, t, n) {
                  var a
                  if (typeof r == "string") {
                    var u = o.lookupPath(r, { follow: !n })
                    a = u.node
                  } else a = r
                  if (!a.node_ops.setattr) throw new o.ErrnoError(63)
                  a.node_ops.setattr(a, {
                    mode: (t & 4095) | (a.mode & -4096),
                    timestamp: Date.now(),
                  })
                },
                lchmod(r, t) {
                  o.chmod(r, t, !0)
                },
                fchmod(r, t) {
                  var n = o.getStreamChecked(r)
                  o.chmod(n.node, t)
                },
                chown(r, t, n, a) {
                  var u
                  if (typeof r == "string") {
                    var h = o.lookupPath(r, { follow: !a })
                    u = h.node
                  } else u = r
                  if (!u.node_ops.setattr) throw new o.ErrnoError(63)
                  u.node_ops.setattr(u, { timestamp: Date.now() })
                },
                lchown(r, t, n) {
                  o.chown(r, t, n, !0)
                },
                fchown(r, t, n) {
                  var a = o.getStreamChecked(r)
                  o.chown(a.node, t, n)
                },
                truncate(r, t) {
                  if (t < 0) throw new o.ErrnoError(28)
                  var n
                  if (typeof r == "string") {
                    var a = o.lookupPath(r, { follow: !0 })
                    n = a.node
                  } else n = r
                  if (!n.node_ops.setattr) throw new o.ErrnoError(63)
                  if (o.isDir(n.mode)) throw new o.ErrnoError(31)
                  if (!o.isFile(n.mode)) throw new o.ErrnoError(28)
                  var u = o.nodePermissions(n, "w")
                  if (u) throw new o.ErrnoError(u)
                  n.node_ops.setattr(n, { size: t, timestamp: Date.now() })
                },
                ftruncate(r, t) {
                  var n = o.getStreamChecked(r)
                  if (!(n.flags & 2097155)) throw new o.ErrnoError(28)
                  o.truncate(n.node, t)
                },
                utime(r, t, n) {
                  var a = o.lookupPath(r, { follow: !0 }),
                    u = a.node
                  u.node_ops.setattr(u, { timestamp: Math.max(t, n) })
                },
                open(r, t, n) {
                  if (r === "") throw new o.ErrnoError(44)
                  ;(t = typeof t == "string" ? bt(t) : t),
                    (n = typeof n > "u" ? 438 : n),
                    t & 64 ? (n = (n & 4095) | 32768) : (n = 0)
                  var a
                  if (typeof r == "object") a = r
                  else {
                    r = le.normalize(r)
                    try {
                      var u = o.lookupPath(r, { follow: !(t & 131072) })
                      a = u.node
                    } catch {}
                  }
                  var h = !1
                  if (t & 64)
                    if (a) {
                      if (t & 128) throw new o.ErrnoError(20)
                    } else (a = o.mknod(r, n, 0)), (h = !0)
                  if (!a) throw new o.ErrnoError(44)
                  if ((o.isChrdev(a.mode) && (t &= -513), t & 65536 && !o.isDir(a.mode)))
                    throw new o.ErrnoError(54)
                  if (!h) {
                    var p = o.mayOpen(a, t)
                    if (p) throw new o.ErrnoError(p)
                  }
                  t & 512 && !h && o.truncate(a, 0), (t &= -131713)
                  var y = o.createStream({
                    node: a,
                    path: o.getPath(a),
                    flags: t,
                    seekable: !0,
                    position: 0,
                    stream_ops: a.stream_ops,
                    ungotten: [],
                    error: !1,
                  })
                  return (
                    y.stream_ops.open && y.stream_ops.open(y),
                    e.logReadFiles &&
                      !(t & 1) &&
                      (o.readFiles || (o.readFiles = {}), r in o.readFiles || (o.readFiles[r] = 1)),
                    y
                  )
                },
                close(r) {
                  if (o.isClosed(r)) throw new o.ErrnoError(8)
                  r.getdents && (r.getdents = null)
                  try {
                    r.stream_ops.close && r.stream_ops.close(r)
                  } catch (t) {
                    throw t
                  } finally {
                    o.closeStream(r.fd)
                  }
                  r.fd = null
                },
                isClosed(r) {
                  return r.fd === null
                },
                llseek(r, t, n) {
                  if (o.isClosed(r)) throw new o.ErrnoError(8)
                  if (!r.seekable || !r.stream_ops.llseek) throw new o.ErrnoError(70)
                  if (n != 0 && n != 1 && n != 2) throw new o.ErrnoError(28)
                  return (r.position = r.stream_ops.llseek(r, t, n)), (r.ungotten = []), r.position
                },
                read(r, t, n, a, u) {
                  if ((g(n >= 0), a < 0 || u < 0)) throw new o.ErrnoError(28)
                  if (o.isClosed(r)) throw new o.ErrnoError(8)
                  if ((r.flags & 2097155) === 1) throw new o.ErrnoError(8)
                  if (o.isDir(r.node.mode)) throw new o.ErrnoError(31)
                  if (!r.stream_ops.read) throw new o.ErrnoError(28)
                  var h = typeof u < "u"
                  if (!h) u = r.position
                  else if (!r.seekable) throw new o.ErrnoError(70)
                  var p = r.stream_ops.read(r, t, n, a, u)
                  return h || (r.position += p), p
                },
                write(r, t, n, a, u, h) {
                  if ((g(n >= 0), a < 0 || u < 0)) throw new o.ErrnoError(28)
                  if (o.isClosed(r)) throw new o.ErrnoError(8)
                  if (!(r.flags & 2097155)) throw new o.ErrnoError(8)
                  if (o.isDir(r.node.mode)) throw new o.ErrnoError(31)
                  if (!r.stream_ops.write) throw new o.ErrnoError(28)
                  r.seekable && r.flags & 1024 && o.llseek(r, 0, 2)
                  var p = typeof u < "u"
                  if (!p) u = r.position
                  else if (!r.seekable) throw new o.ErrnoError(70)
                  var y = r.stream_ops.write(r, t, n, a, u, h)
                  return p || (r.position += y), y
                },
                allocate(r, t, n) {
                  if (o.isClosed(r)) throw new o.ErrnoError(8)
                  if (t < 0 || n <= 0) throw new o.ErrnoError(28)
                  if (!(r.flags & 2097155)) throw new o.ErrnoError(8)
                  if (!o.isFile(r.node.mode) && !o.isDir(r.node.mode)) throw new o.ErrnoError(43)
                  if (!r.stream_ops.allocate) throw new o.ErrnoError(138)
                  r.stream_ops.allocate(r, t, n)
                },
                mmap(r, t, n, a, u) {
                  if (a & 2 && !(u & 2) && (r.flags & 2097155) !== 2) throw new o.ErrnoError(2)
                  if ((r.flags & 2097155) === 1) throw new o.ErrnoError(2)
                  if (!r.stream_ops.mmap) throw new o.ErrnoError(43)
                  return r.stream_ops.mmap(r, t, n, a, u)
                },
                msync(r, t, n, a, u) {
                  return g(n >= 0), r.stream_ops.msync ? r.stream_ops.msync(r, t, n, a, u) : 0
                },
                munmap: (r) => 0,
                ioctl(r, t, n) {
                  if (!r.stream_ops.ioctl) throw new o.ErrnoError(59)
                  return r.stream_ops.ioctl(r, t, n)
                },
                readFile(r, t = {}) {
                  if (
                    ((t.flags = t.flags || 0),
                    (t.encoding = t.encoding || "binary"),
                    t.encoding !== "utf8" && t.encoding !== "binary")
                  )
                    throw new Error(`Invalid encoding type "${t.encoding}"`)
                  var n,
                    a = o.open(r, t.flags),
                    u = o.stat(r),
                    h = u.size,
                    p = new Uint8Array(h)
                  return (
                    o.read(a, p, 0, h, 0),
                    t.encoding === "utf8" ? (n = jr(p, 0)) : t.encoding === "binary" && (n = p),
                    o.close(a),
                    n
                  )
                },
                writeFile(r, t, n = {}) {
                  n.flags = n.flags || 577
                  var a = o.open(r, n.flags, n.mode)
                  if (typeof t == "string") {
                    var u = new Uint8Array(Zr(t) + 1),
                      h = yt(t, u, 0, u.length)
                    o.write(a, u, 0, h, void 0, n.canOwn)
                  } else if (ArrayBuffer.isView(t)) o.write(a, t, 0, t.byteLength, void 0, n.canOwn)
                  else throw new Error("Unsupported data type")
                  o.close(a)
                },
                cwd: () => o.currentPath,
                chdir(r) {
                  var t = o.lookupPath(r, { follow: !0 })
                  if (t.node === null) throw new o.ErrnoError(44)
                  if (!o.isDir(t.node.mode)) throw new o.ErrnoError(54)
                  var n = o.nodePermissions(t.node, "x")
                  if (n) throw new o.ErrnoError(n)
                  o.currentPath = t.path
                },
                createDefaultDirectories() {
                  o.mkdir("/tmp"), o.mkdir("/home"), o.mkdir("/home/web_user")
                },
                createDefaultDevices() {
                  o.mkdir("/dev"),
                    o.registerDevice(o.makedev(1, 3), {
                      read: () => 0,
                      write: (a, u, h, p, y) => p,
                    }),
                    o.mkdev("/dev/null", o.makedev(1, 3)),
                    Xe.register(o.makedev(5, 0), Xe.default_tty_ops),
                    Xe.register(o.makedev(6, 0), Xe.default_tty1_ops),
                    o.mkdev("/dev/tty", o.makedev(5, 0)),
                    o.mkdev("/dev/tty1", o.makedev(6, 0))
                  var r = new Uint8Array(1024),
                    t = 0,
                    n = () => (t === 0 && (t = Lt(r).byteLength), r[--t])
                  o.createDevice("/dev", "random", n),
                    o.createDevice("/dev", "urandom", n),
                    o.mkdir("/dev/shm"),
                    o.mkdir("/dev/shm/tmp")
                },
                createSpecialDirectories() {
                  o.mkdir("/proc")
                  var r = o.mkdir("/proc/self")
                  o.mkdir("/proc/self/fd"),
                    o.mount(
                      {
                        mount() {
                          var t = o.createNode(r, "fd", 16895, 73)
                          return (
                            (t.node_ops = {
                              lookup(n, a) {
                                var u = +a,
                                  h = o.getStreamChecked(u),
                                  p = {
                                    parent: null,
                                    mount: { mountpoint: "fake" },
                                    node_ops: { readlink: () => h.path },
                                  }
                                return (p.parent = p), p
                              },
                            }),
                            t
                          )
                        },
                      },
                      {},
                      "/proc/self/fd",
                    )
                },
                createStandardStreams() {
                  e.stdin
                    ? o.createDevice("/dev", "stdin", e.stdin)
                    : o.symlink("/dev/tty", "/dev/stdin"),
                    e.stdout
                      ? o.createDevice("/dev", "stdout", null, e.stdout)
                      : o.symlink("/dev/tty", "/dev/stdout"),
                    e.stderr
                      ? o.createDevice("/dev", "stderr", null, e.stderr)
                      : o.symlink("/dev/tty1", "/dev/stderr")
                  var r = o.open("/dev/stdin", 0),
                    t = o.open("/dev/stdout", 1),
                    n = o.open("/dev/stderr", 1)
                  g(r.fd === 0, `invalid handle for stdin (${r.fd})`),
                    g(t.fd === 1, `invalid handle for stdout (${t.fd})`),
                    g(n.fd === 2, `invalid handle for stderr (${n.fd})`)
                },
                ensureErrnoError() {
                  o.ErrnoError ||
                    ((o.ErrnoError = function (t, n) {
                      ;(this.name = "ErrnoError"),
                        (this.node = n),
                        (this.setErrno = function (a) {
                          this.errno = a
                          for (var u in Gt)
                            if (Gt[u] === a) {
                              this.code = u
                              break
                            }
                        }),
                        this.setErrno(t),
                        (this.message = cn[t]),
                        this.stack &&
                          (Object.defineProperty(this, "stack", {
                            value: new Error().stack,
                            writable: !0,
                          }),
                          (this.stack = mn(this.stack)))
                    }),
                    (o.ErrnoError.prototype = new Error()),
                    (o.ErrnoError.prototype.constructor = o.ErrnoError),
                    [44].forEach((r) => {
                      ;(o.genericErrors[r] = new o.ErrnoError(r)),
                        (o.genericErrors[r].stack = "<generic error, no stack>")
                    }))
                },
                staticInit() {
                  o.ensureErrnoError(),
                    (o.nameTable = new Array(4096)),
                    o.mount(K, {}, "/"),
                    o.createDefaultDirectories(),
                    o.createDefaultDevices(),
                    o.createSpecialDirectories(),
                    (o.filesystems = { MEMFS: K })
                },
                init(r, t, n) {
                  g(
                    !o.init.initialized,
                    "FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)",
                  ),
                    (o.init.initialized = !0),
                    o.ensureErrnoError(),
                    (e.stdin = r || e.stdin),
                    (e.stdout = t || e.stdout),
                    (e.stderr = n || e.stderr),
                    o.createStandardStreams()
                },
                quit() {
                  ;(o.init.initialized = !1), Fn(0)
                  for (var r = 0; r < o.streams.length; r++) {
                    var t = o.streams[r]
                    t && o.close(t)
                  }
                },
                findObject(r, t) {
                  var n = o.analyzePath(r, t)
                  return n.exists ? n.object : null
                },
                analyzePath(r, t) {
                  try {
                    var n = o.lookupPath(r, { follow: !t })
                    r = n.path
                  } catch {}
                  var a = {
                    isRoot: !1,
                    exists: !1,
                    error: 0,
                    name: null,
                    path: null,
                    object: null,
                    parentExists: !1,
                    parentPath: null,
                    parentObject: null,
                  }
                  try {
                    var n = o.lookupPath(r, { parent: !0 })
                    ;(a.parentExists = !0),
                      (a.parentPath = n.path),
                      (a.parentObject = n.node),
                      (a.name = le.basename(r)),
                      (n = o.lookupPath(r, { follow: !t })),
                      (a.exists = !0),
                      (a.path = n.path),
                      (a.object = n.node),
                      (a.name = n.node.name),
                      (a.isRoot = n.path === "/")
                  } catch (u) {
                    a.error = u.errno
                  }
                  return a
                },
                createPath(r, t, n, a) {
                  r = typeof r == "string" ? r : o.getPath(r)
                  for (var u = t.split("/").reverse(); u.length; ) {
                    var h = u.pop()
                    if (h) {
                      var p = le.join2(r, h)
                      try {
                        o.mkdir(p)
                      } catch {}
                      r = p
                    }
                  }
                  return p
                },
                createFile(r, t, n, a, u) {
                  var h = le.join2(typeof r == "string" ? r : o.getPath(r), t),
                    p = gt(a, u)
                  return o.create(h, p)
                },
                createDataFile(r, t, n, a, u, h) {
                  var p = t
                  r && ((r = typeof r == "string" ? r : o.getPath(r)), (p = t ? le.join2(r, t) : r))
                  var y = gt(a, u),
                    R = o.create(p, y)
                  if (n) {
                    if (typeof n == "string") {
                      for (var U = new Array(n.length), V = 0, W = n.length; V < W; ++V)
                        U[V] = n.charCodeAt(V)
                      n = U
                    }
                    o.chmod(R, y | 146)
                    var $ = o.open(R, 577)
                    o.write($, n, 0, n.length, 0, h), o.close($), o.chmod(R, y)
                  }
                },
                createDevice(r, t, n, a) {
                  var u = le.join2(typeof r == "string" ? r : o.getPath(r), t),
                    h = gt(!!n, !!a)
                  o.createDevice.major || (o.createDevice.major = 64)
                  var p = o.makedev(o.createDevice.major++, 0)
                  return (
                    o.registerDevice(p, {
                      open(y) {
                        y.seekable = !1
                      },
                      close(y) {
                        a && a.buffer && a.buffer.length && a(10)
                      },
                      read(y, R, U, V, W) {
                        for (var $ = 0, z = 0; z < V; z++) {
                          var J
                          try {
                            J = n()
                          } catch {
                            throw new o.ErrnoError(29)
                          }
                          if (J === void 0 && $ === 0) throw new o.ErrnoError(6)
                          if (J == null) break
                          $++, (R[U + z] = J)
                        }
                        return $ && (y.node.timestamp = Date.now()), $
                      },
                      write(y, R, U, V, W) {
                        for (var $ = 0; $ < V; $++)
                          try {
                            a(R[U + $])
                          } catch {
                            throw new o.ErrnoError(29)
                          }
                        return V && (y.node.timestamp = Date.now()), $
                      },
                    }),
                    o.mkdev(u, h, p)
                  )
                },
                forceLoadFile(r) {
                  if (r.isDevice || r.isFolder || r.link || r.contents) return !0
                  if (typeof XMLHttpRequest < "u")
                    throw new Error(
                      "Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.",
                    )
                  if (Re)
                    try {
                      ;(r.contents = wt(Re(r.url), !0)), (r.usedBytes = r.contents.length)
                    } catch {
                      throw new o.ErrnoError(29)
                    }
                  else throw new Error("Cannot load without read() or XMLHttpRequest.")
                },
                createLazyFile(r, t, n, a, u) {
                  function h() {
                    ;(this.lengthKnown = !1), (this.chunks = [])
                  }
                  if (
                    ((h.prototype.get = function (z) {
                      if (!(z > this.length - 1 || z < 0)) {
                        var J = z % this.chunkSize,
                          fe = (z / this.chunkSize) | 0
                        return this.getter(fe)[J]
                      }
                    }),
                    (h.prototype.setDataGetter = function (z) {
                      this.getter = z
                    }),
                    (h.prototype.cacheLength = function () {
                      var z = new XMLHttpRequest()
                      if (
                        (z.open("HEAD", n, !1),
                        z.send(null),
                        !((z.status >= 200 && z.status < 300) || z.status === 304))
                      )
                        throw new Error("Couldn't load " + n + ". Status: " + z.status)
                      var J = Number(z.getResponseHeader("Content-length")),
                        fe,
                        Er = (fe = z.getResponseHeader("Accept-Ranges")) && fe === "bytes",
                        ir = (fe = z.getResponseHeader("Content-Encoding")) && fe === "gzip",
                        We = 1024 * 1024
                      Er || (We = J)
                      var Ue = (or, St) => {
                          if (or > St)
                            throw new Error(
                              "invalid range (" + or + ", " + St + ") or no bytes requested!",
                            )
                          if (St > J - 1)
                            throw new Error("only " + J + " bytes available! programmer error!")
                          var Le = new XMLHttpRequest()
                          if (
                            (Le.open("GET", n, !1),
                            J !== We && Le.setRequestHeader("Range", "bytes=" + or + "-" + St),
                            (Le.responseType = "arraybuffer"),
                            Le.overrideMimeType &&
                              Le.overrideMimeType("text/plain; charset=x-user-defined"),
                            Le.send(null),
                            !((Le.status >= 200 && Le.status < 300) || Le.status === 304))
                          )
                            throw new Error("Couldn't load " + n + ". Status: " + Le.status)
                          return Le.response !== void 0
                            ? new Uint8Array(Le.response || [])
                            : wt(Le.responseText || "", !0)
                        },
                        Mr = this
                      Mr.setDataGetter((or) => {
                        var St = or * We,
                          Le = (or + 1) * We - 1
                        if (
                          ((Le = Math.min(Le, J - 1)),
                          typeof Mr.chunks[or] > "u" && (Mr.chunks[or] = Ue(St, Le)),
                          typeof Mr.chunks[or] > "u")
                        )
                          throw new Error("doXHR failed!")
                        return Mr.chunks[or]
                      }),
                        (ir || !J) &&
                          ((We = J = 1),
                          (J = this.getter(0).length),
                          (We = J),
                          de(
                            "LazyFiles on gzip forces download of the whole file when length is accessed",
                          )),
                        (this._length = J),
                        (this._chunkSize = We),
                        (this.lengthKnown = !0)
                    }),
                    typeof XMLHttpRequest < "u")
                  ) {
                    if (!ae)
                      throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc"
                    var p = new h()
                    Object.defineProperties(p, {
                      length: {
                        get: function () {
                          return this.lengthKnown || this.cacheLength(), this._length
                        },
                      },
                      chunkSize: {
                        get: function () {
                          return this.lengthKnown || this.cacheLength(), this._chunkSize
                        },
                      },
                    })
                    var y = { isDevice: !1, contents: p }
                  } else var y = { isDevice: !1, url: n }
                  var R = o.createFile(r, t, y, a, u)
                  y.contents
                    ? (R.contents = y.contents)
                    : y.url && ((R.contents = null), (R.url = y.url)),
                    Object.defineProperties(R, {
                      usedBytes: {
                        get: function () {
                          return this.contents.length
                        },
                      },
                    })
                  var U = {},
                    V = Object.keys(R.stream_ops)
                  V.forEach(($) => {
                    var z = R.stream_ops[$]
                    U[$] = function () {
                      return o.forceLoadFile(R), z.apply(null, arguments)
                    }
                  })
                  function W($, z, J, fe, Er) {
                    var ir = $.node.contents
                    if (Er >= ir.length) return 0
                    var We = Math.min(ir.length - Er, fe)
                    if ((g(We >= 0), ir.slice))
                      for (var Ue = 0; Ue < We; Ue++) z[J + Ue] = ir[Er + Ue]
                    else for (var Ue = 0; Ue < We; Ue++) z[J + Ue] = ir.get(Er + Ue)
                    return We
                  }
                  return (
                    (U.read = ($, z, J, fe, Er) => (o.forceLoadFile(R), W($, z, J, fe, Er))),
                    (U.mmap = ($, z, J, fe, Er) => {
                      o.forceLoadFile(R)
                      var ir = st(z)
                      if (!ir) throw new o.ErrnoError(48)
                      return W($, Se, ir, z, J), { ptr: ir, allocated: !0 }
                    }),
                    (R.stream_ops = U),
                    R
                  )
                },
                absolutePath() {
                  te("FS.absolutePath has been removed; use PATH_FS.resolve instead")
                },
                createFolder() {
                  te("FS.createFolder has been removed; use FS.mkdir instead")
                },
                createLink() {
                  te("FS.createLink has been removed; use FS.symlink instead")
                },
                joinPath() {
                  te("FS.joinPath has been removed; use PATH.join instead")
                },
                mmapAlloc() {
                  te("FS.mmapAlloc has been replaced by the top level function mmapAlloc")
                },
                standardizePath() {
                  te("FS.standardizePath has been removed; use PATH.normalize instead")
                },
              },
              ye = {
                DEFAULT_POLLMASK: 5,
                calculateAt(r, t, n) {
                  if (le.isAbs(t)) return t
                  var a
                  if (r === -100) a = o.cwd()
                  else {
                    var u = ye.getStreamFromFD(r)
                    a = u.path
                  }
                  if (t.length == 0) {
                    if (!n) throw new o.ErrnoError(44)
                    return a
                  }
                  return le.join2(a, t)
                },
                doStat(r, t, n) {
                  try {
                    var a = r(t)
                  } catch (y) {
                    if (y && y.node && le.normalize(t) !== le.normalize(o.getPath(y.node)))
                      return -54
                    throw y
                  }
                  ;(G[n >> 2] = a.dev),
                    (G[(n + 4) >> 2] = a.mode),
                    (B[(n + 8) >> 2] = a.nlink),
                    (G[(n + 12) >> 2] = a.uid),
                    (G[(n + 16) >> 2] = a.gid),
                    (G[(n + 20) >> 2] = a.rdev),
                    (b = [
                      a.size >>> 0,
                      ((S = a.size),
                      +Math.abs(S) >= 1
                        ? S > 0
                          ? +Math.floor(S / 4294967296) >>> 0
                          : ~~+Math.ceil((S - +(~~S >>> 0)) / 4294967296) >>> 0
                        : 0),
                    ]),
                    (G[(n + 24) >> 2] = b[0]),
                    (G[(n + 28) >> 2] = b[1]),
                    (G[(n + 32) >> 2] = 4096),
                    (G[(n + 36) >> 2] = a.blocks)
                  var u = a.atime.getTime(),
                    h = a.mtime.getTime(),
                    p = a.ctime.getTime()
                  return (
                    (b = [
                      Math.floor(u / 1e3) >>> 0,
                      ((S = Math.floor(u / 1e3)),
                      +Math.abs(S) >= 1
                        ? S > 0
                          ? +Math.floor(S / 4294967296) >>> 0
                          : ~~+Math.ceil((S - +(~~S >>> 0)) / 4294967296) >>> 0
                        : 0),
                    ]),
                    (G[(n + 40) >> 2] = b[0]),
                    (G[(n + 44) >> 2] = b[1]),
                    (B[(n + 48) >> 2] = (u % 1e3) * 1e3),
                    (b = [
                      Math.floor(h / 1e3) >>> 0,
                      ((S = Math.floor(h / 1e3)),
                      +Math.abs(S) >= 1
                        ? S > 0
                          ? +Math.floor(S / 4294967296) >>> 0
                          : ~~+Math.ceil((S - +(~~S >>> 0)) / 4294967296) >>> 0
                        : 0),
                    ]),
                    (G[(n + 56) >> 2] = b[0]),
                    (G[(n + 60) >> 2] = b[1]),
                    (B[(n + 64) >> 2] = (h % 1e3) * 1e3),
                    (b = [
                      Math.floor(p / 1e3) >>> 0,
                      ((S = Math.floor(p / 1e3)),
                      +Math.abs(S) >= 1
                        ? S > 0
                          ? +Math.floor(S / 4294967296) >>> 0
                          : ~~+Math.ceil((S - +(~~S >>> 0)) / 4294967296) >>> 0
                        : 0),
                    ]),
                    (G[(n + 72) >> 2] = b[0]),
                    (G[(n + 76) >> 2] = b[1]),
                    (B[(n + 80) >> 2] = (p % 1e3) * 1e3),
                    (b = [
                      a.ino >>> 0,
                      ((S = a.ino),
                      +Math.abs(S) >= 1
                        ? S > 0
                          ? +Math.floor(S / 4294967296) >>> 0
                          : ~~+Math.ceil((S - +(~~S >>> 0)) / 4294967296) >>> 0
                        : 0),
                    ]),
                    (G[(n + 88) >> 2] = b[0]),
                    (G[(n + 92) >> 2] = b[1]),
                    0
                  )
                },
                doMsync(r, t, n, a, u) {
                  if (!o.isFile(t.node.mode)) throw new o.ErrnoError(43)
                  if (a & 2) return 0
                  var h = Ee.slice(r, r + n)
                  o.msync(t, h, u, n, a)
                },
                varargs: void 0,
                get() {
                  g(ye.varargs != null)
                  var r = G[+ye.varargs >> 2]
                  return (ye.varargs += 4), r
                },
                getp() {
                  return ye.get()
                },
                getStr(r) {
                  var t = Ke(r)
                  return t
                },
                getStreamFromFD(r) {
                  var t = o.getStreamChecked(r)
                  return t
                },
              }
            function _n(r) {
              try {
                var t = ye.getStreamFromFD(r)
                return o.createStream(t).fd
              } catch (n) {
                if (typeof o > "u" || n.name !== "ErrnoError") throw n
                return -n.errno
              }
            }
            function D(r, t, n) {
              try {
                return (
                  (t = ye.getStr(t)),
                  (t = ye.calculateAt(r, t)),
                  (t = le.normalize(t)),
                  t[t.length - 1] === "/" && (t = t.substr(0, t.length - 1)),
                  o.mkdir(t, n, 0),
                  0
                )
              } catch (a) {
                if (typeof o > "u" || a.name !== "ErrnoError") throw a
                return -a.errno
              }
            }
            function fn(r, t, n, a) {
              ye.varargs = a
              try {
                ;(t = ye.getStr(t)), (t = ye.calculateAt(r, t))
                var u = a ? ye.get() : 0
                return o.open(t, n, u).fd
              } catch (h) {
                if (typeof o > "u" || h.name !== "ErrnoError") throw h
                return -h.errno
              }
            }
            function hn(r, t) {
              try {
                return (r = ye.getStr(r)), ye.doStat(o.stat, r, t)
              } catch (n) {
                if (typeof o > "u" || n.name !== "ErrnoError") throw n
                return -n.errno
              }
            }
            var Sn = 1,
              pn = () => Sn,
              Qt = (r) => {
                var t = typeof mt < "u" ? mt : void 0,
                  n = typeof rt < "u" ? rt : void 0,
                  a = typeof Lr < "u" ? Lr : void 0
                ;(mt = _t), (rt = s), (Lr = Cn)
                try {
                  return r()
                } finally {
                  ;(mt = t), (rt = n), (Lr = a)
                }
              },
              ut = (r, t, n) => (
                g(
                  typeof n == "number",
                  "stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!",
                ),
                yt(r, Ee, t, n)
              ),
              Or = (r) => {
                var t = Zr(r) + 1,
                  n = mt(t)
                return n && ut(r, n, t), n
              },
              Je = (r) => Qt(() => Or(e[Ke(r)] || "")),
              zn = () => {
                var r = e.printWithColors
                return r !== void 0 ? r : q && process.stderr.isTTY
              },
              Bt = (r) => r % 4 === 0 && (r % 100 !== 0 || r % 400 === 0),
              Jn = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335],
              Wn = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
              $n = (r) => {
                var t = Bt(r.getFullYear()),
                  n = t ? Jn : Wn,
                  a = n[r.getMonth()] + r.getDate() - 1
                return a
              },
              Et = (r, t) => (
                g(r == r >>> 0 || r == (r | 0)),
                g(t === (t | 0)),
                (t + 2097152) >>> 0 < 4194305 - !!r ? (r >>> 0) + t * 4294967296 : NaN
              )
            function Yn(r, t, n) {
              var a = Et(r, t),
                u = new Date(a * 1e3)
              ;(G[n >> 2] = u.getSeconds()),
                (G[(n + 4) >> 2] = u.getMinutes()),
                (G[(n + 8) >> 2] = u.getHours()),
                (G[(n + 12) >> 2] = u.getDate()),
                (G[(n + 16) >> 2] = u.getMonth()),
                (G[(n + 20) >> 2] = u.getFullYear() - 1900),
                (G[(n + 24) >> 2] = u.getDay())
              var h = $n(u) | 0
              ;(G[(n + 28) >> 2] = h), (G[(n + 36) >> 2] = -(u.getTimezoneOffset() * 60))
              var p = new Date(u.getFullYear(), 0, 1),
                y = new Date(u.getFullYear(), 6, 1).getTimezoneOffset(),
                R = p.getTimezoneOffset(),
                U = (y != R && u.getTimezoneOffset() == Math.min(R, y)) | 0
              G[(n + 32) >> 2] = U
            }
            function qn(r, t, n, a, u, h, p, y) {
              var R = Et(u, h)
              try {
                if (isNaN(R)) return 61
                var U = ye.getStreamFromFD(a),
                  V = o.mmap(U, r, R, t, n),
                  W = V.ptr
                return (G[p >> 2] = V.allocated), (B[y >> 2] = W), 0
              } catch ($) {
                if (typeof o > "u" || $.name !== "ErrnoError") throw $
                return -$.errno
              }
            }
            function Kn(r, t, n, a, u, h, p) {
              var y = Et(h, p)
              try {
                if (isNaN(y)) return 61
                var R = ye.getStreamFromFD(u)
                n & 2 && ye.doMsync(r, R, t, a, y), o.munmap(R)
              } catch (U) {
                if (typeof o > "u" || U.name !== "ErrnoError") throw U
                return -U.errno
              }
            }
            var Xn = (r, t, n) => {
                var a = new Date().getFullYear(),
                  u = new Date(a, 0, 1),
                  h = new Date(a, 6, 1),
                  p = u.getTimezoneOffset(),
                  y = h.getTimezoneOffset(),
                  R = Math.max(p, y)
                ;(B[r >> 2] = R * 60), (G[t >> 2] = +(p != y))
                function U(J) {
                  var fe = J.toTimeString().match(/\(([A-Za-z ]+)\)$/)
                  return fe ? fe[1] : "GMT"
                }
                var V = U(u),
                  W = U(h),
                  $ = Or(V),
                  z = Or(W)
                y < p
                  ? ((B[n >> 2] = $), (B[(n + 4) >> 2] = z))
                  : ((B[n >> 2] = z), (B[(n + 4) >> 2] = $))
              },
              Zn = () => {
                te("native code called abort()")
              },
              ei = () => Date.now(),
              Tn = () => 2147483648,
              ri = () => Tn(),
              ti = (r, t) => ut(P, r, t),
              vn
            vn = () => performance.now()
            var ni = (r, t, n) => Ee.copyWithin(r, t, t + n),
              nr = {},
              Ft = (r) => {
                g(yr)
                var t
                return (t = /\bwasm-function\[\d+\]:(0x[0-9a-f]+)/.exec(r))
                  ? +t[1]
                  : (t = /\bwasm-function\[(\d+)\]:(\d+)/.exec(r))
                    ? yr.convert(+t[1], +t[2])
                    : (t = /:(\d+):\d+(?:\)|$)/.exec(r))
                      ? 2147483648 | +t[1]
                      : 0
              },
              At = (r) => {
                if (nr.last_get_source_pc == r) return nr.last_source
                var t, n
                if ((Hr && (n = Hr.lookup(r)), !n)) {
                  var a = nr[r]
                  if (!a) return null
                  ;(t = /\((.*):(\d+):(\d+)\)$/.exec(a))
                    ? (n = { file: t[1], line: t[2], column: t[3] })
                    : (t = /@(.*):(\d+):(\d+)/.exec(a)) &&
                      (n = { file: t[1], line: t[2], column: t[3] })
                }
                return (nr.last_get_source_pc = r), (nr.last_source = n), n
              },
              ii = (r) => {
                var t = At(r)
                return (t && t.column) || 0
              },
              ct = (r) =>
                Qt(() => {
                  var t = At(r)
                  return t ? (ct.ret && Lr(ct.ret), (ct.ret = Or(t.file)), ct.ret) : 0
                }),
              dt = (r) =>
                Qt(() => {
                  var t
                  if (r & 2147483648) {
                    var n = nr[r]
                    if (!n) return 0
                    var a
                    if ((a = /^\s+at (.*) \(.*\)$/.exec(n))) t = a[1]
                    else if ((a = /^(.+?)@/.exec(n))) t = a[1]
                    else return 0
                  } else t = yr.getName(r)
                  return dt.ret && Lr(dt.ret), (dt.ret = Or(t)), dt.ret
                }),
              oi = (r) => {
                var t = At(r)
                return t ? t.line : 0
              },
              ai = (r) => {
                var t = Qe.buffer,
                  n = (r - t.byteLength + 65535) / 65536
                try {
                  return Qe.grow(n), mr(), 1
                } catch (a) {
                  I(
                    `growMemory: Attempted to grow heap from ${t.byteLength} bytes to ${r} bytes, but got error: ${a}`,
                  )
                }
              },
              si = (r) => {
                var t = Ee.length
                ;(r >>>= 0), g(r > t)
                var n = Tn()
                if (r > n)
                  return (
                    I(`Cannot enlarge memory, requested ${r} bytes, but the limit is ${n} bytes!`),
                    !1
                  )
                for (var a = (R, U) => R + ((U - (R % U)) % U), u = 1; u <= 4; u *= 2) {
                  var h = t * (1 + 0.2 / u)
                  h = Math.min(h, r + 100663296)
                  var p = Math.min(n, a(Math.max(r, h), 65536)),
                    y = ai(p)
                  if (y) return !0
                }
                return (
                  I(`Failed to grow the heap from ${t} bytes to ${p} bytes, not enough memory!`), !1
                )
              },
              yn = (r) => {
                r.forEach((t) => {
                  var n = Ft(t)
                  n && (nr[n] = t)
                })
              }
            function wn() {
              var r = new Error()
              if (!r.stack) {
                try {
                  throw new Error()
                } catch (t) {
                  r = t
                }
                if (!r.stack) return "(no stack trace available)"
              }
              return r.stack.toString()
            }
            function li() {
              var r = wn().split(`
`)
              return (
                r[0] == "Error" && r.shift(),
                yn(r),
                (nr.last_addr = Ft(r[3])),
                (nr.last_stack = r),
                nr.last_addr
              )
            }
            var ui = (r, t, n) => {
              var a
              nr.last_addr == r
                ? (a = nr.last_stack)
                : ((a = wn().split(`
`)),
                  a[0] == "Error" && a.shift(),
                  yn(a))
              for (var u = 3; a[u] && Ft(a[u]) != r; ) ++u
              for (var h = 0; h < n && a[h + u]; ++h) G[(t + h * 4) >> 2] = Ft(a[h + u])
              return h
            }
            function ci(r) {
              try {
                var t = ye.getStreamFromFD(r)
                return o.close(t), 0
              } catch (n) {
                if (typeof o > "u" || n.name !== "ErrnoError") throw n
                return n.errno
              }
            }
            var di = (r, t, n, a) => {
              for (var u = 0, h = 0; h < n; h++) {
                var p = B[t >> 2],
                  y = B[(t + 4) >> 2]
                t += 8
                var R = o.read(r, Se, p, y, a)
                if (R < 0) return -1
                if (((u += R), R < y)) break
                typeof a < "u" && (a += R)
              }
              return u
            }
            function mi(r, t, n, a) {
              try {
                var u = ye.getStreamFromFD(r),
                  h = di(u, t, n)
                return (B[a >> 2] = h), 0
              } catch (p) {
                if (typeof o > "u" || p.name !== "ErrnoError") throw p
                return p.errno
              }
            }
            function _i(r, t, n, a, u) {
              var h = Et(t, n)
              try {
                if (isNaN(h)) return 61
                var p = ye.getStreamFromFD(r)
                return (
                  o.llseek(p, h, a),
                  (b = [
                    p.position >>> 0,
                    ((S = p.position),
                    +Math.abs(S) >= 1
                      ? S > 0
                        ? +Math.floor(S / 4294967296) >>> 0
                        : ~~+Math.ceil((S - +(~~S >>> 0)) / 4294967296) >>> 0
                      : 0),
                  ]),
                  (G[u >> 2] = b[0]),
                  (G[(u + 4) >> 2] = b[1]),
                  p.getdents && h === 0 && a === 0 && (p.getdents = null),
                  0
                )
              } catch (y) {
                if (typeof o > "u" || y.name !== "ErrnoError") throw y
                return y.errno
              }
            }
            var fi = (r, t, n, a) => {
              for (var u = 0, h = 0; h < n; h++) {
                var p = B[t >> 2],
                  y = B[(t + 4) >> 2]
                t += 8
                var R = o.write(r, Se, p, y, a)
                if (R < 0) return -1
                ;(u += R), typeof a < "u" && (a += R)
              }
              return u
            }
            function hi(r, t, n, a) {
              try {
                var u = ye.getStreamFromFD(r),
                  h = fi(u, t, n)
                return (B[a >> 2] = h), 0
              } catch (p) {
                if (typeof o > "u" || p.name !== "ErrnoError") throw p
                return p.errno
              }
            }
            var Si = 0,
              pi = () => rn || Si > 0,
              Ti = (r) => {
                ;(De = r), pi() || (e.onExit && e.onExit(r), (ue = !0)), Y(r, new Tt(r))
              },
              vi = (r) => {
                var t = e["_" + r]
                return g(t, "Cannot call unknown function " + r + ", make sure it is exported"), t
              },
              yi = (r, t) => {
                g(
                  r.length >= 0,
                  "writeArrayToMemory array must have a length (should be an array or typed array)",
                ),
                  Se.set(r, t)
              },
              wi = (r) => {
                var t = Zr(r) + 1,
                  n = ce(t)
                return ut(r, n, t), n
              },
              bi = (r, t, n, a, u) => {
                var h = {
                  string: (J) => {
                    var fe = 0
                    return J != null && J !== 0 && (fe = wi(J)), fe
                  },
                  array: (J) => {
                    var fe = ce(J.length)
                    return yi(J, fe), fe
                  },
                }
                function p(J) {
                  return t === "string" ? Ke(J) : t === "boolean" ? !!J : J
                }
                var y = vi(r),
                  R = [],
                  U = 0
                if ((g(t !== "array", 'Return type should not be "array".'), a))
                  for (var V = 0; V < a.length; V++) {
                    var W = h[n[V]]
                    W ? (U === 0 && (U = Z()), (R[V] = W(a[V]))) : (R[V] = a[V])
                  }
                var $ = y.apply(null, R)
                function z(J) {
                  return U !== 0 && ee(U), p(J)
                }
                return ($ = z($)), $
              },
              gi = (r, t, n, a) =>
                function () {
                  return bi(r, t, n, arguments, a)
                },
              bn = function (r, t, n, a) {
                r || (r = this),
                  (this.parent = r),
                  (this.mount = r.mount),
                  (this.mounted = null),
                  (this.id = o.nextInode++),
                  (this.name = t),
                  (this.mode = n),
                  (this.node_ops = {}),
                  (this.stream_ops = {}),
                  (this.rdev = a)
              },
              Ct = 365,
              Rt = 146
            Object.defineProperties(bn.prototype, {
              read: {
                get: function () {
                  return (this.mode & Ct) === Ct
                },
                set: function (r) {
                  r ? (this.mode |= Ct) : (this.mode &= ~Ct)
                },
              },
              write: {
                get: function () {
                  return (this.mode & Rt) === Rt
                },
                set: function (r) {
                  r ? (this.mode |= Rt) : (this.mode &= ~Rt)
                },
              },
              isFolder: {
                get: function () {
                  return o.isDir(this.mode)
                },
              },
              isDevice: {
                get: function () {
                  return o.isChrdev(this.mode)
                },
              },
            }),
              (o.FSNode = bn),
              (o.createPreloadedFile = et),
              o.staticInit()
            function Qi() {
              ne("fetchSettings")
            }
            var gn = {
                __assert_fail: nn,
                __syscall_dup: _n,
                __syscall_mkdirat: D,
                __syscall_openat: fn,
                __syscall_stat64: hn,
                _emscripten_get_now_is_monotonic: pn,
                _emscripten_sanitizer_get_option: Je,
                _emscripten_sanitizer_use_colors: zn,
                _localtime_js: Yn,
                _mmap_js: qn,
                _munmap_js: Kn,
                _tzset_js: Xn,
                abort: Zn,
                emscripten_date_now: ei,
                emscripten_get_heap_max: ri,
                emscripten_get_module_name: ti,
                emscripten_get_now: vn,
                emscripten_memcpy_js: ni,
                emscripten_pc_get_column: ii,
                emscripten_pc_get_file: ct,
                emscripten_pc_get_function: dt,
                emscripten_pc_get_line: oi,
                emscripten_resize_heap: si,
                emscripten_stack_snapshot: li,
                emscripten_stack_unwind_buffer: ui,
                fd_close: ci,
                fd_read: mi,
                fd_seek: _i,
                fd_write: hi,
                proc_exit: Ti,
                qts_host_call_function: we,
                qts_host_interrupt_handler: wr,
                qts_host_load_module_source: ze,
                qts_host_normalize_module: jt,
              },
              Qr = _(),
              wo = E("__wasm_call_ctors"),
              mt = (e._malloc = E("malloc")),
              bo = (e._QTS_Throw = E("QTS_Throw")),
              go = (e._QTS_NewError = E("QTS_NewError")),
              Qo = (e._QTS_RuntimeSetMemoryLimit = E("QTS_RuntimeSetMemoryLimit")),
              Eo = (e._QTS_RuntimeComputeMemoryUsage = E("QTS_RuntimeComputeMemoryUsage")),
              Fo = (e._QTS_RuntimeDumpMemoryUsage = E("QTS_RuntimeDumpMemoryUsage")),
              Ao = (e._QTS_RecoverableLeakCheck = E("QTS_RecoverableLeakCheck")),
              Co = (e._QTS_BuildIsSanitizeLeak = E("QTS_BuildIsSanitizeLeak")),
              Ro = (e._QTS_RuntimeSetMaxStackSize = E("QTS_RuntimeSetMaxStackSize")),
              Ei = (e._QTS_GetUndefined = E("QTS_GetUndefined")),
              Po = (e._QTS_GetNull = E("QTS_GetNull")),
              Qn = (e._QTS_GetFalse = E("QTS_GetFalse")),
              Fi = (e._QTS_GetTrue = E("QTS_GetTrue")),
              Ai = (e._QTS_NewRuntime = E("QTS_NewRuntime")),
              Ht = (e._QTS_FreeRuntime = E("QTS_FreeRuntime")),
              Ci = (e._QTS_NewContext = E("QTS_NewContext")),
              Ri = (e._QTS_FreeContext = E("QTS_FreeContext")),
              En = (e._QTS_FreeValuePointer = E("QTS_FreeValuePointer")),
              Lr = (e._free = E("free")),
              ko = (e._QTS_FreeValuePointerRuntime = E("QTS_FreeValuePointerRuntime")),
              Mo = (e._QTS_FreeVoidPointer = E("QTS_FreeVoidPointer")),
              No = (e._QTS_FreeCString = E("QTS_FreeCString")),
              xo = (e._QTS_DupValuePointer = E("QTS_DupValuePointer")),
              Do = (e._QTS_NewObject = E("QTS_NewObject")),
              Io = (e._QTS_NewObjectProto = E("QTS_NewObjectProto")),
              jo = (e._QTS_NewArray = E("QTS_NewArray")),
              Oo = (e._QTS_NewArrayBuffer = E("QTS_NewArrayBuffer")),
              Lo = (e._QTS_NewFloat64 = E("QTS_NewFloat64")),
              Uo = (e._QTS_GetFloat64 = E("QTS_GetFloat64")),
              Go = (e._QTS_NewString = E("QTS_NewString")),
              Bo = (e._QTS_GetString = E("QTS_GetString")),
              Ho = (e._QTS_GetArrayBuffer = E("QTS_GetArrayBuffer")),
              Vo = (e._QTS_GetArrayBufferLength = E("QTS_GetArrayBufferLength")),
              zo = (e._QTS_NewSymbol = E("QTS_NewSymbol")),
              Jo = (e._QTS_GetSymbolDescriptionOrKey = E("QTS_GetSymbolDescriptionOrKey")),
              Wo = (e._QTS_IsGlobalSymbol = E("QTS_IsGlobalSymbol")),
              $o = (e._QTS_IsJobPending = E("QTS_IsJobPending")),
              Yo = (e._QTS_ExecutePendingJob = E("QTS_ExecutePendingJob")),
              qo = (e._QTS_GetProp = E("QTS_GetProp")),
              Ko = (e._QTS_SetProp = E("QTS_SetProp")),
              Xo = (e._QTS_DefineProp = E("QTS_DefineProp")),
              Zo = (e._QTS_Call = E("QTS_Call")),
              ea = (e._QTS_ResolveException = E("QTS_ResolveException")),
              ra = (e._QTS_Dump = E("QTS_Dump")),
              ta = (e._QTS_Eval = E("QTS_Eval")),
              na = (e._QTS_Typeof = E("QTS_Typeof")),
              ia = (e._QTS_GetGlobalObject = E("QTS_GetGlobalObject")),
              oa = (e._QTS_NewPromiseCapability = E("QTS_NewPromiseCapability")),
              aa = (e._QTS_TestStringArg = E("QTS_TestStringArg")),
              sa = (e._QTS_BuildIsDebug = E("QTS_BuildIsDebug")),
              la = (e._QTS_BuildIsAsyncify = E("QTS_BuildIsAsyncify")),
              ua = (e._QTS_NewFunction = E("QTS_NewFunction")),
              Pi = (e._QTS_ArgvGetJSValueConstPointer = E("QTS_ArgvGetJSValueConstPointer")),
              ki = (e._QTS_RuntimeEnableInterruptHandler = E("QTS_RuntimeEnableInterruptHandler")),
              Mi = (e._QTS_RuntimeDisableInterruptHandler = E(
                "QTS_RuntimeDisableInterruptHandler",
              )),
              Ni = (e._QTS_RuntimeEnableModuleLoader = E("QTS_RuntimeEnableModuleLoader")),
              ca = (e._QTS_RuntimeDisableModuleLoader = E("QTS_RuntimeDisableModuleLoader")),
              da = (e._QTS_bjson_encode = E("QTS_bjson_encode")),
              xi = (e._QTS_bjson_decode = E("QTS_bjson_decode")),
              Fn = (e._fflush = E("fflush")),
              _t = E("emscripten_builtin_malloc"),
              An = E("__funcs_on_exit"),
              rt = E("memalign"),
              Cn = E("emscripten_builtin_free"),
              s = E("emscripten_builtin_memalign"),
              m = E("setTempRet0"),
              v = () => (v = Qr.emscripten_stack_init)(),
              C = () => (C = Qr.emscripten_stack_get_free)(),
              j = () => (j = Qr.emscripten_stack_get_base)(),
              X = () => (X = Qr.emscripten_stack_get_end)(),
              Z = E("stackSave"),
              ee = E("stackRestore"),
              ce = E("stackAlloc"),
              Ae = () => (Ae = Qr.emscripten_stack_get_current)(),
              kr = (e.dynCall_jijiii = E("dynCall_jijiii")),
              Pt = (e.dynCall_jijjiii = E("dynCall_jijjiii")),
              tt = (e.dynCall_jij = E("dynCall_jij")),
              zr = (e.dynCall_jiiiii = E("dynCall_jiiiii")),
              kt = (e.dynCall_iiiij = E("dynCall_iiiij")),
              ft = (e.dynCall_iiiijj = E("dynCall_iiiijj")),
              Ze = (e.dynCall_jiij = E("dynCall_jiij")),
              ht = (e.dynCall_jijii = E("dynCall_jijii")),
              Ja = (e.dynCall_jijiiiii = E("dynCall_jijiiiii")),
              Wa = (e.dynCall_iiijj = E("dynCall_iiijj")),
              $a = (e.dynCall_jijj = E("dynCall_jijj")),
              Ya = (e.dynCall_jiii = E("dynCall_jiii")),
              qa = (e.dynCall_jijiiii = E("dynCall_jijiiii")),
              Ka = (e.dynCall_jii = E("dynCall_jii")),
              Xa = (e.dynCall_vij = E("dynCall_vij")),
              Za = (e.dynCall_viji = E("dynCall_viji")),
              es = (e.dynCall_iijijjji = E("dynCall_iijijjji")),
              rs = (e.dynCall_iiiji = E("dynCall_iiiji")),
              ts = (e.dynCall_iiji = E("dynCall_iiji")),
              ns = (e.dynCall_jijij = E("dynCall_jijij")),
              is = (e.dynCall_iijijji = E("dynCall_iijijji")),
              os = (e.dynCall_jiiii = E("dynCall_jiiii")),
              as = (e.dynCall_jiji = E("dynCall_jiji")),
              ss = (e.___start_em_js = 5362681),
              ls = (e.___stop_em_js = 5363583)
            ;(e.cwrap = gi), (e.UTF8ToString = Ke), (e.stringToUTF8 = ut), (e.lengthBytesUTF8 = Zr)
            var ma = [
              "writeI53ToI64",
              "writeI53ToI64Clamped",
              "writeI53ToI64Signaling",
              "writeI53ToU64Clamped",
              "writeI53ToU64Signaling",
              "readI53FromI64",
              "readI53FromU64",
              "convertI32PairToI53",
              "convertU32PairToI53",
              "exitJS",
              "arraySum",
              "addDays",
              "setErrNo",
              "inetPton4",
              "inetNtop4",
              "inetPton6",
              "inetNtop6",
              "readSockaddr",
              "writeSockaddr",
              "getHostByName",
              "getCallstack",
              "emscriptenLog",
              "readEmAsmArgs",
              "jstoi_q",
              "jstoi_s",
              "getExecutableName",
              "listenOnce",
              "autoResumeAudioContext",
              "dynCallLegacy",
              "getDynCaller",
              "dynCall",
              "handleException",
              "runtimeKeepalivePush",
              "runtimeKeepalivePop",
              "callUserCallback",
              "maybeExit",
              "asmjsMangle",
              "handleAllocatorInit",
              "HandleAllocator",
              "getNativeTypeSize",
              "STACK_SIZE",
              "STACK_ALIGN",
              "POINTER_SIZE",
              "ASSERTIONS",
              "uleb128Encode",
              "sigToWasmTypes",
              "generateFuncType",
              "convertJsFunctionToWasm",
              "getEmptyTableSlot",
              "updateTableMap",
              "getFunctionAddress",
              "addFunction",
              "removeFunction",
              "reallyNegative",
              "unSign",
              "strLen",
              "reSign",
              "formatString",
              "intArrayToString",
              "AsciiToString",
              "stringToAscii",
              "UTF16ToString",
              "stringToUTF16",
              "lengthBytesUTF16",
              "UTF32ToString",
              "stringToUTF32",
              "lengthBytesUTF32",
              "registerKeyEventCallback",
              "maybeCStringToJsString",
              "findEventTarget",
              "findCanvasEventTarget",
              "getBoundingClientRect",
              "fillMouseEventData",
              "registerMouseEventCallback",
              "registerWheelEventCallback",
              "registerUiEventCallback",
              "registerFocusEventCallback",
              "fillDeviceOrientationEventData",
              "registerDeviceOrientationEventCallback",
              "fillDeviceMotionEventData",
              "registerDeviceMotionEventCallback",
              "screenOrientation",
              "fillOrientationChangeEventData",
              "registerOrientationChangeEventCallback",
              "fillFullscreenChangeEventData",
              "registerFullscreenChangeEventCallback",
              "JSEvents_requestFullscreen",
              "JSEvents_resizeCanvasForFullscreen",
              "registerRestoreOldStyle",
              "hideEverythingExceptGivenElement",
              "restoreHiddenElements",
              "setLetterbox",
              "softFullscreenResizeWebGLRenderTarget",
              "doRequestFullscreen",
              "fillPointerlockChangeEventData",
              "registerPointerlockChangeEventCallback",
              "registerPointerlockErrorEventCallback",
              "requestPointerLock",
              "fillVisibilityChangeEventData",
              "registerVisibilityChangeEventCallback",
              "registerTouchEventCallback",
              "fillGamepadEventData",
              "registerGamepadEventCallback",
              "registerBeforeUnloadEventCallback",
              "fillBatteryEventData",
              "battery",
              "registerBatteryEventCallback",
              "setCanvasElementSize",
              "getCanvasElementSize",
              "stackTrace",
              "getEnvStrings",
              "checkWasiClock",
              "wasiRightsToMuslOFlags",
              "wasiOFlagsToMuslOFlags",
              "createDyncallWrapper",
              "safeSetTimeout",
              "setImmediateWrapped",
              "clearImmediateWrapped",
              "polyfillSetImmediate",
              "getPromise",
              "makePromise",
              "idsToPromises",
              "makePromiseCallback",
              "setMainLoop",
              "getSocketFromFD",
              "getSocketAddress",
              "FS_unlink",
              "FS_mkdirTree",
              "_setNetworkCallback",
              "ALLOC_NORMAL",
              "ALLOC_STACK",
              "allocate",
              "writeStringToMemory",
              "writeAsciiToMemory",
            ]
            ma.forEach(Fe)
            var _a = [
              "run",
              "addOnPreRun",
              "addOnInit",
              "addOnPreMain",
              "addOnExit",
              "addOnPostRun",
              "addRunDependency",
              "removeRunDependency",
              "FS_createFolder",
              "FS_createPath",
              "FS_createLazyFile",
              "FS_createLink",
              "FS_createDevice",
              "FS_readFile",
              "out",
              "err",
              "callMain",
              "abort",
              "wasmMemory",
              "wasmExports",
              "stackAlloc",
              "stackSave",
              "stackRestore",
              "getTempRet0",
              "setTempRet0",
              "WasmOffsetConverter",
              "WasmSourceMap",
              "writeStackCookie",
              "checkStackCookie",
              "convertI32PairToI53Checked",
              "ptrToString",
              "zeroMemory",
              "getHeapMax",
              "growMemory",
              "ENV",
              "MONTH_DAYS_REGULAR",
              "MONTH_DAYS_LEAP",
              "MONTH_DAYS_REGULAR_CUMULATIVE",
              "MONTH_DAYS_LEAP_CUMULATIVE",
              "isLeapYear",
              "ydayFromDate",
              "ERRNO_CODES",
              "ERRNO_MESSAGES",
              "DNS",
              "Protocols",
              "Sockets",
              "initRandomFill",
              "randomFill",
              "timers",
              "warnOnce",
              "UNWIND_CACHE",
              "convertPCtoSourceLocation",
              "withBuiltinMalloc",
              "readEmAsmArgsArray",
              "keepRuntimeAlive",
              "asyncLoad",
              "alignMemory",
              "mmapAlloc",
              "wasmTable",
              "noExitRuntime",
              "getCFunc",
              "ccall",
              "freeTableIndexes",
              "functionsInTableMap",
              "setValue",
              "getValue",
              "PATH",
              "PATH_FS",
              "UTF8Decoder",
              "UTF8ArrayToString",
              "stringToUTF8Array",
              "intArrayFromString",
              "UTF16Decoder",
              "stringToNewUTF8",
              "stringToUTF8OnStack",
              "writeArrayToMemory",
              "JSEvents",
              "specialHTMLTargets",
              "currentFullscreenStrategy",
              "restoreOldWindowedStyle",
              "demangle",
              "demangleAll",
              "jsStackTrace",
              "ExitStatus",
              "doReadv",
              "doWritev",
              "promiseMap",
              "Browser",
              "wget",
              "SYSCALLS",
              "preloadPlugins",
              "FS_createPreloadedFile",
              "FS_modeStringToFlags",
              "FS_getMode",
              "FS_stdin_getChar_buffer",
              "FS_stdin_getChar",
              "FS",
              "FS_createDataFile",
              "MEMFS",
              "TTY",
              "PIPEFS",
              "SOCKFS",
              "allocateUTF8",
              "allocateUTF8OnStack",
            ]
            _a.forEach(Ve)
            var Vt
            F = function r() {
              Vt || Di(), Vt || (F = r)
            }
            function fa() {
              v(), je()
            }
            function Di() {
              if (f > 0 || (fa(), M(), f > 0)) return
              function r() {
                Vt ||
                  ((Vt = !0),
                  (e.calledRun = !0),
                  !ue &&
                    (Ur(),
                    T(e),
                    e.onRuntimeInitialized && e.onRuntimeInitialized(),
                    g(
                      !e._main,
                      'compiled without a main, but one is present. if you added it from JS, use Module["onRuntimeInitialized"]',
                    ),
                    vr()))
              }
              e.setStatus
                ? (e.setStatus("Running..."),
                  setTimeout(function () {
                    setTimeout(function () {
                      e.setStatus("")
                    }, 1),
                      r()
                  }, 1))
                : r(),
                Ye()
            }
            if (e.preInit)
              for (
                typeof e.preInit == "function" && (e.preInit = [e.preInit]);
                e.preInit.length > 0;

              )
                e.preInit.pop()()
            return Di(), l.ready
          }
        })()),
        (Pa = Ra)
    })
  var io = {}
  Nr(io, { QuickJSFFI: () => Na })
  var Na,
    oo = ar(() => {
      "use strict"
      Na = class {
        constructor(i) {
          ;(this.module = i),
            (this.DEBUG = !1),
            (this.QTS_Throw = this.module.cwrap("QTS_Throw", "number", ["number", "number"])),
            (this.QTS_NewError = this.module.cwrap("QTS_NewError", "number", ["number"])),
            (this.QTS_RuntimeSetMemoryLimit = this.module.cwrap("QTS_RuntimeSetMemoryLimit", null, [
              "number",
              "number",
            ])),
            (this.QTS_RuntimeComputeMemoryUsage = this.module.cwrap(
              "QTS_RuntimeComputeMemoryUsage",
              "number",
              ["number", "number"],
            )),
            (this.QTS_RuntimeDumpMemoryUsage = this.module.cwrap(
              "QTS_RuntimeDumpMemoryUsage",
              "number",
              ["number"],
            )),
            (this.QTS_RecoverableLeakCheck = this.module.cwrap(
              "QTS_RecoverableLeakCheck",
              "number",
              [],
            )),
            (this.QTS_BuildIsSanitizeLeak = this.module.cwrap(
              "QTS_BuildIsSanitizeLeak",
              "number",
              [],
            )),
            (this.QTS_RuntimeSetMaxStackSize = this.module.cwrap(
              "QTS_RuntimeSetMaxStackSize",
              null,
              ["number", "number"],
            )),
            (this.QTS_GetUndefined = this.module.cwrap("QTS_GetUndefined", "number", [])),
            (this.QTS_GetNull = this.module.cwrap("QTS_GetNull", "number", [])),
            (this.QTS_GetFalse = this.module.cwrap("QTS_GetFalse", "number", [])),
            (this.QTS_GetTrue = this.module.cwrap("QTS_GetTrue", "number", [])),
            (this.QTS_NewRuntime = this.module.cwrap("QTS_NewRuntime", "number", [])),
            (this.QTS_FreeRuntime = this.module.cwrap("QTS_FreeRuntime", null, ["number"])),
            (this.QTS_NewContext = this.module.cwrap("QTS_NewContext", "number", ["number"])),
            (this.QTS_FreeContext = this.module.cwrap("QTS_FreeContext", null, ["number"])),
            (this.QTS_FreeValuePointer = this.module.cwrap("QTS_FreeValuePointer", null, [
              "number",
              "number",
            ])),
            (this.QTS_FreeValuePointerRuntime = this.module.cwrap(
              "QTS_FreeValuePointerRuntime",
              null,
              ["number", "number"],
            )),
            (this.QTS_FreeVoidPointer = this.module.cwrap("QTS_FreeVoidPointer", null, [
              "number",
              "number",
            ])),
            (this.QTS_FreeCString = this.module.cwrap("QTS_FreeCString", null, [
              "number",
              "number",
            ])),
            (this.QTS_DupValuePointer = this.module.cwrap("QTS_DupValuePointer", "number", [
              "number",
              "number",
            ])),
            (this.QTS_NewObject = this.module.cwrap("QTS_NewObject", "number", ["number"])),
            (this.QTS_NewObjectProto = this.module.cwrap("QTS_NewObjectProto", "number", [
              "number",
              "number",
            ])),
            (this.QTS_NewArray = this.module.cwrap("QTS_NewArray", "number", ["number"])),
            (this.QTS_NewArrayBuffer = this.module.cwrap("QTS_NewArrayBuffer", "number", [
              "number",
              "number",
              "number",
            ])),
            (this.QTS_NewFloat64 = this.module.cwrap("QTS_NewFloat64", "number", [
              "number",
              "number",
            ])),
            (this.QTS_GetFloat64 = this.module.cwrap("QTS_GetFloat64", "number", [
              "number",
              "number",
            ])),
            (this.QTS_NewString = this.module.cwrap("QTS_NewString", "number", [
              "number",
              "number",
            ])),
            (this.QTS_GetString = this.module.cwrap("QTS_GetString", "number", [
              "number",
              "number",
            ])),
            (this.QTS_GetArrayBuffer = this.module.cwrap("QTS_GetArrayBuffer", "number", [
              "number",
              "number",
            ])),
            (this.QTS_GetArrayBufferLength = this.module.cwrap(
              "QTS_GetArrayBufferLength",
              "number",
              ["number", "number"],
            )),
            (this.QTS_NewSymbol = this.module.cwrap("QTS_NewSymbol", "number", [
              "number",
              "number",
              "number",
            ])),
            (this.QTS_GetSymbolDescriptionOrKey = this.module.cwrap(
              "QTS_GetSymbolDescriptionOrKey",
              "number",
              ["number", "number"],
            )),
            (this.QTS_IsGlobalSymbol = this.module.cwrap("QTS_IsGlobalSymbol", "number", [
              "number",
              "number",
            ])),
            (this.QTS_IsJobPending = this.module.cwrap("QTS_IsJobPending", "number", ["number"])),
            (this.QTS_ExecutePendingJob = this.module.cwrap("QTS_ExecutePendingJob", "number", [
              "number",
              "number",
              "number",
            ])),
            (this.QTS_GetProp = this.module.cwrap("QTS_GetProp", "number", [
              "number",
              "number",
              "number",
            ])),
            (this.QTS_SetProp = this.module.cwrap("QTS_SetProp", null, [
              "number",
              "number",
              "number",
              "number",
            ])),
            (this.QTS_DefineProp = this.module.cwrap("QTS_DefineProp", null, [
              "number",
              "number",
              "number",
              "number",
              "number",
              "number",
              "boolean",
              "boolean",
              "boolean",
            ])),
            (this.QTS_Call = this.module.cwrap("QTS_Call", "number", [
              "number",
              "number",
              "number",
              "number",
              "number",
            ])),
            (this.QTS_ResolveException = this.module.cwrap("QTS_ResolveException", "number", [
              "number",
              "number",
            ])),
            (this.QTS_Dump = this.module.cwrap("QTS_Dump", "number", ["number", "number"])),
            (this.QTS_Eval = this.module.cwrap("QTS_Eval", "number", [
              "number",
              "number",
              "string",
              "number",
              "number",
            ])),
            (this.QTS_Typeof = this.module.cwrap("QTS_Typeof", "number", ["number", "number"])),
            (this.QTS_GetGlobalObject = this.module.cwrap("QTS_GetGlobalObject", "number", [
              "number",
            ])),
            (this.QTS_NewPromiseCapability = this.module.cwrap(
              "QTS_NewPromiseCapability",
              "number",
              ["number", "number"],
            )),
            (this.QTS_TestStringArg = this.module.cwrap("QTS_TestStringArg", null, ["string"])),
            (this.QTS_BuildIsDebug = this.module.cwrap("QTS_BuildIsDebug", "number", [])),
            (this.QTS_BuildIsAsyncify = this.module.cwrap("QTS_BuildIsAsyncify", "number", [])),
            (this.QTS_NewFunction = this.module.cwrap("QTS_NewFunction", "number", [
              "number",
              "number",
              "string",
            ])),
            (this.QTS_ArgvGetJSValueConstPointer = this.module.cwrap(
              "QTS_ArgvGetJSValueConstPointer",
              "number",
              ["number", "number"],
            )),
            (this.QTS_RuntimeEnableInterruptHandler = this.module.cwrap(
              "QTS_RuntimeEnableInterruptHandler",
              null,
              ["number"],
            )),
            (this.QTS_RuntimeDisableInterruptHandler = this.module.cwrap(
              "QTS_RuntimeDisableInterruptHandler",
              null,
              ["number"],
            )),
            (this.QTS_RuntimeEnableModuleLoader = this.module.cwrap(
              "QTS_RuntimeEnableModuleLoader",
              null,
              ["number", "number"],
            )),
            (this.QTS_RuntimeDisableModuleLoader = this.module.cwrap(
              "QTS_RuntimeDisableModuleLoader",
              null,
              ["number"],
            )),
            (this.QTS_bjson_encode = this.module.cwrap("QTS_bjson_encode", "number", [
              "number",
              "number",
            ])),
            (this.QTS_bjson_decode = this.module.cwrap("QTS_bjson_decode", "number", [
              "number",
              "number",
            ]))
        }
      }
    })
  var ao = {}
  Nr(ao, { default: () => Da })
  var Xt,
    xa,
    Da,
    so = ar(() => {
      "use strict"
      ;(Xt = {}),
        (xa = (() => {
          var i = Xt.url
          return async function (l = {}) {
            var e = l,
              T,
              A
            e.ready = new Promise((d, f) => {
              ;(T = d), (A = f)
            })
            var N = Object.assign({}, e),
              x = "./this.program",
              H = typeof window == "object",
              Y = typeof importScripts == "function",
              Te =
                typeof process == "object" &&
                typeof process.versions == "object" &&
                typeof process.versions.node == "string",
              ae = "",
              q,
              be,
              se
            if (Te) {
              let { createRequire: d } = await import("module")
              var er = d(Xt.url),
                Re = er("fs"),
                Pe = er("path")
              Y
                ? (ae = Pe.dirname(ae) + "/")
                : (ae = er("url").fileURLToPath(new URL("./", Xt.url))),
                (q = (f, w) => (
                  (f = ue(f) ? new URL(f) : Pe.normalize(f)),
                  Re.readFileSync(f, w ? void 0 : "utf8")
                )),
                (se = (f) => ((f = q(f, !0)), f.buffer || (f = new Uint8Array(f)), f)),
                (be = (f, w, F, O = !0) => {
                  ;(f = ue(f) ? new URL(f) : Pe.normalize(f)),
                    Re.readFile(f, O ? void 0 : "utf8", (re, L) => {
                      re ? F(re) : w(O ? L.buffer : L)
                    })
                }),
                !e.thisProgram &&
                  1 < process.argv.length &&
                  (x = process.argv[1].replace(/\\/g, "/")),
                process.argv.slice(2),
                (e.inspect = () => "[Emscripten Module object]")
            } else
              (H || Y) &&
                (Y
                  ? (ae = self.location.href)
                  : typeof document < "u" &&
                    document.currentScript &&
                    (ae = document.currentScript.src),
                i && (ae = i),
                ae.indexOf("blob:") !== 0
                  ? (ae = ae.substr(0, ae.replace(/[?#].*/, "").lastIndexOf("/") + 1))
                  : (ae = ""),
                (q = (d) => {
                  var f = new XMLHttpRequest()
                  return f.open("GET", d, !1), f.send(null), f.responseText
                }),
                Y &&
                  (se = (d) => {
                    var f = new XMLHttpRequest()
                    return (
                      f.open("GET", d, !1),
                      (f.responseType = "arraybuffer"),
                      f.send(null),
                      new Uint8Array(f.response)
                    )
                  }),
                (be = (d, f, w) => {
                  var F = new XMLHttpRequest()
                  F.open("GET", d, !0),
                    (F.responseType = "arraybuffer"),
                    (F.onload = () => {
                      F.status == 200 || (F.status == 0 && F.response) ? f(F.response) : w()
                    }),
                    (F.onerror = w),
                    F.send(null)
                }))
            var ke = e.print || console.log.bind(console),
              $e = e.printErr || console.error.bind(console)
            Object.assign(e, N), (N = null), e.thisProgram && (x = e.thisProgram)
            var he
            e.wasmBinary && (he = e.wasmBinary),
              typeof WebAssembly != "object" && ge("no native wasm support detected")
            var lr,
              Ie = !1,
              Me,
              _e,
              de,
              I
            function Ne() {
              var d = lr.buffer
              ;(e.HEAP8 = Me = new Int8Array(d)),
                (e.HEAP16 = new Int16Array(d)),
                (e.HEAPU8 = _e = new Uint8Array(d)),
                (e.HEAPU16 = new Uint16Array(d)),
                (e.HEAP32 = de = new Int32Array(d)),
                (e.HEAPU32 = I = new Uint32Array(d)),
                (e.HEAPF32 = new Float32Array(d)),
                (e.HEAPF64 = new Float64Array(d))
            }
            var xe = [],
              Wr = [],
              $r = []
            function it() {
              var d = e.preRun.shift()
              xe.unshift(d)
            }
            var ur = 0,
              Yr = null,
              Be = null
            function ge(d) {
              throw (
                (e.onAbort && e.onAbort(d),
                (d = "Aborted(" + d + ")"),
                $e(d),
                (Ie = !0),
                (d = new WebAssembly.RuntimeError(d + ". Build with -sASSERTIONS for more info.")),
                A(d),
                d)
              )
            }
            var Qe = (d) => d.startsWith("data:application/octet-stream;base64,"),
              ue = (d) => d.startsWith("file://"),
              De
            if (e.locateFile) {
              if (((De = "emscripten-module.wasm"), !Qe(De))) {
                var g = De
                De = e.locateFile ? e.locateFile(g, ae) : ae + g
              }
            } else De = new URL("emscripten-module.wasm", Xt.url).href
            function cr(d) {
              if (d == De && he) return new Uint8Array(he)
              if (se) return se(d)
              throw "both async and sync fetching of the wasm failed"
            }
            function Se(d) {
              if (!he && (H || Y)) {
                if (typeof fetch == "function" && !ue(d))
                  return fetch(d, { credentials: "same-origin" })
                    .then((f) => {
                      if (!f.ok) throw "failed to load wasm binary file at '" + d + "'"
                      return f.arrayBuffer()
                    })
                    .catch(() => cr(d))
                if (be)
                  return new Promise((f, w) => {
                    be(d, (F) => f(new Uint8Array(F)), w)
                  })
              }
              return Promise.resolve().then(() => cr(d))
            }
            function Ee(d, f, w) {
              return Se(d)
                .then((F) => WebAssembly.instantiate(F, f))
                .then((F) => F)
                .then(w, (F) => {
                  $e(`failed to asynchronously prepare wasm: ${F}`), ge(F)
                })
            }
            function Sr(d, f) {
              var w = De
              return he ||
                typeof WebAssembly.instantiateStreaming != "function" ||
                Qe(w) ||
                ue(w) ||
                Te ||
                typeof fetch != "function"
                ? Ee(w, d, f)
                : fetch(w, { credentials: "same-origin" }).then((F) =>
                    WebAssembly.instantiateStreaming(F, d).then(f, function (O) {
                      return (
                        $e(`wasm streaming compile failed: ${O}`),
                        $e("falling back to ArrayBuffer instantiation"),
                        Ee(w, d, f)
                      )
                    }),
                  )
            }
            var Ar = (d) => {
                for (; 0 < d.length; ) d.shift()(e)
              },
              G = typeof TextDecoder < "u" ? new TextDecoder("utf8") : void 0,
              B = (d, f, w) => {
                var F = f + w
                for (w = f; d[w] && !(w >= F); ) ++w
                if (16 < w - f && d.buffer && G) return G.decode(d.subarray(f, w))
                for (F = ""; f < w; ) {
                  var O = d[f++]
                  if (O & 128) {
                    var re = d[f++] & 63
                    if ((O & 224) == 192) F += String.fromCharCode(((O & 31) << 6) | re)
                    else {
                      var L = d[f++] & 63
                      ;(O =
                        (O & 240) == 224
                          ? ((O & 15) << 12) | (re << 6) | L
                          : ((O & 7) << 18) | (re << 12) | (L << 6) | (d[f++] & 63)),
                        65536 > O
                          ? (F += String.fromCharCode(O))
                          : ((O -= 65536),
                            (F += String.fromCharCode(55296 | (O >> 10), 56320 | (O & 1023))))
                    }
                  } else F += String.fromCharCode(O)
                }
                return F
              },
              rr = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335],
              dr = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
              mr = (d) => {
                for (var f = 0, w = 0; w < d.length; ++w) {
                  var F = d.charCodeAt(w)
                  127 >= F
                    ? f++
                    : 2047 >= F
                      ? (f += 2)
                      : 55296 <= F && 57343 >= F
                        ? ((f += 4), ++w)
                        : (f += 3)
                }
                return f
              },
              je = (d, f, w) => {
                var F = _e
                if (!(0 < w)) return 0
                var O = f
                w = f + w - 1
                for (var re = 0; re < d.length; ++re) {
                  var L = d.charCodeAt(re)
                  if (55296 <= L && 57343 >= L) {
                    var oe = d.charCodeAt(++re)
                    L = (65536 + ((L & 1023) << 10)) | (oe & 1023)
                  }
                  if (127 >= L) {
                    if (f >= w) break
                    F[f++] = L
                  } else {
                    if (2047 >= L) {
                      if (f + 1 >= w) break
                      F[f++] = 192 | (L >> 6)
                    } else {
                      if (65535 >= L) {
                        if (f + 2 >= w) break
                        F[f++] = 224 | (L >> 12)
                      } else {
                        if (f + 3 >= w) break
                        ;(F[f++] = 240 | (L >> 18)), (F[f++] = 128 | ((L >> 12) & 63))
                      }
                      F[f++] = 128 | ((L >> 6) & 63)
                    }
                    F[f++] = 128 | (L & 63)
                  }
                }
                return (F[f] = 0), f - O
              },
              Ye = (d) => {
                var f = mr(d) + 1,
                  w = Ur(f)
                return w && je(d, w, f), w
              },
              pr = {},
              _r = () => {
                if (!Tr) {
                  var d = {
                      USER: "web_user",
                      LOGNAME: "web_user",
                      PATH: "/",
                      PWD: "/",
                      HOME: "/home/web_user",
                      LANG:
                        (
                          (typeof navigator == "object" &&
                            navigator.languages &&
                            navigator.languages[0]) ||
                          "C"
                        ).replace("-", "_") + ".UTF-8",
                      _: x || "./this.program",
                    },
                    f
                  for (f in pr) pr[f] === void 0 ? delete d[f] : (d[f] = pr[f])
                  var w = []
                  for (f in d) w.push(`${f}=${d[f]}`)
                  Tr = w
                }
                return Tr
              },
              Tr,
              Cr = [null, [], []],
              tr = (d, f, w, F) => {
                var O = {
                  string: (pe) => {
                    var me = 0
                    if (pe != null && pe !== 0) {
                      me = mr(pe) + 1
                      var Q = Gr(me)
                      je(pe, Q, me), (me = Q)
                    }
                    return me
                  },
                  array: (pe) => {
                    var me = Gr(pe.length)
                    return Me.set(pe, me), me
                  },
                }
                d = e["_" + d]
                var re = [],
                  L = 0
                if (F)
                  for (var oe = 0; oe < F.length; oe++) {
                    var te = O[w[oe]]
                    te ? (L === 0 && (L = Pr()), (re[oe] = te(F[oe]))) : (re[oe] = F[oe])
                  }
                return (
                  (w = d.apply(null, re)),
                  (w = (function (pe) {
                    return (
                      L !== 0 && vr(L),
                      f === "string" ? (pe ? B(_e, pe) : "") : f === "boolean" ? !!pe : pe
                    )
                  })(w))
                )
              },
              Rr = {
                a: (d, f, w, F) => {
                  ge(
                    `Assertion failed: ${d ? B(_e, d) : ""}, at: ` +
                      [
                        f ? (f ? B(_e, f) : "") : "unknown filename",
                        w,
                        F ? (F ? B(_e, F) : "") : "unknown function",
                      ],
                  )
                },
                i: function (d, f, w) {
                  ;(d = new Date(
                    1e3 * ((f + 2097152) >>> 0 < 4194305 - !!d ? (d >>> 0) + 4294967296 * f : NaN),
                  )),
                    (de[w >> 2] = d.getSeconds()),
                    (de[(w + 4) >> 2] = d.getMinutes()),
                    (de[(w + 8) >> 2] = d.getHours()),
                    (de[(w + 12) >> 2] = d.getDate()),
                    (de[(w + 16) >> 2] = d.getMonth()),
                    (de[(w + 20) >> 2] = d.getFullYear() - 1900),
                    (de[(w + 24) >> 2] = d.getDay()),
                    (f = d.getFullYear()),
                    (de[(w + 28) >> 2] =
                      ((f % 4 !== 0 || (f % 100 === 0 && f % 400 !== 0) ? dr : rr)[d.getMonth()] +
                        d.getDate() -
                        1) |
                      0),
                    (de[(w + 36) >> 2] = -(60 * d.getTimezoneOffset())),
                    (f = new Date(d.getFullYear(), 6, 1).getTimezoneOffset())
                  var F = new Date(d.getFullYear(), 0, 1).getTimezoneOffset()
                  de[(w + 32) >> 2] = (f != F && d.getTimezoneOffset() == Math.min(F, f)) | 0
                },
                l: (d, f, w) => {
                  function F(te) {
                    return (te = te.toTimeString().match(/\(([A-Za-z ]+)\)$/)) ? te[1] : "GMT"
                  }
                  var O = new Date().getFullYear(),
                    re = new Date(O, 0, 1),
                    L = new Date(O, 6, 1)
                  O = re.getTimezoneOffset()
                  var oe = L.getTimezoneOffset()
                  ;(I[d >> 2] = 60 * Math.max(O, oe)),
                    (de[f >> 2] = +(O != oe)),
                    (d = F(re)),
                    (f = F(L)),
                    (d = Ye(d)),
                    (f = Ye(f)),
                    oe < O
                      ? ((I[w >> 2] = d), (I[(w + 4) >> 2] = f))
                      : ((I[w >> 2] = f), (I[(w + 4) >> 2] = d))
                },
                b: () => {
                  ge("")
                },
                m: () => Date.now(),
                k: (d) => {
                  var f = _e.length
                  if (((d >>>= 0), 2147483648 < d)) return !1
                  for (var w = 1; 4 >= w; w *= 2) {
                    var F = f * (1 + 0.2 / w)
                    F = Math.min(F, d + 100663296)
                    var O = Math
                    F = Math.max(d, F)
                    e: {
                      O =
                        (O.min.call(O, 2147483648, F + ((65536 - (F % 65536)) % 65536)) -
                          lr.buffer.byteLength +
                          65535) /
                        65536
                      try {
                        lr.grow(O), Ne()
                        var re = 1
                        break e
                      } catch {}
                      re = void 0
                    }
                    if (re) return !0
                  }
                  return !1
                },
                e: (d, f) => {
                  var w = 0
                  return (
                    _r().forEach((F, O) => {
                      var re = f + w
                      for (O = I[(d + 4 * O) >> 2] = re, re = 0; re < F.length; ++re)
                        Me[O++ >> 0] = F.charCodeAt(re)
                      ;(Me[O >> 0] = 0), (w += F.length + 1)
                    }),
                    0
                  )
                },
                f: (d, f) => {
                  var w = _r()
                  I[d >> 2] = w.length
                  var F = 0
                  return w.forEach((O) => (F += O.length + 1)), (I[f >> 2] = F), 0
                },
                d: () => 52,
                j: function () {
                  return 70
                },
                c: (d, f, w, F) => {
                  for (var O = 0, re = 0; re < w; re++) {
                    var L = I[f >> 2],
                      oe = I[(f + 4) >> 2]
                    f += 8
                    for (var te = 0; te < oe; te++) {
                      var pe = _e[L + te],
                        me = Cr[d]
                      pe === 0 || pe === 10
                        ? ((d === 1 ? ke : $e)(B(me, 0)), (me.length = 0))
                        : me.push(pe)
                    }
                    O += oe
                  }
                  return (I[F >> 2] = O), 0
                },
                o: function (d, f, w, F, O) {
                  return e.callbacks.callFunction(void 0, d, f, w, F, O)
                },
                n: function (d) {
                  return e.callbacks.shouldInterrupt(void 0, d)
                },
                h: function (d, f, w) {
                  return (w = w ? B(_e, w) : ""), e.callbacks.loadModuleSource(void 0, d, f, w)
                },
                g: function (d, f, w, F) {
                  return (
                    (w = w ? B(_e, w) : ""),
                    (F = F ? B(_e, F) : ""),
                    e.callbacks.normalizeModule(void 0, d, f, w, F)
                  )
                },
              },
              M = (function () {
                function d(w) {
                  return (
                    (M = w.exports),
                    (lr = M.p),
                    Ne(),
                    Wr.unshift(M.q),
                    ur--,
                    e.monitorRunDependencies && e.monitorRunDependencies(ur),
                    ur == 0 &&
                      (Yr !== null && (clearInterval(Yr), (Yr = null)),
                      Be && ((w = Be), (Be = null), w())),
                    M
                  )
                }
                var f = { a: Rr }
                if (
                  (ur++,
                  e.monitorRunDependencies && e.monitorRunDependencies(ur),
                  e.instantiateWasm)
                )
                  try {
                    return e.instantiateWasm(f, d)
                  } catch (w) {
                    $e(`Module.instantiateWasm callback failed with error: ${w}`), A(w)
                  }
                return (
                  Sr(f, function (w) {
                    d(w.instance)
                  }).catch(A),
                  {}
                )
              })(),
              Ur = (e._malloc = (d) => (Ur = e._malloc = M.r)(d))
            ;(e._QTS_Throw = (d, f) => (e._QTS_Throw = M.s)(d, f)),
              (e._QTS_NewError = (d) => (e._QTS_NewError = M.t)(d)),
              (e._QTS_RuntimeSetMemoryLimit = (d, f) => (e._QTS_RuntimeSetMemoryLimit = M.u)(d, f)),
              (e._QTS_RuntimeComputeMemoryUsage = (d, f) =>
                (e._QTS_RuntimeComputeMemoryUsage = M.v)(d, f)),
              (e._QTS_RuntimeDumpMemoryUsage = (d) => (e._QTS_RuntimeDumpMemoryUsage = M.w)(d)),
              (e._QTS_RecoverableLeakCheck = () => (e._QTS_RecoverableLeakCheck = M.x)()),
              (e._QTS_BuildIsSanitizeLeak = () => (e._QTS_BuildIsSanitizeLeak = M.y)()),
              (e._QTS_RuntimeSetMaxStackSize = (d, f) =>
                (e._QTS_RuntimeSetMaxStackSize = M.z)(d, f)),
              (e._QTS_GetUndefined = () => (e._QTS_GetUndefined = M.A)()),
              (e._QTS_GetNull = () => (e._QTS_GetNull = M.B)()),
              (e._QTS_GetFalse = () => (e._QTS_GetFalse = M.C)()),
              (e._QTS_GetTrue = () => (e._QTS_GetTrue = M.D)()),
              (e._QTS_NewRuntime = () => (e._QTS_NewRuntime = M.E)()),
              (e._QTS_FreeRuntime = (d) => (e._QTS_FreeRuntime = M.F)(d)),
              (e._QTS_NewContext = (d) => (e._QTS_NewContext = M.G)(d)),
              (e._QTS_FreeContext = (d) => (e._QTS_FreeContext = M.H)(d)),
              (e._QTS_FreeValuePointer = (d, f) => (e._QTS_FreeValuePointer = M.I)(d, f)),
              (e._free = (d) => (e._free = M.J)(d)),
              (e._QTS_FreeValuePointerRuntime = (d, f) =>
                (e._QTS_FreeValuePointerRuntime = M.K)(d, f)),
              (e._QTS_FreeVoidPointer = (d, f) => (e._QTS_FreeVoidPointer = M.L)(d, f)),
              (e._QTS_FreeCString = (d, f) => (e._QTS_FreeCString = M.M)(d, f)),
              (e._QTS_DupValuePointer = (d, f) => (e._QTS_DupValuePointer = M.N)(d, f)),
              (e._QTS_NewObject = (d) => (e._QTS_NewObject = M.O)(d)),
              (e._QTS_NewObjectProto = (d, f) => (e._QTS_NewObjectProto = M.P)(d, f)),
              (e._QTS_NewArray = (d) => (e._QTS_NewArray = M.Q)(d)),
              (e._QTS_NewArrayBuffer = (d, f, w) => (e._QTS_NewArrayBuffer = M.R)(d, f, w)),
              (e._QTS_NewFloat64 = (d, f) => (e._QTS_NewFloat64 = M.S)(d, f)),
              (e._QTS_GetFloat64 = (d, f) => (e._QTS_GetFloat64 = M.T)(d, f)),
              (e._QTS_NewString = (d, f) => (e._QTS_NewString = M.U)(d, f)),
              (e._QTS_GetString = (d, f) => (e._QTS_GetString = M.V)(d, f)),
              (e._QTS_GetArrayBuffer = (d, f) => (e._QTS_GetArrayBuffer = M.W)(d, f)),
              (e._QTS_GetArrayBufferLength = (d, f) => (e._QTS_GetArrayBufferLength = M.X)(d, f)),
              (e._QTS_NewSymbol = (d, f, w) => (e._QTS_NewSymbol = M.Y)(d, f, w)),
              (e._QTS_GetSymbolDescriptionOrKey = (d, f) =>
                (e._QTS_GetSymbolDescriptionOrKey = M.Z)(d, f)),
              (e._QTS_IsGlobalSymbol = (d, f) => (e._QTS_IsGlobalSymbol = M._)(d, f)),
              (e._QTS_IsJobPending = (d) => (e._QTS_IsJobPending = M.$)(d)),
              (e._QTS_ExecutePendingJob = (d, f, w) => (e._QTS_ExecutePendingJob = M.aa)(d, f, w)),
              (e._QTS_GetProp = (d, f, w) => (e._QTS_GetProp = M.ba)(d, f, w)),
              (e._QTS_SetProp = (d, f, w, F) => (e._QTS_SetProp = M.ca)(d, f, w, F)),
              (e._QTS_DefineProp = (d, f, w, F, O, re, L, oe, te) =>
                (e._QTS_DefineProp = M.da)(d, f, w, F, O, re, L, oe, te)),
              (e._QTS_Call = (d, f, w, F, O) => (e._QTS_Call = M.ea)(d, f, w, F, O)),
              (e._QTS_ResolveException = (d, f) => (e._QTS_ResolveException = M.fa)(d, f)),
              (e._QTS_Dump = (d, f) => (e._QTS_Dump = M.ga)(d, f)),
              (e._QTS_Eval = (d, f, w, F, O) => (e._QTS_Eval = M.ha)(d, f, w, F, O)),
              (e._QTS_Typeof = (d, f) => (e._QTS_Typeof = M.ia)(d, f)),
              (e._QTS_GetGlobalObject = (d) => (e._QTS_GetGlobalObject = M.ja)(d)),
              (e._QTS_NewPromiseCapability = (d, f) => (e._QTS_NewPromiseCapability = M.ka)(d, f)),
              (e._QTS_TestStringArg = (d) => (e._QTS_TestStringArg = M.la)(d)),
              (e._QTS_BuildIsDebug = () => (e._QTS_BuildIsDebug = M.ma)()),
              (e._QTS_BuildIsAsyncify = () => (e._QTS_BuildIsAsyncify = M.na)()),
              (e._QTS_NewFunction = (d, f, w) => (e._QTS_NewFunction = M.oa)(d, f, w)),
              (e._QTS_ArgvGetJSValueConstPointer = (d, f) =>
                (e._QTS_ArgvGetJSValueConstPointer = M.pa)(d, f)),
              (e._QTS_RuntimeEnableInterruptHandler = (d) =>
                (e._QTS_RuntimeEnableInterruptHandler = M.qa)(d)),
              (e._QTS_RuntimeDisableInterruptHandler = (d) =>
                (e._QTS_RuntimeDisableInterruptHandler = M.ra)(d)),
              (e._QTS_RuntimeEnableModuleLoader = (d, f) =>
                (e._QTS_RuntimeEnableModuleLoader = M.sa)(d, f)),
              (e._QTS_RuntimeDisableModuleLoader = (d) =>
                (e._QTS_RuntimeDisableModuleLoader = M.ta)(d)),
              (e._QTS_bjson_encode = (d, f) => (e._QTS_bjson_encode = M.ua)(d, f)),
              (e._QTS_bjson_decode = (d, f) => (e._QTS_bjson_decode = M.va)(d, f))
            var Pr = () => (Pr = M.xa)(),
              vr = (d) => (vr = M.ya)(d),
              Gr = (d) => (Gr = M.za)(d)
            ;(e.___start_em_js = 76484),
              (e.___stop_em_js = 77386),
              (e.cwrap = (d, f, w, F) => {
                var O = !w || w.every((re) => re === "number" || re === "boolean")
                return f !== "string" && O && !F
                  ? e["_" + d]
                  : function () {
                      return tr(d, f, w, arguments)
                    }
              }),
              (e.UTF8ToString = (d, f) => (d ? B(_e, d, f) : "")),
              (e.stringToUTF8 = (d, f, w) => je(d, f, w)),
              (e.lengthBytesUTF8 = mr)
            var Oe
            Be = function d() {
              Oe || He(), Oe || (Be = d)
            }
            function He() {
              function d() {
                if (!Oe && ((Oe = !0), (e.calledRun = !0), !Ie)) {
                  if ((Ar(Wr), T(e), e.onRuntimeInitialized && e.onRuntimeInitialized(), e.postRun))
                    for (
                      typeof e.postRun == "function" && (e.postRun = [e.postRun]);
                      e.postRun.length;

                    ) {
                      var f = e.postRun.shift()
                      $r.unshift(f)
                    }
                  Ar($r)
                }
              }
              if (!(0 < ur)) {
                if (e.preRun)
                  for (typeof e.preRun == "function" && (e.preRun = [e.preRun]); e.preRun.length; )
                    it()
                Ar(xe),
                  0 < ur ||
                    (e.setStatus
                      ? (e.setStatus("Running..."),
                        setTimeout(function () {
                          setTimeout(function () {
                            e.setStatus("")
                          }, 1),
                            d()
                        }, 1))
                      : d())
              }
            }
            if (e.preInit)
              for (
                typeof e.preInit == "function" && (e.preInit = [e.preInit]);
                0 < e.preInit.length;

              )
                e.preInit.pop()()
            return He(), l.ready
          }
        })()),
        (Da = xa)
    })
  var uo = {}
  Nr(uo, { QuickJSAsyncFFI: () => ja })
  var ja,
    co = ar(() => {
      "use strict"
      Mt()
      ja = class {
        constructor(i) {
          ;(this.module = i),
            (this.DEBUG = !0),
            (this.QTS_Throw = this.module.cwrap("QTS_Throw", "number", ["number", "number"])),
            (this.QTS_NewError = this.module.cwrap("QTS_NewError", "number", ["number"])),
            (this.QTS_RuntimeSetMemoryLimit = this.module.cwrap("QTS_RuntimeSetMemoryLimit", null, [
              "number",
              "number",
            ])),
            (this.QTS_RuntimeComputeMemoryUsage = this.module.cwrap(
              "QTS_RuntimeComputeMemoryUsage",
              "number",
              ["number", "number"],
            )),
            (this.QTS_RuntimeDumpMemoryUsage = this.module.cwrap(
              "QTS_RuntimeDumpMemoryUsage",
              "number",
              ["number"],
            )),
            (this.QTS_RecoverableLeakCheck = this.module.cwrap(
              "QTS_RecoverableLeakCheck",
              "number",
              [],
            )),
            (this.QTS_BuildIsSanitizeLeak = this.module.cwrap(
              "QTS_BuildIsSanitizeLeak",
              "number",
              [],
            )),
            (this.QTS_RuntimeSetMaxStackSize = this.module.cwrap(
              "QTS_RuntimeSetMaxStackSize",
              null,
              ["number", "number"],
            )),
            (this.QTS_GetUndefined = this.module.cwrap("QTS_GetUndefined", "number", [])),
            (this.QTS_GetNull = this.module.cwrap("QTS_GetNull", "number", [])),
            (this.QTS_GetFalse = this.module.cwrap("QTS_GetFalse", "number", [])),
            (this.QTS_GetTrue = this.module.cwrap("QTS_GetTrue", "number", [])),
            (this.QTS_NewRuntime = this.module.cwrap("QTS_NewRuntime", "number", [])),
            (this.QTS_FreeRuntime = this.module.cwrap("QTS_FreeRuntime", null, ["number"])),
            (this.QTS_NewContext = this.module.cwrap("QTS_NewContext", "number", ["number"])),
            (this.QTS_FreeContext = this.module.cwrap("QTS_FreeContext", null, ["number"])),
            (this.QTS_FreeValuePointer = this.module.cwrap("QTS_FreeValuePointer", null, [
              "number",
              "number",
            ])),
            (this.QTS_FreeValuePointerRuntime = this.module.cwrap(
              "QTS_FreeValuePointerRuntime",
              null,
              ["number", "number"],
            )),
            (this.QTS_FreeVoidPointer = this.module.cwrap("QTS_FreeVoidPointer", null, [
              "number",
              "number",
            ])),
            (this.QTS_FreeCString = this.module.cwrap("QTS_FreeCString", null, [
              "number",
              "number",
            ])),
            (this.QTS_DupValuePointer = this.module.cwrap("QTS_DupValuePointer", "number", [
              "number",
              "number",
            ])),
            (this.QTS_NewObject = this.module.cwrap("QTS_NewObject", "number", ["number"])),
            (this.QTS_NewObjectProto = this.module.cwrap("QTS_NewObjectProto", "number", [
              "number",
              "number",
            ])),
            (this.QTS_NewArray = this.module.cwrap("QTS_NewArray", "number", ["number"])),
            (this.QTS_NewArrayBuffer = this.module.cwrap("QTS_NewArrayBuffer", "number", [
              "number",
              "number",
              "number",
            ])),
            (this.QTS_NewFloat64 = this.module.cwrap("QTS_NewFloat64", "number", [
              "number",
              "number",
            ])),
            (this.QTS_GetFloat64 = this.module.cwrap("QTS_GetFloat64", "number", [
              "number",
              "number",
            ])),
            (this.QTS_NewString = this.module.cwrap("QTS_NewString", "number", [
              "number",
              "number",
            ])),
            (this.QTS_GetString = this.module.cwrap("QTS_GetString", "number", [
              "number",
              "number",
            ])),
            (this.QTS_GetArrayBuffer = this.module.cwrap("QTS_GetArrayBuffer", "number", [
              "number",
              "number",
            ])),
            (this.QTS_GetArrayBufferLength = this.module.cwrap(
              "QTS_GetArrayBufferLength",
              "number",
              ["number", "number"],
            )),
            (this.QTS_NewSymbol = this.module.cwrap("QTS_NewSymbol", "number", [
              "number",
              "number",
              "number",
            ])),
            (this.QTS_GetSymbolDescriptionOrKey = Ge(
              this.module.cwrap("QTS_GetSymbolDescriptionOrKey", "number", ["number", "number"]),
            )),
            (this.QTS_GetSymbolDescriptionOrKey_MaybeAsync = this.module.cwrap(
              "QTS_GetSymbolDescriptionOrKey",
              "number",
              ["number", "number"],
              { async: !0 },
            )),
            (this.QTS_IsGlobalSymbol = this.module.cwrap("QTS_IsGlobalSymbol", "number", [
              "number",
              "number",
            ])),
            (this.QTS_IsJobPending = this.module.cwrap("QTS_IsJobPending", "number", ["number"])),
            (this.QTS_ExecutePendingJob = Ge(
              this.module.cwrap("QTS_ExecutePendingJob", "number", ["number", "number", "number"]),
            )),
            (this.QTS_ExecutePendingJob_MaybeAsync = this.module.cwrap(
              "QTS_ExecutePendingJob",
              "number",
              ["number", "number", "number"],
              { async: !0 },
            )),
            (this.QTS_GetProp = Ge(
              this.module.cwrap("QTS_GetProp", "number", ["number", "number", "number"]),
            )),
            (this.QTS_GetProp_MaybeAsync = this.module.cwrap(
              "QTS_GetProp",
              "number",
              ["number", "number", "number"],
              { async: !0 },
            )),
            (this.QTS_SetProp = Ge(
              this.module.cwrap("QTS_SetProp", null, ["number", "number", "number", "number"]),
            )),
            (this.QTS_SetProp_MaybeAsync = this.module.cwrap(
              "QTS_SetProp",
              null,
              ["number", "number", "number", "number"],
              { async: !0 },
            )),
            (this.QTS_DefineProp = this.module.cwrap("QTS_DefineProp", null, [
              "number",
              "number",
              "number",
              "number",
              "number",
              "number",
              "boolean",
              "boolean",
              "boolean",
            ])),
            (this.QTS_Call = Ge(
              this.module.cwrap("QTS_Call", "number", [
                "number",
                "number",
                "number",
                "number",
                "number",
              ]),
            )),
            (this.QTS_Call_MaybeAsync = this.module.cwrap(
              "QTS_Call",
              "number",
              ["number", "number", "number", "number", "number"],
              { async: !0 },
            )),
            (this.QTS_ResolveException = this.module.cwrap("QTS_ResolveException", "number", [
              "number",
              "number",
            ])),
            (this.QTS_Dump = Ge(this.module.cwrap("QTS_Dump", "number", ["number", "number"]))),
            (this.QTS_Dump_MaybeAsync = this.module.cwrap(
              "QTS_Dump",
              "number",
              ["number", "number"],
              { async: !0 },
            )),
            (this.QTS_Eval = Ge(
              this.module.cwrap("QTS_Eval", "number", [
                "number",
                "number",
                "string",
                "number",
                "number",
              ]),
            )),
            (this.QTS_Eval_MaybeAsync = this.module.cwrap(
              "QTS_Eval",
              "number",
              ["number", "number", "string", "number", "number"],
              { async: !0 },
            )),
            (this.QTS_Typeof = this.module.cwrap("QTS_Typeof", "number", ["number", "number"])),
            (this.QTS_GetGlobalObject = this.module.cwrap("QTS_GetGlobalObject", "number", [
              "number",
            ])),
            (this.QTS_NewPromiseCapability = this.module.cwrap(
              "QTS_NewPromiseCapability",
              "number",
              ["number", "number"],
            )),
            (this.QTS_TestStringArg = this.module.cwrap("QTS_TestStringArg", null, ["string"])),
            (this.QTS_BuildIsDebug = this.module.cwrap("QTS_BuildIsDebug", "number", [])),
            (this.QTS_BuildIsAsyncify = this.module.cwrap("QTS_BuildIsAsyncify", "number", [])),
            (this.QTS_NewFunction = this.module.cwrap("QTS_NewFunction", "number", [
              "number",
              "number",
              "string",
            ])),
            (this.QTS_ArgvGetJSValueConstPointer = this.module.cwrap(
              "QTS_ArgvGetJSValueConstPointer",
              "number",
              ["number", "number"],
            )),
            (this.QTS_RuntimeEnableInterruptHandler = this.module.cwrap(
              "QTS_RuntimeEnableInterruptHandler",
              null,
              ["number"],
            )),
            (this.QTS_RuntimeDisableInterruptHandler = this.module.cwrap(
              "QTS_RuntimeDisableInterruptHandler",
              null,
              ["number"],
            )),
            (this.QTS_RuntimeEnableModuleLoader = this.module.cwrap(
              "QTS_RuntimeEnableModuleLoader",
              null,
              ["number", "number"],
            )),
            (this.QTS_RuntimeDisableModuleLoader = this.module.cwrap(
              "QTS_RuntimeDisableModuleLoader",
              null,
              ["number"],
            )),
            (this.QTS_bjson_encode = this.module.cwrap("QTS_bjson_encode", "number", [
              "number",
              "number",
            ])),
            (this.QTS_bjson_decode = this.module.cwrap("QTS_bjson_decode", "number", [
              "number",
              "number",
            ]))
        }
      }
    })
  var mo = {}
  Nr(mo, { default: () => La })
  var Zt,
    Oa,
    La,
    _o = ar(() => {
      "use strict"
      ;(Zt = {}),
        (Oa = (() => {
          var i = Zt.url
          return async function (l = {}) {
            var e = l,
              T,
              A
            ;(e.ready = new Promise((s, m) => {
              ;(T = s), (A = m)
            })),
              [
                "_QTS_Throw",
                "_QTS_NewError",
                "_QTS_RuntimeSetMemoryLimit",
                "_QTS_RuntimeComputeMemoryUsage",
                "_QTS_RuntimeDumpMemoryUsage",
                "_QTS_RecoverableLeakCheck",
                "_QTS_BuildIsSanitizeLeak",
                "_QTS_RuntimeSetMaxStackSize",
                "_QTS_GetUndefined",
                "_QTS_GetNull",
                "_QTS_GetFalse",
                "_QTS_GetTrue",
                "_QTS_NewRuntime",
                "_QTS_FreeRuntime",
                "_QTS_NewContext",
                "_QTS_FreeContext",
                "_QTS_FreeValuePointer",
                "_QTS_FreeValuePointerRuntime",
                "_QTS_FreeVoidPointer",
                "_QTS_FreeCString",
                "_QTS_DupValuePointer",
                "_QTS_NewObject",
                "_QTS_NewObjectProto",
                "_QTS_NewArray",
                "_QTS_NewArrayBuffer",
                "_QTS_NewFloat64",
                "_QTS_GetFloat64",
                "_QTS_NewString",
                "_QTS_GetString",
                "_QTS_GetArrayBuffer",
                "_QTS_GetArrayBufferLength",
                "_QTS_NewSymbol",
                "_QTS_GetSymbolDescriptionOrKey",
                "_QTS_IsGlobalSymbol",
                "_QTS_IsJobPending",
                "_QTS_ExecutePendingJob",
                "_QTS_GetProp",
                "_QTS_SetProp",
                "_QTS_DefineProp",
                "_QTS_Call",
                "_QTS_ResolveException",
                "_QTS_Dump",
                "_QTS_Eval",
                "_QTS_Typeof",
                "_QTS_GetGlobalObject",
                "_QTS_NewPromiseCapability",
                "_QTS_TestStringArg",
                "_QTS_BuildIsDebug",
                "_QTS_BuildIsAsyncify",
                "_QTS_NewFunction",
                "_QTS_ArgvGetJSValueConstPointer",
                "_QTS_RuntimeEnableInterruptHandler",
                "_QTS_RuntimeDisableInterruptHandler",
                "_QTS_RuntimeEnableModuleLoader",
                "_QTS_RuntimeDisableModuleLoader",
                "_QTS_bjson_encode",
                "_QTS_bjson_decode",
                "_malloc",
                "_free",
                "_memory",
                "_set_asyncify_stack_size",
                "_qts_host_call_function",
                "_qts_host_interrupt_handler",
                "_qts_host_load_module_source",
                "_qts_host_normalize_module",
                "___indirect_function_table",
                "_fflush",
                "___start_em_js",
                "___stop_em_js",
                "onRuntimeInitialized",
              ].forEach((s) => {
                Object.getOwnPropertyDescriptor(e.ready, s) ||
                  Object.defineProperty(e.ready, s, {
                    get: () =>
                      L(
                        "You are getting " +
                          s +
                          " on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js",
                      ),
                    set: () =>
                      L(
                        "You are setting " +
                          s +
                          " on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js",
                      ),
                  })
              })
            var N = Object.assign({}, e),
              x = [],
              H = "./this.program",
              Y = (s, m) => {
                throw m
              },
              Te = typeof window == "object",
              ae = typeof importScripts == "function",
              q =
                typeof process == "object" &&
                typeof process.versions == "object" &&
                typeof process.versions.node == "string",
              be = !Te && !q && !ae
            if (e.ENVIRONMENT)
              throw new Error(
                "Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -sENVIRONMENT=web or -sENVIRONMENT=node)",
              )
            var se = ""
            function er(s) {
              return e.locateFile ? e.locateFile(s, se) : se + s
            }
            var Re, Pe, ke
            if (q) {
              if (typeof process > "u" || !process.release || process.release.name !== "node")
                throw new Error(
                  "not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)",
                )
              var $e = process.versions.node,
                he = $e.split(".").slice(0, 3)
              he = he[0] * 1e4 + he[1] * 100 + he[2].split("-")[0] * 1
              var lr = 16e4
              if (he < 16e4)
                throw new Error(
                  "This emscripten-generated code requires node v16.0.0 (detected v" + $e + ")",
                )
              let { createRequire: s } = await import("module")
              var Ie = s(Zt.url),
                Me = Ie("fs"),
                _e = Ie("path")
              ae
                ? (se = _e.dirname(se) + "/")
                : (se = Ie("url").fileURLToPath(new URL("./", Zt.url))),
                (Re = (m, v) => (
                  (m = me(m) ? new URL(m) : _e.normalize(m)),
                  Me.readFileSync(m, v ? void 0 : "utf8")
                )),
                (ke = (m) => {
                  var v = Re(m, !0)
                  return v.buffer || (v = new Uint8Array(v)), g(v.buffer), v
                }),
                (Pe = (m, v, C, j = !0) => {
                  ;(m = me(m) ? new URL(m) : _e.normalize(m)),
                    Me.readFile(m, j ? void 0 : "utf8", (X, Z) => {
                      X ? C(X) : v(j ? Z.buffer : Z)
                    })
                }),
                !e.thisProgram &&
                  process.argv.length > 1 &&
                  (H = process.argv[1].replace(/\\/g, "/")),
                (x = process.argv.slice(2)),
                (Y = (m, v) => {
                  throw ((process.exitCode = m), v)
                }),
                (e.inspect = () => "[Emscripten Module object]")
            } else if (be) {
              if (
                (typeof process == "object" && typeof Ie == "function") ||
                typeof window == "object" ||
                typeof importScripts == "function"
              )
                throw new Error(
                  "not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)",
                )
              typeof read < "u" && (Re = read),
                (ke = (s) => {
                  if (typeof readbuffer == "function") return new Uint8Array(readbuffer(s))
                  let m = read(s, "binary")
                  return g(typeof m == "object"), m
                }),
                (Pe = (s, m, v) => {
                  setTimeout(() => m(ke(s)))
                }),
                typeof clearTimeout > "u" && (globalThis.clearTimeout = (s) => {}),
                typeof setTimeout > "u" &&
                  (globalThis.setTimeout = (s) => (typeof s == "function" ? s() : L())),
                typeof scriptArgs < "u"
                  ? (x = scriptArgs)
                  : typeof arguments < "u" && (x = arguments),
                typeof quit == "function" &&
                  (Y = (s, m) => {
                    throw (
                      (setTimeout(() => {
                        if (!(m instanceof ve)) {
                          let v = m
                          m && typeof m == "object" && m.stack && (v = [m, m.stack]),
                            I(`exiting due to exception: ${v}`)
                        }
                        quit(s)
                      }),
                      m)
                    )
                  }),
                typeof print < "u" &&
                  (typeof console > "u" && (console = {}),
                  (console.log = print),
                  (console.warn = console.error = typeof printErr < "u" ? printErr : print))
            } else if (Te || ae) {
              if (
                (ae
                  ? (se = self.location.href)
                  : typeof document < "u" &&
                    document.currentScript &&
                    (se = document.currentScript.src),
                i && (se = i),
                se.indexOf("blob:") !== 0
                  ? (se = se.substr(0, se.replace(/[?#].*/, "").lastIndexOf("/") + 1))
                  : (se = ""),
                !(typeof window == "object" || typeof importScripts == "function"))
              )
                throw new Error(
                  "not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)",
                )
              ;(Re = (s) => {
                var m = new XMLHttpRequest()
                return m.open("GET", s, !1), m.send(null), m.responseText
              }),
                ae &&
                  (ke = (s) => {
                    var m = new XMLHttpRequest()
                    return (
                      m.open("GET", s, !1),
                      (m.responseType = "arraybuffer"),
                      m.send(null),
                      new Uint8Array(m.response)
                    )
                  }),
                (Pe = (s, m, v) => {
                  var C = new XMLHttpRequest()
                  C.open("GET", s, !0),
                    (C.responseType = "arraybuffer"),
                    (C.onload = () => {
                      if (C.status == 200 || (C.status == 0 && C.response)) {
                        m(C.response)
                        return
                      }
                      v()
                    }),
                    (C.onerror = v),
                    C.send(null)
                })
            } else throw new Error("environment detection error")
            var de = e.print || console.log.bind(console),
              I = e.printErr || console.error.bind(console)
            Object.assign(e, N),
              (N = null),
              ut(),
              e.arguments && (x = e.arguments),
              qe("arguments", "arguments_"),
              e.thisProgram && (H = e.thisProgram),
              qe("thisProgram", "thisProgram"),
              e.quit && (Y = e.quit),
              qe("quit", "quit_"),
              g(
                typeof e.memoryInitializerPrefixURL > "u",
                "Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead",
              ),
              g(
                typeof e.pthreadMainPrefixURL > "u",
                "Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead",
              ),
              g(
                typeof e.cdInitializerPrefixURL > "u",
                "Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead",
              ),
              g(
                typeof e.filePackagePrefixURL > "u",
                "Module.filePackagePrefixURL option was removed, use Module.locateFile instead",
              ),
              g(typeof e.read > "u", "Module.read option was removed (modify read_ in JS)"),
              g(
                typeof e.readAsync > "u",
                "Module.readAsync option was removed (modify readAsync in JS)",
              ),
              g(
                typeof e.readBinary > "u",
                "Module.readBinary option was removed (modify readBinary in JS)",
              ),
              g(
                typeof e.setWindowTitle > "u",
                "Module.setWindowTitle option was removed (modify emscripten_set_window_title in JS)",
              ),
              g(
                typeof e.TOTAL_MEMORY > "u",
                "Module.TOTAL_MEMORY has been renamed Module.INITIAL_MEMORY",
              ),
              qe("asm", "wasmExports"),
              qe("read", "read_"),
              qe("readAsync", "readAsync"),
              qe("readBinary", "readBinary"),
              qe("setWindowTitle", "setWindowTitle")
            var Ne = "IDBFS is no longer included by default; build with -lidbfs.js",
              xe = "PROXYFS is no longer included by default; build with -lproxyfs.js",
              Wr = "WORKERFS is no longer included by default; build with -lworkerfs.js",
              $r = "FETCHFS is no longer included by default; build with -lfetchfs.js",
              it = "ICASEFS is no longer included by default; build with -licasefs.js",
              ur = "JSFILEFS is no longer included by default; build with -ljsfilefs.js",
              Yr = "OPFS is no longer included by default; build with -lopfs.js",
              Be = "NODEFS is no longer included by default; build with -lnodefs.js"
            g(
              !be,
              "shell environment detected but not enabled at build time.  Add 'shell' to `-sENVIRONMENT` to enable.",
            )
            var ge
            e.wasmBinary && (ge = e.wasmBinary),
              qe("wasmBinary", "wasmBinary"),
              typeof WebAssembly != "object" && L("no native wasm support detected")
            var Qe,
              ue = !1,
              De
            function g(s, m) {
              s || L("Assertion failed" + (m ? ": " + m : ""))
            }
            var cr, Se, Ee, Sr, Ar, G, B, rr, dr
            function mr() {
              var s = Qe.buffer
              ;(e.HEAP8 = Se = new Int8Array(s)),
                (e.HEAP16 = Sr = new Int16Array(s)),
                (e.HEAPU8 = Ee = new Uint8Array(s)),
                (e.HEAPU16 = Ar = new Uint16Array(s)),
                (e.HEAP32 = G = new Int32Array(s)),
                (e.HEAPU32 = B = new Uint32Array(s)),
                (e.HEAPF32 = rr = new Float32Array(s)),
                (e.HEAPF64 = dr = new Float64Array(s))
            }
            g(
              !e.STACK_SIZE,
              "STACK_SIZE can no longer be set at runtime.  Use -sSTACK_SIZE at link time",
            ),
              g(
                typeof Int32Array < "u" &&
                  typeof Float64Array < "u" &&
                  Int32Array.prototype.subarray != null &&
                  Int32Array.prototype.set != null,
                "JS engine does not provide full typed array support",
              ),
              g(
                !e.wasmMemory,
                "Use of `wasmMemory` detected.  Use -sIMPORTED_MEMORY to define wasmMemory externally",
              ),
              g(
                !e.INITIAL_MEMORY,
                "Detected runtime INITIAL_MEMORY setting.  Use -sIMPORTED_MEMORY to define wasmMemory dynamically",
              )
            function je() {
              var s = Ht()
              g((s & 3) == 0),
                s == 0 && (s += 4),
                (B[s >> 2] = 34821223),
                (B[(s + 4) >> 2] = 2310721022),
                (B[0] = 1668509029)
            }
            function Ye() {
              if (!ue) {
                var s = Ht()
                s == 0 && (s += 4)
                var m = B[s >> 2],
                  v = B[(s + 4) >> 2]
                ;(m != 34821223 || v != 2310721022) &&
                  L(
                    `Stack overflow! Stack cookie has been overwritten at ${we(
                      s,
                    )}, expected hex dwords 0x89BACDFE and 0x2135467, but received ${we(v)} ${we(
                      m,
                    )}`,
                  ),
                  B[0] != 1668509029 &&
                    L(
                      "Runtime error: The application has corrupted its heap memory area (address zero)!",
                    )
              }
            }
            ;(function () {
              var s = new Int16Array(1),
                m = new Int8Array(s.buffer)
              if (((s[0] = 25459), m[0] !== 115 || m[1] !== 99))
                throw "Runtime error: expected the system to be little-endian! (Run with -sSUPPORT_BIG_ENDIAN to bypass)"
            })()
            var pr = [],
              _r = [],
              Tr = [],
              Cr = [],
              tr = !1
            function Rr() {
              if (e.preRun)
                for (typeof e.preRun == "function" && (e.preRun = [e.preRun]); e.preRun.length; )
                  Pr(e.preRun.shift())
              Fe(pr)
            }
            function M() {
              g(!tr), (tr = !0), Ye(), Fe(_r)
            }
            function Ur() {
              if ((Ye(), e.postRun))
                for (
                  typeof e.postRun == "function" && (e.postRun = [e.postRun]);
                  e.postRun.length;

                )
                  Oe(e.postRun.shift())
              Fe(Cr)
            }
            function Pr(s) {
              pr.unshift(s)
            }
            function vr(s) {
              _r.unshift(s)
            }
            function Gr(s) {}
            function Oe(s) {
              Cr.unshift(s)
            }
            g(
              Math.imul,
              "This browser does not support Math.imul(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill",
            ),
              g(
                Math.fround,
                "This browser does not support Math.fround(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill",
              ),
              g(
                Math.clz32,
                "This browser does not support Math.clz32(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill",
              ),
              g(
                Math.trunc,
                "This browser does not support Math.trunc(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill",
              )
            var He = 0,
              d = null,
              f = null,
              w = {}
            function F(s) {
              for (var m = s; ; ) {
                if (!w[s]) return s
                s = m + Math.random()
              }
            }
            function O(s) {
              He++,
                e.monitorRunDependencies && e.monitorRunDependencies(He),
                s
                  ? (g(!w[s]),
                    (w[s] = 1),
                    d === null &&
                      typeof setInterval < "u" &&
                      (d = setInterval(() => {
                        if (ue) {
                          clearInterval(d), (d = null)
                          return
                        }
                        var m = !1
                        for (var v in w)
                          m || ((m = !0), I("still waiting on run dependencies:")),
                            I(`dependency: ${v}`)
                        m && I("(end of list)")
                      }, 1e4)))
                  : I("warning: run dependency added without ID")
            }
            function re(s) {
              if (
                (He--,
                e.monitorRunDependencies && e.monitorRunDependencies(He),
                s ? (g(w[s]), delete w[s]) : I("warning: run dependency removed without ID"),
                He == 0 && (d !== null && (clearInterval(d), (d = null)), f))
              ) {
                var m = f
                ;(f = null), m()
              }
            }
            function L(s) {
              e.onAbort && e.onAbort(s),
                (s = "Aborted(" + s + ")"),
                I(s),
                (ue = !0),
                (De = 1),
                s.indexOf("RuntimeError: unreachable") >= 0 &&
                  (s +=
                    '. "unreachable" may be due to ASYNCIFY_STACK_SIZE not being large enough (try increasing it)')
              var m = new WebAssembly.RuntimeError(s)
              throw (A(m), m)
            }
            var oe = {
              error() {
                L(
                  "Filesystem support (FS) was not included. The problem is that you are using files from JS, but files were not used from C/C++, so filesystem support was not auto-included. You can force-include filesystem support with -sFORCE_FILESYSTEM",
                )
              },
              init() {
                oe.error()
              },
              createDataFile() {
                oe.error()
              },
              createPreloadedFile() {
                oe.error()
              },
              createLazyFile() {
                oe.error()
              },
              open() {
                oe.error()
              },
              mkdev() {
                oe.error()
              },
              registerDevice() {
                oe.error()
              },
              analyzePath() {
                oe.error()
              },
              ErrnoError() {
                oe.error()
              },
            }
            ;(e.FS_createDataFile = oe.createDataFile),
              (e.FS_createPreloadedFile = oe.createPreloadedFile)
            var te = "data:application/octet-stream;base64,",
              pe = (s) => s.startsWith(te),
              me = (s) => s.startsWith("file://")
            function Q(s) {
              return function () {
                g(tr, `native function \`${s}\` called before runtime initialization`)
                var m = Je[s]
                return g(m, `exported native function \`${s}\` not found`), m.apply(null, arguments)
              }
            }
            var E
            e.locateFile
              ? ((E = "emscripten-module.wasm"), pe(E) || (E = er(E)))
              : (E = new URL("emscripten-module.wasm", Zt.url).href)
            function P(s) {
              if (s == E && ge) return new Uint8Array(ge)
              if (ke) return ke(s)
              throw "both async and sync fetching of the wasm failed"
            }
            function Br(s) {
              if (!ge && (Te || ae)) {
                if (typeof fetch == "function" && !me(s))
                  return fetch(s, { credentials: "same-origin" })
                    .then((m) => {
                      if (!m.ok) throw "failed to load wasm binary file at '" + s + "'"
                      return m.arrayBuffer()
                    })
                    .catch(() => P(s))
                if (Pe)
                  return new Promise((m, v) => {
                    Pe(s, (C) => m(new Uint8Array(C)), v)
                  })
              }
              return Promise.resolve().then(() => P(s))
            }
            function qr(s, m, v) {
              return Br(s)
                .then((C) => WebAssembly.instantiate(C, m))
                .then((C) => C)
                .then(v, (C) => {
                  I(`failed to asynchronously prepare wasm: ${C}`),
                    me(E) &&
                      I(
                        `warning: Loading from a file URI (${E}) is not supported in most browsers. See https://emscripten.org/docs/getting_started/FAQ.html#how-do-i-run-a-local-webserver-for-testing-why-does-my-program-stall-in-downloading-or-preparing`,
                      ),
                    L(C)
                })
            }
            function Hr(s, m, v, C) {
              return !s &&
                typeof WebAssembly.instantiateStreaming == "function" &&
                !pe(m) &&
                !me(m) &&
                !q &&
                typeof fetch == "function"
                ? fetch(m, { credentials: "same-origin" }).then((j) => {
                    var X = WebAssembly.instantiateStreaming(j, v)
                    return X.then(C, function (Z) {
                      return (
                        I(`wasm streaming compile failed: ${Z}`),
                        I("falling back to ArrayBuffer instantiation"),
                        qr(m, v, C)
                      )
                    })
                  })
                : qr(m, v, C)
            }
            function Vr() {
              var s = { env: Or, wasi_snapshot_preview1: Or }
              function m(j, X) {
                return (
                  (Je = j.exports),
                  (Je = D.instrumentWasmExports(Je)),
                  (Qe = Je.memory),
                  g(Qe, "memory not found in wasm exports"),
                  mr(),
                  vr(Je.__wasm_call_ctors),
                  re("wasm-instantiate"),
                  Je
                )
              }
              O("wasm-instantiate")
              var v = e
              function C(j) {
                g(
                  e === v,
                  "the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?",
                ),
                  (v = null),
                  m(j.instance)
              }
              if (e.instantiateWasm)
                try {
                  return e.instantiateWasm(s, m)
                } catch (j) {
                  I(`Module.instantiateWasm callback failed with error: ${j}`), A(j)
                }
              return Hr(ge, E, s, C).catch(A), {}
            }
            var xr, ot
            function qe(s, m, v = !0) {
              Object.getOwnPropertyDescriptor(e, s) ||
                Object.defineProperty(e, s, {
                  configurable: !0,
                  get() {
                    let C = v
                      ? " (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)"
                      : ""
                    L(`\`Module.${s}\` has been replaced by \`${m}\`` + C)
                  },
                })
            }
            function yr(s) {
              Object.getOwnPropertyDescriptor(e, s) &&
                L(
                  `\`Module.${s}\` was supplied but \`${s}\` not included in INCOMING_MODULE_JS_API`,
                )
            }
            function fr(s) {
              return (
                s === "FS_createPath" ||
                s === "FS_createDataFile" ||
                s === "FS_createPreloadedFile" ||
                s === "FS_unlink" ||
                s === "addRunDependency" ||
                s === "FS_createLazyFile" ||
                s === "FS_createDevice" ||
                s === "removeRunDependency"
              )
            }
            function Dr(s, m) {
              typeof globalThis < "u" &&
                Object.defineProperty(globalThis, s, {
                  configurable: !0,
                  get() {
                    ze(`\`${s}\` is not longer defined by emscripten. ${m}`)
                  },
                })
            }
            Dr("buffer", "Please use HEAP8.buffer or wasmMemory.buffer"),
              Dr("asm", "Please use wasmExports instead")
            function Kr(s) {
              typeof globalThis < "u" &&
                !Object.getOwnPropertyDescriptor(globalThis, s) &&
                Object.defineProperty(globalThis, s, {
                  configurable: !0,
                  get() {
                    var m = `\`${s}\` is a library symbol and not included by default; add it to your library.js __deps or to DEFAULT_LIBRARY_FUNCS_TO_INCLUDE on the command line`,
                      v = s
                    v.startsWith("_") || (v = "$" + s),
                      (m += ` (e.g. -sDEFAULT_LIBRARY_FUNCS_TO_INCLUDE='${v}')`),
                      fr(s) &&
                        (m +=
                          ". Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you"),
                      ze(m)
                  },
                }),
                c(s)
            }
            function c(s) {
              Object.getOwnPropertyDescriptor(e, s) ||
                Object.defineProperty(e, s, {
                  configurable: !0,
                  get() {
                    var m = `'${s}' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the Emscripten FAQ)`
                    fr(s) &&
                      (m +=
                        ". Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you"),
                      L(m)
                  },
                })
            }
            function _(s) {
              console.warn.apply(console, arguments)
            }
            function S(s, m) {
              D.StackSize = s || m
            }
            function b(s, m, v, C, j) {
              let X = { handleSleep: D.handleSleep }
              return e.callbacks.callFunction(X, s, m, v, C, j)
            }
            function k(s) {
              return e.callbacks.shouldInterrupt(void 0, s)
            }
            function ne(s, m, v) {
              let C = { handleSleep: D.handleSleep },
                j = hr(v)
              return e.callbacks.loadModuleSource(C, s, m, j)
            }
            function ie(s, m, v, C) {
              let j = { handleSleep: D.handleSleep },
                X = hr(v),
                Z = hr(C)
              return e.callbacks.normalizeModule(j, s, m, X, Z)
            }
            function ve(s) {
              ;(this.name = "ExitStatus"),
                (this.message = `Program terminated with exit(${s})`),
                (this.status = s)
            }
            var Fe = (s) => {
              for (; s.length > 0; ) s.shift()(e)
            }
            function Ve(s, m = "i8") {
              switch ((m.endsWith("*") && (m = "*"), m)) {
                case "i1":
                  return Se[s >> 0]
                case "i8":
                  return Se[s >> 0]
                case "i16":
                  return Sr[s >> 1]
                case "i32":
                  return G[s >> 2]
                case "i64":
                  L("to do getValue(i64) use WASM_BIGINT")
                case "float":
                  return rr[s >> 2]
                case "double":
                  return dr[s >> 3]
                case "*":
                  return B[s >> 2]
                default:
                  L(`invalid type for getValue: ${m}`)
              }
            }
            var Ir = e.noExitRuntime || !0,
              we = (s) => (
                g(typeof s == "number"), (s >>>= 0), "0x" + s.toString(16).padStart(8, "0")
              )
            function wr(s, m, v = "i8") {
              switch ((v.endsWith("*") && (v = "*"), v)) {
                case "i1":
                  Se[s >> 0] = m
                  break
                case "i8":
                  Se[s >> 0] = m
                  break
                case "i16":
                  Sr[s >> 1] = m
                  break
                case "i32":
                  G[s >> 2] = m
                  break
                case "i64":
                  L("to do setValue(i64) use WASM_BIGINT")
                case "float":
                  rr[s >> 2] = m
                  break
                case "double":
                  dr[s >> 3] = m
                  break
                case "*":
                  B[s >> 2] = m
                  break
                default:
                  L(`invalid type for setValue: ${v}`)
              }
            }
            var ze = (s) => {
                ze.shown || (ze.shown = {}),
                  ze.shown[s] || ((ze.shown[s] = 1), q && (s = "warning: " + s), I(s))
              },
              jt = typeof TextDecoder < "u" ? new TextDecoder("utf8") : void 0,
              Tt = (s, m, v) => {
                for (var C = m + v, j = m; s[j] && !(j >= C); ) ++j
                if (j - m > 16 && s.buffer && jt) return jt.decode(s.subarray(m, j))
                for (var X = ""; m < j; ) {
                  var Z = s[m++]
                  if (!(Z & 128)) {
                    X += String.fromCharCode(Z)
                    continue
                  }
                  var ee = s[m++] & 63
                  if ((Z & 224) == 192) {
                    X += String.fromCharCode(((Z & 31) << 6) | ee)
                    continue
                  }
                  var ce = s[m++] & 63
                  if (
                    ((Z & 240) == 224
                      ? (Z = ((Z & 15) << 12) | (ee << 6) | ce)
                      : ((Z & 248) != 240 &&
                          ze(
                            "Invalid UTF-8 leading byte " +
                              we(Z) +
                              " encountered when deserializing a UTF-8 string in wasm memory to a JS string!",
                          ),
                        (Z = ((Z & 7) << 18) | (ee << 12) | (ce << 6) | (s[m++] & 63))),
                    Z < 65536)
                  )
                    X += String.fromCharCode(Z)
                  else {
                    var Ae = Z - 65536
                    X += String.fromCharCode(55296 | (Ae >> 10), 56320 | (Ae & 1023))
                  }
                }
                return X
              },
              hr = (s, m) => (
                g(typeof s == "number", `UTF8ToString expects a number (got ${typeof s})`),
                s ? Tt(Ee, s, m) : ""
              ),
              jr = (s, m, v, C) => {
                L(
                  `Assertion failed: ${hr(s)}, at: ` +
                    [m ? hr(m) : "unknown filename", v, C ? hr(C) : "unknown function"],
                )
              },
              at = (s) => s % 4 === 0 && (s % 100 !== 0 || s % 400 === 0),
              Vn = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335],
              rn = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
              Xr = (s) => {
                var m = at(s.getFullYear()),
                  v = m ? Vn : rn,
                  C = v[s.getMonth()] + s.getDate() - 1
                return C
              },
              tn = (s, m) => (
                g(s == s >>> 0 || s == (s | 0)),
                g(m === (m | 0)),
                (m + 2097152) >>> 0 < 4194305 - !!s ? (s >>> 0) + m * 4294967296 : NaN
              )
            function br(s, m, v) {
              var C = tn(s, m),
                j = new Date(C * 1e3)
              ;(G[v >> 2] = j.getSeconds()),
                (G[(v + 4) >> 2] = j.getMinutes()),
                (G[(v + 8) >> 2] = j.getHours()),
                (G[(v + 12) >> 2] = j.getDate()),
                (G[(v + 16) >> 2] = j.getMonth()),
                (G[(v + 20) >> 2] = j.getFullYear() - 1900),
                (G[(v + 24) >> 2] = j.getDay())
              var X = Xr(j) | 0
              ;(G[(v + 28) >> 2] = X), (G[(v + 36) >> 2] = -(j.getTimezoneOffset() * 60))
              var Z = new Date(j.getFullYear(), 0, 1),
                ee = new Date(j.getFullYear(), 6, 1).getTimezoneOffset(),
                ce = Z.getTimezoneOffset(),
                Ae = (ee != ce && j.getTimezoneOffset() == Math.min(ce, ee)) | 0
              G[(v + 32) >> 2] = Ae
            }
            var Ke = (s) => {
                for (var m = 0, v = 0; v < s.length; ++v) {
                  var C = s.charCodeAt(v)
                  C <= 127
                    ? m++
                    : C <= 2047
                      ? (m += 2)
                      : C >= 55296 && C <= 57343
                        ? ((m += 4), ++v)
                        : (m += 3)
                }
                return m
              },
              nn = (s, m, v, C) => {
                if (
                  (g(typeof s == "string", `stringToUTF8Array expects a string (got ${typeof s})`),
                  !(C > 0))
                )
                  return 0
                for (var j = v, X = v + C - 1, Z = 0; Z < s.length; ++Z) {
                  var ee = s.charCodeAt(Z)
                  if (ee >= 55296 && ee <= 57343) {
                    var ce = s.charCodeAt(++Z)
                    ee = (65536 + ((ee & 1023) << 10)) | (ce & 1023)
                  }
                  if (ee <= 127) {
                    if (v >= X) break
                    m[v++] = ee
                  } else if (ee <= 2047) {
                    if (v + 1 >= X) break
                    ;(m[v++] = 192 | (ee >> 6)), (m[v++] = 128 | (ee & 63))
                  } else if (ee <= 65535) {
                    if (v + 2 >= X) break
                    ;(m[v++] = 224 | (ee >> 12)),
                      (m[v++] = 128 | ((ee >> 6) & 63)),
                      (m[v++] = 128 | (ee & 63))
                  } else {
                    if (v + 3 >= X) break
                    ee > 1114111 &&
                      ze(
                        "Invalid Unicode code point " +
                          we(ee) +
                          " encountered when serializing a JS string to a UTF-8 string in wasm memory! (Valid unicode code points should be in range 0-0x10FFFF).",
                      ),
                      (m[v++] = 240 | (ee >> 18)),
                      (m[v++] = 128 | ((ee >> 12) & 63)),
                      (m[v++] = 128 | ((ee >> 6) & 63)),
                      (m[v++] = 128 | (ee & 63))
                  }
                }
                return (m[v] = 0), v - j
              },
              le = (s, m, v) => (
                g(
                  typeof v == "number",
                  "stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!",
                ),
                nn(s, Ee, m, v)
              ),
              Ot = (s) => {
                var m = Ke(s) + 1,
                  v = Bt(m)
                return v && le(s, v, m), v
              },
              Lt = (s, m, v) => {
                var C = new Date().getFullYear(),
                  j = new Date(C, 0, 1),
                  X = new Date(C, 6, 1),
                  Z = j.getTimezoneOffset(),
                  ee = X.getTimezoneOffset(),
                  ce = Math.max(Z, ee)
                ;(B[s >> 2] = ce * 60), (G[m >> 2] = +(Z != ee))
                function Ae(kt) {
                  var ft = kt.toTimeString().match(/\(([A-Za-z ]+)\)$/)
                  return ft ? ft[1] : "GMT"
                }
                var kr = Ae(j),
                  Pt = Ae(X),
                  tt = Ot(kr),
                  zr = Ot(Pt)
                ee < Z
                  ? ((B[v >> 2] = tt), (B[(v + 4) >> 2] = zr))
                  : ((B[v >> 2] = zr), (B[(v + 4) >> 2] = tt))
              },
              gr = () => {
                L("native code called abort()")
              },
              vt = () => Date.now(),
              Zr = (s, m, v) => Ee.copyWithin(s, m, m + v),
              yt = () => 2147483648,
              wt = (s) => {
                var m = Qe.buffer,
                  v = (s - m.byteLength + 65535) / 65536
                try {
                  return Qe.grow(v), mr(), 1
                } catch (C) {
                  I(
                    `growMemory: Attempted to grow heap from ${m.byteLength} bytes to ${s} bytes, but got error: ${C}`,
                  )
                }
              },
              on = (s) => {
                var m = Ee.length
                ;(s >>>= 0), g(s > m)
                var v = yt()
                if (s > v)
                  return (
                    I(`Cannot enlarge memory, requested ${s} bytes, but the limit is ${v} bytes!`),
                    !1
                  )
                for (var C = (ce, Ae) => ce + ((Ae - (ce % Ae)) % Ae), j = 1; j <= 4; j *= 2) {
                  var X = m * (1 + 0.2 / j)
                  X = Math.min(X, s + 100663296)
                  var Z = Math.min(v, C(Math.max(s, X), 65536)),
                    ee = wt(Z)
                  if (ee) return !0
                }
                return (
                  I(`Failed to grow the heap from ${m} bytes to ${Z} bytes, not enough memory!`), !1
                )
              },
              Xe = {
                varargs: void 0,
                get() {
                  g(Xe.varargs != null)
                  var s = G[+Xe.varargs >> 2]
                  return (Xe.varargs += 4), s
                },
                getp() {
                  return Xe.get()
                },
                getStr(s) {
                  var m = hr(s)
                  return m
                },
              },
              an = (s) => {
                L("fd_close called without SYSCALLS_REQUIRE_FILESYSTEM")
              }
            function sn(s, m, v, C, j) {
              var X = tn(m, v)
              return 70
            }
            var st = [null, [], []],
              K = (s, m) => {
                var v = st[s]
                g(v),
                  m === 0 || m === 10 ? ((s === 1 ? de : I)(Tt(v, 0)), (v.length = 0)) : v.push(m)
              },
              ln = () => {
                Ei(0), st[1].length && K(1, 10), st[2].length && K(2, 10)
              },
              un = (s, m, v, C) => {
                for (var j = 0, X = 0; X < v; X++) {
                  var Z = B[m >> 2],
                    ee = B[(m + 4) >> 2]
                  m += 8
                  for (var ce = 0; ce < ee; ce++) K(s, Ee[Z + ce])
                  j += ee
                }
                return (B[C >> 2] = j), 0
              },
              lt = (s) => {
                try {
                  return s()
                } catch (m) {
                  L(m)
                }
              },
              Ut = (s) => {
                if (s instanceof ve || s == "unwind") return De
                Ye(),
                  s instanceof WebAssembly.RuntimeError &&
                    Lr() <= 0 &&
                    I(
                      "Stack overflow detected.  You can try increasing -sSTACK_SIZE (currently set to 5242880)",
                    ),
                  Y(1, s)
              },
              et = 0,
              bt = () => Ir || et > 0,
              gt = (s) => {
                ;(De = s), bt() || (e.onExit && e.onExit(s), (ue = !0)), Y(s, new ve(s))
              },
              cn = (s, m) => {
                if (((De = s), Cn(), bt() && !m)) {
                  var v = `program exited (with status: ${s}), but keepRuntimeAlive() is set (counter=${et}) due to an async operation, so halting execution but not exiting the runtime or preventing further async execution (you can use emscripten_force_exit, if you want to force a true shutdown)`
                  A(v), I(v)
                }
                gt(s)
              },
              Gt = cn,
              dn = () => {
                if (!bt())
                  try {
                    Gt(De)
                  } catch (s) {
                    Ut(s)
                  }
              },
              mn = (s) => {
                if (ue) {
                  I(
                    "user callback triggered after runtime exited or application aborted.  Ignoring.",
                  )
                  return
                }
                try {
                  s(), dn()
                } catch (m) {
                  Ut(m)
                }
              },
              o = (s) => {
                g(
                  !s.includes("j"),
                  "i64 not permitted in function signatures when WASM_BIGINT is disabled",
                )
                for (
                  var m = { i: "i32", j: "i64", f: "f32", d: "f64", e: "externref", p: "i32" },
                    v = { parameters: [], results: s[0] == "v" ? [] : [m[s[0]]] },
                    C = 1;
                  C < s.length;
                  ++C
                )
                  g(s[C] in m, "invalid signature char: " + s[C]), v.parameters.push(m[s[C]])
                return v
              },
              ye = () => {
                et += 1
              },
              _n = () => {
                g(et > 0), (et -= 1)
              },
              D = {
                instrumentWasmImports(s) {
                  var m =
                    /^(qts_host_call_function|qts_host_load_module_source|qts_host_normalize_module|invoke_.*|__asyncjs__.*)$/
                  for (var v in s)
                    (function (C) {
                      var j = s[C],
                        X = j.sig
                      if (typeof j == "function") {
                        var Z = j.isAsync || m.test(C)
                        s[C] = function () {
                          var ee = D.state
                          try {
                            return j.apply(null, arguments)
                          } finally {
                            var ce = ee === D.State.Normal && D.state === D.State.Disabled,
                              Ae = C.startsWith("invoke_") && !0
                            if (D.state !== ee && !Z && !ce && !Ae)
                              throw new Error(
                                `import ${C} was not in ASYNCIFY_IMPORTS, but changed the state`,
                              )
                          }
                        }
                      }
                    })(v)
                },
                instrumentWasmExports(s) {
                  var m = {}
                  for (var v in s)
                    (function (C) {
                      var j = s[C]
                      typeof j == "function"
                        ? (m[C] = function () {
                            D.exportCallStack.push(C)
                            try {
                              return j.apply(null, arguments)
                            } finally {
                              if (!ue) {
                                var X = D.exportCallStack.pop()
                                g(X === C), D.maybeStopUnwind()
                              }
                            }
                          })
                        : (m[C] = j)
                    })(v)
                  return m
                },
                State: { Normal: 0, Unwinding: 1, Rewinding: 2, Disabled: 3 },
                state: 0,
                StackSize: 81920,
                currData: null,
                handleSleepReturnValue: 0,
                exportCallStack: [],
                callStackNameToId: {},
                callStackIdToName: {},
                callStackId: 0,
                asyncPromiseHandlers: null,
                sleepCallbacks: [],
                getCallStackId(s) {
                  var m = D.callStackNameToId[s]
                  return (
                    m === void 0 &&
                      ((m = D.callStackId++),
                      (D.callStackNameToId[s] = m),
                      (D.callStackIdToName[m] = s)),
                    m
                  )
                },
                maybeStopUnwind() {
                  D.currData &&
                    D.state === D.State.Unwinding &&
                    D.exportCallStack.length === 0 &&
                    ((D.state = D.State.Normal), lt(ki), typeof Fibers < "u" && Fibers.trampoline())
                },
                whenDone() {
                  return (
                    g(D.currData, "Tried to wait for an async operation when none is in progress."),
                    g(
                      !D.asyncPromiseHandlers,
                      "Cannot have multiple async operations in flight at once",
                    ),
                    new Promise((s, m) => {
                      D.asyncPromiseHandlers = { resolve: s, reject: m }
                    })
                  )
                },
                allocateData() {
                  var s = Bt(12 + D.StackSize)
                  return D.setDataHeader(s, s + 12, D.StackSize), D.setDataRewindFunc(s), s
                },
                setDataHeader(s, m, v) {
                  ;(B[s >> 2] = m), (B[(s + 4) >> 2] = m + v)
                },
                setDataRewindFunc(s) {
                  var m = D.exportCallStack[0],
                    v = D.getCallStackId(m)
                  G[(s + 8) >> 2] = v
                },
                getDataRewindFunc(s) {
                  var m = G[(s + 8) >> 2],
                    v = D.callStackIdToName[m],
                    C = Je[v]
                  return C
                },
                doRewind(s) {
                  var m = D.getDataRewindFunc(s)
                  return m()
                },
                handleSleep(s) {
                  if (
                    (g(
                      D.state !== D.State.Disabled,
                      "Asyncify cannot be done during or after the runtime exits",
                    ),
                    !ue)
                  ) {
                    if (D.state === D.State.Normal) {
                      var m = !1,
                        v = !1
                      s((C = 0) => {
                        if (
                          (g(!C || typeof C == "number" || typeof C == "boolean"),
                          !ue && ((D.handleSleepReturnValue = C), (m = !0), !!v))
                        ) {
                          g(
                            !D.exportCallStack.length,
                            "Waking up (starting to rewind) must be done from JS, without compiled code on the stack.",
                          ),
                            (D.state = D.State.Rewinding),
                            lt(() => Mi(D.currData)),
                            typeof Browser < "u" &&
                              Browser.mainLoop.func &&
                              Browser.mainLoop.resume()
                          var j,
                            X = !1
                          try {
                            j = D.doRewind(D.currData)
                          } catch (ce) {
                            ;(j = ce), (X = !0)
                          }
                          var Z = !1
                          if (!D.currData) {
                            var ee = D.asyncPromiseHandlers
                            ee &&
                              ((D.asyncPromiseHandlers = null),
                              (X ? ee.reject : ee.resolve)(j),
                              (Z = !0))
                          }
                          if (X && !Z) throw j
                        }
                      }),
                        (v = !0),
                        m ||
                          ((D.state = D.State.Unwinding),
                          (D.currData = D.allocateData()),
                          typeof Browser < "u" && Browser.mainLoop.func && Browser.mainLoop.pause(),
                          lt(() => Pi(D.currData)))
                    } else
                      D.state === D.State.Rewinding
                        ? ((D.state = D.State.Normal),
                          lt(Ni),
                          At(D.currData),
                          (D.currData = null),
                          D.sleepCallbacks.forEach((C) => mn(C)))
                        : L(`invalid state: ${D.state}`)
                    return D.handleSleepReturnValue
                  }
                },
                handleAsync(s) {
                  return D.handleSleep((m) => {
                    s().then(m)
                  })
                },
              },
              fn = (s) => {
                var m = e["_" + s]
                return g(m, "Cannot call unknown function " + s + ", make sure it is exported"), m
              },
              hn = (s, m) => {
                g(
                  s.length >= 0,
                  "writeArrayToMemory array must have a length (should be an array or typed array)",
                ),
                  Se.set(s, m)
              },
              Sn = (s) => {
                var m = Ke(s) + 1,
                  v = En(m)
                return le(s, v, m), v
              },
              pn = (s, m, v, C, j) => {
                var X = {
                  string: (Ze) => {
                    var ht = 0
                    return Ze != null && Ze !== 0 && (ht = Sn(Ze)), ht
                  },
                  array: (Ze) => {
                    var ht = En(Ze.length)
                    return hn(Ze, ht), ht
                  },
                }
                function Z(Ze) {
                  return m === "string" ? hr(Ze) : m === "boolean" ? !!Ze : Ze
                }
                var ee = fn(s),
                  ce = [],
                  Ae = 0
                if ((g(m !== "array", 'Return type should not be "array".'), C))
                  for (var kr = 0; kr < C.length; kr++) {
                    var Pt = X[v[kr]]
                    Pt ? (Ae === 0 && (Ae = Ci()), (ce[kr] = Pt(C[kr]))) : (ce[kr] = C[kr])
                  }
                var tt = D.currData,
                  zr = ee.apply(null, ce)
                function kt(Ze) {
                  return _n(), Ae !== 0 && Ri(Ae), Z(Ze)
                }
                var ft = j && j.async
                return (
                  ye(),
                  D.currData != tt
                    ? (g(
                        !(tt && D.currData),
                        "We cannot start an async operation when one is already flight",
                      ),
                      g(!(tt && !D.currData), "We cannot stop an async operation in flight"),
                      g(
                        ft,
                        "The call to " +
                          s +
                          " is running asynchronously. If this was intended, add the async option to the ccall/cwrap call.",
                      ),
                      D.whenDone().then(kt))
                    : ((zr = kt(zr)), ft ? Promise.resolve(zr) : zr)
                )
              },
              Qt = (s, m, v, C) =>
                function () {
                  return pn(s, m, v, arguments, C)
                }
            function ut() {
              yr("fetchSettings")
            }
            var Or = {
              __assert_fail: jr,
              _localtime_js: br,
              _tzset_js: Lt,
              abort: gr,
              emscripten_date_now: vt,
              emscripten_memcpy_js: Zr,
              emscripten_resize_heap: on,
              fd_close: an,
              fd_seek: sn,
              fd_write: un,
              qts_host_call_function: b,
              qts_host_interrupt_handler: k,
              qts_host_load_module_source: ne,
              qts_host_normalize_module: ie,
              set_asyncify_stack_size: S,
            }
            D.instrumentWasmImports(Or)
            var Je = Vr(),
              zn = Q("__wasm_call_ctors"),
              Bt = (e._malloc = Q("malloc")),
              Jn = (e._QTS_Throw = Q("QTS_Throw")),
              Wn = (e._QTS_NewError = Q("QTS_NewError")),
              $n = (e._QTS_RuntimeSetMemoryLimit = Q("QTS_RuntimeSetMemoryLimit")),
              Et = (e._QTS_RuntimeComputeMemoryUsage = Q("QTS_RuntimeComputeMemoryUsage")),
              Yn = (e._QTS_RuntimeDumpMemoryUsage = Q("QTS_RuntimeDumpMemoryUsage")),
              qn = (e._QTS_RecoverableLeakCheck = Q("QTS_RecoverableLeakCheck")),
              Kn = (e._QTS_BuildIsSanitizeLeak = Q("QTS_BuildIsSanitizeLeak")),
              Xn = (e._QTS_RuntimeSetMaxStackSize = Q("QTS_RuntimeSetMaxStackSize")),
              Zn = (e._QTS_GetUndefined = Q("QTS_GetUndefined")),
              ei = (e._QTS_GetNull = Q("QTS_GetNull")),
              Tn = (e._QTS_GetFalse = Q("QTS_GetFalse")),
              ri = (e._QTS_GetTrue = Q("QTS_GetTrue")),
              ti = (e._QTS_NewRuntime = Q("QTS_NewRuntime")),
              vn = (e._QTS_FreeRuntime = Q("QTS_FreeRuntime")),
              ni = (e._QTS_NewContext = Q("QTS_NewContext")),
              nr = (e._QTS_FreeContext = Q("QTS_FreeContext")),
              Ft = (e._QTS_FreeValuePointer = Q("QTS_FreeValuePointer")),
              At = (e._free = Q("free")),
              ii = (e._QTS_FreeValuePointerRuntime = Q("QTS_FreeValuePointerRuntime")),
              ct = (e._QTS_FreeVoidPointer = Q("QTS_FreeVoidPointer")),
              dt = (e._QTS_FreeCString = Q("QTS_FreeCString")),
              oi = (e._QTS_DupValuePointer = Q("QTS_DupValuePointer")),
              ai = (e._QTS_NewObject = Q("QTS_NewObject")),
              si = (e._QTS_NewObjectProto = Q("QTS_NewObjectProto")),
              yn = (e._QTS_NewArray = Q("QTS_NewArray")),
              wn = (e._QTS_NewArrayBuffer = Q("QTS_NewArrayBuffer")),
              li = (e._QTS_NewFloat64 = Q("QTS_NewFloat64")),
              ui = (e._QTS_GetFloat64 = Q("QTS_GetFloat64")),
              ci = (e._QTS_NewString = Q("QTS_NewString")),
              di = (e._QTS_GetString = Q("QTS_GetString")),
              mi = (e._QTS_GetArrayBuffer = Q("QTS_GetArrayBuffer")),
              _i = (e._QTS_GetArrayBufferLength = Q("QTS_GetArrayBufferLength")),
              fi = (e._QTS_NewSymbol = Q("QTS_NewSymbol")),
              hi = (e._QTS_GetSymbolDescriptionOrKey = Q("QTS_GetSymbolDescriptionOrKey")),
              Si = (e._QTS_IsGlobalSymbol = Q("QTS_IsGlobalSymbol")),
              pi = (e._QTS_IsJobPending = Q("QTS_IsJobPending")),
              Ti = (e._QTS_ExecutePendingJob = Q("QTS_ExecutePendingJob")),
              vi = (e._QTS_GetProp = Q("QTS_GetProp")),
              yi = (e._QTS_SetProp = Q("QTS_SetProp")),
              wi = (e._QTS_DefineProp = Q("QTS_DefineProp")),
              bi = (e._QTS_Call = Q("QTS_Call")),
              gi = (e._QTS_ResolveException = Q("QTS_ResolveException")),
              bn = (e._QTS_Dump = Q("QTS_Dump")),
              Ct = (e._QTS_Eval = Q("QTS_Eval")),
              Rt = (e._QTS_Typeof = Q("QTS_Typeof")),
              Qi = (e._QTS_GetGlobalObject = Q("QTS_GetGlobalObject")),
              gn = (e._QTS_NewPromiseCapability = Q("QTS_NewPromiseCapability")),
              Qr = (e._QTS_TestStringArg = Q("QTS_TestStringArg")),
              wo = (e._QTS_BuildIsDebug = Q("QTS_BuildIsDebug")),
              mt = (e._QTS_BuildIsAsyncify = Q("QTS_BuildIsAsyncify")),
              bo = (e._QTS_NewFunction = Q("QTS_NewFunction")),
              go = (e._QTS_ArgvGetJSValueConstPointer = Q("QTS_ArgvGetJSValueConstPointer")),
              Qo = (e._QTS_RuntimeEnableInterruptHandler = Q("QTS_RuntimeEnableInterruptHandler")),
              Eo = (e._QTS_RuntimeDisableInterruptHandler = Q(
                "QTS_RuntimeDisableInterruptHandler",
              )),
              Fo = (e._QTS_RuntimeEnableModuleLoader = Q("QTS_RuntimeEnableModuleLoader")),
              Ao = (e._QTS_RuntimeDisableModuleLoader = Q("QTS_RuntimeDisableModuleLoader")),
              Co = (e._QTS_bjson_encode = Q("QTS_bjson_encode")),
              Ro = (e._QTS_bjson_decode = Q("QTS_bjson_decode")),
              Ei = (e._fflush = Q("fflush")),
              Po = Q("setTempRet0"),
              Qn = () => (Qn = Je.emscripten_stack_init)(),
              Fi = () => (Fi = Je.emscripten_stack_get_free)(),
              Ai = () => (Ai = Je.emscripten_stack_get_base)(),
              Ht = () => (Ht = Je.emscripten_stack_get_end)(),
              Ci = Q("stackSave"),
              Ri = Q("stackRestore"),
              En = Q("stackAlloc"),
              Lr = () => (Lr = Je.emscripten_stack_get_current)(),
              ko = (e.dynCall_viii = Q("dynCall_viii")),
              Mo = (e.dynCall_jijiii = Q("dynCall_jijiii")),
              No = (e.dynCall_iii = Q("dynCall_iii")),
              xo = (e.dynCall_iiiii = Q("dynCall_iiiii")),
              Do = (e.dynCall_iiii = Q("dynCall_iiii")),
              Io = (e.dynCall_ii = Q("dynCall_ii")),
              jo = (e.dynCall_jiij = Q("dynCall_jiij")),
              Oo = (e.dynCall_iiiijj = Q("dynCall_iiiijj")),
              Lo = (e.dynCall_iiiij = Q("dynCall_iiiij")),
              Uo = (e.dynCall_jiiiii = Q("dynCall_jiiiii")),
              Go = (e.dynCall_jij = Q("dynCall_jij")),
              Bo = (e.dynCall_jijjiii = Q("dynCall_jijjiii")),
              Ho = (e.dynCall_jiii = Q("dynCall_jiii")),
              Vo = (e.dynCall_jijiiii = Q("dynCall_jijiiii")),
              zo = (e.dynCall_vii = Q("dynCall_vii")),
              Jo = (e.dynCall_jijii = Q("dynCall_jijii")),
              Wo = (e.dynCall_jijiiiii = Q("dynCall_jijiiiii")),
              $o = (e.dynCall_jijj = Q("dynCall_jijj")),
              Yo = (e.dynCall_viji = Q("dynCall_viji")),
              qo = (e.dynCall_vij = Q("dynCall_vij")),
              Ko = (e.dynCall_iiijj = Q("dynCall_iiijj")),
              Xo = (e.dynCall_iijijjji = Q("dynCall_iijijjji")),
              Zo = (e.dynCall_iiiji = Q("dynCall_iiiji")),
              ea = (e.dynCall_iiji = Q("dynCall_iiji")),
              ra = (e.dynCall_jijij = Q("dynCall_jijij")),
              ta = (e.dynCall_iijijji = Q("dynCall_iijijji")),
              na = (e.dynCall_jiiii = Q("dynCall_jiiii")),
              ia = (e.dynCall_jiji = Q("dynCall_jiji")),
              oa = (e.dynCall_dd = Q("dynCall_dd")),
              aa = (e.dynCall_ddd = Q("dynCall_ddd")),
              sa = (e.dynCall_jii = Q("dynCall_jii")),
              la = (e.dynCall_iiiiii = Q("dynCall_iiiiii")),
              ua = (e.dynCall_iidiiii = Q("dynCall_iidiiii")),
              Pi = Q("asyncify_start_unwind"),
              ki = Q("asyncify_stop_unwind"),
              Mi = Q("asyncify_start_rewind"),
              Ni = Q("asyncify_stop_rewind"),
              ca = (e.___start_em_js = 87632),
              da = (e.___stop_em_js = 88712)
            ;(e.cwrap = Qt), (e.UTF8ToString = hr), (e.stringToUTF8 = le), (e.lengthBytesUTF8 = Ke)
            var xi = [
              "writeI53ToI64",
              "writeI53ToI64Clamped",
              "writeI53ToI64Signaling",
              "writeI53ToU64Clamped",
              "writeI53ToU64Signaling",
              "readI53FromI64",
              "readI53FromU64",
              "convertI32PairToI53",
              "convertU32PairToI53",
              "zeroMemory",
              "arraySum",
              "addDays",
              "setErrNo",
              "inetPton4",
              "inetNtop4",
              "inetPton6",
              "inetNtop6",
              "readSockaddr",
              "writeSockaddr",
              "getHostByName",
              "initRandomFill",
              "randomFill",
              "getCallstack",
              "emscriptenLog",
              "convertPCtoSourceLocation",
              "readEmAsmArgs",
              "jstoi_q",
              "jstoi_s",
              "getExecutableName",
              "listenOnce",
              "autoResumeAudioContext",
              "dynCallLegacy",
              "getDynCaller",
              "dynCall",
              "asmjsMangle",
              "asyncLoad",
              "alignMemory",
              "mmapAlloc",
              "handleAllocatorInit",
              "HandleAllocator",
              "getNativeTypeSize",
              "STACK_SIZE",
              "STACK_ALIGN",
              "POINTER_SIZE",
              "ASSERTIONS",
              "uleb128Encode",
              "generateFuncType",
              "convertJsFunctionToWasm",
              "getEmptyTableSlot",
              "updateTableMap",
              "getFunctionAddress",
              "addFunction",
              "removeFunction",
              "reallyNegative",
              "unSign",
              "strLen",
              "reSign",
              "formatString",
              "intArrayFromString",
              "intArrayToString",
              "AsciiToString",
              "stringToAscii",
              "UTF16ToString",
              "stringToUTF16",
              "lengthBytesUTF16",
              "UTF32ToString",
              "stringToUTF32",
              "lengthBytesUTF32",
              "registerKeyEventCallback",
              "maybeCStringToJsString",
              "findEventTarget",
              "findCanvasEventTarget",
              "getBoundingClientRect",
              "fillMouseEventData",
              "registerMouseEventCallback",
              "registerWheelEventCallback",
              "registerUiEventCallback",
              "registerFocusEventCallback",
              "fillDeviceOrientationEventData",
              "registerDeviceOrientationEventCallback",
              "fillDeviceMotionEventData",
              "registerDeviceMotionEventCallback",
              "screenOrientation",
              "fillOrientationChangeEventData",
              "registerOrientationChangeEventCallback",
              "fillFullscreenChangeEventData",
              "registerFullscreenChangeEventCallback",
              "JSEvents_requestFullscreen",
              "JSEvents_resizeCanvasForFullscreen",
              "registerRestoreOldStyle",
              "hideEverythingExceptGivenElement",
              "restoreHiddenElements",
              "setLetterbox",
              "softFullscreenResizeWebGLRenderTarget",
              "doRequestFullscreen",
              "fillPointerlockChangeEventData",
              "registerPointerlockChangeEventCallback",
              "registerPointerlockErrorEventCallback",
              "requestPointerLock",
              "fillVisibilityChangeEventData",
              "registerVisibilityChangeEventCallback",
              "registerTouchEventCallback",
              "fillGamepadEventData",
              "registerGamepadEventCallback",
              "registerBeforeUnloadEventCallback",
              "fillBatteryEventData",
              "battery",
              "registerBatteryEventCallback",
              "setCanvasElementSize",
              "getCanvasElementSize",
              "demangle",
              "demangleAll",
              "jsStackTrace",
              "stackTrace",
              "getEnvStrings",
              "checkWasiClock",
              "wasiRightsToMuslOFlags",
              "wasiOFlagsToMuslOFlags",
              "createDyncallWrapper",
              "safeSetTimeout",
              "setImmediateWrapped",
              "clearImmediateWrapped",
              "polyfillSetImmediate",
              "getPromise",
              "makePromise",
              "idsToPromises",
              "makePromiseCallback",
              "setMainLoop",
              "getSocketFromFD",
              "getSocketAddress",
              "FS_createPreloadedFile",
              "FS_modeStringToFlags",
              "FS_getMode",
              "FS_stdin_getChar",
              "FS_createDataFile",
              "FS_unlink",
              "FS_mkdirTree",
              "_setNetworkCallback",
              "ALLOC_NORMAL",
              "ALLOC_STACK",
              "allocate",
              "writeStringToMemory",
              "writeAsciiToMemory",
            ]
            xi.forEach(Kr)
            var Fn = [
              "run",
              "addOnPreRun",
              "addOnInit",
              "addOnPreMain",
              "addOnExit",
              "addOnPostRun",
              "addRunDependency",
              "removeRunDependency",
              "FS_createFolder",
              "FS_createPath",
              "FS_createLazyFile",
              "FS_createLink",
              "FS_createDevice",
              "FS_readFile",
              "out",
              "err",
              "callMain",
              "abort",
              "wasmMemory",
              "wasmExports",
              "stackAlloc",
              "stackSave",
              "stackRestore",
              "getTempRet0",
              "setTempRet0",
              "writeStackCookie",
              "checkStackCookie",
              "convertI32PairToI53Checked",
              "ptrToString",
              "exitJS",
              "getHeapMax",
              "growMemory",
              "ENV",
              "MONTH_DAYS_REGULAR",
              "MONTH_DAYS_LEAP",
              "MONTH_DAYS_REGULAR_CUMULATIVE",
              "MONTH_DAYS_LEAP_CUMULATIVE",
              "isLeapYear",
              "ydayFromDate",
              "ERRNO_CODES",
              "ERRNO_MESSAGES",
              "DNS",
              "Protocols",
              "Sockets",
              "timers",
              "warnOnce",
              "UNWIND_CACHE",
              "readEmAsmArgsArray",
              "handleException",
              "keepRuntimeAlive",
              "runtimeKeepalivePush",
              "runtimeKeepalivePop",
              "callUserCallback",
              "maybeExit",
              "wasmTable",
              "noExitRuntime",
              "getCFunc",
              "ccall",
              "sigToWasmTypes",
              "freeTableIndexes",
              "functionsInTableMap",
              "setValue",
              "getValue",
              "PATH",
              "PATH_FS",
              "UTF8Decoder",
              "UTF8ArrayToString",
              "stringToUTF8Array",
              "UTF16Decoder",
              "stringToNewUTF8",
              "stringToUTF8OnStack",
              "writeArrayToMemory",
              "JSEvents",
              "specialHTMLTargets",
              "currentFullscreenStrategy",
              "restoreOldWindowedStyle",
              "ExitStatus",
              "flush_NO_FILESYSTEM",
              "promiseMap",
              "Browser",
              "wget",
              "SYSCALLS",
              "preloadPlugins",
              "FS_stdin_getChar_buffer",
              "FS",
              "MEMFS",
              "TTY",
              "PIPEFS",
              "SOCKFS",
              "runAndAbortIfError",
              "Asyncify",
              "Fibers",
              "allocateUTF8",
              "allocateUTF8OnStack",
            ]
            Fn.forEach(c)
            var _t
            f = function s() {
              _t || rt(), _t || (f = s)
            }
            function An() {
              Qn(), je()
            }
            function rt() {
              if (He > 0 || (An(), Rr(), He > 0)) return
              function s() {
                _t ||
                  ((_t = !0),
                  (e.calledRun = !0),
                  !ue &&
                    (M(),
                    T(e),
                    e.onRuntimeInitialized && e.onRuntimeInitialized(),
                    g(
                      !e._main,
                      'compiled without a main, but one is present. if you added it from JS, use Module["onRuntimeInitialized"]',
                    ),
                    Ur()))
              }
              e.setStatus
                ? (e.setStatus("Running..."),
                  setTimeout(function () {
                    setTimeout(function () {
                      e.setStatus("")
                    }, 1),
                      s()
                  }, 1))
                : s(),
                Ye()
            }
            function Cn() {
              var s = de,
                m = I,
                v = !1
              de = I = (C) => {
                v = !0
              }
              try {
                ln()
              } catch {}
              ;(de = s),
                (I = m),
                v &&
                  (ze(
                    "stdio streams had content in them that was not flushed. you should set EXIT_RUNTIME to 1 (see the Emscripten FAQ), or make sure to emit a newline when you printf etc.",
                  ),
                  ze(
                    "(this may also be due to not including full filesystem support - try building with -sFORCE_FILESYSTEM)",
                  ))
            }
            if (e.preInit)
              for (
                typeof e.preInit == "function" && (e.preInit = [e.preInit]);
                e.preInit.length > 0;

              )
                e.preInit.pop()()
            return rt(), l.ready
          }
        })()),
        (La = Oa)
    })
  var fo = {}
  Nr(fo, { QuickJSAsyncFFI: () => Ba })
  var Ba,
    ho = ar(() => {
      "use strict"
      Mt()
      Ba = class {
        constructor(i) {
          ;(this.module = i),
            (this.DEBUG = !1),
            (this.QTS_Throw = this.module.cwrap("QTS_Throw", "number", ["number", "number"])),
            (this.QTS_NewError = this.module.cwrap("QTS_NewError", "number", ["number"])),
            (this.QTS_RuntimeSetMemoryLimit = this.module.cwrap("QTS_RuntimeSetMemoryLimit", null, [
              "number",
              "number",
            ])),
            (this.QTS_RuntimeComputeMemoryUsage = this.module.cwrap(
              "QTS_RuntimeComputeMemoryUsage",
              "number",
              ["number", "number"],
            )),
            (this.QTS_RuntimeDumpMemoryUsage = this.module.cwrap(
              "QTS_RuntimeDumpMemoryUsage",
              "number",
              ["number"],
            )),
            (this.QTS_RecoverableLeakCheck = this.module.cwrap(
              "QTS_RecoverableLeakCheck",
              "number",
              [],
            )),
            (this.QTS_BuildIsSanitizeLeak = this.module.cwrap(
              "QTS_BuildIsSanitizeLeak",
              "number",
              [],
            )),
            (this.QTS_RuntimeSetMaxStackSize = this.module.cwrap(
              "QTS_RuntimeSetMaxStackSize",
              null,
              ["number", "number"],
            )),
            (this.QTS_GetUndefined = this.module.cwrap("QTS_GetUndefined", "number", [])),
            (this.QTS_GetNull = this.module.cwrap("QTS_GetNull", "number", [])),
            (this.QTS_GetFalse = this.module.cwrap("QTS_GetFalse", "number", [])),
            (this.QTS_GetTrue = this.module.cwrap("QTS_GetTrue", "number", [])),
            (this.QTS_NewRuntime = this.module.cwrap("QTS_NewRuntime", "number", [])),
            (this.QTS_FreeRuntime = this.module.cwrap("QTS_FreeRuntime", null, ["number"])),
            (this.QTS_NewContext = this.module.cwrap("QTS_NewContext", "number", ["number"])),
            (this.QTS_FreeContext = this.module.cwrap("QTS_FreeContext", null, ["number"])),
            (this.QTS_FreeValuePointer = this.module.cwrap("QTS_FreeValuePointer", null, [
              "number",
              "number",
            ])),
            (this.QTS_FreeValuePointerRuntime = this.module.cwrap(
              "QTS_FreeValuePointerRuntime",
              null,
              ["number", "number"],
            )),
            (this.QTS_FreeVoidPointer = this.module.cwrap("QTS_FreeVoidPointer", null, [
              "number",
              "number",
            ])),
            (this.QTS_FreeCString = this.module.cwrap("QTS_FreeCString", null, [
              "number",
              "number",
            ])),
            (this.QTS_DupValuePointer = this.module.cwrap("QTS_DupValuePointer", "number", [
              "number",
              "number",
            ])),
            (this.QTS_NewObject = this.module.cwrap("QTS_NewObject", "number", ["number"])),
            (this.QTS_NewObjectProto = this.module.cwrap("QTS_NewObjectProto", "number", [
              "number",
              "number",
            ])),
            (this.QTS_NewArray = this.module.cwrap("QTS_NewArray", "number", ["number"])),
            (this.QTS_NewArrayBuffer = this.module.cwrap("QTS_NewArrayBuffer", "number", [
              "number",
              "number",
              "number",
            ])),
            (this.QTS_NewFloat64 = this.module.cwrap("QTS_NewFloat64", "number", [
              "number",
              "number",
            ])),
            (this.QTS_GetFloat64 = this.module.cwrap("QTS_GetFloat64", "number", [
              "number",
              "number",
            ])),
            (this.QTS_NewString = this.module.cwrap("QTS_NewString", "number", [
              "number",
              "number",
            ])),
            (this.QTS_GetString = this.module.cwrap("QTS_GetString", "number", [
              "number",
              "number",
            ])),
            (this.QTS_GetArrayBuffer = this.module.cwrap("QTS_GetArrayBuffer", "number", [
              "number",
              "number",
            ])),
            (this.QTS_GetArrayBufferLength = this.module.cwrap(
              "QTS_GetArrayBufferLength",
              "number",
              ["number", "number"],
            )),
            (this.QTS_NewSymbol = this.module.cwrap("QTS_NewSymbol", "number", [
              "number",
              "number",
              "number",
            ])),
            (this.QTS_GetSymbolDescriptionOrKey = Ge(
              this.module.cwrap("QTS_GetSymbolDescriptionOrKey", "number", ["number", "number"]),
            )),
            (this.QTS_GetSymbolDescriptionOrKey_MaybeAsync = this.module.cwrap(
              "QTS_GetSymbolDescriptionOrKey",
              "number",
              ["number", "number"],
            )),
            (this.QTS_IsGlobalSymbol = this.module.cwrap("QTS_IsGlobalSymbol", "number", [
              "number",
              "number",
            ])),
            (this.QTS_IsJobPending = this.module.cwrap("QTS_IsJobPending", "number", ["number"])),
            (this.QTS_ExecutePendingJob = Ge(
              this.module.cwrap("QTS_ExecutePendingJob", "number", ["number", "number", "number"]),
            )),
            (this.QTS_ExecutePendingJob_MaybeAsync = this.module.cwrap(
              "QTS_ExecutePendingJob",
              "number",
              ["number", "number", "number"],
            )),
            (this.QTS_GetProp = Ge(
              this.module.cwrap("QTS_GetProp", "number", ["number", "number", "number"]),
            )),
            (this.QTS_GetProp_MaybeAsync = this.module.cwrap("QTS_GetProp", "number", [
              "number",
              "number",
              "number",
            ])),
            (this.QTS_SetProp = Ge(
              this.module.cwrap("QTS_SetProp", null, ["number", "number", "number", "number"]),
            )),
            (this.QTS_SetProp_MaybeAsync = this.module.cwrap("QTS_SetProp", null, [
              "number",
              "number",
              "number",
              "number",
            ])),
            (this.QTS_DefineProp = this.module.cwrap("QTS_DefineProp", null, [
              "number",
              "number",
              "number",
              "number",
              "number",
              "number",
              "boolean",
              "boolean",
              "boolean",
            ])),
            (this.QTS_Call = Ge(
              this.module.cwrap("QTS_Call", "number", [
                "number",
                "number",
                "number",
                "number",
                "number",
              ]),
            )),
            (this.QTS_Call_MaybeAsync = this.module.cwrap("QTS_Call", "number", [
              "number",
              "number",
              "number",
              "number",
              "number",
            ])),
            (this.QTS_ResolveException = this.module.cwrap("QTS_ResolveException", "number", [
              "number",
              "number",
            ])),
            (this.QTS_Dump = Ge(this.module.cwrap("QTS_Dump", "number", ["number", "number"]))),
            (this.QTS_Dump_MaybeAsync = this.module.cwrap("QTS_Dump", "number", [
              "number",
              "number",
            ])),
            (this.QTS_Eval = Ge(
              this.module.cwrap("QTS_Eval", "number", [
                "number",
                "number",
                "string",
                "number",
                "number",
              ]),
            )),
            (this.QTS_Eval_MaybeAsync = this.module.cwrap("QTS_Eval", "number", [
              "number",
              "number",
              "string",
              "number",
              "number",
            ])),
            (this.QTS_Typeof = this.module.cwrap("QTS_Typeof", "number", ["number", "number"])),
            (this.QTS_GetGlobalObject = this.module.cwrap("QTS_GetGlobalObject", "number", [
              "number",
            ])),
            (this.QTS_NewPromiseCapability = this.module.cwrap(
              "QTS_NewPromiseCapability",
              "number",
              ["number", "number"],
            )),
            (this.QTS_TestStringArg = this.module.cwrap("QTS_TestStringArg", null, ["string"])),
            (this.QTS_BuildIsDebug = this.module.cwrap("QTS_BuildIsDebug", "number", [])),
            (this.QTS_BuildIsAsyncify = this.module.cwrap("QTS_BuildIsAsyncify", "number", [])),
            (this.QTS_NewFunction = this.module.cwrap("QTS_NewFunction", "number", [
              "number",
              "number",
              "string",
            ])),
            (this.QTS_ArgvGetJSValueConstPointer = this.module.cwrap(
              "QTS_ArgvGetJSValueConstPointer",
              "number",
              ["number", "number"],
            )),
            (this.QTS_RuntimeEnableInterruptHandler = this.module.cwrap(
              "QTS_RuntimeEnableInterruptHandler",
              null,
              ["number"],
            )),
            (this.QTS_RuntimeDisableInterruptHandler = this.module.cwrap(
              "QTS_RuntimeDisableInterruptHandler",
              null,
              ["number"],
            )),
            (this.QTS_RuntimeEnableModuleLoader = this.module.cwrap(
              "QTS_RuntimeEnableModuleLoader",
              null,
              ["number", "number"],
            )),
            (this.QTS_RuntimeDisableModuleLoader = this.module.cwrap(
              "QTS_RuntimeDisableModuleLoader",
              null,
              ["number"],
            )),
            (this.QTS_bjson_encode = this.module.cwrap("QTS_bjson_encode", "number", [
              "number",
              "number",
            ])),
            (this.QTS_bjson_decode = this.module.cwrap("QTS_bjson_decode", "number", [
              "number",
              "number",
            ]))
        }
      }
    })
  var So = {}
  Nr(So, { default: () => Va })
  var en,
    Ha,
    Va,
    po = ar(() => {
      "use strict"
      ;(en = {}),
        (Ha = (() => {
          var i = en.url
          return async function (l = {}) {
            var e = l,
              T,
              A
            e.ready = new Promise((c, _) => {
              ;(T = c), (A = _)
            })
            var N = Object.assign({}, e),
              x = "./this.program",
              H = (c, _) => {
                throw _
              },
              Y = typeof window == "object",
              Te = typeof importScripts == "function",
              ae =
                typeof process == "object" &&
                typeof process.versions == "object" &&
                typeof process.versions.node == "string",
              q = "",
              be,
              se,
              er
            if (ae) {
              let { createRequire: c } = await import("module")
              var Re = c(en.url),
                Pe = Re("fs"),
                ke = Re("path")
              Te ? (q = ke.dirname(q) + "/") : (q = Re("url").fileURLToPath(new URL("./", en.url))),
                (be = (_, S) => (
                  (_ = g(_) ? new URL(_) : ke.normalize(_)), Pe.readFileSync(_, S ? void 0 : "utf8")
                )),
                (er = (_) => ((_ = be(_, !0)), _.buffer || (_ = new Uint8Array(_)), _)),
                (se = (_, S, b, k = !0) => {
                  ;(_ = g(_) ? new URL(_) : ke.normalize(_)),
                    Pe.readFile(_, k ? void 0 : "utf8", (ne, ie) => {
                      ne ? b(ne) : S(k ? ie.buffer : ie)
                    })
                }),
                !e.thisProgram &&
                  1 < process.argv.length &&
                  (x = process.argv[1].replace(/\\/g, "/")),
                process.argv.slice(2),
                (H = (_, S) => {
                  throw ((process.exitCode = _), S)
                }),
                (e.inspect = () => "[Emscripten Module object]")
            } else
              (Y || Te) &&
                (Te
                  ? (q = self.location.href)
                  : typeof document < "u" &&
                    document.currentScript &&
                    (q = document.currentScript.src),
                i && (q = i),
                q.indexOf("blob:") !== 0
                  ? (q = q.substr(0, q.replace(/[?#].*/, "").lastIndexOf("/") + 1))
                  : (q = ""),
                (be = (c) => {
                  var _ = new XMLHttpRequest()
                  return _.open("GET", c, !1), _.send(null), _.responseText
                }),
                Te &&
                  (er = (c) => {
                    var _ = new XMLHttpRequest()
                    return (
                      _.open("GET", c, !1),
                      (_.responseType = "arraybuffer"),
                      _.send(null),
                      new Uint8Array(_.response)
                    )
                  }),
                (se = (c, _, S) => {
                  var b = new XMLHttpRequest()
                  b.open("GET", c, !0),
                    (b.responseType = "arraybuffer"),
                    (b.onload = () => {
                      b.status == 200 || (b.status == 0 && b.response) ? _(b.response) : S()
                    }),
                    (b.onerror = S),
                    b.send(null)
                }))
            var $e = e.print || console.log.bind(console),
              he = e.printErr || console.error.bind(console)
            Object.assign(e, N),
              (N = null),
              e.thisProgram && (x = e.thisProgram),
              e.quit && (H = e.quit)
            var lr
            e.wasmBinary && (lr = e.wasmBinary),
              typeof WebAssembly != "object" && ue("no native wasm support detected")
            var Ie,
              Me = !1,
              _e,
              de,
              I,
              Ne,
              xe
            function Wr() {
              var c = Ie.buffer
              ;(e.HEAP8 = de = new Int8Array(c)),
                (e.HEAP16 = new Int16Array(c)),
                (e.HEAPU8 = I = new Uint8Array(c)),
                (e.HEAPU16 = new Uint16Array(c)),
                (e.HEAP32 = Ne = new Int32Array(c)),
                (e.HEAPU32 = xe = new Uint32Array(c)),
                (e.HEAPF32 = new Float32Array(c)),
                (e.HEAPF64 = new Float64Array(c))
            }
            var $r = [],
              it = [],
              ur = []
            function Yr() {
              var c = e.preRun.shift()
              $r.unshift(c)
            }
            var Be = 0,
              ge = null,
              Qe = null
            function ue(c) {
              throw (
                (e.onAbort && e.onAbort(c),
                (c = "Aborted(" + c + ")"),
                he(c),
                (Me = !0),
                (_e = 1),
                (c = new WebAssembly.RuntimeError(c + ". Build with -sASSERTIONS for more info.")),
                A(c),
                c)
              )
            }
            var De = (c) => c.startsWith("data:application/octet-stream;base64,"),
              g = (c) => c.startsWith("file://"),
              cr
            if (e.locateFile) {
              if (((cr = "emscripten-module.wasm"), !De(cr))) {
                var Se = cr
                cr = e.locateFile ? e.locateFile(Se, q) : q + Se
              }
            } else cr = new URL("emscripten-module.wasm", en.url).href
            function Ee(c) {
              if (c == cr && lr) return new Uint8Array(lr)
              if (er) return er(c)
              throw "both async and sync fetching of the wasm failed"
            }
            function Sr(c) {
              if (!lr && (Y || Te)) {
                if (typeof fetch == "function" && !g(c))
                  return fetch(c, { credentials: "same-origin" })
                    .then((_) => {
                      if (!_.ok) throw "failed to load wasm binary file at '" + c + "'"
                      return _.arrayBuffer()
                    })
                    .catch(() => Ee(c))
                if (se)
                  return new Promise((_, S) => {
                    se(c, (b) => _(new Uint8Array(b)), S)
                  })
              }
              return Promise.resolve().then(() => Ee(c))
            }
            function Ar(c, _, S) {
              return Sr(c)
                .then((b) => WebAssembly.instantiate(b, _))
                .then((b) => b)
                .then(S, (b) => {
                  he(`failed to asynchronously prepare wasm: ${b}`), ue(b)
                })
            }
            function G(c, _) {
              var S = cr
              return lr ||
                typeof WebAssembly.instantiateStreaming != "function" ||
                De(S) ||
                g(S) ||
                ae ||
                typeof fetch != "function"
                ? Ar(S, c, _)
                : fetch(S, { credentials: "same-origin" }).then((b) =>
                    WebAssembly.instantiateStreaming(b, c).then(_, function (k) {
                      return (
                        he(`wasm streaming compile failed: ${k}`),
                        he("falling back to ArrayBuffer instantiation"),
                        Ar(S, c, _)
                      )
                    }),
                  )
            }
            function B(c) {
              ;(this.name = "ExitStatus"),
                (this.message = `Program terminated with exit(${c})`),
                (this.status = c)
            }
            var rr = (c) => {
                for (; 0 < c.length; ) c.shift()(e)
              },
              dr = e.noExitRuntime || !0,
              mr = typeof TextDecoder < "u" ? new TextDecoder("utf8") : void 0,
              je = (c, _, S) => {
                var b = _ + S
                for (S = _; c[S] && !(S >= b); ) ++S
                if (16 < S - _ && c.buffer && mr) return mr.decode(c.subarray(_, S))
                for (b = ""; _ < S; ) {
                  var k = c[_++]
                  if (k & 128) {
                    var ne = c[_++] & 63
                    if ((k & 224) == 192) b += String.fromCharCode(((k & 31) << 6) | ne)
                    else {
                      var ie = c[_++] & 63
                      ;(k =
                        (k & 240) == 224
                          ? ((k & 15) << 12) | (ne << 6) | ie
                          : ((k & 7) << 18) | (ne << 12) | (ie << 6) | (c[_++] & 63)),
                        65536 > k
                          ? (b += String.fromCharCode(k))
                          : ((k -= 65536),
                            (b += String.fromCharCode(55296 | (k >> 10), 56320 | (k & 1023))))
                    }
                  } else b += String.fromCharCode(k)
                }
                return b
              },
              Ye = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335],
              pr = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
              _r = (c) => {
                for (var _ = 0, S = 0; S < c.length; ++S) {
                  var b = c.charCodeAt(S)
                  127 >= b
                    ? _++
                    : 2047 >= b
                      ? (_ += 2)
                      : 55296 <= b && 57343 >= b
                        ? ((_ += 4), ++S)
                        : (_ += 3)
                }
                return _
              },
              Tr = (c, _, S) => {
                var b = I
                if (!(0 < S)) return 0
                var k = _
                S = _ + S - 1
                for (var ne = 0; ne < c.length; ++ne) {
                  var ie = c.charCodeAt(ne)
                  if (55296 <= ie && 57343 >= ie) {
                    var ve = c.charCodeAt(++ne)
                    ie = (65536 + ((ie & 1023) << 10)) | (ve & 1023)
                  }
                  if (127 >= ie) {
                    if (_ >= S) break
                    b[_++] = ie
                  } else {
                    if (2047 >= ie) {
                      if (_ + 1 >= S) break
                      b[_++] = 192 | (ie >> 6)
                    } else {
                      if (65535 >= ie) {
                        if (_ + 2 >= S) break
                        b[_++] = 224 | (ie >> 12)
                      } else {
                        if (_ + 3 >= S) break
                        ;(b[_++] = 240 | (ie >> 18)), (b[_++] = 128 | ((ie >> 12) & 63))
                      }
                      b[_++] = 128 | ((ie >> 6) & 63)
                    }
                    b[_++] = 128 | (ie & 63)
                  }
                }
                return (b[_] = 0), _ - k
              },
              Cr = (c) => {
                var _ = _r(c) + 1,
                  S = Br(_)
                return S && Tr(c, S, _), S
              },
              tr = {},
              Rr = () => {
                if (!M) {
                  var c = {
                      USER: "web_user",
                      LOGNAME: "web_user",
                      PATH: "/",
                      PWD: "/",
                      HOME: "/home/web_user",
                      LANG:
                        (
                          (typeof navigator == "object" &&
                            navigator.languages &&
                            navigator.languages[0]) ||
                          "C"
                        ).replace("-", "_") + ".UTF-8",
                      _: x || "./this.program",
                    },
                    _
                  for (_ in tr) tr[_] === void 0 ? delete c[_] : (c[_] = tr[_])
                  var S = []
                  for (_ in c) S.push(`${_}=${c[_]}`)
                  M = S
                }
                return M
              },
              M,
              Ur = [null, [], []],
              Pr = (c) => {
                try {
                  c()
                } catch (_) {
                  ue(_)
                }
              },
              vr = 0
            function Gr() {
              var c = P,
                _ = {},
                S
              for (S in c)
                (function (b) {
                  var k = c[b]
                  _[b] =
                    typeof k == "function"
                      ? function () {
                          w.push(b)
                          try {
                            return k.apply(null, arguments)
                          } finally {
                            Me ||
                              (w.pop(),
                              d &&
                                Oe === 1 &&
                                w.length === 0 &&
                                ((Oe = 0), Pr(qe), typeof Fibers < "u" && Fibers.Ga()))
                          }
                        }
                      : k
                })(S)
              return _
            }
            var Oe = 0,
              He = 81920,
              d = null,
              f = 0,
              w = [],
              F = {},
              O = {},
              re = 0,
              L = null,
              oe = []
            function te() {
              return new Promise((c, _) => {
                L = { resolve: c, reject: _ }
              })
            }
            function pe() {
              var c = Br(12 + He),
                _ = c + 12,
                S = He
              return (
                (xe[c >> 2] = _),
                (xe[(c + 4) >> 2] = _ + S),
                (_ = w[0]),
                (S = F[_]),
                S === void 0 && ((S = re++), (F[_] = S), (O[S] = _)),
                (Ne[(c + 8) >> 2] = S),
                c
              )
            }
            function me(c) {
              if (!Me) {
                if (Oe === 0) {
                  var _ = !1,
                    S = !1
                  c((b = 0) => {
                    if (!Me && ((f = b), (_ = !0), S)) {
                      ;(Oe = 2),
                        Pr(() => yr(d)),
                        typeof Browser < "u" && Browser.xa.Fa && Browser.xa.resume(),
                        (b = !1)
                      try {
                        var k = (0, P[O[Ne[(d + 8) >> 2]]])()
                      } catch (ve) {
                        ;(k = ve), (b = !0)
                      }
                      var ne = !1
                      if (!d) {
                        var ie = L
                        ie && ((L = null), (b ? ie.reject : ie.resolve)(k), (ne = !0))
                      }
                      if (b && !ne) throw k
                    }
                  }),
                    (S = !0),
                    _ ||
                      ((Oe = 1),
                      (d = pe()),
                      typeof Browser < "u" && Browser.xa.Fa && Browser.xa.pause(),
                      Pr(() => ot(d)))
                } else
                  Oe === 2
                    ? ((Oe = 0),
                      Pr(fr),
                      qr(d),
                      (d = null),
                      oe.forEach((b) => {
                        if (!Me)
                          try {
                            if ((b(), !(dr || 0 < vr)))
                              try {
                                ;(_e = _e = b = _e),
                                  dr || 0 < vr || (e.onExit && e.onExit(b), (Me = !0)),
                                  H(b, new B(b))
                              } catch (k) {
                                k instanceof B || k == "unwind" || H(1, k)
                              }
                          } catch (k) {
                            k instanceof B || k == "unwind" || H(1, k)
                          }
                      }))
                    : ue(`invalid state: ${Oe}`)
                return f
              }
            }
            var Q = (c, _, S, b, k) => {
                function ne(we) {
                  return (
                    --vr,
                    Fe !== 0 && Vr(Fe),
                    _ === "string" ? (we ? je(I, we) : "") : _ === "boolean" ? !!we : we
                  )
                }
                var ie = {
                  string: (we) => {
                    var wr = 0
                    if (we != null && we !== 0) {
                      wr = _r(we) + 1
                      var ze = xr(wr)
                      Tr(we, ze, wr), (wr = ze)
                    }
                    return wr
                  },
                  array: (we) => {
                    var wr = xr(we.length)
                    return de.set(we, wr), wr
                  },
                }
                c = e["_" + c]
                var ve = [],
                  Fe = 0
                if (b)
                  for (var Ve = 0; Ve < b.length; Ve++) {
                    var Ir = ie[S[Ve]]
                    Ir ? (Fe === 0 && (Fe = Hr()), (ve[Ve] = Ir(b[Ve]))) : (ve[Ve] = b[Ve])
                  }
                return (
                  (S = d),
                  (b = c.apply(null, ve)),
                  (k = k && k.async),
                  (vr += 1),
                  d != S ? te().then(ne) : ((b = ne(b)), k ? Promise.resolve(b) : b)
                )
              },
              E = {
                a: (c, _, S, b) => {
                  ue(
                    `Assertion failed: ${c ? je(I, c) : ""}, at: ` +
                      [
                        _ ? (_ ? je(I, _) : "") : "unknown filename",
                        S,
                        b ? (b ? je(I, b) : "") : "unknown function",
                      ],
                  )
                },
                i: function (c, _, S) {
                  ;(c = new Date(
                    1e3 * ((_ + 2097152) >>> 0 < 4194305 - !!c ? (c >>> 0) + 4294967296 * _ : NaN),
                  )),
                    (Ne[S >> 2] = c.getSeconds()),
                    (Ne[(S + 4) >> 2] = c.getMinutes()),
                    (Ne[(S + 8) >> 2] = c.getHours()),
                    (Ne[(S + 12) >> 2] = c.getDate()),
                    (Ne[(S + 16) >> 2] = c.getMonth()),
                    (Ne[(S + 20) >> 2] = c.getFullYear() - 1900),
                    (Ne[(S + 24) >> 2] = c.getDay()),
                    (_ = c.getFullYear()),
                    (Ne[(S + 28) >> 2] =
                      ((_ % 4 !== 0 || (_ % 100 === 0 && _ % 400 !== 0) ? pr : Ye)[c.getMonth()] +
                        c.getDate() -
                        1) |
                      0),
                    (Ne[(S + 36) >> 2] = -(60 * c.getTimezoneOffset())),
                    (_ = new Date(c.getFullYear(), 6, 1).getTimezoneOffset())
                  var b = new Date(c.getFullYear(), 0, 1).getTimezoneOffset()
                  Ne[(S + 32) >> 2] = (_ != b && c.getTimezoneOffset() == Math.min(b, _)) | 0
                },
                l: (c, _, S) => {
                  function b(Fe) {
                    return (Fe = Fe.toTimeString().match(/\(([A-Za-z ]+)\)$/)) ? Fe[1] : "GMT"
                  }
                  var k = new Date().getFullYear(),
                    ne = new Date(k, 0, 1),
                    ie = new Date(k, 6, 1)
                  k = ne.getTimezoneOffset()
                  var ve = ie.getTimezoneOffset()
                  ;(xe[c >> 2] = 60 * Math.max(k, ve)),
                    (Ne[_ >> 2] = +(k != ve)),
                    (c = b(ne)),
                    (_ = b(ie)),
                    (c = Cr(c)),
                    (_ = Cr(_)),
                    ve < k
                      ? ((xe[S >> 2] = c), (xe[(S + 4) >> 2] = _))
                      : ((xe[S >> 2] = _), (xe[(S + 4) >> 2] = c))
                },
                b: () => {
                  ue("")
                },
                m: () => Date.now(),
                k: (c) => {
                  var _ = I.length
                  if (((c >>>= 0), 2147483648 < c)) return !1
                  for (var S = 1; 4 >= S; S *= 2) {
                    var b = _ * (1 + 0.2 / S)
                    b = Math.min(b, c + 100663296)
                    var k = Math
                    b = Math.max(c, b)
                    e: {
                      k =
                        (k.min.call(k, 2147483648, b + ((65536 - (b % 65536)) % 65536)) -
                          Ie.buffer.byteLength +
                          65535) /
                        65536
                      try {
                        Ie.grow(k), Wr()
                        var ne = 1
                        break e
                      } catch {}
                      ne = void 0
                    }
                    if (ne) return !0
                  }
                  return !1
                },
                d: (c, _) => {
                  var S = 0
                  return (
                    Rr().forEach((b, k) => {
                      var ne = _ + S
                      for (k = xe[(c + 4 * k) >> 2] = ne, ne = 0; ne < b.length; ++ne)
                        de[k++ >> 0] = b.charCodeAt(ne)
                      ;(de[k >> 0] = 0), (S += b.length + 1)
                    }),
                    0
                  )
                },
                e: (c, _) => {
                  var S = Rr()
                  xe[c >> 2] = S.length
                  var b = 0
                  return S.forEach((k) => (b += k.length + 1)), (xe[_ >> 2] = b), 0
                },
                c: () => 52,
                j: function () {
                  return 70
                },
                n: (c, _, S, b) => {
                  for (var k = 0, ne = 0; ne < S; ne++) {
                    var ie = xe[_ >> 2],
                      ve = xe[(_ + 4) >> 2]
                    _ += 8
                    for (var Fe = 0; Fe < ve; Fe++) {
                      var Ve = I[ie + Fe],
                        Ir = Ur[c]
                      Ve === 0 || Ve === 10
                        ? ((c === 1 ? $e : he)(je(Ir, 0)), (Ir.length = 0))
                        : Ir.push(Ve)
                    }
                    k += ve
                  }
                  return (xe[b >> 2] = k), 0
                },
                o: function (c, _, S, b, k) {
                  return e.callbacks.callFunction({ handleSleep: me }, c, _, S, b, k)
                },
                h: function (c) {
                  return e.callbacks.shouldInterrupt(void 0, c)
                },
                g: function (c, _, S) {
                  let b = { handleSleep: me }
                  return (S = S ? je(I, S) : ""), e.callbacks.loadModuleSource(b, c, _, S)
                },
                f: function (c, _, S, b) {
                  let k = { handleSleep: me }
                  return (
                    (S = S ? je(I, S) : ""),
                    (b = b ? je(I, b) : ""),
                    e.callbacks.normalizeModule(k, c, _, S, b)
                  )
                },
                p: function (c, _) {
                  He = c || _
                },
              },
              P = (function () {
                function c(S) {
                  return (
                    (P = S.exports),
                    (P = Gr()),
                    (Ie = P.q),
                    Wr(),
                    it.unshift(P.r),
                    Be--,
                    e.monitorRunDependencies && e.monitorRunDependencies(Be),
                    Be == 0 &&
                      (ge !== null && (clearInterval(ge), (ge = null)),
                      Qe && ((S = Qe), (Qe = null), S())),
                    P
                  )
                }
                var _ = { a: E }
                if (
                  (Be++,
                  e.monitorRunDependencies && e.monitorRunDependencies(Be),
                  e.instantiateWasm)
                )
                  try {
                    return e.instantiateWasm(_, c)
                  } catch (S) {
                    he(`Module.instantiateWasm callback failed with error: ${S}`), A(S)
                  }
                return (
                  G(_, function (S) {
                    c(S.instance)
                  }).catch(A),
                  {}
                )
              })(),
              Br = (e._malloc = (c) => (Br = e._malloc = P.s)(c))
            ;(e._QTS_Throw = (c, _) => (e._QTS_Throw = P.t)(c, _)),
              (e._QTS_NewError = (c) => (e._QTS_NewError = P.u)(c)),
              (e._QTS_RuntimeSetMemoryLimit = (c, _) => (e._QTS_RuntimeSetMemoryLimit = P.v)(c, _)),
              (e._QTS_RuntimeComputeMemoryUsage = (c, _) =>
                (e._QTS_RuntimeComputeMemoryUsage = P.w)(c, _)),
              (e._QTS_RuntimeDumpMemoryUsage = (c) => (e._QTS_RuntimeDumpMemoryUsage = P.x)(c)),
              (e._QTS_RecoverableLeakCheck = () => (e._QTS_RecoverableLeakCheck = P.y)()),
              (e._QTS_BuildIsSanitizeLeak = () => (e._QTS_BuildIsSanitizeLeak = P.z)()),
              (e._QTS_RuntimeSetMaxStackSize = (c, _) =>
                (e._QTS_RuntimeSetMaxStackSize = P.A)(c, _)),
              (e._QTS_GetUndefined = () => (e._QTS_GetUndefined = P.B)()),
              (e._QTS_GetNull = () => (e._QTS_GetNull = P.C)()),
              (e._QTS_GetFalse = () => (e._QTS_GetFalse = P.D)()),
              (e._QTS_GetTrue = () => (e._QTS_GetTrue = P.E)()),
              (e._QTS_NewRuntime = () => (e._QTS_NewRuntime = P.F)()),
              (e._QTS_FreeRuntime = (c) => (e._QTS_FreeRuntime = P.G)(c)),
              (e._QTS_NewContext = (c) => (e._QTS_NewContext = P.H)(c)),
              (e._QTS_FreeContext = (c) => (e._QTS_FreeContext = P.I)(c)),
              (e._QTS_FreeValuePointer = (c, _) => (e._QTS_FreeValuePointer = P.J)(c, _))
            var qr = (e._free = (c) => (qr = e._free = P.K)(c))
            ;(e._QTS_FreeValuePointerRuntime = (c, _) =>
              (e._QTS_FreeValuePointerRuntime = P.L)(c, _)),
              (e._QTS_FreeVoidPointer = (c, _) => (e._QTS_FreeVoidPointer = P.M)(c, _)),
              (e._QTS_FreeCString = (c, _) => (e._QTS_FreeCString = P.N)(c, _)),
              (e._QTS_DupValuePointer = (c, _) => (e._QTS_DupValuePointer = P.O)(c, _)),
              (e._QTS_NewObject = (c) => (e._QTS_NewObject = P.P)(c)),
              (e._QTS_NewObjectProto = (c, _) => (e._QTS_NewObjectProto = P.Q)(c, _)),
              (e._QTS_NewArray = (c) => (e._QTS_NewArray = P.R)(c)),
              (e._QTS_NewArrayBuffer = (c, _, S) => (e._QTS_NewArrayBuffer = P.S)(c, _, S)),
              (e._QTS_NewFloat64 = (c, _) => (e._QTS_NewFloat64 = P.T)(c, _)),
              (e._QTS_GetFloat64 = (c, _) => (e._QTS_GetFloat64 = P.U)(c, _)),
              (e._QTS_NewString = (c, _) => (e._QTS_NewString = P.V)(c, _)),
              (e._QTS_GetString = (c, _) => (e._QTS_GetString = P.W)(c, _)),
              (e._QTS_GetArrayBuffer = (c, _) => (e._QTS_GetArrayBuffer = P.X)(c, _)),
              (e._QTS_GetArrayBufferLength = (c, _) => (e._QTS_GetArrayBufferLength = P.Y)(c, _)),
              (e._QTS_NewSymbol = (c, _, S) => (e._QTS_NewSymbol = P.Z)(c, _, S)),
              (e._QTS_GetSymbolDescriptionOrKey = (c, _) =>
                (e._QTS_GetSymbolDescriptionOrKey = P._)(c, _)),
              (e._QTS_IsGlobalSymbol = (c, _) => (e._QTS_IsGlobalSymbol = P.$)(c, _)),
              (e._QTS_IsJobPending = (c) => (e._QTS_IsJobPending = P.aa)(c)),
              (e._QTS_ExecutePendingJob = (c, _, S) => (e._QTS_ExecutePendingJob = P.ba)(c, _, S)),
              (e._QTS_GetProp = (c, _, S) => (e._QTS_GetProp = P.ca)(c, _, S)),
              (e._QTS_SetProp = (c, _, S, b) => (e._QTS_SetProp = P.da)(c, _, S, b)),
              (e._QTS_DefineProp = (c, _, S, b, k, ne, ie, ve, Fe) =>
                (e._QTS_DefineProp = P.ea)(c, _, S, b, k, ne, ie, ve, Fe)),
              (e._QTS_Call = (c, _, S, b, k) => (e._QTS_Call = P.fa)(c, _, S, b, k)),
              (e._QTS_ResolveException = (c, _) => (e._QTS_ResolveException = P.ga)(c, _)),
              (e._QTS_Dump = (c, _) => (e._QTS_Dump = P.ha)(c, _)),
              (e._QTS_Eval = (c, _, S, b, k) => (e._QTS_Eval = P.ia)(c, _, S, b, k)),
              (e._QTS_Typeof = (c, _) => (e._QTS_Typeof = P.ja)(c, _)),
              (e._QTS_GetGlobalObject = (c) => (e._QTS_GetGlobalObject = P.ka)(c)),
              (e._QTS_NewPromiseCapability = (c, _) => (e._QTS_NewPromiseCapability = P.la)(c, _)),
              (e._QTS_TestStringArg = (c) => (e._QTS_TestStringArg = P.ma)(c)),
              (e._QTS_BuildIsDebug = () => (e._QTS_BuildIsDebug = P.na)()),
              (e._QTS_BuildIsAsyncify = () => (e._QTS_BuildIsAsyncify = P.oa)()),
              (e._QTS_NewFunction = (c, _, S) => (e._QTS_NewFunction = P.pa)(c, _, S)),
              (e._QTS_ArgvGetJSValueConstPointer = (c, _) =>
                (e._QTS_ArgvGetJSValueConstPointer = P.qa)(c, _)),
              (e._QTS_RuntimeEnableInterruptHandler = (c) =>
                (e._QTS_RuntimeEnableInterruptHandler = P.ra)(c)),
              (e._QTS_RuntimeDisableInterruptHandler = (c) =>
                (e._QTS_RuntimeDisableInterruptHandler = P.sa)(c)),
              (e._QTS_RuntimeEnableModuleLoader = (c, _) =>
                (e._QTS_RuntimeEnableModuleLoader = P.ta)(c, _)),
              (e._QTS_RuntimeDisableModuleLoader = (c) =>
                (e._QTS_RuntimeDisableModuleLoader = P.ua)(c)),
              (e._QTS_bjson_encode = (c, _) => (e._QTS_bjson_encode = P.va)(c, _)),
              (e._QTS_bjson_decode = (c, _) => (e._QTS_bjson_decode = P.wa)(c, _))
            var Hr = () => (Hr = P.ya)(),
              Vr = (c) => (Vr = P.za)(c),
              xr = (c) => (xr = P.Aa)(c),
              ot = (c) => (ot = P.Ba)(c),
              qe = () => (qe = P.Ca)(),
              yr = (c) => (yr = P.Da)(c),
              fr = () => (fr = P.Ea)()
            ;(e.___start_em_js = 76484),
              (e.___stop_em_js = 77564),
              (e.cwrap = (c, _, S, b) => {
                var k = !S || S.every((ne) => ne === "number" || ne === "boolean")
                return _ !== "string" && k && !b
                  ? e["_" + c]
                  : function () {
                      return Q(c, _, S, arguments, b)
                    }
              }),
              (e.UTF8ToString = (c, _) => (c ? je(I, c, _) : "")),
              (e.stringToUTF8 = (c, _, S) => Tr(c, _, S)),
              (e.lengthBytesUTF8 = _r)
            var Dr
            Qe = function c() {
              Dr || Kr(), Dr || (Qe = c)
            }
            function Kr() {
              function c() {
                if (!Dr && ((Dr = !0), (e.calledRun = !0), !Me)) {
                  if ((rr(it), T(e), e.onRuntimeInitialized && e.onRuntimeInitialized(), e.postRun))
                    for (
                      typeof e.postRun == "function" && (e.postRun = [e.postRun]);
                      e.postRun.length;

                    ) {
                      var _ = e.postRun.shift()
                      ur.unshift(_)
                    }
                  rr(ur)
                }
              }
              if (!(0 < Be)) {
                if (e.preRun)
                  for (typeof e.preRun == "function" && (e.preRun = [e.preRun]); e.preRun.length; )
                    Yr()
                rr($r),
                  0 < Be ||
                    (e.setStatus
                      ? (e.setStatus("Running..."),
                        setTimeout(function () {
                          setTimeout(function () {
                            e.setStatus("")
                          }, 1),
                            c()
                        }, 1))
                      : c())
              }
            }
            if (e.preInit)
              for (
                typeof e.preInit == "function" && (e.preInit = [e.preInit]);
                0 < e.preInit.length;

              )
                e.preInit.pop()()
            return Kr(), l.ready
          }
        })()),
        (Va = Ha)
    })
  Gn()
  qt()
  Mt()
  async function Xi(i) {
    let l = pt(await i),
      [e, T, { QuickJSWASMModule: A }] = await Promise.all([
        l.importModuleLoader().then(pt),
        l.importFFI(),
        Promise.resolve()
          .then(() => (Yi(), $i))
          .then(pt),
      ]),
      N = await e()
    N.type = "sync"
    let x = new T(N)
    return new A(N, x)
  }
  async function Zi(i) {
    let l = pt(await i),
      [e, T, { QuickJSAsyncWASMModule: A }] = await Promise.all([
        l.importModuleLoader().then(pt),
        l.importFFI(),
        Promise.resolve()
          .then(() => (Ki(), qi))
          .then(pt),
      ]),
      N = await e()
    N.type = "async"
    let x = new T(N)
    return new A(N, x)
  }
  function Us(i) {
    let l
    return () => l ?? (l = i())
  }
  function pt(i) {
    return "default" in i ? ("default" in i.default ? i.default.default : i.default) : i
  }
  function Gs(i) {
    return !("error" in i)
  }
  function Bs(i) {
    return "error" in i
  }
  function Hs(i) {
    let l = typeof i == "number" ? i : i.getTime()
    return function () {
      return Date.now() > l
    }
  }
  var Vs = class {
    constructor(i) {
      ;(this.parent = i), (this.contexts = new Set()), (this.runtimes = new Set())
    }
    newRuntime(i) {
      let l = this.parent.newRuntime({
        ...i,
        ownedLifetimes: [
          new Ce(void 0, void 0, () => this.runtimes.delete(l)),
          ...(i?.ownedLifetimes ?? []),
        ],
      })
      return this.runtimes.add(l), l
    }
    newContext(i) {
      let l = this.parent.newContext({
        ...i,
        ownedLifetimes: [
          new Ce(void 0, void 0, () => this.contexts.delete(l)),
          ...(i?.ownedLifetimes ?? []),
        ],
      })
      return this.contexts.add(l), l
    }
    evalCode(i, l) {
      return this.parent.evalCode(i, l)
    }
    disposeAll() {
      let i = [...this.contexts, ...this.runtimes]
      this.runtimes.clear(),
        this.contexts.clear(),
        i.forEach((l) => {
          l.alive && l.dispose()
        })
    }
    assertNoMemoryAllocated() {
      if (this.getFFI().QTS_RecoverableLeakCheck())
        throw new Nt("Leak sanitizer detected un-freed memory")
      if (this.contexts.size > 0) throw new Nt(`${this.contexts.size} contexts leaked`)
      if (this.runtimes.size > 0) throw new Nt(`${this.runtimes.size} runtimes leaked`)
    }
    getFFI() {
      return this.parent.getFFI()
    }
  }
  var ka = {
      type: "sync",
      importFFI: () =>
        Promise.resolve()
          .then(() => (ro(), eo))
          .then((i) => i.QuickJSFFI),
      importModuleLoader: () =>
        Promise.resolve()
          .then(() => (no(), to))
          .then((i) => i.default),
    },
    Ma = ka
  var Ia = {
      type: "sync",
      importFFI: () =>
        Promise.resolve()
          .then(() => (oo(), io))
          .then((i) => i.QuickJSFFI),
      importModuleLoader: () =>
        Promise.resolve()
          .then(() => (so(), ao))
          .then((i) => i.default),
    },
    lo = Ia
  var Ua = {
      type: "async",
      importFFI: () =>
        Promise.resolve()
          .then(() => (co(), uo))
          .then((i) => i.QuickJSAsyncFFI),
      importModuleLoader: () =>
        Promise.resolve()
          .then(() => (_o(), mo))
          .then((i) => i.default),
    },
    Ga = Ua
  var za = {
      type: "async",
      importFFI: () =>
        Promise.resolve()
          .then(() => (ho(), fo))
          .then((i) => i.QuickJSAsyncFFI),
      importModuleLoader: () =>
        Promise.resolve()
          .then(() => (po(), So))
          .then((i) => i.default),
    },
    To = za
  async function vo(i = lo) {
    return Xi(i)
  }
  async function Bn(i = To) {
    return Zi(i)
  }
  var Hn, yo
  async function dl() {
    return yo ?? (yo = vo().then((i) => ((Hn = i), i))), await yo
  }
  function ml() {
    if (!Hn) throw new Error("QuickJS not initialized. Await getQuickJS() at least once.")
    return Hn
  }
  async function _l(i) {
    return (await Bn()).newRuntime(i)
  }
  async function fl(i) {
    return (await Bn()).newContext(i)
  }
})()
//# sourceMappingURL=index.global.js.map
