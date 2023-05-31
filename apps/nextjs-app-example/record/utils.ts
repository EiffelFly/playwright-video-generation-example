import { Page } from '@playwright/test';

export async function clickAnchorLink(page: Page, label: string) {
  const locator = page.getByRole('link', { name: label, exact: true });
  await locator.click();
}
