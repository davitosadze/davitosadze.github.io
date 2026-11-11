import { ScreenshotImage } from './screenshot-image';
import { getScreenshot, type ScreenshotId } from '@/config/screenshots';
import { Icon } from './icons';
export function GameScreenshot({
  id,
  priority = false,
  className = '',
}: {
  id: ScreenshotId;
  priority?: boolean;
  className?: string;
}) {
  const screen = getScreenshot(id);
  return (
    <div
      className={`game-screenshot ${className}`}
      style={
        screen.src
          ? {
              aspectRatio: `${screen.crop?.width ?? screen.width} / ${screen.crop?.height ?? screen.height}`,
            }
          : undefined
      }
    >
      {screen.src ? (
        <ScreenshotImage screen={screen} priority={priority} />
      ) : (
        <div className={`screenshot-placeholder placeholder-${id}`}>
          <div className="placeholder-motif" aria-hidden="true">
            <Icon
              name={id === 'level-complete' ? 'star' : id === 'shop' ? 'spark' : 'bottle'}
              size={54}
            />
          </div>
          <span className="placeholder-name">{screen.caption}</span>

          <span className="placeholder-corner" aria-hidden="true">
            ↗
          </span>
        </div>
      )}
    </div>
  );
}
