import { chromium } from "playwright";
import path from "path";
import { clickAnchorLink } from "./utils";

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
  await page.goto("/");

  await clickAnchorLink(page, "Nested Layouts");

  await page.waitForTimeout(4000);

  await context.close();
  await browser.close();
}
