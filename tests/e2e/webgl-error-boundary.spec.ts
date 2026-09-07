import { expect, test } from "@playwright/test";
import { expectSiteUsable, failWebGL2, scene } from "./helpers";

// The capability probe in src/app.vue creates a detached canvas and asks for a
// bare webgl2 context. three.js asks for one with attributes, on a canvas that is
// in the document, and can still be refused after the probe passes. getContext can
// also throw instead of returning null. Both used to end at Nuxt's error handler
// and a 500 page, so the scene is wrapped in CanvasBoundary.
//
// These run in the "chromium" project, where WebGL genuinely works, and stub
// getContext to isolate each failure shape.

test.describe("WebGL fails after the probe passes", () => {
    test.beforeEach(async ({ page }) => {
        await failWebGL2(page, "null-when-connected");
        await page.goto("/");
    });

    test("the boundary keeps the site up", async ({ page }) => {
        await expectSiteUsable(page);
    });

    test("the boundary actually fired", async ({ page }) => {
        // Guard the guard. The stub keys on isConnected, so if TresJS ever builds
        // the renderer before the canvas is attached, the injection would miss and
        // the assertions above would pass without exercising anything.
        const probeSucceeds = await page.evaluate(() => !!document.createElement("canvas").getContext("webgl2"));
        expect(probeSucceeds, "probe must still pass, or this exercises the probe not the boundary").toBe(true);

        await expectSiteUsable(page);

        // CanvasBoundary caught the throw and the parent dropped the scene.
        await expect(scene(page)).toHaveCount(0);
    });
});

test.describe("getContext throws instead of returning null", () => {
    test.beforeEach(async ({ page }) => {
        await failWebGL2(page, "always-throw");
        await page.goto("/");
    });

    test("the probe catches it and falls back", async ({ page }) => {
        const probeThrows = await page.evaluate(() => {
            try {
                document.createElement("canvas").getContext("webgl2");
                return false;
            } catch {
                return true;
            }
        });
        expect(probeThrows, "injection must make getContext throw").toBe(true);

        await expectSiteUsable(page);
        await expect(scene(page)).toHaveCount(0);
    });
});
