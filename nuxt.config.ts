import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@vueuse/motion/nuxt",
    "@vueuse/nuxt",
    "@nuxtjs/tailwindcss",
    "@tresjs/nuxt",
    "nuxt-vercel-analytics",
    "nuxt-security",
    "@nuxt/devtools",
  ],
  srcDir: "src/",
  ssr: true,
  css: ["@/assets/css/tailwind.css", "vue-final-modal/style.css", "simplebar-vue/dist/simplebar.min.css"],
  typescript: {
    typeCheck: true,
    strict: true,
  },
  nitro: {
    static: true,
  },
  routeRules: {
    "/**": { isr: 60 * 60 },
  },
  // @ts-expect-error Object literal may onle specify known properties
  security: {
    headers: {
      crossOriginEmbedderPolicy: process.env.NODE_ENV === "development" ? "unsafe-none" : "require-corp",
    },
    contentSecurityPolicy: {
      "default-src": `'self' 'https://vercel.live'`,
      "script-src": [
        "'self'", // Fallback value, will be ignored by most modern browsers (level 3)
        "https:", // Fallback value, will be ignored by most modern browsers (level 3)
        "'unsafe-inline'", // Fallback value, will be ignored by almost any browser (level 2)
        "'strict-dynamic'", // Strict CSP via 'strict-dynamic', supported by most modern browsers (level 3)
        "'nonce-{{nonce}}'", // Enables CSP nonce support for scripts in SSR mode, supported by almost any browser (level 2)
        "https://vercel.live'",
      ],
    },
  },
  runtimeConfig: {
    public: {
      motion: {
        directives: {
          "slide-visible-once-left-custom": {
            initial: {
              x: -100,
              opacity: 0,
            },
            visibleOnce: {
              x: 0,
              opacity: 1,
              transition: {
                delay: 200,
                duration: 300,
                type: "keyframes",
                ease: "easeInOut",
              },
            },
          },
          "slide-visible-once-right-custom": {
            initial: {
              x: 100,
              opacity: 0,
            },
            visibleOnce: {
              x: 0,
              opacity: 1,
              transition: {
                delay: 200,
                duration: 300,
                type: "keyframes",
                ease: "easeInOut",
              },
            },
          },
          "pop-visible-once-custom": {
            initial: {
              scale: 0,
              opacity: 0,
            },
            visibleOnce: {
              scale: 1,
              opacity: 1,
              transition: {
                delay: 200,
                duration: 300,
                type: "keyframes",
                ease: "easeInOut",
              },
            },
          },
          "fade-visible-once-custom": {
            initial: {
              opacity: 0,
            },
            visibleOnce: {
              opacity: 1,
              transition: {
                delay: 200,
                duration: 300,
                type: "keyframes",
                ease: "easeInOut",
              },
            },
          },
        },
      },
    },
  },
});
