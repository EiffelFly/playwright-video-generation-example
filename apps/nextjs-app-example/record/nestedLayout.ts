import { chromium } from "playwright";
import path from "path";
import { caption, clickAnchorLink, createRecordedPage } from "./utils";
import { installMouseHelper } from "./installMouseHelper";
import {
  InstallCaptionHelperConfig,
  installCaptionHelper,
} from "./installCaptionHelper";

const captionConfig: InstallCaptionHelperConfig = {
  root: {
    css: `
    .telecine-caption-helper-root {
      pointer-events: none;
      position: absolute;
      bottom: 250px;
      z-index: 10000;
      left: 0px;
      right: 0px;
      height: 200px;
      display: flex;
      justify-content: center;
    }`,
  },
  container: {
    css: `.telecine-caption-helper-container {
      pointer-events: none;
      width: 50%;
      font-size: 2rem;
      font-family: sans-serif;
      color: black;
      background: rgba(255, 255, 255, 0.8);
    }`,
  },
};

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
  await installCaptionHelper(page, captionConfig);

  await page.goto("/");
  await clickAnchorLink(page, "Nested Layouts");

  await page.waitForTimeout(2000);

  await clickAnchorLink(page, "Books");

  await page.waitForTimeout(2000);

  await clickAnchorLink(page, "Code Snippets");

  await page.waitForTimeout(2000);

  await clickAnchorLink(page, "Not Found");

  await page.waitForTimeout(2000);

  await caption("Hello world", page, async () => {
    await clickAnchorLink(page, "Category That Does Not Exist");

    await page.waitForTimeout(2000);
  });

  await saveVideo();

  await context.close();
  await browser.close();
}
