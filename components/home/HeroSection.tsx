'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';

const floatingBadges = [
  { label: "40개 채널 동시 배포", icon: "🚀", delay: "0s", x: "5%", y: "20%" },
  { label: "AI 자동 변환", icon: "🤖", delay: "1s", x: "80%", y: "15%" },
  { label: "실시간 통계", icon: "📊", delay: "2s", x: "12%", y: "70%" },
  { label: "D-Day 타이머", icon: "⏰", delay: "0.5s", x: "75%", y: "72%" },
];

export default function HeroSection() {
  const countRefs = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const counts = [40, 98, 15000, 95];
    const suffixes = ['+', '%', '+', '%'];
    const durations = [1500, 2000, 2000, 1800];

    countRefs.current.forEach((el, i) => {
      if (!el) return;
      let start = 0;
      const end = counts[i];
      const step = end / (durations[i] / 16);
      const timer = setInterval(() => {
        start = Math.min(start + step, end);
        el.textContent = Math.floor(start).toLocaleString() + suffixes[i];
        if (start >= end) clearInterval(timer);
      }, 16);
    });
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#030B2E] via-[#0A1A4E] to-[#051035] min-h-[92vh] flex items-center">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 82, 255, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 82, 255, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />

      {/* Floating badges */}
      {floatingBadges.map((badge, i) => (
        <div
          key={i}
          className="absolute hidden lg:flex items-center gap-2 glass px-4 py-2.5 rounded-full text-white text-sm font-medium shadow-floating animate-float"
          style={{ left: badge.x, top: badge.y, animationDelay: badge.delay }}
        >
          <span>{badge.icon}</span>
          <span>{badge.label}</span>
        </div>
      ))}

      <div className="container-max relative z-10 py-24 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 border border-primary/30 rounded-full text-primary-light text-sm font-semibold mb-8">
          <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
          대한민국 1위 AI 공모전·대회 자동 홍보 플랫폼
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.15] tracking-tight mb-6">
          <span className="block">단 한 번의 등록,</span>
          <span className="block mt-2">
            <span className="text-gradient-accent animated-gradient-text">40개 채널</span>
            {' '}동시 홍보
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          AI가 채널별 최적화 콘텐츠를 자동 생성하고, 씽굿·에브리타임·인스타·블로그까지<br className="hidden md:block" />
          <strong className="text-white">단 1초</strong>에 전부 배포합니다.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            href="/dashboard"
            className="group px-8 py-4 bg-accent hover:bg-accent-dark text-text font-black text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex items-center gap-3"
          >
            <span>🏆</span>
            <span>지금 바로 대회 등록하기</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
          <Link
            href="/service"
            className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold text-lg rounded-2xl border border-white/20 hover:border-white/40 transition-all duration-300 backdrop-blur-sm"
          >
            서비스 소개 보기
          </Link>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
          {[
            { label: "연동 홍보 채널", color: "text-accent" },
            { label: "홍보 효율 증가", color: "text-green-400" },
            { label: "등록된 공모전", color: "text-primary-light" },
            { label: "주최사 만족도", color: "text-pink-400" },
          ].map((stat, i) => (
            <div key={i} className="glass rounded-2xl p-4 text-center">
              <div className={`text-3xl md:text-4xl font-black font-inter ${stat.color} mb-1`}>
                <span ref={(el) => { if (el) countRefs.current[i] = el; }}>0</span>
              </div>
              <div className="text-xs text-gray-400 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#F8FAFC" />
        </svg>
      </div>
    </section>
  );
}
