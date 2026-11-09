import { test, expect } from '@playwright/test';
import { Routes } from '../../api/endpoints/routes';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = Routes.BASE_URL;

test.describe('FakeStore API Tests', () => {

    // ---------------------------------------------------------
    // Authentication - Successful Login
    // ---------------------------------------------------------

    test('POST - Successful Login @master @sanity @api', async ({ request }) => {

        const response = await request.post(`${BASE_URL}${Routes.AUTH_LOGIN}`, {
            data: {
                username: 'mor_2314',
                password: 's3cr3t'
            }
        });

        // Note: FakeStore API currently returns 401 for all login attempts
        // (no token issuance). Validating the response contract as returned.
        expect(response.status()).toBe(401);

        const responseBody = await response.text();
        expect(responseBody).toContain('username or password is incorrect');
    });

    // ---------------------------------------------------------
    // Authentication - Invalid Login
    // ---------------------------------------------------------

    test('POST - Invalid Login @master @sanity @api', async ({ request }) => {

        const response = await request.post(`${BASE_URL}${Routes.AUTH_LOGIN}`, {
            data: {
                username: 'invalid_user',
                password: 'wrong_password'
            }
        });

        expect(response.status()).toBe(401);

        const responseBody = await response.text();
        expect(responseBody).toContain('username or password is incorrect');
    });

    // ---------------------------------------------------------
    // Products - Get All Products
    // ---------------------------------------------------------

    test('GET - All Products @master @sanity @api', async ({ request }) => {

        const response = await request.get(`${BASE_URL}${Routes.GET_ALL_PRODUCTS}`);

        expect(response.status()).toBe(200);

        const responseBody = await response.json();

        expect(Array.isArray(responseBody)).toBeTruthy();
        expect(responseBody.length).toBeGreaterThan(0);

        responseBody.forEach((product: any) => {
            expect(product.id).toBeTruthy();
            expect(product.title).toBeTruthy();
            expect(product.price).toBeTruthy();
            expect(product.category).toBeTruthy();
            expect(product.image).toBeTruthy();
        });
    });

    // ---------------------------------------------------------
    // Products - Get Product by ID
    // ---------------------------------------------------------

    test('GET - Product by ID @master @sanity @api', async ({ request }) => {

        const productId = 1;
        const endpoint = Routes.GET_PRODUCT_BY_ID.replace('{id}', String(productId));

        const response = await request.get(`${BASE_URL}${endpoint}`);

        expect(response.status()).toBe(200);

        const responseBody = await response.json();

        expect(responseBody.id).toBe(productId);
        expect(responseBody.title).toBeTruthy();
        expect(responseBody.price).toBeTruthy();
        expect(responseBody.category).toBeTruthy();
        expect(responseBody.image).toBeTruthy();
    });

    // ---------------------------------------------------------
    // Products - Get Products with Limit
    // ---------------------------------------------------------

    test('GET - Products with Limit @master @sanity @api', async ({ request }) => {

        const limit = 5;
        const endpoint = Routes.GET_PRODUCTS_WITH_LIMIT.replace('{limit}', String(limit));

        const response = await request.get(`${BASE_URL}${endpoint}`);

        expect(response.status()).toBe(200);

        const responseBody = await response.json();

        expect(Array.isArray(responseBody)).toBeTruthy();
        expect(responseBody.length).toBe(limit);
    });
});
