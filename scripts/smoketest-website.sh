#!/bin/bash
set -exo pipefail
cd examples/website
npm install quickjs-emscripten@../../build/quickjs-emscripten.tgz
npm run build
