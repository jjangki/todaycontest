const partners = [
  { name: "씽굿", icon: "⚡", desc: "대학생 공모전 No.1" },
  { name: "위비티", icon: "🏆", desc: "공모전 전문 포털" },
  { name: "에브리타임", icon: "🎓", desc: "대학생 커뮤니티" },
  { name: "스펙업", icon: "📈", desc: "스펙관리 플랫폼" },
  { name: "캠퍼스픽", icon: "📚", desc: "대학생 라이프" },
  { name: "잡코리아", icon: "💼", desc: "취업/공채 포털" },
  { name: "사람인", icon: "🔍", desc: "취업/채용 정보" },
  { name: "링크드인", icon: "💼", desc: "전문직 네트워크" },
  { name: "네이버 블로그", icon: "📝", desc: "SEO 최적화 배포" },
  { name: "인스타그램", icon: "📸", desc: "비주얼 마케팅" },
  { name: "유튜브", icon: "▶️", desc: "영상 홍보 채널" },
  { name: "카카오톡", icon: "💬", desc: "메신저 배포" },
];

export default function PartnerSection() {
  return (
    <section className="py-20 bg-background" aria-labelledby="partner-title">
      <div className="container-max">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-primary mb-2 uppercase tracking-wider">홍보 파트너 채널</p>
          <h2 id="partner-title" className="section-title">
            대한민국 대표 플랫폼과<br /><span className="text-gradient">직접 연동</span>됩니다
          </h2>
          <p className="section-subtitle">
            채널별 특성에 맞춰 AI가 콘텐츠를 자동으로 최적화합니다
          </p>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {partners.map((partner, i) => (
            <div
              key={i}
              className="card p-4 flex flex-col items-center gap-2 text-center hover:-translate-y-1 transition-all duration-300 cursor-default group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                {partner.icon}
              </div>
              <div className="font-semibold text-text text-sm">{partner.name}</div>
              <div className="text-[11px] text-text-muted leading-tight">{partner.desc}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            + 28개 추가 채널 연동 중
          </span>
        </div>
      </div>
    </section>
  );
}
