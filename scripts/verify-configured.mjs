import { mkdtemp, cp, symlink, readFile, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve, join } from 'node:path';
import { spawn, execFileSync } from 'node:child_process';
import assert from 'node:assert/strict';
import { chromium } from '@playwright/test';
const root = process.cwd();
const dir = await mkdtemp(join(tmpdir(), 'balance-keeper-fixture-'));
let server;
let browser;
try {
  for (const path of [
    'src',
    'public',
    'package.json',
    'tsconfig.json',
    'next-env.d.ts',
    'next.config.ts',
    'postcss.config.mjs',
  ])
    await cp(resolve(root, path), join(dir, path), { recursive: true });
  await symlink(resolve(root, 'node_modules'), join(dir, 'node_modules'), 'dir');
  let config = await readFile(join(dir, 'src/config/site.ts'), 'utf8');
  config = config
    .replace("url: '',", "url: 'https://example.invalid',")
    .replace("supportEmail: '',", "supportEmail: 'qa@example.invalid',")
    .replace(
      "googlePlayUrl: '',",
      "googlePlayUrl: 'https://play.google.com/store/apps/details?id=test.balancekeeper',",
    )
    .replace('googlePlayEnabled: false', 'googlePlayEnabled: true');
  await writeFile(join(dir, 'src/config/site.ts'), config);
  let screens = await readFile(join(dir, 'src/config/screenshots.ts'), 'utf8');
  // Private test fixtures only: no fabricated screenshots are shipped or added to the real project.
  screens = screens
    .replace("src: '',", "src: '/images/backgrounds/workshop.svg',")
    .replace("src: '',", "src: '/images/backgrounds/workshop.svg',");
  await writeFile(join(dir, 'src/config/screenshots.ts'), screens);
  execFileSync(
    process.execPath,
    [resolve(root, 'node_modules/next/dist/bin/next'), 'build', '--webpack'],
    { cwd: dir, stdio: 'pipe', env: { ...process.env, NEXT_TELEMETRY_DISABLED: '1' } },
  );
  server = spawn(
    process.execPath,
    [
      resolve(root, 'node_modules/serve/build/main.js'),
      join(dir, 'out'),
      '-l',
      '4174',
      '--no-clipboard',
    ],
    { stdio: 'ignore' },
  );
  for (let attempt = 0; attempt < 40; attempt++) {
    try {
      if ((await fetch('http://127.0.0.1:4174')).ok) break;
    } catch {}
    await new Promise((r) => setTimeout(r, 250));
  }
  browser = await chromium.launch({
    channel: process.env.PLAYWRIGHT_USE_CHROME === '1' ? 'chrome' : undefined,
  });
  const page = await browser.newPage();
  await page.goto('http://127.0.0.1:4174');
  const links = page.getByRole('link', { name: 'Get Balance Keeper on Google Play' });
  assert.equal(await links.count(), 3);
  assert.equal(
    await links.first().getAttribute('href'),
    'https://play.google.com/store/apps/details?id=test.balancekeeper',
  );
  assert.equal(
    await page.locator('link[rel="canonical"]').getAttribute('href'),
    'https://example.invalid/',
  );
  assert.equal(
    await page.locator('meta[property="og:image"]').getAttribute('content'),
    'https://example.invalid/images/social-preview.png',
  );
  const opener = page.getByRole('button', { name: 'Enlarge Home screenshot' });
  await opener.click();
  await page.locator('dialog[open]').waitFor();
  assert.equal(await page.locator('.lightbox-caption span').textContent(), 'Home');
  await page.keyboard.press('ArrowRight');
  assert.equal(await page.locator('.lightbox-caption span').textContent(), 'Gameplay');
  await page.getByRole('button', { name: 'Previous screenshot' }).click();
  assert.equal(await page.locator('.lightbox-caption span').textContent(), 'Home');
  for (let i = 0; i < 8; i++) {
    await page.keyboard.press('Tab');
    assert.equal(await page.evaluate(() => !!document.activeElement?.closest('dialog')), true);
  }
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('dialog[open]').count(), 0);
  assert.equal(await opener.evaluate((element) => element === document.activeElement), true);
  assert.equal(await page.evaluate(() => document.body.style.overflow), '');
  await page.goto('http://127.0.0.1:4174/support/');
  assert.equal(
    await page.locator('.contact-button').getAttribute('href'),
    'mailto:qa@example.invalid',
  );
  const sitemap = await (await fetch('http://127.0.0.1:4174/sitemap.xml')).text();
  assert.ok(sitemap.includes('https://example.invalid/privacy/'));
  assert.ok((await (await fetch('http://127.0.0.1:4174/robots.txt')).text()).includes('Allow: /'));
  console.log(
    'Configured fixture passed: store links, email, canonical/OG/sitemap/robots, lightbox opening, arrow navigation, focus trap, Escape, restored focus and scroll.',
  );
} finally {
  await browser?.close();
  server?.kill();
  await rm(dir, { recursive: true, force: true });
}
