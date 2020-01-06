// Generate symbols list
// Generate header file
const fs = require('fs');
const INCLUDE_RE = /^#include.*$/gm
const DECL_RE = /^([\w*]+[\s*]+)(QTS_\w+)(.*?) ?{$/gm
const STDIN = fs.readFileSync(0, 'utf-8')

function matchAll(regexp, text) {
	// We're using .exec, which mutates the regexp by setting the .lastIndex
	const initialLastIndex = regexp.lastIndex
	const result = []
	let match  = null
	while ((match = regexp.exec(text)) !== null) {
		result.push(match)
	}
	regexp.lastIndex = initialLastIndex
	return result
}

const matches = matchAll(DECL_RE, STDIN)
const includeMatches = matchAll(INCLUDE_RE, STDIN)

if (process.argv.includes('symbols')) {
  const symbols = matches.map(match => {
    const name = match[2]
    return `_${name}`
  })
  console.log(JSON.stringify(symbols))
}

if (process.argv.includes('header')) {
  for (const include of includeMatches) {
    console.log(include[0])
  }
  for (const match of matches) {
    const returnType = match[1]
    const name = match[2]
    const params = match[3]
    console.log(`${returnType}${name}${params};`)
  }
}
