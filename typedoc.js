const name = require('./package.json').name
const NO_THANKS = ['**/node_modules/**', './quickjs/**']

module.exports = {
  // disable package version in doc headers
  name,
  out: './doc',
  mode: 'file',
  exclude: NO_THANKS,
  externalsPattern: NO_THANKS[0],
  excludeNotExported: true,
  excludePrivate: true,
  categorizeByGroup: true,
  ignoreCompilerErrors: true,
  listInvalidSymbolLinks: true,
}
