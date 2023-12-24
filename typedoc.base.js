const NO_THANKS = ["**/node_modules/**", "./quickjs/**"]

module.exports = {
  // link to main instead of the current git SHA
  // which is borked with our strategy of deploying the docs
  // in the repo.
  gitRevision: "main",
  excludePrivate: true,
  excludeExternals: true,
  categorizeByGroup: true,
  plugin: ["typedoc-plugin-markdown"],
  exclude: NO_THANKS,
  externalPattern: NO_THANKS[0],
  excludeReferences: true,

  // Experimental
  // https://github.com/tgreyuk/typedoc-plugin-markdown/blob/next/packages/typedoc-plugin-markdown/docs/plugin-options.md
  // useCodeBlocks: true,
  // outputFileStrategy: "modules"
  membersWithOwnFile: ["Class", "Interface"],
}
