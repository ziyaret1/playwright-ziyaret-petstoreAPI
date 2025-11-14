import { expect } from "@playwright/test";
import { test } from "../../src/fixtures/AndersenP_fixtures";


test.describe('Consultation / News Slider', () => {
    test.beforeEach(async ({ homePage }) => {
        await homePage.openPage()
    })
    test('News Slider', async ({ homePage }) => {
        const firstTitles = await homePage.consultation.getDisplayedTitles();
        await homePage.consultation.scrollNext();
        const secondTitles = await homePage.consultation.getDisplayedTitles();
        await expect(secondTitles).not.toEqual(firstTitles)
    })
    test('Discuss your Project Modal', async ({ homePage }) => {
        await homePage.consultation.clickDiscussBtn()
        await expect(homePage.consultation.modalContainer).toBeVisible({ timeout: 10000 })
        await homePage.consultation.closeModal()
    })
})

test.describe('About Us / Map', () => {
    test.beforeEach(async ({ homePage }) => {
        await homePage.openPage()
    })
    test('Request Consultation Modal', async ({ homePage }) => {
        await homePage.aboutUs.clickConsultationBtn();
        await expect(homePage.aboutUs.consultationModal).toBeVisible()
        await homePage.aboutUs.clickCloseModalBtn();
    })
    test('Map should be visible on the About Us page', async ({ homePage }) => {
        const iframeCount = await homePage.aboutUs.mapIFrame.count();
        expect(iframeCount).toBeGreaterThan(0);
    })
})

test.describe.only("Testimonials Section", () => {
    test.beforeEach(async ({ homePage }) => {
        await homePage.openPage()
    })
     test("Testimonials section is visible", async ({ homePage }) => {
        await expect(homePage.testimonials.testimonialSection).toBeVisible({ timeout: 10000 });
    });

    test("Testimonial changes when a different logo is clicked", async ({ homePage }) => {
        const firstName = await homePage.testimonials.getActiveTestimonialName();
        await homePage.testimonials.clickLogo(1);
        const secondName = await homePage.testimonials.getActiveTestimonialName();
        expect(secondName).not.toEqual(firstName);
    });

    test("Scroll buttons work to change tabs", async ({ homePage }) => {
        await homePage.testimonials.clickScrollRight();
        await homePage.testimonials.clickScrollLeftIfVisible();
        const isRightVisible = await homePage.testimonials.isScrollButtonVisible("right");
        expect(isRightVisible).toBeTruthy();
    });
});

