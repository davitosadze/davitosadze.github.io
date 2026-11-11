import { test, expect } from '@playwright/test';
import { writeFile } from 'node:fs/promises';
import AxeBuilder from '@axe-core/playwright';
for (const width of [390, 1440]) {
  for (const route of ['/', '/privacy/', '/support/']) {
    test(`WCAG accessibility on ${route} at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(route);
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze();
      await writeFile(
        `test-results/axe-${route.replaceAll('/', '') || 'home'}-${width}.json`,
        JSON.stringify(results.violations, null, 2),
      );
      expect(
        results.violations.map((v) => ({
          id: v.id,
          impact: v.impact,
          nodes: v.nodes.map((n) => ({
            target: n.target,
            summary: n.failureSummary?.split('\n')[1],
          })),
        })),
      ).toEqual([]);
    });
  }
}
