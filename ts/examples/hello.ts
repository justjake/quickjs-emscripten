import {getInstance, QuickJSVm} from '../quickjs'

function logEval(vm: QuickJSVm, code: string) {
  const res = vm.evalCode(code)
  if (res.error) {
    console.log(vm.dump(res.error))
    // TODO(free)
  } else {
    console.log(vm.dump(res.value))
    // TODO(free)
  }
  return res
}

async function main() {
  const quickjs = await getInstance()
  const vm = quickjs.createVm()

  // Basics
  const num = vm.newNumber(55)
  console.log('num', vm.getNumber(num))
  const str = vm.newString('hi nora')
  console.log('str', vm.getString(str))

  // Evals
  logEval(vm, `["this", "should", "work"].join(' ')`)
  logEval(vm, `["this", "should", "fail].join(' ')`)

  vm.free()
}

main()
