import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page-objects/saucedemo/LoginPage';
import { ProductsPage } from '../../page-objects/saucedemo/ProductsPage';
import { SortOption } from '../../utils/saucedemo-data';

test.describe('SauceDemo Products Test', () => {

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(process.env.SAUCE_USERNAME!, process.env.SAUCE_PASSWORD!);
    });

    test('display all products', async ({ page }) => {
        const productPage = new ProductsPage(page);
        const productCount = await productPage.getProductCount();
        expect(productCount).toBe(6);
    });

    test('can add product to cart', async ({ page }) => {
        const productPage = new ProductsPage(page);

        await productPage.addProductToCartByName('Sauce Labs Backpack');

        const carCount = await productPage.getCartItemCount();
        expect(carCount).toBe('1');

        const isInCart = await productPage.isProductInCart('Sauce Labs Backpack');
        expect(isInCart).toBeTruthy();
    });

    test('can add multiple products to cart', async ({ page }) => {
        const productPage = new ProductsPage(page);

        await productPage.addProductToCartByName('Sauce Labs Backpack');
        await productPage.addProductToCartByName('Sauce Labs Bike Light');

        const cartCount = await productPage.getCartItemCount();
        expect(cartCount).toBe('2');
    });

    test('can remove product from cart', async ({ page }) => {
        const productPage = new ProductsPage(page);

        await productPage.addProductToCartByName('Sauce Labs Backpack');
        await productPage.removeProductFromCartByName('Sauce Labs Backpack');

        const cartCount = await productPage.getCartItemCount();
        expect(cartCount).toBe('0');;
    });

    test('can sort products by name A-Z', async ({ page }) => {
        const productPage = new ProductsPage(page);

        await productPage.sortBy(SortOption.NAME_ASC);
        const productNames = await productPage.getProductNames();
        expect(productNames[0]).toBe('Sauce Labs Backpack')
    });

    test('can sort products by price low to high', async ({ page }) => {
        const productPage = new ProductsPage(page);

        await productPage.sortBy(SortOption.PRICE_LOW_HIGH);

        const firstProductPrice = await productPage.getProductPrice('Sauce Labs Onesie');
        expect(firstProductPrice).toBe('$7.99');
    });


});