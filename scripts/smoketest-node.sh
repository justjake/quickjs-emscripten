#!/bin/bash
set -exo pipefail
cd examples/typescript-smoketest
npm install quickjs-emscripten@../../build/quickjs-emscripten.tgz
npx tsc --lib ES2015,dom index.ts
exec node index.js
