import { getQuickJS } from 'quickjs-emscripten'
async function main() {
  const QuickJS = await getQuickJS()
  console.log(QuickJS.evalCode('"Smoketest successful"'))
}
main()
