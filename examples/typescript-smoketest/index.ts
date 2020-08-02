import { getQuickJS } from 'quickjs-emscripten'
async function main() {
  const QuickJS = await getQuickJS()
  console.log(QuickJS.evalCode('"QuickJS.evalCode successful"'))

  const vm = QuickJS.createVm()
  const memoryUsage = vm.dumpMemoryUsage()
  console.log('Empty VM memory usage:', memoryUsage)
}
main()
