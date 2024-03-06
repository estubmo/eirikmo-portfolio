import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  $production: {
    // @ts-expect-error Object literal may only specify known properties.
    image: {
      provider: "ipxStatic",
    },
  },
  devtools: { enabled: true },
  modules: [
    "@vueuse/motion/nuxt",
    "@vueuse/nuxt",
    "@nuxtjs/tailwindcss",
    "@tresjs/nuxt",
    "@nuxt/devtools",
    "@nuxt/image",
    "@nuxtjs/sitemap",
    "nuxt-schema-org",
    [
      "@nuxtjs/google-fonts",

      {
        display: "swap",
        families: {
          Inter: "200..800",
        },
      },
    ],
    [
      "@nuxtjs/robots",
      {
        UserAgent: "*",
        Disallow: "",
        Sitemap: "https://mowebdev.com/sitemap.xml",
      },
    ],
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
    compressPublicAssets: true,
    prerender: {
      crawlLinks: true,
    },
  },
  routeRules: {
    "/**": { isr: 60 * 60 },
  },
  site: {
    name: "Eirik Mo - Full-Stack Developer",
    url: "https://mowebdev.com",
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
