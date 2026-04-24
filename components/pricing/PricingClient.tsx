'use client'
import { useState } from 'react'
import Link from 'next/link'

const PLANS = [
  {
    name:'Basic', price:'99,000', period:'월',
    desc:'소규모 주최사에 적합한 기본 플랜',
    color:'var(--gray-900)',
    features:[
      '채널 10개 동시 발행',
      '월 10건 대회 등록',
      'AI 콘텐츠 자동 생성',
      '기본 성과 분석',
      '이메일 지원',
      '포스터 이미지 자동 변환',
    ],
    missing:['예약 발행','A/B 테스트','API 연동','전담 매니저']
  },
  {
    name:'Standard', price:'299,000', period:'월',
    desc:'대부분의 주최사가 선택하는 인기 플랜',
    color:'var(--blue)',
    featured:true,
    features:[
      '채널 40개 동시 발행',
      '월 50건 대회 등록',
      'AI 콘텐츠 자동 생성',
      '고급 성과 분석 대시보드',
      '예약 발행 기능',
      '이미지 자동 편집',
      'A/B 테스트 지원',
      '카카오톡/전화 지원',
    ],
    missing:['API 연동','전담 매니저']
  },
  {
    name:'Premium', price:'799,000', period:'월',
    desc:'대기업·공공기관을 위한 올인원 플랜',
    color:'var(--gray-900)',
    features:[
      '채널 40개+ 동시 발행',
      '무제한 대회 등록',
      'AI 콘텐츠 + 수동 편집',
      '실시간 성과 분석',
      '예약 발행',
      '이미지 자동 편집',
      'A/B 테스트',
      'API 연동 지원',
      '전담 매니저 배정',
      '맞춤형 리포트',
    ],
    missing:[]
  },
]

const SERVICE_OPTIONS = [
  {
    cat:'SNS 기본 채널',icon:'📱',items:[
      {name:'인스타그램',price:30000},
      {name:'페이스북',price:25000},
      {name:'유튜브',price:40000},
      {name:'틱톡',price:35000},
      {name:'X(트위터)',price:25000},
    ]
  },
  {
    cat:'국내 플랫폼',icon:'🇰🇷',items:[
      {name:'네이버 블로그',price:20000},
      {name:'네이버 카페',price:15000},
      {name:'카카오스토리',price:15000},
      {name:'밴드',price:15000},
      {name:'에브리타임',price:20000},
    ]
  },
  {
    cat:'콘텐츠 서비스',icon:'🎨',items:[
      {name:'브런치',price:20000},
      {name:'벨로그',price:15000},
      {name:'미디엄',price:20000},
      {name:'핀터레스트',price:20000},
      {name:'스레드',price:15000},
    ]
  },
  {
    cat:'추가 서비스',icon:'✨',items:[
      {name:'AI 이미지 생성',price:50000},
      {name:'예약 발행 설정',price:20000},
      {name:'A/B 테스트',price:40000},
      {name:'성과 리포트',price:30000},
      {name:'전담 매니저',price:100000},
    ]
  },
]

export default function PricingClient() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set())
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({name:'',company:'',phone:'',email:'',message:''})
  const [submitted, setSubmitted] = useState(false)

  const toggleItem = (name: string) => {
    setSelectedItems(prev => {
      const next = new Set(prev)
      if (next.has(name)) next.delete(name)
      else next.add(name)
      return next
    })
  }

  const getTotal = () => {
    let total = 0
    SERVICE_OPTIONS.forEach(cat => cat.items.forEach(item => {
      if (selectedItems.has(item.name)) total += item.price
    }))
    return total
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setShowModal(false)
      setSubmitted(false)
    }, 3000)
  }

  return (
    <main style={{marginTop:64}}>
      <div className="page-header">
        <div className="page-header-inner">
          <div className="page-header-breadcrumb">
            <Link href="/">홈</Link> <span>/</span> <span>요금제</span>
          </div>
          <h1 className="page-header-title">요금제 & 견적</h1>
          <p className="page-header-desc">우리 기관에 맞는 플랜을 선택하고, 원하는 서비스로 견적을 받아보세요</p>
        </div>
      </div>

      {/* Plans */}
      <section className="section" aria-labelledby="plans-title">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">💳 요금제</span>
            <h2 className="section-title" id="plans-title">합리적인 가격, 강력한 기능</h2>
            <p className="section-desc">연간 결제 시 20% 할인 적용</p>
          </div>
          <div className="pricing-grid" style={{maxWidth:960,margin:'0 auto'}}>
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`pricing-card${plan.featured?' featured':''}`}
                style={{cursor:'pointer',outline: selectedPlan===plan.name?`3px solid var(--blue)`:'none'}}
                onClick={() => setSelectedPlan(plan.name)}
              >
                {plan.featured && <div className="pricing-popular">⭐ 가장 인기</div>}
                <h3 className="pricing-name">{plan.name}</h3>
                <div className="pricing-price">
                  {plan.price}<sub>원/{plan.period}</sub>
                </div>
                <p className="pricing-desc">{plan.desc}</p>
                <ul className="pricing-features">
                  {plan.features.map((f,i) => (
                    <li key={i}><span className="check">✓</span> {f}</li>
                  ))}
                  {plan.missing?.map((f,i) => (
                    <li key={i} style={{opacity:0.35}}>
                      <span style={{color:'var(--gray-400)'}}>✕</span> {f}
                    </li>
                  ))}
                </ul>
                <button
                  className={plan.featured?'btn-primary':'btn-secondary'}
                  style={{width:'100%',justifyContent:'center',padding:'12px'}}
                  onClick={e => { e.stopPropagation(); setSelectedPlan(plan.name); setShowModal(true) }}
                >
                  {plan.name} 시작하기
                </button>
              </div>
            ))}
          </div>

          <div style={{
            textAlign:'center',marginTop:32,
            padding:'20px',
            background:'var(--blue-light)',
            borderRadius:'var(--radius-md)',
            maxWidth:960,margin:'32px auto 0',
            fontSize:14,color:'var(--blue)',fontWeight:600
          }}>
            💡 Enterprise 플랜(API 연동, 무제한 발행, 전담팀 운영)은 별도 문의해 주세요.
            <a href="tel:02-6953-1996" style={{marginLeft:8,fontWeight:700,textDecoration:'underline'}}>
              02-6953-1996
            </a>
          </div>
        </div>
      </section>

      {/* Custom Quote */}
      <section className="section section-alt" aria-labelledby="quote-title">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">🧮 맞춤 견적</span>
            <h2 className="section-title" id="quote-title">원하는 서비스만 선택하세요</h2>
            <p className="section-desc">필요한 채널과 서비스를 직접 선택하면 실시간으로 견적이 계산됩니다</p>
          </div>

          <div className="service-selector">
            <div>
              {SERVICE_OPTIONS.map((cat) => (
                <div key={cat.cat} className="service-category" style={{marginBottom:16}}>
                  <div className="service-cat-header">
                    <span>{cat.icon}</span> {cat.cat}
                  </div>
                  {cat.items.map(item => (
                    <div
                      key={item.name}
                      className={`service-item${selectedItems.has(item.name)?' selected':''}`}
                      onClick={() => toggleItem(item.name)}
                    >
                      <div style={{display:'flex',alignItems:'center',gap:10}}>
                        <div className="service-item-check">
                          {selectedItems.has(item.name) && '✓'}
                        </div>
                        <span className="service-item-name">{item.name}</span>
                      </div>
                      <span className="service-item-price">+{item.price.toLocaleString()}원</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Receipt */}
            <div>
              <div className="receipt">
                <div className="receipt-header">
                  🧾 견적서
                </div>
                <div className="receipt-body">
                  {selectedItems.size === 0 ? (
                    <p style={{
                      textAlign:'center',padding:'24px 0',
                      color:'var(--gray-400)',fontSize:14
                    }}>
                      서비스를 선택하면<br />견적이 표시됩니다
                    </p>
                  ) : (
                    <>
                      {SERVICE_OPTIONS.flatMap(cat => cat.items.filter(item => selectedItems.has(item.name))).map(item => (
                        <div key={item.name} className="receipt-item">
                          <span className="receipt-item-name">✓ {item.name}</span>
                          <span className="receipt-item-price">{item.price.toLocaleString()}원</span>
                        </div>
                      ))}
                    </>
                  )}
                </div>
                <div className="receipt-total">
                  <span className="receipt-total-label">합계</span>
                  <span className="receipt-total-price">{getTotal().toLocaleString()}원</span>
                </div>
                <div style={{padding:'16px 20px'}}>
                  <button
                    className="btn-primary"
                    style={{width:'100%',justifyContent:'center',padding:'13px'}}
                    onClick={() => setShowModal(true)}
                    disabled={selectedItems.size === 0}
                  >
                    견적 요청하기
                  </button>
                  {selectedItems.size > 0 && (
                    <button
                      style={{
                        width:'100%',marginTop:8,padding:'10px',
                        background:'none',border:'none',
                        color:'var(--gray-400)',fontSize:13,cursor:'pointer'
                      }}
                      onClick={() => setSelectedItems(new Set())}
                    >
                      초기화
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => !submitted && setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            {submitted ? (
              <div style={{textAlign:'center'}}>
                <div className="modal-icon" style={{background:'#F0FFF4'}}>✅</div>
                <h2 className="modal-title">견적 요청 완료!</h2>
                <p style={{color:'var(--gray-500)',fontSize:14,lineHeight:1.7}}>
                  영업일 1일 이내로 연락드리겠습니다.<br />
                  감사합니다 🙏
                </p>
              </div>
            ) : (
              <>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:24}}>
                  <h2 className="modal-title" style={{margin:0,fontSize:20,textAlign:'left'}}>견적 요청</h2>
                  <button onClick={() => setShowModal(false)} style={{fontSize:24,color:'var(--gray-400)',cursor:'pointer'}}>✕</button>
                </div>
                <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:14}}>
                  <div className="form-group">
                    <label className="form-label">담당자 이름 <span className="required">*</span></label>
                    <input className="form-input" required placeholder="홍길동"
                      value={formData.name} onChange={e => setFormData({...formData,name:e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">기관/회사명 <span className="required">*</span></label>
                    <input className="form-input" required placeholder="(주)수상한콘텐츠"
                      value={formData.company} onChange={e => setFormData({...formData,company:e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">연락처 <span className="required">*</span></label>
                    <input className="form-input" required type="tel" placeholder="010-0000-0000"
                      value={formData.phone} onChange={e => setFormData({...formData,phone:e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">이메일 <span className="required">*</span></label>
                    <input className="form-input" required type="email" placeholder="abc@company.com"
                      value={formData.email} onChange={e => setFormData({...formData,email:e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">문의 내용</label>
                    <textarea className="form-textarea" placeholder="추가 요청사항을 입력하세요"
                      value={formData.message} onChange={e => setFormData({...formData,message:e.target.value})} />
                  </div>
                  {selectedItems.size > 0 && (
                    <div style={{
                      background:'var(--blue-light)',
                      borderRadius:'var(--radius)',
                      padding:'12px 16px',
                      fontSize:13,color:'var(--blue)',fontWeight:600
                    }}>
                      선택 서비스 {selectedItems.size}개 · 예상 금액 {getTotal().toLocaleString()}원/월
                    </div>
                  )}
                  <button type="submit" className="btn-primary" style={{justifyContent:'center',padding:'13px',marginTop:4}}>
                    견적 요청하기
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  )
}
