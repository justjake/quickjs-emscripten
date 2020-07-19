/**
 * These tests demonstate some common patterns for using quickjs-emscripten.
 */

import { getQuickJS, QuickJSVm, QuickJSHandle, ShouldInterruptHandler, Lifetime } from './quickjs'
import { it, describe } from 'mocha'
import assert from 'assert'
import { VmCallResult } from './vm-interface'
import { Success } from './result'

interface Spy<T> {
  (val?: T): number
  calls: number
  lastCall?: T
}

function spy<T>(): Spy<T> {
  const spy: Spy<T> = Object.assign(
    (val?: T) => {
      spy.lastCall = val
      return ++spy.calls
    },
    { calls: 0 }
  )
  return spy
}

describe('Lifetime', () => {
  let disposer: Spy<any> = undefined as any
  let value: Spy<any> = undefined as any
  let lifetime: Lifetime<Spy<any>> = undefined as any

  beforeEach(() => {
    disposer = spy()
    value = spy()
    lifetime = new Lifetime(value, disposer)
  })

  describe('.value', () => {
    it('returns the value', () => {
      assert.strictEqual(lifetime.value, value)
    })

    it('throws once dispose has been called', () => {
      lifetime.dispose()
      assert.throws(() => lifetime.value, /Lifetime not alive/)
    })
  })

  describe('.dispose', () => {
    it('calls the disposer with the value', () => {
      lifetime.dispose()
      assert.strictEqual(disposer.calls, 1, 'disposer was called')
      assert.strictEqual(disposer.lastCall, value, 'disposer was called with the value')
    })

    it('throws if called twice', () => {
      lifetime.dispose()
      assert.throws(() => lifetime.dispose(), /Lifetime not alive/)
    })
  })

  describe('.alive', () => {
    it('is false after being disposed', () => {
      assert.strictEqual(lifetime.alive, true)
      lifetime.dispose()
      assert.strictEqual(lifetime.alive, false)
    })
  })

  describe('.consume', () => {
    it('passes the value to the mapper func and returns the result', () => {
      const mapper = spy()
      const result = lifetime.consume(mapper)
      assert.strictEqual(result, 1, 'result of mapper')
      assert.strictEqual(mapper.lastCall, value, 'called with value')
    })

    it('is disposed afterwards', () => {
      lifetime.consume(spy())
      assert.strictEqual(lifetime.alive, false, 'lifetime was disposed')
      assert.strictEqual(disposer.calls, 1, 'disposer was called')
      assert.strictEqual(disposer.lastCall, value, 'disposer was called with the value')
    })
  })
})

describe('QuickJSVm', async () => {
  let vm: QuickJSVm = undefined as any

  beforeEach(async () => {
    const quickjs = await getQuickJS()
    vm = quickjs.createVm()
  })

  afterEach(async () => {
    vm.dispose()
    vm = undefined as any
  })

  describe('primitives', () => {
    it('can round-trip a number', () => {
      const jsNumber = 42
      const numHandle = vm.newNumber(jsNumber)
      assert.equal(vm.getNumber(numHandle), jsNumber)
    })

    it('can round-trip a string', () => {
      const jsString = 'an example 🤔 string with unicode 🎉'
      const stringHandle = vm.newString(jsString)
      assert.equal(vm.getString(stringHandle), jsString)
    })

    it('can round-trip undefined', () => {
      assert.strictEqual(vm.dump(vm.undefined), undefined)
    })

    it('can round-trip true', () => {
      assert.strictEqual(vm.dump(vm.true), true)
    })

    it('can round-trip false', () => {
      assert.strictEqual(vm.dump(vm.false), false)
    })

    it('can round-trip null', () => {
      assert.strictEqual(vm.dump(vm.null), null)
    })
  })

  describe('functions', () => {
    it('can wrap a Javascript function and call it', () => {
      const some = 9
      const fnHandle = vm.newFunction('addSome', num => {
        return vm.newNumber(some + vm.getNumber(num))
      })
      const result = vm.callFunction(fnHandle, vm.undefined, vm.newNumber(1))
      if (result.failure) {
        assert.fail('calling fnHandle must succeed')
      }
      assert.equal(vm.getNumber(result.value), 10)
      fnHandle.dispose()
    })

    it('passes through native exceptions', () => {
      const fnHandle = vm.newFunction('jsOops', () => {
        throw new Error('oops')
      })

      const result = vm.callFunction(fnHandle, vm.undefined)
      if (!result.failure) {
        assert.fail('function call must return error')
      }
      assert.deepEqual(vm.dump(result.failure), {
        name: 'Error',
        message: 'oops',
      })
      result.failure.dispose()
      fnHandle.dispose()
    })

    it('can return undefined twice', () => {
      const fnHandle = vm.newFunction('returnUndef', () => {
        return vm.undefined
      })

      vm.unwrapResult(vm.callFunction(fnHandle, vm.undefined)).dispose()
      const result = vm.unwrapResult(vm.callFunction(fnHandle, vm.undefined))

      assert.equal(vm.typeof(result), 'undefined')
      result.dispose()
      fnHandle.dispose()
    })
  })

  describe('properties', () => {
    it('defining a property does not leak', () => {
      vm.defineProp(vm.global, 'Name', {
        enumerable: false,
        configurable: false,
        get: () => vm.newString('World'),
      })
      const result = vm.unwrapResult(vm.evalCode('"Hello " + Name'))
      assert.equal(vm.dump(result), 'Hello World')
      result.dispose()
    })
  })

  describe('objects', () => {
    it('can set and get properties by native string', () => {
      const object = vm.newObject()
      const value = vm.newNumber(42)
      vm.setProp(object, 'propName', value)

      const value2 = vm.getProp(object, 'propName')
      assert.equal(vm.getNumber(value2), 42)

      object.dispose()
      value.dispose()
      value2.dispose()
    })

    it('can set and get properties by handle string', () => {
      const object = vm.newObject()
      const key = vm.newString('prop as a QuickJS string')
      const value = vm.newNumber(42)
      vm.setProp(object, key, value)

      const value2 = vm.getProp(object, key)
      assert.equal(vm.getNumber(value2), 42)

      object.dispose()
      key.dispose()
      value.dispose()
      value2.dispose()
    })

    it('can create objects with a prototype', () => {
      const defaultGreeting = vm.newString('SUP DAWG')
      const greeterPrototype = vm.newObject()
      vm.setProp(greeterPrototype, 'greeting', defaultGreeting)
      defaultGreeting.dispose()
      const greeter = vm.newObject(greeterPrototype)

      // Gets something from the prototype
      const getGreeting = vm.getProp(greeter, 'greeting')
      assert.equal(vm.getString(getGreeting), 'SUP DAWG')
      getGreeting.dispose()

      // But setting a property from the prototype does not modify the prototype
      const newGreeting = vm.newString('How do you do?')
      vm.setProp(greeter, 'greeting', newGreeting)
      newGreeting.dispose()

      const originalGreeting = vm.getProp(greeterPrototype, 'greeting')
      assert.equal(vm.getString(originalGreeting), 'SUP DAWG')
      originalGreeting.dispose()

      greeterPrototype.dispose()
      greeter.dispose()
    })
  })

  describe('arrays', () => {
    it('can set and get entries by native number', () => {
      const array = vm.newArray()
      const val1 = vm.newNumber(101)
      vm.setProp(array, 0, val1)

      const val2 = vm.getProp(array, 0)
      assert.strictEqual(vm.getNumber(val2), 101)

      array.dispose()
      val1.dispose()
      val2.dispose()
    })

    it('adding items sets array.length', () => {
      const vals = [vm.newNumber(0), vm.newNumber(1), vm.newString('cow')]
      const array = vm.newArray()
      for (let i = 0; i < vals.length; i++) {
        vm.setProp(array, i, vals[i])
      }

      const length = vm.getProp(array, 'length')
      assert.strictEqual(vm.getNumber(length), 3)

      array.dispose()
      vals.forEach(val => val.dispose())
    })
  })

  describe('.unwrapResult', () => {
    it('successful result: returns the value', () => {
      const handle = vm.newString('OK!')
      const result: VmCallResult<QuickJSHandle> = new Success(handle)
      assert.strictEqual(vm.unwrapResult(result), handle)
    })

    it('error result: throws the error as a Javascript value', () => {
      const result = vm.evalCode(`throw new Error('ERROR!')`)

      try {
        vm.unwrapResult(result)
        assert.fail('vm.unwrapResult(error) must throw')
      } catch (error) {
        assert.strictEqual(error.message, 'ERROR!')
        assert.strictEqual(error.name, 'Error')
        assert.strictEqual(error.quickjsStack, '    at <eval> (eval.js)\n')
      }
    })
  })

  describe('.evalCode', () => {
    it('on success: returns { value: success }', () => {
      const value = vm.unwrapResult(vm.evalCode(`["this", "should", "work"].join(' ')`))
      assert.equal(vm.getString(value), 'this should work')
      value.dispose()
    })

    it('on failure: returns { error: exception }', () => {
      const result = vm.evalCode(`["this", "should", "fail].join(' ')`)
      if (!result.failure) {
        assert.fail('result should be an error')
      }
      assert.deepEqual(vm.dump(result.failure), {
        name: 'SyntaxError',
        message: 'unexpected end of string',
        stack: '    at eval.js:1\n',
      })
      result.failure.dispose()
    })

    it('runs in the global context', () => {
      vm.unwrapResult(vm.evalCode(`var declaredWithEval = 'Nice!'`)).dispose()
      const declaredWithEval = vm.getProp(vm.global, 'declaredWithEval')
      assert.equal(vm.getString(declaredWithEval), 'Nice!')
      declaredWithEval.dispose()
    })

    it('can access assigned globals', () => {
      let i = 0
      const fnHandle = vm.newFunction('nextId', () => {
        return vm.newNumber(++i)
      })
      vm.setProp(vm.global, 'nextId', fnHandle)
      fnHandle.dispose()

      const nextId = vm.unwrapResult(vm.evalCode(`nextId(); nextId(); nextId()`))
      assert.equal(i, 3)
      assert.equal(vm.getNumber(nextId), 3)
    })

    it('can unwrap a success', () => {
      const result = vm.evalCode('3; 4; 5')
      const dumped = vm.dump(result.unwrap())
      result.unwrap().dispose()
      assert.strictEqual(dumped, 5)
    })

    it('can unwrap a failure', () => {
      assert.throws(() => vm.evalCode('what!').unwrap(), /SyntaxError: expecting ';'/)
    })
  })

  describe('.executePendingJobs', () => {
    it('runs pending jobs', () => {
      let i = 0
      const fnHandle = vm.newFunction('nextId', () => {
        return vm.newNumber(++i)
      })
      vm.setProp(vm.global, 'nextId', fnHandle)
      fnHandle.dispose()

      const result = vm.unwrapResult(
        vm.evalCode(`(new Promise(resolve => resolve())).then(nextId).then(nextId).then(nextId);1`)
      )
      assert.equal(i, 0)
      vm.executePendingJobs()
      assert.equal(i, 3)
      assert.equal(vm.getNumber(result), 1)
    })
  })

  describe('.hasPendingJob', () => {
    it('returns true when job pending', () => {
      let i = 0
      const fnHandle = vm.newFunction('nextId', () => {
        return vm.newNumber(++i)
      })
      vm.setProp(vm.global, 'nextId', fnHandle)
      fnHandle.dispose()

      vm.unwrapResult(vm.evalCode(`(new Promise(resolve => resolve(5)).then(nextId));1`)).dispose()
      assert.strictEqual(vm.hasPendingJob(), true, 'has a pending job after creating a promise')

      const executed = vm.unwrapResult(vm.executePendingJobs())
      assert.strictEqual(executed, 1, 'executed exactly 1 job')

      assert.strictEqual(vm.hasPendingJob(), false, 'no longer any jobs after execution')
    })
  })

  describe('.dump', () => {
    function dumpTestExample(val: unknown) {
      const json = typeof val === 'undefined' ? 'undefined' : JSON.stringify(val)
      const nativeType = typeof val
      it(`supports ${nativeType} (${json})`, () => {
        const handle = vm.unwrapResult(vm.evalCode(`(${json})`))
        assert.deepEqual(vm.dump(handle), val)
        handle.dispose()
      })
    }
    dumpTestExample(1)
    dumpTestExample('hi')
    dumpTestExample(true)
    dumpTestExample(false)
    dumpTestExample(undefined)
    dumpTestExample(null)
    dumpTestExample({ cow: true })
    dumpTestExample([1, 2, 3])
  })

  describe('.typeof', () => {
    function typeofTestExample(val: unknown, toCode = JSON.stringify) {
      const json = toCode(val)
      const nativeType = typeof val
      it(`supports ${nativeType} (${json})`, () => {
        const handle = vm.unwrapResult(vm.evalCode(`(${json})`))
        assert.equal(vm.typeof(handle), nativeType)
        handle.dispose()
      })
    }

    typeofTestExample(1)
    typeofTestExample('hi')
    typeofTestExample(true)
    typeofTestExample(false)
    typeofTestExample(undefined)
    typeofTestExample(null)
    typeofTestExample({ cow: true })
    typeofTestExample([1, 2, 3])
    typeofTestExample(
      function() {},
      (val: any) => val.toString()
    )
  })

  describe('interrupt handler', () => {
    it('is called with the expected VM', () => {
      let calls = 0
      const interruptHandler: ShouldInterruptHandler = interruptVm => {
        assert.strictEqual(interruptVm, vm, 'ShouldInterruptHandler callback VM is the vm')
        calls++
        return false
      }
      vm.setShouldInterruptHandler(interruptHandler)

      vm.unwrapResult(vm.evalCode('1 + 1')).dispose()

      assert(calls > 0, 'interruptHandler called at least once')
    })

    it('interrupts infinite loop execution', () => {
      let calls = 0
      const interruptHandler: ShouldInterruptHandler = interruptVm => {
        if (calls > 10) {
          return true
        }
        calls++
        return false
      }
      vm.setShouldInterruptHandler(interruptHandler)

      const result = vm.evalCode('i = 0; while (1) { i++ }')

      // Make sure we actually got to interrupt the loop.
      const iHandle = vm.getProp(vm.global, 'i')
      const i = vm.getNumber(iHandle)
      iHandle.dispose()

      assert(i > 10, 'incremented i')
      assert(i > calls, 'incremented i more than called the interrupt handler')
      // console.log('Javascript loop iterrations:', i, 'interrupt handler calls:', calls)

      if (result.failure) {
        const errorJson = vm.dump(result.failure)
        result.failure.dispose()
        assert.equal(errorJson.name, 'InternalError')
        assert.equal(errorJson.message, 'interrupted')
      } else {
        result.value.dispose()
        assert.fail('Should have returned an interrupt error')
      }
    })
  })
})
