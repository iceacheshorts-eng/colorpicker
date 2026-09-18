import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Color Palette Generator | Create Beautiful Color Schemes',
  description: 'Generate beautiful color palettes for websites, brands, apps, and creative projects. Copy HEX, RGB, HSL, CSS variables, Tailwind config, and more.',
  keywords: ['color palette generator', 'color schemes', 'design tools', 'tailwind colors', 'accessible colors'],
  openGraph: {
    title: 'Color Palette Generator',
    description: 'Create beautiful, accessible color palettes in seconds.',
    url: 'https://yourdomain.com', // Replace with actual domain later
    siteName: 'Color Palette Generator',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Color Palette Generator preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Color Palette Generator',
    description: 'Create beautiful, accessible color palettes in seconds.',
    images: ['/og-image.svg'],
  },
  alternates: {
      canonical: 'https://yourdomain.com',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} bg-background text-foreground min-h-screen flex flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main className="flex-grow">
              {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
