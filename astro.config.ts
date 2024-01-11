import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import vue from "@astrojs/vue";
import { templateCompilerOptions } from "@tresjs/core";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    vue({
      ...templateCompilerOptions,
      appEntrypoint: "/src/pages/_app",
      template: {
        transformAssetUrls: {
          includeAbsolute: false,
        },
      },
    }),
  ],
  output: "server",
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
});
