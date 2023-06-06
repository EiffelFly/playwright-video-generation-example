import { chromium } from "playwright";
import path from "path";
import { clickAnchorLink } from "./utils";

export default async function recordNestedLayoutHandler() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    recordVideo: {
      dir: path.resolve("videos"),
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
