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
        this.successMessage = page.getByText('Success: You have added', { exact: false });
    }


    async setQuantity(quantity: string | number): Promise<void> {
        await this.quantityInput.fill(String(quantity));
    }

    async clickAddToCart(): Promise<void> {
        this.page.once('dialog', async dialog => {
            await dialog.accept();
        });
        await this.addToCartButton.click();
    }

    async isSuccessMessageVisible(): Promise<boolean> {
        try {
            await this.successMessage.waitFor({
                state: 'visible',
                timeout: 10000
            });
            return true;
        } catch {
            return false;
        }
    }

    async getSuccessMessage(): Promise<string> {
        return await this.successMessage.innerText();
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
        await this.productHeading.waitFor({
            state: 'visible',
            timeout: 10000
        });
        return true;
    } catch (error) {
        console.log('Current URL:', this.page.url());
        console.log('H1 count:', await this.productHeading.count());
        console.log('H1 text:', await this.productHeading.allTextContents());
        console.log('Product page check failed:', error);
        return false;
    }
}
}
