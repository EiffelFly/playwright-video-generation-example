import { Page } from "playwright";

export type InstallCaptionHelperConfig = {
  root: {
    css: string;
  };
  container: {
    css: string;
  };
};

export async function installCaptionHelper(
  page: Page,
  config: InstallCaptionHelperConfig,
) {
  await page.addInitScript((config) => {
    // Install mouse helper only for top-level frame.
    if (window !== window.parent) return;
    window.addEventListener(
      "DOMContentLoaded",
      () => {
        const captionRoot = document.createElement("div");
        captionRoot.classList.add("telecine-caption-helper-root");

        const captionContainer = document.createElement("div");
        captionContainer.classList.add("telecine-caption-helper-container");
        const captionContainerStyle = document.createElement("style");
        captionContainerStyle.innerHTML = config.container.css;
        captionRoot.appendChild(captionContainer);

        const captionRootStyle = document.createElement("style");
        captionRootStyle.innerHTML = config.root.css;
        document.body.appendChild(captionRoot);
        document.head.appendChild(captionRootStyle);
        document.head.appendChild(captionContainerStyle);
      },
      false,
    );

    window.addEventListener("update-caption", (e) => {
      console.log((e as CustomEvent).detail);
      const captionContainer = document.querySelector(
        ".telecine-caption-helper-container",
      );

      if (!captionContainer) {
        return;
      }

      captionContainer.textContent = (e as CustomEvent).detail;
    });
  }, config);
}
