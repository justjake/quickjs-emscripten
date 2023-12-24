<script setup lang="ts">
import { ref } from 'vue'
import { QuickJSAsync, QuickJSDefault, QuickJSFromVariant } from '../quickjs';

const vms = [
  QuickJSAsync.newContext(),
  QuickJSDefault.newContext(),
  QuickJSFromVariant.newContext(),
]

const code = ref('1 + 2')

function evaluate() {
  return vms.map(vm => {
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
    <Eval vm={vm}></Eval>
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
