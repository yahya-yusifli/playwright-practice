import { Page, Locator } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly cartItems: Locator;
    readonly checkoutButton: Locator;
    readonly continueShoppingButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageTitle = page.locator('[data-test="title"]');
        this.cartItems = page.locator('[data-test="inventory-item"]');
        this.checkoutButton = page.getByRole('button', { name: 'checkout' });
        this.continueShoppingButton = page.getByRole('button', { name: 'continue-shopping' });
    }

    async goto() {
        await this.page.goto('https://www.saucedemo.com/cart.html');
    }

    async getCartItemCount(): Promise<number> {
        return await this.cartItems.count();
    }

    async getCartItemNames(): Promise<string[]> {
        const items = await this.cartItems.all();
        const names: string[] = [];

        for (const item of items) {
            const name = await item.locator('[data-test= "inventory-item-name"]').textContent();
            if (name) names.push(name);
        }
        return names;
    }

    async removeItemByName(productName: string) {
        const item = this.page.locator('.cart_item', { hasText: productName });
        await item.locator('button:has-text("Remove")').click();
    }

    async clickCheckout() {
        await this.checkoutButton.click();
    }

    async continueShopping() {
        await this.continueShoppingButton.click();
    }

    async getItemPrice(productName: string): Promise<string> {
        const item = this.page.locator('.cart_item', { hasText: productName });
        return await item.locator('.inventory_item_price').textContent() || '';
    }

    async isItemInCart(productName: string): Promise<boolean> {
        const item = this.page.locator('.cart_item', { hasText: productName });
        return await item.isVisible();
    }

}


