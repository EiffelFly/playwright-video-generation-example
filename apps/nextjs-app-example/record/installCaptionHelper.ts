import { Page } from "playwright";

export async function installCaptionHelper(page: Page) {
  await page.addInitScript(() => {
    // Install mouse helper only for top-level frame.
    if (window !== window.parent) return;
    window.addEventListener(
      "DOMContentLoaded",
      () => {
        const caption = document.createElement("div");
        caption.classList.add("telecine-caption-helper");
        caption.innerHTML = `Text content`;
        const captionStyle = document.createElement("style");
        captionStyle.innerHTML = `
        .telecine-caption-helper {
          pointer-events: none;
          position: absolute;
          bottom: 250px;
          z-index: 10000;
          left: 0px;
          right: 0px;
          height: 200px;
          background: rgba(255,255,255,0.5);
          border: 1px solid white;
          font-size: 20px;
          color: black;
          font-family: sans-serif;
        }
      `;
        document.head.appendChild(captionStyle);
        document.body.appendChild(caption);
      },
      false,
    );
  });
}
