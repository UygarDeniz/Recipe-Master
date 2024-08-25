import { test, expect } from '@playwright/test';

test('Creates and Deletes Recipe', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  //Login

  await page.getByLabel('Email').fill('test01@test.com');
  await page.getByLabel('Password').fill('123123');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForURL('http://localhost:3000/');
  expect(page.url()).toBe('http://localhost:3000/');

  await page.goto('http://localhost:3000/recipes/create');
  await expect(page).toHaveURL('http://localhost:3000/recipes/create');

  //Create Recipe

  await page.getByLabel('Title').click();
  await page.getByLabel('Title').fill('New Recipe Title');

  await page.getByLabel('Description').fill('New Recipe Description');

  await page.getByPlaceholder('Ingredient Name').click();
  await page.getByPlaceholder('Ingredient Name').fill('Sugar');
  await page.getByPlaceholder('Quantity').fill('10 gr');
  await page.getByRole('button', { name: '+ Ingredient' }).click();
  await page.locator('#ingredient-1-name').click();
  await page.locator('#ingredient-1-name').fill('New Ingredient');
  await page.locator('#ingredient-1-quantity').click();
  await page.locator('#ingredient-1-quantity').fill('1');

  await page.getByLabel('Step 1', { exact: true }).click();
  await page
    .getByLabel('Step 1', { exact: true })
    .fill('Filling instructions form step 1');
  await page.getByRole('button', { name: '+ Instruction' }).click();
  await page.getByLabel('Step 2', { exact: true }).click();
  await page
    .getByLabel('Step 2', { exact: true })
    .fill('Filling instructions from step 2');

  await page.getByLabel('Image URL').click();
  await page
    .getByLabel('Image URL')
    .fill(
      'https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    );
  await page.getByLabel('Category').selectOption('DESSERT');

  await page.getByRole('button', { name: 'Create Recipe' }).click();

  //Verify Recipe
  await expect(page.getByText('New Recipe Title')).toBeVisible();

  //Delete Recipe
  await page.getByRole('link', { name: 'Edit' }).click();
  await page.getByRole('button', { name: 'Delete' }).click();
  await page.waitForSelector('text=Delete');
  await page.getByRole('button', { name: 'Delete', exact:true }).click();
  //Verify Recipe Deleted
  await page.waitForURL('http://localhost:3000/recipes/my-recipes');
  expect(page.url()).toBe('http://localhost:3000/recipes/my-recipes');
  await expect(page.getByText('New Recipe Title')).not.toBeVisible();
});
