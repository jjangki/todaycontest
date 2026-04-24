import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  metadataBase: new URL('https://todaycontest.kr'),
  title: {
    default: '오늘의 대회 - 대한민국 1위 AI 공모전·대회 자동 홍보 플랫폼',
    template: '%s | 오늘의 대회',
  },
  description: '단 한 번의 등록으로 인스타그램, 유튜브, 네이버블로그 등 40개 채널 동시 홍보. AI가 채널별 최적화된 콘텐츠를 자동 생성합니다.',
  keywords: ['공모전', '대회', '홍보', 'AI', '자동등록', '인스타그램', '유튜브', '네이버'],
  authors: [{ name: '(주)수상한콘텐츠' }],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://todaycontest.kr',
    siteName: '오늘의 대회',
    title: '오늘의 대회 - 대한민국 1위 AI 공모전·대회 자동 홍보 플랫폼',
    description: '단 한 번의 등록으로 40개 채널 동시 홍보',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '오늘의 대회',
    description: '단 한 번의 등록으로 40개 채널 동시 홍보',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
