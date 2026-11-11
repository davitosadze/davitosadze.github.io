import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';
const code = ts.transpileModule(await readFile('src/config/site.ts', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.ESNext },
}).outputText;
const { siteConfig, getPlayStoreUrl } = await import(
  `data:text/javascript;base64,${Buffer.from(code).toString('base64')}`
);
assert.equal(getPlayStoreUrl(), null);
const enabled = { ...siteConfig, googlePlayEnabled: true };
for (const value of [
  '',
  '#',
  'javascript:alert(1)',
  'https://example.com',
  'https://play.google.com.evil.test/store/apps/details?id=test',
  'https://play.google.com/store/apps/details',
])
  assert.equal(getPlayStoreUrl({ ...enabled, googlePlayUrl: value }), null);
const realFormat = 'https://play.google.com/store/apps/details?id=test.balancekeeper';
assert.equal(getPlayStoreUrl({ ...enabled, googlePlayUrl: realFormat }), realFormat);
assert.equal(
  getPlayStoreUrl({ ...enabled, googlePlayUrl: realFormat, googlePlayEnabled: false }),
  null,
);
console.log('Store configuration: disabled, invalid and enabled URL checks passed.');
