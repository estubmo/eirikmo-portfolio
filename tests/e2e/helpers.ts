import { expect, type Page } from "@playwright/test";

export const navLink = (page: Page, name: string) => page.getByRole("link", { name }).first();

// The full-screen loading overlay, v-show'd on !hasFinishedLoading (src/app.vue).
export const loadingOverlay = (page: Page) => page.locator("div.z-\\[80\\]");

export const nameHeading = (page: Page) => page.getByRole("heading", { name: "Eirik Mo", level: 2 });

export const scene = (page: Page) => page.locator("canvas#canvas");

// Nuxt's error page renders the status code as its h1 (error-500.vue). Asserting
// on the heading rather than the words "Internal Server Error" keeps this from
// quietly becoming a no-op if Nuxt rewords the copy or the error carries its own
// statusMessage.
export const errorPageHeading = (page: Page) => page.getByRole("heading", { name: "500", level: 1 });

/**
 * Waits for hydration, then asserts the visitor got the site rather than an error
 * page.
 *
 * The nav is v-show'd on hasFinishedLoading, which only ever gets set by client
 * code, so waiting on it is a deterministic hydration barrier. networkidle is not:
 * Playwright discourages it, and this page keeps fetching models, textures and
 * fonts long enough for it to resolve before hydration has thrown.
 *
 * The overlay assertion matters on its own. Playwright's toBeVisible() ignores
 * z-index occlusion, so content assertions alone pass happily underneath a
 * full-screen opaque overlay.
 */
export async function expectSiteUsable(page: Page) {
    await expect(navLink(page, "Expertise")).toBeVisible();

    // The overlay leaves on `delay-1000 duration-1000`, and v-show only applies
    // display:none once that finishes, so it needs more than the 5s default to
    // stop counting as visible. Opacity alone would not satisfy toBeHidden.
    await expect(loadingOverlay(page)).toBeHidden({ timeout: 15_000 });

    await expect(nameHeading(page)).toBeVisible();
    await expect(errorPageHeading(page)).toHaveCount(0);
}

type Webgl2Failure = "null-when-connected" | "always-throw";

/**
 * Makes getContext("webgl2") fail in a specific way.
 *
 * "null-when-connected" refuses only canvases attached to the document. The
 * capability probe in src/app.vue uses a detached canvas, so the probe passes and
 * three.js is what fails, which exercises CanvasBoundary rather than the probe.
 *
 * "always-throw" covers hardened browsers that raise instead of returning null.
 */
export async function failWebGL2(page: Page, mode: Webgl2Failure) {
    await page.addInitScript((failureMode: Webgl2Failure) => {
        const original = HTMLCanvasElement.prototype.getContext;

        HTMLCanvasElement.prototype.getContext = function (this: HTMLCanvasElement, type: string, ...rest: unknown[]) {
            if (type === "webgl2") {
                if (failureMode === "always-throw") throw new Error("SecurityError: WebGL is blocked");
                if (this.isConnected) return null;
            }

            return (original as (...args: unknown[]) => unknown).call(this, type, ...rest);
        } as typeof HTMLCanvasElement.prototype.getContext;
    }, mode);
}
