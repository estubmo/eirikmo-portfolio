import { expect, test } from "@playwright/test";

test("renders the hero and navigation", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { name: "Eirik Mo", level: 2 })).toBeVisible();
    await expect(page.getByRole("link", { name: "Expertise" }).first()).toBeVisible();
    await expect(page.getByText("Open to remote contract work")).toBeVisible();
});

test("does not render an error page", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("body")).not.toContainText("Internal Server Error");
});
