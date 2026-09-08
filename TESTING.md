# Testing

Tests let you move fast, trust your instincts, and ship with confidence. Without
them, vibe coding is just yolo coding.

The policy here is end-to-end only, and one regression test per bug fix, verified
to fail without the fix. There is no coverage tooling and no coverage number to
hit, because the failures this site actually suffers are browser runtime failures
that a percentage would not have caught.

## Framework

[Playwright](https://playwright.dev) (`@playwright/test`). End-to-end only.

This site is a single Nuxt page whose interesting behaviour is browser runtime:
WebGL availability, hydration, scroll-driven animation. Component-level unit tests
would have to mock the exact browser APIs that break, so they would not catch the
failures that actually reach visitors. Playwright drives a real browser instead.

## Running

```bash
bun run test          # full suite, both projects
bun run test:ui       # interactive runner
bun run test --project=chromium            # WebGL available
bun run test --project=chromium-no-webgl   # WebGL blocked
```

`playwright.config.ts` builds the site and boots the Nitro server on port 3123
before the first test. Locally an already-running server on that port is reused.

## Projects

| Project             | Browser flags       | Runs                                       |
| ------------------- | ------------------- | ------------------------------------------ |
| `chromium`          | none                | everything except `webgl-fallback.spec.ts` |
| `chromium-no-webgl` | `--disable-3d-apis` | only `webgl-fallback.spec.ts`              |

`--disable-3d-apis` makes `canvas.getContext("webgl2")` return null, which is what
Brave does with aggressive fingerprint shields and what any machine with GPU
acceleration disabled does. That is the exact condition that used to replace the
whole site with a 500 page.

## Layout

```
tests/e2e/
  helpers.ts                   shared locators, hydration barrier, fault injection
  smoke.spec.ts                hero, nav, and the scene mounting when WebGL works
  webgl-fallback.spec.ts       the site still works with WebGL blocked
  webgl-error-boundary.spec.ts the probe passes but context creation still fails
  loading.spec.ts              failed and hung textures still reveal the site
  navigation.spec.ts           the nav highlight follows the visitor on scroll
```

`webgl-fallback.spec.ts` runs only in `chromium-no-webgl`. `navigation.spec.ts`
runs in both, because the nav highlight is exactly what used to break without a
canvas. Everything else runs in `chromium`.

## Conventions

- One `describe` per behaviour, not per file.
- Prefer role-based locators (`getByRole`, `getByText`) over CSS selectors.
- Assert what the visitor sees, not implementation details.
- Anything that depends on hydration must go through `expectSiteUsable()` from
  `helpers.ts`, which waits on the nav (v-show'd on `hasFinishedLoading`, so only
  client code can reveal it). Do not use `waitForLoadState("networkidle")`:
  Playwright discourages it, and this page keeps fetching models, textures and
  fonts long enough for it to resolve before hydration has thrown. Nuxt serves
  valid SSR markup and only swaps in the error page afterwards, so an assertion
  made too early passes with the bug fully present.
- A negative assertion alone proves nothing. `not.toContainText(...)` is
  auto-retrying, so it passes on its first poll, before hydration. Always anchor it
  behind a positive assertion that can only hold post-hydration.
- `toBeVisible()` ignores z-index occlusion. Asserting that content exists says
  nothing about the full-screen loading overlay stacked on top of it, so assert the
  overlay is hidden too. `expectSiteUsable()` does both.
- When you assert a fallback path, assert that the fallback condition really holds
  (`expect(hasWebGL2).toBe(false)`, `expect(probeSucceeds).toBe(true)`). Otherwise a
  broken test flag makes the test pass without exercising anything.
- To observe a value that changes faster than you can poll, record it with a
  `MutationObserver` installed via `addInitScript` and read it back at the end.
  Polling either raced past the interesting values or blew the test timeout. Note
  that `document.documentElement` can still be null that early; observe `document`.
- Playwright runs route handlers one at a time, so per-route delays accumulate.
  Ten routes at 100ms is 4.5s of wall clock, not 100ms.
- The page scrolls inside Simplebar, not the window, and there is more than one
  `.simplebar-content-wrapper`. Use `scrollTo()` from `helpers.ts`, which picks the
  instance that actually scrolls.
- Every negative assertion needs a positive counterpart somewhere. `toHaveCount(0)`
  on `canvas#canvas` is vacuously true if the selector stops matching, which is why
  `smoke.spec.ts` asserts the scene does mount when WebGL works.

## Writing a regression test

Every bug fix gets a test that fails without the fix. Verify both directions:

```bash
# reuseExistingServer means a server already on :3123 is reused, stale build and
# all. Skip this kill and the revert step silently tests the fixed build.
kill $(ss -lptn 'sport = :3123' | grep -oP 'pid=\K[0-9]+' | sort -u)
rm -rf .output

cp src/some/file.vue /tmp/fixed          # keep the fix
git show HEAD:src/some/file.vue > src/some/file.vue
bun run test                             # must fail
cp /tmp/fixed src/some/file.vue          # restore
bun run test                             # must pass
```

Copy the file aside rather than using `git stash`: stash refuses to run when other
files in the tree are intent-to-add (`git add -N`), and it fails loudly enough to
be missed in a long test log.

Prefer reverting one behaviour at a time over reverting a whole file. Reverting a
file wholesale can change an unrelated prop contract and make the run fail for the
wrong reason, which proves nothing. Each of the three fixes in `loading.spec.ts`
and `navigation.spec.ts` was verified by mutating exactly one line or block.

Never import secrets or credentials into a test file.

## CI

`.github/workflows/test.yml` runs lint plus the full suite on every push to `main`
and every pull request, and uploads the Playwright report as an artifact.
