import type { Metadata } from 'next'
import PricingClient from '@/components/pricing/PricingClient'

export const metadata: Metadata = {
  title: '요금제 & 견적',
  description: '오늘의 대회 요금제를 확인하고 나에게 맞는 플랜을 선택하세요. Basic, Standard, Premium 플랜 제공.',
}

export default function PricingPage() {
  return <PricingClient />
}
