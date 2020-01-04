import {getInstance} from '../quickjs'

async function main() {
  const quickjs = await getInstance()
  const result = quickjs.eval('"hello " + "world" + "!"')
  console.log(result)
}

main()
