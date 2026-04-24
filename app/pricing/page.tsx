import type { Metadata } from 'next';
import PricingPageClient from '@/components/pricing/PricingPageClient';

export const metadata: Metadata = {
  title: '요금제 & 대행 견적서 | 오늘의 대회',
  description: '공모전 주최에 필요한 모든 서비스를 쇼핑하듯 선택하세요. 기획/디자인, 온라인 홍보, 오프라인 마케팅, 시상식까지 아이콘 클릭으로 실시간 견적을 확인하세요.',
};

export default function PricingPage() {
  return <PricingPageClient />;
}
