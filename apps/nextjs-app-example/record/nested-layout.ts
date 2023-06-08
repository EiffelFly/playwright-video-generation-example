import { chromium } from "playwright";
import path from "path";
import { clickAnchorLink } from "./utils";
import { installMouseHelper } from "./installMouseHelper";

export default async function recordNestedLayoutHandler() {
  const browser = await chromium.launch({
    headless: true,
  });
  const context = await browser.newContext({
    recordVideo: {
      dir: path.resolve("..", "..", "remote-data"),
      size: {
        width: 1920,
        height: 1080,
      },
    },
    viewport: {
      width: 1920,
      height: 1080,
    },
    baseURL: "http://localhost:3000",
  });
  const page = await context.newPage();
  await installMouseHelper(page);
  await page.goto("/");
  await clickAnchorLink(page, "Nested Layouts");

  await page.waitForTimeout(2000);

  await clickAnchorLink(page, "Books");

  await page.waitForTimeout(2000);

  await clickAnchorLink(page, "Code Snippets");

  await page.waitForTimeout(2000);

  await clickAnchorLink(page, "Not Found");

  await page.waitForTimeout(2000);

  await clickAnchorLink(page, "Category That Does Not Exist");

  await page.waitForTimeout(2000);

  await context.close();
  await browser.close();
}
