# Technology Stack

**Analysis Date:** 2026-06-01

## Languages

**Primary:**
- TypeScript 5.9.3 - All source files in `src/`
- Vue SFC (`.vue`) - Component files throughout `src/components/`

**Secondary:**
- CSS - Tailwind utility classes + custom component layer in `src/assets/css/tailwind.css`

## Runtime

**Environment:**
- Node.js 24.10.0 (active on system; no `.nvmrc` or `.node-version` pin)
- Bun 1.3.14 - Primary package manager and script runner

**Package Manager:**
- Bun 1.3.14
- Lockfile: `bun.lock` present; `package-lock.json` also present (legacy artifact)

## Frameworks

**Core:**
- Nuxt 4.3.0 - SSR meta-framework, config at `nuxt.config.ts`
- Vue 3.5.27 - Component framework
- TresJS (`@tresjs/nuxt` 5.1.7, `@tresjs/cientos` 5.2.5) - Vue-native Three.js integration
- Three.js 0.182.0 - 3D rendering engine

**UI / Interaction:**
- `@vueuse/nuxt` 14.1.0 / `@vueuse/motion` 3.0.3 - Composable utilities and scroll/entrance animations
- `vue-final-modal` 4.5.5 - Modal management, registered via Nuxt plugin at `src/plugins/vue-final-modal.ts`
- `simplebar-vue` 2.4.2 - Custom scrollbar inside modals

**Animation:**
- `maath` 0.10.8 (`maath/easing`) - Smooth damping for 3D camera transitions in `src/components/CanvasComponent.vue`
- `@vueuse/motion` 3.0.3 - CSS entrance animations via custom `v-motion-*` directives configured in `nuxt.config.ts`

**Build/Dev:**
- `@nuxt/devtools` 3.1.1 - In-browser devtools panel
- `sharp` 0.34.5 - Image processing for `@nuxt/image`
- `vue-tsc` 3.2.4 - Vue-aware TypeScript checking (currently disabled; see note below)
- PostCSS 8.5.6 - CSS processing pipeline

## Key Dependencies

**Critical:**
- `@tresjs/core` (transitive via `@tresjs/nuxt`) - Provides `TresCanvas`, `useTresContext`; core of all 3D rendering
- `three` 0.182.0 - Direct imports throughout `src/components/CanvasComponent.vue` (loaders, materials, math types)
- `maath` 0.10.8 - `damp`, `damp3`, `dampC`, `dampE` used for scroll-driven camera movement

**Infrastructure (Nuxt Modules):**
- `@nuxt/image` 2.0.0 - Optimized image delivery
- `@nuxtjs/tailwindcss` 6.14.0 - Tailwind CSS integration
- `@nuxtjs/google-fonts` 3.2.0 - Self-hosted Inter font (weight 200–800) loaded via `display: swap`
- `@nuxtjs/sitemap` 7.6.0 - Auto-generated sitemap at `https://mowebdev.com/sitemap.xml`
- `nuxt-schema-org` 5.0.10 - Structured data for SEO
- `@nuxtjs/robots` 5.7.0 - `robots.txt` generation
- `@total-typescript/ts-reset` 0.6.1 - TypeScript utility types reset, declared in `reset.d.ts`

## Configuration

**Environment:**
- No `.env` file present; no secrets detected
- `nuxt.config.ts` `runtimeConfig.public.motion` holds all animation directive definitions
- `nuxt.config.ts` `site.url` set to `https://mowebdev.com`
- ISR cache rule: all routes (`/**`) revalidate every 3600 seconds via `routeRules`

**TypeScript:**
- `strict: true` in `nuxt.config.ts`
- `typeCheck: false` - disabled because `vite-plugin-checker` is not yet compatible with `vue-tsc` 3.x
- `tsconfig.json` defers entirely to `.nuxt/tsconfig.*.json` generated files

**Build:**
- `nuxt.config.ts` - Primary build config; `srcDir: "src/"`, `dir.public: "src/public"`
- `tailwind.config.ts` - Extends default theme: Inter font, `3xl` breakpoint (1920px), `box-shadow` transition
- `eslint.config.mjs` - Flat config: Nuxt ESLint, Prettier, TailwindCSS plugin, jsx-a11y plugin
- SSR enabled (`ssr: true`)

## Platform Requirements

**Development:**
- Bun 1.3.14+
- Node.js 24.x (no pin; matches system version)
- `bun install` → `bun run dev`

**Production:**
- Static export supported via `bun run generate` (Nuxt generate)
- Server-side rendering supported via `bun run build` + `bun run start`
- Hosted on Vercel (referenced in `src/components/FooterComponent.vue`)

---

*Stack analysis: 2026-06-01*
