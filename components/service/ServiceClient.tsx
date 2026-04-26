'use client'
import { useState } from 'react'
import Link from 'next/link'

const FAQS = [
  { q: '단 한 번의 등록으로 40개 채널 모두에 발행되나요?', a: '네, 정확합니다. 대회 정보를 한 번 입력하고 "발행" 버튼을 누르면 연동된 모든 채널에 자동으로 발행됩니다. 각 채널에 맞는 형식(글 길이, 해시태그, 이미지 규격 등)이 자동으로 적용됩니다.' },
  { q: 'AI가 생성한 콘텐츠를 직접 수정할 수 있나요?', a: '물론입니다. AI가 초안을 작성하면 미리보기 탭에서 확인하고 원하는 대로 수정할 수 있습니다. 수정 후 발행하거나, 마음에 들면 그대로 즉시 발행할 수 있습니다.' },
  { q: '지원하는 SNS·플랫폼은 어디어디인가요?', a: 'Instagram, Facebook, YouTube, TikTok, X(Twitter), KakaoTalk, Naver Blog, Naver Cafe, Brunch, Velog, LinkedIn, Pinterest, Threads, Band, Everytime, Discord 등 총 40개 이상의 채널을 지원합니다. 채널은 지속적으로 추가되고 있습니다.' },
  { q: '이미지 포스터는 어떻게 처리되나요?', a: '업로드한 원본 이미지를 각 플랫폼 권장 규격에 맞게 자동으로 크롭하고 리사이징합니다. 인스타그램용 1:1, 유튜브 썸네일용 16:9, 스토리용 9:16 등 플랫폼별 최적 규격으로 자동 변환됩니다.' },
  { q: '발행된 콘텐츠의 성과를 확인할 수 있나요?', a: '네, 대시보드에서 채널별 조회수, 좋아요, 댓글, 공유 수 등 실시간 성과 데이터를 확인할 수 있습니다. 주간/월간 리포트도 제공됩니다.' },
  { q: '대회정보 사이트 23개에 자동 등록이 가능한가요?', a: '네! 씽굿, 위비티, 콘테스트코리아, 스펙토리, 링커리어 등 23개 대회정보 사이트에 자동으로 등록합니다. 각 사이트의 형식에 맞게 자동으로 변환하여 등록됩니다.' },
  { q: '계약 최소 기간이 있나요?', a: '건당 서비스로 제공하므로 별도 계약 기간이 없습니다. SNS 광고는 일단위로 집행하며, 대회 등록은 건당 서비스입니다.' },
  { q: '대량 등록도 가능한가요?', a: '네, API 연동을 통한 대량 자동 등록이 가능합니다. 별도 맞춤 견적을 문의해 주세요.' },
]

const STEPS = [
  {
    icon: '📝',
    num: '01',
    title: '정보 1회 입력',
    desc: '공모전명, 기간, 시상 내역, 포스터 이미지 등 기본 정보를 깔끔한 폼으로 한 번만 입력합니다.',
    before: '각 채널에 개별 로그인 후 직접 입력',
    after: '단 하나의 통합 폼으로 모든 정보 입력 완료',
    timeBefore: '2~3시간',
    timeAfter: '5분',
    color: '#EBF1FF',
    accent: '#3B82F6',
    details: [
      '대회명·기간·주최기관·상금 등 기본 정보',
      '포스터·카드뉴스·썸네일·영상 업로드',
      '접수 방법·참가 대상·담당자 정보',
      'AI가 부족한 정보 자동 보완',
    ],
  },
  {
    icon: '🤖',
    num: '02',
    title: 'AI 콘텐츠 자동 생성',
    desc: 'GPT-4 기반 AI가 입력된 정보를 분석하여 채널별로 최적화된 글, 해시태그, 이미지 캡션을 자동으로 생성합니다.',
    before: '각 채널 특성에 맞게 직접 글 작성',
    after: 'AI가 40개 채널 콘텐츠 자동 생성',
    timeBefore: '3~4시간',
    timeAfter: '30초',
    color: '#F0FFF4',
    accent: '#10B981',
    details: [
      'Instagram용 캡션 + 해시태그 자동 생성',
      'Naver Blog용 SEO 최적화 글 생성',
      'KakaoTalk 채널용 짧고 임팩트 있는 문구',
      '채널별 이미지 규격 자동 변환',
    ],
  },
  {
    icon: '✅',
    num: '03',
    title: '확인 및 수정',
    desc: 'AI가 생성한 콘텐츠를 탭 형태로 한눈에 확인하고 필요한 경우 간단히 수정합니다.',
    before: '각 채널 앱/사이트를 번갈아 가며 확인',
    after: '통합 미리보기로 한눈에 확인 및 수정',
    timeBefore: '1시간',
    timeAfter: '5분',
    color: '#FFF9E6',
    accent: '#F59E0B',
    details: [
      '채널별 탭으로 미리보기 확인',
      '텍스트·이미지 자유롭게 편집',
      '변경사항 자동 저장',
      '채널별 추가 이미지 업로드 가능',
    ],
  },
  {
    icon: '🚀',
    num: '04',
    title: '원클릭 40채널 동시 발행',
    desc: '확인 버튼 하나로 연동된 모든 채널에 동시 발행됩니다. 예약 발행 설정도 가능합니다.',
    before: '채널마다 개별 로그인·업로드·발행',
    after: '클릭 한 번으로 40개 채널 동시 발행',
    timeBefore: '3~4시간',
    timeAfter: '5초',
    color: '#FFF1F2',
    accent: '#EF4444',
    details: [
      'SNS 채널 15개 동시 발행',
      '블로그 8개 동시 발행',
      '대회정보사이트 23개 자동 등록',
      '예약 발행 & 반복 발행 지원',
    ],
  },
]

export default function ServiceClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [activeStep, setActiveStep] = useState(0)

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <main style={{ marginTop: 64, background: 'var(--bg)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* 히어로 */}
      <section className="service-hero">
        <div className="container">
          <span className="section-badge" style={{ fontSize: 14 }}>📖 서비스 소개</span>
          <h1 className="service-hero-title">
            공모전 홍보의 새로운 기준,<br />
            <span style={{ color: 'var(--blue)' }}>오늘의 대회</span>
          </h1>
          <p className="service-hero-desc">
            기존 방식 대비 홍보 시간 <strong>90% 절약</strong>, 노출 효과 <strong>10배 상승</strong>.<br />
            AI 기술로 공모전 홍보의 패러다임을 바꿉니다.
          </p>
          <div className="service-hero-btns">
            <Link href="/dashboard" className="btn-primary-lg">🚀 무료 체험 시작</Link>
            <Link href="/pricing" className="btn-outline-lg">요금 안내</Link>
          </div>

          {/* 핵심 지표 */}
          <div className="service-kpi-row">
            {[
              { num: '40+', label: '지원 채널' },
              { num: '23개', label: '대회정보사이트' },
              { num: '90%', label: '시간 절약' },
              { num: '10배', label: '노출 효과' },
            ].map((k, i) => (
              <div key={i} className="service-kpi-item">
                <div className="service-kpi-num">{k.num}</div>
                <div className="service-kpi-label">{k.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 기존 vs 오늘의 대회 비교 ── */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">⚖️ 비교 분석</span>
            <h2 className="section-title">기존 방식 vs 오늘의 대회</h2>
            <p className="section-desc">얼마나 달라지는지 직접 비교해보세요</p>
          </div>

          <div className="comparison-table">
            <div className="comparison-header">
              <div className="ct-label">비교 항목</div>
              <div className="ct-before">❌ 기존 방식</div>
              <div className="ct-after">✅ 오늘의 대회</div>
            </div>
            {[
              { item: '정보 입력', before: '채널마다 개별 입력 (10+ 회)', after: '1회 통합 입력으로 끝' },
              { item: '콘텐츠 작성', before: '채널별 직접 작성 (3~4시간)', after: 'AI 자동 생성 (30초)' },
              { item: '이미지 변환', before: '규격별 수동 편집', after: '채널별 자동 변환' },
              { item: '발행 시간', before: '채널마다 로그인·발행 (3~4시간)', after: '원클릭 40채널 동시 발행 (5초)' },
              { item: '대회사이트 등록', before: '사이트마다 개별 방문·입력', after: '23개 사이트 자동 등록' },
              { item: '성과 확인', before: '각 채널 개별 확인', after: '통합 대시보드로 한눈에' },
              { item: '총 소요 시간', before: '8~12시간 (1건 기준)', after: '10~15분 (1건 기준)' },
            ].map((row, i) => (
              <div key={i} className={`ct-row${i % 2 === 0 ? '' : ' alt'}`}>
                <div className="ct-label">{row.item}</div>
                <div className="ct-before-val">
                  <span className="ct-x">✗</span> {row.before}
                </div>
                <div className="ct-after-val">
                  <span className="ct-check">✓</span> {row.after}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Step 1-4 시각화 ── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">🔄 이용 방법</span>
            <h2 className="section-title">4단계로 40채널 홍보 완료</h2>
            <p className="section-desc">어렵지 않습니다. 누구나 쉽게 시작할 수 있어요</p>
          </div>

          {/* 스텝 탭 */}
          <div className="step-tab-row">
            {STEPS.map((s, i) => (
              <button
                key={i}
                className={`step-tab-btn${activeStep === i ? ' active' : ''}`}
                onClick={() => setActiveStep(i)}
                style={{ '--step-color': s.accent } as React.CSSProperties}
              >
                <span className="stb-num">{s.num}</span>
                <span className="stb-title">{s.title}</span>
              </button>
            ))}
          </div>

          {/* 스텝 상세 */}
          <div className="step-detail-card" style={{ background: STEPS[activeStep].color, borderLeft: `4px solid ${STEPS[activeStep].accent}` }}>
            <div className="sdc-left">
              <div className="sdc-icon" style={{ background: STEPS[activeStep].accent + '22', color: STEPS[activeStep].accent }}>
                {STEPS[activeStep].icon}
              </div>
              <div className="sdc-num" style={{ color: STEPS[activeStep].accent }}>{STEPS[activeStep].num}</div>
              <h3 className="sdc-title">{STEPS[activeStep].title}</h3>
              <p className="sdc-desc">{STEPS[activeStep].desc}</p>
              <div className="sdc-details">
                {STEPS[activeStep].details.map((d, i) => (
                  <div key={i} className="sdc-detail-item">
                    <span style={{ color: STEPS[activeStep].accent }}>✓</span> {d}
                  </div>
                ))}
              </div>
            </div>
            <div className="sdc-right">
              <div className="sdc-compare-box">
                <div className="sdc-before">
                  <div className="scb-label">❌ 기존 방식</div>
                  <div className="scb-time-before">{STEPS[activeStep].timeBefore}</div>
                  <div className="scb-text">{STEPS[activeStep].before}</div>
                </div>
                <div className="sdc-arrow-down">↓</div>
                <div className="sdc-after">
                  <div className="scb-label" style={{ color: STEPS[activeStep].accent }}>✅ 오늘의 대회</div>
                  <div className="scb-time-after" style={{ color: STEPS[activeStep].accent }}>{STEPS[activeStep].timeAfter}</div>
                  <div className="scb-text">{STEPS[activeStep].after}</div>
                </div>
              </div>
            </div>
          </div>

          {/* 이전/다음 */}
          <div className="step-nav-row">
            <button className="step-nav-btn" disabled={activeStep === 0} onClick={() => setActiveStep(s => s - 1)}>← 이전 단계</button>
            <div className="step-dots">
              {STEPS.map((_, i) => <div key={i} className={`step-dot${activeStep === i ? ' active' : ''}`} onClick={() => setActiveStep(i)} />)}
            </div>
            <button className="step-nav-btn" disabled={activeStep === STEPS.length - 1} onClick={() => setActiveStep(s => s + 1)}>다음 단계 →</button>
          </div>
        </div>
      </section>

      {/* ── 지원 채널 & 사이트 ── */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">📡 채널 현황</span>
            <h2 className="section-title">40개+ 채널 & 사이트 지원</h2>
          </div>
          <div className="service-ch-grid">
            {[
              { cat: 'SNS 채널', icon: '📱', items: ['Instagram','Facebook','YouTube','TikTok','X(Twitter)','LinkedIn','Pinterest','Threads','Reddit'], count: 15 },
              { cat: '블로그', icon: '✍️', items: ['Naver Blog','Brunch','Velog','Tistory','Naver Post','Band'], count: 8 },
              { cat: '대회정보사이트', icon: '🏆', items: ['씽굿','위비티','콘테스트코리아','스펙토리','링커리어','캠퍼스픽','공모전알고','대티즌','인크루트'], count: 23 },
              { cat: '커뮤니티/이벤트', icon: '👥', items: ['에브리타임','이벤터스','Naver 카페','Daum 카페','Discord'], count: 20 },
            ].map((cat, i) => (
              <div key={i} className="service-ch-card">
                <div className="service-ch-header">
                  <span className="sch-icon">{cat.icon}</span>
                  <span className="sch-cat">{cat.cat}</span>
                  <span className="sch-count">{cat.count}개</span>
                </div>
                <div className="sch-items">
                  {cat.items.map((it, j) => (
                    <span key={j} className="sch-chip">{it}</span>
                  ))}
                  <span className="sch-chip more">+더보기</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">❓ 자주 묻는 질문</span>
            <h2 className="section-title">무엇이든 물어보세요</h2>
          </div>
          <div className="faq-modern-list">
            {FAQS.map((f, i) => (
              <div key={i} className={`faq-modern-item${openFaq === i ? ' open' : ''}`}>
                <button className="faq-modern-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="faq-q-icon">Q</span>
                  <span className="faq-q-text">{f.q}</span>
                  <span className="faq-toggle">{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && (
                  <div className="faq-modern-a">
                    <span className="faq-a-icon">A</span>
                    <p>{f.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section section-alt">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title">지금 바로 시작해보세요</h2>
          <p className="section-desc" style={{ marginBottom: 32 }}>대회 홍보에 필요한 모든 것을 한 곳에서 해결하세요</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/dashboard" className="btn-primary-lg">🚀 무료 체험 시작</Link>
            <Link href="/pricing" className="btn-outline-lg">💰 요금 안내</Link>
            <a href="tel:02-6953-1996" className="btn-outline-lg">📞 전화 상담</a>
          </div>
        </div>
      </section>
    </main>
  )
}
