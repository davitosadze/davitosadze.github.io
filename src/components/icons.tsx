import type { CSSProperties } from 'react';
export type IconName =
  | 'arrow'
  | 'play'
  | 'leaf'
  | 'bottle'
  | 'star'
  | 'spark'
  | 'undo'
  | 'shuffle'
  | 'hint'
  | 'check'
  | 'mail'
  | 'close'
  | 'expand'
  | 'chevron'
  | 'coins'
  | 'shield';
const paths: Record<IconName, React.ReactNode> = {
  arrow: (
    <>
      <path d="M4 12h15m-6-6 6 6-6 6" />
    </>
  ),
  play: <path d="m8 4 13 8L8 20Z" />,
  leaf: (
    <>
      <path d="M20 4C8 1 2 8 6 16s16 1 14-12Z" />
      <path d="m4 21 11-12" />
    </>
  ),
  bottle: (
    <>
      <path d="M9 3h6v5l4 5v7a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-7l4-5Z" />
      <path d="M8 3h8M8 16h8" />
    </>
  ),
  star: <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3l-5.6 2.9 1.1-6.2L3 9.6l6.2-.9Z" />,
  spark: (
    <>
      <path d="m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5Z" />
    </>
  ),
  undo: (
    <>
      <path d="M4 5v6h6" />
      <path d="M4 11a8 8 0 1 1 2 9" />
    </>
  ),
  shuffle: (
    <>
      <path d="M3 6h3c5 0 7 12 12 12h3M17 14l4 4-4 4M3 18h3c2 0 4-3 5-6m3-4c1-1 2-2 4-2h3m-4-4 4 4-4 4" />
    </>
  ),
  hint: (
    <>
      <path d="M9 18h6m-5 3h4M8 14a7 7 0 1 1 8 0l-1 2H9Z" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 6 9 7 9-7" />
    </>
  ),
  close: <path d="m6 6 12 12M6 18 18 6" />,
  expand: <path d="M9 3H3v6m12-6h6v6M3 15v6h6m12-6v6h-6" />,
  chevron: <path d="m9 5 7 7-7 7" />,
  coins: (
    <>
      <ellipse cx="10" cy="7" rx="7" ry="4" />
      <path d="M3 7v5c0 5 14 5 14 0V7M3 12v5c0 5 14 5 14 0v-5m3-3c4 1 3 5-1 6m2-3v5c0 2-2 3-4 4" />
    </>
  ),
  shield: (
    <>
      <path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6Z" />
      <path d="m8 12 3 3 5-6" />
    </>
  ),
};
export function Icon({
  name,
  size = 24,
  className = '',
  style,
}: {
  name: IconName;
  size?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      style={style}
    >
      {paths[name]}
    </svg>
  );
}
export function PlayMark() {
  return (
    <svg width="25" height="28" viewBox="0 0 25 28" aria-hidden="true" fill="currentColor">
      <path d="M2 1.5v25L15 14 2 1.5Zm2-1 15 8.7-3 3.3L4 .5Zm16.8 9.8L17.1 14l3.7 3.7 3-1.7c1.6-.9 1.6-3.1 0-4l-3-1.7ZM16 15.5l3 3.3L4 27.5l12-12Z" />
    </svg>
  );
}
