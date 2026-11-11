export type ScreenshotId =
  'home' | 'gameplay' | 'levels' | 'bottle-broken' | 'shop' | 'level-complete';
export type ScreenshotCrop = { x: number; y: number; width: number; height: number };
export type GameScreen = {
  id: ScreenshotId;
  title: string;
  caption: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  // Pixel coordinates in the source image. Applied identically in cards and the lightbox.
  // Only the viewport changes; the supplied UI is never redrawn or reconstructed.
  crop?: ScreenshotCrop;
};

export const screenshots: GameScreen[] = [
  {
    id: 'home',
    title: 'Welcome to the workshop',
    caption: 'Home',
    src: '/images/screenshots/home.webp',
    alt: 'Cropped home-screen detail showing the Balance Keeper logo, a weighted bottle and Play button',
    width: 941,
    height: 1672,
    crop: { x: 320, y: 595, width: 300, height: 630 },
  },
  {
    id: 'gameplay',
    title: 'Every weight matters',
    caption: 'Gameplay',
    src: '/images/screenshots/gameplay.webp',
    alt: 'Balance Keeper gameplay with three bottles, weighted balls, undo, hint and shuffle controls',
    width: 852,
    height: 1846,
    crop: { x: 212, y: 598, width: 473, height: 947 },
  },
  {
    id: 'levels',
    title: 'One good move at a time',
    caption: 'Levels',
    src: '/images/screenshots/levels.webp',
    alt: 'Balance Keeper level selection showing numbered levels, performance stars and locked levels',
    width: 852,
    height: 1846,
    crop: { x: 193, y: 536, width: 470, height: 787 },
  },
  {
    id: 'bottle-broken',
    title: 'A delicate balance',
    caption: 'Bottle Broken',
    src: '/images/screenshots/bottle-broken.webp',
    alt: 'Balance Keeper Bottle Broken screen with a cracked bottle and Continue and Restart controls',
    width: 852,
    height: 1846,
    crop: { x: 190, y: 531, width: 476, height: 986 },
  },
  {
    id: 'shop',
    title: 'A style of your own',
    caption: 'Shop',
    src: '',
    alt: 'Balance Keeper customization shop',
    width: 1080,
    height: 1920,
  },
  {
    id: 'level-complete',
    title: 'A little well-earned gold',
    caption: 'Level Complete',
    src: '/images/screenshots/level-complete.webp',
    alt: 'Balance Keeper Level Complete screen with three stars, coin rewards, Replay and Continue',
    width: 941,
    height: 1672,
    crop: { x: 231, y: 522, width: 490, height: 977 },
  },
];

export const galleryScreenshots = screenshots.filter((screen) => screen.src);

export function getScreenshot(id: ScreenshotId): GameScreen {
  return screenshots.find((screen) => screen.id === id)!;
}
