import { test, expect } from '../../fixture/auth-fixtures';
import { ProductsPage } from '../../page-objects/saucedemo/ProductsPage';

test('add product with auto-login as standard_user', async ({ page, loggedInAsStandardUser }) => {
    
    const productsPage = new ProductsPage(page);
    await productsPage.addProductToCartByName('Sauce Labs Backpack');
    const cartCount = await productsPage.getCartItemCount();
    expect(cartCount).toBe('1');

});

test('add product with auto-login as perdormance_user', async({loggedInAsPerformanceUser})=>{
     
});