/* eslint-disable no-undef */
quickjsEmscriptenInit.inits.push((extension) => {
  if (typeof receiveSourceMapJSON !== "undefined") {
    extension["receiveSourceMapJSON"] = (data) => {
      if (typeof wasmSourceMap === "undefined") {
        extension.log("receiveSourceMapJSON: received", data)
        return receiveSourceMapJSON(data)
      } else {
        extension.log("receiveSourceMapJSON: already have data:", wasmSourceMap, "ignoring", data)
      }
    }
  }
})
