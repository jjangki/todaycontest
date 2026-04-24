import type { Metadata } from 'next'
import HomeClient from '@/components/home/HomeClient'

export const metadata: Metadata = {
  title: '오늘의 대회 - 대한민국 1위 AI 공모전·대회 자동 홍보 플랫폼',
  description: '단 한 번의 등록으로 인스타그램, 유튜브, 네이버블로그 등 40개 채널 동시 홍보. AI가 채널별 최적화된 콘텐츠를 자동 생성합니다.',
}

export default function HomePage() {
  return <HomeClient />
}
