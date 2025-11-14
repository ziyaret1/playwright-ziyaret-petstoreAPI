import { Locator, Page } from "@playwright/test";

export class ConsultationSection {
    readonly page: Page;
    readonly newsContainer: Locator;
    readonly nextButton: Locator;
    readonly prevButton: Locator;
    readonly activeSlide: Locator;
    readonly discussProjectBtn: Locator;
    readonly modalContainer: Locator;
    readonly closeButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.newsContainer = page.locator('section[class*="News-module--container"]');
        this.nextButton = this.newsContainer.locator('button.slick-next');
        this.prevButton = this.newsContainer.locator('button.slick-prev');
        this.activeSlide = this.newsContainer.locator('.slick-slide.slick-active');
        this.discussProjectBtn = page.getByRole('button', { name: "Let’s discuss your project" });
        this.modalContainer = page.locator('div[class*="Modal-module--container"]');
        this.closeButton = this.modalContainer.locator('button[aria-label="Close"]');
    }
    async getDisplayedTitles(): Promise<string[]> {
        const titles = await this.activeSlide.locator('.NewsItem-module--title--b4ebe').allInnerTexts();
        return titles
    }
    async scrollNext() {
        await this.nextButton.click();
    }
    async scrollPrev() {
        await this.prevButton.click();
    }
    async clickDiscussBtn() {
        await this.discussProjectBtn.click()
    }
    async closeModal(){
        await this.closeButton.click()
    }
}