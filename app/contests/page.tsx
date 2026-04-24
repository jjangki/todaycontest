import type { Metadata } from 'next'
import ContestListClient from '@/components/contests/ContestListClient'

export const metadata: Metadata = {
  title: '공모전·대회 목록',
  description: '대한민국 최신 공모전, 대외활동, 대회 정보를 한눈에. 60개 이상의 공모전을 검색하고 즉시 지원하세요.',
}

export default function ContestsPage() {
  return <ContestListClient />
}
