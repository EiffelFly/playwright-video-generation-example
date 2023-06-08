import { Page } from "@playwright/test";
import { path } from "ghost-cursor";
import { mousePosition } from "./store";

export async function clickAnchorLink(page: Page, label: string) {
  const locator = page.getByRole("link", { name: label, exact: true });

  const locatorPosition = await locator.boundingBox();

  if (!locatorPosition) {
    throw new Error(`Could not find element with label ${label}`);
  }

  let lastPosition = mousePosition[mousePosition.length - 1];

  if (!lastPosition) {
    lastPosition = { x: 0, y: 0 };
  }

  const nextPosition = {
    x: locatorPosition.x + locatorPosition.width / 2,
    y: locatorPosition.y + locatorPosition.height / 2,
  };

  const mousePath = path(lastPosition, nextPosition, { moveSpeed: 50 }) as {
    x: number;
    y: number;
  }[];

  for (const pos of mousePath) {
    await page.mouse.move(pos.x, pos.y);
  }

  mousePosition.push(nextPosition);

  await locator.click();
}
