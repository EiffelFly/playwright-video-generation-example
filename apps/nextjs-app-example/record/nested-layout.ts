import { chromium } from "playwright";
import path from "path";
import { clickAnchorLink } from "./utils";
import { createCursor } from "ghost-cursor-playwright";

export default async function recordNestedLayoutHandler() {
  const browser = await chromium.launch({
    headless: false,
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
  const cursor = createCursor(page);

  await clickAnchorLink(page, "Nested Layouts");

  await page.waitForTimeout(4000);

  await context.close();
  await browser.close();
}
