import { createConfigForNuxt } from "@nuxt/eslint-config/flat";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import pluginTailwindCSS from "eslint-plugin-tailwindcss";
import pluginJsxA11y from "eslint-plugin-jsx-a11y";

export default createConfigForNuxt({
    features: {
        tooling: true,
    },
})
    .append(eslintPluginPrettierRecommended)
    .append(...pluginTailwindCSS.configs["flat/recommended"])
    .append({
        plugins: {
            "jsx-a11y": pluginJsxA11y,
        },
        rules: {
            ...pluginJsxA11y.flatConfigs.recommended.rules,
            "tailwindcss/classnames-order": "off", // Enforced by Prettier
            "tailwindcss/no-custom-classname": "off", // Avoid distractions while typing
            "@typescript-eslint/no-unused-vars": "warn",
        },
    })
    .append({
        ignores: ["node_modules", ".nuxt", ".output", "dist"],
    });
