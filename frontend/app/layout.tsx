import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import { ToastProvider } from '@/components/ui/Toast';

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
  description: 'Elite corporate communications, media relations, crisis advisory, and thought leadership consultancy.',
  icons: {
    icon: [
      { url: '/assets/brand/favicon.ico', sizes: 'any' },
      { url: '/assets/brand/favicon.png', type: 'image/png' },
    ],
    apple: '/assets/brand/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Kalka Co. Media Consultancy — Strategic Communication. Lasting Impact.',
    description: 'Strategic communications and public relations consultancy focused on helping businesses, brands, organizations and industry leaders build visibility, strengthen reputation and create meaningful engagement.',
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
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${outfit.variable}`}>
      <body className="min-h-screen bg-white text-slate-900 antialiased font-sans flex flex-col">
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
