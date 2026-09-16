import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import { ToastProvider } from '@/components/ui/Toast';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { OrganizationJsonLd } from '@/components/seo/JsonLd';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://kalka.co'),
  title: {
    template: '%s | Kalka Co. Media Consultancy',
    default: 'Kalka Co. Media Consultancy — Strategic Communication. Lasting Impact.',
  },
  description:
    'Kalka Co. Media Consultancy is a premier strategic communications and public relations consultancy helping businesses, brands, organizations and industry leaders build visibility, strengthen reputation and create meaningful engagement.',
  alternates: {
    canonical: './',
  },
  icons: {
    icon: [
      { url: '/assets/brand/favicon.ico', sizes: 'any' },
      { url: '/assets/brand/favicon.png', type: 'image/png' },
    ],
    apple: '/assets/brand/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Kalka Co. Media Consultancy — Strategic Communication. Lasting Impact.',
    description:
      'Strategic communications and public relations consultancy focused on helping businesses, brands, organizations and industry leaders build visibility, strengthen reputation and create meaningful engagement.',
    url: 'https://kalka.co',
    siteName: 'Kalka Co. Media Consultancy',
    images: [
      {
        url: '/assets/social/og-default.jpg',
        width: 1731,
        height: 909,
        alt: 'Kalka Co. Media Consultancy',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kalka Co. Media Consultancy — Strategic Communication. Lasting Impact.',
    description:
      'Strategic communications and public relations consultancy focused on helping businesses, brands, organizations and industry leaders build visibility, strengthen reputation and create meaningful engagement.',
    images: ['/assets/social/og-default.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${outfit.variable}`}>
      <head>
        <OrganizationJsonLd />
      </head>
      <body className="min-h-screen bg-white text-slate-900 antialiased font-sans flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-navy-deep focus:text-gold focus:border focus:border-gold focus:rounded focus:shadow-elevated font-medium text-xs"
        >
          Skip to main content
        </a>
        <ToastProvider>
          {children}
        </ToastProvider>
        <GoogleAnalytics />
      </body>
    </html>
  );
}
