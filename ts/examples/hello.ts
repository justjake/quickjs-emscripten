import {getInstance, QuickJSVm} from '../quickjs'

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
  const num = vm.newNumber(55)
  console.log('num', vm.getNumber(num))
  num.dispose()

  const str = vm.newString('hi nora')
  console.log('str', vm.getString(str))
  str.dispose()

  // Evals
  logEval(vm, `["this", "should", "work"].join(' ')`)
  logEval(vm, `["this", "should", "fail].join(' ')`)

  // Try a cyclical object
  logEval(vm, `
const obj = {};
obj.cycle = obj;
obj
`)

  vm.dispose()
}

main()
