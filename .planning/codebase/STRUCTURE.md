# Codebase Structure

**Analysis Date:** 2026-06-01

## Directory Layout

```
eirikmo-portfolio/
├── src/                        # All application source (srcDir configured)
│   ├── app.vue                 # Root component — entry point, all state
│   ├── assets/
│   │   └── css/
│   │       └── tailwind.css    # Tailwind directives (@tailwind base/components/utilities)
│   ├── components/
│   │   ├── CanvasComponent.vue # 3D scene (Three.js via TresJS)
│   │   ├── NavBarComponent.vue # Fixed navigation bar
│   │   ├── HeaderComponent.vue # Hero section
│   │   ├── MeComponent.vue     # About/bio section
│   │   ├── ExpertiseComponent.vue # Skills grid section
│   │   ├── ContactComponent.vue   # Contact section
│   │   ├── FooterComponent.vue    # Footer
│   │   ├── SocialsComponent.vue   # Social links sidebar
│   │   ├── ExperienceCard.vue     # Reusable card shell (slot-based)
│   │   ├── MyModal.vue            # Modal shell (VueFinalModal wrapper)
│   │   ├── TechIcon.vue           # Linked tech icon wrapper
│   │   ├── TechItem.vue           # Tech item display
│   │   ├── TechContainer.vue      # Tech icon container
│   │   ├── CoolConsoleLog.vue     # Browser console ASCII banner
│   │   ├── FixPixelRatio.vue      # Canvas pixel ratio helper
│   │   ├── CustomStatsGl.vue      # WebGL stats overlay (dev)
│   │   ├── Custom{Model}.vue      # 3D model wrappers (Desktop/Tablet/Mobile/Keyboard/Mouse/Lamp)
│   │   ├── icons/                 # SVG icon components (~70 files)
│   │   │   ├── ReactIcon.vue
│   │   │   ├── TypeScriptIcon.vue
│   │   │   └── ...                # One file per technology icon
│   │   ├── projects/              # Project showcase components
│   │   │   ├── FotballFeberCard.vue
│   │   │   ├── FotballFeberContent.vue
│   │   │   ├── SvanhildStubCard.vue
│   │   │   └── SvanhildStubContent.vue
│   │   └── work/                  # Work experience components
│   │       ├── DuckyCard.vue
│   │       ├── DuckyContent.vue
│   │       ├── KnitryCard.vue
│   │       ├── KnitryContent.vue
│   │       ├── SignatureApiCard.vue
│   │       ├── SignatureApiContent.vue
│   │       ├── CheffeloCard.vue
│   │       ├── CheffeloContent.vue
│   │       ├── AdtubeCard.vue
│   │       ├── AdtubeContent.vue
│   │       ├── WebtopCard.vue
│   │       └── WebtopContent.vue
│   ├── constants/
│   │   └── deviceVectors.ts    # Camera positions/rotations per viewport breakpoint
│   ├── plugins/
│   │   └── vue-final-modal.ts  # Registers vue-final-modal as Nuxt plugin
│   ├── public/                 # Static assets (served at root URL)
│   │   ├── favicon.*           # Favicon variants
│   │   ├── site.webmanifest
│   │   ├── images/
│   │   │   ├── ogImage.webp    # OG social preview image
│   │   │   ├── projects/       # Project screenshots and logos
│   │   │   │   ├── fotballfeber/
│   │   │   │   └── svanhildstub/
│   │   │   └── work/           # Work entry logos and screenshots
│   │   │       ├── adtube/
│   │   │       ├── cheffelo/
│   │   │       ├── ducky/
│   │   │       ├── knitry/
│   │   │       ├── signatureapi/
│   │   │       └── webtop/
│   │   ├── models/             # GLTF 3D model files (GLB format)
│   │   │   ├── desktop.glb
│   │   │   ├── tablet.glb
│   │   │   ├── mobile.glb
│   │   │   ├── keyboard.glb
│   │   │   ├── mouse.glb
│   │   │   └── lamp.glb
│   │   └── textures/           # Three.js textures for device screens
│   │       ├── eirik/          # Profile photo textures (alpha mask + photo)
│   │       ├── projects/       # Tiling project screenshot textures
│   │       └── work/           # Tiling work screenshot textures (per company)
│   └── utils/
│       └── normalize.ts        # normalize(val, min, max) → [0,1]
├── nuxt.config.ts              # Nuxt config: modules, srcDir, SSR, ISR, motion directives
├── tailwind.config.ts          # Tailwind: Inter font, 3xl breakpoint (1920px)
├── tsconfig.json               # TypeScript config
├── eslint.config.mjs           # ESLint flat config
├── .prettierrc.cjs             # Prettier config (double quotes, 4-space indent)
├── package.json                # Dependencies
├── bun.lock                    # Bun lockfile
└── .planning/
    └── codebase/               # GSD planning documents
```

## Directory Purposes

**`src/components/`:**
- Purpose: All Vue components organized by type/domain
- Contains: Layout components (Header, Nav, Footer), section components, 3D wrappers, shared primitives
- Key files: `ExperienceCard.vue` (reusable card base), `CanvasComponent.vue` (3D scene), `MyModal.vue` (modal shell)

**`src/components/icons/`:**
- Purpose: Inline SVG icon components for every technology in the portfolio
- Contains: One `.vue` file per technology (e.g., `ReactIcon.vue`, `TailwindIcon.vue`)
- Key pattern: Each accepts `height` and `width` props and renders raw SVG

**`src/components/work/`:**
- Purpose: Work experience entries — always two files per entry
- Contains: `*Card.vue` (card preview with slots filled) and `*Content.vue` (modal detail content)
- Key pattern: `*Card.vue` composes `ExperienceCard.vue` with named slots; `*Content.vue` is standalone

**`src/components/projects/`:**
- Purpose: Personal project entries — same two-file pattern as work
- Contains: `*Card.vue` and `*Content.vue` pairs
- Key pattern: Same as `work/` directory

**`src/constants/`:**
- Purpose: Typed constant data used across components
- Contains: `deviceVectors.ts` — camera positions and Euler angles keyed by viewport
- Key files: `src/constants/deviceVectors.ts`

**`src/utils/`:**
- Purpose: Pure utility functions
- Contains: `normalize.ts` — scroll progress interpolation helper
- Key files: `src/utils/normalize.ts`

**`src/public/models/`:**
- Purpose: GLTF binary model files for the 3D scene
- Contains: GLB files for desktop, tablet, mobile, keyboard, mouse, lamp
- Generated: No — hand-authored or downloaded 3D assets
- Committed: Yes

**`src/public/textures/`:**
- Purpose: Image textures applied to 3D device screens via Three.js `TextureLoader`
- Contains: Tiling JPG textures (`*-repeat.jpg`) per work/project entry; profile photo in `eirik/`
- Generated: No
- Committed: Yes

## Key File Locations

**Entry Points:**
- `src/app.vue`: Root component — all page state, scroll tracking, modal control, section layout, SEO head

**Configuration:**
- `nuxt.config.ts`: Modules list, srcDir, SSR mode, ISR rules, motion directive definitions, Google Fonts
- `tailwind.config.ts`: Inter font family, `3xl` breakpoint (1920px), custom `box-shadow` transition
- `eslint.config.mjs`: ESLint flat config
- `.prettierrc.cjs`: Prettier rules (double quotes, 4-space indentation, trailing commas)
- `tsconfig.json`: TypeScript compiler options (strict mode)

**Core Logic:**
- `src/components/CanvasComponent.vue`: 3D scene rendering, texture loading, camera animation
- `src/constants/deviceVectors.ts`: Camera waypoints per viewport breakpoint
- `src/utils/normalize.ts`: Scroll-to-progress normalization

**Plugin Registration:**
- `src/plugins/vue-final-modal.ts`: Registers `vue-final-modal` plugin

**Styles:**
- `src/assets/css/tailwind.css`: Tailwind base import

## Naming Conventions

**Files:**
- Vue components: `PascalCase.vue` — e.g., `DuckyCard.vue`, `ExperienceCard.vue`
- TypeScript modules: `camelCase.ts` — e.g., `deviceVectors.ts`, `normalize.ts`
- Nuxt config files: `camelCase.config.ts/mjs` — e.g., `nuxt.config.ts`, `tailwind.config.ts`
- Texture files: `kebab-case-repeat.jpg` — e.g., `ducky-repeat.jpg`
- 3D models: `lowercase.glb` — e.g., `desktop.glb`

**Components (naming pattern):**
- Layout/section: `{Name}Component.vue` — `NavBarComponent.vue`, `HeaderComponent.vue`
- Experience cards: `{CompanyName}Card.vue` / `{CompanyName}Content.vue`
- 3D model wrappers: `Custom{ModelName}.vue` — `CustomDesktop.vue`, `CustomMobile.vue`
- Icons: `{TechName}Icon.vue` — `ReactIcon.vue`, `TypeScriptIcon.vue`

**Directories:**
- Lowercase singular: `icons/`, `work/`, `projects/`, `utils/`, `constants/`, `plugins/`

## Where to Add New Code

**New Work Experience Entry:**
1. Create `src/components/work/{CompanyName}Card.vue` — extend `ExperienceCard.vue` with named slots
2. Create `src/components/work/{CompanyName}Content.vue` — standalone detail content
3. Add company logo to `src/public/images/work/{companyname}/logo.png`
4. Add tiling texture to `src/public/textures/work/{companyname}/{companyname}-repeat.jpg`
5. Register in `src/app.vue`: add `ref`, add to `scrollRefs`, add to `isExperienceModalOpenRef`, add `MyModal` binding, add card to work section grid, add `ModalSegment` union type, add cases to `openModalBySegment` and `toggleExperienceModal`
6. Add texture loading in `CanvasComponent.vue` and create `setParams` function for the new entry

**New Project Entry:**
- Same as work entry above but use `src/components/projects/` and `src/public/textures/projects/`

**New Technology Icon:**
- Create `src/components/icons/{TechName}Icon.vue`
- Accept `height` and `width` as props, render inline SVG
- Use via `TechIcon.vue` wrapper in `*Card.vue` and `*Content.vue`

**Utilities:**
- Shared helpers: `src/utils/{name}.ts` — pure functions, no Vue imports

**Constants:**
- `src/constants/{name}.ts` — typed constant data

## Special Directories

**`.nuxt/`:**
- Purpose: Nuxt build output and auto-generated type files
- Generated: Yes
- Committed: No (in `.gitignore`)

**`.output/`:**
- Purpose: Production build output (`bun run generate` / `bun run build`)
- Generated: Yes
- Committed: No

**`dist`:**
- Purpose: Symlink to `.output/public` for static serving
- Generated: Yes (symlink)
- Committed: Yes (the symlink itself, not contents)

**`.planning/codebase/`:**
- Purpose: GSD codebase analysis documents for AI-assisted planning
- Generated: By GSD map-codebase command
- Committed: Yes

---

*Structure analysis: 2026-06-01*
