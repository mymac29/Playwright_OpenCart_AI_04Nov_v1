import { Page, Locator } from '@playwright/test';

export class RegisterPage {
    private readonly page: Page;

    // Locators
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly emailInput: Locator;
    private readonly telephoneInput: Locator;
    private readonly passwordInput: Locator;
    private readonly passwordConfirmInput: Locator;
    private readonly privacyCheckbox: Locator;
    private readonly continueButton: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.firstNameInput = page.locator('#input-firstname');
        this.lastNameInput = page.locator('#input-lastname');
        this.emailInput = page.locator('#input-email');
        this.telephoneInput = page.locator('#input-telephone');
        this.passwordInput = page.locator('#input-password');
        this.passwordConfirmInput = page.locator('#input-confirm');
        this.privacyCheckbox = page.locator('input[type="checkbox"][name="agree"]');
        this.continueButton = page.getByRole('button', { name: 'Continue' });
    }

    /**
     * Fills the registration form and submits
     * @param firstName - First name
     * @param lastName - Last name
     * @param email - Email address
     * @param telephone - Telephone number
     * @param password - Password
     */
    async registerUser(firstName: string, lastName: string, email: string, telephone: string, password: string): Promise<void> {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.emailInput.fill(email);
        await this.telephoneInput.fill(telephone);
        await this.passwordInput.fill(password);
        await this.passwordConfirmInput.fill(password);
        await this.privacyCheckbox.check();
        await this.continueButton.click();
    }
}
