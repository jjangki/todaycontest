import type { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import MarqueeSection from '@/components/home/MarqueeSection';
import ProcessSection from '@/components/home/ProcessSection';
import StatsSection from '@/components/home/StatsSection';
import PartnerSection from '@/components/home/PartnerSection';
import FeaturedContests from '@/components/home/FeaturedContests';
import CTASection from '@/components/home/CTASection';

export const metadata: Metadata = {
  title: '오늘의 대회 - 대한민국 1위 AI 공모전·대회 자동 홍보 플랫폼',
  description: '단 한 번의 등록, 40개 채널 동시 홍보! AI 기반 공모전 자동 홍보 서비스로 도달률을 극대화하세요.',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MarqueeSection />
      <StatsSection />
      <ProcessSection />
      <FeaturedContests />
      <PartnerSection />
      <CTASection />
    </>
  );
}
