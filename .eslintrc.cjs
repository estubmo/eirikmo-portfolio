/* eslint-env node */
/** @type {import("eslint").Linter.Config} */

module.exports = {
  parser: "vue-eslint-parser",
  root: true,
  extends: [
    "@nuxt/eslint-config",
    "plugin:jsx-a11y/recommended",
    "plugin:tailwindcss/recommended",
    "prettier",
  ],
  parserOptions: {
    parser: "@typescript-eslint/parser"
  },
  rules: {
    "tailwindcss/classnames-order": "off", // Enforced by Prettier
    "tailwindcss/no-custom-classname": "off", // Avoid distractions while typing
    "@typescript-eslint/no-unused-vars": "warn",
  },
};
