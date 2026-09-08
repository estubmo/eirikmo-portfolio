import { expect, test } from "@playwright/test";
import { expectSiteUsable, nameHeading, navLink } from "./helpers";

// The site used to sit behind an opaque full-screen overlay until ten 3D textures
// finished loading, so the first thing a visitor could read was gated on the
// heaviest thing on the page. Nothing waits on the scene now.

test("the hero is readable with JavaScript disabled", async ({ browser }) => {
    // The strongest form of the claim: if the pitch survives with no client code at
    // all, it cannot be gated on the scene, on hydration, or on a texture request.
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();

    await page.goto("/");

    await expect(nameHeading(page)).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Senior Full-Stack Engineer");
    await expect(page.getByText("Available now")).toBeVisible();
    await expect(page.getByText("From 90 EUR/h")).toBeVisible();

    await context.close();
});

test("blocking every texture does not affect the site", async ({ page }) => {
    await page.route("**/textures/**", (route) => route.fulfill({ status: 404 }));

    await page.goto("/");

    await expectSiteUsable(page);
});

test("blocking every texture request indefinitely does not affect the site", async ({ page }) => {
    // Hanging requests are the case three.js never reports, so they used to leave
    // the overlay up permanently.
    await page.route("**/textures/**", () => {
        /* never fulfilled, never aborted */
    });

    await page.goto("/");

    await expectSiteUsable(page);
});

test("the nav appears without waiting for the scene", async ({ page }) => {
    const startedAt = Date.now();
    await page.goto("/");
    await expect(navLink(page, "Expertise")).toBeVisible({ timeout: 20_000 });
    const readableAfter = Date.now() - startedAt;

    expect(readableAfter, `nav took ${readableAfter}ms to appear`).toBeLessThan(3_000);
});
