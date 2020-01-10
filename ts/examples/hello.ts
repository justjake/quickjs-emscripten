import { getInstance, QuickJSVm } from '../quickjs'

function logEval(vm: QuickJSVm, code: string) {
  console.log(`${code} -->`)
  const res = vm.evalCode(code)
  if (res.error) {
    console.log('Error in eval:', vm.dump(res.error))
    console.log('')
    return res.error
  } else {
    console.log(vm.dump(res.value))
    console.log('')
    return res.value
  }
}

async function main() {
  const quickjs = await getInstance()
  const vm = quickjs.createVm()

  // Basics
  const num = vm.newNumber(42)
  vm.setProp(vm.global, 'num', num)
  console.log('num =', vm.getNumber(num))
  num.dispose()

  const str = vm.newString('hi nora ')
  vm.setProp(vm.global, 'str', str)
  console.log('str =', vm.getString(str))
  str.dispose()

  // Make a function
  const rand = vm.newFunction('random', () => {
    return vm.newNumber(Math.random())
  })
  vm.setProp(vm.global, 'random', rand)
  rand.dispose()

  // Evals
  logEval(vm, `["this", "should", "work"].join(' ')`).dispose()
  logEval(vm, `["this", "should", "fail].join(' ')`).dispose()
  logEval(vm, 'str.repeat(num)').dispose()
  logEval(vm, 'random() * num').dispose()

  // Try retaining result of function
  logEval(vm, 'var cow = random()').dispose()
  logEval(vm, 'cow').dispose()

  // Try a cyclical object
  logEval(
    vm,
    `
const obj = {};
obj.cycle = obj;
obj
`
  ).dispose()

  // Try calling a function defined inside the VM
  logEval(vm, `function definedInside(n) { return n * n + random() }`).dispose()
  const fnHandle = vm.getProp(vm.global, 'definedInside')
  const fnResult = vm.unwrapResult(vm.callFunction(fnHandle, vm.undefined, vm.newNumber(5)))
  console.log('defined inside', vm.dump(fnResult))
  fnHandle.dispose()

  vm.dispose()
}

main()
