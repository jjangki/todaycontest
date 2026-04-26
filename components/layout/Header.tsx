'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  { href: '/contests', label: '오늘의 대회' },
  { href: '/service', label: '서비스 소개' },
  { href: '/pricing', label: '견적·요금제' },
  { href: '/dashboard', label: '게시글 등록' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])
  useEffect(() => setMobileOpen(false), [pathname])

  return (
    <>
      <header className={`header${scrolled ? ' scrolled' : ''}`}>
        <div className="header-inner">
          {/* ── 로고 ── */}
          <Link href="/" className="header-logo" aria-label="오늘의 대회 홈으로">
            <div className="logo-box">
              <span className="logo-today-txt">to<span className="logo-dash">-</span>day</span>
            </div>
            <div className="logo-info">
              <div className="logo-name-large">오늘의 대회</div>
            </div>
          </Link>

          {/* ── 네비게이션 ── */}
          <nav className="header-nav" aria-label="주요 메뉴">
            {NAV.map(n => (
              <Link key={n.href} href={n.href}
                className={`nav-link${pathname === n.href ? ' active' : ''}${n.href === '/dashboard' ? ' nav-cta' : ''}`}>
                {n.label}
              </Link>
            ))}
          </nav>

          {/* ── 우측 액션 ── */}
          <div className="header-right">
            <Link href="/dashboard" className="hdr-login-btn">로그인</Link>
            <Link href="/dashboard" className="btn-sm btn-primary">게시글 등록하기</Link>
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileOpen(v => !v)}
              aria-label={mobileOpen ? '메뉴 닫기' : '메뉴 열기'}
              aria-expanded={mobileOpen}>
              <span className={mobileOpen ? 'bar bar-top open' : 'bar bar-top'} />
              <span className={mobileOpen ? 'bar bar-mid open' : 'bar bar-mid'} />
              <span className={mobileOpen ? 'bar bar-bot open' : 'bar bar-bot'} />
            </button>
          </div>
        </div>
      </header>

      {/* ── 모바일 드롭다운 ── */}
      <nav className={`mobile-nav${mobileOpen ? ' open' : ''}`} aria-label="모바일 메뉴">
        <Link href="/">홈</Link>
        {NAV.map(n => <Link key={n.href} href={n.href}>{n.label}</Link>)}
        <div className="mobile-nav-btns">
          <Link href="/dashboard" className="btn-sm btn-secondary" style={{flex:1,justifyContent:'center'}}>로그인</Link>
          <Link href="/dashboard" className="btn-sm btn-primary" style={{flex:1,justifyContent:'center'}}>게시글 등록하기</Link>
        </div>
      </nav>
    </>
  )
}
