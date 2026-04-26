'use client'
import { useState, useMemo } from 'react'
import {
  FaInstagram, FaFacebook, FaYoutube, FaTiktok, FaLinkedin,
  FaDiscord, FaTelegram, FaCheck, FaMinus, FaPlus
} from 'react-icons/fa6'
import { SiNaver, SiKakaotalk } from 'react-icons/si'

/* ── 3 SaaS 플랜 ── */
const PLANS = [
  {
    id: 'starter',
    name: '스타터',
    badge: '',
    price: 29000,
    unit: '월',
    desc: '소규모 주최사 & 첫 홍보',
    color: '#6B7280',
    accentBg: '#F9FAFB',
    features: [
      { text:'20개 채널 동시 발행', ok:true },
      { text:'월 3건 게시글 등록', ok:true },
      { text:'AI 콘텐츠 생성 (기본)', ok:true },
      { text:'공모전 사이트 5개', ok:true },
      { text:'성과 분석 (기본)', ok:true },
      { text:'커뮤니티 채널', ok:false },
      { text:'SNS 광고 자동 연동', ok:false },
      { text:'전담 CS 매니저', ok:false },
    ],
    cta: '무료로 시작하기',
  },
  {
    id: 'standard',
    name: '스탠다드',
    badge: '인기',
    price: 79000,
    unit: '월',
    desc: '중규모 대회·채용 홍보',
    color: '#0052FF',
    accentBg: '#EBF1FF',
    features: [
      { text:'50개 채널 동시 발행', ok:true },
      { text:'월 10건 게시글 등록', ok:true },
      { text:'AI 콘텐츠 생성 (고급)', ok:true },
      { text:'공모전 사이트 23개 전체', ok:true },
      { text:'성과 분석 (상세)', ok:true },
      { text:'커뮤니티 채널 20개', ok:true },
      { text:'SNS 광고 자동 연동', ok:false },
      { text:'전담 CS 매니저', ok:false },
    ],
    cta: '스탠다드 시작하기',
  },
  {
    id: 'premium',
    name: '프리미엄',
    badge: '추천',
    price: 199000,
    unit: '월',
    desc: '대형 기관·공공기관·브랜드',
    color: '#7C3AED',
    accentBg: '#F5F3FF',
    features: [
      { text:'70개+ 채널 동시 발행', ok:true },
      { text:'무제한 게시글 등록', ok:true },
      { text:'AI 콘텐츠 생성 (프리미엄)', ok:true },
      { text:'공모전 사이트 23개 전체', ok:true },
      { text:'성과 분석 (실시간 리포트)', ok:true },
      { text:'커뮤니티 채널 20개', ok:true },
      { text:'SNS 광고 자동 연동', ok:true },
      { text:'전담 CS 매니저', ok:true },
    ],
    cta: '프리미엄 시작하기',
  },
]

/* ── 견적 아이콘 카드 항목 ── */
const ESTIMATE_ITEMS = [
  /* 디자인/콘텐츠 */
  { id:'d1', group:'디자인/콘텐츠', icon:'🎨', name:'포스터 디자인',        price:200000, unit:'건' },
  { id:'d2', group:'디자인/콘텐츠', icon:'📸', name:'카드뉴스 제작 (5장)',   price:150000, unit:'건' },
  { id:'d3', group:'디자인/콘텐츠', icon:'🎬', name:'홍보 영상 (30초)',      price:1500000,unit:'건' },
  { id:'d4', group:'디자인/콘텐츠', icon:'🖨️', name:'현수막 제작 (대)',      price:35000,  unit:'매' },
  { id:'d5', group:'디자인/콘텐츠', icon:'📋', name:'리플렛 디자인',         price:300000, unit:'건' },
  /* 온라인 홍보 */
  { id:'o1', group:'온라인 홍보',   icon:'📱', name:'SNS 채널 패키지 (20채널)',price:150000,unit:'건' },
  { id:'o2', group:'온라인 홍보',   icon:'📝', name:'블로그 포스팅 패키지',  price:80000,  unit:'건' },
  { id:'o3', group:'온라인 홍보',   icon:'🏆', name:'공모전 사이트 일괄 등록 (23곳)',price:150000,unit:'건' },
  { id:'o4', group:'온라인 홍보',   icon:'💬', name:'커뮤니티 자동 게시',    price:100000, unit:'건' },
  { id:'o5', group:'온라인 홍보',   icon:'🤖', name:'AI 콘텐츠 자동생성',    price:30000,  unit:'건' },
  /* 바이럴/커뮤니티 */
  { id:'v1', group:'바이럴/커뮤니티',icon:'⭐', name:'인플루언서 (마이크로)', price:300000, unit:'명' },
  { id:'v2', group:'바이럴/커뮤니티',icon:'🌟', name:'인플루언서 (매크로)',   price:1000000,unit:'명' },
  { id:'v3', group:'바이럴/커뮤니티',icon:'🔥', name:'커뮤니티 바이럴 게시', price:50000,  unit:'건' },
  { id:'v4', group:'바이럴/커뮤니티',icon:'📣', name:'보도자료 배포',         price:500000, unit:'건' },
]

const GROUP_COLORS: Record<string, string> = {
  '디자인/콘텐츠':  '#6C63FF',
  '온라인 홍보':    '#0052FF',
  '바이럴/커뮤니티':'#E91E63',
}

/* ── SNS 광고 단가 ── */
const AD_PLANS = [
  { name:'Instagram 광고', emoji:<FaInstagram/>, color:'#E1306C', min:30, reach:'일 2~5만명', formats:['피드','스토리','릴스'] },
  { name:'Facebook 광고',  emoji:<FaFacebook/>,  color:'#1877F2', min:30, reach:'일 3~6만명', formats:['피드','사이드바','그룹'] },
  { name:'YouTube 광고',   emoji:<FaYoutube/>,   color:'#FF0000', min:50, reach:'일 1~3만명', formats:['건너뛸 수 있는','범퍼','디스커버리'] },
  { name:'TikTok 광고',    emoji:<FaTiktok/>,    color:'#010101', min:30, reach:'일 3~8만명', formats:['인피드','탑뷰','해시태그'] },
  { name:'Naver 검색광고', emoji:<SiNaver/>,     color:'#03C75A', min:10, reach:'CPC 과금',   formats:['키워드','쇼핑','플레이스'] },
  { name:'카카오 광고',    emoji:<SiKakaotalk/>, color:'#FEE500', min:20, reach:'일 2~4만명', formats:['비즈보드','스토리','모먼트'] },
]

interface CartItem { id:string; name:string; price:number; unit:string; qty:number }

export default function PricingClient() {
  const [mode, setMode] = useState<'plans'|'estimate'|'ad'>('plans')
  const [selectedPlan, setSelectedPlan] = useState<string|null>(null)
  const [cart, setCart] = useState<Record<string, CartItem>>({})
  const [quoteModal, setQuoteModal] = useState(false)
  const [quoteForm, setQuoteForm] = useState({ company:'', name:'', phone:'', email:'', memo:'' })

  /* Cart helpers */
  const toggleItem = (item: typeof ESTIMATE_ITEMS[0]) => {
    setCart(c => {
      if (c[item.id]) { const n={...c}; delete n[item.id]; return n }
      return { ...c, [item.id]: { id:item.id, name:item.name, price:item.price, unit:item.unit, qty:1 } }
    })
  }
  const updateQty = (id:string, qty:number) => {
    if (qty <= 0) { setCart(c=>{ const n={...c}; delete n[id]; return n }); return }
    setCart(c => ({ ...c, [id]: { ...c[id], qty } }))
  }

  const { subtotal, vat, total } = useMemo(() => {
    const sub = Object.values(cart).reduce((s,i) => s + i.price*i.qty, 0)
    return { subtotal:sub, vat:Math.floor(sub*0.1), total:Math.floor(sub*1.1) }
  }, [cart])

  const fmtKRW = (n:number) => n.toLocaleString()+'원'
  const cartCount = Object.keys(cart).length

  const groups = [...new Set(ESTIMATE_ITEMS.map(i=>i.group))]

  return (
    <main style={{ marginTop:64, background:'var(--bg)', minHeight:'100vh' }}>

      {/* 페이지 헤더 */}
      <div className="page-hero-bar">
        <div className="container">
          <div className="page-hero-content">
            <h1 className="page-hero-title">요금제 & 견적</h1>
            <p className="page-hero-desc">소규모부터 대기업까지 맞는 플랜을 선택하세요</p>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding:'32px 20px 100px' }}>

        {/* 모드 탭 */}
        <div className="pricing-mode-tabs">
          <button className={`pricing-mode-tab${mode==='plans'?' active':''}`} onClick={()=>setMode('plans')}>
            💎 요금제 플랜
          </button>
          <button className={`pricing-mode-tab${mode==='estimate'?' active':''}`} onClick={()=>setMode('estimate')}>
            📋 맞춤 견적서
          </button>
          <button className={`pricing-mode-tab${mode==='ad'?' active':''}`} onClick={()=>setMode('ad')}>
            💰 SNS 광고 단가
          </button>
        </div>

        {/* ══ 요금제 플랜 ══ */}
        {mode === 'plans' && (
          <div>
            <div className="text-center mb-10">
              <h2 className="text-2xl font-extrabold text-gray-900 mb-2">합리적인 가격으로 시작하세요</h2>
              <p className="text-gray-500 text-sm">모든 플랜은 14일 무료 체험 가능합니다 · 언제든 해지 가능</p>
            </div>

            <div className="pricing-plans-grid">
              {PLANS.map((plan) => (
                <div key={plan.id}
                  className={`pricing-plan-card${plan.badge==='인기'?' featured':''}`}
                  style={{
                    '--plan-color': plan.color,
                    '--plan-bg': plan.accentBg,
                    borderColor: selectedPlan===plan.id ? plan.color : undefined,
                  } as React.CSSProperties}>

                  {plan.badge && (
                    <div className="plan-badge" style={{ background:plan.color }}>
                      {plan.badge}
                    </div>
                  )}

                  <div className="plan-header" style={{ background:plan.accentBg }}>
                    <div className="plan-name" style={{ color:plan.color }}>{plan.name}</div>
                    <div className="plan-price-row">
                      <span className="plan-price" style={{ color:plan.color }}>
                        {fmtKRW(plan.price)}
                      </span>
                      <span className="plan-price-unit">/{plan.unit}</span>
                    </div>
                    <p className="plan-desc">{plan.desc}</p>
                  </div>

                  <div className="plan-features">
                    {plan.features.map((f,i) => (
                      <div key={i} className={`plan-feature-row${f.ok?'':' disabled'}`}>
                        <span className="plan-feature-icon" style={{ color:f.ok?plan.color:'#D1D5DB' }}>
                          {f.ok ? <FaCheck/> : <FaMinus/>}
                        </span>
                        <span className="plan-feature-text">{f.text}</span>
                      </div>
                    ))}
                  </div>

                  <div className="plan-footer">
                    <button
                      onClick={() => { setSelectedPlan(plan.id); setQuoteModal(true) }}
                      className="plan-cta-btn"
                      style={{
                        background: plan.badge==='인기'||plan.badge==='추천' ? plan.color : undefined,
                        borderColor: plan.color,
                        color: plan.badge==='인기'||plan.badge==='추천' ? '#fff' : plan.color,
                      }}>
                      {plan.cta}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pricing-compare-note">
              <span>💡 더 많은 채널이 필요하시다면?</span>
              <button onClick={()=>setMode('estimate')} className="underline text-blue-600 font-bold ml-1">맞춤 견적 문의하기 →</button>
            </div>
          </div>
        )}

        {/* ══ 맞춤 견적서 ══ */}
        {mode === 'estimate' && (
          <div className="estimate-layout">

            {/* 좌: 선택 패널 */}
            <div className="estimate-left">
              <div className="mb-6">
                <h2 className="text-xl font-extrabold text-gray-900 mb-1">서비스 선택</h2>
                <p className="text-sm text-gray-500">원하는 항목을 클릭하면 우측 견적서에 추가됩니다</p>
              </div>

              {groups.map(group => (
                <div key={group} className="estimate-group">
                  <h3 className="estimate-group-title" style={{ color:GROUP_COLORS[group] }}>
                    {group}
                  </h3>
                  <div className="estimate-icon-grid">
                    {ESTIMATE_ITEMS.filter(i=>i.group===group).map(item => {
                      const inCart = !!cart[item.id]
                      return (
                        <button key={item.id}
                          onClick={()=>toggleItem(item)}
                          className={`est-icon-card${inCart?' selected':''}`}
                          style={{
                            '--card-color': GROUP_COLORS[group],
                            borderColor: inCart ? GROUP_COLORS[group] : undefined,
                            background: inCart ? GROUP_COLORS[group]+'12' : undefined,
                          } as React.CSSProperties}>
                          <div className="est-icon-card-icon" style={{ background:GROUP_COLORS[group]+'18', color:GROUP_COLORS[group] }}>{item.icon}</div>
                          <div className="est-icon-card-name">{item.name}</div>
                          <div className="est-icon-card-price">{fmtKRW(item.price)}<span className="text-gray-400">/{item.unit}</span></div>
                          {inCart && <div className="est-icon-card-check" style={{ background:GROUP_COLORS[group] }}><FaCheck/></div>}
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* 우: 견적 영수증 (sticky) */}
            <div className="estimate-receipt-wrap">
              <div className="estimate-receipt">
                <div className="receipt-header">
                  <h3 className="receipt-title">📋 선택 견적서</h3>
                  {cartCount > 0 && (
                    <span className="receipt-count">{cartCount}개 선택</span>
                  )}
                </div>

                {cartCount === 0 ? (
                  <div className="receipt-empty">
                    <div className="text-3xl mb-2">🛒</div>
                    <div className="text-sm text-gray-400">왼쪽에서 서비스를 선택하세요</div>
                  </div>
                ) : (
                  <div className="receipt-items">
                    {Object.values(cart).map(item => (
                      <div key={item.id} className="receipt-item">
                        <div className="receipt-item-name">{item.name}</div>
                        <div className="receipt-item-row">
                          <div className="receipt-qty-ctrl">
                            <button onClick={()=>updateQty(item.id, item.qty-1)} className="qty-btn-sm">−</button>
                            <span className="qty-val">{item.qty}</span>
                            <button onClick={()=>updateQty(item.id, item.qty+1)} className="qty-btn-sm">+</button>
                          </div>
                          <div className="receipt-item-price">{fmtKRW(item.price*item.qty)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="receipt-total-section">
                  <div className="receipt-total-row">
                    <span>공급가액</span><span>{fmtKRW(subtotal)}</span>
                  </div>
                  <div className="receipt-total-row">
                    <span>부가세 (10%)</span><span>{fmtKRW(vat)}</span>
                  </div>
                  <div className="receipt-total-row grand">
                    <span>합계금액</span>
                    <span className="receipt-grand">{fmtKRW(total)}</span>
                  </div>
                </div>

                <button
                  onClick={()=>setQuoteModal(true)}
                  disabled={cartCount===0}
                  className="receipt-cta-btn">
                  📩 담당자 견적 요청
                </button>
                <p className="text-center text-xs text-gray-400 mt-2">
                  ※ 실제 견적은 상담 후 조정될 수 있습니다
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ══ SNS 광고 단가 ══ */}
        {mode === 'ad' && (
          <div>
            <div className="ad-notice-box">
              <span className="ad-notice-icon">ℹ️</span>
              <div>
                <strong>SNS 광고 안내</strong>
                <p>표시된 금액은 최소 일일 집행 예산입니다. 월 구독 없이 필요한 기간만 선택하여 집행할 수 있습니다.</p>
              </div>
            </div>

            <div className="ad-plans-grid">
              {AD_PLANS.map((plan,i) => (
                <div key={i} className="ad-plan-card">
                  <div className="apc-header" style={{ background:plan.color+'18' }}>
                    <div className="apc-icon text-2xl" style={{ background:plan.color, color:'#fff' }}>{plan.emoji}</div>
                    <div className="apc-name">{plan.name}</div>
                  </div>
                  <div className="apc-body">
                    <div className="apc-min-budget">
                      <span className="apc-min-label">최소 일 집행 예산</span>
                      <span className="apc-min-val" style={{ color:plan.color }}>{plan.min}만원<span className="apc-unit">/일</span></span>
                    </div>
                    <div className="apc-reach">📊 {plan.reach}</div>
                    <div className="apc-formats">
                      {plan.formats.map((f,j)=><span key={j} className="apc-format-chip">{f}</span>)}
                    </div>
                  </div>
                  <div className="apc-footer">
                    <button className="btn-primary" style={{ width:'100%', justifyContent:'center' }}
                      onClick={()=>setQuoteModal(true)}>
                      광고 문의하기
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 연락처 */}
        <div className="contact-bar" style={{ marginTop:60 }}>
          <div className="contact-bar-inner">
            <span className="contact-label">📞 상담 문의</span>
            <a href="tel:02-6953-1996" className="contact-phone">02-6953-1996</a>
            <span className="contact-sep">|</span>
            <a href="mailto:abc@babkorea.com" className="contact-email">abc@babkorea.com</a>
          </div>
        </div>
      </div>

      {/* 견적/플랜 요청 모달 */}
      {quoteModal && (
        <div className="modal-overlay" onClick={()=>setQuoteModal(false)}>
          <div className="modal-box" onClick={e=>e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">📩 {selectedPlan ? `${PLANS.find(p=>p.id===selectedPlan)?.name} 플랜` : '맞춤 견적'} 요청</h2>
              <button className="modal-close" onClick={()=>{ setQuoteModal(false); setSelectedPlan(null) }}>✕</button>
            </div>
            <div className="modal-body">
              {[
                { l:'기관/회사명', p:'예: 중소벤처기업부', k:'company', type:'text' },
                { l:'담당자명',   p:'홍길동',              k:'name',    type:'text' },
                { l:'연락처',     p:'010-0000-0000',       k:'phone',   type:'tel' },
                { l:'이메일',     p:'contact@example.com', k:'email',   type:'email' },
              ].map((f)=>(
                <div key={f.k} className="form-group">
                  <label className="form-label">{f.l}</label>
                  <input className="form-input" type={f.type} placeholder={f.p}
                    value={(quoteForm as any)[f.k]}
                    onChange={e=>setQuoteForm(ff=>({...ff,[f.k]:e.target.value}))} />
                </div>
              ))}
              <div className="form-group">
                <label className="form-label">문의 내용</label>
                <textarea className="form-textarea" rows={4}
                  placeholder="원하시는 서비스나 예산 등을 자유롭게 적어주세요"
                  value={quoteForm.memo} onChange={e=>setQuoteForm(f=>({...f,memo:e.target.value}))} />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={()=>{ setQuoteModal(false); setSelectedPlan(null) }}>취소</button>
              <button className="btn-primary"
                onClick={()=>{ alert('견적 요청이 접수되었습니다. 1영업일 내 연락드리겠습니다!'); setQuoteModal(false); setSelectedPlan(null) }}>
                요청 보내기
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
