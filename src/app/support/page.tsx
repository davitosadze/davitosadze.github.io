import Link from 'next/link';
import { pageMetadata } from '@/config/metadata';
import { siteConfig } from '@/config/site';
import { Icon, type IconName } from '@/components/icons';
export const metadata = pageMetadata(
  'Support – Balance Keeper',
  'Get help with Balance Keeper gameplay, purchases, rewards and technical issues.',
  '/support/',
);
const categories: { name: string; icon: IconName; content: string }[] = [
  {
    name: 'Gameplay',
    icon: 'bottle',
    content:
      'Check each bottle’s target before placing a weight. Combine the available weights carefully, and use hints, undo or shuffle when you need a little help.',
  },
  {
    name: 'Purchases',
    icon: 'coins',
    content:
      'For a purchase issue, include the item name, the date and your Google Play order reference when contacting support. Never send payment card details or passwords.',
  },
  {
    name: 'Advertising / Rewards',
    icon: 'star',
    content:
      'If an advertising or reward issue occurs, describe what happened, the expected reward and the approximate time. Check your internet connection for features that require it.',
  },
  {
    name: 'Technical Issues',
    icon: 'hint',
    content:
      'Try the troubleshooting steps below. If the issue continues, include your device and app details so it can be investigated.',
  },
  {
    name: 'Feedback',
    icon: 'leaf',
    content:
      'Have a thought about a puzzle, a bottle design or your experience? Include as much detail as you like when contacting support.',
  },
];
export default function SupportPage() {
  return (
    <div className="document-page support-page">
      <Link className="back-link" href="/">
        ← Back to the workshop
      </Link>
      <div className="document-heading">
        <span className="eyebrow">A LITTLE HELP GOES A LONG WAY</span>
        <h1>
          Balance Keeper <em>Support</em>
        </h1>
        <p>Need help with Balance Keeper? We’re here to help.</p>
      </div>
      <div className="support-layout">
        <div>
          <h2 className="small-section-title">What can we help with?</h2>
          <div className="support-categories">
            {categories.map((category) => (
              <details key={category.name}>
                <summary>
                  <Icon name={category.icon} />
                  <span>{category.name}</span>
                  <span className="details-plus" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p>{category.content}</p>
              </details>
            ))}
          </div>
          <section className="troubleshooting">
            <h2>A few things to try first</h2>
            <ol>
              <li>
                <strong>Restart the game.</strong> Close Balance Keeper and open it again.
              </li>
              <li>
                <strong>Check for an update.</strong> Make sure the latest version is installed.
              </li>
              <li>
                <strong>Restart your device.</strong> Then try opening the game again.
              </li>
              <li>
                <strong>Check your connection.</strong> Some features may require internet
                connectivity.
              </li>
            </ol>
          </section>
        </div>
        <aside className="support-contact" id="contact">
          <div className="contact-icon">
            <Icon name="mail" size={28} />
          </div>
          <h2>Contact Support</h2>
          <p>Tell us what’s happening. A little detail helps us understand the issue.</p>
          {siteConfig.supportEmail ? (
            <>
              <a className="contact-button" href={`mailto:${siteConfig.supportEmail}`}>
                <Icon name="mail" size={18} /> Email support <Icon name="arrow" size={18} />
              </a>
              <a className="support-email" href={`mailto:${siteConfig.supportEmail}`}>
                {siteConfig.supportEmail}
              </a>
            </>
          ) : (
            <div className="contact-pending">
              <strong>Support contact coming soon</strong>
              <p>Our email address will be available here before the game launches.</p>
            </div>
          )}
          <div className="bug-details">
            <h3>Reporting a bug?</h3>
            <p>Please include:</p>
            <ul>
              <li>Device model</li>
              <li>Android version</li>
              <li>Balance Keeper app version</li>
              <li>A description of the issue</li>
              <li>A screenshot or video, if possible</li>
            </ul>
          </div>
        </aside>
      </div>
      <div className="support-privacy">
        <Icon name="shield" />
        <p>
          Looking for information about privacy?{' '}
          <Link href="/privacy/">Read our privacy policy</Link>.
        </p>
      </div>
    </div>
  );
}
