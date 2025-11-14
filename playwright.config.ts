import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '.env') });
export default defineConfig({
    testDir: path.join(__dirname, 'tests'),
    testMatch: '**/*.spec.ts',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: [
        ['list'],
        ['allure-playwright'],
        ['junit', { outputFile: 'test-results/junit-results.xml', includeTestOutput: true }],
    ],
    use: {
        trace: 'on-first-retry',
        baseURL: 'https://andersenlab.com/',
        headless: false,
        launchOptions: {
            slowMo: 1000, // 5000 ms = 5 second break
        },
    },
    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
            },
        },
    ],
});
