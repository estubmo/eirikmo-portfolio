# Coding Conventions

**Analysis Date:** 2026-06-01

## Naming Patterns

**Files:**
- Vue components: PascalCase with descriptive suffix — `ExperienceCard.vue`, `NavBarComponent.vue`, `DuckyCard.vue`
- Sub-component variants: `[Entity]Card.vue` for card previews, `[Entity]Content.vue` for modal detail views
- Icons: `[TechName]Icon.vue` — `TypeScriptIcon.vue`, `TailwindIcon.vue`, `GcpIcon.vue`
- TypeScript utilities: camelCase — `normalize.ts`
- Constants: camelCase — `deviceVectors.ts`
- Config files: their ecosystem convention — `nuxt.config.ts`, `tailwind.config.ts`, `eslint.config.mjs`, `.prettierrc.cjs`

**Functions:**
- camelCase — `openModalBySegment`, `handleHashChange`, `toggleExperienceModal`, `onUpdateProgress`
- Event handlers prefixed with `on` — `onScroll`, `onFirstLoad`, `onHasFinishedLoading`, `onUpdateCurrentSegment`
- Touch handlers prefixed with `handle` — `handleTouchStart`, `handleTouchEnd`

**Variables and refs:**
- Reactive refs always suffixed with `Ref` — `scrollY` is plain `ref`, but component refs use `Ref` suffix: `containerRef`, `simpleBarRef`, `isModalOpenRef`, `hoverTargetRef`, `cameraRef`, `spotLightRef`
- State-holding shallowRefs suffixed with `State` — `alphaTextureState`, `duckyTextureState`
- Plain reactive objects without suffix — `canvasStyle`, `gl`, `param`

**Types:**
- PascalCase type aliases — `ModalSegment`, `PageSegment`, `ViewPort`, `GithubInfo`
- String literal union types used heavily — `type ViewPort = "desktop" | "tablet" | "mobile"`
- `as const` on deeply-typed constant objects — `deviceVectors.ts`

**Props:**
- camelCase in TypeScript — `onClick`, `onMouseOver`, `onMouseLeave`, `workInProgress`
- Nuxt/Vue automatically converts to kebab-case in templates — `:on-click`, `:work-in-progress`

## Code Style

**Formatting (Prettier):**
- Double quotes for strings (no single quotes)
- 4-space indentation
- Trailing commas everywhere
- Semicolons required
- Config: `.prettierrc.cjs`

**Linting (ESLint):**
- Flat config format: `eslint.config.mjs`
- Base: `@nuxt/eslint-config/flat` with `tooling: true`
- Plugins: `prettier`, `tailwindcss`, `jsx-a11y`
- Tailwind class order enforced by Prettier (eslint rule turned off)
- `@typescript-eslint/no-unused-vars` set to `warn` (not error)
- Occasional `// eslint-disable-next-line` inline suppressions for necessary `any` — `src/components/CustomDesktop.vue:15`

**Import sorting:**
- Handled by `@ianvs/prettier-plugin-sort-imports` Prettier plugin
- Observed order: third-party packages alphabetically first, then `~/` aliased local imports, then relative imports

## Vue Component Structure

**Always use `<script setup lang="ts">` syntax** — no Options API, no `export default`:
```vue
<script setup lang="ts">
import { toRefs } from "vue";

const props = defineProps<{ ... }>();
const { onClick } = toRefs(props);
</script>
```

**Props pattern — always typed with generic, always destructured with `toRefs`:**
```typescript
const props = defineProps<{
    onClick: () => void;
    onMouseOver: () => void;
    workInProgress?: boolean;
}>();
const { onClick, onMouseOver, workInProgress } = toRefs(props);
```

Exception: simple icon components that use props directly without `toRefs` when accessed only in template:
```typescript
const { height, width } = defineProps({
    height: { type: Number, required: true },
    width: { type: Number, required: true },
});
```

**Emits:**
- Use `defineEmits` without type generics when event names are plain strings:
```typescript
const emit = defineEmits(["updateProgress", "hasFinishedLoading", "updateCurrentSegment"]);
```
- Parent receives emits as `@update-progress` (kebab-case in template)

**Slots:**
- Named slots used for layout composition in card/content pairs:
  - `#logo` — company/project logo
  - `#default` — main content text
  - `#tech` — tech icon list
- Scoped slots used in `TechIcon.vue`: `v-slot="slotProps"` to pass `height`/`width` down

## Import Organization

**Order (auto-sorted by Prettier plugin):**
1. Third-party packages (`@tresjs/cientos`, `@vueuse/core`, `maath/easing`, `three`, `vue`)
2. Nuxt alias imports (`~/components/...`)
3. Relative imports (`../constants/...`, `./CustomStatsGl.vue`)

**Type-only imports use `import type`:**
```typescript
import type { DirectionalLight, Mesh, PerspectiveCamera } from "three";
import type { ComputedRef, StyleValue } from "vue";
```

**Path aliases:**
- `~/` resolves to `src/` (Nuxt default with `srcDir: "src/"`)
- Relative `../` and `./` used for same-directory or one-level-up imports

## Tailwind CSS Usage

**Utility-first — no custom CSS classes except Tailwind config extensions:**
- Custom screen: `3xl:` = 1920px breakpoint
- Custom font: `Inter` via `fontFamily.sans`
- No custom `@apply` blocks observed

**Color palette:** Zinc scale for text (`text-zinc-200`, `text-zinc-400`), arbitrary values for brand colors (`bg-[#00040C]`, `bg-[#062C3F]`)

**Responsive pattern:** mobile-first with `sm:`, `md:`, `lg:`, `xl:`, `3xl:` breakpoints

**Transition classes:** Tailwind `transition-*` utilities used directly — `transition-opacity duration-500 ease-in-out`

## Animation Directives

VueUse Motion custom directives defined in `nuxt.config.ts` and applied as HTML attributes:
- `v-motion-slide-visible-once-left-custom` — slides in from left on scroll-into-view
- `v-motion-slide-visible-once-right-custom` — slides in from right
- `v-motion-pop-visible-once-custom` — scales in from 0
- `v-motion-fade-visible-once-custom` — fades in

All custom directives share: `delay: 200ms`, `duration: 300ms`, `type: "keyframes"`, `ease: "easeInOut"`.

## 3D / Three.js Conventions

**ShallowRef for Three.js objects** (avoids deep reactivity on large objects):
```typescript
const alphaTextureState = shallowRef<Texture | null>(null);
```

**Reactive for plain config objects:**
```typescript
const canvasStyle = reactive({ display: "block", position: "fixed", ... });
```

**Damping with maath/easing** for smooth camera interpolation:
```typescript
damp3(cameraRef.value.position, targetPosition, param.positionSmoothing, delta);
dampE(cameraRef.value.rotation, targetAngle, param.lookAtSmoothing, delta);
```

**Device vectors** as frozen `as const` object in `src/constants/deviceVectors.ts` — never mutate, read-only.

## Error Handling

**No try/catch patterns observed** in this codebase — it is a static portfolio site with no form submissions or user-generated data. Errors are not explicitly handled.

**Null safety:**
- Optional chaining used consistently — `ref.value?.scrollIntoView(...)`, `meRef?.offsetTop || 0`
- Non-null assertion used sparingly when type is known — `state.value!.scene`
- Explicit `|| 0` fallbacks for numeric props passed to CanvasComponent

**TypeScript strict mode is enabled** (`strict: true` in `nuxt.config.ts`), though `typeCheck` is disabled due to `vue-tsc` 3.x compatibility issues.

## Logging

- No structured logging — this is a client-side portfolio site
- `console.log` used intentionally once in `src/components/CoolConsoleLog.vue` to render a styled ASCII art greeting in browser DevTools
- No debug logging in production code paths

## Comments

**When to comment:**
- Explain non-obvious behavior or temporary workarounds — `// eslint-disable-next-line @typescript-eslint/no-explicit-any`
- Disabled transitions have commented-out code preserved — `src/components/HeaderComponent.vue` lines 2 and 80
- Section labels within large files — `// Load textures using Three.js TextureLoader`

**No JSDoc/TSDoc** — types are expressed inline via TypeScript generics. No function-level documentation.

## Module Design

**No barrel files (`index.ts`)** — each component is imported by its full path.

**Exports:** Components export nothing explicitly (Nuxt auto-imports); utilities use named exports (`export function normalize`); constants use named exports (`export const device`).

**Nuxt auto-imports:** Nuxt composables (`useRouter`, `useFetch`) and Vue APIs (`ref`, `computed`, `watch`) are auto-importable but this codebase still imports them explicitly — a deliberate choice for clarity.

---

*Convention analysis: 2026-06-01*
