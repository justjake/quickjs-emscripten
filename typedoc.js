const NO_THANKS = ['**/node_modules/**', './quickjs/**']

function escapeEntrypoint(str) {
  const wanted = 1
  let out = str
  for (let i = 0; i < wanted; i++) {
    out = JSON.stringify(out)
  }
  return out
}

module.exports = {
  out: './doc',
  //entryPoint: escapeEntrypoint('ts/quickjs'),
  exclude: NO_THANKS,
  externalsPattern: NO_THANKS[0],
  excludeNotExported: true,
  excludePrivate: true,
  ignoreCompilerErrors: true,
}
