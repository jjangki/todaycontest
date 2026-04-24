import type { Metadata } from 'next';
import ServicePageClient from '@/components/service/ServicePageClient';

export const metadata: Metadata = {
  title: '서비스 소개 | 오늘의 대회',
  description: 'AI 기반 공모전 자동 홍보 서비스 오늘의 대회를 소개합니다. 40개 채널 동시 배포, Smart AI Creator, 넷플릭스형 큐레이션 UI를 경험해보세요.',
};

export default function ServicePage() {
  return <ServicePageClient />;
}
