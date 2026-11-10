import { Page, Locator } from '@playwright/test';

export class HomePage {
    private readonly page: Page;

    // Locators
    private readonly myAccountLink: Locator;
    private readonly registerLink: Locator;
    private readonly loginLink: Locator;
    private readonly searchBox: Locator;
    private readonly searchButton: Locator;
    private readonly macBookLink: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.myAccountLink = page.locator('.list-inline a[href*="route=account/account"]');
        this.registerLink = page.locator('a:has-text("Register")');
        this.loginLink = page.locator('a:has-text("Login")');
        this.searchBox = page.getByPlaceholder('Search');
        this.searchButton = page.locator('#search button');
        this.macBookLink = page.locator('a:has-text("MacBook")').first();
    }

    async navigateTo(url: string): Promise<void> {
        await this.page.goto(url);
    }

    /**
     * Navigates directly to the Register page
     */

    async clickMyAccount(): Promise<void> {
        await this.myAccountLink.click();
    }

    async isMyAccountLinkVisible(): Promise<boolean> {
        return await this.myAccountLink.isVisible();
    }

    async clickRegister(): Promise<void> {
        await this.page.goto(`${process.env.WEB_APP_URL || 'http://localhost/opencart/upload/'}index.php?route=account/register`);
    }

    /**
     * Navigates directly to the Login page
     */
    async clickLogin(): Promise<void> {
        await this.page.goto(`${process.env.WEB_APP_URL || 'http://localhost/opencart/upload/'}index.php?route=account/login`);
    }

    /**
     * Searches for a product
     * @param productName - Product name to search
     */
    async searchProduct(productName: string): Promise<void> {
        await this.searchBox.fill(productName);
        await this.searchButton.click();
    }

    /**
     * Clicks the MacBook product link
     */
    async clickMacBook(): Promise<void> {
        await this.macBookLink.click();
    }
}
