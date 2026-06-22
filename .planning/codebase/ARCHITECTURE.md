<!-- refreshed: 2026-06-01 -->
# Architecture

**Analysis Date:** 2026-06-01

## System Overview

```text
┌─────────────────────────────────────────────────────────────────────┐
│                          src/app.vue                                 │
│   Root component: scroll state, modal state, section refs,          │
│   hash-based routing, texture progress, all layout composition      │
├───────────────────┬───────────────────────┬─────────────────────────┤
│   HTML Content    │    3D Canvas Layer     │     Modal Layer          │
│   (scrollable)    │   (fixed, fullscreen)  │  (fullscreen overlay)   │
│  VueSimplebar     │  CanvasComponent.vue   │  MyModal.vue +          │
│  wraps main       │  ClientOnly rendered   │  VueFinalModal          │
└───────┬───────────┴───────────┬────────────┴──────────┬──────────────┘
        │                       │                        │
        ▼                       ▼                        ▼
┌───────────────┐   ┌───────────────────────┐  ┌─────────────────────┐
│ Section       │   │  TresJS Scene         │  │ *Content.vue        │
│ Components    │   │  (Three.js via        │  │ components          │
│               │   │   @tresjs/core)       │  │ DuckyContent.vue    │
│ HeaderComponent│  │                       │  │ KnitryContent.vue   │
│ MeComponent   │   │  Custom3DModels:      │  │ etc.                │
│ ExpertiseComp │   │  CustomDesktop.vue    │  └─────────────────────┘
│ *Card.vue     │   │  CustomTablet.vue     │
│ ContactComp   │   │  CustomMobile.vue     │
│ FooterComp    │   │  CustomKeyboard.vue   │
└───────────────┘   │  CustomMouse.vue      │
                    │  CustomLamp.vue       │
                    └───────────────────────┘
                               │
                    ┌──────────▼──────────┐
                    │  Constants/Utils    │
                    │  deviceVectors.ts   │
                    │  normalize.ts       │
                    └─────────────────────┘
```

## Component Responsibilities

| Component | Responsibility | File |
|-----------|----------------|------|
| App root | All state, scroll tracking, modal control, layout composition | `src/app.vue` |
| CanvasComponent | 3D scene, camera animation, texture management, scroll-driven 3D updates | `src/components/CanvasComponent.vue` |
| NavBarComponent | Scroll-hide nav, section links, CV download link | `src/components/NavBarComponent.vue` |
| HeaderComponent | Hero section content | `src/components/HeaderComponent.vue` |
| MeComponent | About/bio section | `src/components/MeComponent.vue` |
| ExpertiseComponent | Skills/tech stack grid | `src/components/ExpertiseComponent.vue` |
| ExperienceCard | Reusable card shell with logo/content/tech slots | `src/components/ExperienceCard.vue` |
| *Card.vue | Individual project/work entry cards (extend ExperienceCard) | `src/components/work/` and `src/components/projects/` |
| *Content.vue | Detailed modal content for each project/work entry | `src/components/work/` and `src/components/projects/` |
| MyModal | Modal shell wrapping VueFinalModal with scrollable inner body | `src/components/MyModal.vue` |
| TechIcon | Reusable linked tech icon with tooltip label | `src/components/TechIcon.vue` |
| Custom{Model}.vue | GLTF 3D model wrappers (desktop/tablet/mobile/keyboard/mouse/lamp) | `src/components/Custom*.vue` |
| deviceVectors | Camera positions (Vector3) and rotations (Euler) per viewport breakpoint | `src/constants/deviceVectors.ts` |
| normalize | Clamps a value to [0,1] range for scroll interpolation | `src/utils/normalize.ts` |

## Pattern Overview

**Overall:** Single-page application with centralized state in the root component, dual-layer rendering (HTML scroll content + fixed 3D canvas), and hash-based deep-linking to modal views.

**Key Characteristics:**
- All scroll position, modal open/close state, and hover state live in `src/app.vue` — no Vuex/Pinia store
- The 3D canvas is rendered client-only (`<ClientOnly>`) as a fixed fullscreen overlay behind the HTML content
- Section DOM measurements (`offsetTop`, `offsetHeight`) are passed as props from `app.vue` down to `CanvasComponent`, which uses them to drive camera animation
- Each work/project entry has exactly two components: a `*Card.vue` (preview card) and a `*Content.vue` (modal detail)
- Hash fragments (`/#ducky`, `/#knitry`, etc.) map directly to modal identifiers, enabling deep-linked sharing

## Layers

**Root State Layer:**
- Purpose: Owns all reactive state; coordinates scroll, modals, hover, and loading
- Location: `src/app.vue`
- Contains: `scrollY`, `progress`, `hasFinishedLoading`, `isModalOpenRef`, `isExperienceModalOpenRef`, `hoverTargetRef`, `currentSegmentRef`, all section `ref`s
- Depends on: All child components
- Used by: Nothing (root)

**HTML Content Layer:**
- Purpose: Scrollable portfolio sections rendered as standard HTML/CSS
- Location: `src/app.vue` template inside `VueSimplebar`
- Contains: `HeaderComponent`, `MeComponent`, `ExpertiseComponent`, `*Card.vue` grids, `ContactComponent`, `FooterComponent`
- Depends on: Root state (scroll refs, toggle handlers)
- Used by: Root state layer (DOM measurements)

**3D Canvas Layer:**
- Purpose: Fixed fullscreen Three.js scene driven by scroll position and interaction state
- Location: `src/components/CanvasComponent.vue` (client-only)
- Contains: TresJS canvas, GLTF model wrappers, texture management, camera animation loop
- Depends on: `src/constants/deviceVectors.ts`, `src/utils/normalize.ts`, `maath/easing`
- Used by: Root state layer (receives DOM offsets as props, emits loading events)

**Modal Layer:**
- Purpose: Fullscreen detail views for each project/work entry
- Location: `src/components/MyModal.vue` + `src/components/{work,projects}/*Content.vue`
- Contains: `VueFinalModal` wrapper, scrollable content, `*Content.vue` children
- Depends on: `vue-final-modal` plugin (`src/plugins/vue-final-modal.ts`)
- Used by: Root state layer (show/close prop binding)

**Icon Library:**
- Purpose: SVG icon components for every technology displayed
- Location: `src/components/icons/`
- Contains: 70+ technology SVG icon components (e.g., `ReactIcon.vue`, `TypeScriptIcon.vue`)
- Depends on: Nothing
- Used by: `*Card.vue` and `*Content.vue` components via `TechIcon.vue` wrapper

## Data Flow

### Primary Scroll Flow

1. User scrolls inside `VueSimplebar` — `onScroll` fires (`src/app.vue:264`)
2. `scrollY.value` updated in root state
3. `scrollY` passed as prop to `CanvasComponent`
4. `updateCamera(delta)` in `CanvasComponent` reads `scrollY` and DOM offset props
5. `normalize()` (`src/utils/normalize.ts`) converts scroll position to [0,1]
6. `damp3()`/`dampE()` from `maath/easing` smoothly interpolates camera position/rotation
7. Camera positions interpolated from `device[currentViewPort]` constants (`src/constants/deviceVectors.ts`)

### Modal Open/Close Flow

1. User clicks a `*Card.vue` → `toggleExperienceModal(name)` called in `src/app.vue:204`
2. `isExperienceModalOpenRef.value[name]` toggled
3. `window.history.pushState` updates URL hash (e.g., `/#ducky`)
4. Watch on `isExperienceModalOpenRef` (deep) sets `isModalOpenRef`
5. `isModalOpenRef` passed as prop to `CanvasComponent` → camera zooms to `device[vp].zoom` position
6. `MyModal` v-model driven by `isExperienceModalOpenRef.{name}` renders `*Content.vue`

### Hash Deep-Link Flow

1. On page load or hash change, `handleHashChange` / `onFirstLoad` fires (`src/app.vue:140,168`)
2. Hash fragment matched against `scrollRefs` array by element `id`
3. `scrollIntoView` called on matched section ref
4. `openModalBySegment` called if hash matches a modal segment identifier

### Texture Loading Flow

1. `CanvasComponent` instantiates `Three.TextureLoader` at module init
2. Each texture loaded asynchronously; `onTextureLoaded` callback increments `loadedCount`
3. When `loadedCount === totalTextures` (7), emits `hasFinishedLoading` to root
4. Root sets `hasFinishedLoading.value = true`, hiding the loading overlay
5. `texturesLoaded` computed triggers material creation watch — materials assembled from loaded textures

**State Management:**
- No global store (Vuex/Pinia). All state is `ref`/`computed` in `src/app.vue`, passed as props to children.

## Key Abstractions

**ExperienceCard:**
- Purpose: Reusable card shell with named slots for logo, default content, and tech icons
- Examples: All `src/components/work/*Card.vue`, `src/components/projects/*Card.vue`
- Pattern: Slot composition — specific card components fill `#logo`, default, and `#tech` slots

**device constants:**
- Purpose: Per-viewport camera positions (start/second/third/zoom/end) and rotations
- Examples: `src/constants/deviceVectors.ts`
- Pattern: Object keyed by viewport string (`"desktop"`, `"tablet"`, `"mobile"`), values are `Vector3`/`Euler`

**Custom{Model}.vue components:**
- Purpose: Thin wrappers loading GLB files via `useGLTF` and exposing shadow-casting scenes
- Examples: `src/components/CustomDesktop.vue`, `src/components/CustomTablet.vue`
- Pattern: Props receive a `position: Vector3`; internally calls `useGLTF(path, { draco: true })`

**TechIcon:**
- Purpose: Linked icon container accepting icon component via default slot and sizing via slot props
- Examples: Used in every `*Card.vue` tech section
- Pattern: `v-slot="slotProps"` exposes `height`/`width` from `size` prop

## Entry Points

**Application Boot:**
- Location: `src/app.vue`
- Triggers: Nuxt SSR/hydration, then client mount
- Responsibilities: SEO head tags, global layout, scroll container, all state initialization

**3D Scene Init:**
- Location: `src/components/CanvasComponent.vue` (inside `<ClientOnly>`)
- Triggers: Client-side mount after hydration
- Responsibilities: Texture loading, GLTF model load, TresCanvas setup, animation loop via `useRenderLoop`

**Modal Plugin:**
- Location: `src/plugins/vue-final-modal.ts`
- Triggers: Nuxt plugin registration
- Responsibilities: Registers `vue-final-modal` as Vue app plugin via `createVfm()`

## Architectural Constraints

- **Threading:** Single-threaded (browser). 3D render loop via TresJS `useRenderLoop`, no web workers.
- **Global state:** All reactive state is module-scoped in `src/app.vue`. No shared singleton stores.
- **Client-only 3D:** `CanvasComponent` is wrapped in `<ClientOnly>` — it never SSR-renders. DOM offset measurements passed as props are always `0` during SSR; the canvas renders only after hydration.
- **Prop drilling:** All scroll metrics and modal state flow down from `src/app.vue` directly to `CanvasComponent` via a large prop interface (20+ props). No intermediate state layers.
- **ISR routing:** `nuxt.config.ts` sets `isr: 3600` for all routes — static generation with 1-hour revalidation.

## Anti-Patterns

### Centralized State Prop Drilling

**What happens:** `src/app.vue` passes 20+ props to `CanvasComponent` including all DOM offset measurements.
**Why it's wrong:** Makes `CanvasComponent`'s interface brittle — adding a new card requires touching the prop interface, the `toRefs` destructure, and all offset calculation call sites.
**Do this instead:** Extract DOM offset tracking into a composable (e.g., `useScrollOffsets`) and either provide it via Vue `provide/inject` or move to Pinia if state grows further.

### Modal State as Flat Object in Root

**What happens:** `isExperienceModalOpenRef` is a plain object with one boolean per experience (`src/app.vue:95`). `openModalBySegment` and `toggleExperienceModal` both use long if/switch chains over this object.
**Why it's wrong:** Every new project/work entry requires changes in 4+ places in `app.vue`.
**Do this instead:** Use a single `activeModal: string | null` ref and derive open state from string comparison.

## Error Handling

**Strategy:** Minimal. No global error boundary.

**Patterns:**
- GLTF loads via `useGLTF` — no error handling if model fails to load
- Texture loads via callback — `loadedCount` increments on success only; failed textures silently stall the loading progress bar
- Type assertions (`!`) used in `CanvasComponent` when dereferencing textures after the `texturesLoaded` computed guard

## Cross-Cutting Concerns

**Logging:** `CoolConsoleLog.vue` renders a styled ASCII banner to the browser console on client mount. No structured logging.
**Validation:** None — no form inputs, no user-submitted data.
**Authentication:** Not applicable — purely public static portfolio.
**SEO:** Handled directly in `src/app.vue` `<Head>` block: meta tags, OG tags, Twitter card, canonical URL, schema.org via `nuxt-schema-org`.

---

*Architecture analysis: 2026-06-01*
