'use client';

import { useState } from 'react';
import { serviceItems, ServiceItem } from '@/lib/data';

const pricingPlans = [
  {
    name: "Basic",
    subtitle: "첫 등록 주최사",
    price: "무료",
    priceNum: 0,
    color: "border-gray-200",
    features: [
      "공모전 1건 무료 등록",
      "기본 포털 3개 배포",
      "AI 콘텐츠 미리보기",
      "기본 통계 제공",
    ],
    cta: "무료로 시작",
    ctaClass: "btn-outline",
    recommended: false,
  },
  {
    name: "Standard",
    subtitle: "일반 주최사",
    price: "월 99,000원",
    priceNum: 99000,
    color: "border-primary",
    features: [
      "공모전 5건 등록/월",
      "20개 채널 자동 배포",
      "AI 콘텐츠 자동 생성",
      "실시간 통계 대시보드",
      "이미지 자동 리사이징",
      "이메일 고객지원",
    ],
    cta: "Standard 시작",
    ctaClass: "btn-primary",
    recommended: true,
  },
  {
    name: "Premium",
    subtitle: "대형 기관/기업",
    price: "월 299,000원",
    priceNum: 299000,
    color: "border-accent",
    features: [
      "공모전 무제한 등록",
      "40개+ 전채널 배포",
      "프리미엄 AI 최적화",
      "전담 매니저 배정",
      "맞춤 대행 서비스",
      "심사/시상식 컨설팅",
      "월간 성과 리포트",
    ],
    cta: "Premium 문의",
    ctaClass: "btn-accent",
    recommended: false,
  },
];

const categories = [
  { key: "기획/디자인", label: "🎨 기획/디자인", color: "blue" },
  { key: "온라인 홍보", label: "📢 온라인 홍보", color: "purple" },
  { key: "오프라인", label: "📮 오프라인", color: "green" },
  { key: "프로모션", label: "🎁 프로모션/운영", color: "orange" },
  { key: "시상식", label: "🏆 시상식", color: "red" },
];

const categoryColorMap: Record<string, string> = {
  blue: "bg-blue-100 text-blue-600 border-blue-200",
  purple: "bg-purple-100 text-purple-600 border-purple-200",
  green: "bg-emerald-100 text-emerald-600 border-emerald-200",
  orange: "bg-orange-100 text-orange-600 border-orange-200",
  red: "bg-red-100 text-red-600 border-red-200",
};

const categoryBgMap: Record<string, string> = {
  blue: "bg-blue-50 border-blue-300",
  purple: "bg-purple-50 border-purple-300",
  green: "bg-emerald-50 border-emerald-300",
  orange: "bg-orange-50 border-orange-300",
  red: "bg-red-50 border-red-300",
};

interface QuoteFormData {
  contestName: string;
  managerName: string;
  phone: string;
  email: string;
  budget: string;
  note: string;
}

export default function PricingPageClient() {
  const [selectedItems, setSelectedItems] = useState<ServiceItem[]>([]);
  const [activeCategory, setActiveCategory] = useState("기획/디자인");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<QuoteFormData>({
    contestName: '',
    managerName: '',
    phone: '',
    email: '',
    budget: '',
    note: '',
  });

  const toggleItem = (item: ServiceItem) => {
    setSelectedItems(prev =>
      prev.find(i => i.id === item.id)
        ? prev.filter(i => i.id !== item.id)
        : [...prev, item]
    );
  };

  const isSelected = (id: string) => selectedItems.some(i => i.id === id);

  const total = selectedItems.reduce((sum, i) => sum + i.price, 0);
  const totalFormatted = total.toLocaleString();

  const filteredItems = serviceItems.filter(i => i.category === activeCategory);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(true);
  };

  return (
    <div className="pt-8 pb-20">
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative bg-white rounded-3xl p-8 max-w-md w-full shadow-floating animate-fade-in-up text-center">
            <div className="text-6xl mb-5">🎉</div>
            <h3 className="text-2xl font-black text-text mb-3">견적 요청 완료!</h3>
            <p className="text-text-muted leading-relaxed mb-6">
              <strong className="text-primary">{formData.managerName}</strong>님의 견적 요청이 접수되었습니다.
              <br />영업일 기준 1~2일 내 담당 매니저가 연락드립니다.
            </p>
            <div className="bg-gray-50 rounded-xl p-4 mb-6 text-sm text-left space-y-1.5">
              <div className="flex justify-between">
                <span className="text-text-muted">대회명</span>
                <span className="font-semibold text-text">{formData.contestName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">선택 서비스</span>
                <span className="font-semibold text-text">{selectedItems.length}개</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">예상 금액</span>
                <span className="font-bold text-primary">{totalFormatted}원~</span>
              </div>
            </div>
            <button
              onClick={() => setShowModal(false)}
              className="btn-primary w-full py-3"
            >
              확인
            </button>
          </div>
        </div>
      )}

      <div className="container-max">
        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-black text-text mb-3">
            💰 요금제 <span className="text-gradient">&</span> 대행 견적서
          </h1>
          <p className="text-text-muted text-lg max-w-xl mx-auto">
            공모전에 필요한 서비스를 쇼핑하듯 담고,<br />
            실시간 견적을 바로 확인하세요
          </p>
        </header>

        {/* Pricing Plans */}
        <section aria-labelledby="plan-title" className="mb-20">
          <h2 id="plan-title" className="text-2xl font-bold text-text mb-8 text-center">
            📋 요금제 선택
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingPlans.map((plan, i) => (
              <article
                key={i}
                className={`card p-8 border-2 ${plan.color} relative hover:-translate-y-1 transition-all duration-300 ${plan.recommended ? 'shadow-card-hover' : ''}`}
              >
                {plan.recommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-white text-xs font-bold rounded-full shadow-md">
                    ⭐ 추천
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-black text-text">{plan.name}</h3>
                  <p className="text-text-muted text-sm mt-1">{plan.subtitle}</p>
                  <div className="mt-4">
                    <span className="text-3xl font-black text-primary font-inter">{plan.price}</span>
                  </div>
                </div>
                <ul className="space-y-2.5 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm text-text-muted">
                      <span className="w-4 h-4 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] mt-0.5">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-xl font-bold text-sm transition-all duration-200 ${
                  plan.recommended ? 'bg-primary text-white hover:bg-primary-dark shadow-md' :
                  plan.priceNum === 0 ? 'border-2 border-primary text-primary hover:bg-primary hover:text-white' :
                  'bg-accent text-text hover:bg-accent-dark'
                }`}>
                  {plan.cta}
                </button>
              </article>
            ))}
          </div>
        </section>

        {/* Interactive Quote Builder */}
        <section aria-labelledby="quote-title">
          <h2 id="quote-title" className="text-2xl font-bold text-text mb-3 text-center">
            🛒 대행 서비스 견적 만들기
          </h2>
          <p className="text-center text-text-muted mb-8">
            원하는 서비스를 클릭하면 오른쪽에 실시간으로 담깁니다
          </p>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left: Service Selector */}
            <div className="lg:col-span-2">
              {/* Category Tabs */}
              <div className="flex flex-wrap gap-2 mb-6" role="tablist">
                {categories.map(cat => (
                  <button
                    key={cat.key}
                    role="tab"
                    aria-selected={activeCategory === cat.key}
                    onClick={() => setActiveCategory(cat.key)}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 border ${
                      activeCategory === cat.key
                        ? 'bg-primary text-white border-primary shadow-md'
                        : 'bg-white text-text-muted border-border hover:border-primary hover:text-primary'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Service Icon Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {filteredItems.map(item => {
                  const selected = isSelected(item.id);
                  const cat = categories.find(c => c.key === item.category);
                  const colorClass = cat ? categoryColorMap[cat.color] : '';
                  const bgClass = cat ? categoryBgMap[cat.color] : '';

                  return (
                    <button
                      key={item.id}
                      onClick={() => toggleItem(item)}
                      className={`relative flex flex-col items-center gap-3 p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 text-left ${
                        selected
                          ? `${bgClass} shadow-card scale-[1.02]`
                          : 'border-border bg-white hover:border-gray-300 hover:shadow-sm'
                      }`}
                      aria-pressed={selected}
                    >
                      {selected && (
                        <span className="absolute top-2 right-2 w-5 h-5 bg-green-500 text-white rounded-full text-xs flex items-center justify-center">✓</span>
                      )}
                      <span className="text-3xl">{item.icon}</span>
                      <div className="text-center">
                        <div className={`font-bold text-sm ${selected ? 'text-primary' : 'text-text'}`}>
                          {item.name}
                        </div>
                        <div className="text-xs text-text-muted mt-0.5 leading-tight">{item.description}</div>
                        <div className={`text-sm font-bold mt-2 ${selected ? 'text-primary' : 'text-primary'}`}>
                          {item.priceText}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right: Floating Receipt */}
            <aside className="lg:col-span-1">
              <div className="floating-receipt">
                {/* Receipt Card */}
                <div className="card border-2 border-primary/20 overflow-hidden">
                  {/* Receipt Header */}
                  <div className="bg-gradient-to-r from-primary to-primary-light p-5 text-white">
                    <h3 className="font-black text-lg">📋 실시간 견적서</h3>
                    <p className="text-primary-light text-sm mt-1">선택한 서비스: {selectedItems.length}개</p>
                  </div>

                  {/* Receipt Items */}
                  <div className="p-5">
                    {selectedItems.length === 0 ? (
                      <div className="py-10 text-center">
                        <div className="text-4xl mb-3">🛒</div>
                        <p className="text-text-muted text-sm">서비스를 선택해주세요</p>
                        <p className="text-text-light text-xs mt-1">좌측 아이콘 카드를 클릭하면<br />여기에 담깁니다</p>
                      </div>
                    ) : (
                      <div className="space-y-2 max-h-60 overflow-y-auto scrollbar-hide">
                        {selectedItems.map(item => (
                          <div key={item.id} className="receipt-item">
                            <div className="flex items-center gap-2 flex-1 min-w-0">
                              <span className="text-base flex-shrink-0">{item.icon}</span>
                              <span className="text-sm text-text truncate">{item.name}</span>
                            </div>
                            <div className="flex items-center gap-2 ml-2">
                              <span className="text-sm font-bold text-primary whitespace-nowrap">
                                {item.priceText}
                              </span>
                              <button
                                onClick={() => toggleItem(item)}
                                className="text-gray-400 hover:text-red-500 transition-colors text-xs"
                                aria-label={`${item.name} 제거`}
                              >
                                ✕
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Total */}
                    {selectedItems.length > 0 && (
                      <div className="mt-4 pt-4 border-t-2 border-dashed border-gray-200">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-text">예상 합계</span>
                          <span className="text-xl font-black text-primary font-inter">
                            {totalFormatted}원~
                          </span>
                        </div>
                        <p className="text-xs text-text-muted mt-1">* VAT 별도, 최종 견적은 상담 후 확정</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Quote Request Form */}
                <div className="mt-4 card p-5">
                  <h4 className="font-bold text-text mb-4">📝 견적 요청하기</h4>
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                      type="text"
                      placeholder="대회명 *"
                      required
                      value={formData.contestName}
                      onChange={e => setFormData(p => ({ ...p, contestName: e.target.value }))}
                      className="input-field text-sm py-2.5"
                    />
                    <input
                      type="text"
                      placeholder="담당자명 *"
                      required
                      value={formData.managerName}
                      onChange={e => setFormData(p => ({ ...p, managerName: e.target.value }))}
                      className="input-field text-sm py-2.5"
                    />
                    <input
                      type="tel"
                      placeholder="연락처 *"
                      required
                      value={formData.phone}
                      onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                      className="input-field text-sm py-2.5"
                    />
                    <input
                      type="email"
                      placeholder="이메일"
                      value={formData.email}
                      onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                      className="input-field text-sm py-2.5"
                    />
                    <select
                      value={formData.budget}
                      onChange={e => setFormData(p => ({ ...p, budget: e.target.value }))}
                      className="input-field text-sm py-2.5"
                    >
                      <option value="">예산 범위 선택</option>
                      <option>100만원 이하</option>
                      <option>100~500만원</option>
                      <option>500만원~1,000만원</option>
                      <option>1,000만원 이상</option>
                    </select>
                    <textarea
                      placeholder="추가 요청사항"
                      rows={3}
                      value={formData.note}
                      onChange={e => setFormData(p => ({ ...p, note: e.target.value }))}
                      className="input-field text-sm py-2.5 resize-none"
                    />
                    <button
                      type="submit"
                      className="w-full py-3.5 bg-accent hover:bg-accent-dark text-text font-black rounded-xl transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2"
                    >
                      <span>🚀</span>
                      <span>견적 요청하기</span>
                    </button>
                  </form>
                  <p className="text-xs text-text-light mt-3 text-center">
                    영업일 기준 1~2일 내 매니저 연락
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </div>
    </div>
  );
}
