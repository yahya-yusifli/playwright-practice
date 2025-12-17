import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../page-objects/saucedemo/LoginPage';

test('visual test - product card', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    const productCard = page.locator('.inventory_item').first();
    await expect(productCard).toHaveScreenshot('product-card.png');
});