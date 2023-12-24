const variants = require("./variants.json")

const ROOT_PACKAGES = ["quickjs-emscripten", "quickjs-emscripten-core", "quickjs-ffi-types"].map(
  (path) => `./packages/${path}`,
)

const VARIANT_PACKAGES = Object.values(variants).map((variant) => variant.dir)

module.exports = {
  extends: "./typedoc.base.js",
  name: "quickjs-emscripten",
  entryPoints: [...ROOT_PACKAGES, ...VARIANT_PACKAGES],
  entryPointStrategy: "packages",
  out: "./doc",
}
