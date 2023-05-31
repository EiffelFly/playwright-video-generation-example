import { test, expect } from '@playwright/test';
import { clickAnchorLink } from './utils';

test('Should record a video to showcase the nested layout', async ({
  page,
}) => {
  await page.goto('/');

  await clickAnchorLink(page, 'Nested Layouts');
});
