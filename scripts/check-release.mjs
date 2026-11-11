import { readFile, access } from 'node:fs/promises';
import { resolve } from 'node:path';
import ts from 'typescript';
async function loadConfig(file) {
  const code = ts.transpileModule(await readFile(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.ESNext },
  }).outputText;
  return import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`);
}
const { siteConfig, getPlayStoreUrl } = await loadConfig('src/config/site.ts');
const { privacyConfig } = await loadConfig('src/config/privacy.ts');
const { screenshots } = await loadConfig('src/config/screenshots.ts');
const issues = [];
try {
  const origin = new URL(siteConfig.url);
  if (origin.protocol !== 'https:' || origin.origin !== siteConfig.url) throw new Error();
} catch {
  issues.push('Set siteConfig.url to the public HTTPS origin without a trailing slash.');
}
if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(siteConfig.supportEmail))
  issues.push('Set a valid supportEmail.');
if (siteConfig.googlePlayEnabled && !getPlayStoreUrl())
  issues.push('Set a valid Google Play app URL, or keep googlePlayEnabled false.');
if (
  !privacyConfig.verified ||
  privacyConfig.sections.some(
    (section) =>
      !section.verified ||
      section.blocks.some((block) =>
        /TODO:|YOUR_SUPPORT_EMAIL|draft must|not yet been verified/i.test(
          block.text ?? block.items?.join(' ') ?? block.url,
        ),
      ),
  )
)
  issues.push(
    'Complete and verify every privacy section against the app, then set privacyConfig.verified true.',
  );
for (const screen of screenshots) {
  if (!screen.src) {
    issues.push(`Supply the real ${screen.caption} screenshot in src/config/screenshots.ts.`);
    continue;
  }
  if (!screen.src.startsWith('/images/')) {
    issues.push(`Use a local /images/ path for ${screen.caption}.`);
    continue;
  }
  try {
    await access(resolve('public', screen.src.slice(1)));
  } catch {
    issues.push(`Missing screenshot file: ${screen.src}`);
  }
}
if (siteConfig.logo) {
  try {
    await access(resolve('public', siteConfig.logo.slice(1)));
  } catch {
    issues.push('Configured logo file does not exist.');
  }
}
for (const asset of [
  siteConfig.socialPreview.image,
  '/icons/favicon.svg',
  '/icons/apple-touch-icon.png',
]) {
  try {
    await access(resolve('public', asset.slice(1)));
  } catch {
    issues.push(`Missing public asset: ${asset}`);
  }
}
if (issues.length) {
  console.error(
    'Release configuration needs attention:\n' + issues.map((issue) => `  • ${issue}`).join('\n'),
  );
  process.exitCode = 1;
} else {
  console.log(
    'Release configuration checks passed. Confirm the privacy audit and Google Play Data safety disclosures before publishing.',
  );
}
