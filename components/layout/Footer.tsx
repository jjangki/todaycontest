import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#0A0F1E] text-white mt-20" role="contentinfo">
      {/* Main Footer */}
      <div className="container-max py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <span className="text-white font-black text-lg">오</span>
              </div>
              <div>
                <div className="font-black text-xl leading-none">오늘의 대회</div>
                <div className="text-xs text-primary-light font-semibold mt-0.5">TodayContest</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              대한민국 1위 AI 기반<br />
              공모전·대회 자동 홍보 플랫폼
            </p>
            <div className="flex gap-3">
              {['📘', '📸', '▶️', '💬'].map((icon, i) => (
                <button
                  key={i}
                  className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors text-base"
                  aria-label={`소셜 미디어 ${i + 1}`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <nav className="md:col-span-1" aria-label="푸터 메뉴">
            <h3 className="font-bold text-sm text-gray-300 uppercase tracking-wider mb-4">메뉴</h3>
            <ul className="space-y-2.5">
              {[
                { href: '/', label: '홈' },
                { href: '/contests', label: '오늘의 대회' },
                { href: '/service', label: '서비스 소개' },
                { href: '/pricing', label: '요금제 안내' },
                { href: '/dashboard', label: '주최사 등록' },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <div className="md:col-span-1">
            <h3 className="font-bold text-sm text-gray-300 uppercase tracking-wider mb-4">서비스</h3>
            <ul className="space-y-2.5">
              {[
                'AI 자동 배포',
                '채널별 콘텐츠 변환',
                '대행 견적 서비스',
                '접수 시스템 렌탈',
                '심사 대행',
                '시상식 기획',
              ].map((service) => (
                <li key={service}>
                  <span className="text-gray-400 text-sm">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <address className="md:col-span-1 not-italic">
            <h3 className="font-bold text-sm text-gray-300 uppercase tracking-wider mb-4">고객센터</h3>
            <ul className="space-y-3">
              <li>
                <div className="text-xs text-gray-500 mb-0.5">대표전화</div>
                <a href="tel:02-6953-1996" className="text-white font-semibold hover:text-accent transition-colors font-inter">
                  02-6953-1996
                </a>
              </li>
              <li>
                <div className="text-xs text-gray-500 mb-0.5">이메일</div>
                <a href="mailto:abc@babkorea.com" className="text-gray-400 hover:text-white text-sm transition-colors">
                  abc@babkorea.com
                </a>
              </li>
              <li>
                <div className="text-xs text-gray-500 mb-0.5">운영시간</div>
                <span className="text-gray-400 text-sm">평일 09:00 ~ 18:00</span>
              </li>
              <li className="pt-2">
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-text font-bold text-sm rounded-lg hover:bg-accent-dark transition-colors"
                >
                  📋 견적 문의
                </Link>
              </li>
            </ul>
          </address>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/10">
        <div className="container-max py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            {/* Company Info */}
            <div className="text-gray-500 text-xs space-y-1">
              <p>
                <span className="text-gray-400 font-semibold">(주)수상한콘텐츠</span>
                {' '}ㅣ 대표이사: 신현화, 박현학
                {' '}ㅣ 사업자등록번호: 684-88-02992
              </p>
              <p>
                서울특별시 성북구 화랑로 265, 3층
                {' '}ㅣ 여성법인 인증 기업
              </p>
              <p className="text-gray-600">
                © 2025 오늘의 대회 (TodayContest) — (주)수상한콘텐츠. All rights reserved.
              </p>
            </div>

            {/* Legal Links */}
            <nav className="flex items-center gap-4 text-xs text-gray-500" aria-label="법적 정보">
              <button className="hover:text-gray-300 transition-colors">이용약관</button>
              <span className="text-gray-700">|</span>
              <button className="hover:text-gray-300 transition-colors font-semibold text-gray-400">개인정보처리방침</button>
              <span className="text-gray-700">|</span>
              <button className="hover:text-gray-300 transition-colors">운영정책</button>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
