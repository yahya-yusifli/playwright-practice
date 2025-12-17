import { test, expect } from '../../fixture/saucedemo';

test('add product to cart', async ({ authenticatedPage, productsPage }) => {
// Already logged in via authenticatedPage fixture
await productsPage.addProductToCartByName('Sauce Labs Backpack');
const cartCount = await productsPage.getCartItemCount();
expect(cartCount).toBe('1');
});