import Link from 'next/link';
import { contests } from '@/lib/data';

export default function FeaturedContests() {
  // Hot 공모전 6개
  const featured = contests.filter(c => c.isHot).slice(0, 6);

  return (
    <section className="py-20 bg-white" aria-labelledby="featured-title">
      <div className="container-max">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 gap-4">
          <div>
            <p className="text-sm font-semibold text-primary mb-2 uppercase tracking-wider">🔥 HOT</p>
            <h2 id="featured-title" className="section-title">
              지금 <span className="text-gradient">인기 공모전</span>
            </h2>
            <p className="text-text-muted mt-2">마감 임박! 서둘러 확인하세요</p>
          </div>
          <Link
            href="/contests"
            className="flex-shrink-0 px-5 py-2.5 bg-primary/10 text-primary font-semibold rounded-xl hover:bg-primary hover:text-white transition-all duration-200 text-sm"
          >
            전체 공모전 보기 →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {featured.map((contest) => (
            <Link key={contest.id} href={`/contests/${contest.id}`}>
              <article className="contest-card group cursor-pointer">
                {/* Thumbnail */}
                <div className={`absolute inset-0 bg-gradient-to-br ${contest.color}`} />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 text-center group-hover:bg-black/20 transition-colors duration-300">
                  <div className="text-3xl mb-2">🏆</div>
                  <div className="font-bold text-sm leading-tight line-clamp-2">{contest.title}</div>
                  <div className="text-xs mt-1 opacity-80">{contest.organizer}</div>
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 contest-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                  <div className="text-white text-xs font-bold">{contest.prizeText}</div>
                  <div className="text-white/80 text-xs">D-{contest.dday}</div>
                </div>
                {/* Badges */}
                <div className="absolute top-2 left-2 flex gap-1">
                  {contest.isNew && (
                    <span className="px-1.5 py-0.5 bg-accent text-text text-[10px] font-bold rounded">NEW</span>
                  )}
                  {contest.dday <= 14 && (
                    <span className="px-1.5 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded">D-{contest.dday}</span>
                  )}
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
