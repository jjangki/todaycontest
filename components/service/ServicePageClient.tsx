'use client';

import { useState, useEffect, useRef } from 'react';

const features = [
  {
    icon: "⚡",
    title: "1 TO 40: 초연결 AI 자동 배포",
    subtitle: "단 한 번 등록, 전채널 동시 배포",
    desc: "씽굿, 위비티, 스펙토리 같은 전문 포털부터 에브리타임, 캠퍼스픽까지 한 번에 배포됩니다. 페이스북, 인스타그램, 틱톡, X, 네이버 블로그까지 연동되어 압도적인 도달률을 보장합니다.",
    features: ["40+ 채널 동시 배포", "실시간 배포 현황 모니터링", "채널별 노출 리포트 제공", "자동 재배포 스케줄링"],
    color: "from-blue-500 to-blue-700",
    bg: "bg-blue-50",
    number: "01",
  },
  {
    icon: "✨",
    title: "Smart AI Creator",
    subtitle: "채널별 맞춤 콘텐츠 자동 변환",
    desc: "단순 복사·붙여넣기가 아닙니다. AI가 채널의 성격을 분석하여 콘텐츠를 재창조합니다. Instagram엔 감성 텍스트, Naver Blog엔 SEO 본문, X엔 140자 임팩트 요약.",
    features: ["인스타그램: 이미지 자동 리사이징 + 해시태그", "네이버 블로그: SEO 최적화 본문 생성", "X(트위터): 140자 임팩트 요약", "이미지 카드뉴스 자동 변환"],
    color: "from-purple-500 to-violet-700",
    bg: "bg-purple-50",
    number: "02",
  },
  {
    icon: "🎯",
    title: "넷플릭스형 큐레이션 UI",
    subtitle: "참가자를 위한 최적의 탐색 경험",
    desc: "지루한 리스트는 가라! 6x10 그리드로 펼쳐지는 썸네일 카드로 시각적 즐거움을 제공합니다. 방금 등록된 대회, 마감 임박 D-Day, 총상금 1천만 원 이상 등 직관적인 필터링.",
    features: ["6x10 썸네일 그리드 UI", "3가지 필터 탭 (신규/마감/상금)", "새로고침마다 랜덤 노출", "실시간 D-Day 타이머"],
    color: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-50",
    number: "03",
  },
  {
    icon: "🛒",
    title: "맞춤형 B2B 솔루션",
    subtitle: "아이콘 클릭형 대행 견적 시스템",
    desc: "복잡한 텍스트 표를 읽을 필요가 없습니다. 쇼핑하듯 필요한 서비스를 담으세요. 기획/디자인, 온라인 홍보, 인쇄 제작, 투표 세팅, 전문 사회자 섭외까지 원클릭.",
    features: ["아이콘 카드 선택 UI", "실시간 영수증 형태 견적", "원클릭 전담 매니저 연결", "맞춤형 견적서 자동 생성"],
    color: "from-orange-500 to-amber-600",
    bg: "bg-orange-50",
    number: "04",
  },
];

const comparisons = [
  { label: "홍보 채널 수", before: "3~5개", after: "40개+", icon: "📡" },
  { label: "소요 시간", before: "8시간+", after: "5분", icon: "⏱️" },
  { label: "콘텐츠 제작", before: "수동 복사·붙여넣기", after: "AI 자동 최적화", icon: "✨" },
  { label: "비용 효율", before: "높은 인건비", after: "90% 절감", icon: "💰" },
  { label: "도달률", before: "제한적", after: "압도적", icon: "📊" },
];

const faqs = [
  {
    q: "오늘의 대회란 무엇인가요?",
    a: "(주)수상한콘텐츠가 선보이는 AI 기반 공모전·대회 자동 홍보 플랫폼입니다. 주최사가 공모전을 한 번만 등록하면 40개 이상의 채널에 자동으로 배포되고, 참가자는 대한민국 모든 공모전 정보를 한 곳에서 확인할 수 있습니다.",
  },
  {
    q: "어떤 채널에 자동 배포되나요?",
    a: "씽굿, 위비티, 스펙업 등 공모전 전문 포털과 에브리타임, 캠퍼스픽 같은 대학생 커뮤니티, 인스타그램, 페이스북, 유튜브, X(트위터), 네이버 블로그, 카카오톡 채널 등 SNS 40개 이상의 채널에 동시 배포됩니다.",
  },
  {
    q: "AI가 콘텐츠를 어떻게 최적화하나요?",
    a: "AI가 각 채널의 특성을 분석합니다. Instagram은 이미지를 1:1, 9:16 규격으로 자동 리사이징하고 트렌디한 해시태그와 이모지를 결합한 감성 텍스트를 생성합니다. Naver Blog는 SEO 최적화 본문으로, X는 140자 이내의 임팩트 있는 단문으로 변환됩니다.",
  },
  {
    q: "주최사 등록 비용은 얼마인가요?",
    a: "기본 공모전 등록은 무료입니다. AI 자동 배포, 프리미엄 홍보 서비스 등 추가 기능은 요금제에 따라 달라집니다. 자세한 사항은 요금제 페이지를 확인하거나 고객센터(02-6953-1996)로 문의해주세요.",
  },
  {
    q: "서비스 이용을 위해 별도 프로그램 설치가 필요한가요?",
    a: "아닙니다. 웹 브라우저만 있으면 바로 이용 가능합니다. 별도 설치나 기술적 지식 없이 5분 안에 공모전 등록이 완료됩니다.",
  },
  {
    q: "홍보 결과는 어떻게 확인하나요?",
    a: "주최사 대시보드에서 실시간으로 채널별 배포 현황, 조회수, 클릭률, 참여자 데이터를 확인할 수 있습니다. AI가 분석한 채널별 노출 리포트를 통해 체계적인 데이터 관리가 가능합니다.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item ${open ? 'open' : ''}`}>
      <button
        className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="font-semibold text-text pr-4 flex items-start gap-3">
          <span className="text-primary font-black flex-shrink-0">Q.</span>
          {q}
        </span>
        <span className={`text-primary flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>
      {open && (
        <div className="px-5 pb-5">
          <p className="text-text-muted leading-relaxed flex items-start gap-3">
            <span className="text-accent font-black flex-shrink-0">A.</span>
            {a}
          </p>
        </div>
      )}
    </div>
  );
}

function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${className}`}
    >
      {children}
    </div>
  );
}

export default function ServicePageClient() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#030B2E] via-[#0A1A4E] to-[#051035] py-28 text-center">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(0,82,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,82,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        <div className="container-max relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 border border-primary/30 rounded-full text-primary-light text-sm font-semibold mb-8">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            서비스 소개
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
            공모전 홍보의<br />
            <span className="text-gradient-accent animated-gradient-text">새로운 기준</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            오늘의 대회는 기존 수동 홍보의 비효율성을 완벽히 해결합니다.<br />
            AI 기술로 시간과 비용을 90% 절약하세요.
          </p>
        </div>
        <svg className="absolute bottom-0 left-0 right-0 w-full" viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#F8FAFC" />
        </svg>
      </section>

      {/* Before vs After */}
      <section className="py-20 bg-background" aria-labelledby="compare-title">
        <div className="container-max">
          <AnimatedSection className="text-center mb-14">
            <h2 id="compare-title" className="section-title">
              기존 홍보 vs <span className="text-gradient">오늘의 대회</span>
            </h2>
            <p className="section-subtitle">한 눈에 보이는 압도적인 차이</p>
          </AnimatedSection>

          <AnimatedSection>
            <div className="grid md:grid-cols-5 gap-2 items-center max-w-3xl mx-auto">
              <div className="md:col-span-2 card p-6 border-2 border-red-200 bg-red-50">
                <div className="text-center mb-4">
                  <span className="text-2xl">😩</span>
                  <h3 className="font-bold text-red-600 mt-2">기존 수동 홍보</h3>
                </div>
                <ul className="space-y-2">
                  {comparisons.map(c => (
                    <li key={c.label} className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">{c.icon} {c.label}</span>
                      <span className="font-semibold text-red-500">{c.before}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-center text-3xl font-black text-primary hidden md:block">→</div>

              <div className="md:col-span-2 card p-6 border-2 border-primary bg-primary/5 shadow-card-hover">
                <div className="text-center mb-4">
                  <span className="text-2xl">🚀</span>
                  <h3 className="font-bold text-primary mt-2">오늘의 대회</h3>
                </div>
                <ul className="space-y-2">
                  {comparisons.map(c => (
                    <li key={c.label} className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">{c.icon} {c.label}</span>
                      <span className="font-bold text-primary">{c.after}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-20 bg-white" aria-labelledby="features-title">
        <div className="container-max">
          <AnimatedSection className="text-center mb-14">
            <p className="text-sm font-semibold text-primary mb-2 uppercase tracking-wider">Core Features</p>
            <h2 id="features-title" className="section-title">
              4가지 <span className="text-gradient">핵심 경쟁력</span>
            </h2>
          </AnimatedSection>

          <div className="space-y-12">
            {features.map((feat, i) => (
              <AnimatedSection key={i}>
                <article className={`card overflow-hidden grid md:grid-cols-2 gap-0 border-2 border-transparent hover:border-primary/20 transition-colors duration-300`}>
                  <div className={`${feat.bg} p-10 flex flex-col justify-center ${i % 2 === 1 ? 'md:order-2' : ''}`}>
                    <div className="text-4xl mb-4">{feat.icon}</div>
                    <div className="text-xs font-bold text-primary uppercase tracking-wider mb-2">
                      {feat.number}. Feature
                    </div>
                    <h3 className="text-2xl font-black text-text mb-2">{feat.title}</h3>
                    <p className="text-primary font-semibold mb-4">{feat.subtitle}</p>
                    <p className="text-text-muted leading-relaxed text-sm">{feat.desc}</p>
                  </div>
                  <div className={`p-10 flex flex-col justify-center ${i % 2 === 1 ? 'md:order-1' : ''}`}>
                    <h4 className="font-bold text-text mb-5 text-lg">주요 기능</h4>
                    <ul className="space-y-3">
                      {feat.features.map((f, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <span className={`w-6 h-6 rounded-lg bg-gradient-to-br ${feat.color} text-white flex items-center justify-center text-xs flex-shrink-0 mt-0.5`}>
                            ✓
                          </span>
                          <span className="text-text-muted text-sm leading-relaxed">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ - AEO 최적화 */}
      <section className="py-20 bg-background" aria-labelledby="faq-title">
        <div className="container-max max-w-3xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <p className="text-sm font-semibold text-primary mb-2 uppercase tracking-wider">FAQ</p>
            <h2 id="faq-title" className="section-title">
              자주 묻는 <span className="text-gradient">질문</span>
            </h2>
            <p className="section-subtitle">궁금한 점을 바로 해결하세요</p>
          </AnimatedSection>

          <div itemScope itemType="https://schema.org/FAQPage">
            {faqs.map((faq, i) => (
              <div key={i} itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                <meta itemProp="name" content={faq.q} />
                <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <meta itemProp="text" content={faq.a} />
                </div>
                <FaqItem q={faq.q} a={faq.a} />
              </div>
            ))}
          </div>

          <AnimatedSection className="mt-12 text-center">
            <p className="text-text-muted mb-4">더 궁금한 점이 있으신가요?</p>
            <a
              href="tel:02-6953-1996"
              className="inline-flex items-center gap-2 btn-primary"
            >
              📞 02-6953-1996 (평일 09:00~18:00)
            </a>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
