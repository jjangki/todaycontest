import type { Metadata } from 'next';
import ContestListClient from '@/components/contests/ContestListClient';

export const metadata: Metadata = {
  title: '오늘의 대회 - 공모전/대회 목록',
  description: '대한민국 모든 공모전과 대회를 한 눈에! 신규등록, 마감임박, 상금높은순으로 필터링하여 나에게 맞는 대회를 찾아보세요.',
};

export default function ContestsPage() {
  return (
    <section className="pt-8 pb-20">
      <div className="container-max">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-black text-text">
            🏆 <span className="text-gradient">오늘의 대회</span>
          </h1>
          <p className="text-text-muted mt-2 text-lg">
            대한민국 모든 공모전을 한 곳에서. 지금 바로 찾아보세요.
          </p>
        </header>
        <ContestListClient />
      </div>
    </section>
  );
}
