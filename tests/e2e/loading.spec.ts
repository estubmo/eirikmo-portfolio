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
    await expect(page.getByText("React · Next.js · TypeScript · Node.js")).toBeVisible();
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

test("the platform evidence is in the page without opening a modal", async ({ browser }) => {
    // Server-rendered and visible on the card, because a skimming visitor will not
    // click into a project to find the thing that differentiates the profile.
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();

    await page.goto("/");

    // On the card, visible while skimming. "104 containers" alone also matches the
    // modal paragraph, which is display:none until opened.
    await expect(page.getByText("Self-hosted platform")).toBeVisible();

    // In the modal, server-rendered so crawlers and answer engines read it even
    // though a visitor has to click for it. Located by text rather than by role:
    // the modal container is aria-hidden until opened, so it is not in the
    // accessibility tree even while its markup is in the response.
    await expect(page.locator("h3", { hasText: "Running It In Production" })).toBeAttached();
    await expect(page.getByText("two Hetzner hosts")).toBeAttached();

    await context.close();
});
