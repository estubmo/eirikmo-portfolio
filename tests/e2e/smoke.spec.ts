import { expect, test } from "@playwright/test";
import { expectSiteUsable, navLink, scene } from "./helpers";

test("renders the hero and navigation", async ({ page }) => {
    await page.goto("/");

    await expectSiteUsable(page);
    await expect(navLink(page, "Expertise")).toBeVisible();
    await expect(page.getByText("Available now")).toBeVisible();
    await expect(page.getByText("From 90 EUR/h")).toBeVisible();
    await expect(page.getByText("B2B via Mo Web Dev AS")).toBeVisible();
});

test("mounts the 3D scene when WebGL is available", async ({ page }) => {
    await page.goto("/");
    await expectSiteUsable(page);

    // Pins the selector the fallback specs assert the absence of. Without this,
    // a renamed canvas would make every toHaveCount(0) there vacuously true, and
    // a regression that killed the scene for everyone would ship green.
    await expect(scene(page)).toHaveCount(1);
    await expect(scene(page)).toBeVisible();
});
