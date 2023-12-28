#!/usr/bin/env -S deno run --allow-read
import { getQuickJS } from "npm:quickjs-emscripten@0.25.0"
const QuickJS = await getQuickJS()
console.log(QuickJS.evalCode("1+1"))
