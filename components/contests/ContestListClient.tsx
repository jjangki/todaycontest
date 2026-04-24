'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { CONTESTS } from '@/lib/data'

const FILTER_TABS = [
  {id:'all',label:'전체'},
  {id:'new',label:'🆕 신규등록'},
  {id:'closing',label:'⏰ 마감임박'},
  {id:'prize',label:'💰 상금높은순'},
  {id:'공모전',label:'공모전'},
  {id:'대외활동',label:'대외활동'},
]

export default function ContestListClient() {
  const [filter, setFilter] = useState('all')
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const PER_PAGE = 60

  const filtered = useMemo(() => {
    let list = [...CONTESTS]
    if (filter === 'new') list = list.filter(c => c.status === 'new')
    else if (filter === 'closing') list = list.filter(c => c.status === 'closing')
    else if (filter === 'prize') list = list.sort((a,b) => {
      const pa = parseInt(a.prize.replace(/[^0-9]/g,'')) || 0
      const pb = parseInt(b.prize.replace(/[^0-9]/g,'')) || 0
      return pb - pa
    })
    else if (filter === '공모전' || filter === '대외활동') list = list.filter(c => c.category === filter)
    if (query) list = list.filter(c =>
      c.title.includes(query) || c.org.includes(query) || c.tags.some(t => t.includes(query))
    )
    return list
  }, [filter, query])

  const pageCount = Math.ceil(filtered.length / PER_PAGE)
  const displayed = filtered.slice(0, page * PER_PAGE)

  return (
    <main>
      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-inner">
          <div className="page-header-breadcrumb">
            <Link href="/">홈</Link> <span>/</span> <span>공모전·대회</span>
          </div>
          <h1 className="page-header-title">공모전·대회 목록</h1>
          <p className="page-header-desc">최신 공모전과 대외활동을 한눈에 모아보세요</p>
        </div>
      </div>

      <div className="container" style={{padding:'32px 20px'}}>
        {/* Search */}
        <div className="search-box" style={{maxWidth:560,margin:'0 auto 28px'}}>
          <span style={{fontSize:20}}>🔍</span>
          <input
            type="search"
            placeholder="공모전명, 주최기관, 태그 검색..."
            value={query}
            onChange={e => { setQuery(e.target.value); setPage(1) }}
          />
          {query && (
            <button onClick={() => setQuery('')} style={{color:'var(--gray-400)',fontSize:18,cursor:'pointer'}}>✕</button>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="filter-bar" style={{marginBottom:28}}>
          {FILTER_TABS.map(tab => (
            <button
              key={tab.id}
              className={`filter-tab${filter === tab.id ? ' active' : ''}`}
              onClick={() => { setFilter(tab.id); setPage(1) }}
            >
              {tab.label}
            </button>
          ))}
          <span style={{marginLeft:'auto',fontSize:14,color:'var(--gray-400)',fontWeight:500}}>
            총 {filtered.length}개
          </span>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div style={{textAlign:'center',padding:'80px 20px',color:'var(--gray-400)'}}>
            <div style={{fontSize:48,marginBottom:16}}>🔍</div>
            <p style={{fontSize:18,fontWeight:600}}>검색 결과가 없습니다</p>
            <p style={{fontSize:14,marginTop:8}}>다른 검색어를 입력해보세요</p>
            <button className="btn-primary" style={{marginTop:20}} onClick={() => {setQuery('');setFilter('all')}}>
              전체 목록 보기
            </button>
          </div>
        ) : (
          <>
            <div className="contest-grid">
              {displayed.map(c => (
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
                    <h2 className="contest-title">{c.title}</h2>
                    <p className="contest-prize">{c.prize}</p>
                    <div className="contest-tags">
                      <span className="contest-tag">{c.category}</span>
                      {c.tags.slice(0,1).map((t,i) => <span key={i} className="contest-tag">{t}</span>)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {page < pageCount && (
              <div style={{textAlign:'center',marginTop:40}}>
                <button className="btn-secondary" style={{padding:'12px 32px'}} onClick={() => setPage(p => p+1)}>
                  더 보기 ({filtered.length - displayed.length}개 남음)
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  )
}
