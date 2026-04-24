'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { CONTESTS } from '@/lib/data'

const FILTER_TABS = ['전체', '공모전', '대외활동', '이벤트', '해커톤', '사진', '음악', '영상']
const SORT_OPTS = [
  { value: 'deadline', label: '마감 임박순' },
  { value: 'new', label: '최신 등록순' },
  { value: 'prize', label: '상금 높은순' },
]
const LIST_PER_PAGE = 15

export default function ContestListClient() {
  const [filterTab, setFilterTab] = useState('전체')
  const [sort, setSort] = useState('deadline')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [viewMode, setViewMode] = useState<'banner' | 'list'>('list')

  const filtered = useMemo(() => {
    let arr = CONTESTS
    if (filterTab !== '전체') arr = arr.filter(c => c.category === filterTab)
    if (search.trim()) {
      const q = search.trim().toLowerCase()
      arr = arr.filter(c => c.title.toLowerCase().includes(q) || c.org.toLowerCase().includes(q))
    }
    return arr
  }, [filterTab, search])

  const totalPages = Math.ceil(filtered.length / LIST_PER_PAGE)
  const currentItems = filtered.slice((page - 1) * LIST_PER_PAGE, page * LIST_PER_PAGE)

  const handleFilter = (tab: string) => {
    setFilterTab(tab)
    setPage(1)
  }
  const handleSearch = (v: string) => {
    setSearch(v)
    setPage(1)
  }

  return (
    <main style={{ marginTop: 56, background: 'var(--bg)', minHeight: 'calc(100vh - 56px)' }}>
      {/* 페이지 헤더 */}
      <div className="page-hero-bar">
        <div className="container">
          <div className="page-hero-content">
            <h1 className="page-hero-title">대회목록</h1>
            <p className="page-hero-desc">
              대한민국의 모든 공모전·이벤트·대외활동을 한 곳에서
            </p>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '24px 20px' }}>
        {/* 필터 + 검색 행 */}
        <div className="list-controls">
          <div className="filter-tab-group">
            {FILTER_TABS.map(t => (
              <button key={t}
                className={`filter-tab2${filterTab === t ? ' active' : ''}`}
                onClick={() => handleFilter(t)}>
                {t}
              </button>
            ))}
          </div>
          <div className="list-right-controls">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="대회명, 주최기관 검색..."
                value={search}
                onChange={e => handleSearch(e.target.value)}
                className="search-input"
              />
            </div>
            <select className="sort-select" value={sort} onChange={e => setSort(e.target.value)}>
              {SORT_OPTS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <div className="view-toggle">
              <button className={`view-btn${viewMode === 'list' ? ' active' : ''}`} onClick={() => setViewMode('list')} title="목록형">☰</button>
              <button className={`view-btn${viewMode === 'banner' ? ' active' : ''}`} onClick={() => setViewMode('banner')} title="카드형">⊞</button>
            </div>
          </div>
        </div>

        <div className="list-meta-row">
          <span className="list-meta-count">총 <strong>{filtered.length}</strong>건의 대회</span>
        </div>

        {/* ─── 카드형 ─── */}
        {viewMode === 'banner' && (
          <div className="banner-grid20" style={{ marginTop: 12 }}>
            {currentItems.map(c => (
              <Link key={c.id} href={`/contests/${c.id}`} className="banner20-card">
                <div className="banner20-thumb" style={{ background: c.bgColor }}>
                  <span style={{ fontSize: 30 }}>{c.emoji}</span>
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
        )}

        {/* ─── 목록형 ─── */}
        {viewMode === 'list' && (
          <div className="contest-list-table" style={{ marginTop: 12 }}>
            <div className="clt-head">
              <span>번호</span>
              <span>대회명</span>
              <span>주최기관</span>
              <span>마감일</span>
              <span>구분</span>
              <span>상태</span>
            </div>
            {currentItems.map((c, i) => (
              <Link key={c.id} href={`/contests/${c.id}`} className="clt-row">
                <span className="clt-num">{(page - 1) * LIST_PER_PAGE + i + 1}</span>
                <span className="clt-title-col">{c.title}</span>
                <span className="clt-org-col">{c.org}</span>
                <span className="clt-date-col">{c.deadline}</span>
                <span className="clt-cat-col">{c.category}</span>
                <span>
                  <span className={`c-badge ${c.status}`} style={{ fontSize: 10 }}>{c.statusLabel}</span>
                </span>
              </Link>
            ))}
            {currentItems.length === 0 && (
              <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--gray-400)' }}>
                검색 결과가 없습니다.
              </div>
            )}
          </div>
        )}

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <div className="pagination">
            <button className="page-btn" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>‹</button>
            {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
              let p = i + 1
              if (totalPages > 7) {
                if (page <= 4) p = i + 1
                else if (page >= totalPages - 3) p = totalPages - 6 + i
                else p = page - 3 + i
              }
              return (
                <button key={p} className={`page-btn${page === p ? ' active' : ''}`} onClick={() => setPage(p)}>{p}</button>
              )
            })}
            <button className="page-btn" disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>›</button>
          </div>
        )}
      </div>
    </main>
  )
}
