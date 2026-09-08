import { expect, test } from "@playwright/test";
import { expectSiteUsable, loadingOverlay } from "./helpers";

// The site sits behind a full-screen overlay until CanvasComponent reports its
// textures are done. That report used to be counted against a hardcoded 7 while 10
// textures were loading, and none of the loads had an error callback. So the
// report fired three textures early, progress ran past 100%, and once four or more
// textures failed the count never arrived at all and the overlay covered the site
// forever.

const TEXTURES = [
    "**/textures/work/ducky/ducky-repeat.jpg",
    "**/textures/work/knitry/knitry-repeat.jpg",
    "**/textures/work/adtube/adtube-repeat.jpg",
    "**/textures/work/cheffelo/cheffelo-repeat.jpg",
];

// Comfortably under the 10s watchdog, so these prove the error path counts a
// failed texture as settled rather than proving the watchdog eventually fires.
const BEFORE_WATCHDOG = 6_000;

test("reveals the site when several textures 404", async ({ page }) => {
    // Four, because six successes is short of the old hardcoded total of seven.
    for (const texture of TEXTURES) {
        await page.route(texture, (route) => route.fulfill({ status: 404 }));
    }

    await page.goto("/");

    await expect(loadingOverlay(page)).toBeHidden({ timeout: BEFORE_WATCHDOG });
    await expectSiteUsable(page);
});

test("reveals the site when several texture requests never respond", async ({ page }) => {
    // three.js reports load errors but has nothing to say about a request that
    // simply hangs. This is the watchdog's job, so it is allowed to take longer.
    for (const texture of TEXTURES) {
        await page.route(texture, () => {
            /* never fulfilled, never aborted */
        });
    }

    await page.goto("/");

    await expect(loadingOverlay(page)).toBeHidden({ timeout: 30_000 });
    await expectSiteUsable(page);
});

test("the loading bar never runs past full", async ({ page }) => {
    // Record every value the bar is ever set to. Polling for this raced past the
    // interesting values when textures settled fast, and blew the test timeout
    // when they were slowed down enough to be sampled.
    await page.addInitScript(() => {
        const widths: number[] = [];
        (window as unknown as { __loadingWidths: number[] }).__loadingWidths = widths;

        const read = (element: Element) => {
            const match = (element.getAttribute("style") ?? "").match(/width:\s*(-?[\d.]+)%/);
            if (match) widths.push(Number(match[1]));
        };

        const attach = () => {
            const bar = document.querySelector('[class*="z-[80]"] .max-w-xl');
            if (!bar) return false;

            read(bar);
            new MutationObserver(() => read(bar)).observe(bar, { attributes: true, attributeFilter: ["style"] });
            return true;
        };

        if (!attach()) {
            const pending = new MutationObserver(() => {
                if (attach()) pending.disconnect();
            });
            pending.observe(document, { childList: true, subtree: true });
        }
    });

    await page.goto("/");
    await expectSiteUsable(page);

    const samples = await page.evaluate(
        () => (window as unknown as { __loadingWidths: number[] }).__loadingWidths ?? [],
    );

    // fillerStyles is width: `${100 - progress}%`. Counting 10 textures against a
    // hardcoded total of 7 drove progress to 142.8% and this width to -42.85%.
    expect(samples.length, "expected to observe the loading bar being updated").toBeGreaterThanOrEqual(10);
    expect(samples.filter((width) => width < 0 || width > 100)).toEqual([]);
});
