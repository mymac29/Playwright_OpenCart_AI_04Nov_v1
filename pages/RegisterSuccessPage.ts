import { Page, Locator } from '@playwright/test';

export class RegisterSuccessPage {
    private readonly page: Page;

    // Locators
    private readonly successHeading: Locator;
    private readonly continueButton: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.successHeading = page.locator('h1:has-text("Your Account Has Been Created!")');
        this.continueButton = page.getByRole('link', { name: 'Continue' });
    }

    /**
     * Verifies the registration success page is displayed
     * @returns Promise<boolean> - true if the heading is visible
     */
    async isRegisterSuccessPageExists(): Promise<boolean> {
        try {
            return await this.successHeading.isVisible();
        } catch (error) {
            console.log(`Error checking registration success page: ${error}`);
            return false;
        }
    }

    /**
     * Clicks the Continue button to proceed to My Account
     */
    async clickContinue(): Promise<void> {
        await this.continueButton.click();
    }
}