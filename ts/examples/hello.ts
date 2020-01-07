import {getInstance} from '../quickjs'

async function main() {
  const quickjs = await getInstance()
  const vm = quickjs.createVm()
  const num = vm.newNumber(55)
  console.log('num', vm.getNumber(num))
  const str = vm.newString('hi nora')
  console.log('str', vm.getString(str))
  vm.free()
}

main()
