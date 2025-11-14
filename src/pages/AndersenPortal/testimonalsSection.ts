import { Locator, Page, expect } from "@playwright/test";

export class TestimonalsSection {
    readonly page: Page;
    readonly testimonialSection: Locator;
    readonly logoButtons: Locator;
    readonly reviewCards: Locator;
    readonly readMoreButtons: Locator;
    readonly modalContainer: Locator;
    readonly scrollRightButton: Locator;
    readonly scrollLeftButton: Locator;
    readonly activeName: Locator;

    constructor(page: Page) {
        this.page = page;
        this.testimonialSection = page.locator('#testimonials');
        this.logoButtons = page.locator('#testimonials [role="tab"]');
        this.reviewCards = page.locator('#testimonials article.ReviewInfo-module--card--cdaea:visible');
        this.readMoreButtons = page.locator(
            '#testimonials section[role="tabpanel"]:not([hidden]) button.ReviewInfo-module--popupLink--357c0'
        ).first();
        this.modalContainer = page.locator('[class*="Modal-module--container"].active');
        this.scrollRightButton = page.locator('#testimonials button[aria-label="Scroll Right"]:not([hidden])');
        this.scrollLeftButton = page.locator('#testimonials button[aria-label="Scroll Left"]:not([hidden])');
        this.activeName = page.locator(
            '#testimonials section[role="tabpanel"]:not([hidden]) [class*="PersonalData-module--name"]'
        );
    }

    async clickLogo(index: number) {
        const currentName = await this.activeName.textContent();
        await this.logoButtons.nth(index).click();
        await this.activeName.waitFor({ state: "visible", timeout: 10000 });
        await expect(this.activeName).not.toHaveText(currentName!);
    }

    async getActiveTestimonialName(): Promise<string | null> {
        const activePanel = this.page.locator('#testimonials section[role="tabpanel"]:not([hidden])');
        return await activePanel.locator('[class*="PersonalData-module--name"]').first().textContent();
    }

    async isTestimonialVisible(): Promise<boolean> {
        await this.testimonialSection.scrollIntoViewIfNeeded();
        await expect(this.reviewCards.first()).toBeVisible({ timeout: 10000 });
        return true;
    }

    async clickScrollRight(): Promise<void> {
        await this.scrollRightButton.scrollIntoViewIfNeeded();
        await this.scrollRightButton.waitFor({ state: "visible", timeout: 10000 });
        await this.scrollRightButton.click();
    }

    async clickScrollLeftIfVisible(): Promise<void> {
        if (await this.scrollLeftButton.isVisible()) {
            await this.scrollLeftButton.scrollIntoViewIfNeeded();
            await this.scrollLeftButton.click();
        }
    }

    async isScrollButtonVisible(direction: "left" | "right"): Promise<boolean> {
        const button = direction === "left" ? this.scrollLeftButton : this.scrollRightButton;
        await button.waitFor({ state: "visible", timeout: 10000 });
        return await button.isVisible();
    }
}
