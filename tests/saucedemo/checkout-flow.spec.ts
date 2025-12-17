import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page-objects/saucedemo/LoginPage';
import { ProductsPage } from '../../page-objects/saucedemo/ProductsPage';
import { CartPage } from '../../page-objects/saucedemo/CartPage';
import { CheckoutPage } from '../../page-objects/saucedemo/CheckoutPage';
import { faker } from '@faker-js/faker';

test.describe('SauceDemo Checkout Flow (Faker Data)', () => {

    test('should complete checkout with random user info', async ({ page }) => {

        // POM Pages
        const loginPage = new LoginPage(page);
        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);

        //  Login
        await loginPage.goto();
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(page).toHaveURL(/inventory/);

        //  Add product to cart
        await productsPage.addProductToCartByName('Sauce Labs Backpack');
        await productsPage.clickShoppingCart();

        //  Proceed to checkout
        await cartPage.clickCheckout();
        await expect(page).toHaveURL(/checkout-step-one/);

        //  Faker: random shipping info
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const postalCode = faker.location.zipCode();

        await checkoutPage.fillShippingInformation(firstName, lastName, postalCode);
        await checkoutPage.clickContinue();

        //  Checkout Overview → Finish Order
        await checkoutPage.clickFinish();

        //  Validate order complete
        await expect(checkoutPage.completeHeader).toBeVisible();
        await expect(checkoutPage.completeHeader).toContainText("Thank you");

        // Go back home
        await checkoutPage.clickBackHome();
        await expect(page).toHaveURL(/inventory/);
    });

});