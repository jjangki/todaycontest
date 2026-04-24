import type { Metadata } from 'next'
import ServiceClient from '@/components/service/ServiceClient'

export const metadata: Metadata = {
  title: '서비스 소개',
  description: 'AI가 40개 채널에 자동 발행하는 오늘의 대회 서비스를 소개합니다. Before/After 비교, 핵심 기능, FAQ 등을 확인하세요.',
}

export default function ServicePage() {
  return <ServiceClient />
}
