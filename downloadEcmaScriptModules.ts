import * as fs from "fs-extra"
import * as pathlib from "path"
import fetch from "node-fetch-commonjs"
import { matchAll, replaceAll } from "./generate"

const CONFIG = {
  destination: pathlib.resolve(process.env.DESTINATION || "./examples/imports"),
  URLs: process.argv.slice(2),
}

const IMPORT_FROM_RE = /from\s*"([^"]+)"/g
const IMPORT_EXPRESSION_RE = /import\s*\("([^"]+)"\)/g

async function main() {
  const { destination } = CONFIG
  const queue = Array.from(CONFIG.URLs)
  const queued = new Set(queue)

  function enqueue(url: string, baseUrl: string) {
    const absoluteUrl = new URL(url, baseUrl).toString()
    if (!queued.has(absoluteUrl)) {
      console.log("enqueue", absoluteUrl)
      queue.push(absoluteUrl)
      queued.add(absoluteUrl)
    }
  }

  function nameFile(args: { target: string; baseUrl: string }) {
    const { target, baseUrl } = args
    const url = new URL(target, baseUrl)
    return pathlib.join(destination, url.hostname, url.pathname)
  }

  function renameImport(args: { target: string; baseUrl: string; fileName: string }) {
    const targetFile = nameFile(args)
    return pathlib.relative(pathlib.dirname(args.fileName), targetFile)
  }

  async function process(url: string) {
    const log = (...args: any[]) => console.log(`${url}`, ...args)
    log("download")
    const filename = nameFile({ target: url, baseUrl: url })
    const text = await (await fetch(url)).text()
    const importFrom = matchAll(IMPORT_FROM_RE, text).map((match) => match[0])
    const importExpression = matchAll(IMPORT_EXPRESSION_RE, text).map((match) => match[0])
    log("parsed", { filename, importFrom, importExpression })
    let replaced = replaceAll(IMPORT_FROM_RE, text, (match) => {
      const importTarget = match[1]
      enqueue(importTarget, url)
      const renamed = renameImport({
        target: importTarget,
        baseUrl: url,
        fileName: filename,
      })
      log("replaced", importTarget, "->", renamed)
      return `from "${renamed}"`
    })
    replaced = replaceAll(IMPORT_EXPRESSION_RE, replaced, (match) => {
      const importTarget = match[1]
      enqueue(importTarget, url)
      const renamed = renameImport({
        target: importTarget,
        baseUrl: url,
        fileName: filename,
      })
      log("replaced", importTarget, "->", renamed)
      return `import("${renamed}")`
    })

    await fs.mkdirp(pathlib.dirname(filename))
    await fs.writeFile(filename, replaced)
  }

  while (queue.length > 0) {
    const url = queue.shift()!
    await process(url)
  }
}

main()
