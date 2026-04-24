'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { CONTESTS, CHANNELS, PARTNERS } from '@/lib/data'

const CH_COLORS: Record<string, string> = {
  'Instagram':'#E1306C','Facebook':'#1877F2','YouTube':'#FF0000','TikTok':'#010101',
  'X(Twitter)':'#000','KakaoTalk':'#FEE500','Naver Blog':'#03C75A','Naver Cafe':'#03C75A',
  'Brunch':'#555','Velog':'#20C997','LinkedIn':'#0A66C2','Pinterest':'#E60023',
  'Threads':'#000','Band':'#5BBA00','Everytime':'#E03131','Discord':'#5865F2',
  'Telegram':'#26A5E4','Notion':'#37352F','Reddit':'#FF4500','Medium':'#000',
  'Tistory':'#FF6600','Naver Post':'#03C75A','Daum Cafe':'#FF5A00',
}

/* 채널을 SNS / 블로그 / 대회정보사이트 3그룹으로 */
const CH_GROUPS = [
  {
    id: 'sns', label: 'SNS 채널', icon: '📱',
    channels: ['Instagram','Facebook','YouTube','TikTok','X(Twitter)','LinkedIn','Pinterest','Threads','Reddit','Medium','Instagram Reels','YouTube Shorts'],
  },
  {
    id: 'blog', label: '블로그', icon: '✍️',
    channels: ['Naver Blog','Brunch','Velog','Tistory','Naver Post','Naver Cafe','Daum Cafe','Band'],
  },
  {
    id: 'info', label: '대회정보 사이트', icon: '🏆',
    channels: ['Everytime','Discord','Telegram','KakaoTalk','Notion','Whalespace','Clubhouse','네이버 지식인','Google My','Chzzk'],
  },
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

/* 배너 카테고리 필터 */
const FILTER_TABS = ['전체', '공모전', '대외활동', '이벤트', '해커톤', '사진']

export default function HomeClient() {
  const [started, setStarted] = useState(false)
  const [activeChTab, setActiveChTab] = useState('sns')
  const [filterTab, setFilterTab] = useState('전체')
  const [listPage, setListPage] = useState(1)
  const LIST_PER_PAGE = 10

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 300)
    return () => clearTimeout(t)
  }, [])

  const c1 = useCountUp(40, 1400, started)
  const c2 = useCountUp(1240, 1800, started)
  const c3 = useCountUp(98, 1300, started)
  const c4 = useCountUp(8500, 2000, started)

  const activeGroup = CH_GROUPS.find(g => g.id === activeChTab)!
  const displayChs = CHANNELS.filter(ch => activeGroup.channels.includes(ch.name))

  /* 배너 20개 & 리스트 */
  const filteredContests = filterTab === '전체'
    ? CONTESTS
    : CONTESTS.filter(c => c.category === filterTab)

  const bannerContests = filteredContests.slice(0, 20)
  const listContests = filteredContests.slice(20)
  const totalPages = Math.ceil(listContests.length / LIST_PER_PAGE)
  const currentList = listContests.slice((listPage - 1) * LIST_PER_PAGE, listPage * LIST_PER_PAGE)

  return (
    <main style={{ marginTop: 56 }}>

      {/* ══════════ 플랫폼 현황 (최상단) ══════════ */}
      <section className="platform-status-bar" aria-label="플랫폼 현황">
        <div className="platform-status-inner">
          <div className="platform-status-label">📊 플랫폼 현황</div>
          <div className="platform-stats-row">
            <div className="pstat-item">
              <div className="pstat-num">{c1}개+</div>
              <div className="pstat-label">연동 홍보 채널</div>
            </div>
            <div className="pstat-divider" />
            <div className="pstat-item">
              <div className="pstat-num">{c2.toLocaleString()}건+</div>
              <div className="pstat-label">등록 대회</div>
            </div>
            <div className="pstat-divider" />
            <div className="pstat-item">
              <div className="pstat-num">{c3}%</div>
              <div className="pstat-label">주최사 만족도</div>
            </div>
            <div className="pstat-divider" />
            <div className="pstat-item">
              <div className="pstat-num">{c4.toLocaleString()}명+</div>
              <div className="pstat-label">누적 주최사</div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ 히어로 ══════════ */}
      <section className="hero2" aria-labelledby="hero-h1">
        <div className="hero2-inner">
          <div className="hero2-left animate-fadeup">
            <div className="hero-eyebrow">🏆 대한민국 1위 각종 대회 홍보 플랫폼</div>
            <h1 className="hero2-title" id="hero-h1">
              단 한번의 게시글 등록으로<br />
              <span className="blue-text">40개 동시 채널에 홍보</span>
            </h1>
            <p className="hero2-desc">
              공모전, 이벤트, 행사, 챌린지 등 어떤 대회든<br />
              AI가 각 채널에 최적화된 콘텐츠를 자동 생성·발행합니다.
            </p>

            {/* 채널 카운트 뱃지 */}
            <div className="channel-count-badges">
              {[
                {icon:'📱', label:'SNS 채널', count:12},
                {icon:'✍️', label:'블로그', count:8},
                {icon:'🏆', label:'대회정보 사이트', count:20},
              ].map((b, i) => (
                <div key={i} className="channel-count-badge">
                  <span>{b.icon}</span>
                  <div>
                    <div className="ccb-count">{b.count}개</div>
                    <div className="ccb-label">{b.label}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="hero2-btns">
              <Link href="/dashboard" className="btn-sm btn-yellow btn-xl">🚀 게시글 등록하기</Link>
              <Link href="/contests" className="btn-sm btn-secondary btn-lg">대회 목록 보기</Link>
            </div>
          </div>

          {/* 우측 비주얼 */}
          <div className="hero2-right">
            <div className="hero-card2">
              <div className="hc2-header">
                <span style={{fontSize:18}}>🏆</span>
                <div>
                  <div className="hc2-title">2026 길 사진 공모전</div>
                  <div className="hc2-sub">한국도로공사 · AI 자동 홍보 중</div>
                </div>
                <span className="hc2-live">● LIVE</span>
              </div>
              <div className="hc2-channels">
                {[
                  {name:'인스타그램', pct:100, color:'#E1306C'},
                  {name:'네이버 블로그', pct:95, color:'#03C75A'},
                  {name:'유튜브', pct:88, color:'#FF0000'},
                  {name:'페이스북', pct:92, color:'#1877F2'},
                  {name:'티스토리', pct:85, color:'#FF6600'},
                  {name:'카카오톡', pct:97, color:'#FEE500'},
                ].map(row => (
                  <div key={row.name} className="hc2-ch-row">
                    <div className="hc2-ch-name">{row.name}</div>
                    <div className="hc2-bar-bg">
                      <div className="hc2-bar-fill" style={{width:`${row.pct}%`, background:row.color}} />
                    </div>
                    <div className="hc2-ch-pct" style={{color:row.color}}>{row.pct}%</div>
                  </div>
                ))}
              </div>
              <div className="hc2-total">총 40개 채널 동시 발행 완료 ✓</div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ 채널별 홍보 탭 ══════════ */}
      <section className="section section-white" aria-labelledby="channel-title">
        <div className="container">
          <div className="section-header">
            <span className="section-label">📡 홍보 채널</span>
            <h2 className="section-title" id="channel-title">채널별 자동 홍보 현황</h2>
            <p className="section-desc">SNS, 블로그, 대회정보 사이트 등 총 40개+ 채널에 동시 발행</p>
          </div>

          {/* 그룹 탭 */}
          <div className="ch-group-tabs">
            {CH_GROUPS.map(g => (
              <button key={g.id}
                className={`ch-gtab${activeChTab === g.id ? ' active' : ''}`}
                onClick={() => setActiveChTab(g.id)}>
                <span>{g.icon}</span> {g.label}
                <span className="ch-gtab-count">{g.channels.length}개</span>
              </button>
            ))}
          </div>

          <div className="channel-grid2">
            {displayChs.map((ch, i) => (
              <div key={i} className="channel-card2">
                <div className="ch2-icon" style={{background: CH_COLORS[ch.name] || '#888'}}>
                  <span style={{fontSize:18}}>{ch.emoji}</span>
                </div>
                <div className="ch2-name">{ch.name}</div>
                <div className="ch2-status">자동 발행 ✓</div>
              </div>
            ))}
            {/* 빈 슬롯 */}
            {Array.from({length: Math.max(0, 12 - displayChs.length)}).map((_, i) => (
              <div key={`e${i}`} className="channel-card2 ch2-empty">
                <div className="ch2-icon" style={{background:'#e5e7eb'}}>+</div>
                <div className="ch2-name" style={{color:'#9ca3af',fontSize:10}}>추가 예정</div>
              </div>
            ))}
          </div>
          <div className="ch-total-note">
            + 전체 40개+ 채널 지원 중 &nbsp;|&nbsp; 매월 새 채널 추가
          </div>
        </div>
      </section>

      {/* ══════════ 오늘의 대회 (배너 20개 + 리스트) ══════════ */}
      <section className="section" aria-labelledby="contest-section-title">
        <div className="container">
          {/* 섹션 헤더 */}
          <div className="contests-section-header">
            <div>
              <span className="section-label">🔥 실시간</span>
              <h2 className="section-title" id="contest-section-title" style={{marginTop:4}}>
                지금 진행 중인 대회
              </h2>
            </div>
            <Link href="/contests" className="btn-sm btn-secondary">전체 보기 →</Link>
          </div>

          {/* 필터 탭 */}
          <div className="filter-tabs-row">
            {FILTER_TABS.map(t => (
              <button key={t}
                className={`filter-tab2${filterTab === t ? ' active' : ''}`}
                onClick={() => { setFilterTab(t); setListPage(1) }}>
                {t}
              </button>
            ))}
          </div>

          {/* 배너 그리드 - 상단 20개 */}
          <div className="banner-grid20">
            {bannerContests.map(c => (
              <Link key={c.id} href={`/contests/${c.id}`} className="banner20-card">
                <div className="banner20-thumb" style={{background: c.bgColor}}>
                  <span style={{fontSize:30}}>{c.emoji}</span>
                  <span className={`c-badge ${c.status}`}>{c.statusLabel}</span>
                  <span className="banner20-dday">{c.dday}</span>
                </div>
                <div className="banner20-body">
                  <div className="banner20-cat">{c.category}</div>
                  <div className="banner20-title">{c.title}</div>
                  <div className="banner20-org">{c.org}</div>
                  <div className="banner20-date">마감 {c.deadline}</div>
                </div>
              </Link>
            ))}
          </div>

          {/* ─── 텍스트 리스트 + 페이지네이션 ─── */}
          {listContests.length > 0 && (
            <div style={{marginTop: 32}}>
              <div className="list-section-header">
                <span className="list-section-title">📋 대회목록</span>
                <span className="list-section-count">총 {filteredContests.length}건</span>
              </div>
              <div className="contest-list-table">
                <div className="clt-head">
                  <span>번호</span>
                  <span>대회명</span>
                  <span>주최기관</span>
                  <span>마감일</span>
                  <span>구분</span>
                  <span>상태</span>
                </div>
                {currentList.map((c, i) => (
                  <Link key={c.id} href={`/contests/${c.id}`} className="clt-row">
                    <span className="clt-num">{(listPage - 1) * LIST_PER_PAGE + i + 1}</span>
                    <span className="clt-title-col">{c.title}</span>
                    <span className="clt-org-col">{c.org}</span>
                    <span className="clt-date-col">{c.deadline}</span>
                    <span className="clt-cat-col">{c.category}</span>
                    <span>
                      <span className={`c-badge ${c.status}`} style={{fontSize:10}}>{c.statusLabel}</span>
                    </span>
                  </Link>
                ))}
              </div>
              {/* 페이지네이션 */}
              {totalPages > 1 && (
                <div className="pagination">
                  <button className="page-btn" disabled={listPage <= 1} onClick={() => setListPage(p => p - 1)}>‹</button>
                  {Array.from({length: totalPages}, (_, i) => i + 1).map(p => (
                    <button key={p} className={`page-btn${listPage === p ? ' active' : ''}`} onClick={() => setListPage(p)}>{p}</button>
                  ))}
                  <button className="page-btn" disabled={listPage >= totalPages} onClick={() => setListPage(p => p + 1)}>›</button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ══════════ 3단계 프로세스 ══════════ */}
      <section className="section section-white" aria-labelledby="process-title">
        <div className="container">
          <div className="section-header">
            <span className="section-label">⚡ 이용 방법</span>
            <h2 className="section-title" id="process-title">3단계로 끝나는 간편 홍보</h2>
            <p className="section-desc">공모전, 이벤트, 행사 등 어떤 대회든 단 3단계로 40개 채널 바이럴</p>
          </div>
          <div className="process-grid">
            {[
              {step:'01', icon:'📝', title:'게시글 정보 입력',
               desc:'대회명, 기간, 시상내역, 포스터를 한 번만 입력하세요. 어떤 대회든 바로 등록 가능합니다.'},
              {step:'02', icon:'🤖', title:'AI 채널별 콘텐츠 생성',
               desc:'AI가 인스타그램용, 블로그용, X용 등 각 채널에 맞는 최적화 콘텐츠를 자동 생성합니다.'},
              {step:'03', icon:'🚀', title:'40개 채널 동시 발행',
               desc:'확인 후 클릭 한 번으로 40개 채널에 동시 발행. 채널별 발행 현황을 실시간으로 확인하세요.'},
            ].map((s, i) => (
              <div key={i} className="process-card">
                <div className="process-step-badge">{s.step}</div>
                <div className="process-icon">{s.icon}</div>
                <div className="process-card-title">{s.title}</div>
                <p className="process-card-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 파트너 ══════════ */}
      <section className="section" aria-labelledby="partner-title">
        <div className="container">
          <div className="section-header">
            <span className="section-label">🤝 파트너 기관</span>
            <h2 className="section-title" id="partner-title">신뢰받는 파트너</h2>
          </div>
          <div className="partner-grid">
            {PARTNERS.map((p, i) => (
              <div key={i} className="partner-card">
                <span className="partner-icon">{p.icon}</span>
                <span className="partner-name">{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ CTA ══════════ */}
      <section className="cta-section" aria-labelledby="cta-title">
        <div className="container">
          <h2 className="cta-title" id="cta-title">어떤 대회든, 지금 바로 등록하세요</h2>
          <p className="cta-desc">공모전·이벤트·행사·챌린지 모든 홍보물을<br />AI가 40개 채널에 자동 바이럴합니다</p>
          <div className="cta-btns">
            <Link href="/dashboard" className="btn-sm btn-yellow btn-xl">🚀 게시글 등록하기</Link>
            <Link href="/pricing" className="btn-sm btn-cta-outline btn-lg">견적 보기</Link>
          </div>
          <p className="cta-footnote">✓ 신용카드 불필요 &nbsp;·&nbsp; ✓ 1분 내 등록 완료 &nbsp;·&nbsp; ✓ 언제든 취소 가능</p>
        </div>
      </section>
    </main>
  )
}
