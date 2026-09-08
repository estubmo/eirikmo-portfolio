import { expect, test } from "@playwright/test";
import { activeNavLink, expectSiteUsable, scrollTo } from "./helpers";

// Section detection used to live inside CanvasComponent's render loop, so with no
// canvas mounted the nav highlight never moved off "top" no matter how far the
// visitor scrolled. It now comes from a composable both paths share, which means
// this has to hold in the no-WebGL project too.

test("the nav highlight follows the visitor down the page", async ({ page }) => {
    await page.goto("/");
    await expectSiteUsable(page);

    const expertise = page.locator("#expertise");
    const offset = await expertise.evaluate((el: HTMLElement) => el.offsetTop);

    await scrollTo(page, offset + 10);

    await expect(activeNavLink(page, "Expertise")).toBeVisible();
});
