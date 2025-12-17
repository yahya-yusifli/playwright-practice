import { test, expect } from '@playwright/test';

test('visual test with tolerance', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    
    await expect(page).toHaveScreenshot('login-tolerant.png', {
        maxDiffPixels: 100, // Allow 100 pixels to be different
        threshold: 0.2, // 20% threshold
        animations: 'disabled', // Disable animations
    });
});