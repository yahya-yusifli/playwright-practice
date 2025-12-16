import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page-objects/saucedemo/LoginPage';
import { ProductPage } from '../../page-objects/saucedemo/ProductsPage';

test.describe('SauceDemo Products Test', () => {

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(process.env.SAUCE_USERNAME!, process.env.SAUCE_PASSWORD!);
    });

    test('display all products', async ({ page }) => {
        const productPage = new ProductPage(page);
        const productCount = await productPage.getProductCount();
        expect(productCount).toBe(6);
    });

    test('can add product to cart', async ({ page }) => {
        const productPage = new ProductPage(page);

        await productPage.addProductToCartByName('Sauce Labs Backpack');

        const carCount = await productPage.getCartItemCount();
        expect(carCount).toBe('1');

        const isInCart = await productPage.isProductInCart('Sauce Labs Backpack');
        expect(isInCart).toBeTruthy();
    });



});