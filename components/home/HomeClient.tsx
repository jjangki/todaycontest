'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { CONTESTS, CHANNELS, PARTNERS } from '@/lib/data'
import {
  FaInstagram, FaFacebook, FaYoutube, FaTiktok, FaLinkedin, FaPinterest,
  FaDiscord, FaTelegram, FaReddit, FaXTwitter, FaThreads
} from 'react-icons/fa6'
import { SiNaver, SiKakaotalk, SiTistory } from 'react-icons/si'

/* ── Brand Colors ── */
const CH_COLORS: Record<string, string> = {
  'Instagram':'#E1306C','Facebook':'#1877F2','YouTube':'#FF0000','TikTok':'#010101',
  'X(Twitter)':'#1DA1F2','KakaoTalk':'#FEE500','Naver Blog':'#03C75A','Naver Cafe':'#03C75A',
  'Brunch':'#555','Velog':'#20C997','LinkedIn':'#0A66C2','Pinterest':'#E60023',
  'Threads':'#000','Band':'#5BBA00','Everytime':'#E03131','Discord':'#5865F2',
  'Telegram':'#26A5E4','Reddit':'#FF4500','Medium':'#000','Tistory':'#FF6600',
}

/* ── Brand Icons ── */
const BRAND_ICONS: Record<string, React.ReactNode> = {
  'Instagram':  <FaInstagram />,
  'Facebook':   <FaFacebook />,
  'YouTube':    <FaYoutube />,
  'TikTok':     <FaTiktok />,
  'X(Twitter)': <FaXTwitter />,
  'LinkedIn':   <FaLinkedin />,
  'Pinterest':  <FaPinterest />,
  'Threads':    <FaThreads />,
  'Discord':    <FaDiscord />,
  'Telegram':   <FaTelegram />,
  'Reddit':     <FaReddit />,
  'Naver Blog': <SiNaver />,
  'Naver Cafe': <SiNaver />,
  'KakaoTalk':  <SiKakaotalk />,
  'Tistory':    <SiTistory />,
}

/* ── Dispatch diagram channels ── */
const DISPATCH_CHANNELS = [
  { name:'Instagram',  icon:<FaInstagram/>,  color:'#E1306C', angle:-72, dist:210 },
  { name:'Naver Blog', icon:<SiNaver/>,      color:'#03C75A', angle:-42, dist:225 },
  { name:'YouTube',    icon:<FaYoutube/>,    color:'#FF0000', angle:-15, dist:205 },
  { name:'KakaoTalk',  icon:<SiKakaotalk/>, color:'#FEE500', angle:15,  dist:225 },
  { name:'에브리타임', icon:'🎓',            color:'#E03131', angle:42,  dist:205 },
  { name:'X(Twitter)', icon:<FaXTwitter/>,  color:'#000000', angle:68,  dist:215 },
  { name:'씽굿',       icon:'🏆',            color:'#FF6B35', angle:92,  dist:200 },
  { name:'Discord',    icon:<FaDiscord/>,   color:'#5865F2', angle:-98, dist:215 },
]

/* ── 23개 대회정보 사이트 ── */
const CONTEST_INFO_SITES = [
  { name:'씽굿', icon:'🎯', color:'#FF6B35' }, { name:'위비티', icon:'🏆', color:'#6C63FF' },
  { name:'콘테스트코리아', icon:'🥇', color:'#E63946' }, { name:'공모전알고', icon:'💡', color:'#2196F3' },
  { name:'g콘테스트', icon:'🌟', color:'#4CAF50' }, { name:'공모전인덱스', icon:'📑', color:'#FF9800' },
  { name:'공모탑', icon:'🔝', color:'#9C27B0' }, { name:'대티즌', icon:'🎓', color:'#00BCD4' },
  { name:'데메이드', icon:'🎨', color:'#F44336' }, { name:'더팀즈', icon:'👥', color:'#3F51B5' },
  { name:'디자인잡', icon:'✏️', color:'#009688' }, { name:'디자인정글', icon:'🌿', color:'#4CAF50' },
  { name:'스펙토리', icon:'📊', color:'#FF5722' }, { name:'라우더스', icon:'📣', color:'#E91E63' },
  { name:'링커리어', icon:'🔗', color:'#2196F3' }, { name:'슈퍼루키', icon:'⭐', color:'#FFC107' },
  { name:'알럽콘', icon:'❤️', color:'#F44336' }, { name:'요즘것들', icon:'✨', color:'#FF6B6B' },
  { name:'인크루트', icon:'💼', color:'#0066CC' }, { name:'캠퍼스픽', icon:'🎒', color:'#FF4081' },
  { name:'캠퍼즈', icon:'🏫', color:'#7C4DFF' }, { name:'에브리타임', icon:'⏰', color:'#E03131' },
  { name:'이벤터스', icon:'🎉', color:'#FF6D00' },
]

/* ── 20개 커뮤니티 ── */
const COMMUNITY_SITES = [
  { name:'네이버 카페', icon:'☕', color:'#03C75A' }, { name:'다음 카페', icon:'🌐', color:'#FF5A00' },
  { name:'에브리타임', icon:'📅', color:'#E03131' }, { name:'디시인사이드', icon:'💬', color:'#1E90FF' },
  { name:'루리웹', icon:'🎮', color:'#FF6600' }, { name:'클리앙', icon:'🖥️', color:'#4169E1' },
  { name:'보배드림', icon:'🚗', color:'#228B22' }, { name:'뽐뿌', icon:'🛍️', color:'#FF4500' },
  { name:'와이고수', icon:'🏸', color:'#2196F3' }, { name:'인벤', icon:'⚔️', color:'#8B0000' },
  { name:'아이러브스쿨', icon:'🏫', color:'#FF69B4' }, { name:'네이버 밴드', icon:'🎸', color:'#5BBA00' },
  { name:'카카오스토리', icon:'🌸', color:'#FEE500' }, { name:'페이스북 그룹', icon:'📘', color:'#1877F2' },
  { name:'이벤터스', icon:'🎉', color:'#FF6D00' }, { name:'SNS 이벤트랩', icon:'🔬', color:'#9C27B0' },
  { name:'허브줄기', icon:'🌱', color:'#4CAF50' }, { name:'대학교 커뮤니티', icon:'🎓', color:'#3F51B5' },
  { name:'취업 카페', icon:'📋', color:'#607D8B' }, { name:'스터디파이', icon:'📚', color:'#E91E63' },
]

/* ── 채널 그룹 ── */
const CH_GROUPS = [
  { id:'sns', label:'SNS 채널', count:20, channels:['Instagram','Facebook','YouTube','TikTok','X(Twitter)','LinkedIn','Pinterest','Threads','Reddit','Discord','Telegram','Band','Everytime','Daum Cafe','Naver Cafe','Tistory','Velog','Brunch','Naver Blog','KakaoTalk'] },
  { id:'blog', label:'블로그', count:10, channels:['Naver Blog','Brunch','Velog','Tistory','Naver Cafe','Daum Cafe','Band','Medium','LinkedIn','KakaoTalk'] },
  { id:'info', label:'공모전 사이트', count:20, channels: CONTEST_INFO_SITES.slice(0,20).map(s=>s.name) },
  { id:'community', label:'커뮤니티', count:20, channels: COMMUNITY_SITES.map(s=>s.name) },
]

const AD_PLATFORMS = [
  { name:'Instagram', icon:<FaInstagram/>, color:'#E1306C', min:30, unit:'만원/일' },
  { name:'Facebook',  icon:<FaFacebook/>,  color:'#1877F2', min:30, unit:'만원/일' },
  { name:'YouTube',   icon:<FaYoutube/>,   color:'#FF0000', min:50, unit:'만원/일' },
  { name:'TikTok',    icon:<FaTiktok/>,    color:'#010101', min:30, unit:'만원/일' },
  { name:'Naver 검색',icon:<SiNaver/>,     color:'#03C75A', min:10, unit:'만원/일' },
  { name:'카카오광고', icon:<SiKakaotalk/>,color:'#FEE500', min:20, unit:'만원/일' },
]

function useCountUp(target: number, ms: number, go: boolean) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!go) return
    let t0: number
    const step = (ts: number) => {
      if (!t0) t0 = ts
      const p = Math.min((ts - t0) / ms, 1)
      setN(Math.floor((1 - Math.pow(1 - p, 3)) * target))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, ms, go])
  return n
}

const FILTER_TABS = ['전체', '🏆 공모전/대회', '📢 이벤트/채용/일반', '대외활동', '해커톤', '사진', '음악']

export default function HomeClient() {
  const [started, setStarted] = useState(false)
  const [activeChTab, setActiveChTab] = useState('sns')
  const [filterTab, setFilterTab] = useState('전체')
  const [listPage, setListPage] = useState(1)
  const [animPulse, setAnimPulse] = useState(0)
  const LIST_PER_PAGE = 10

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 300)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const iv = setInterval(() => setAnimPulse(p => (p + 1) % DISPATCH_CHANNELS.length), 800)
    return () => clearInterval(iv)
  }, [])

  const c1 = useCountUp(70,  1400, started)
  const c2 = useCountUp(1240,1800, started)
  const c3 = useCountUp(98,  1300, started)
  const c4 = useCountUp(8500,2000, started)

  const activeGroup = CH_GROUPS.find(g => g.id === activeChTab)!
  const displayChs = activeChTab === 'info'
    ? CONTEST_INFO_SITES.slice(0,20)
    : activeChTab === 'community'
      ? COMMUNITY_SITES
      : CHANNELS.filter(ch => activeGroup.channels.includes(ch.name))

  const filteredContests = filterTab === '전체'
    ? CONTESTS
    : filterTab === '🏆 공모전/대회'
      ? CONTESTS.filter(c => ['공모전','해커톤'].includes(c.category))
      : filterTab === '📢 이벤트/채용/일반'
        ? CONTESTS.filter(c => ['이벤트','대외활동'].includes(c.category))
        : CONTESTS.filter(c => c.category === filterTab)

  const bannerContests = filteredContests.slice(0, 20)
  const listContests   = filteredContests.slice(20)
  const totalPages     = Math.ceil(listContests.length / LIST_PER_PAGE)
  const currentList    = listContests.slice((listPage-1)*LIST_PER_PAGE, listPage*LIST_PER_PAGE)

  return (
    <main style={{ marginTop: 56 }}>

      {/* ════ 플랫폼 현황 바 ════ */}
      <section className="platform-status-bar">
        <div className="platform-status-inner">
          <div className="platform-status-label">📊 플랫폼 현황</div>
          <div className="platform-stats-row">
            {[
              { num:`${c1}개+`,              label:'연동 홍보 채널' },
              { num:`${c2.toLocaleString()}건+`, label:'등록 게시글' },
              { num:`${c3}%`,                label:'주최사 만족도' },
              { num:`${c4.toLocaleString()}명+`, label:'이용 주최사' },
            ].map((s,i) => (
              <span key={i} className="flex items-center gap-3">
                {i > 0 && <span className="pstat-divider" />}
                <span className="pstat-item">
                  <span className="pstat-num">{s.num}</span>
                  <span className="pstat-label">{s.label}</span>
                </span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ════ HERO ════ */}
      <section className="hero-v3" aria-label="메인 히어로">
        <div className="container">
          <div className="hero-v3-inner">

            {/* ── Left: Copy ── */}
            <div className="hero-v3-left">
              <span className="hero-sub-badge">
                🏆 대한민국 1위 범용 마케팅 자동화 플랫폼
              </span>

              <h1 className="hero-v3-h1">
                대회부터 채용,<br />
                <span className="hero-h1-accent">신제품 홍보까지.</span>
              </h1>

              <h2 className="hero-v3-h2">
                단 한 번의 작성으로 AI가 문체를 바꾸고<br />
                <span className="hero-h2-accent">70개 매체에 동시 배포</span>합니다.
              </h2>

              <p className="hero-v3-desc">
                대한민국 1위 범용 마케팅 자동화 플랫폼
              </p>

              {/* Channel count pills */}
              <div className="hero-ch-pills">
                {[
                  { label:'SNS 채널',     count:20, color:'#E1306C' },
                  { label:'블로그',        count:10, color:'#03C75A' },
                  { label:'공모전 사이트', count:20, color:'#6C63FF' },
                  { label:'커뮤니티',      count:20, color:'#FF6B35' },
                ].map((p,i) => (
                  <div key={i} className="hero-ch-pill" style={{ '--pill-color': p.color } as React.CSSProperties}>
                    <span className="hero-ch-pill-count" style={{ color: p.color }}>{p.count}</span>
                    <span className="hero-ch-pill-label">{p.label}</span>
                  </div>
                ))}
              </div>

              <div className="hero-v3-cta">
                <Link href="/dashboard" className="btn-hero-primary">
                  ✍️ 지금 바로 시작하기
                </Link>
                <Link href="/pricing" className="btn-hero-outline">
                  요금 안내 →
                </Link>
              </div>

              <p className="hero-trust-text">
                🔒 무료 체험 가능 · 신용카드 불필요 · 언제든 해지
              </p>
            </div>

            {/* ── Right: Dispatch Diagram ── */}
            <div className="hero-v3-right">
              <div className="dispatch-diagram">
                {/* Center box */}
                <div className="dispatch-center">
                  <div className="dispatch-center-icon">✍️</div>
                  <div className="dispatch-center-title">내 게시글</div>
                  <div className="dispatch-center-sub">AI 최적화</div>
                  <div className="dispatch-ring ring-1" />
                  <div className="dispatch-ring ring-2" />
                  <div className="dispatch-ring ring-3" />
                </div>

                {/* Lines + nodes */}
                {DISPATCH_CHANNELS.map((ch, i) => {
                  const rad = (ch.angle * Math.PI) / 180
                  const x = Math.cos(rad) * ch.dist
                  const y = Math.sin(rad) * ch.dist
                  const isActive = animPulse === i
                  return (
                    <div key={i} style={{ position:'absolute', left:'50%', top:'50%', pointerEvents:'none' }}>
                      <svg style={{ position:'absolute', left:0, top:0, overflow:'visible', zIndex:1 }} width="1" height="1">
                        <line x1="0" y1="0" x2={x} y2={y}
                          stroke={isActive ? ch.color : '#CBD5E1'}
                          strokeWidth={isActive ? 2.5 : 1.5}
                          strokeDasharray={isActive ? '0' : '5 4'}
                          style={{ transition:'all 0.4s' }} />
                        {isActive && (
                          <circle r="5" fill={ch.color}>
                            <animateMotion dur="0.7s" repeatCount="1" path={`M0,0 L${x},${y}`} />
                          </circle>
                        )}
                      </svg>
                      <div style={{
                        position:'absolute', left:x-30, top:y-30, zIndex:2,
                        width:60, height:60, borderRadius:16,
                        background: isActive ? ch.color : '#fff',
                        border:`2.5px solid ${isActive ? ch.color : '#E2E8F0'}`,
                        display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:2,
                        boxShadow: isActive ? `0 4px 20px ${ch.color}66` : '0 2px 8px rgba(0,0,0,0.07)',
                        transition:'all 0.4s',
                        transform: isActive ? 'scale(1.12)' : 'scale(1)',
                      }}>
                        <span style={{ fontSize:20, color:isActive?'#fff':ch.color, lineHeight:1 }}>
                          {typeof ch.icon === 'string' ? ch.icon : ch.icon}
                        </span>
                        <span style={{ fontSize:8, fontWeight:700, color:isActive?'#fff':'#64748B', whiteSpace:'nowrap', letterSpacing:'-0.3px' }}>
                          {ch.name}
                        </span>
                      </div>
                    </div>
                  )
                })}

                <div className="dispatch-more">
                  <span>+62개 채널</span>
                  <span style={{ fontSize:9, opacity:.7 }}>자동 배포</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ════ SNS 채널 등록 & 광고 연동 ════ */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">📡 채널 연동</span>
            <h2 className="section-title">SNS 채널 등록 &amp; 광고 연동</h2>
            <p className="section-desc">주최사 계정을 연동하면 자동으로 각 채널에 게시됩니다</p>
          </div>
          <div className="ch-reg-flow">
            {[
              { n:1, title:'채널 계정 연결',   desc:'SNS/블로그 계정을 OAuth로 안전하게 연동' },
              { n:2, title:'게시글 작성',       desc:'한 번만 입력하면 AI가 채널별 콘텐츠 생성' },
              { n:3, title:'AI 콘텐츠 검토',   desc:'자동 생성된 콘텐츠 확인 및 수정 후 발행' },
              { n:4, title:'70채널 동시 발행', desc:'클릭 하나로 모든 채널에 동시 게시' },
            ].map((s,i) => (
              <span key={i} className="flex items-center gap-0">
                {i > 0 && <div className="ch-reg-arrow">→</div>}
                <div className="ch-reg-step">
                  <div className="ch-reg-num">{s.n}</div>
                  <div className="ch-reg-title">{s.title}</div>
                  <div className="ch-reg-desc">{s.desc}</div>
                </div>
              </span>
            ))}
          </div>

          <div className="ad-link-section">
            <h3 className="ad-link-title">💰 SNS 광고 자동 연동</h3>
            <p className="ad-link-desc">대회 홍보 효과를 극대화하는 유료 광고를 자동으로 집행합니다</p>
            <div className="ad-platform-grid">
              {AD_PLATFORMS.map((p,i) => (
                <div key={i} className="ad-platform-card">
                  <div className="ad-platform-icon text-xl" style={{ background:p.color+'22', color:p.color }}>{p.icon}</div>
                  <div className="ad-platform-name">{p.name}</div>
                  <div className="ad-platform-price">최소 {p.min}{p.unit}</div>
                  <div className="ad-platform-badge">자동연동</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════ 오늘의 대회 ════ */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">🏆 오늘의 대회</span>
            <h2 className="section-title">지금 진행중인 대회</h2>
            <p className="section-desc">현재 접수 중이거나 곧 마감되는 대회들을 확인하세요</p>
          </div>

          <div className="filter-tab-row">
            {FILTER_TABS.map(t => (
              <button key={t} className={`filter-tab2${filterTab===t?' active':''}`}
                onClick={()=>{ setFilterTab(t); setListPage(1) }}>
                {t}
              </button>
            ))}
            <Link href="/contests" className="filter-tab2 more-link">전체보기 →</Link>
          </div>

          <div className="banner-grid20">
            {bannerContests.map(c => (
              <Link key={c.id} href={`/contests/${c.id}`} className="banner20-card">
                <div className="banner20-thumb" style={{ background: c.bgColor }}>
                  <span style={{ fontSize:28 }}>{c.emoji}</span>
                  <span className={`c-badge ${c.status}`}>{c.statusLabel}</span>
                  <span className="banner20-dday">{c.dday}</span>
                </div>
                <div className="banner20-body">
                  <div className="banner20-cat">{c.category}</div>
                  <div className="banner20-title">{c.title}</div>
                  <div className="banner20-org">{c.org}</div>
                  <div className="banner20-prize">{c.prize}</div>
                  <div className="banner20-date">📅 마감 {c.deadline}</div>
                </div>
              </Link>
            ))}
          </div>

          {listContests.length > 0 && (
            <div style={{ marginTop:32 }}>
              <h3 className="list-section-title">📋 대회 목록</h3>
              <div className="contest-list-table">
                <div className="clt-head">
                  <span>번호</span><span>대회명</span><span>주최기관</span>
                  <span>마감일</span><span>구분</span><span>상태</span>
                </div>
                {currentList.map((c,i) => (
                  <Link key={c.id} href={`/contests/${c.id}`} className="clt-row">
                    <span className="clt-num">{20+(listPage-1)*LIST_PER_PAGE+i+1}</span>
                    <span className="clt-title-col">{c.title}</span>
                    <span className="clt-org-col">{c.org}</span>
                    <span className="clt-date-col">{c.deadline}</span>
                    <span className="clt-cat-col">{c.category}</span>
                    <span><span className={`c-badge ${c.status}`} style={{fontSize:10}}>{c.statusLabel}</span></span>
                  </Link>
                ))}
              </div>
              {totalPages > 1 && (
                <div className="pagination">
                  <button className="page-btn" disabled={listPage<=1} onClick={()=>setListPage(p=>p-1)}>‹</button>
                  {Array.from({ length:Math.min(totalPages,5) },(_,i)=>i+1).map(p => (
                    <button key={p} className={`page-btn${listPage===p?' active':''}`} onClick={()=>setListPage(p)}>{p}</button>
                  ))}
                  <button className="page-btn" disabled={listPage>=totalPages} onClick={()=>setListPage(p=>p+1)}>›</button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ════ 채널 현황 ════ */}
      <section className="section section-alt" id="ch-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">📡 채널 현황</span>
            <h2 className="section-title">70개+ 채널 동시 홍보</h2>
            <p className="section-desc">SNS·블로그·공모전사이트·커뮤니티 총 70개 이상의 채널에 자동 홍보</p>
          </div>
          <div className="ch-tab-row">
            {CH_GROUPS.map(g => (
              <button key={g.id} className={`ch-tab-btn${activeChTab===g.id?' active':''}`} onClick={()=>setActiveChTab(g.id)}>
                <span className="ch-tab-label">{g.label}</span>
                <span className="ch-tab-count">{g.count}</span>
              </button>
            ))}
          </div>
          <div className="ch-icon-grid">
            {(activeChTab==='info') ? CONTEST_INFO_SITES.slice(0,20).map((site,i) => (
              <div key={i} className="ch-icon-card">
                <div className="ch-icon-circle" style={{ background:site.color+'18', borderColor:site.color+'44' }}>
                  <span className="ch-icon-emoji" style={{ color:site.color }}>{site.icon}</span>
                </div>
                <div className="ch-icon-name">{site.name}</div>
                <div className="ch-icon-badge" style={{ background:site.color+'18', color:site.color }}>자동등록</div>
              </div>
            )) : (activeChTab==='community') ? COMMUNITY_SITES.map((site,i) => (
              <div key={i} className="ch-icon-card">
                <div className="ch-icon-circle" style={{ background:site.color+'18', borderColor:site.color+'44' }}>
                  <span className="ch-icon-emoji" style={{ color:site.color }}>{site.icon}</span>
                </div>
                <div className="ch-icon-name">{site.name}</div>
                <div className="ch-icon-badge" style={{ background:site.color+'18', color:site.color }}>자동게시</div>
              </div>
            )) : displayChs.map((ch,i) => {
              const color = CH_COLORS[ch.name] || '#666'
              const icon = BRAND_ICONS[ch.name]
              return (
                <div key={i} className="ch-icon-card">
                  <div className="ch-icon-circle" style={{ background:color+'18', borderColor:color+'44' }}>
                    {icon
                      ? <span className="ch-icon-svg" style={{ color, fontSize:22 }}>{icon}</span>
                      : <span className="ch-icon-emoji" style={{ color }}>{(ch as any).emoji}</span>}
                  </div>
                  <div className="ch-icon-name">{ch.name}</div>
                  <div className="ch-icon-badge" style={{ background:color+'18', color }}>자동발행</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ════ 서비스 흐름 ════ */}
      <section className="section bottom-visual-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">🚀 서비스 프로세스</span>
            <h2 className="section-title">하나의 등록으로 모든 것이 자동화됩니다</h2>
          </div>
          <div className="flow-visual-grid">
            <div className="flow-visual-card primary">
              <div className="fvc-icon-wrap"><span style={{fontSize:32}}>✍️</span></div>
              <h3 className="fvc-title">게시글 등록</h3>
              <p className="fvc-desc">대회 정보와 포스터를 한 번만 입력</p>
              <div className="fvc-detail">
                <div className="fvc-item">✔ 대회명·기간·주최기관</div>
                <div className="fvc-item">✔ 포스터·카드뉴스 업로드</div>
                <div className="fvc-item">✔ 상금·접수방법·대상</div>
              </div>
            </div>
            <div className="flow-arrow-big">→</div>
            <div className="flow-visual-card">
              <div className="fvc-icon-wrap" style={{background:'linear-gradient(135deg,#E1306C,#F77737)'}}><span style={{fontSize:32}}>🤖</span></div>
              <h3 className="fvc-title">AI 채널별 최적화</h3>
              <p className="fvc-desc">AI가 각 채널에 맞는 문체로 자동 변환</p>
              <div className="fvc-ch-list">
                {['Instagram','YouTube','Naver Blog','X(Twitter)','KakaoTalk','Discord'].map((ch,i) => (
                  <span key={i} className="fvc-ch-chip" style={{ background:(CH_COLORS[ch]||'#666')+'22', color:CH_COLORS[ch]||'#666', borderColor:(CH_COLORS[ch]||'#666')+'44' }}>{ch}</span>
                ))}
                <span className="fvc-ch-more">+14개 더</span>
              </div>
            </div>
            <div className="flow-arrow-big">→</div>
            <div className="flow-visual-card accent">
              <div className="fvc-icon-wrap" style={{background:'linear-gradient(135deg,#667eea,#764ba2)'}}><span style={{fontSize:32}}>🚀</span></div>
              <h3 className="fvc-title">70채널 동시 발행</h3>
              <p className="fvc-desc">클릭 하나로 모든 채널에 동시 배포</p>
              <div className="fvc-sites-mini">
                {['씽굿','위비티','콘테스트코리아','에브리타임','클리앙','인크루트'].map((s,i) => (
                  <span key={i} className="fvc-site-chip">{s}</span>
                ))}
                <span className="fvc-site-more">+64개</span>
              </div>
            </div>
          </div>
          <div className="bottom-cta">
            <h3 className="bottom-cta-title">지금 바로 시작해보세요</h3>
            <p className="bottom-cta-desc">대회·채용·마케팅 홍보의 모든 것을 한 곳에서</p>
            <div className="bottom-cta-btns">
              <Link href="/dashboard" className="btn-primary-lg">🚀 무료로 시작하기</Link>
              <Link href="/service" className="btn-outline-lg">서비스 소개 보기</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ════ 파트너 ════ */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">🤝 파트너사</span>
            <h2 className="section-title">믿을 수 있는 파트너사</h2>
          </div>
          <div className="partners-grid">
            {PARTNERS.map((p,i) => (
              <div key={i} className="partner-card">
                <span style={{ fontSize:28 }}>{p.icon}</span>
                <span className="partner-name">{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
