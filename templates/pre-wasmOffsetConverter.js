/* eslint-disable no-undef */
quickjsEmscriptenInit.inits.push((extension) => {
  if (typeof WasmOffsetConverter !== "undefined") {
    extension["WasmOffsetConverter"] = WasmOffsetConverter
    // Expose function to receive WasmOffsetConverter, set to wasmOffsetConverter local variable
    // if it exists
    try {
      // Check if wasmOffsetConverter variable exists. If it isn't defined, this
      // will throw and we'll skip the rest of the branch.
      extension["existingWasmOffsetConverter"] = wasmOffsetConverter
      extension["receiveWasmOffsetConverter"] = function (wasmBinary, wasmModule) {
        if (!wasmOffsetConverter) {
          extension.log("wasmOffsetConverter set")
          wasmOffsetConverter = new WasmOffsetConverter(wasmBinary, wasmModule)
        } else {
          extension.log("wasmOffsetConverter already set, ignored")
        }
      }
    } catch (error) {
      // Nothing.
      extension["receiveWasmOffsetConverter"] = function () {
        extension.log("wasmOffsetConverter variable not defined, this is a no-op")
      }
    }
  }
})
