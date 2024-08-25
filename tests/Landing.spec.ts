import { test, expect } from '@playwright/test';

test.describe('Home page And Navigation', () => {
  test('navigates to the home page', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveURL('/');
    await expect(
      page.getByRole('heading', { name: 'Discover Your Next Favorite Recipe' })
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Why Choose Recipe Master?' })
    ).toBeVisible();
  });
  test('navigates to the recipes page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Recipes', exact: true }).click();

    await expect(page).toHaveURL('/recipes');
  });

  test('redirects to the login page when an unauthenticated user tries to access protected routes', async ({
    page,
  }) => {
    await page.goto('/recipes/my-recipes');
    await page.waitForURL('/login');

    await expect(page).toHaveURL('/login');
  });
});
