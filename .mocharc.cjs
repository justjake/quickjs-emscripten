"use strict"

// https://mochajs.org/#configuring-mocha-nodejs

module.exports = {
  // https://typestrong.org/ts-node/docs/recipes/mocha/
  require: [
    // Specify "require" for CommonJS
    // "ts-node/register",
    "source-map-support/register",
  ],
  // Specify "loader" for native ESM
  loader: "ts-node/esm",
  extensions: ["js", "ts", "tsx"],
  timeout: 5000,

  "watch-files": [
    "ts/**/*",
    "build/**/*.js",
    // "build/**/*.ts",
  ],
}
