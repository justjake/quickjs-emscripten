/**
 * These tests demonstate some common patterns for using quickjs-emscripten.
 */

import {
  getQuickJS,
  QuickJSVm,
  QuickJSHandle,
  InterruptHandler,
  QuickJSDeferredPromise,
} from './quickjs'
import { it, describe } from 'mocha'
import assert from 'assert'
import { VmCallResult } from './vm-interface'

describe('QuickJSVm', async () => {
  let vm: QuickJSVm = undefined as any

  beforeEach(async () => {
    const quickjs = await getQuickJS()
    vm = quickjs.createVm()
  })

  afterEach(() => {
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
      if (result.error) {
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
      if (!result.error) {
        assert.fail('function call must return error')
      }
      assert.deepEqual(vm.dump(result.error), {
        name: 'Error',
        message: 'oops',
      })
      result.error.dispose()
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

    it('can see its arguments being cloned', () => {
      let value: QuickJSHandle | undefined

      const fnHandle = vm.newFunction('doSomething', arg => {
        value = arg.dup()
      })

      const argHandle = vm.newString('something')
      const callHandle = vm.callFunction(fnHandle, vm.undefined, argHandle)

      argHandle.dispose()
      vm.unwrapResult(callHandle).dispose()

      if (!value) throw new Error(`Value unset`)

      assert.equal(vm.getString(value), 'something')
      value.dispose()

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
      const result: VmCallResult<QuickJSHandle> = {
        value: handle,
      }

      assert.strictEqual(vm.unwrapResult(result), handle)
    })

    it('error result: throws the error as a Javascript value', () => {
      const handle = vm.newString('ERROR!')
      const result: VmCallResult<QuickJSHandle> = {
        error: handle,
      }

      try {
        vm.unwrapResult(result)
        assert.fail('vm.unwrapResult(error) must throw')
      } catch (error) {
        assert.strictEqual(error, 'ERROR!')
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
      if (!result.error) {
        assert.fail('result should be an error')
      }
      assert.deepEqual(vm.dump(result.error), {
        name: 'SyntaxError',
        message: 'unexpected end of string',
        stack: '    at eval.js:1\n',
      })
      result.error.dispose()
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
      const interruptHandler: InterruptHandler = interruptVm => {
        assert.strictEqual(interruptVm, vm, 'ShouldInterruptHandler callback VM is the vm')
        calls++
        return false
      }
      vm.setInterruptHandler(interruptHandler)

      vm.unwrapResult(vm.evalCode('1 + 1')).dispose()

      assert(calls > 0, 'interruptHandler called at least once')
    })

    it('interrupts infinite loop execution', () => {
      let calls = 0
      const interruptHandler: InterruptHandler = interruptVm => {
        if (calls > 10) {
          return true
        }
        calls++
        return false
      }
      vm.setInterruptHandler(interruptHandler)

      const result = vm.evalCode('i = 0; while (1) { i++ }')

      // Make sure we actually got to interrupt the loop.
      const iHandle = vm.getProp(vm.global, 'i')
      const i = vm.getNumber(iHandle)
      iHandle.dispose()

      assert(i > 10, 'incremented i')
      assert(i > calls, 'incremented i more than called the interrupt handler')
      // console.log('Javascript loop iterrations:', i, 'interrupt handler calls:', calls)

      if (result.error) {
        const errorJson = vm.dump(result.error)
        result.error.dispose()
        assert.equal(errorJson.name, 'InternalError')
        assert.equal(errorJson.message, 'interrupted')
      } else {
        result.value.dispose()
        assert.fail('Should have returned an interrupt error')
      }
    })
  })

  describe('.computeMemoryUsage', () => {
    it('returns an object with JSON memory usage info', () => {
      const result = vm.computeMemoryUsage()
      const resultObj = vm.dump(result)
      result.dispose()

      // Is this test failing? Just commit the new value as long as it seems reasonable.
      assert.deepEqual(resultObj, {
        array_count: 1,
        atom_count: 414,
        atom_size: 13593,
        binary_object_count: 0,
        binary_object_size: 0,
        c_func_count: 46,
        fast_array_count: 1,
        fast_array_elements: 0,
        js_func_code_size: 0,
        js_func_count: 0,
        js_func_pc2line_count: 0,
        js_func_pc2line_size: 0,
        js_func_size: 0,
        malloc_count: 665,
        malloc_limit: 4294967295,
        memory_used_count: 665,
        memory_used_size: 36305,
        obj_count: 97,
        obj_size: 4656,
        prop_count: 654,
        prop_size: 5936,
        shape_count: 50,
        shape_size: 10328,
        str_count: 0,
        str_size: 0,
      })
    })
  })

  describe('.setMemoryLimit', () => {
    it('sets an enforced limit', () => {
      vm.setMemoryLimit(100)
      const result = vm.evalCode(`new Uint8Array(101); "ok"`)

      if (!result.error) {
        result.value.dispose()
        throw new Error('should be an error')
      }

      vm.setMemoryLimit(-1) // so we can dump
      const error = vm.dump(result.error)
      result.error.dispose()

      assert.strictEqual(error, null)
    })

    it('removes limit when set to -1', () => {
      vm.setMemoryLimit(100)
      vm.setMemoryLimit(-1)

      const result = vm.unwrapResult(vm.evalCode(`new Uint8Array(101); "ok"`))
      const value = vm.dump(result)
      result.dispose()
      assert.strictEqual(value, 'ok')
    })
  })

  describe('.dumpMemoryUsage()', () => {
    it('logs memory usage', () => {
      assert(
        vm.dumpMemoryUsage().endsWith('per fast array)\n'),
        'should end with "per fast array)\\n"'
      )
    })
  })

  describe('.newPromise()', () => {
    it('dispose does not leak', () => {
      vm.newPromise().dispose()
    })

    it('passes an end-to-end test', async () => {
      const expectedValue = Math.random()
      let deferred: QuickJSDeferredPromise = undefined as any

      function timeout(ms: number) {
        return new Promise(resolve => {
          setTimeout(() => resolve(), ms)
        })
      }

      const asyncFuncHandle = vm.newFunction('getThingy', () => {
        deferred = vm.newPromise()
        timeout(5).then(() => vm.newNumber(expectedValue).consume(val => deferred.resolve(val)))
        return deferred.handle
      })

      asyncFuncHandle.consume(func => vm.setProp(vm.global, 'getThingy', func))

      vm.unwrapResult(
        vm.evalCode(`
          var globalThingy = 'not set by promise';
          getThingy().then(thingy => { globalThingy = thingy })
        `)
      ).dispose()

      // Wait for the promise to settle
      await deferred.settled

      // Execute promise callbacks inside the VM
      vm.executePendingJobs()

      // Check that the promise executed.
      const vmValue = vm.unwrapResult(vm.evalCode(`globalThingy`)).consume(x => vm.dump(x))
      assert.equal(vmValue, expectedValue)
    })
  })
})
