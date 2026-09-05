import { defineConfig, devices } from "@playwright/test";

const PORT = 3123;
const baseURL = `http://localhost:${PORT}`;

export default defineConfig({
    testDir: "./tests/e2e",
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: process.env.CI ? "github" : "list",
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
            testMatch: /webgl-fallback\.spec\.ts/,
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
        reuseExistingServer: !process.env.CI,
        timeout: 300_000,
    },
});
