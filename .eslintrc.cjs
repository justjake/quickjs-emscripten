/* eslint-env node */
/* @type import("eslint").ESLintConfig */
module.exports = {
  plugins: ["@typescript-eslint", "import"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/typescript",
  ],
  parser: "@typescript-eslint/parser",
  root: true,
  rules: {
    // Disables
    "@typescript-eslint/no-explicit-any": "off",
    "no-extra-semi": "off", // covered by prettier

    // Enables
    "@typescript-eslint/consistent-type-imports": "error",
    "import/order": "error",
    "import/no-duplicates": "error",
    "import/no-cycle": "error",
  },
  settings: {
    // 'import/resolver': {
    //   typescript: true,
    //   node: true,
    // }
  },
}
