'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: '홈' },
  { href: '/contests', label: '오늘의 대회' },
  { href: '/service', label: '서비스 소개' },
  { href: '/pricing', label: '요금제 안내' },
  { href: '/dashboard', label: '주최사 등록', highlight: true },
];

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md py-2'
          : 'bg-white/80 backdrop-blur-sm py-3'
      }`}
    >
      <div className="container-max flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-md group-hover:shadow-glow transition-all duration-200">
            <span className="text-white font-black text-base leading-none">오</span>
          </div>
          <div className="flex flex-col">
            <span className="font-black text-lg text-text leading-none tracking-tight">
              오늘의 대회
            </span>
            <span className="text-[10px] text-primary font-semibold leading-none tracking-wide">
              TodayContest
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1" aria-label="주요 메뉴">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            if (item.highlight) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="ml-2 px-5 py-2.5 bg-accent text-text font-bold rounded-xl hover:bg-accent-dark transition-all duration-200 text-sm shadow-sm hover:shadow-md hover:-translate-y-0.5"
                >
                  🏆 {item.label}
                </Link>
              );
            }
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-primary bg-primary/10 font-semibold'
                    : 'text-text-muted hover:text-text hover:bg-gray-100'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="모바일 메뉴 열기"
          aria-expanded={isMobileMenuOpen}
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span className={`block h-0.5 bg-text rounded transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 bg-text rounded transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 bg-text rounded transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <nav
          className="md:hidden absolute top-full left-0 right-0 bg-white shadow-floating border-t border-border py-4"
          aria-label="모바일 메뉴"
        >
          <div className="container-max flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              if (item.highlight) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="mx-2 mt-2 px-4 py-3 bg-accent text-text font-bold rounded-xl text-center text-sm"
                  >
                    🏆 {item.label}
                  </Link>
                );
              }
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive ? 'text-primary bg-primary/10 font-semibold' : 'text-text hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}
