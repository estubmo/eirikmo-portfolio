# Codebase Concerns

**Analysis Date:** 2026-06-01

## Known Bugs

**signatureApi mobile texture uses wrong source map:**
- Symptoms: On mobile viewports, the SignatureAPI card shows the FotballFeber texture instead of its own texture.
- Files: `src/components/CanvasComponent.vue` (line 450)
- Trigger: Visit site on mobile while scrolling to the SignatureAPI work card, or open its modal.
- Root cause: `signatureApiMobileClone` is cloned from `fotballfeberMap!` instead of `signatureApiMap!`.
- Workaround: None.

**Body overflow toggled only against `fotballfeber` modal state:**
- Symptoms: Opening any modal other than `fotballfeber` does not set `document.body.overflow = "hidden"`, and closing any modal immediately resets it to `"auto"` even if another modal is still open.
- Files: `src/app.vue` (line 261)
- Trigger: Open the Ducky, Knitry, Cheffelo, Adtube, Webtop, or SvanhildStub modal.
- Root cause: The condition reads `isExperienceModalOpenRef.value.fotballfeber` instead of the computed `isModalOpenRef.value`.
- Workaround: None.

**Texture loading count mismatch (`totalTextures = 7` but 10 textures loaded):**
- Symptoms: `hasFinishedLoading` event fires after only 7 callbacks, while 10 texture loads are initiated. The loading bar reaches 100% and the page reveals before the last 3 textures have finished loading, potentially leaving them missing at first render.
- Files: `src/components/CanvasComponent.vue` (lines 184–236)
- Root cause: `totalTextures` is hardcoded as `7` but there are 10 `textureLoader.load()` calls (alpha, eirik, fotballfeber, svanhildstub, ducky, knitry, signatureapi, adtube, cheffelo, webtop).
- Workaround: None visible; the remaining textures load asynchronously anyway.

## Tech Debt

**`CanvasComponent.vue` is a 1276-line god component:**
- Issue: All 3D scene logic — camera animation, texture loading and cloning, per-frame update loop, light management, and viewport detection — lives in a single file. It accepts 20+ props from `app.vue`.
- Files: `src/components/CanvasComponent.vue`, `src/app.vue`
- Impact: Extremely high cognitive load to modify. Adding a new work/project card requires touching 7+ separate material ref blocks plus the `updateObjects` if-chain. Bugs are hard to isolate.
- Fix approach: Extract texture management into a composable (`useSceneTextures`), camera logic into `useCameraAnimation`, and the segment → params dispatch into a lookup map rather than a chain of `else if` blocks.

**`app.vue` is a 624-line root component containing all state:**
- Issue: `app.vue` manages scroll positions, modal states, hover targets, and loading progress inline. It passes 20+ props to `CanvasComponent`. No composables are extracted.
- Files: `src/app.vue`
- Impact: Adding a new experience card requires changes in at least 8 places in this file: a new `ref`, a new `scrollRefs` entry, a new case in `openModalBySegment`, a new case in `toggleExperienceModal`, two DOM bindings for the card, one modal `<MyModal>` block, and one `<CanvasComponent>` prop.
- Fix approach: Extract state into composables (`useModalState`, `useScrollTracking`). Replace per-card boolean state with a map keyed on segment ID.

**Per-card `else if` chain for segment → 3D scene params:**
- Issue: `updateObjects` in `CanvasComponent.vue` (lines 1023–1093) uses a long chain of `else if` comparisons matching hover/modal states to `set*Params()` functions. Adding a new card means appending another 4-line block to this chain.
- Files: `src/components/CanvasComponent.vue`
- Impact: O(n) dispatch, hard to read, easy to forget a case.
- Fix approach: Replace with a lookup object: `const segmentParamMap = { fotballfeber: setFotballFeberParams, ... }` and call `segmentParamMap[hoverTarget.value]?.()`.

**Duplicate `useMouse` / `useWindowSize` composable instances:**
- Issue: `useWindowSize` is instantiated separately in `CanvasComponent.vue`, `CustomLamp.vue`, and `FixPixelRatio.vue`. `useMouse` is instantiated separately in `CanvasComponent.vue` and `CustomLamp.vue`.
- Files: `src/components/CanvasComponent.vue`, `src/components/CustomLamp.vue`, `src/components/FixPixelRatio.vue`
- Impact: Multiple independent reactive subscriptions to the same DOM events. VueUse's `useWindowSize` is shared within a `<script setup>` call but not across component instances. Minor overhead; more importantly, it creates confusion about which is the authoritative source.
- Fix approach: Accept `width`, `height`, `mouseX`, `mouseY` as props from `CanvasComponent`, or use provide/inject.

**Dual lockfiles (`bun.lock` + `package-lock.json`):**
- Issue: Both `bun.lock` and `package-lock.json` exist at the repo root.
- Files: `/bun.lock`, `/package-lock.json`
- Impact: `npm install` and `bun install` can diverge. CI or contributors using npm will install different dependency trees.
- Fix approach: Delete `package-lock.json` and add it to `.gitignore`. The project declares `bun` as its package manager.

**`gsap` listed in package.json keywords but not installed or used:**
- Issue: `"gsap"` appears in the `keywords` array of `package.json` but is not in `dependencies`/`devDependencies` and no import of GSAP exists anywhere in the source.
- Files: `package.json` (line 18)
- Impact: Misleads contributors and search indexers.
- Fix approach: Remove `"gsap"` from keywords.

**`physicallyCorrectLights` is a deprecated Three.js flag:**
- Issue: `physicallyCorrectLights: true` is passed in the `gl` renderer config object. This property was deprecated in Three.js r150 and removed in a later release; physical lighting is now the default.
- Files: `src/components/CanvasComponent.vue` (line 157)
- Impact: May produce a console warning with newer Three.js builds or silently do nothing.
- Fix approach: Remove the `physicallyCorrectLights` key from the `gl` object.

**`window.addEventListener` calls without cleanup in component setup:**
- Issue: `CustomLamp.vue` (lines 46–47) and `CustomStatsGl.vue` (line 7) call `window.addEventListener` at the top level of `<script setup>` with no corresponding `removeEventListener` in `onBeforeUnmount` / `onUnmounted`.
- Files: `src/components/CustomLamp.vue`, `src/components/CustomStatsGl.vue`
- Impact: If these components are ever unmounted and remounted (e.g., during hot module replacement or future routing changes), the listeners accumulate, causing duplicate event handling and memory leaks.
- Fix approach: Wrap in `onMounted` / clean up in `onBeforeUnmount`, or use VueUse's `useEventListener` which auto-cleans.

**Hard-coded `setTimeout(1000)` for initial hash navigation:**
- Issue: `onFirstLoad` in `app.vue` (line 176) uses a 1-second `setTimeout` to delay scroll-to-hash after initial load. This is a guess at how long textures take to load rather than a response to an actual ready signal.
- Files: `src/app.vue` (lines 168–184)
- Impact: On slow connections the scene may not be ready; on fast connections there is an unnecessary 1-second delay.
- Fix approach: Drive scroll from the `hasFinishedLoading` event that already exists, gating the `scrollIntoView` behind the actual loading completion signal.

**Module-level mutable `let loadedCount` in component:**
- Issue: `loadedCount` in `CanvasComponent.vue` (line 185) is declared as a bare `let` at module scope. In Vue's component model with `<script setup>`, this is scoped to the component instance but is not reactive — if the component ever re-initialises (HMR, SSR hydration edge cases) the counter does not reset.
- Files: `src/components/CanvasComponent.vue` (line 185)
- Impact: Low risk in production (single-page app, component mounted once), but HMR texture-reload sequences may emit `hasFinishedLoading` prematurely.
- Fix approach: Convert to `ref<number>(0)` or encapsulate inside the `onTextureLoaded` closure.

## Performance Bottlenecks

**Per-frame `new Vector3` / `new Euler` allocations in the render loop:**
- Problem: In `updateObjects`, every frame that has scrolled creates `new Vector3(...)` for mouse position (line 943) and `new Euler(...)` for mouse rotation (line 947), plus `new Color(...)` twice for light colour damping (lines 1105–1106). This produces GC pressure at 60fps (~240 allocations/second from these alone).
- Files: `src/components/CanvasComponent.vue` (lines 943, 947, 1105, 1106)
- Cause: Three.js objects are allocated inline rather than reused.
- Improvement path: Pre-allocate and mutate (`mousePositionRef.value.set(...)`, `mouseRotationRef.value.set(...)`, create one `Color` temp object and reuse it).

**`new Vector3` / `new Euler` / `new Color` in template bindings:**
- Problem: The `<template>` section of `CanvasComponent.vue` contains ~15 `new Vector3()`, `new Euler()`, and `new Color()` constructor calls in attribute bindings (e.g., `:position="new Vector3(0, 0.15, -1)"`). These re-run on every render triggered by reactive dependencies.
- Files: `src/components/CanvasComponent.vue` (lines 1144–1255)
- Cause: Object construction inside template expression.
- Improvement path: Hoist as `const` values in `<script setup>` so they are created once.

**All 10 textures loaded eagerly at component mount via bare `textureLoader.load` calls:**
- Problem: All textures are requested immediately when `CanvasComponent` mounts, including textures for work/project cards that are only visible after the user scrolls through multiple sections.
- Files: `src/components/CanvasComponent.vue` (lines 196–236)
- Cause: No deferred or lazy loading strategy.
- Improvement path: Load the portrait (`eirik`) and alpha textures first; load card textures progressively as the user scrolls into each section.

## Fragile Areas

**Scroll-driven 3D state in `updateObjects` tightly couples DOM layout to WebGL:**
- Files: `src/components/CanvasComponent.vue` (lines 890–1116), `src/app.vue` (lines 588–620)
- Why fragile: Camera and scene state is calculated from `offsetTop`/`offsetHeight` of DOM elements passed as 20+ individual numeric props. Any layout change (reordering sections, adding a new card, changing viewport breakpoints) requires matching updates to props, constants in `deviceVectors.ts`, and the `updateObjects` dispatch chain. There are no tests or assertions that these values are in range.
- Safe modification: When adding a new card, update all eight locations: the `ref`, `scrollRefs` array, `openModalBySegment`, `toggleExperienceModal`, DOM `id`/`ref` binding, `<MyModal>` block, `<CanvasComponent>` offset props, and the `updateObjects` dispatch.
- Test coverage: None.

**`CanvasComponent` inside `<ClientOnly>` with no error boundary:**
- Files: `src/app.vue` (lines 587–621)
- Why fragile: If `useGLTF` or any `await` inside a Custom model component fails (network error, malformed GLTF), the error propagates uncaught. There is no `<Suspense>` error slot at the `<ClientOnly>` level.
- Safe modification: Wrap the `<ClientOnly>` block in a `<Suspense>` with a `#fallback` and an error boundary component, or use `useAsyncData` error handling.
- Test coverage: None.

## Security Considerations

**External links open in `target="_blank"` without `rel="noopener noreferrer"`:**
- Risk: Some `<a target="_blank">` links in content components may not include `rel="noopener noreferrer"`, leaving them open to reverse tabnapping.
- Files: `src/components/FooterComponent.vue`, work/project content components.
- Current mitigation: Some links (in `SocialsComponent.vue`) include `target="_blank"` without `rel` checked comprehensively. Audit needed.
- Recommendations: Add `rel="noopener noreferrer"` to all `target="_blank"` anchor elements.

## Test Coverage Gaps

**No test suite exists:**
- What's not tested: All business logic — scroll segment detection, texture loading completion, modal open/close state, hash-based deep linking, viewport detection, the `normalize` utility, the `toggleExperienceModal` dispatch.
- Files: Entire `src/` directory.
- Risk: Regressions in any of the above are only caught by manual visual inspection.
- Priority: High for the `normalize` utility and modal state machine; Medium for visual/3D behaviour.

---

*Concerns audit: 2026-06-01*
