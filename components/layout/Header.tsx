'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_ITEMS = [
  { href: '/', label: '홈' },
  { href: '/contests', label: '공모전·대회' },
  { href: '/service', label: '서비스 소개' },
  { href: '/pricing', label: '요금제' },
  { href: '/dashboard', label: '주최사 센터' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [pathname])

  return (
    <>
      <header className={`header${scrolled ? ' scrolled' : ''}`}>
        <div className="header-inner">
          <Link href="/" className="header-logo">
            <div className="logo-icon">T</div>
            <span>오늘의 대회</span>
          </Link>
          <nav className="header-nav" aria-label="메인 네비게이션">
            {NAV_ITEMS.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link${pathname === item.href ? ' active' : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="header-cta">
            <Link href="/dashboard" className="btn-secondary" style={{fontSize:'13px',padding:'8px 16px'}}>로그인</Link>
            <Link href="/dashboard" className="btn-primary" style={{fontSize:'13px',padding:'8px 16px'}}>무료 시작</Link>
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="메뉴"
            >
              <span style={mobileOpen ? {transform:'rotate(45deg) translate(5px,5px)'} : {}}></span>
              <span style={mobileOpen ? {opacity:0} : {}}></span>
              <span style={mobileOpen ? {transform:'rotate(-45deg) translate(5px,-5px)'} : {}}></span>
            </button>
          </div>
        </div>
      </header>
      <nav className={`mobile-nav${mobileOpen ? ' open' : ''}`} aria-label="모바일 네비게이션">
        {NAV_ITEMS.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={pathname === item.href ? 'active' : ''}
          >
            {item.label}
          </Link>
        ))}
        <div className="mobile-nav-cta">
          <Link href="/dashboard" className="btn-secondary">로그인</Link>
          <Link href="/dashboard" className="btn-primary">무료 시작</Link>
        </div>
      </nav>
    </>
  )
}
