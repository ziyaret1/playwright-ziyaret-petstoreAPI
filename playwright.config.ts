import { defineConfig, devices } from "@playwright/test";
// Imporst for .env
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  // reporter: [["list"], ["allure-playwright"]],
  reporter: [
  ["list"],
  ["allure-playwright"],
  ["html", { outputFolder: "playwright-report", open: "never" }]
],
  use: {
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],
});
