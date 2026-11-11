import Image from 'next/image';
import type { GameScreen } from '@/config/screenshots';

/** A CSS viewport preserves the supplied image pixels, including in the lightbox. */
export function ScreenshotImage({
  screen,
  priority = false,
  expanded = false,
}: {
  screen: GameScreen;
  priority?: boolean;
  expanded?: boolean;
}) {
  const { crop } = screen;
  const width = crop?.width ?? screen.width;
  const height = crop?.height ?? screen.height;
  return (
    <div
      className={`screenshot-viewport ${expanded ? 'screenshot-expanded' : ''}`}
      style={{
        aspectRatio: `${width} / ${height}`,
        ...(expanded ? { width: `min(86vw, ${width}px, calc(78vh * ${width / height}))` } : {}),
      }}
    >
      <Image
        src={screen.src}
        alt={screen.alt}
        width={screen.width}
        height={screen.height}
        preload={priority}
        loading={priority ? undefined : expanded ? 'eager' : 'lazy'}
        sizes="(max-width: 640px) 100vw, 1000px"
        className="screenshot-source"
        draggable={false}
        style={{
          position: 'absolute',
          width: `${(screen.width / width) * 100}%`,
          height: `${(screen.height / height) * 100}%`,
          left: `${(-(crop?.x ?? 0) / width) * 100}%`,
          top: `${(-(crop?.y ?? 0) / height) * 100}%`,
          maxWidth: 'none',
        }}
      />
    </div>
  );
}
