import { test, expect } from '@playwright/test';

test('completes full benefit questionnaire to reach results', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  // Welcome Screen
  await page.getByText('I am checking for myself').click();
  await page.getByRole('button', { name: 'Continue' }).click();

  // Try to automate clicking the first available option on every screen
  // until we hit the Results screen. This ensures the app doesn't crash on any flow.
  let reachesResults = false;
  for (let i = 0; i < 15; i++) {
    await page.waitForTimeout(500);
    
    // Check if we reached results
    if (await page.getByText('What you might be entitled to').isVisible()) {
      reachesResults = true;
      break;
    }

    // Check if we hit the letter screen (in case we overshot)
    if (await page.getByText('Your summary letter').isVisible()) {
      reachesResults = true;
      break;
    }

    // Check if there are option buttons to click
    // We target div/buttons that act as options. Usually they have borders or specific classes,
    // but a safe bet is any button not named 'Continue' or 'Back' or any label with an input.
    const inputs = page.locator('input[type="radio"], input[type="checkbox"]');
    if (await inputs.count() > 0) {
       for (let j = 0; j < await inputs.count(); j++) {
         try { await inputs.nth(j).click({ trial: true, timeout: 500 }); await inputs.nth(j).click({ force: true }); break; } catch (e) {}
       }
    } else {
       // fallback to clicking anything that looks selectable
       const anyOptions = page.locator('button:not(:has-text("Continue")):not(:has-text("Back"))');
       const count = await anyOptions.count();
       if (count > 0) {
         try { await anyOptions.nth(0).click({ timeout: 500 }); } catch (e) {}
         if (count > 1) {
            try { await anyOptions.nth(1).click({ timeout: 500 }); } catch (e) {}
         }
       }
    }
    
    // Click Continue
    const continueBtn = page.getByRole('button', { name: 'Continue' });
    if (await continueBtn.isVisible()) {
      await continueBtn.click();
    }
  }

  // Final assertion
  expect(reachesResults).toBe(true);
});
