import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { RegisterPage } from '../pages/RegisterPage';
import { RegisterSuccessPage } from '../pages/RegisterSuccessPage';
import { LoginPage } from '../pages/LoginPage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { LogoutPage } from '../pages/LogoutPage';
import dotenv from 'dotenv';

dotenv.config();

const APP_URL = process.env.WEB_APP_URL || 'http://localhost/opencart/upload/';

type PageFixtures = {
    homePage: HomePage;
    registerPage: RegisterPage;
    registerSuccessPage: RegisterSuccessPage;
    loginPage: LoginPage;
    myAccountPage: MyAccountPage;
    productPage: ProductPage;
    cartPage: CartPage;
    searchResultsPage: SearchResultsPage;
    logoutPage: LogoutPage;
};

export const test = base.extend<PageFixtures>({
    homePage: async ({ page }, use) => {
        await page.goto(APP_URL);
        await use(new HomePage(page));
    },
    registerPage: async ({ page }, use) => {
        await use(new RegisterPage(page));
    },
    registerSuccessPage: async ({ page }, use) => {
        await use(new RegisterSuccessPage(page));
    },
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    myAccountPage: async ({ page }, use) => {
        await use(new MyAccountPage(page));
    },
    productPage: async ({ page }, use) => {
        await use(new ProductPage(page));
    },
    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },
    searchResultsPage: async ({ page }, use) => {
        await use(new SearchResultsPage(page));
    },
    logoutPage: async ({ page }, use) => {
        await use(new LogoutPage(page));
    }
});

export { expect } from '@playwright/test';
