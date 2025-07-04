import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LanguageProvider from "../src/components/LanguageProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: '🌍 每日冷知識 Daily Fact',
  description: '每天一則冷知識，支援多語言，讓你每天都學到一點點有趣的事！',
  keywords: ['冷知識', '每日知識', 'fun facts', '日常知識', '知識小品'],
  authors: [{ name: 'Alen' }],
  publisher: 'Alen',
  robots: 'index, follow',
  openGraph: {
    title: '🌍 每日冷知識 Daily Fact',
    description: '每天一則冷知識，支援多語言，讓你每天都學到一點點有趣的事！',
    url: 'https://yourdomain.com', // TODO: change after deploy
    siteName: '每日冷知識',
    locale: 'zh_TW',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '每日冷知識 Daily Fact',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '🌍 每日冷知識 Daily Fact',
    description: '每天一則冷知識，支援多語言，讓你每天都學到一點點有趣的事！',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
