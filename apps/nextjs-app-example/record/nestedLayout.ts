import { chromium } from "playwright";
import path from "path";
import { clickAnchorLink, createRecordedPage } from "./utils";
import { installMouseHelper } from "./installMouseHelper";
import { installCaptionHelper } from "./installCaptionHelper";

export default async function recordNestedLayoutHandler() {
  const browser = await chromium.launch({
    headless: false,
  });

  const videoPath = path.resolve("..", "..", "apps", "docs", "public");

  const context = await browser.newContext({
    recordVideo: {
      dir: videoPath,
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

  const { page, saveVideo } = await createRecordedPage({
    context,
    baseDir: videoPath,
    videoName: "nested-layout",
  });

  await installMouseHelper(page);
  await installCaptionHelper(page);

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

  await page.pause();

  await saveVideo();

  await context.close();
  await browser.close();
}
