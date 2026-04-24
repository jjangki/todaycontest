import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div>
            <div className="footer-logo">
              <div style={{
                width:36,height:36,
                background:'var(--blue)',
                borderRadius:10,
                display:'flex',alignItems:'center',justifyContent:'center',
                color:'white',fontWeight:900,fontSize:18
              }}>T</div>
              오늘의 대회
            </div>
            <p className="footer-desc">
              대한민국 1위 AI 공모전·대회 자동 홍보 플랫폼.<br />
              단 한 번의 등록으로 40개 채널 동시 홍보,<br />
              AI가 채널별 최적 콘텐츠를 자동 생성합니다.
            </p>
            <div className="footer-contact">
              <div><strong>고객센터</strong> 02-6953-1996</div>
              <div><strong>이메일</strong> abc@babkorea.com</div>
              <div><strong>주소</strong> 서울 성북구 화랑로 265, 3층</div>
              <div><strong>운영시간</strong> 평일 09:00 ~ 18:00</div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="footer-col-title">서비스</h3>
            <ul className="footer-links">
              <li><Link href="/contests">공모전·대회 목록</Link></li>
              <li><Link href="/service">서비스 소개</Link></li>
              <li><Link href="/pricing">요금제</Link></li>
              <li><Link href="/dashboard">주최사 센터</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="footer-col-title">고객지원</h3>
            <ul className="footer-links">
              <li><a href="#">공지사항</a></li>
              <li><a href="#">자주 묻는 질문</a></li>
              <li><a href="#">1:1 문의</a></li>
              <li><a href="#">사용 가이드</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="footer-col-title">약관 & 정책</h3>
            <ul className="footer-links">
              <li><a href="#">이용약관</a></li>
              <li><a href="#">개인정보처리방침</a></li>
              <li><a href="#">마케팅 활용 동의</a></li>
            </ul>
            <div style={{marginTop:20}}>
              <h3 className="footer-col-title" style={{marginBottom:12}}>SNS</h3>
              <div style={{display:'flex',gap:8}}>
                {['📸','▶️','📝','🐦','🎵'].map((icon,i) => (
                  <a key={i} href="#" style={{
                    width:36,height:36,
                    background:'rgba(255,255,255,0.08)',
                    borderRadius:8,
                    display:'flex',alignItems:'center',justifyContent:'center',
                    fontSize:16,
                    transition:'background 0.2s'
                  }}>{icon}</a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            <p className="footer-copy">© 2024 오늘의 대회 (TodayContest). All rights reserved.</p>
            <p className="footer-bizinfo">
              법인명: (주)수상한콘텐츠 &nbsp;|&nbsp; 대표이사: 신현화, 박현학 &nbsp;|&nbsp; 사업자등록번호: 684-88-02992
            </p>
          </div>
          <div style={{display:'flex',gap:16}}>
            <a href="#" style={{fontSize:13,color:'var(--gray-600)'}}>이용약관</a>
            <a href="#" style={{fontSize:13,color:'var(--gray-400)'}}>개인정보처리방침</a>
          </div>
        </div>
      </div>

      {/* JSON-LD Organization Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Organization",
            "@id": "https://todaycontest.kr/#organization",
            name: "오늘의 대회",
            alternateName: "TodayContest",
            legalName: "(주)수상한콘텐츠",
            url: "https://todaycontest.kr",
            logo: "https://todaycontest.kr/logo.png",
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "02-6953-1996",
              email: "abc@babkorea.com",
              contactType: "customer service",
              availableLanguage: "Korean"
            },
            address: {
              "@type": "PostalAddress",
              streetAddress: "화랑로 265, 3층",
              addressLocality: "성북구",
              addressRegion: "서울특별시",
              addressCountry: "KR"
            }
          },
          {
            "@type": "WebSite",
            "@id": "https://todaycontest.kr/#website",
            url: "https://todaycontest.kr",
            name: "오늘의 대회",
            publisher: { "@id": "https://todaycontest.kr/#organization" },
            potentialAction: {
              "@type": "SearchAction",
              target: "https://todaycontest.kr/contests?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          }
        ]
      })}} />
    </footer>
  )
}
