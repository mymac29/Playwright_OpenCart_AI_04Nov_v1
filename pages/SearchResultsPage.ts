import { Page, Locator } from '@playwright/test';

export class SearchResultsPage {
    private readonly page: Page;

    // Locators
    private readonly productHeading: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.productHeading = page.locator('.product-thumb h4 a');
    }

    /**
     * Clicks the first product link in the search results
     * @param productName - Product name to click
     */
    async clickProduct(productName: string): Promise<void> {
        await this.productHeading.filter({ hasText: productName }).first().click();
    }
}
