import { FrameLocator, Locator, Page } from "@playwright/test";

export class AboutUsSection {
    readonly page: Page;
    readonly consultationBtn: Locator;
    readonly consultationModal: Locator;
    readonly mapContainer: Locator;
    readonly closeModalBtn: Locator;
    readonly mapIFrame: Locator;

    constructor(page: Page) {
        this.page = page;
        this.consultationBtn = page.locator(
            'button:has-text("Request consultation")'
        );
        this.consultationModal = page.locator(
            '.Modal-module--container--210f5'
        );
        this.mapContainer = page.locator(
            'div[style*="position: absolute"][style*="touch-action: pan-x pan-y"]'
        );
        this.closeModalBtn = page.getByRole('button', { name: 'Close' });
        this.mapIFrame = page.locator('iframe[src*="google.com/maps"]');
    }

    async clickConsultationBtn() {
        await this.consultationBtn.click()
    }
    async clickCloseModalBtn() {
        await this.closeModalBtn.click();
    }
}