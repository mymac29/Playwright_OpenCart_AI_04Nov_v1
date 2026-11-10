import { Page, Locator } from '@playwright/test';

export class CartPage {
    private readonly page: Page;

    // Locators
    private readonly cartHeading: Locator;
    private readonly productNameCell: Locator;
    private readonly quantityInput: Locator;
    private readonly unitPriceCell: Locator;
    private readonly totalPriceCell: Locator;
    private readonly cartTotal: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.cartHeading = page.locator('h1');
        this.productNameCell = page.locator('.table-bordered tbody tr td a').nth(1);
        this.quantityInput = page.locator('.table-bordered tbody input[name*="quantity"]');
        this.unitPriceCell = page.locator('tr:has-text("Palm Treo Pro") td.text-right').nth(1);
        this.totalPriceCell = page.locator('tr:has-text("Palm Treo Pro") td.text-right').nth(2);
        this.cartTotal = page.locator('.table-bordered tr:has(td:has-text("Total:")) td:last-child').last();
    }

    /**
     * Verifies the shopping cart page is displayed
     * @returns Promise<boolean> - true if the heading is visible
     */
    async isCartPageExists(): Promise<boolean> {
        try {
            return await this.cartHeading.isVisible();
        } catch (error) {
            console.log(`Error checking cart page: ${error}`);
            return false;
        }
    }

    /**
     * Gets the product name in the cart
     * @returns Promise<string> - product name
     */
    async getProductName(): Promise<string> {
        return await this.productNameCell.textContent() ?? '';
    }

    /**
     * Gets the quantity value
     * @returns Promise<string> - quantity
     */
    async getQuantity(): Promise<string> {
        return await this.quantityInput.inputValue();
    }

    /**
     * Gets the unit price text
     * @returns Promise<string> - unit price
     */
    async getUnitPrice(): Promise<string> {
        return await this.unitPriceCell.first().textContent() ?? '';
    }

    /**
     * Gets the total price text
     * @returns Promise<string> - total price
     */
    async getTotalPrice(): Promise<string> {
        return await this.totalPriceCell.first().textContent() ?? '';
    }

    /**
     * Gets the cart total amount
     * @returns Promise<string> - cart total
     */
    async getCartTotal(): Promise<string> {
        return await this.cartTotal.textContent() ?? '';
    }

    async isProductInCart(productName: string): Promise<boolean> {
        return await this.page.locator('.table-bordered tbody tr')
            .filter({ hasText: productName }).count() > 0;
    }

    async getProductQuantity(): Promise<string> {
        return await this.getQuantity();
    }
}
