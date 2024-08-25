import { test, expect } from '@playwright/test';

test.describe('Filtering functionality', () => {
  test('Search updates url and recipe list', async ({ page }) => {
    await page.goto('/recipes');

    await page.waitForURL('/recipes', { waitUntil: 'networkidle' });

    await page.getByPlaceholder('Search recipes').fill('f');
    await page.waitForURL('/recipes?page=1&query=f');

    const recipeCardsTexts = await page
      .getByTestId('recipe-card-details')
      .allTextContents();

    expect(
      recipeCardsTexts.every((text) => text.includes('f') || text.includes('F'))
    ).toBeTruthy();
  });
  test('Category filter updates url and recipe list', async ({ page }) => {
    await page.goto('/recipes');

    await page.waitForURL('/recipes', { waitUntil: 'networkidle' });

    await page.getByLabel('Filter by Category').selectOption('BREAKFAST');
    await page.waitForURL('/recipes?page=1&category=BREAKFAST');

    const categories = await page
      .getByTestId('recipe-category')
      .allTextContents();

    expect(categories.every((text) => text.includes('Breakfast'))).toBeTruthy();
  });
  test('Pagination updates url and recipe list', async ({ page }) => {
    await page.goto('/recipes');

    await page.waitForURL('/recipes', { waitUntil: 'networkidle' });

    const nextButton = page.getByRole('link', { name: 'Next' });

    if (nextButton) {
      await nextButton.click();
      await page.waitForURL('/recipes?page=2');
      await expect(page.getByText('Page 2')).toBeVisible();

      await page.waitForSelector('[data-testid="recipe-card-details"]');
      const recipeCardsTexts = await page
        .getByTestId('recipe-card-details')
        .all();

      expect(recipeCardsTexts.length).toBeGreaterThan(0);
    }
  });
  test("Show 'No recipes found' when no recipes are found", async ({
    page,
  }) => {
    await page.goto('/recipes');

    await page.waitForURL('/recipes', { waitUntil: 'networkidle' });

    await page
      .getByPlaceholder('Search recipes')
      .fill('ASDQW123xzcGjNonExitsingRecipe.cvxclkopjwe');
    await page.waitForURL(
      '/recipes?page=1&query=ASDQW123xzcGjNonExitsingRecipe.cvxclkopjwe'
    );

    await expect(page.getByText('No recipes found')).toBeVisible();
  });
});
