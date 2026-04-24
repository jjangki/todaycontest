'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'

/* ──────────────────────────────────────────────
   요금제
────────────────────────────────────────────── */
const PLANS = [
  {
    id: 'basic', name: 'Basic', monthlyPrice: 99000,
    desc: '소규모 주최사에 적합한 기본 플랜',
    features: ['채널 10개 동시 발행', '월 10건 대회 등록', 'AI 콘텐츠 자동 생성', '기본 성과 분석', '이메일 지원'],
    missing: ['예약 발행', 'A/B 테스트', 'API 연동', '전담 매니저'],
  },
  {
    id: 'standard', name: 'Standard', monthlyPrice: 299000,
    desc: '대부분의 주최사가 선택하는 인기 플랜',
    featured: true,
    features: ['채널 40개 동시 발행', '월 50건 대회 등록', 'AI 콘텐츠 자동 생성', '고급 성과 분석', '예약 발행', 'A/B 테스트', '카카오/전화 지원'],
    missing: ['API 연동', '전담 매니저'],
  },
  {
    id: 'premium', name: 'Premium', monthlyPrice: 799000,
    desc: '대기업·공공기관을 위한 올인원 플랜',
    features: ['채널 40개+ 동시 발행', '무제한 대회 등록', 'AI 콘텐츠+수동 편집', '실시간 성과 분석', '예약 발행', 'A/B 테스트', 'API 연동', '전담 매니저', '맞춤 계약'],
    missing: [],
  },
]

/* ──────────────────────────────────────────────
   견적서 서비스 항목 (견적서 만들기.txt 기반)
────────────────────────────────────────────── */
type QuoteItem = {
  id: string; category: string; title: string; desc: string;
  unit: string; price: number; defaultQty?: number;
}

const QUOTE_ITEMS: QuoteItem[] = [
  // 온라인 홍보
  { id:'q01', category:'온라인 홍보', title:'SNS 자동 홍보 (40채널)', desc:'인스타, 페이스북, 유튜브 등 40개 채널 동시 발행', unit:'건', price:200000 },
  { id:'q02', category:'온라인 홍보', title:'디자인 배너 변형', desc:'채널별 최적화 배너 이미지 제작', unit:'건', price:300000 },
  { id:'q03', category:'온라인 홍보', title:'카드뉴스 홍보물 제작', desc:'SNS용 카드뉴스 디자인 제작', unit:'건', price:500000 },
  { id:'q04', category:'온라인 홍보', title:'공모전 홍보 영상 제작', desc:'30~60초 홍보 영상 기획·편집', unit:'건', price:500000 },
  { id:'q05', category:'온라인 홍보', title:'홍보 배너 광고', desc:'SNS 유료 배너 광고 집행', unit:'월', price:1500000 },
  { id:'q06', category:'온라인 홍보', title:'공모전 업체 포스팅', desc:'주요 공모전 정보 사이트 등록', unit:'건', price:200000 },
  { id:'q07', category:'온라인 홍보', title:'커뮤니티 바이럴 홍보', desc:'에브리타임, 에타 등 커뮤니티 홍보', unit:'월', price:1000000 },
  { id:'q08', category:'온라인 홍보', title:'SNS 타겟 스폰서드 광고', desc:'인스타그램·페이스북 타겟팅 광고', unit:'월', price:500000 },
  { id:'q09', category:'온라인 홍보', title:'자사블로그 홍보', desc:'네이버 블로그 전용 홍보 콘텐츠', unit:'건', price:500000 },
  // 오프라인 홍보
  { id:'q10', category:'오프라인 홍보', title:'서울지역 대학 포스터 부착', desc:'서울 소재 대학 캠퍼스 포스터 부착', unit:'개소', price:25000 },
  { id:'q11', category:'오프라인 홍보', title:'경기지역 대학 포스터 부착', desc:'경기권 대학 캠퍼스 포스터 부착', unit:'개소', price:35000 },
  { id:'q12', category:'오프라인 홍보', title:'지방지역 대학 포스터 부착', desc:'지방 대학 캠퍼스 포스터 부착', unit:'개소', price:55000 },
  { id:'q13', category:'오프라인 홍보', title:'현수막 부착', desc:'주요 상권·교내 현수막 설치', unit:'개소', price:50000 },
  { id:'q14', category:'오프라인 홍보', title:'지하철 포스터 부착', desc:'지하철역 광고판 포스터 부착', unit:'개소', price:15000 },
  { id:'q15', category:'오프라인 홍보', title:'우편 발송', desc:'엽서·전단 우편 발송', unit:'부', price:3000 },
  { id:'q16', category:'오프라인 홍보', title:'택배 발송', desc:'홍보물 택배 발송 대행', unit:'건', price:6000 },
  // 인쇄 제작
  { id:'q17', category:'인쇄 제작', title:'포스터 인쇄', desc:'A3/B2 포스터 대량 인쇄', unit:'식', price:500000 },
  { id:'q18', category:'인쇄 제작', title:'대봉투 제작', desc:'A4 대봉투 인쇄·제작', unit:'식', price:200000 },
  { id:'q19', category:'인쇄 제작', title:'현수막 인쇄', desc:'가로·세로 현수막 인쇄', unit:'식', price:50000 },
  { id:'q20', category:'인쇄 제작', title:'X배너 인쇄', desc:'X형 배너 인쇄·제작', unit:'식', price:50000 },
  { id:'q21', category:'인쇄 제작', title:'작품집 인쇄', desc:'수상작품집 편집·인쇄', unit:'식', price:600000 },
  // 프로모션·이벤트
  { id:'q22', category:'프로모션·이벤트', title:'대국민 투표 셋팅', desc:'온라인 국민 투표 페이지 구축', unit:'식', price:300000 },
  { id:'q23', category:'프로모션·이벤트', title:'경품 발송 대행', desc:'수상자 경품 포장·발송 대행', unit:'건', price:5000 },
  // 심사 진행
  { id:'q24', category:'심사 진행', title:'작품 취합 및 필터링', desc:'제출 작품 수집·중복·부적격 검토', unit:'식', price:100000 },
  { id:'q25', category:'심사 진행', title:'심사용 작품 출력', desc:'심사위원 배포용 작품 출력', unit:'건', price:3000 },
  { id:'q26', category:'심사 진행', title:'오프라인 심사 진행', desc:'심사장 세팅·진행 지원', unit:'식', price:150000 },
  { id:'q27', category:'심사 진행', title:'온라인 심사 진행', desc:'화상 심사 플랫폼 운영', unit:'식', price:300000 },
  // 심사위원
  { id:'q28', category:'심사위원', title:'심사위원 섭외 (일반)', desc:'분야 전문가 심사위원 섭외', unit:'명', price:300000 },
  { id:'q29', category:'심사위원', title:'심사위원 섭외 (교수)', desc:'대학교수급 심사위원 섭외', unit:'명', price:500000 },
  { id:'q30', category:'심사위원', title:'전문 심사위원단 섭외', desc:'10인 이상 전문 심사단 구성', unit:'식', price:3000000 },
  // 홈페이지 구축
  { id:'q31', category:'홈페이지 구축', title:'공모전 홈페이지', desc:'공모전 전용 소개 페이지 제작', unit:'식', price:500000 },
  { id:'q32', category:'홈페이지 구축', title:'공모전 홈페이지 구축', desc:'접수·발표 포함 완성형 사이트', unit:'식', price:3000000 },
  { id:'q33', category:'홈페이지 구축', title:'포스터 디자인 제작', desc:'공모전 대표 포스터 시각 디자인', unit:'식', price:800000 },
]

const CATEGORIES = [...new Set(QUOTE_ITEMS.map(q => q.category))]

type SelectedItem = { qty: number }

export default function PricingClient() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly')
  const [selected, setSelected] = useState<Record<string, SelectedItem>>({})
  const [openCat, setOpenCat] = useState<string>(CATEGORIES[0])
  const [showModal, setShowModal] = useState(false)
  const [quoteForm, setQuoteForm] = useState({ company:'', name:'', email:'', phone:'', memo:'' })

  const toggleItem = (id: string) => {
    setSelected(prev => {
      if (prev[id]) { const n = {...prev}; delete n[id]; return n }
      return { ...prev, [id]: { qty: 1 } }
    })
  }
  const setQty = (id: string, qty: number) => {
    if (qty < 1) return
    setSelected(prev => ({ ...prev, [id]: { qty } }))
  }

  const subtotal = useMemo(() =>
    Object.entries(selected).reduce((acc, [id, {qty}]) => {
      const item = QUOTE_ITEMS.find(q => q.id === id)
      return acc + (item ? item.price * qty : 0)
    }, 0)
  , [selected])

  const vat = Math.floor(subtotal * 0.1)
  const total = subtotal + vat

  const discount = billingPeriod === 'yearly' ? Math.floor(subtotal * 0.15) : 0
  const finalTotal = total - discount

  const fmt = (n: number) => n.toLocaleString()

  return (
    <main style={{ marginTop: 56, background: 'var(--bg)', minHeight: 'calc(100vh - 56px)' }}>
      {/* 페이지 헤더 */}
      <div className="page-hero-bar">
        <div className="container">
          <div className="page-hero-content">
            <h1 className="page-hero-title">견적·요금제</h1>
            <p className="page-hero-desc">필요한 서비스를 직접 선택하고 견적을 받아보세요</p>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '32px 20px' }}>

        {/* ─── 요금제 ─── */}
        <div className="section-header" style={{ marginBottom: 24 }}>
          <span className="section-label">💼 요금제</span>
          <h2 className="section-title">정기 구독 플랜</h2>
        </div>

        <div className="billing-toggle">
          <button className={`bill-btn${billingPeriod==='monthly'?' active':''}`} onClick={() => setBillingPeriod('monthly')}>월간 결제</button>
          <button className={`bill-btn${billingPeriod==='yearly'?' active':''}`} onClick={() => setBillingPeriod('yearly')}>연간 결제 <span className="bill-save-badge">15% 절약</span></button>
        </div>

        <div className="pricing-grid">
          {PLANS.map(p => {
            const price = billingPeriod === 'yearly'
              ? Math.floor(p.monthlyPrice * 12 * 0.85 / 12)
              : p.monthlyPrice
            return (
              <div key={p.id} className={`pricing-card${p.featured ? ' featured' : ''}`}>
                {p.featured && <div className="pricing-featured-badge">🔥 인기</div>}
                <div className="pricing-plan-name">{p.name}</div>
                <div className="pricing-plan-desc">{p.desc}</div>
                <div className="pricing-plan-price">
                  <span className="price-won">₩</span>
                  <span className="price-num">{fmt(price)}</span>
                  <span className="price-period">/월</span>
                </div>
                {billingPeriod === 'yearly' && (
                  <div className="price-yearly-note">연간 ₩{fmt(price * 12)} 청구</div>
                )}
                <Link href="/dashboard" className={`btn-sm ${p.featured ? 'btn-primary' : 'btn-secondary'} pricing-cta-btn`}>
                  시작하기
                </Link>
                <ul className="pricing-feature-list">
                  {p.features.map((f, i) => <li key={i} className="pf-ok">✓ {f}</li>)}
                  {p.missing.map((f, i) => <li key={i} className="pf-no">✕ {f}</li>)}
                </ul>
              </div>
            )
          })}
        </div>

        {/* ─── 견적서 생성기 ─── */}
        <div className="section-header" style={{ marginTop: 56, marginBottom: 24 }}>
          <span className="section-label">📋 견적서</span>
          <h2 className="section-title">서비스 항목 선택</h2>
          <p className="section-desc">필요한 서비스를 선택하면 자동으로 견적이 계산됩니다</p>
        </div>

        <div className="quote-layout">
          {/* 좌측: 서비스 선택 */}
          <div className="quote-items-panel">
            {CATEGORIES.map(cat => (
              <div key={cat} className="quote-cat-section">
                <button
                  className="quote-cat-header"
                  onClick={() => setOpenCat(openCat === cat ? '' : cat)}>
                  <span className="quote-cat-name">{cat}</span>
                  <span className="quote-cat-arrow">{openCat === cat ? '▲' : '▼'}</span>
                </button>
                {openCat === cat && (
                  <div className="quote-cat-body">
                    {QUOTE_ITEMS.filter(q => q.category === cat).map(item => {
                      const isSelected = !!selected[item.id]
                      return (
                        <div key={item.id} className={`quote-item-row${isSelected ? ' selected' : ''}`}>
                          <div className="qi-check" onClick={() => toggleItem(item.id)}>
                            <div className={`qi-checkbox${isSelected ? ' checked' : ''}`}>
                              {isSelected && '✓'}
                            </div>
                          </div>
                          <div className="qi-info" onClick={() => toggleItem(item.id)}>
                            <div className="qi-title">{item.title}</div>
                            <div className="qi-desc">{item.desc}</div>
                            <div className="qi-unit-price">₩{fmt(item.price)} / {item.unit}</div>
                          </div>
                          {isSelected && (
                            <div className="qi-qty">
                              <button className="qty-btn" onClick={() => setQty(item.id, (selected[item.id]?.qty || 1) - 1)}>−</button>
                              <input
                                type="number" min={1}
                                value={selected[item.id]?.qty || 1}
                                onChange={e => setQty(item.id, Number(e.target.value))}
                                className="qty-input"
                              />
                              <button className="qty-btn" onClick={() => setQty(item.id, (selected[item.id]?.qty || 1) + 1)}>+</button>
                              <div className="qi-subtotal">₩{fmt(item.price * (selected[item.id]?.qty || 1))}</div>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* 우측: 견적 영수증 */}
          <div className="quote-receipt-panel">
            <div className="quote-receipt">
              <div className="qr-title">📄 견적서</div>
              {Object.keys(selected).length === 0 ? (
                <div className="qr-empty">
                  <div style={{fontSize:40,marginBottom:12}}>📋</div>
                  <div>서비스를 선택하면<br />견적이 자동 계산됩니다</div>
                </div>
              ) : (
                <>
                  <div className="qr-items">
                    {Object.entries(selected).map(([id, {qty}]) => {
                      const item = QUOTE_ITEMS.find(q => q.id === id)!
                      return (
                        <div key={id} className="qr-item">
                          <div className="qr-item-name">{item.title}</div>
                          <div className="qr-item-calc">
                            {qty > 1 && <span>{qty} {item.unit} ×</span>} ₩{fmt(item.price)}
                          </div>
                          <div className="qr-item-total">₩{fmt(item.price * qty)}</div>
                          <button className="qr-item-del" onClick={() => toggleItem(id)}>✕</button>
                        </div>
                      )
                    })}
                  </div>
                  <div className="qr-divider" />
                  <div className="qr-row">
                    <span>공급가액</span><span>₩{fmt(subtotal)}</span>
                  </div>
                  <div className="qr-row">
                    <span>부가세 (10%)</span><span>₩{fmt(vat)}</span>
                  </div>
                  {billingPeriod === 'yearly' && (
                    <div className="qr-row" style={{color:'var(--green)'}}>
                      <span>연간 할인 (15%)</span><span>-₩{fmt(discount)}</span>
                    </div>
                  )}
                  <div className="qr-divider" />
                  <div className="qr-total-row">
                    <span>합계</span>
                    <span className="qr-total-num">₩{fmt(finalTotal)}</span>
                  </div>
                  <div className="qr-note">※ 부가세 포함 금액입니다</div>
                </>
              )}
              <button
                className="btn-sm btn-primary qr-request-btn"
                disabled={Object.keys(selected).length === 0}
                onClick={() => setShowModal(true)}>
                견적 요청하기
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ─── 견적 요청 모달 ─── */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">견적 요청하기</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="modal-summary">
                <div className="ms-label">선택 서비스</div>
                <div className="ms-count">{Object.keys(selected).length}개 항목</div>
                <div className="ms-label">총 견적 금액</div>
                <div className="ms-total">₩{fmt(finalTotal)}</div>
              </div>
              <div className="form-group">
                <label className="form-label">회사명 / 기관명</label>
                <input className="form-input" placeholder="(주)오늘의대회" value={quoteForm.company}
                  onChange={e => setQuoteForm(f => ({...f, company:e.target.value}))} />
              </div>
              <div className="form-row">
                <div className="form-group" style={{flex:1}}>
                  <label className="form-label">담당자명</label>
                  <input className="form-input" placeholder="홍길동" value={quoteForm.name}
                    onChange={e => setQuoteForm(f => ({...f, name:e.target.value}))} />
                </div>
                <div className="form-group" style={{flex:1}}>
                  <label className="form-label">연락처</label>
                  <input className="form-input" placeholder="010-0000-0000" value={quoteForm.phone}
                    onChange={e => setQuoteForm(f => ({...f, phone:e.target.value}))} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">이메일</label>
                <input className="form-input" placeholder="email@company.com" value={quoteForm.email}
                  onChange={e => setQuoteForm(f => ({...f, email:e.target.value}))} />
              </div>
              <div className="form-group">
                <label className="form-label">요청 사항 (선택)</label>
                <textarea className="form-textarea" rows={3} placeholder="추가 요청이나 참고사항을 입력해주세요." value={quoteForm.memo}
                  onChange={e => setQuoteForm(f => ({...f, memo:e.target.value}))} />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-sm btn-secondary" onClick={() => setShowModal(false)}>취소</button>
              <button className="btn-sm btn-primary" onClick={() => {
                alert('견적 요청이 접수되었습니다. 담당자가 1~2영업일 내 연락드립니다.')
                setShowModal(false)
              }}>요청 완료</button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
