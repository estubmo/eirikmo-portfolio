# Testing Patterns

**Analysis Date:** 2026-06-01

## Test Framework

**Runner:** None configured

No test runner config files are present in this repository:
- No `vitest.config.*`
- No `jest.config.*`
- No `cypress.config.*`
- No `playwright.config.*`

No test files (`*.test.*`, `*.spec.*`) were found anywhere in the project tree.

**Test scripts:** No `test` script in `package.json`.

## Current State

This codebase has **zero automated tests**. The project is a personal portfolio/marketing site with:
- No business logic beyond scroll position calculations and modal state management
- No API routes or server-side data mutations
- No form handling or user data processing
- One pure utility function: `src/utils/normalize.ts`

The `normalize` function is the only unit-testable pure function in the codebase. All other logic is tightly coupled to DOM measurements, Three.js WebGL rendering, and scroll event handlers.

## Test Infrastructure Available (in devDependencies)

Testing tools appear as technology showcase icons only — they are listed in `src/components/TechContainer.vue` as technologies the developer is familiar with, not as active project dependencies:
- Vitest (icon: `src/components/icons/VitestIcon.vue`)
- Playwright (icon: `src/components/icons/PlaywrightIcon.vue`)
- Jest (icon: `src/components/icons/JestIcon.vue`)
- Cypress (icon: `src/components/icons/CypressIcon.vue`)

None of these are in `package.json` `dependencies` or `devDependencies`.

## If Tests Were Added

### Recommended Framework

For this Nuxt 3 / Vue 3 stack, the recommended approach would be:

**Unit tests:** Vitest (aligns with Vite build pipeline used by Nuxt)
```bash
bun add -D vitest @vue/test-utils
```

**E2E tests:** Playwright (official Nuxt recommendation)
```bash
bun add -D @playwright/test
```

### Unit Test Candidate

The only unit-testable function is `src/utils/normalize.ts`:

```typescript
// normalize.test.ts
import { describe, expect, it } from "vitest";
import { normalize } from "./normalize";

describe("normalize", () => {
    it("clamps below min to 0", () => {
        expect(normalize(5, 10, 100)).toBe(0);
    });
    it("clamps above max to 1", () => {
        expect(normalize(200, 10, 100)).toBe(1);
    });
    it("handles negative min range", () => {
        expect(normalize(0, -50, 50)).toBe(0.5);
    });
});
```

### E2E Test Scope

If E2E tests were added, key flows to cover:
- Page loads and 3D canvas initializes (loading overlay disappears)
- Scroll navigation updates active nav segment
- Clicking a card opens its modal
- Modal closes via back button
- Hash-based deep linking opens correct modal (`/#ducky`)
- Responsive layout: mobile, tablet, desktop viewports

### File Placement Convention (if adopted)

Follow co-location pattern consistent with the existing `src/` structure:
```
src/
  utils/
    normalize.ts
    normalize.test.ts       # co-located unit tests
  components/
    ExperienceCard.vue
    ExperienceCard.test.ts  # co-located component tests (if any)
tests/
  e2e/
    navigation.spec.ts      # Playwright E2E tests in separate directory
```

## Coverage

**Requirements:** None enforced (no coverage config)

**Current coverage:** 0% — no tests exist

---

*Testing analysis: 2026-06-01*
