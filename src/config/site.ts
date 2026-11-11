export const siteConfig = {
  name: 'Balance Keeper',
  tagline: 'Small Moves. Big Balance.',
  description:
    'Find the right combination of weights, balance every bottle and master 50 challenging puzzles in Balance Keeper.',
  // Set the public HTTPS origin before release, e.g. https://your-domain.com.
  url: 'https://davitosadze.github.io',
  supportEmail: 'davitosadze7@gmail.com',
  googlePlayUrl: 'https://play.google.com/store/apps/details?id=com.balancekeeper.game',
  googlePlayEnabled: true,
  logo: '', // Optional: /images/logo/balance-keeper-logo.webp
  socialPreview: {
    image: '/images/social-preview.png',
    width: 1200,
    height: 630,
    alt: 'Balance Keeper — Small Moves. Big Balance.',
  },
};

export function getPlayStoreUrl(config = siteConfig): string | null {
  if (!config.googlePlayEnabled || !config.googlePlayUrl) return null;
  try {
    const url = new URL(config.googlePlayUrl);
    return url.protocol === 'https:' &&
      url.hostname === 'play.google.com' &&
      url.pathname.startsWith('/store/apps/details') &&
      url.searchParams.has('id')
      ? url.href
      : null;
  } catch {
    return null;
  }
}
