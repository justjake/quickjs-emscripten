/* eslint-env node */
/* @type import("eslint").ESLintConfig */
module.exports = {
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  root: true,
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
    // Covered by prettier
    "no-extra-semi": "off",
  },
}
