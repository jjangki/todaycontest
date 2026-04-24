'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { CHANNELS, CONTESTS, PARTNERS } from '@/lib/data'

const CHANNEL_COLORS: Record<string, string> = {
  'Instagram': '#E1306C', 'Facebook': '#1877F2', 'YouTube': '#FF0000',
  'TikTok': '#000000', 'X(Twitter)': '#000000', 'KakaoTalk': '#FEE500',
  'Naver Blog': '#03C75A', 'Naver Cafe': '#03C75A', 'Brunch': '#333',
  'Velog': '#20C997', 'LinkedIn': '#0A66C2', 'Pinterest': '#E60023',
  'Threads': '#000000', 'Band': '#5BBA00', 'Everytime': '#E03131',
  'Discord': '#5865F2', 'Telegram': '#26A5E4', 'Notion': '#37352F',
  'Reddit': '#FF4500', 'Medium': '#000000',
}

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime: number
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration, start])
  return count
}

export default function HomeClient() {
  const [statsVisible, setStatsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setStatsVisible(true), 500)
    return () => clearTimeout(timer)
  }, [])

  const c1 = useCountUp(40, 1800, statsVisible)
  const c2 = useCountUp(1240, 2000, statsVisible)
  const c3 = useCountUp(98, 1600, statsVisible)
  const c4 = useCountUp(8500, 2200, statsVisible)

  const marqueeChannels = [...CHANNELS, ...CHANNELS]
  const marqueeChannels2 = [...CHANNELS.slice(10), ...CHANNELS, ...CHANNELS.slice(0, 10)]

  return (
    <main>
      {/* HERO */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-bg-shape hero-bg-shape-1" aria-hidden="true" />
        <div className="hero-bg-shape hero-bg-shape-2" aria-hidden="true" />
        <div className="hero-inner container">
          <div className="hero-content animate-fadeup">
            <div className="hero-badge">
              <span>🏆</span> 대한민국 1위 공모전 홍보 플랫폼
            </div>
            <h1 className="hero-title" id="hero-title">
              단 한 번의 등록,<br />
              <span className="highlight">
                <span className="yellow-line">40개 채널</span> 동시 홍보
              </span>
            </h1>
            <p className="hero-desc">
              AI가 귀하의 공모전을 인스타그램, 유튜브, 네이버블로그 등<br />
              40개 채널에 최적화된 콘텐츠로 자동 발행합니다.
            </p>
            <div className="hero-stats">
              <div className="hero-stat">
                <div className="num">{c1}개+</div>
                <div className="label">홍보 채널</div>
              </div>
              <div className="hero-divider" />
              <div className="hero-stat">
                <div className="num">{c2.toLocaleString()}건+</div>
                <div className="label">등록 대회</div>
              </div>
              <div className="hero-divider" />
              <div className="hero-stat">
                <div className="num">{c3}%</div>
                <div className="label">만족도</div>
              </div>
              <div className="hero-divider" />
              <div className="hero-stat">
                <div className="num">{c4.toLocaleString()}명+</div>
                <div className="label">이용 주최사</div>
              </div>
            </div>
            <div className="hero-btns">
              <Link href="/dashboard" className="btn-yellow">
                🚀 무료로 시작하기
              </Link>
              <Link href="/contests" className="btn-secondary">
                공모전 보러가기 →
              </Link>
            </div>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <div className="hero-float-card hero-float-card-1">
              ✅ &nbsp;<strong>SNS 40개 채널</strong>&nbsp; 동시 등록 완료
            </div>
            <div className="hero-card-main">
              <div className="hero-card-top">
                <div className="hero-card-icon">🏆</div>
                <div>
                  <div style={{fontSize:14,fontWeight:700,color:'var(--gray-900)'}}>2024 AI 창작 공모전</div>
                  <div style={{fontSize:12,color:'var(--gray-400)'}}>AI로 자동 홍보 중...</div>
                </div>
              </div>
              <div style={{background:'var(--gray-50)',borderRadius:10,padding:'12px 14px',marginBottom:14}}>
                <div style={{fontSize:12,color:'var(--gray-500)',marginBottom:8}}>📊 실시간 홍보 현황</div>
                {[
                  {name:'인스타그램',pct:95,color:'#E1306C'},
                  {name:'유튜브',pct:87,color:'#FF0000'},
                  {name:'네이버 블로그',pct:92,color:'#03C75A'},
                  {name:'TikTok',pct:78,color:'#000'},
                ].map(item => (
                  <div key={item.name} style={{marginBottom:8}}>
                    <div style={{display:'flex',justifyContent:'space-between',marginBottom:3,fontSize:11,fontWeight:600}}>
                      <span>{item.name}</span>
                      <span style={{color:item.color}}>{item.pct}%</span>
                    </div>
                    <div style={{height:6,background:'var(--gray-200)',borderRadius:3,overflow:'hidden'}}>
                      <div style={{height:'100%',width:`${item.pct}%`,background:item.color,borderRadius:3,transition:'width 1s ease'}} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="channel-grid">
                {CHANNELS.slice(0, 15).map(ch => (
                  <div key={ch.name} className="channel-item" title={ch.name}
                    style={{background:CHANNEL_COLORS[ch.name]||'var(--gray-400)',opacity:0.9}}>
                    <span style={{fontSize:16}}>{ch.emoji}</span>
                    <span style={{fontSize:9}}>{ch.short}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="hero-float-card hero-float-card-2">
              📈 &nbsp;<strong>조회수 +2,847</strong>&nbsp; 지난 24시간
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="marquee-section" aria-label="지원 채널 목록">
        <p className="marquee-label">자동 홍보 지원 채널 40+</p>
        <div className="marquee-row marquee-wrap">
          <div className="marquee-track">
            {marqueeChannels.map((ch, i) => (
              <div key={i} className="marquee-item">
                <span className="icon" style={{background:CHANNEL_COLORS[ch.name]||'#888',color:'white',borderRadius:8,width:28,height:28,display:'flex',alignItems:'center',justifyContent:'center'}}>
                  {ch.emoji}
                </span>
                {ch.name}
              </div>
            ))}
          </div>
        </div>
        <div className="marquee-row marquee-wrap" style={{marginTop:12}}>
          <div className="marquee-track-rev">
            {marqueeChannels2.map((ch, i) => (
              <div key={i} className="marquee-item">
                <span className="icon" style={{background:CHANNEL_COLORS[ch.name]||'#888',color:'white',borderRadius:8,width:28,height:28,display:'flex',alignItems:'center',justifyContent:'center'}}>
                  {ch.emoji}
                </span>
                {ch.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="section section-alt" aria-labelledby="stats-title">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">📊 플랫폼 현황</span>
            <h2 className="section-title" id="stats-title">숫자로 증명하는<br />오늘의 대회 성과</h2>
          </div>
          <div className="stats-grid">
            {[
              {icon:'🏆',num:`${c1}개+`,label:'연동 홍보 채널',color:'#EBF1FF'},
              {icon:'📝',num:`${c2.toLocaleString()}건+`,label:'등록 완료 대회',color:'#FFF9E6'},
              {icon:'⭐',num:`${c3}%`,label:'주최사 만족도',color:'#F0FFF4'},
              {icon:'👥',num:`${c4.toLocaleString()}명+`,label:'누적 이용 주최사',color:'#FFF1F2'},
            ].map((s,i) => (
              <div key={i} className="stat-card">
                <div className="stat-icon" style={{background:s.color}}>{s.icon}</div>
                <div className="stat-num">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section" aria-labelledby="process-title">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">⚡ 3단계 간편 등록</span>
            <h2 className="section-title" id="process-title">이렇게 간단합니다</h2>
            <p className="section-desc">복잡한 과정 없이 3단계만으로 40개 채널에 동시 홍보가 완료됩니다</p>
          </div>
          <div className="process-grid">
            {[
              {num:'01',icon:'📝',title:'대회 정보 입력',desc:'공모전 이름, 기간, 시상 내역, 포스터 이미지 등 기본 정보를 한 번만 입력하세요.',points:['간단한 양식 작성','포스터 자동 최적화','AI 설명문 자동 생성']},
              {num:'02',icon:'🤖',title:'AI 자동 콘텐츠 생성',desc:'AI가 각 채널 특성에 맞게 인스타그램용, 블로그용, X용 등 최적화된 콘텐츠를 자동 생성합니다.',points:['채널별 최적화','해시태그 자동 추천','이미지 자동 리사이징']},
              {num:'03',icon:'🚀',title:'40개 채널 동시 발행',desc:'클릭 한 번으로 40개 채널에 즉시 발행됩니다. 실시간 현황판에서 진행 상황을 확인하세요.',points:['원클릭 동시 발행','실시간 현황 확인','발행 결과 리포트']},
            ].map((step, i) => (
              <div key={i} className="process-card" style={{position:'relative'}}>
                {i < 2 && <div className="process-arrow" style={{right:-14}}>→</div>}
                <div className="process-num">{step.num}</div>
                <div className="process-icon">{step.icon}</div>
                <h3 className="process-title">{step.title}</h3>
                <p className="process-desc">{step.desc}</p>
                <ul className="feature-list" style={{marginTop:16}}>
                  {step.points.map((p,j) => <li key={j}>{p}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTESTS PREVIEW */}
      <section className="section section-alt" aria-labelledby="contest-preview-title">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">🔥 최신 공모전</span>
            <h2 className="section-title" id="contest-preview-title">지금 진행 중인 공모전·대회</h2>
            <p className="section-desc">AI가 자동으로 수집·홍보하는 최신 공모전을 확인하세요</p>
          </div>
          <div className="filter-bar" style={{justifyContent:'center',marginBottom:32}}>
            {['전체','신규등록','마감임박','상금높은순','공모전','대외활동'].map((tab,i) => (
              <button key={i} className={`filter-tab${i===0?' active':''}`}>{tab}</button>
            ))}
          </div>
          <div className="contest-grid">
            {CONTESTS.slice(0, 12).map(c => (
              <Link key={c.id} href={`/contests/${c.id}`} className="contest-card">
                <div className="contest-thumb">
                  <div className="contest-thumb-placeholder" style={{background:c.bgColor}}>
                    {c.emoji}
                  </div>
                  <span className={`contest-badge badge-${c.status}`}>{c.statusLabel}</span>
                  <span className="contest-dday">{c.dday}</span>
                </div>
                <div className="contest-info">
                  <p className="contest-org">{c.org}</p>
                  <h3 className="contest-title">{c.title}</h3>
                  <p className="contest-prize">{c.prize}</p>
                  <div className="contest-tags">
                    {c.tags.map((t,i) => <span key={i} className="contest-tag">{t}</span>)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div style={{textAlign:'center',marginTop:40}}>
            <Link href="/contests" className="btn-primary" style={{padding:'14px 36px',fontSize:16}}>
              전체 공모전 보기 ({CONTESTS.length}개+) →
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section" aria-labelledby="features-title">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">✨ 핵심 기능</span>
            <h2 className="section-title" id="features-title">왜 오늘의 대회인가요?</h2>
            <p className="section-desc">주최사가 홍보에 쏟는 시간을 90% 절약하는 혁신적인 기능</p>
          </div>
          <div className="feature-grid">
            {[
              {icon:'🤖',bg:'#EBF1FF',title:'AI 콘텐츠 자동 생성',desc:'GPT-4 기반 AI가 공모전 정보를 분석하여 각 채널에 최적화된 글, 해시태그, 이미지 캡션을 자동으로 작성합니다.',points:['채널별 최적 문체 자동 적용','해시태그 자동 추천 및 삽입','클릭률 최적화 제목 생성','A/B 테스트 콘텐츠 생성']},
              {icon:'📊',bg:'#FFF9E6',title:'실시간 성과 분석',desc:'발행된 콘텐츠의 조회수, 좋아요, 공유 수 등 채널별 성과 데이터를 실시간으로 수집하여 통합 대시보드에 표시합니다.',points:['채널별 실시간 조회수 수집','참여율·전환율 자동 계산','주간/월간 성과 리포트 제공','경쟁 공모전 비교 분석']},
              {icon:'🖼️',bg:'#F0FFF4',title:'이미지 자동 최적화',desc:'업로드한 포스터 이미지를 각 플랫폼 규격에 맞게 자동으로 크롭·리사이징하고 최적화합니다.',points:['인스타 정사각형 자동 변환','유튜브 썸네일 자동 생성','플랫폼별 해상도 최적화','워터마크 자동 삽입 옵션']},
              {icon:'⚡',bg:'#FFF1F2',title:'원클릭 40채널 발행',desc:'복잡한 로그인 없이 한 번의 클릭으로 연동된 40개 채널에 동시에 발행됩니다. 예약 발행도 지원합니다.',points:['OAuth 기반 채널 연동','예약 발행 스케줄링','발행 실패 자동 재시도','발행 현황 실시간 추적']},
            ].map((f,i) => (
              <div key={i} className="feature-card">
                <div className="feature-icon-wrap" style={{background:f.bg}}>{f.icon}</div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
                <ul className="feature-list">
                  {f.points.map((p,j) => <li key={j}>{p}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNER */}
      <section className="section section-alt" aria-labelledby="partner-title">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">🤝 파트너 기관</span>
            <h2 className="section-title" id="partner-title">신뢰받는 파트너 기관</h2>
            <p className="section-desc">정부기관, 대기업, 공공기관이 오늘의 대회를 선택했습니다</p>
          </div>
          <div className="partner-grid">
            {PARTNERS.map((p, i) => (
              <div key={i} className="partner-card">
                <span className="partner-icon">{p.icon}</span>
                <span>{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" aria-labelledby="cta-title">
        <div className="container">
          <div style={{marginBottom:16,fontSize:40}}>🚀</div>
          <h2 className="cta-title" id="cta-title">지금 바로 무료로 시작하세요</h2>
          <p className="cta-desc">
            별도 계약 없이 즉시 사용 가능합니다.<br />
            첫 1개월 모든 기능 무료 체험, 신용카드 불필요.
          </p>
          <div style={{display:'flex',gap:16,justifyContent:'center',flexWrap:'wrap'}}>
            <Link href="/dashboard" className="btn-yellow btn-yellow-sm" style={{fontSize:16,padding:'14px 32px'}}>
              무료 체험 시작하기 →
            </Link>
            <Link href="/pricing" className="btn-white">
              요금제 보기
            </Link>
          </div>
          <p style={{marginTop:24,fontSize:13,opacity:0.6}}>
            ✓ 신용카드 불필요 &nbsp;·&nbsp; ✓ 1분 내 설정 완료 &nbsp;·&nbsp; ✓ 언제든 취소 가능
          </p>
        </div>
      </section>
    </main>
  )
}
