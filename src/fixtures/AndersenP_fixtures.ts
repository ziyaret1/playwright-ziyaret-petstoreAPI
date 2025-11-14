import { test as base, type Page } from "@playwright/test";
import { HomePage } from "../pages/AndersenPortal/homePage";

type MyFixtures = {
    page: Page;
    homePage: HomePage;
}

export const test = base.extend<MyFixtures>({
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        use(homePage)
    }
})