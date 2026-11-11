import Link from 'next/link';
export default function NotFound() {
  return (
    <div className="not-found">
      <span className="eyebrow">A LITTLE OUT OF BALANCE</span>
      <h1>This page slipped away.</h1>
      <p>Let’s get you back to the workshop.</p>
      <Link href="/" className="contact-button">
        Back to Balance Keeper →
      </Link>
    </div>
  );
}
