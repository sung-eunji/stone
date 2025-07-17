import type { Metadata } from 'next';
import { Geist, Geist_Mono, Space_Grotesk } from 'next/font/google';
import './globals.css';
import Header from './Header';
import { SessionProvider } from 'next-auth/react';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const spaceGrotesk = Space_Grotesk({
  variable: '--font-spacegrotesk',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'stone',
  description: 'stone',
  icons: {
    icon: '/images/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} antialiased bg-white text-black min-h-screen flex flex-col`}
      >
        <SessionProvider>
          <Header />
          <main className="">{children}</main>
          <footer className="w-full border-t border-gray-200 py-4 mt-8 text-center text-sm ">
            <section className="flex justify-around items-center">
              <div className="text-xl">stone</div>
              <div className="flex justify-around items-center gap-4">
                <div className="flex flex-col gap-4">
                  <div className="text-xl">Location</div>
                  <div>Marseille, London,Seoul</div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="text-xl">Contact</div>
                  <div>service@stone.com</div>
                </div>
              </div>
            </section>
            <div className="text-gray-500 mt-4">
              © {new Date().getFullYear()} stone. All rights reserved.
            </div>
          </footer>
        </SessionProvider>
      </body>
    </html>
  );
}
