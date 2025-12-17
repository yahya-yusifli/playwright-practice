import { test, expect } from '@playwright/test';

test('visual test - login page', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    // Take screenshot and compare
    await expect(page).toHaveScreenshot('login-page.png');
});