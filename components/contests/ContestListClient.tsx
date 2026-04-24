'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { contests, Contest } from '@/lib/data';

type FilterType = 'all' | 'new' | 'deadline' | 'prize';

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function ContestListClient() {
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    let list = [...contests];

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(c =>
        c.title.toLowerCase().includes(q) ||
        c.organizer.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    // Tab filter
    switch (filter) {
      case 'new':
        list = list.filter(c => c.isNew).sort((a, b) => b.id - a.id);
        break;
      case 'deadline':
        list = list.filter(c => c.dday <= 30).sort((a, b) => a.dday - b.dday);
        break;
      case 'prize':
        list = list.sort((a, b) => b.prize - a.prize);
        break;
      default:
        list = shuffleArray(list);
        break;
    }

    return list.slice(0, 60);
  }, [filter, searchQuery]);

  return (
    <>
      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <input
            type="search"
            placeholder="대회명, 주최사, 분야 검색..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="input-field pl-10 pr-4 text-sm"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">🔍</span>
        </div>

        {/* Filter Tabs */}
        <nav className="flex items-center gap-2 flex-wrap" role="tablist" aria-label="공모전 필터">
          {[
            { key: 'all', label: '🎯 전체보기' },
            { key: 'new', label: '🔥 신규등록' },
            { key: 'deadline', label: '⏰ 마감임박' },
            { key: 'prize', label: '💰 상금높은순' },
          ].map(tab => (
            <button
              key={tab.key}
              role="tab"
              aria-selected={filter === tab.key}
              onClick={() => setFilter(tab.key as FilterType)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 border ${
                filter === tab.key
                  ? 'bg-primary text-white border-primary shadow-md'
                  : 'bg-white text-text-muted border-border hover:border-primary hover:text-primary'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Result count */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-text-muted">
          <strong className="text-text font-semibold">{filtered.length}개</strong>의 공모전을 찾았습니다
        </p>
        <span className="text-xs text-text-light bg-gray-100 px-3 py-1 rounded-full">
          {filter === 'all' ? '새로고침마다 랜덤 노출' : '필터 적용 중'}
        </span>
      </div>

      {/* Contest Grid - 6 x 10 */}
      {filtered.length === 0 ? (
        <div className="py-20 text-center">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-text-muted font-medium">검색 결과가 없습니다</p>
          <p className="text-text-light text-sm mt-1">다른 키워드로 검색해보세요</p>
        </div>
      ) : (
        <div className="contest-grid grid grid-cols-6 gap-2 md:gap-3">
          {filtered.map((contest) => (
            <ContestCard key={contest.id} contest={contest} />
          ))}
        </div>
      )}
    </>
  );
}

function ContestCard({ contest }: { contest: Contest }) {
  return (
    <Link href={`/contests/${contest.id}`} className="block">
      <article className="contest-card group aspect-square relative overflow-hidden rounded-xl shadow-sm hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5">
        {/* Background gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${contest.color}`} />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center">
          <div className="text-xl md:text-2xl mb-1">🏆</div>
          <p className="text-white font-bold text-[10px] md:text-xs leading-tight line-clamp-2 px-1">
            {contest.title}
          </p>
          <p className="text-white/70 text-[9px] md:text-[10px] mt-0.5 hidden md:block">
            {contest.organizer}
          </p>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-2">
          <div className="flex flex-wrap gap-1">
            {contest.isNew && (
              <span className="px-1.5 py-0.5 bg-accent text-text text-[9px] font-bold rounded">NEW</span>
            )}
            {contest.isHot && (
              <span className="px-1.5 py-0.5 bg-red-500 text-white text-[9px] font-bold rounded">🔥HOT</span>
            )}
          </div>
          <div className="text-white">
            <p className="text-[10px] font-bold leading-tight line-clamp-2">{contest.title}</p>
            <p className="text-accent text-[10px] font-semibold mt-0.5">{contest.prizeText}</p>
            <p className="text-white/70 text-[9px]">D-{contest.dday}</p>
          </div>
        </div>

        {/* D-day badge */}
        {contest.dday <= 7 && (
          <div className="absolute top-1 right-1 px-1.5 py-0.5 bg-red-500 text-white text-[9px] font-bold rounded animate-pulse">
            D-{contest.dday}
          </div>
        )}
      </article>
    </Link>
  );
}
