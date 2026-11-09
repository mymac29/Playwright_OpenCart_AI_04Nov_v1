import { Page, Locator } from '@playwright/test';

export class LogoutPage {
    private readonly page: Page;

    // Locators
    private readonly logoutHeading: Locator;
    private readonly continueButton: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.logoutHeading = page.locator('h1:has-text("Account Logout")');
        this.continueButton = page.getByRole('link', { name: 'Continue' });
    }

    /**
     * Verifies the logout page is displayed
     * @returns Promise<boolean> - true if the heading is visible
     */
    async isLogoutPageExists(): Promise<boolean> {
        try {
            return await this.logoutHeading.isVisible();
        } catch (error) {
            console.log(`Error checking logout page: ${error}`);
            return false;
        }
    }

    /**
     * Clicks the Continue button to return to home
     */
    async clickContinue(): Promise<void> {
        await this.continueButton.click();
    }
}
