import { expect, test } from "@playwright/test";
import { expectSiteUsable, loadingOverlay, scene } from "./helpers";

// Regression test for the Brave 500 page.
//
// three.js only asks for a "webgl2" context and throws
// "Error creating WebGL context." when the browser returns null. That throw used
// to escape TresCanvas during mount, land in Nuxt's app.config.errorHandler, and
// replace the whole site with the default 500 page. src/app.vue now probes for
// webgl2 up front and falls back to the flat background.
//
// playwright.config.ts runs this file only in the "chromium-no-webgl" project,
// which launches the browser with --disable-3d-apis.
test.describe("WebGL unavailable", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/");

        // Guard the guard: if --disable-3d-apis ever stops working, these tests
        // would pass without exercising the fallback at all.
        const hasWebGL2 = await page.evaluate(() => !!document.createElement("canvas").getContext("webgl2"));
        expect(hasWebGL2).toBe(false);
    });

    test("serves the full site instead of a 500 page", async ({ page }) => {
        await expectSiteUsable(page);
    });

    test("clears the loading overlay", async ({ page }) => {
        // hasFinishedLoading is normally emitted by CanvasComponent. Without the
        // canvas the fallback has to set it, or the overlay covers the site forever.
        // expectSiteUsable asserts the overlay is gone, not merely that content
        // exists underneath it.
        await expectSiteUsable(page);
    });

    test("reveals the site promptly instead of holding a black screen", async ({ page }) => {
        // The stock reveal is paced for the 3D scene fading in behind the overlay:
        // the overlay leaves on delay-1000 duration-1000 and the nav enters on a
        // 2000ms delay. With no canvas there is nothing to wait for, and the
        // overlay is the same colour as the page, so those delays just showed a
        // black screen for ~2s and read as a hang.
        const startedAt = Date.now();
        await page.goto("/");
        await expect(loadingOverlay(page)).toBeHidden({ timeout: 20_000 });
        const revealedAfter = Date.now() - startedAt;

        expect(revealedAfter, `overlay took ${revealedAfter}ms to clear`).toBeLessThan(1500);
    });

    test("does not mount the 3D scene", async ({ page }) => {
        await expectSiteUsable(page);
        await expect(scene(page)).toHaveCount(0);
    });
});
