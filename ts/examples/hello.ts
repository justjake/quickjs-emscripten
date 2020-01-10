import { getInstance, QuickJSVm } from '../quickjs'

function logEval(vm: QuickJSVm, code: string) {
  const res = vm.evalCode(code)
  if (res.error) {
    console.log(vm.dump(res.error))
    res.error.dispose()
  } else {
    console.log(vm.dump(res.value))
    res.value.dispose()
  }
  return res
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
  logEval(vm, `["this", "should", "work"].join(' ')`)
  logEval(vm, `["this", "should", "fail].join(' ')`)
  logEval(vm, 'str.repeat(num)')
  logEval(vm, 'random() * num')

  // Try retaining result of function
  logEval(vm, 'var cow = random()')

  // Try a cyclical object
  logEval(
    vm,
    `
const obj = {};
obj.cycle = obj;
obj
`
  )

  vm.dispose()
}

main()
