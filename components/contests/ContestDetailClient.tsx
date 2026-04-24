'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Contest } from '@/lib/data';

interface Props {
  contest: Contest;
  similar: Contest[];
}

function DdayTimer({ deadline }: { deadline: string }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calc = () => {
      const diff = new Date(deadline).getTime() - Date.now();
      if (diff <= 0) return;
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };
    calc();
    const t = setInterval(calc, 1000);
    return () => clearInterval(t);
  }, [deadline]);

  return (
    <div className="grid grid-cols-4 gap-2 mb-5">
      {[
        { label: '일', val: timeLeft.days },
        { label: '시', val: timeLeft.hours },
        { label: '분', val: timeLeft.minutes },
        { label: '초', val: timeLeft.seconds },
      ].map(({ label, val }) => (
        <div key={label} className="bg-gray-900 text-white rounded-xl p-3 text-center">
          <div className="text-2xl font-black font-inter">{String(val).padStart(2, '0')}</div>
          <div className="text-xs text-gray-400 mt-0.5">{label}</div>
        </div>
      ))}
    </div>
  );
}

export default function ContestDetailClient({ contest, similar }: Props) {
  const [shared, setShared] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: contest.title, text: contest.description, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
  };

  return (
    <div className="pt-8 pb-20">
      <div className="container-max">
        {/* Breadcrumb */}
        <nav aria-label="경로" className="flex items-center gap-2 text-sm text-text-muted mb-8">
          <Link href="/" className="hover:text-primary transition-colors">홈</Link>
          <span>/</span>
          <Link href="/contests" className="hover:text-primary transition-colors">오늘의 대회</Link>
          <span>/</span>
          <span className="text-text font-medium line-clamp-1">{contest.title}</span>
        </nav>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Left: Detail Info */}
          <div className="lg:col-span-2">
            {/* Poster */}
            <div className={`w-full aspect-[4/3] rounded-3xl bg-gradient-to-br ${contest.color} flex items-center justify-center mb-8 shadow-xl`}>
              <div className="text-center text-white p-8">
                <div className="text-6xl mb-4">🏆</div>
                <h1 className="text-2xl md:text-3xl font-black leading-tight mb-3">
                  {contest.title}
                </h1>
                <p className="text-white/80 font-semibold">{contest.organizer}</p>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {contest.tags.map(tag => (
                <span key={tag} className="tag">#{tag}</span>
              ))}
              <span className="badge badge-red">D-{contest.dday}</span>
              {contest.isNew && <span className="badge badge-accent">🆕 신규등록</span>}
              {contest.isHot && <span className="badge badge-primary">🔥 인기</span>}
            </div>

            {/* Title & Basic Info */}
            <article>
              <h1 className="text-2xl md:text-3xl font-black text-text mb-6 leading-tight">
                {contest.title}
              </h1>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {[
                  { label: '주최사', value: contest.organizer, icon: '🏢' },
                  { label: '총 상금', value: contest.prizeText, icon: '💰' },
                  { label: '참여 대상', value: contest.target, icon: '👥' },
                  { label: '분야', value: contest.field, icon: '📂' },
                  { label: '접수 시작', value: contest.startDate, icon: '📅' },
                  { label: '마감일', value: contest.deadline, icon: '⏰' },
                ].map(({ label, value, icon }) => (
                  <div key={label} className="bg-gray-50 rounded-xl p-4">
                    <div className="text-xs text-text-muted mb-1">{icon} {label}</div>
                    <div className="font-semibold text-text">{value}</div>
                  </div>
                ))}
              </div>

              {/* Description */}
              <section aria-labelledby="desc-title" className="mb-8">
                <h2 id="desc-title" className="text-xl font-bold text-text mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-primary rounded-full" />
                  대회 개요
                </h2>
                <p className="text-text-muted leading-relaxed">{contest.description}</p>
              </section>

              {/* Benefits */}
              <section aria-labelledby="benefit-title" className="mb-8">
                <h2 id="benefit-title" className="text-xl font-bold text-text mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-accent rounded-full" />
                  참여 혜택
                </h2>
                <ul className="space-y-2.5">
                  {contest.benefits.map(b => (
                    <li key={b} className="flex items-center gap-3 text-text-muted">
                      <span className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0 text-xs">✓</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Eligibility */}
              <section aria-labelledby="elig-title" className="mb-8">
                <h2 id="elig-title" className="text-xl font-bold text-text mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-purple-400 rounded-full" />
                  참여 자격
                </h2>
                <p className="text-text-muted bg-purple-50 rounded-xl p-4">{contest.eligibility}</p>
              </section>

              {/* Share */}
              <div className="flex gap-3">
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-text rounded-xl font-medium text-sm transition-colors"
                >
                  {shared ? '✅ 복사됨!' : '🔗 공유하기'}
                </button>
                <button className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-text rounded-xl font-medium text-sm transition-colors">
                  ❤️ 찜하기
                </button>
              </div>
            </article>
          </div>

          {/* Right: Sticky CTA */}
          <aside className="lg:col-span-1">
            <div className="sticky-quote">
              <div className="card p-6 border-2 border-border">
                <div className="text-center mb-5">
                  <div className="text-sm text-text-muted mb-1">마감까지 남은 시간</div>
                  <div className="text-3xl font-black text-primary font-inter">D-{contest.dday}</div>
                </div>

                <DdayTimer deadline={contest.deadline} />

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted">마감일</span>
                    <span className="font-semibold text-text">{contest.deadline}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted">총 상금</span>
                    <span className="font-bold text-primary">{contest.prizeText}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted">참여 대상</span>
                    <span className="font-semibold text-text">{contest.target}</span>
                  </div>
                </div>

                <a
                  href={contest.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-4 bg-primary text-white text-center font-black text-lg rounded-xl hover:bg-primary-dark transition-colors shadow-md hover:shadow-glow"
                >
                  🚀 공식 홈페이지 접수
                </a>

                <div className="mt-4 text-center text-xs text-text-light">
                  * 접수는 공식 홈페이지에서 진행됩니다
                </div>
              </div>

              {/* AI summary box */}
              <div className="mt-4 card p-4 border border-primary/20 bg-primary/5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">🤖</span>
                  <span className="font-bold text-primary text-sm">AI 요약 모집 요강</span>
                </div>
                <ul className="space-y-1.5 text-xs text-text-muted">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">▸</span>
                    <span>주최: {contest.organizer}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">▸</span>
                    <span>대상: {contest.target}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">▸</span>
                    <span>상금: {contest.prizeText}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">▸</span>
                    <span>기간: {contest.startDate} ~ {contest.deadline}</span>
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>

        {/* Similar Contests */}
        {similar.length > 0 && (
          <section aria-labelledby="similar-title" className="mt-16 pt-10 border-t border-border">
            <h2 id="similar-title" className="text-2xl font-bold text-text mb-6">
              🎯 이 대회와 비슷한 추천 공모전
            </h2>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {similar.map(c => (
                <Link key={c.id} href={`/contests/${c.id}`}>
                  <article className={`aspect-square rounded-xl bg-gradient-to-br ${c.color} flex flex-col items-center justify-center text-white text-center p-3 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 cursor-pointer`}>
                    <div className="text-xl mb-1">🏆</div>
                    <p className="text-[10px] font-bold line-clamp-2 leading-tight">{c.title}</p>
                    <p className="text-[9px] text-white/70 mt-1">{c.prizeText}</p>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
