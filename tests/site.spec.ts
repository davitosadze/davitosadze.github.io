import { expect, test } from '@playwright/test';

for (const width of [360, 390, 430, 768, 1366, 1440, 1920]) {
  test(`responsive pages and valid images at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ['/', '/privacy/', '/support/']) {
      const errors: string[] = [];
      page.on('pageerror', (error) => errors.push(error.message));
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await expect(page.locator('h1')).toBeVisible();
      await page.evaluate(() => document.fonts.ready);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
      ).toBe(true);
      for (const img of await page.locator('img').all()) {
        await img.scrollIntoViewIfNeeded();
        await expect(img).toHaveJSProperty('complete', true);
      }
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
      const badImages = await page
        .locator('img')
        .evaluateAll((images) =>
          images
            .filter(
              (img): img is HTMLImageElement =>
                img instanceof HTMLImageElement && (!img.complete || img.naturalWidth === 0),
            )
            .map((img) => img.src),
        );
      expect(badImages).toEqual([]);
      expect(errors).toEqual([]);
      if (route === '/' && [390, 1440].includes(width))
        await page.screenshot({ path: `test-results/home-${width}.png`, fullPage: true });
    }
  });
}

test('home links, default store state and supplied screenshots are correct', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Balance Keeper – Weight & Balance Puzzle Game');
  await expect(page.getByRole('link', { name: 'Get Balance Keeper on Google Play' })).toHaveCount(
    0,
  );
  await expect(page.getByLabel('Coming soon on Google Play')).toHaveCount(3);
  await expect(page.locator('.gallery-item')).toHaveCount(5);
  await expect(page.locator('.screenshot-open')).toHaveCount(5);
  await expect(page.locator('.placeholder-shop')).toHaveCount(1);
  await expect(page.locator('.hero-screenshot img')).toHaveAttribute(
    'src',
    '/images/screenshots/gameplay.webp',
  );
  await page.getByRole('link', { name: 'See gameplay', exact: true }).click();
  await expect(page).toHaveURL(/#gameplay$/);
  const hrefs = await page
    .locator('a')
    .evaluateAll((links) => [
      ...new Set(
        links.map((link) => link.getAttribute('href')).filter((href): href is string => !!href),
      ),
    ]);
  for (const href of hrefs) {
    if (href.startsWith('/#') || href.startsWith('#'))
      expect(await page.locator(`[id="${href.split('#')[1]}"]`).count()).toBe(1);
    else if (href.startsWith('/')) expect((await page.request.get(href)).status()).toBe(200);
  }
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    'content',
    'Balance Keeper – Weight & Balance Puzzle Game',
  );
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
});

test('mobile menu opens, closes and navigates', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Open navigation' }).click();
  const nav = page.getByRole('navigation', { name: 'Mobile navigation' });
  await expect(nav).toBeVisible();
  await nav.getByRole('link', { name: 'Features' }).click();
  await expect(nav).toHaveCount(0);
  await expect(page).toHaveURL(/#features$/);
  await page.getByRole('button', { name: 'Open navigation' }).click();
  await nav.getByRole('link', { name: 'Support' }).click();
  await expect(page.getByRole('heading', { name: 'Balance Keeper Support' })).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toHaveCount(0);
});

test('support categories expand and contact stays unconfigured', async ({ page }) => {
  await page.goto('/support');
  await expect(page).toHaveTitle('Support – Balance Keeper');
  for (const summary of await page.locator('summary').all()) {
    await summary.click();
    await expect(summary.locator('..')).toHaveAttribute('open', '');
    await summary.click();
    await expect(summary.locator('..')).not.toHaveAttribute('open');
  }
  await expect(page.getByText('Support contact coming soon')).toBeVisible();
  await expect(page.locator('a[href^="mailto:"]')).toHaveCount(0);
});

test('privacy is directly reachable, published as final, with fifteen working anchors', async ({
  page,
}) => {
  await page.goto('/privacy');
  await expect(page).toHaveTitle('Privacy Policy – Balance Keeper');
  await expect(page.getByText('Draft — app verification required before publishing')).toHaveCount(
    0,
  );
  await expect(page.getByText('YOUR_SUPPORT_EMAIL')).toHaveCount(0);
  const anchors = page
    .getByRole('navigation', { name: 'Privacy policy contents' })
    .getByRole('link');
  await expect(anchors).toHaveCount(15);
  for (const link of await anchors.all()) {
    const href = await link.getAttribute('href');
    await expect(page.locator(href!)).toHaveCount(1);
  }
  await anchors.last().click();
  await expect(page).toHaveURL(/#contact$/);
});

test('static SEO files, original social assets and missing page work', async ({ request }) => {
  for (const path of [
    '/robots.txt',
    '/sitemap.xml',
    '/icons/favicon.svg',
    '/icons/apple-touch-icon.png',
    '/images/social-preview.png',
  ])
    expect((await request.get(path)).status()).toBe(200);
  expect((await request.get('/no-such-page/')).status()).toBe(404);
  expect(await (await request.get('/robots.txt')).text()).toContain('Disallow: /');
});

test('reduced motion disables smooth scrolling', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe(
    'auto',
  );
});

for (const width of [390, 1440]) {
  test(`supplied screenshot crops and lightbox work at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const buttons = page.locator('.screenshot-open');
    await expect(buttons).toHaveCount(5);
    const expectedNames = ['Home', 'Gameplay', 'Levels', 'Bottle Broken', 'Level Complete'];
    for (let i = 0; i < expectedNames.length; i++) {
      const opener = buttons.nth(i);
      await opener.click();
      await expect(page.locator('dialog[open]')).toBeVisible();
      await expect(page.locator('.lightbox-caption span')).toHaveText(expectedNames[i]);
      const viewport = page.locator('.screenshot-expanded');
      await expect(viewport.locator('img')).toHaveJSProperty('complete', true);
      const bounds = await viewport.boundingBox();
      expect(bounds).not.toBeNull();
      expect(bounds!.width).toBeLessThanOrEqual(width);
      expect(bounds!.height).toBeLessThanOrEqual(703);
      await viewport.screenshot({ path: `test-results/crop-${i}-${width}.png` });
      await page.keyboard.press('ArrowRight');
      await expect(page.locator('.lightbox-caption span')).toHaveText(
        expectedNames[(i + 1) % expectedNames.length],
      );
      await page.keyboard.press('Escape');
      await expect(opener).toBeFocused();
    }
  });
}
