import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Script from 'next/script';

export const metadata: Metadata = {
  title: {
    default: '오늘의 대회 (TodayContest) - 대한민국 1위 AI 공모전 홍보 플랫폼',
    template: '%s | 오늘의 대회',
  },
  description: '단 한 번의 등록으로 대한민국 모든 기회와 연결됩니다. AI 기반 공모전·대회 자동 홍보 플랫폼 오늘의 대회로 40개 채널 동시 홍보하세요.',
  keywords: ['공모전', '대회', '오늘의 대회', 'TodayContest', 'AI 홍보', '공모전 등록', '상금', '스펙업'],
  authors: [{ name: '(주)수상한콘텐츠' }],
  creator: '(주)수상한콘텐츠',
  publisher: '오늘의 대회',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://todaycontest.kr',
    siteName: '오늘의 대회 (TodayContest)',
    title: '오늘의 대회 - 대한민국 1위 AI 공모전 홍보 플랫폼',
    description: '단 한 번의 등록으로 40개 채널 동시 홍보! AI 기반 공모전·대회 자동 홍보 플랫폼',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '오늘의 대회 (TodayContest)',
    description: '단 한 번의 등록으로 40개 채널 동시 홍보! AI 기반 공모전·대회 자동 홍보 플랫폼',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: '오늘의 대회 (TodayContest)',
  alternateName: '(주)수상한콘텐츠',
  url: 'https://todaycontest.kr',
  logo: 'https://todaycontest.kr/logo.png',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '02-6953-1996',
    contactType: 'customer service',
    availableLanguage: 'Korean',
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: '화랑로 265, 3층',
    addressLocality: '성북구',
    addressRegion: '서울특별시',
    addressCountry: 'KR',
  },
  email: 'abc@babkorea.com',
  foundingDate: '2023',
  description: '대한민국 1위 AI 기반 공모전·대회 자동 홍보 플랫폼',
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: '오늘의 대회',
  url: 'https://todaycontest.kr',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://todaycontest.kr/contests?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="bg-background text-text antialiased">
        <Header />
        <main className="pt-16 min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
