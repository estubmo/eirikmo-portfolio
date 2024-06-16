import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
    content: ["./src/**/*.{astro,html,js,jsx,md,ts,tsx,vue}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Inter", ...defaultTheme.fontFamily.sans],
            },
            screens: {
                "3xl": "1920px",
            },
            transitionProperty: {
                "box-shadow": "box-shadow",
            },
        },
    },
    plugins: [],
} satisfies Config;
