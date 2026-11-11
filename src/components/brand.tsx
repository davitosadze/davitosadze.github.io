import Image from 'next/image';
import { siteConfig } from '@/config/site';
import { Icon } from './icons';
export function Brand({ large = false }: { large?: boolean }) {
  if (siteConfig.logo)
    return (
      <Image
        src={siteConfig.logo}
        alt="Balance Keeper"
        width={large ? 280 : 140}
        height={large ? 150 : 75}
        className="brand-image"
      />
    );
  return (
    <span className={`brand ${large ? 'brand-large' : ''}`} aria-label="Balance Keeper">
      <span className="brand-emblem">
        <Icon name="bottle" size={large ? 30 : 22} />
      </span>
      <span className="brand-words">
        <span>BALANCE</span>
        <span>KEEPER</span>
      </span>
    </span>
  );
}
