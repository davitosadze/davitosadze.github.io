export type PolicyBlock =
  { type: 'p'; text: string } | { type: 'list'; items: string[] } | { type: 'link'; url: string };
const p = (text: string): PolicyBlock => ({ type: 'p', text });
const list = (...items: string[]): PolicyBlock => ({ type: 'list', items });
const link = (url: string): PolicyBlock => ({ type: 'link', url });

export const privacyConfig: {
  verified: boolean;
  lastUpdated: string;
  intro: PolicyBlock[];
  sections: { title: string; blocks: PolicyBlock[]; verified: boolean }[];
} = {
  verified: true,
  lastUpdated: '2026-09-19',
  intro: [
    p(
      'Balance Keeper (“we”, “our”, or “the app”) respects your privacy. This Privacy Policy explains how information is handled when you use the Balance Keeper mobile game.',
    ),
  ],
  sections: [
    {
      title: 'Information We Collect',
      blocks: [
        p(
          'Balance Keeper does not require you to create an account or provide personal information such as your name, email address, phone number, or physical address in order to play.',
        ),
        p(
          'Game progress and preferences may be stored locally on your device. This may include information such as:',
        ),
        list(
          'Completed levels',
          'Stars and scores',
          'Coins and in-game progress',
          'Unlocked or purchased in-game items',
          'Game settings and preferences',
        ),
        p('This locally stored game data is used to provide and maintain your game experience.'),
      ],
      verified: true,
    },
    {
      title: 'Advertising',
      blocks: [
        p(
          'Balance Keeper uses Google AdMob, a third-party advertising service provided by Google.',
        ),
        p('The app may display:'),
        list(
          'Rewarded advertisements that you voluntarily choose to watch in exchange for an in-game benefit, such as continuing after a failed level or receiving another eligible game benefit.',
          'Interstitial advertisements that may appear at appropriate transitions between levels.',
        ),
        p(
          'Balance Keeper does not require you to watch rewarded advertisements in order to use the core game.',
        ),
        p(
          'Google Mobile Ads may automatically collect or process certain information for purposes such as delivering advertisements, measuring advertising performance, analytics, and preventing fraud or abuse.',
        ),
        p(
          'Depending on your device, settings, location, consent choices, and applicable law, this information may include:',
        ),
        list(
          'IP address, which may be used to estimate general location',
          'Device and advertising identifiers',
          'App interactions, such as app launches, taps, and ad/video interactions',
          'Diagnostic and performance information',
          'Information related to advertisements displayed or interacted with',
        ),
        p(
          'Google’s handling of this information is governed by Google’s own privacy policies and advertising policies.',
        ),
        p(
          'You can learn more about how Google uses information from apps that use its services at:',
        ),
        link('https://policies.google.com/technologies/partner-sites'),
        p('Google Privacy Policy:'),
        link('https://policies.google.com/privacy'),
      ],
      verified: true,
    },
    {
      title: 'Advertising Choices and Consent',
      blocks: [
        p(
          'Depending on your region and applicable privacy laws, you may be presented with options regarding advertising personalization and consent.',
        ),
        p(
          'Where required, Balance Keeper and Google AdMob may request consent before using certain information for advertising purposes.',
        ),
        p(
          'You can also manage certain advertising privacy settings through your Android device and Google account settings.',
        ),
        p(
          'On supported Android devices, you may be able to reset or delete your device’s advertising ID through your device’s privacy settings.',
        ),
      ],
      verified: true,
    },
    {
      title: 'Game Progress and Local Storage',
      blocks: [
        p('Balance Keeper currently stores game progress and preferences locally on your device.'),
        p('We do not currently provide user accounts or cloud synchronization for game progress.'),
        p(
          'Deleting the app or clearing its application data may permanently remove locally stored progress and settings.',
        ),
      ],
      verified: true,
    },
    {
      title: 'Analytics and Diagnostics',
      blocks: [
        p('Balance Keeper does not currently operate its own user analytics or tracking backend.'),
        p(
          'However, third-party services integrated into the app, including Google AdMob and its underlying Google Mobile Ads SDK, may process app interaction, diagnostic, performance, and device information as necessary to provide advertising, measurement, analytics, and fraud-prevention services.',
        ),
      ],
      verified: true,
    },
    {
      title: 'Data Sharing',
      blocks: [
        p('We do not sell your personal information.'),
        p(
          'Information may be processed or shared with third-party service providers used by the app, primarily Google through Google AdMob and the Google Mobile Ads SDK.',
        ),
        p(
          'These third parties process information according to their own privacy policies and applicable legal requirements.',
        ),
      ],
      verified: true,
    },
    {
      title: 'In-Game Currency and Rewards',
      blocks: [
        p('Balance Keeper may contain virtual coins, rewards, and unlockable game content.'),
        p('Game progress and virtual currency information may be stored locally on your device.'),
        p(
          'Rewarded advertisements may provide eligible in-game benefits after successful completion of an advertisement.',
        ),
        p(
          'Virtual items and currency have no real-world monetary value unless explicitly stated otherwise.',
        ),
      ],
      verified: true,
    },
    {
      title: 'Children’s Privacy',
      blocks: [
        p(
          'Balance Keeper is not intended to knowingly collect personal information directly from children.',
        ),
        p(
          'We do not require players to submit their name, email address, phone number, or other direct contact information to play the game.',
        ),
        p(
          'Advertising and data handling may be subject to additional requirements depending on the age groups selected for the app in Google Play and the countries where the app is distributed.',
        ),
        p(
          'If you believe personal information from a child has been collected inappropriately, please contact us using the information below.',
        ),
      ],
      verified: true,
    },
    {
      title: 'Data Retention',
      blocks: [
        p(
          'Game progress stored locally remains on your device until it is deleted, cleared, or the application is uninstalled.',
        ),
        p(
          'Information processed by third-party services such as Google AdMob is retained according to those providers’ respective policies and legal obligations.',
        ),
      ],
      verified: true,
    },
    {
      title: 'Security',
      blocks: [
        p(
          'We take reasonable steps to design Balance Keeper so that unnecessary personal information is not requested from players.',
        ),
        p(
          'However, no electronic transmission or storage system can be guaranteed to be completely secure.',
        ),
      ],
      verified: true,
    },
    {
      title: 'Your Choices',
      blocks: [
        p('You may:'),
        list(
          'Choose not to watch optional rewarded advertisements',
          'Manage advertising and privacy settings through your device or Google account',
          'Reset or delete your Android advertising ID where supported',
          'Delete locally stored Balance Keeper data by clearing the app’s data or uninstalling the app',
          'Contact us with questions about this Privacy Policy',
        ),
      ],
      verified: true,
    },
    {
      title: 'Third-Party Services',
      blocks: [
        p('Balance Keeper currently uses:'),
        p('Google AdMob / Google Mobile Ads SDK'),
        p('Provided by Google LLC'),
        p('Google Privacy Policy:'),
        link('https://policies.google.com/privacy'),
        p('How Google uses information from sites and apps that use Google services:'),
        link('https://policies.google.com/technologies/partner-sites'),
      ],
      verified: true,
    },
    {
      title: 'International Users',
      blocks: [
        p(
          'Third-party providers used by Balance Keeper may process information in countries other than the country where you live.',
        ),
        p(
          'Such processing is subject to the privacy practices, safeguards, and legal obligations of those providers.',
        ),
      ],
      verified: true,
    },
    {
      title: 'Changes to This Privacy Policy',
      blocks: [
        p(
          'We may update this Privacy Policy when Balance Keeper’s features, advertising providers, data practices, or legal requirements change.',
        ),
        p(
          'When the policy is updated, the “Last updated” date at the top of this page will be changed.',
        ),
        p('We encourage users to review this Privacy Policy periodically.'),
      ],
      verified: true,
    },
    {
      title: 'Contact',
      blocks: [
        p(
          'If you have questions or concerns regarding this Privacy Policy or Balance Keeper’s privacy practices, contact:',
        ),
      ],
      verified: true,
    },
  ],
};
