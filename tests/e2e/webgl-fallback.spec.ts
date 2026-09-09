import { expect, test } from "@playwright/test";
import { expectSiteUsable, navLink, scene } from "./helpers";

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

    test("shows the nav and hero, not a bare page", async ({ page }) => {
        // The nav and socials are v-show'd on isAppReady. Before the fallback
        // existed they were gated on the 3D scene reporting in, which never
        // happened here.
        await expectSiteUsable(page);
    });

    test("is readable without waiting on anything", async ({ page }) => {
        // The reveal used to be paced for the 3D scene fading in behind an overlay:
        // the overlay left on delay-1000 duration-1000 and the nav entered on a
        // 2000ms delay. With no scene there was nothing to wait for, and the overlay
        // was the same colour as the page, so this was ~2.5s of black screen.
        const startedAt = Date.now();
        await page.goto("/");
        await expect(navLink(page, "Expertise")).toBeVisible({ timeout: 20_000 });
        const readableAfter = Date.now() - startedAt;

        expect(readableAfter, `took ${readableAfter}ms to become readable`).toBeLessThan(3_000);
    });

    test("does not mount the 3D scene", async ({ page }) => {
        await expectSiteUsable(page);
        await expect(scene(page)).toHaveCount(0);
    });
});
