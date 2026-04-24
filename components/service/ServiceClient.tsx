'use client'
import { useState } from 'react'
import Link from 'next/link'

const FAQS = [
  {q:'단 한 번의 등록으로 40개 채널 모두에 발행되나요?',a:'네, 정확합니다. 대회 정보를 한 번 입력하고 "발행" 버튼을 누르면 연동된 모든 채널에 자동으로 발행됩니다. 각 채널에 맞는 형식(글 길이, 해시태그, 이미지 규격 등)이 자동으로 적용됩니다.'},
  {q:'AI가 생성한 콘텐츠를 직접 수정할 수 있나요?',a:'물론입니다. AI가 초안을 작성하면 미리보기 탭에서 확인하고 원하는 대로 수정할 수 있습니다. 수정 후 발행하거나, 마음에 들면 그대로 즉시 발행할 수 있습니다.'},
  {q:'지원하는 SNS·플랫폼은 어디어디인가요?',a:'Instagram, Facebook, YouTube, TikTok, X(Twitter), KakaoTalk, Naver Blog, Naver Cafe, Brunch, Velog, LinkedIn, Pinterest, Threads, Band, Everytime, Discord 등 총 40개 이상의 채널을 지원합니다. 채널은 지속적으로 추가되고 있습니다.'},
  {q:'이미지 포스터는 어떻게 처리되나요?',a:'업로드한 원본 이미지를 각 플랫폼 권장 규격에 맞게 자동으로 크롭하고 리사이징합니다. 인스타그램용 1:1, 유튜브 썸네일용 16:9, 스토리용 9:16 등 플랫폼별 최적 규격으로 자동 변환됩니다.'},
  {q:'발행된 콘텐츠의 성과를 확인할 수 있나요?',a:'네, 대시보드에서 채널별 조회수, 좋아요, 댓글, 공유 수 등 실시간 성과 데이터를 확인할 수 있습니다. 주간/월간 리포트도 제공됩니다.'},
  {q:'무료 체험 기간은 얼마나 되나요?',a:'신규 가입 후 30일간 Standard 플랜의 모든 기능을 무료로 체험할 수 있습니다. 신용카드 등록이 필요 없으며, 체험 기간 종료 후 자동으로 요금이 청구되지 않습니다.'},
  {q:'계약 최소 기간이 있나요?',a:'월 단위로 언제든지 시작하고 해지할 수 있습니다. 연간 결제 시 20% 할인이 적용됩니다. 최소 계약 기간은 없습니다.'},
  {q:'대량 등록도 가능한가요?',a:'네, Enterprise 플랜에서는 API 연동을 통한 대량 자동 등록이 가능합니다. 월 1,000건 이상의 대회 등록도 처리할 수 있으며, 별도 맞춤 견적을 문의해 주세요.'},
]

export default function ServiceClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    {icon:'📝',title:'정보 1회 입력',desc:'공모전명, 기간, 시상 내역, 포스터 이미지 등 기본 정보를 깔끔한 폼으로 한 번만 입력합니다. 추가 정보가 없어도 AI가 자동 보완합니다.',before:'각 채널에 개별 로그인 후 직접 입력',after:'단 하나의 통합 폼으로 모든 정보 입력 완료',timeBefore:'2~3시간',timeAfter:'5분'},
    {icon:'🤖',title:'AI 콘텐츠 자동 생성',desc:'GPT-4 기반 AI가 입력된 정보를 분석하여 채널별로 최적화된 글, 해시태그, 이미지 캡션을 자동으로 생성합니다.',before:'각 채널 특성에 맞게 직접 글 작성',after:'AI가 40개 채널 콘텐츠 자동 생성',timeBefore:'3~4시간',timeAfter:'30초'},
    {icon:'✅',title:'확인 및 수정',desc:'AI가 생성한 콘텐츠를 탭 형태로 한눈에 확인하고 필요한 경우 간단히 수정합니다. 수정 사항은 자동 저장됩니다.',before:'각 채널 앱/사이트를 번갈아 가며 확인',after:'통합 미리보기로 한눈에 확인 및 수정',timeBefore:'1시간',timeAfter:'5분'},
    {icon:'🚀',title:'원클릭 40채널 동시 발행',desc:'확인 버튼 하나로 연동된 모든 채널에 동시 발행됩니다. 예약 발행 설정도 가능합니다.',before:'채널마다 개별 로그인·업로드·발행',after:'클릭 한 번으로 40개 채널 동시 발행',timeBefore:'3~4시간',timeAfter:'5초'},
  ]

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map(f => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a }
    }))
  }

  return (
    <main style={{marginTop:64}}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}} />

      {/* Page Hero */}
      <section style={{
        background:'linear-gradient(135deg,#EBF1FF 0%,var(--bg) 60%,#FFFCE8 100%)',
        padding:'80px 20px 60px',
        textAlign:'center'
      }}>
        <div className="container">
          <span className="section-badge">📖 서비스 소개</span>
          <h1 className="section-title" style={{marginTop:12}}>
            공모전 홍보의 새로운 기준,<br />
            <span style={{color:'var(--blue)'}}>오늘의 대회</span>
          </h1>
          <p className="section-desc" style={{marginBottom:36}}>
            기존 방식 대비 홍보 시간 90% 절약, 노출 효과 10배 상승.<br />
            AI 기술로 공모전 홍보의 패러다임을 바꿉니다.
          </p>
          <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
            <Link href="/dashboard" className="btn-yellow">🚀 무료 체험 시작</Link>
            <Link href="/pricing" className="btn-secondary">요금제 보기</Link>
          </div>
        </div>
      </section>

      {/* Before / After */}
      <section className="section section-alt" aria-labelledby="comparison-title">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">⚖️ 비교 분석</span>
            <h2 className="section-title" id="comparison-title">기존 방식 vs 오늘의 대회</h2>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:24,maxWidth:800,margin:'0 auto'}}>
            <div style={{
              background:'white',
              borderRadius:'var(--radius-lg)',
              padding:28,
              border:'2px solid var(--gray-200)',
              boxShadow:'var(--shadow)'
            }}>
              <div style={{
                display:'flex',alignItems:'center',gap:10,
                marginBottom:20,
                padding:'10px 16px',
                background:'#FFF1F2',
                borderRadius:'var(--radius)',
                color:'var(--red)',fontWeight:700
              }}>
                <span style={{fontSize:20}}>😓</span> 기존 방식
              </div>
              <ul style={{listStyle:'none'}}>
                {[
                  '채널마다 개별 로그인 필요',
                  '각 채널에 맞는 글 따로 작성',
                  '이미지 규격 수동 변환',
                  '공모전 1건 홍보에 8~10시간 소요',
                  '담당자 2~3명 필요',
                  '성과 데이터 수동 수집',
                  '발행 누락 오류 빈번',
                ].map((item, i) => (
                  <li key={i} style={{
                    display:'flex',alignItems:'center',gap:10,
                    padding:'9px 0',
                    borderBottom:'1px solid var(--gray-100)',
                    fontSize:14,color:'var(--gray-600)'
                  }}>
                    <span style={{color:'var(--red)',fontWeight:700,flexShrink:0}}>✕</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div style={{
                marginTop:16,padding:'12px 16px',
                background:'#FFF1F2',
                borderRadius:'var(--radius)',
                fontSize:14,fontWeight:700,
                color:'var(--red)',textAlign:'center'
              }}>
                총 소요 시간: 약 8~10시간 / 건
              </div>
            </div>
            <div style={{
              background:'linear-gradient(135deg,#EBF1FF,white)',
              borderRadius:'var(--radius-lg)',
              padding:28,
              border:'2px solid var(--blue)',
              boxShadow:'0 4px 20px rgba(0,82,255,0.15)'
            }}>
              <div style={{
                display:'flex',alignItems:'center',gap:10,
                marginBottom:20,
                padding:'10px 16px',
                background:'var(--blue)',
                borderRadius:'var(--radius)',
                color:'white',fontWeight:700
              }}>
                <span style={{fontSize:20}}>🚀</span> 오늘의 대회
              </div>
              <ul style={{listStyle:'none'}}>
                {[
                  'OAuth 1회 연동으로 자동 로그인',
                  'AI가 채널별 콘텐츠 자동 생성',
                  '이미지 자동 규격 변환',
                  '공모전 1건 홍보에 10분 소요',
                  '담당자 1명으로 충분',
                  '실시간 통합 성과 대시보드',
                  '자동 오류 감지 및 재시도',
                ].map((item, i) => (
                  <li key={i} style={{
                    display:'flex',alignItems:'center',gap:10,
                    padding:'9px 0',
                    borderBottom:'1px solid rgba(0,82,255,0.1)',
                    fontSize:14,color:'var(--gray-700)'
                  }}>
                    <span style={{color:'var(--green)',fontWeight:700,flexShrink:0}}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div style={{
                marginTop:16,padding:'12px 16px',
                background:'var(--blue)',
                borderRadius:'var(--radius)',
                fontSize:14,fontWeight:700,
                color:'white',textAlign:'center'
              }}>
                총 소요 시간: 약 10분 / 건 (90% 절약!)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Step-by-Step */}
      <section className="section" aria-labelledby="steps-title">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">⚡ 이용 단계</span>
            <h2 className="section-title" id="steps-title">4단계로 끝나는 간편한 홍보</h2>
          </div>

          {/* Step Tabs */}
          <div style={{
            display:'flex',
            justifyContent:'center',
            gap:8,
            marginBottom:40,
            flexWrap:'wrap'
          }}>
            {steps.map((step, i) => (
              <button
                key={i}
                onClick={() => setActiveStep(i)}
                style={{
                  display:'flex',alignItems:'center',gap:8,
                  padding:'12px 20px',
                  borderRadius:'var(--radius-md)',
                  border:`2px solid ${activeStep===i?'var(--blue)':'var(--gray-200)'}`,
                  background: activeStep===i ? 'var(--blue)' : 'white',
                  color: activeStep===i ? 'white' : 'var(--gray-500)',
                  fontWeight:600,fontSize:14,cursor:'pointer',
                  transition:'all 0.2s'
                }}
              >
                <span>{step.icon}</span>
                <span>STEP {i+1}</span>
              </button>
            ))}
          </div>

          {/* Active Step Content */}
          <div style={{
            background:'white',
            borderRadius:'var(--radius-xl)',
            padding:40,
            border:'1px solid var(--gray-200)',
            boxShadow:'var(--shadow-lg)',
            maxWidth:800,margin:'0 auto'
          }}>
            <div style={{display:'flex',gap:16,marginBottom:24,alignItems:'flex-start'}}>
              <div style={{
                width:60,height:60,
                background:'var(--blue)',
                borderRadius:'var(--radius-md)',
                display:'flex',alignItems:'center',justifyContent:'center',
                fontSize:28,flexShrink:0
              }}>{steps[activeStep].icon}</div>
              <div>
                <div style={{fontSize:13,fontWeight:600,color:'var(--blue)',marginBottom:4}}>
                  STEP {activeStep+1}
                </div>
                <h3 style={{fontSize:22,fontWeight:800,color:'var(--gray-900)',marginBottom:8}}>
                  {steps[activeStep].title}
                </h3>
                <p style={{fontSize:15,color:'var(--gray-500)',lineHeight:1.7}}>
                  {steps[activeStep].desc}
                </p>
              </div>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
              <div style={{
                background:'#FFF1F2',borderRadius:'var(--radius)',padding:16,
                border:'1px solid rgba(239,68,68,0.2)'
              }}>
                <div style={{fontSize:12,fontWeight:700,color:'var(--red)',marginBottom:8}}>⏱️ 기존 방식</div>
                <div style={{fontSize:14,color:'var(--gray-600)',marginBottom:8}}>{steps[activeStep].before}</div>
                <div style={{fontSize:20,fontWeight:900,color:'var(--red)'}}>{steps[activeStep].timeBefore}</div>
              </div>
              <div style={{
                background:'var(--blue-light)',borderRadius:'var(--radius)',padding:16,
                border:'1px solid rgba(0,82,255,0.2)'
              }}>
                <div style={{fontSize:12,fontWeight:700,color:'var(--blue)',marginBottom:8}}>✅ 오늘의 대회</div>
                <div style={{fontSize:14,color:'var(--gray-600)',marginBottom:8}}>{steps[activeStep].after}</div>
                <div style={{fontSize:20,fontWeight:900,color:'var(--blue)'}}>{steps[activeStep].timeAfter}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section-alt" aria-labelledby="faq-title">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">❓ 자주 묻는 질문</span>
            <h2 className="section-title" id="faq-title">무엇이든 물어보세요</h2>
            <p className="section-desc">궁금한 점을 해소하고 시작하세요</p>
          </div>
          <div className="faq-list">
            {FAQS.map((faq, i) => (
              <div key={i} className={`faq-item${openFaq===i?' open':''}`}>
                <button
                  className="faq-question"
                  onClick={() => setOpenFaq(openFaq===i ? null : i)}
                  aria-expanded={openFaq===i}
                >
                  <span className="faq-q-prefix">Q</span>
                  <span style={{flex:1,textAlign:'left'}}>{faq.q}</span>
                  <span style={{
                    fontSize:18,color:'var(--gray-400)',
                    transition:'transform 0.3s',
                    transform: openFaq===i ? 'rotate(45deg)' : 'none',
                    flexShrink:0
                  }}>+</span>
                </button>
                <div className="faq-answer">
                  <div className="faq-answer-inner">{faq.a}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{textAlign:'center',marginTop:40}}>
            <p style={{fontSize:15,color:'var(--gray-500)',marginBottom:16}}>
              더 궁금한 점이 있으신가요?
            </p>
            <a href="mailto:abc@babkorea.com" className="btn-primary" style={{display:'inline-flex'}}>
              📧 문의하기
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" aria-labelledby="service-cta-title">
        <div className="container">
          <h2 className="cta-title" id="service-cta-title">지금 바로 경험해보세요</h2>
          <p className="cta-desc">30일 무료 체험, 신용카드 불필요</p>
          <Link href="/dashboard" className="btn-yellow" style={{display:'inline-flex'}}>
            무료 체험 시작하기 →
          </Link>
        </div>
      </section>
    </main>
  )
}
