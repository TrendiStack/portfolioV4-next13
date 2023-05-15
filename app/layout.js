import { Inter } from 'next/font/google';
import ClientOnly from './components/Client';

import './styles/globals.css';
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Terel Phillips',
  description: 'Created by Terel Phillips',
  url: 'https://terel-phillips.ca',
  image: 'https://terel-phillips.ca/images/og.png',
  keywords: [
    'Terel Phillips',
    'Terel',
    'Phillips',
    'Terel Phillips Portfolio',
    'Terel Phillips Blog',
    'Terel Phillips Resume',
    'Terel Phillips Projects',
    'Terel Phillips Contact',
    'Terel Phillips About',
  ],

  // Open Graph
  ogSiteName: 'Terel Phillips',
  ogTitle: 'Terel Phillips',
  ogDescription: 'Created by Terel Phillips',
  ogImage: 'https://terel-phillips.ca/images/og.png',
  ogUrl: 'https://terel-phillips.ca',

  // Twitter
  twitterCard: 'summary_large_image',
  twitterSite: '@TerelPhillips',
  twitterCreator: '@TerelPhillips',

  // PWA
  themeColor: '#000000',
  backgroundColor: '#ffffff',

  // Google Analytics
  googleAnalyticsId: 'UA-XXXXXXXXX-X',

  // Manifest
  manifestName: 'Terel Phillips',
  manifestShortName: 'Terel Phillips',
  manifestStartUrl: '/',
  manifestBackgroundColor: '#ffffff',
  manifestThemeColor: '#000000',
  manifestDisplay: 'standalone',
  manifestIcon: 'src/images/og.png',

  // Social
  socialLinks: [
    {
      name: 'GitHub',
      url: '',
    },
    {
      name: 'Twitter',
      url: '',
    },
    {
      name: 'Instagram',
      url: '',
    },
    {
      name: 'LinkedIn',
      url: '',
    },
    {
      name: 'Codepen',
      url: '',
    },
  ],

  // Contact
  contactEmail: '',

  // Footer
  footerText: '',

  // Tracking
  googleAnalyticsId: '',
  googleTagManagerId: '',
  facebookPixelId: '',
  hotjarId: '',
  hubspotId: '',

  // Other
  favicon: '/public/favicon.ico',
  googleFonts: [
    {
      family: 'Inter',
      variants: ['400', '500', '600', '700'],
    },
  ],

  // Site
  siteUrl: 'https://terel-phillips.ca',
  siteLanguage: 'en_US',
  siteLocale: 'en_us',
  twitterUsername: '@TerelPhillips',
  authorName: 'Terel Phillips',
  siteDescription: 'Created by Terel Phillips',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientOnly>{children}</ClientOnly>
      </body>
    </html>
  );
}
