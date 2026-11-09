import { Page, Locator } from '@playwright/test';

export class LoginPage {
    private readonly page: Page;

    // Locators
    private readonly emailInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.emailInput = page.getByLabel('E-Mail Address');
        this.passwordInput = page.getByLabel('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
    }

    /**
     * Logs in with the given credentials
     * @param email - Email address
     * @param password - Password
     */
    async login(email: string, password: string): Promise<void> {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}
