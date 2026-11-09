/**
 * Test Case: End-to-End Shopping Flow
 *
 * Tags: @master @end-to-end @web
 *
 * Steps:
 * 1) Open the application
 * 2) Register a new customer using dynamically generated data
 * 3) Verify successful registration
 * 4) Log out
 * 5) Log in again using the newly created credentials
 * 6) Verify successful authentication
 * 7) Search for MacBook
 * 8) Open the product details page
 * 9) Add the product to the cart
 * 10) Open the shopping cart
 * 11) Verify the correct product
 * 12) Verify the quantity
 * 13) Verify the product price
 * 14) Verify the applicable cart total
 * 15) Verify the complete journey finishes without errors
 */

import { test, expect } from '../../fixtures/pageFixtures';
import { RandomDataUtil } from '../../utils/dataGenerator';

test.describe('End-to-End Shopping Flow', () => {

    test('Complete customer shopping journey @master @end-to-end @web', async ({
        homePage, registerPage, registerSuccessPage, loginPage, myAccountPage,
        productPage, cartPage, searchResultsPage, logoutPage, page
    }) => {
        // Generate unique registration data
        const firstName = RandomDataUtil.getFirstName();
        const lastName = RandomDataUtil.getLastName();
        const email = RandomDataUtil.getEmail();
        const telephone = RandomDataUtil.getPhoneNumber();
        const password = RandomDataUtil.getPassword();

        let capturedEmail = '';
        let capturedPassword = '';

        await test.step('1) Open the application', async () => {
            // homePage fixture already navigates to the app URL
            await expect(page).toHaveTitle(/Your Store/);
        });

        await test.step('2) Register a new customer', async () => {
            await homePage.clickRegister();
            await registerPage.registerUser(firstName, lastName, email, telephone, password);
            capturedEmail = email;
            capturedPassword = password;
        });

        await test.step('3) Verify successful registration', async () => {
            const isSuccessPage = await registerSuccessPage.isRegisterSuccessPageExists();
            expect(isSuccessPage).toBeTruthy();
            await registerSuccessPage.clickContinue();
            const isMyAccountPage = await myAccountPage.isMyAccountPageExists();
            expect(isMyAccountPage).toBeTruthy();
        });

        await test.step('4) Log out', async () => {
            await myAccountPage.clickLogout();
            const isLogoutPage = await logoutPage.isLogoutPageExists();
            expect(isLogoutPage).toBeTruthy();
        });

        await test.step('5) Log in again with new credentials', async () => {
            await logoutPage.clickContinue();
            await homePage.clickLogin();
            await loginPage.login(capturedEmail, capturedPassword);
        });

        await test.step('6) Verify successful authentication', async () => {
            const isMyAccountPage = await myAccountPage.isMyAccountPageExists();
            expect(isMyAccountPage).toBeTruthy();
        });

        await test.step('7) Search for MacBook', async () => {
            await homePage.searchProduct('MacBook');
        });

        await test.step('8) Open the product details page', async () => {
            await searchResultsPage.clickProduct('MacBook');
            await page.waitForLoadState('networkidle');
            const isProductPage = await productPage.isProductPageExists();
            expect(isProductPage).toBeTruthy();
            const productName = await productPage.getProductName();
            expect(productName).toContain('MacBook');
        });

        await test.step('9) Add product to the cart', async () => {
            await productPage.addToCart('1');
            // Navigate directly to cart after adding
            await page.goto(`${process.env.WEB_APP_URL || 'http://localhost/opencart/upload/'}index.php?route=checkout/cart`);
            await page.waitForLoadState('networkidle');
            await page.waitForTimeout(1000);
        });

        await test.step('10) Open the shopping cart', async () => {
            const isCartPage = await cartPage.isCartPageExists();
            expect(isCartPage).toBeTruthy();
        });

        await test.step('11) Verify the correct product', async () => {
            const productName = await cartPage.getProductName();
            expect(productName).toContain('MacBook');
        });

        await test.step('12) Verify the quantity', async () => {
            const qty = await cartPage.getQuantity();
            expect(qty).toBe('1');
        });

        await test.step('13) Verify the product price', async () => {
            const unitPrice = await cartPage.getUnitPrice();
            expect(unitPrice).toContain('$602.00');
        });

        await test.step('14) Verify the cart total', async () => {
            const cartTotal = await cartPage.getCartTotal();
            expect(cartTotal).toContain('$602.00');
        });

        await test.step('15) Complete journey finishes without errors', async () => {
            console.log('✅ End-to-end shopping flow completed successfully!');
        });
    });
});
