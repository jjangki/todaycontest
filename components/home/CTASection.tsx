import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden" aria-labelledby="cta-title">
      <div className="absolute inset-0 gradient-dark" />
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 50%, rgba(0, 82, 255, 0.6) 0%, transparent 50%), radial-gradient(circle at 75% 50%, rgba(255, 214, 0, 0.3) 0%, transparent 50%)`,
        }}
      />

      <div className="container-max relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/20 border border-accent/30 rounded-full text-accent text-sm font-bold mb-8">
          ✨ 지금 바로 시작하세요
        </div>

        <h2 id="cta-title" className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
          단 한 번의 등록,<br />
          <span className="text-gradient-accent">대한민국 모든 기회</span>와 연결되다
        </h2>
        <p className="text-gray-400 text-lg max-w-xl mx-auto mb-12 leading-relaxed">
          공모전 주최사라면 AI 자동 홍보로 시간을 90% 절약하고,<br />
          참가자라면 지금 바로 나에게 맞는 대회를 찾아보세요.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            href="/dashboard"
            className="group px-10 py-4 bg-accent hover:bg-accent-dark text-text font-black text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex items-center gap-3"
          >
            <span>🏆</span>
            <span>대회 등록하기 (주최사)</span>
          </Link>
          <Link
            href="/contests"
            className="px-10 py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-lg rounded-2xl border border-white/20 transition-all duration-300 flex items-center gap-3"
          >
            <span>🔍</span>
            <span>대회 찾아보기 (참가자)</span>
          </Link>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-gray-500 text-sm">
          {[
            "✅ 무료 체험 가능",
            "✅ 5분 내 등록 완료",
            "✅ AI 자동 최적화",
            "✅ 24/7 자동 배포",
            "✅ 채널별 성과 리포트",
          ].map((item, i) => (
            <span key={i} className="text-gray-400">{item}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
