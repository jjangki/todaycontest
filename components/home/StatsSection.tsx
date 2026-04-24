const stats = [
  { value: "40+", label: "연동 홍보 채널", desc: "포털·SNS·커뮤니티", icon: "📡", color: "from-blue-500 to-blue-700" },
  { value: "98%", label: "주최사 만족도", desc: "서비스 이용 후 재등록율", icon: "⭐", color: "from-amber-400 to-orange-500" },
  { value: "15,000+", label: "등록된 공모전", desc: "2025년 기준 누적", icon: "🏆", color: "from-emerald-500 to-teal-600" },
  { value: "1초", label: "AI 자동 배포 시간", desc: "등록 완료 후 전채널 배포", icon: "⚡", color: "from-purple-500 to-violet-700" },
  { value: "90%↑", label: "홍보 시간 절약", desc: "수동 대비 절감 효과", icon: "⏱️", color: "from-pink-500 to-rose-600" },
  { value: "200개", label: "대학 배포 네트워크", desc: "전국 주요 대학 포스터 부착", icon: "🎓", color: "from-cyan-500 to-blue-600" },
];

export default function StatsSection() {
  return (
    <section className="py-20 bg-white" aria-labelledby="stats-title">
      <div className="container-max">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-primary mb-2 uppercase tracking-wider">Why TodayContest?</p>
          <h2 id="stats-title" className="section-title">
            숫자로 증명하는 <span className="text-gradient">오늘의 대회</span>
          </h2>
          <p className="section-subtitle max-w-xl mx-auto">
            실제 서비스 데이터를 기반으로 검증된 성과입니다
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {stats.map((stat, i) => (
            <article
              key={i}
              className="card p-6 md:p-8 group hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-2xl mb-4 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                {stat.icon}
              </div>
              <div className="font-black text-3xl md:text-4xl text-text font-inter mb-1 tracking-tight">
                {stat.value}
              </div>
              <div className="font-bold text-text mb-1">{stat.label}</div>
              <div className="text-sm text-text-muted">{stat.desc}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
