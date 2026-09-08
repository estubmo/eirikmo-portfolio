import { defineConfig, devices } from "@playwright/test";

const PORT = 3123;
const baseURL = `http://localhost:${PORT}`;

export default defineConfig({
    testDir: "./tests/e2e",
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    // The github reporter writes no files. Without the html reporter, the CI
    // artifact upload has nothing to collect and a failing run leaves nothing to
    // debug from.
    reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
    use: {
        baseURL,
        trace: "on-first-retry",
    },
    projects: [
        {
            name: "chromium",
            testIgnore: /webgl-fallback\.spec\.ts/,
            use: { ...devices["Desktop Chrome"] },
        },
        {
            // Brave with aggressive fingerprint shields, and machines with GPU
            // acceleration off, return null from getContext("webgl2").
            // --disable-3d-apis reproduces that exactly.
            name: "chromium-no-webgl",
            testMatch: /(webgl-fallback|navigation)\.spec\.ts/,
            use: {
                ...devices["Desktop Chrome"],
                launchOptions: { args: ["--disable-3d-apis"] },
            },
        },
    ],
    webServer: {
        command: "bun run build && node .output/server/index.mjs",
        url: baseURL,
        env: { PORT: String(PORT) },
        // Reuses whatever is already serving on this port, which keeps local
        // iteration fast. It also means a stale server serves a stale build:
        // stop it before verifying that a test fails without its fix. See
        // TESTING.md.
        reuseExistingServer: !process.env.CI,
        // A cold `nuxt build` of a three.js app on a shared CI runner is slow.
        timeout: 600_000,
    },
});
