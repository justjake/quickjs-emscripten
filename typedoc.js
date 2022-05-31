const name = require("./package.json").name
const NO_THANKS = ["**/node_modules/**", "./quickjs/**"]

module.exports = {
  // disable package version in doc headers
  name,
  entryPoints: ["./ts/index.ts"],
  entryPointStrategy: "expand",
  // link to main instead of the current git SHA
  // which is borked with our strategy of deploying the docs
  // in the repo.
  gitRevision: "main",
  out: "./doc",
  // mode: 'file',
  exclude: NO_THANKS,
  externalPattern: NO_THANKS[0],
  // excludeNotExported: true,
  excludePrivate: true,
  categorizeByGroup: true,
  listInvalidSymbolLinks: true,
  plugin: ["typedoc-plugin-markdown"],
}
