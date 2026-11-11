# Balance Keeper

A responsive Next.js App Router website with TypeScript and Tailwind CSS. Fully static: no server, accounts, database, analytics, or third-party browser requests are needed. Fonts and original decorative artwork are hosted locally.

## Develop and verify

Use Node.js 22 LTS or later.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. To verify and preview the production export:

```sh
npm run lint
npm run typecheck
npm run build
npm run preview
```

The production site is generated in `out/`. `preview` serves it locally; it is not a backend. Browser checks are described below.

## Site configuration

Edit `src/config/site.ts`:

- `url`: your final HTTPS origin, without a trailing slash. This enables canonical URLs, Open Graph image URLs, indexing and sitemap entries. Unconfigured builds intentionally disallow indexing and contain an empty sitemap, without inventing a domain.
- `supportEmail`: your real support email. Contact links use `mailto:`. Until configured, Support shows a coming-soon notice.
- `googlePlayUrl`: the real `https://play.google.com/store/apps/details?id=...` listing URL.
- `googlePlayEnabled`: set `true` once the listing is live. An invalid or missing listing URL safely retains the coming-soon state. All store badges read the same configuration.
- `logo`: optionally set the real logo path. A styled text wordmark is used until then.
- `socialPreview`: social image path, dimensions and alt text.

Rebuild after changing configuration or assets.

## Real game assets

The supplied `1.png`–`5.png` store images are integrated as optimized WebP assets for Home, Gameplay, Levels, Bottle Broken and Level Complete. Shared CSS crop viewports show only selected game areas, removing the surrounding promotional text and phone hardware without redrawing the UI. The hero uses Gameplay; Home is a focused detail. No Shop image was supplied, so that section retains its labeled placeholder. The two extra promotional illustrations are not displayed. Asset locations:

```text
public/images/logo/balance-keeper-logo.webp
public/images/screenshots/home.webp
public/images/screenshots/gameplay.webp
public/images/screenshots/levels.webp
public/images/screenshots/bottle-broken.webp
public/images/screenshots/shop.webp
public/images/screenshots/level-complete.webp
public/images/bottles/
public/images/weights/
public/images/backgrounds/
public/icons/
```

Update each entry’s `src`, `alt`, original `width` and `height` in `src/config/screenshots.ts`. An optional `crop` specifies `{ x, y, width, height }` in source pixels. `ScreenshotImage` applies exactly the same viewport in every section and in the lightbox. Keep this crop metadata when replacing store posters, or remove it when supplying clean game-only captures. The underlying optimized source files retain the full poster; cropping is a presentation rule, so directly opening an asset file shows the original poster. Prefer clean native game captures for a future asset refresh.

Images are reused throughout the site and lazy-loaded below the fold. The hero’s Gameplay image is preloaded. Only supplied images enter the gallery, with focus trapping, Escape, arrow keys, previous/next controls and restored focus in the modal. Adding the Shop source automatically adds it to the gallery.

`next/image` is used with `unoptimized: true` because the deployment is fully static. Optimize source files before adding them, preferably to WebP/AVIF. There is no runtime image service. Keep screenshots reasonably sized (typically 720–1080 px wide) and avoid duplicate files.

Original social-preview and touch-icon assets are included. To regenerate them after changing the design, run `node scripts/generate-assets.mjs`. Update its store text when the app launches, or supply your own social image.

## Privacy policy

`/privacy/` renders the policy in `src/config/privacy.ts` (an `intro` plus titled `sections`, each made of paragraph, list and link blocks). The current text covers Google AdMob advertising, local-only game storage and children’s privacy.

When the app’s data practices change (new SDKs, analytics, accounts, cloud sync):

1. Edit the affected sections in `src/config/privacy.ts` and update `lastUpdated`.
2. Ensure the policy matches the app's Google Play Data safety disclosures.
3. Set a section's `verified` to `false` (or the top-level flag) to show it as unreviewed; the page then shows a draft notice and stays excluded from indexing.

The Contact section shows `siteConfig.supportEmail`; set it in `src/config/site.ts`. Until it is set, the page shows a "will be added before release" note.

Run `npm run check:release` before publishing. It deliberately fails until required release details (including the support email shown in the privacy policy), real screenshots, and verified privacy content are present. The website builds normally while these are pending.

## Deployment

Deploy **the contents of `out/`** to any static host, for example Cloudflare Pages, Netlify, or a static web server. Build command: `npm ci && npm run build`. Output directory: `out`. No Next.js server or environment secrets are needed.

Directory-style export provides `/privacy/index.html` and `/support/index.html`. Enable standard directory index serving so `/privacy` and `/support` open directly (hosts may redirect them to trailing-slash URLs). Do not add an SPA fallback that replaces all routes with the homepage. Use the included `404.html` for missing pages. Check the live HTTPS URLs before adding them to Google Play.

On a custom Nginx host, the relevant location rule is `try_files $uri $uri/ =404;`, with `index index.html;` and `error_page 404 /404.html;`. Set your domain in site configuration before the final build. Configure HTTPS and normal security headers at your host; cache hashed `/_next/static/` assets immutably and HTML with revalidation.

## Browser verification

```sh
npx playwright install chromium
npm run build
npm run test:e2e
```

The suite runs against the static export and checks required routes, mobile navigation, responsive widths (360–1920 px), asset loading, support interactions, privacy anchors, metadata and disabled store states. Run `npm run test:config` for store URL validation, and `npm run test:configured` for the lightbox and enabled store/email configuration in an isolated temporary build. The latter never modifies the real site configuration. If you prefer an installed Google Chrome instead of downloading Chromium, prefix browser commands with `PLAYWRIGHT_USE_CHROME=1`. See `VERIFICATION.md` for the performed checks.

The five supplied image crops are available in the default gallery and lightbox. No Google Play badge links to a nonexistent listing.
# balance-keeper-web
