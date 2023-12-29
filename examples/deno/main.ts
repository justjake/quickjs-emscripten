#!/usr/bin/env -S deno run --allow-read --unstable-byonm
import { getQuickJS } from "npm:quickjs-emscripten"
const QuickJS = await getQuickJS()
console.log(QuickJS.evalCode("1+1"))
