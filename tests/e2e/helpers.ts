import { expect, type Page } from "@playwright/test";

export const navLink = (page: Page, name: string) => page.getByRole("link", { name }).first();

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
 * The nav is v-show'd on isAppReady, which only client code sets, so waiting on it
 * is a deterministic hydration barrier. networkidle is not: Playwright discourages
 * it, and this page keeps fetching models, textures and fonts long enough for it to
 * resolve before hydration has thrown.
 */
export async function expectSiteUsable(page: Page) {
    await expect(navLink(page, "Expertise")).toBeVisible();
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

/**
 * The page scrolls inside a Simplebar container, not the window, so
 * `window.scrollTo` and `mouse.wheel` do not move it.
 *
 * There is more than one `.simplebar-content-wrapper` on the page (the modals
 * bring their own), and the first in document order is a collapsed one, so pick
 * the instance that actually scrolls rather than the first match.
 */
export async function scrollTo(page: Page, offset: number) {
    await page.evaluate((top) => {
        const scroller = [...document.querySelectorAll(".simplebar-content-wrapper")].find(
            (element) => element.scrollHeight > element.clientHeight,
        );

        scroller?.scrollTo({ top, behavior: "instant" });
    }, offset);
}

/** A nav link is active when it carries text-zinc-100 rather than text-zinc-400. */
export function activeNavLink(page: Page, name: string) {
    return page.locator(`nav a.text-zinc-100`, { hasText: name });
}
