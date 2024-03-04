/** @type {import("prettier").Config} */

module.exports = {
  tailwindConfig: "./tailwind.config.ts",
  plugins: [
    "prettier-plugin-tailwindcss",
    "@ianvs/prettier-plugin-sort-imports",
  ],
  singleQuote: false,
  jsxSingleQuote: false,
  semi: true,
  trailingComma: "all",
  tabWidth: 2,
};
