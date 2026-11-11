import { getPlayStoreUrl } from '@/config/site';
import { PlayMark } from './icons';
export function PlayButton({ compact = false }: { compact?: boolean }) {
  const url = getPlayStoreUrl();
  const content = (
    <>
      <PlayMark />
      <span>
        <small>{url ? 'GET IT ON' : 'COMING SOON ON'}</small>
        <strong>Google Play</strong>
      </span>
      {!compact && (
        <span className="store-arrow" aria-hidden="true">
          ↗
        </span>
      )}
    </>
  );
  return url ? (
    <a
      className={`play-button ${compact ? 'compact' : ''}`}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Get Balance Keeper on Google Play"
    >
      {content}
    </a>
  ) : (
    <span
      className={`play-button coming-soon ${compact ? 'compact' : ''}`}
      aria-label="Coming soon on Google Play"
    >
      {content}
    </span>
  );
}
