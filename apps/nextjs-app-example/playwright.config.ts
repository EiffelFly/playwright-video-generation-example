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
    viewport: { width: 1920, height: 1080 },
    video: {
      mode: 'off',
      size: { width: 1920, height: 1080 },
    },
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
