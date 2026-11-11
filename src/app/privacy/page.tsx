import Link from 'next/link';
import { pageMetadata } from '@/config/metadata';
import { privacyConfig, type PolicyBlock } from '@/config/privacy';
import { siteConfig } from '@/config/site';
export const metadata = {
  ...pageMetadata(
    'Privacy Policy – Balance Keeper',
    'Privacy information and data-practice disclosures for Balance Keeper.',
    '/privacy/',
  ),
  robots: { index: privacyConfig.verified && !!siteConfig.url, follow: true },
};
const slug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
function Blocks({ blocks }: { blocks: PolicyBlock[] }) {
  return blocks.map((block, index) => {
    if (block.type === 'list')
      return (
        <ul className="policy-list" key={index}>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    if (block.type === 'link')
      return (
        <p key={index}>
          <a href={block.url} target="_blank" rel="noopener noreferrer">
            {block.url}
          </a>
        </p>
      );
    return <p key={index}>{block.text}</p>;
  });
}
export default function PrivacyPage() {
  return (
    <div className="document-page privacy-page">
      <Link className="back-link" href="/">
        ← Back to the workshop
      </Link>
      <div className="document-heading">
        <span className="eyebrow">BALANCE KEEPER</span>
        <h1>
          Privacy <em>Policy</em>
        </h1>
        <p>
          Last updated:{' '}
          <time dateTime={privacyConfig.lastUpdated}>
            {new Date(`${privacyConfig.lastUpdated}T12:00:00Z`).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              timeZone: 'UTC',
            })}
          </time>
        </p>
      </div>
      {!privacyConfig.verified && (
        <div className="draft-notice">
          <strong>Draft — app verification required before publishing</strong>
          <p>
            The sections below are review placeholders, not a statement of the app’s verified data
            practices. Advertising, analytics and crash-reporting providers have not been confirmed.
          </p>
        </div>
      )}
      <div className="policy-intro">
        <Blocks blocks={privacyConfig.intro} />
      </div>
      <div className="privacy-layout">
        <aside>
          <nav aria-label="Privacy policy contents">
            <span className="styles-label">ON THIS PAGE</span>
            {privacyConfig.sections.map((section, index) => (
              <a href={`#${slug(section.title)}`} key={section.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                {section.title}
              </a>
            ))}
          </nav>
        </aside>
        <div className="policy-content">
          {privacyConfig.sections.map((section, index) => (
            <section id={slug(section.title)} key={section.title}>
              <div className="policy-section-heading">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h2>{section.title}</h2>
              </div>
              {!section.verified && <span className="verify-label">REQUIRES VERIFICATION</span>}
              <Blocks blocks={section.blocks} />
              {section.title === 'Contact' &&
                (siteConfig.supportEmail ? (
                  <p>
                    Email:{' '}
                    <a href={`mailto:${siteConfig.supportEmail}`}>{siteConfig.supportEmail}</a>
                  </p>
                ) : (
                  <p className="contact-unconfigured">
                    Support contact details will be added before release.
                  </p>
                ))}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
