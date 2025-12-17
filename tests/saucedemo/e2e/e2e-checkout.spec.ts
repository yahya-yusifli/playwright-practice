import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../page-objects/saucedemo/LoginPage';
import { ProductsPage } from '../../../page-objects/saucedemo/ProductsPage';
import { CartPage } from '../../../page-objects/saucedemo/CartPage';
import { CheckoutPage } from '../../../page-objects/saucedemo/CheckoutPage';

test.describe('SauceDemo End-to-End Checkout FLow @e2e', () => {

    test('complete checkout flow with multiple products', async ({ page }) => {
        // Login
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(process.env.SAUCE_USERNAME!, process.env.SAUCE_PASSWORD!);
        // Add products to cart
        const productsPage = new ProductsPage(page);
        await productsPage.addProductToCartByName('Sauce Labs Backpack');
        await productsPage.addProductToCartByName('Sauce Labs Bike Light');
        // Verify cart count
        const carCount = await productsPage.getCartItemCount();
        expect(carCount).toBe('2');
        // Go to cart
        await productsPage.clickShoppingCart();
        // Verify cart cotents
        const cartPage = new CartPage(page);
        const itemCount = await cartPage.getCartItemCount();
        expect(itemCount).toBe(2);

        const itemNames = await cartPage.getCartItemNames();
        expect(itemNames).toContain('Sauce Labs Backpack');
        expect(itemNames).toContain('Sauce Labs Bike Light');
        // Proceed to checkout
        await cartPage.clickCheckout();
        // Fill shipping information
        const checkoutPage = new CheckoutPage(page);
        await checkoutPage.fillShippingInformation('John', 'Doe', '123456');
        await checkoutPage.clickContinue();
        // Complete order
        await checkoutPage.clickFinish();
        // Verify order completion
        const isComplete = await checkoutPage.isOrderComplete();
        expect(isComplete).toBeTruthy();
        const completeMessage = await checkoutPage.getCompleteMessage();
        expect(completeMessage).toContain('Thank you for your order');
    });

    test('checkout with single product', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login('standard_user', 'secret_sauce');
        const productsPage = new ProductsPage(page);
        await productsPage.addProductToCartByName('Sauce Labs Onesie');
        await productsPage.clickShoppingCart();
        
        const cartPage = new CartPage(page);
        await cartPage.clickCheckout();
        
        const checkoutPage = new CheckoutPage(page);
        await checkoutPage.fillShippingInformation('Jane', 'Smith', '54321');
        await checkoutPage.clickContinue();
        await checkoutPage.clickFinish();
        const completeMessage = await checkoutPage.getCompleteMessage();
        expect(completeMessage).toBe('Thank you for your order!');
    });

    test('cannot checkout with empty cart', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login('standard_user', 'secret_sauce');
        
        const productsPage = new ProductsPage(page);
        await productsPage.clickShoppingCart();
        
        const cartPage = new CartPage(page);
        const itemCount = await cartPage.getCartItemCount();
        expect(itemCount).toBe(0);
        // Checkout button should still be clickable but cart is empty
        await cartPage.clickCheckout();
        // Should be on checkout page
        await expect(page).toHaveURL(/.*checkout-step-one.*/);
    });
});
