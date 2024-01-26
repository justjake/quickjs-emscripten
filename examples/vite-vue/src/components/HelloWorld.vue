<script setup lang="ts">
import { ref, toRaw } from "vue"
import { load } from "../quickjs"
import type { QuickJSAsyncContext, QuickJSContext } from "quickjs-emscripten-core"

const vms = ref<Array<QuickJSContext | QuickJSAsyncContext>>([])
load().then((deps) => {
  vms.value = [deps.newContext()]
})

const code = ref("1 + 2")

function evaluate() {
  return vms.value.map((vmRef) => {
    const vm = toRaw(vmRef)
    const result = vm.evalCode(code.value)
    if (result.error) {
      return result.error.consume(vm.dump)
    } else {
      return result.value.consume(vm.dump)
    }
  })
}
</script>

<template>
  <div class="wrapper">
    <h3>QuickJS Example with Vite & Vue</h3>

    <div><label for="code">Code:</label></div>
    <textarea v-model="code" id="code"></textarea>
    <pre class="result">Results: {{ evaluate() }}</pre>
  </div>
</template>

<style scoped>
.wrapper {
  text-align: justify;
}

#code {
  width: 100%;
  min-height: 4em;
}
</style>
