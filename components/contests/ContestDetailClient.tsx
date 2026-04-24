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

  const schemaLD = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: contest.title,
    organizer: { "@type": "Organization", name: contest.org },
    description: contest.desc,
    endDate: contest.deadline,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" }
  }

  return (
    <main style={{marginTop:64}}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(schemaLD)}} />

      {/* Page Header */}
      <div style={{background:'white',borderBottom:'1px solid var(--gray-200)',padding:'20px 0'}}>
        <div className="container">
          <div className="page-header-breadcrumb">
            <Link href="/">홈</Link> <span>/</span>
            <Link href="/contests">공모전·대회</Link> <span>/</span>
            <span>{contest.title}</span>
          </div>
        </div>
      </div>

      <div className="container" style={{padding:'32px 20px'}}>
        <div className="detail-layout">
          {/* LEFT */}
          <div>
            {/* Poster */}
            <div className="detail-poster" style={{background:contest.bgColor,fontSize:80,marginBottom:24}}>
              {contest.emoji}
            </div>

            {/* AI Summary */}
            <div className="dash-card">
              <h2 className="dash-card-title">🤖 AI 요약 정보</h2>
              <div style={{
                background:'linear-gradient(135deg,var(--blue-light),#F0FFF4)',
                borderRadius:'var(--radius)',
                padding:'16px 20px',
                marginBottom:16,
                fontSize:14,
                lineHeight:1.8,
                color:'var(--gray-700)'
              }}>
                <strong style={{color:'var(--blue)'}}>한줄 요약:</strong> {contest.org}에서 주최하는 {contest.title}입니다.
                {contest.prize !== '상금 없음 (인턴십)' ? ` ${contest.prize}` : ' 인턴십 기회를 제공'}하며,
                마감일은 {contest.deadline}입니다.
              </div>
              <div className="detail-info-row">
                <span className="detail-info-label">👥 참여 대상</span>
                <span className="detail-info-value">{contest.target}</span>
              </div>
              <div className="detail-info-row">
                <span className="detail-info-label">📮 접수 방법</span>
                <span className="detail-info-value">{contest.how}</span>
              </div>
              <div className="detail-info-row">
                <span className="detail-info-label">📂 카테고리</span>
                <span className="detail-info-value">
                  <span className="chip chip-blue">{contest.category}</span>
                </span>
              </div>
              <div className="detail-info-row">
                <span className="detail-info-label">🏷️ 태그</span>
                <div style={{display:'flex',gap:4,flexWrap:'wrap'}}>
                  {contest.tags.map((t,i) => (
                    <span key={i} className="chip chip-gray">{t}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="dash-card">
              <h2 className="dash-card-title">📋 대회 상세 정보</h2>
              <p style={{fontSize:15,lineHeight:1.8,color:'var(--gray-600)',marginBottom:20}}>{contest.desc}</p>
              <div className="detail-info-row">
                <span className="detail-info-label">👀 조회수</span>
                <span className="detail-info-value">{contest.views.toLocaleString()}회</span>
              </div>
              <div className="detail-info-row">
                <span className="detail-info-label">📊 관심 인원</span>
                <span className="detail-info-value">{contest.applicants.toLocaleString()}명</span>
              </div>
              <div className="detail-info-row">
                <span className="detail-info-label">🗓️ 마감일</span>
                <span className="detail-info-value" style={{color:'var(--red)',fontWeight:700}}>{contest.deadline}</span>
              </div>
            </div>
          </div>

          {/* RIGHT Sidebar */}
          <div className="detail-sidebar">
            {/* D-Day Timer */}
            <div className="dday-timer" style={{marginBottom:16}}>
              {days === null ? (
                <div style={{fontSize:24}}>계산 중...</div>
              ) : days < 0 ? (
                <div>
                  <div className="dday-num">마감</div>
                  <div className="dday-label">접수가 종료되었습니다</div>
                </div>
              ) : (
                <>
                  <div style={{fontSize:12,opacity:0.7,marginBottom:8}}>마감까지 남은 시간</div>
                  <div className="dday-num">D-{days}</div>
                  <div className="dday-label">
                    {String(hours).padStart(2,'0')}:{String(mins).padStart(2,'0')}:{String(secs).padStart(2,'0')}
                  </div>
                </>
              )}
            </div>

            {/* Info */}
            <div className="detail-card">
              <h3 style={{fontSize:16,fontWeight:700,marginBottom:14,color:'var(--gray-900)'}}>대회 정보</h3>
              <div className="detail-info-row">
                <span className="detail-info-label">주최기관</span>
                <span className="detail-info-value">{contest.org}</span>
              </div>
              <div className="detail-info-row">
                <span className="detail-info-label">시상 내역</span>
                <span className="detail-info-value" style={{color:'var(--blue)'}}>{contest.prize}</span>
              </div>
              <div className="detail-info-row">
                <span className="detail-info-label">상태</span>
                <span className={`chip chip-${contest.status === 'closing' ? 'red' : contest.status === 'new' ? 'green' : 'blue'}`}>
                  {contest.statusLabel}
                </span>
              </div>
              <div className="detail-info-row">
                <span className="detail-info-label">마감일</span>
                <span className="detail-info-value">{contest.deadline}</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <button className="btn-primary" style={{width:'100%',padding:'14px',fontSize:16,justifyContent:'center',marginBottom:10}}>
              🚀 지원하기
            </button>
            <div style={{display:'flex',gap:8}}>
              <button
                className={`btn-secondary${bookmarked?' ':' '}`}
                style={{flex:1,padding:'11px',justifyContent:'center',background:bookmarked?'var(--blue-light)':''}}
                onClick={() => setBookmarked(!bookmarked)}
              >
                {bookmarked ? '💙 저장됨' : '🔖 저장하기'}
              </button>
              <button
                className="btn-secondary"
                style={{flex:1,padding:'11px',justifyContent:'center'}}
                onClick={() => { navigator.clipboard?.writeText(window.location.href); setShared(true); setTimeout(()=>setShared(false),2000) }}
              >
                {shared ? '✅ 복사됨' : '🔗 공유하기'}
              </button>
            </div>

            {/* SNS Share */}
            <div className="detail-card" style={{marginTop:16}}>
              <h3 style={{fontSize:14,fontWeight:700,marginBottom:12,color:'var(--gray-700)'}}>SNS 공유</h3>
              <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8}}>
                {[
                  {label:'카카오',emoji:'💬',color:'#FEE500',textColor:'#000'},
                  {label:'인스타',emoji:'📸',color:'#E1306C',textColor:'#fff'},
                  {label:'페이스북',emoji:'📘',color:'#1877F2',textColor:'#fff'},
                  {label:'트위터',emoji:'🐦',color:'#000',textColor:'#fff'},
                ].map((s,i) => (
                  <button key={i} style={{
                    padding:'10px 6px',borderRadius:'var(--radius)',
                    background:s.color,color:s.textColor,
                    fontSize:11,fontWeight:700,border:'none',cursor:'pointer',
                    display:'flex',flexDirection:'column',alignItems:'center',gap:4,
                    transition:'transform 0.2s'
                  }}>
                    <span style={{fontSize:16}}>{s.emoji}</span>
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Similar Contests */}
        {similar.length > 0 && (
          <section style={{marginTop:48}} aria-labelledby="similar-title">
            <h2 id="similar-title" style={{fontSize:22,fontWeight:800,marginBottom:24,color:'var(--gray-900)'}}>
              🔥 비슷한 공모전
            </h2>
            <div className="contest-grid" style={{gridTemplateColumns:'repeat(6,1fr)'}}>
              {similar.map(c => (
                <Link key={c.id} href={`/contests/${c.id}`} className="contest-card">
                  <div className="contest-thumb">
                    <div className="contest-thumb-placeholder" style={{background:c.bgColor}}>{c.emoji}</div>
                    <span className={`contest-badge badge-${c.status}`}>{c.statusLabel}</span>
                    <span className="contest-dday">{c.dday}</span>
                  </div>
                  <div className="contest-info">
                    <p className="contest-org">{c.org}</p>
                    <h3 className="contest-title">{c.title}</h3>
                    <p className="contest-prize">{c.prize}</p>
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
