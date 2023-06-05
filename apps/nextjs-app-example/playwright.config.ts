import { defineConfig, devices } from '@playwright/test';

import dotenv from 'dotenv';

// import .env environment variables
dotenv.config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */

if (!process.env.NEXT_PUBLIC_BASE_URL) {
  throw new Error('NEXT_PUBLIC_BASE_URL env not set');
}

export default defineConfig({
  testDir: './record',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],

        // device default configuration will override the global viewport configuration
        // https://github.com/microsoft/playwright/issues/13673#issuecomment-1105621745
        viewport: {
          width: 1920,
          height: 1080,
        },
        video: {
          mode: 'on',
          size: { width: 1920, height: 1080 },
        },
      },
    },
  ],
  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
