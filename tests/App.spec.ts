import { test, expect } from '@playwright/test';

test('app loads and displays correctly', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  
  // Very simple smoke test to ensure the React app mounted
  // We check for the presence of the main wrapper or any typical text
  const continueButton = page.locator('button');
  await expect(continueButton.first()).toBeVisible();
});
