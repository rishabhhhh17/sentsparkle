import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import { Suspense } from 'react';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import MetaPixel from '@/components/MetaPixel';

const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-display',
  display: 'swap',
});

const sans = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://sentsparkle.in'),
  title: { default: 'SentSparkle — Eaux de parfum that catch the light', template: '%s · SentSparkle' },
  description:
    'SentSparkle is a small Bombay perfume house. Slow-blended, long-wearing eaux de parfum in four signatures.',
  openGraph: {
    type: 'website',
    title: 'SentSparkle — Eaux de parfum that catch the light',
    description: 'Slow-blended, long-wearing eaux de parfum in four signatures.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="font-sans bg-ivory text-ink">
        <Suspense fallback={null}>
          <MetaPixel />
        </Suspense>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
