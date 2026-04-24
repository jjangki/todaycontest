const steps = [
  {
    step: "01",
    title: "게시글 한 번 작성",
    desc: "대회명, 주최사, 상금, 기간, 포스터 이미지만 입력하면 끝. 복잡한 설정 없이 5분 완성.",
    icon: "✍️",
    detail: ["공고 유형 선택", "대회 기본 정보 입력", "포스터 이미지 업로드", "제출 버튼 클릭"],
    color: "from-blue-500 to-blue-700",
    bg: "bg-blue-50",
    border: "border-blue-200",
  },
  {
    step: "02",
    title: "AI 자동 변환",
    desc: "AI가 채널 성격을 분석하여 인스타용 감성 텍스트, 블로그용 SEO 글, X용 140자 요약을 자동 생성.",
    icon: "🤖",
    detail: ["인스타그램: 이모지+해시태그", "네이버 블로그: SEO 최적화 본문", "X(트위터): 140자 임팩트 요약", "이미지 규격 자동 리사이징"],
    color: "from-purple-500 to-violet-700",
    bg: "bg-purple-50",
    border: "border-purple-200",
  },
  {
    step: "03",
    title: "원클릭 40채널 배포",
    desc: "검토 후 배포 버튼 하나로 씽굿, 에브리타임, 인스타, 블로그, X 등 40개 채널에 동시 전송.",
    icon: "🚀",
    detail: ["전문 포털 자동 업로드", "SNS 채널 동시 게시", "대학 커뮤니티 자동 배포", "실시간 채널별 결과 리포트"],
    color: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
  },
];

export default function ProcessSection() {
  return (
    <section className="py-24 bg-background" aria-labelledby="process-title">
      <div className="container-max">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-primary mb-2 uppercase tracking-wider">AI 자동 배포 시스템</p>
          <h2 id="process-title" className="section-title">
            단 <span className="text-gradient">3단계</span>로 완성되는 홍보
          </h2>
          <p className="section-subtitle max-w-lg mx-auto">
            복잡한 홍보 과정을 AI가 전부 처리합니다
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connection arrows (desktop) */}
          <div className="hidden md:block absolute top-16 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-primary to-primary-light z-0">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full" />
          </div>

          {steps.map((step, i) => (
            <article key={i} className={`card p-8 relative z-10 border-2 ${step.border} hover:-translate-y-2 transition-all duration-300 group`}>
              {/* Step number */}
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${step.color} text-white text-xs font-bold mb-6 shadow-sm`}>
                STEP {step.step}
              </div>

              {/* Icon */}
              <div className={`w-16 h-16 ${step.bg} rounded-2xl flex items-center justify-center text-3xl mb-5 group-hover:scale-110 transition-transform duration-300`}>
                {step.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-text mb-3">{step.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed mb-6">{step.desc}</p>

              {/* Detail list */}
              <ul className="space-y-2">
                {step.detail.map((d, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-text-muted">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                    {d}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 bg-white rounded-2xl px-8 py-5 shadow-card border border-border">
            <span className="text-3xl">⏱️</span>
            <div className="text-left">
              <div className="font-bold text-text">기존 수동 홍보 vs. 오늘의 대회</div>
              <div className="text-sm text-text-muted">수동 홍보 <span className="font-semibold text-red-500">8시간</span> → AI 자동 배포 <span className="font-semibold text-green-600">5분</span> 완성</div>
            </div>
            <div className="px-4 py-2 bg-green-100 text-green-700 rounded-xl font-bold text-sm">
              96% 절약
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
