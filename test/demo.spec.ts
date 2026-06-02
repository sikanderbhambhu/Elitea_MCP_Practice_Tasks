import { test, expect } from '@playwright/test';

test('navigate to EPAM client work page from services menu', async ({ page }) => {
  await page.goto('https://www.epam.com/');

  await page.getByRole('link', { name: 'Services' }).nth(1).click();
  await page.waitForLoadState('networkidle');

  const clientWorkLink = page.getByRole('link', { name: /Explore Our Client Work|view all case studies/i }).first();
  await clientWorkLink.scrollIntoViewIfNeeded();
  await clientWorkLink.click();
  await page.waitForLoadState('networkidle');

  await expect(page.getByText('Client Work')).toBeVisible();
});

