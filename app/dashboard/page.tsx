import type { Metadata } from 'next'
import DashboardClient from '@/components/dashboard/DashboardClient'

export const metadata: Metadata = {
  title: '주최사 대시보드',
  description: '대회 등록, AI 콘텐츠 생성, 40개 채널 동시 발행을 관리하는 주최사 전용 대시보드입니다.',
}

export default function DashboardPage() {
  return <DashboardClient />
}
