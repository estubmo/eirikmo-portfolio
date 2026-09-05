# Testing

100% test coverage is the key to great vibe coding. Tests let you move fast, trust
your instincts, and ship with confidence. Without them, vibe coding is just yolo
coding. With them, it's a superpower.

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
  smoke.spec.ts           hero, nav, no error page
  webgl-fallback.spec.ts  the site still works with WebGL blocked
```

## Conventions

- One `describe` per behaviour, not per file.
- Prefer role-based locators (`getByRole`, `getByText`) over CSS selectors.
- Assert what the visitor sees, not implementation details.
- Anything that depends on hydration must `await page.waitForLoadState("networkidle")`
  first. Nuxt renders valid SSR markup and only swaps in the error page after the
  client throws, so an assertion made too early passes with the bug still present.
- When you assert a fallback path, assert that the fallback condition really holds
  (`expect(hasWebGL2).toBe(false)`). Otherwise a broken test flag makes the test
  pass without exercising anything.

## Writing a regression test

Every bug fix gets a test that fails without the fix. Verify both directions:

```bash
git stash push -- <fixed-file>   # revert the fix
bun run test                     # must fail
git stash pop                    # restore
bun run test                     # must pass
```

Never import secrets or credentials into a test file.

## CI

`.github/workflows/test.yml` runs lint plus the full suite on every push to `main`
and every pull request, and uploads the Playwright report as an artifact.
