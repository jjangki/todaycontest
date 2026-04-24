import type { Metadata } from 'next';
import DashboardClient from '@/components/dashboard/DashboardClient';

export const metadata: Metadata = {
  title: '주최사 CMS | 오늘의 대회',
  description: '공모전을 등록하고 AI 자동 홍보 시스템을 통해 40개 채널에 동시 배포하세요. 채널별 맞춤 콘텐츠를 AI가 자동으로 생성합니다.',
};

export default function DashboardPage() {
  return <DashboardClient />;
}
