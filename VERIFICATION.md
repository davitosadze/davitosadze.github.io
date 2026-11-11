# Verification

Verified locally on September 19, 2026, using Node.js 22.15.0 and Google Chrome through Playwright.

## Passed

- `npm run lint`: no warnings or errors.
- `npm run typecheck`: no TypeScript errors.
- `npm run format:check`: consistent formatting.
- `npm run build`: Next.js static export generated in `out/`.
- `npm run test:config`: disabled, missing, invalid and enabled Google Play URL handling.
- `PLAYWRIGHT_USE_CHROME=1 npm run test:e2e`: **19 tests passed**.
- Configured fixture verification: enabled Google Play links, support mailto link, canonical and social metadata, sitemap, robots, lightbox opening, arrow navigation, keyboard focus trapping, Escape, restored focus and scroll state. This ran in a temporary copy with test-only assets and contact values; the shipped configuration is unchanged.

The browser suite checked all three routes at 360, 390, 430, 768, 1366, 1440 and 1920 pixels, with no horizontal document overflow, broken rendered images or JavaScript errors. Desktop and mobile full-page captures were visually inspected. Direct `/privacy` and `/support` access, homepage links and anchors, mobile navigation, support disclosures, privacy contents links, 404 behavior, reduced motion and public metadata assets were checked.

Axe checks with WCAG 2 A/AA and WCAG 2.1 AA tags reported no automated violations on Home, Privacy and Support at 390 and 1440 pixels. This is an automated accessibility check, not a claim of exhaustive manual accessibility certification. No Lighthouse score is claimed.

## Expected release inputs

`npm run check:release` intentionally reports incomplete release configuration:

- Final HTTPS domain.
- Support email.
- Five authentic game screenshots.

Google Play may stay in the coming-soon state until its listing is live. No fake screenshots, contact addresses, testimonials or ratings are published. The privacy page carries the supplied policy text (Google AdMob disclosures, local storage, children’s privacy); its contact section shows the support email only once one is configured. The unconfigured website disallows indexing until its public domain is supplied.

After adding release inputs, rerun the release check and build, upload `out/`, and check the final public URLs on the chosen host. Hosting and the app's data practices cannot be verified from this empty website repository.
