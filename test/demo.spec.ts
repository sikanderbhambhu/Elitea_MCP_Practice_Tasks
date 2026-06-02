import { test, expect } from '@playwright/test';

test('navigate to client work from services and verify header text', async ({ page }) => {
  await page.goto('https://www.epam.com/');

  const servicesLink = page.locator('a[href="/services"]').first();
  await servicesLink.waitFor({ state: 'visible', timeout: 10000 });
  await servicesLink.scrollIntoViewIfNeeded();
  await servicesLink.evaluate((el) => (el as HTMLAnchorElement).click());

  await page.waitForURL('**/services', { timeout: 10000 });

  const exploreClientWorkLink = page.getByRole('link', { name: 'Explore Our Client Work' });
  await exploreClientWorkLink.waitFor({ state: 'visible', timeout: 10000 });
  await exploreClientWorkLink.scrollIntoViewIfNeeded();
  await Promise.all([
    page.waitForURL('**/services/client-work', { timeout: 10000 }),
    exploreClientWorkLink.click(),
  ]);

  await expect(page.getByRole('heading', { name: 'Client Work' })).toBeVisible();
});

