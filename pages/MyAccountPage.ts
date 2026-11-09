import { Page, Locator } from '@playwright/test';

export class MyAccountPage {
    private readonly page: Page;

    // Locators
    private readonly myAccountHeading: Locator;
    private readonly successMessage: Locator;
    private readonly logoutLink: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.myAccountHeading = page.locator('h2:has-text("My Account")');
        this.successMessage = page.locator('.alert-success');
        this.logoutLink = page.locator('.list-group a:has-text("Logout")');
    }

    /**
     * Verifies the My Account page is displayed
     * @returns Promise<boolean> - true if the heading is visible
     */
    async isMyAccountPageExists(): Promise<boolean> {
        try {
            return await this.myAccountHeading.isVisible();
        } catch (error) {
            console.log(`Error checking My Account page: ${error}`);
            return false;
        }
    }

    /**
     * Gets the success message text
     * @returns Promise<string> - success message text
     */
    async getSuccessMessage(): Promise<string> {
        return await this.successMessage.textContent() ?? '';
    }

    /**
     * Clicks the Logout link
     */
    async clickLogout(): Promise<void> {
        await this.logoutLink.click();
    }
}
