'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Contest {
  id: string; title: string; org: string; category: string;
  prize: string; emoji: string; bgColor: string; tags: string[];
  status: string; statusLabel: string; dday: string; deadline: string;
  views: number; applicants: number; desc: string; target: string; how: string;
}

export default function ContestDetailClient({ contest, similar }: { contest: Contest; similar: Contest[] }) {
  const [days, setDays] = useState<number | null>(null)
  const [hours, setHours] = useState(0)
  const [mins, setMins] = useState(0)
  const [secs, setSecs] = useState(0)
  const [bookmarked, setBookmarked] = useState(false)
  const [shared, setShared] = useState(false)
  const [shareOpen, setShareOpen] = useState(false)

  useEffect(() => {
    const deadline = new Date(contest.deadline)
    const update = () => {
      const now = new Date()
      const diff = deadline.getTime() - now.getTime()
      if (diff > 0) {
        setDays(Math.floor(diff / 86400000))
        setHours(Math.floor((diff % 86400000) / 3600000))
        setMins(Math.floor((diff % 3600000) / 60000))
        setSecs(Math.floor((diff % 60000) / 1000))
      } else {
        setDays(-1)
      }
    }
    update()
    const t = setInterval(update, 1000)
    return () => clearInterval(t)
  }, [contest.deadline])

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href)
    setShared(true)
    setTimeout(() => setShared(false), 2000)
  }

  const schemaLD = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: contest.title,
    organizer: { '@type': 'Organization', name: contest.org },
    description: contest.desc,
    endDate: contest.deadline,
  }

  return (
    <main style={{ marginTop: 64, background: 'var(--bg)', minHeight: '100vh' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLD) }} />

      {/* 브레드크럼 */}
      <div className="detail-breadcrumb-bar">
        <div className="container">
          <nav className="breadcrumb-nav">
            <Link href="/">홈</Link>
            <span className="bc-sep">›</span>
            <Link href="/contests">대회목록</Link>
            <span className="bc-sep">›</span>
            <span className="bc-current">{contest.title}</span>
          </nav>
        </div>
      </div>

      <div className="container" style={{ padding: '24px 20px 60px' }}>
        {/* 상단 레이아웃: 포스터(1/3) + 기본 정보(2/3) */}
        <div className="detail-top-layout">

          {/* 포스터 (1/3 크기) */}
          <div className="detail-poster-col">
            <div className="detail-poster-wrap" style={{ background: contest.bgColor }}>
              <span className="detail-poster-emoji">{contest.emoji}</span>
              <span className={`c-badge ${contest.status} detail-poster-badge`}>{contest.statusLabel}</span>
            </div>
            {/* D-Day 타이머 */}
            <div className="detail-dday-box">
              {days === null ? (
                <div className="dday-loading">계산 중...</div>
              ) : days < 0 ? (
                <div className="dday-closed">마감</div>
              ) : (
                <>
                  <div className="dday-label-small">마감까지</div>
                  <div className="dday-big">D-{days}</div>
                  <div className="dday-clock">
                    {String(hours).padStart(2, '0')}:{String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* 기본 정보 (2/3) */}
          <div className="detail-info-col">
            {/* 카테고리 + 상태 배지 */}
            <div className="detail-badges-row">
              <span className="chip chip-blue">{contest.category}</span>
              <span className={`chip chip-${contest.status === 'closing' ? 'red' : contest.status === 'new' ? 'green' : 'blue'}`}>
                {contest.statusLabel}
              </span>
              {contest.tags.map((t, i) => (
                <span key={i} className="chip chip-gray">{t}</span>
              ))}
            </div>

            <h1 className="detail-main-title">{contest.title}</h1>

            {/* 핵심 정보 그리드 */}
            <div className="detail-meta-grid">
              <div className="detail-meta-item">
                <span className="dmi-label">🏢 주최기관</span>
                <span className="dmi-value">{contest.org}</span>
              </div>
              <div className="detail-meta-item">
                <span className="dmi-label">💰 시상 내역</span>
                <span className="dmi-value prize">{contest.prize}</span>
              </div>
              <div className="detail-meta-item">
                <span className="dmi-label">📅 마감일</span>
                <span className="dmi-value deadline">{contest.deadline}</span>
              </div>
              <div className="detail-meta-item">
                <span className="dmi-label">👥 참여 대상</span>
                <span className="dmi-value">{contest.target}</span>
              </div>
              <div className="detail-meta-item">
                <span className="dmi-label">📮 접수 방법</span>
                <span className="dmi-value">{contest.how}</span>
              </div>
              <div className="detail-meta-item">
                <span className="dmi-label">👁️ 조회수</span>
                <span className="dmi-value">{contest.views.toLocaleString()}회</span>
              </div>
            </div>

            {/* 액션 버튼 */}
            <div className="detail-action-row">
              <button className="btn-primary detail-apply-btn">
                🚀 지원하기
              </button>
              <button
                className={`detail-icon-btn${bookmarked ? ' active' : ''}`}
                onClick={() => setBookmarked(!bookmarked)}
                title="저장하기"
              >
                {bookmarked ? '💙' : '🔖'}
              </button>
              <div className="share-wrap">
                <button
                  className="detail-icon-btn"
                  onClick={() => setShareOpen(!shareOpen)}
                  title="공유하기"
                >
                  🔗
                </button>
                {shareOpen && (
                  <div className="share-dropdown">
                    <button className="share-item" onClick={handleShare}>
                      {shared ? '✅ 링크 복사됨' : '📋 링크 복사'}
                    </button>
                    <button className="share-item kakao">💬 카카오 공유</button>
                    <button className="share-item insta">📸 인스타 공유</button>
                    <button className="share-item fb">📘 페이스북 공유</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ──────── 메인 콘텐츠 + 사이드바 ──────── */}
        <div className="detail-content-layout">

          {/* 왼쪽: 상세 정보 */}
          <div className="detail-main-content">

            {/* AI 요약 */}
            <div className="detail-section-card">
              <h2 className="dsc-title">🤖 AI 요약 정보</h2>
              <div className="ai-summary-box">
                <p>
                  <strong style={{ color: 'var(--blue)' }}>한줄 요약:</strong>{' '}
                  {contest.org}에서 주최하는 <strong>{contest.title}</strong>입니다.{' '}
                  {contest.prize !== '상금 없음 (인턴십)' ? contest.prize : '인턴십 기회 제공'}하며,
                  마감일은 <strong style={{ color: 'var(--red)' }}>{contest.deadline}</strong>입니다.
                </p>
              </div>
            </div>

            {/* 대회 상세 */}
            <div className="detail-section-card">
              <h2 className="dsc-title">📋 대회 상세 정보</h2>
              <p className="detail-desc-text">{contest.desc}</p>
              <div className="detail-full-info">
                <div className="dfi-row">
                  <span className="dfi-label">주최기관</span>
                  <span className="dfi-value">{contest.org}</span>
                </div>
                <div className="dfi-row">
                  <span className="dfi-label">시상 내역</span>
                  <span className="dfi-value" style={{ color: 'var(--blue)', fontWeight: 700 }}>{contest.prize}</span>
                </div>
                <div className="dfi-row">
                  <span className="dfi-label">참여 대상</span>
                  <span className="dfi-value">{contest.target}</span>
                </div>
                <div className="dfi-row">
                  <span className="dfi-label">접수 방법</span>
                  <span className="dfi-value">{contest.how}</span>
                </div>
                <div className="dfi-row">
                  <span className="dfi-label">마감일</span>
                  <span className="dfi-value" style={{ color: 'var(--red)', fontWeight: 700 }}>{contest.deadline}</span>
                </div>
                <div className="dfi-row">
                  <span className="dfi-label">카테고리</span>
                  <span className="dfi-value">
                    <span className="chip chip-blue">{contest.category}</span>
                  </span>
                </div>
                <div className="dfi-row">
                  <span className="dfi-label">태그</span>
                  <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                    {contest.tags.map((t, i) => (
                      <span key={i} className="chip chip-gray">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 통계 */}
            <div className="detail-section-card">
              <h2 className="dsc-title">📊 통계</h2>
              <div className="detail-stats-row">
                <div className="detail-stat">
                  <div className="ds-num">{contest.views.toLocaleString()}</div>
                  <div className="ds-label">조회수</div>
                </div>
                <div className="detail-stat">
                  <div className="ds-num">{contest.applicants.toLocaleString()}</div>
                  <div className="ds-label">관심 인원</div>
                </div>
                <div className="detail-stat">
                  <div className="ds-num">{days !== null && days >= 0 ? `D-${days}` : '마감'}</div>
                  <div className="ds-label">남은 기간</div>
                </div>
              </div>
            </div>
          </div>

          {/* 오른쪽: 사이드바 */}
          <div className="detail-sidebar">
            {/* 지원하기 CTA */}
            <div className="sidebar-cta-card">
              <div className="sidebar-prize">{contest.prize}</div>
              <button className="btn-primary" style={{ width: '100%', padding: '14px', fontSize: 16, justifyContent: 'center', marginBottom: 10 }}>
                🚀 지원하기
              </button>
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  className={`btn-secondary${bookmarked ? ' bookmarked' : ''}`}
                  style={{ flex: 1, padding: '11px', justifyContent: 'center', background: bookmarked ? 'var(--blue-light)' : '' }}
                  onClick={() => setBookmarked(!bookmarked)}
                >
                  {bookmarked ? '💙 저장됨' : '🔖 저장'}
                </button>
                <button
                  className="btn-secondary"
                  style={{ flex: 1, padding: '11px', justifyContent: 'center' }}
                  onClick={handleShare}
                >
                  {shared ? '✅ 복사됨' : '🔗 공유'}
                </button>
              </div>
            </div>

            {/* 마감 타이머 */}
            <div className="sidebar-timer-card">
              <div className="timer-title">⏰ 마감까지</div>
              {days === null ? (
                <div style={{ textAlign: 'center', padding: 20 }}>계산 중...</div>
              ) : days < 0 ? (
                <div className="timer-closed">접수 마감</div>
              ) : (
                <div className="timer-display">
                  <div className="timer-unit-wrap">
                    <div className="timer-num">{days}</div>
                    <div className="timer-unit-label">일</div>
                  </div>
                  <div className="timer-colon">:</div>
                  <div className="timer-unit-wrap">
                    <div className="timer-num">{String(hours).padStart(2, '0')}</div>
                    <div className="timer-unit-label">시간</div>
                  </div>
                  <div className="timer-colon">:</div>
                  <div className="timer-unit-wrap">
                    <div className="timer-num">{String(mins).padStart(2, '0')}</div>
                    <div className="timer-unit-label">분</div>
                  </div>
                  <div className="timer-colon">:</div>
                  <div className="timer-unit-wrap">
                    <div className="timer-num">{String(secs).padStart(2, '0')}</div>
                    <div className="timer-unit-label">초</div>
                  </div>
                </div>
              )}
              <div className="timer-deadline">마감: {contest.deadline}</div>
            </div>

            {/* SNS 공유 */}
            <div className="sidebar-share-card">
              <h3 className="share-card-title">📤 SNS 공유</h3>
              <div className="share-btn-grid">
                {[
                  { label: '카카오', emoji: '💬', color: '#FEE500', text: '#000' },
                  { label: '인스타', emoji: '📸', color: '#E1306C', text: '#fff' },
                  { label: '페이스북', emoji: '📘', color: '#1877F2', text: '#fff' },
                  { label: 'X', emoji: '🐦', color: '#000', text: '#fff' },
                ].map((s, i) => (
                  <button key={i} className="share-sns-btn"
                    style={{ background: s.color, color: s.text }}>
                    <span>{s.emoji}</span>
                    <span>{s.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 대회 정보 요약 */}
            <div className="sidebar-info-card">
              <h3 className="sidebar-info-title">📌 대회 정보</h3>
              <div className="si-row">
                <span className="si-label">주최</span>
                <span className="si-value">{contest.org}</span>
              </div>
              <div className="si-row">
                <span className="si-label">마감</span>
                <span className="si-value" style={{ color: 'var(--red)', fontWeight: 700 }}>{contest.deadline}</span>
              </div>
              <div className="si-row">
                <span className="si-label">상금</span>
                <span className="si-value" style={{ color: 'var(--blue)', fontWeight: 700 }}>{contest.prize}</span>
              </div>
              <div className="si-row">
                <span className="si-label">대상</span>
                <span className="si-value">{contest.target}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 추천 대회 */}
        {similar.length > 0 && (
          <section style={{ marginTop: 48 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--gray-900)' }}>🔥 추천 대회</h2>
              <Link href="/contests" style={{ fontSize: 13, color: 'var(--blue)' }}>전체보기 →</Link>
            </div>
            <div className="similar-grid">
              {similar.map(c => (
                <Link key={c.id} href={`/contests/${c.id}`} className="similar-card">
                  <div className="similar-thumb" style={{ background: c.bgColor }}>
                    <span style={{ fontSize: 24 }}>{c.emoji}</span>
                    <span className={`c-badge ${c.status}`} style={{ fontSize: 9 }}>{c.statusLabel}</span>
                  </div>
                  <div className="similar-body">
                    <div className="similar-cat">{c.category}</div>
                    <div className="similar-title">{c.title}</div>
                    <div className="similar-org">{c.org}</div>
                    <div className="similar-prize">{c.prize}</div>
                    <div className="similar-dday">{c.dday}</div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
