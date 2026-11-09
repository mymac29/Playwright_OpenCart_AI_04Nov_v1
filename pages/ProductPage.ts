import { Page, Locator } from '@playwright/test';

export class ProductPage {
    private readonly page: Page;

    // Locators
    private readonly productHeading: Locator;
    private readonly quantityInput: Locator;
    private readonly addToCartButton: Locator;
    private readonly successMessage: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.productHeading = page.locator('h1');
        this.quantityInput = page.locator('#input-quantity');
        this.addToCartButton = page.getByRole('button', { name: 'Add to Cart' });
        this.successMessage = page.locator('.alert.alert-success');
    }

    /**
     * Gets the product heading text
     * @returns Promise<string> - product name
     */
    async getProductName(): Promise<string> {
        return await this.productHeading.textContent() ?? '';
    }

    /**
     * Adds the product to the cart with the specified quantity
     * @param quantity - Quantity to add
     */
    async addToCart(quantity: string): Promise<void> {
        // Handle alert dialog triggered by PHP cache warning in JSON response
        this.page.once('dialog', async dialog => {
            await dialog.accept();
        });
        await this.quantityInput.fill(quantity);
        await this.addToCartButton.click();
    }

    /**
     * Verifies the product page is displayed
     * @returns Promise<boolean> - true if the heading is visible
     */
    async isProductPageExists(): Promise<boolean> {
        try {
            return await this.productHeading.isVisible();
        } catch (error) {
            console.log(`Error checking product page: ${error}`);
            return false;
        }
    }
}
