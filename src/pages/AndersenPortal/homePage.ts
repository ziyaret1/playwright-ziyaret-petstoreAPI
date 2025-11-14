import { Page } from "@playwright/test";
import { ConsultationSection } from "./consultationSection";
import { AboutUsSection } from "./aboutUsSection";
import { TestimonalsSection } from "./testimonalsSection";

export class HomePage {
    readonly page: Page;
    readonly consultation: ConsultationSection;
    readonly aboutUs: AboutUsSection;
    readonly testimonials: TestimonalsSection;

    constructor(page: Page) {
        this.page = page;
        this.consultation = new ConsultationSection(page)
        this.aboutUs = new AboutUsSection(page)
        this.testimonials = new TestimonalsSection(page)
    }
    async openPage() {
        await this.page.goto('/')
    }
}