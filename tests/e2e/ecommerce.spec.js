import { test, expect } from '@playwright/test';

test.describe('E-Commerce UI', () => {
  test('Product Listing Page', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('Product Listing');
    const products = page.locator('.product');
    await expect(products).toHaveCount(3);
  });

  test('Product Details Page', async ({ page }) => {
    await page.goto('/');
    await page.click('text=View Details');
    await expect(page.locator('h1')).toContainText('Laptop');
    await page.click('text=Add to Cart');
  });

  test('Add to Cart from Listing', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Add to Cart');
    await page.click('text=Cart');
    await expect(page.locator('h2').first()).toContainText('Laptop');
  });

  test('Cart Page - Update Quantity and Remove', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Add to Cart');
    await page.click('text=Cart');
    await page.click('text=+');
    await expect(page.locator('p').filter({ hasText: 'Quantity: 2' })).toBeVisible();
    await page.click('text=-');
    await expect(page.locator('p').filter({ hasText: 'Quantity: 1' })).toBeVisible();
    await page.click('text=Remove');
    await expect(page.locator('text=Your cart is empty.')).toBeVisible();
  });

  test('Checkout Page', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Add to Cart');
    await page.click('text=Cart');
    await page.click('text=Checkout');
    await expect(page.locator('h1')).toContainText('Checkout');
    await page.fill('input[placeholder="Name"]', 'John Doe');
    await page.fill('input[placeholder="Email"]', 'john@example.com');
    await page.fill('textarea', '123 Main St');
    await page.click('text=Submit Order');
    await expect(page.locator('text=Order submitted!')).toBeVisible();
  });
});