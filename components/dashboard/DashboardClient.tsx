'use client';

import { useState } from 'react';

type Step = 1 | 2 | 3;

interface ContestForm {
  type: string;
  title: string;
  organizer: string;
  sponsor: string;
  target: string;
  prize: string;
  prizeDetail: string;
  benefit: string;
  startDate: string;
  endDate: string;
  field: string;
  link: string;
  description: string;
  poster: File | null;
}

const contestTypes = ['공모전', '대회', '해커톤', '경진대회', '공모', '이벤트', '기타'];
const fields = ['디자인', 'IT/개발', '마케팅', '창업/비즈니스', '문학', '사진', '영상', '과학/기술', '예술', '기타'];

const channelPreviews = [
  {
    id: 'instagram',
    name: 'Instagram',
    icon: '📸',
    color: 'from-pink-500 to-purple-600',
    badge: '1:1 이미지 + 해시태그',
    content: (title: string, org: string, prize: string, end: string) =>
      `✨ ${title}\n\n📌 ${org} 주최\n💰 총 상금 ${prize}\n⏰ 마감: ${end}\n\n지금 바로 참가하세요! 링크 바이오 클릭 👆\n\n#공모전 #대회 #오늘의대회 #${title.replace(/\s/g, '')} #상금 #스펙업 #대학생 #취준생 #도전 #TodayContest`,
  },
  {
    id: 'blog',
    name: 'Naver Blog',
    icon: '📝',
    color: 'from-green-500 to-teal-600',
    badge: 'SEO 최적화 본문',
    content: (title: string, org: string, prize: string, end: string) =>
      `[${title}] 공모전 안내\n\n안녕하세요! 오늘은 ${org}에서 주최하는 "${title}" 공모전을 소개해드리겠습니다.\n\n■ 공모전 개요\n이번 공모전은 ${org}이 주관하는 특별한 기회입니다. 총 상금 규모는 ${prize}으로, 입상하신 분들께 다양한 혜택을 제공합니다.\n\n■ 접수 기간\n마감일: ${end}\n\n■ 지원 방법\n아래 링크를 통해 지원서를 제출해주세요.\n\n■ 주요 특징 및 혜택\n- 우수한 상금 규모\n- 전문가 심사 진행\n- 수상자 전원 인증서 수여\n\n공모전 참가를 원하시는 분들은 서두르세요!\n\n#${title} #공모전 #${org} #상금공모전 #스펙업`,
  },
  {
    id: 'x',
    name: 'X (Twitter)',
    icon: '✖️',
    color: 'from-gray-700 to-gray-900',
    badge: '140자 임팩트 요약',
    content: (title: string, org: string, prize: string, end: string) =>
      `🏆 [공모전] ${title}\n\n📌 주최: ${org}\n💰 상금: ${prize}\n⏰ 마감: ${end}\n\n지금 바로 지원! 👉 todaycontest.kr\n\n#공모전 #오늘의대회`,
  },
];

const statsData = [
  { label: "등록 공모전", value: "12", icon: "🏆", change: "+3", up: true },
  { label: "이번 달 조회수", value: "48,290", icon: "👀", change: "+12%", up: true },
  { label: "총 배포 채널", value: "40", icon: "📡", change: "전채널", up: true },
  { label: "참여 문의", value: "234", icon: "💬", change: "+28", up: true },
];

const registeredContests = [
  { id: 1, title: "2025 K-디자인 공모전", status: "게시중", views: 4832, channels: 40, dday: 12, date: "2025-04-10" },
  { id: 2, title: "청년 창업 아이디어 대전", status: "승인대기", views: 0, channels: 0, dday: 45, date: "2025-04-20" },
  { id: 3, title: "글로벌 마케팅 챌린지", status: "마감", views: 12430, channels: 40, dday: 0, date: "2025-03-01" },
];

const channelStats = [
  { name: "에브리타임", views: 12800, rate: 85 },
  { name: "인스타그램", views: 9400, rate: 72 },
  { name: "씽굿", views: 7200, rate: 60 },
  { name: "네이버 블로그", views: 6100, rate: 52 },
  { name: "X(트위터)", views: 4300, rate: 40 },
  { name: "페이스북", views: 3800, rate: 35 },
];

export default function DashboardClient() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'register'>('dashboard');
  const [step, setStep] = useState<Step>(1);
  const [showAI, setShowAI] = useState(false);
  const [aiTab, setAiTab] = useState<'instagram' | 'blog' | 'x'>('instagram');
  const [editableContent, setEditableContent] = useState<Record<string, string>>({});
  const [deploying, setDeploying] = useState(false);
  const [deployed, setDeployed] = useState(false);
  const [form, setForm] = useState<ContestForm>({
    type: '',
    title: '',
    organizer: '',
    sponsor: '',
    target: '',
    prize: '',
    prizeDetail: '',
    benefit: '',
    startDate: '',
    endDate: '',
    field: '',
    link: '',
    description: '',
    poster: null,
  });

  const updateForm = (key: keyof ContestForm, val: string) => {
    setForm(p => ({ ...p, [key]: val }));
  };

  const generateAI = () => {
    const contents: Record<string, string> = {};
    channelPreviews.forEach(ch => {
      contents[ch.id] = ch.content(
        form.title || '제목 없음',
        form.organizer || '주최사',
        form.prize || '미정',
        form.endDate || '미정'
      );
    });
    setEditableContent(contents);
    setShowAI(true);
  };

  const handleDeploy = () => {
    setDeploying(true);
    setTimeout(() => {
      setDeploying(false);
      setDeployed(true);
    }, 2500);
  };

  const statusColor = (s: string) => {
    if (s === '게시중') return 'bg-green-100 text-green-600';
    if (s === '승인대기') return 'bg-yellow-100 text-yellow-600';
    return 'bg-gray-100 text-gray-500';
  };

  return (
    <div className="pt-6 pb-20">
      <div className="container-max">
        {/* Header */}
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-text">
              🏢 주최사 <span className="text-gradient">CMS 대시보드</span>
            </h1>
            <p className="text-text-muted mt-1 text-sm">안녕하세요! AI 자동 홍보 시스템을 활용해보세요.</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => { setActiveTab('dashboard'); setShowAI(false); setDeployed(false); }}
              className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${activeTab === 'dashboard' ? 'bg-primary text-white shadow-md' : 'bg-white text-text-muted border border-border hover:border-primary'}`}
            >
              📊 대시보드
            </button>
            <button
              onClick={() => { setActiveTab('register'); setStep(1); setShowAI(false); setDeployed(false); }}
              className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${activeTab === 'register' ? 'bg-primary text-white shadow-md' : 'bg-accent text-text border border-accent hover:bg-accent-dark'}`}
            >
              ✍️ 대회 등록
            </button>
          </div>
        </header>

        {/* ===== DASHBOARD TAB ===== */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {statsData.map((stat, i) => (
                <div key={i} className="dashboard-stat hover:-translate-y-0.5 transition-transform">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl">{stat.icon}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${stat.up ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-500'}`}>
                      {stat.change}
                    </span>
                  </div>
                  <div className="text-2xl font-black text-text font-inter">{stat.value}</div>
                  <div className="text-sm text-text-muted mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Channel Stats + Contest List */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Channel Stats */}
              <div className="card p-6">
                <h3 className="font-bold text-text mb-5 flex items-center gap-2">
                  <span>📡</span> 채널별 홍보 현황
                </h3>
                <div className="space-y-3">
                  {channelStats.map((ch, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-sm text-text w-24 flex-shrink-0">{ch.name}</span>
                      <div className="flex-1 progress-bar">
                        <div
                          className="progress-fill transition-all duration-1000"
                          style={{ width: `${ch.rate}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-text w-16 text-right font-inter">
                        {ch.views.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Registered Contests */}
              <div className="card p-6">
                <h3 className="font-bold text-text mb-5 flex items-center gap-2">
                  <span>🏆</span> 등록한 공모전
                </h3>
                <div className="space-y-3">
                  {registeredContests.map(c => (
                    <div key={c.id} className="p-3 bg-gray-50 rounded-xl flex items-start gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-text text-sm truncate">{c.title}</p>
                        <p className="text-xs text-text-muted mt-0.5">{c.date} 등록</p>
                        {c.views > 0 && (
                          <p className="text-xs text-primary mt-0.5">👀 {c.views.toLocaleString()}회 조회</p>
                        )}
                      </div>
                      <div className="flex flex-col items-end gap-1.5">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${statusColor(c.status)}`}>
                          {c.status}
                        </span>
                        {c.channels > 0 && (
                          <span className="text-xs text-gray-400">{c.channels}채널 배포</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => { setActiveTab('register'); setStep(1); }}
                  className="mt-4 w-full py-2.5 bg-primary/10 text-primary font-semibold rounded-xl hover:bg-primary hover:text-white transition-all duration-200 text-sm"
                >
                  + 새 공모전 등록하기
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ===== REGISTER TAB ===== */}
        {activeTab === 'register' && !showAI && (
          <div className="max-w-3xl mx-auto">
            {/* Step Indicator */}
            <div className="flex items-center justify-center gap-2 mb-10">
              {(['공고 입력', 'AI 홍보', '배포 완료'] as const).map((label, i) => {
                const s = (i + 1) as Step;
                return (
                  <div key={i} className="flex items-center gap-2">
                    <div className={`step-circle ${step === s ? 'active' : step > s ? 'completed' : 'inactive'}`}>
                      {step > s ? '✓' : s}
                    </div>
                    <span className={`text-sm font-medium hidden sm:block ${step === s ? 'text-primary' : 'text-text-muted'}`}>
                      {label}
                    </span>
                    {i < 2 && <div className={`w-12 h-0.5 ${step > s ? 'bg-primary' : 'bg-gray-200'}`} />}
                  </div>
                );
              })}
            </div>

            {/* Step 1: Contest Form */}
            <div className="card p-8">
              <h2 className="text-xl font-black text-text mb-6">📋 공모전 정보 입력</h2>

              <div className="space-y-5">
                {/* Type */}
                <div>
                  <label className="block text-sm font-semibold text-text mb-2">공고 유형 *</label>
                  <div className="flex flex-wrap gap-2">
                    {contestTypes.map(t => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => updateForm('type', t)}
                        className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all duration-200 ${
                          form.type === t ? 'bg-primary text-white border-primary' : 'bg-white text-text-muted border-border hover:border-primary'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-text mb-2">대회명 *</label>
                  <input
                    type="text"
                    placeholder="예) 2025 K-스타트업 창업 아이디어 공모전"
                    value={form.title}
                    onChange={e => updateForm('title', e.target.value)}
                    className="input-field"
                  />
                </div>

                {/* Organizer / Sponsor */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-text mb-2">주최/주관사 *</label>
                    <input
                      type="text"
                      placeholder="예) 중소벤처기업부"
                      value={form.organizer}
                      onChange={e => updateForm('organizer', e.target.value)}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-text mb-2">후원사</label>
                    <input
                      type="text"
                      placeholder="예) 네이버, 카카오 (선택)"
                      value={form.sponsor}
                      onChange={e => updateForm('sponsor', e.target.value)}
                      className="input-field"
                    />
                  </div>
                </div>

                {/* Target / Field */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-text mb-2">참여 대상 *</label>
                    <input
                      type="text"
                      placeholder="예) 전국 대학생"
                      value={form.target}
                      onChange={e => updateForm('target', e.target.value)}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-text mb-2">분야</label>
                    <select
                      value={form.field}
                      onChange={e => updateForm('field', e.target.value)}
                      className="input-field"
                    >
                      <option value="">분야 선택</option>
                      {fields.map(f => <option key={f}>{f}</option>)}
                    </select>
                  </div>
                </div>

                {/* Prize */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-text mb-2">총 시상 규모 *</label>
                    <input
                      type="text"
                      placeholder="예) 총 1,000만원"
                      value={form.prize}
                      onChange={e => updateForm('prize', e.target.value)}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-text mb-2">주요 혜택</label>
                    <input
                      type="text"
                      placeholder="예) 상금, 인턴십, 해외연수"
                      value={form.benefit}
                      onChange={e => updateForm('benefit', e.target.value)}
                      className="input-field"
                    />
                  </div>
                </div>

                {/* Date */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-text mb-2">접수 시작일 *</label>
                    <input
                      type="date"
                      value={form.startDate}
                      onChange={e => updateForm('startDate', e.target.value)}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-text mb-2">마감일 *</label>
                    <input
                      type="date"
                      value={form.endDate}
                      onChange={e => updateForm('endDate', e.target.value)}
                      className="input-field"
                    />
                  </div>
                </div>

                {/* Official URL */}
                <div>
                  <label className="block text-sm font-semibold text-text mb-2">공식 접수 링크</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={form.link}
                    onChange={e => updateForm('link', e.target.value)}
                    className="input-field"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-text mb-2">상세 내용</label>
                  <textarea
                    placeholder="대회 상세 내용을 입력해주세요. AI가 자동으로 각 채널에 맞춰 변환합니다."
                    rows={5}
                    value={form.description}
                    onChange={e => updateForm('description', e.target.value)}
                    className="input-field resize-none"
                  />
                </div>

                {/* Poster Upload */}
                <div>
                  <label className="block text-sm font-semibold text-text mb-2">포스터 이미지</label>
                  <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary transition-colors cursor-pointer bg-gray-50">
                    <div className="text-4xl mb-2">🖼️</div>
                    <p className="text-sm font-medium text-text mb-1">포스터 이미지를 드래그하거나 클릭하세요</p>
                    <p className="text-xs text-text-muted">JPG, PNG, WEBP 지원 / 최대 10MB</p>
                    <p className="text-xs text-primary mt-2">AI가 각 채널 규격에 맞춰 자동 리사이징합니다</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-between">
                <button
                  className="px-6 py-3 bg-gray-100 text-text-muted rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                  onClick={() => setActiveTab('dashboard')}
                >
                  취소
                </button>
                <button
                  onClick={generateAI}
                  disabled={!form.title || !form.organizer}
                  className="px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark transition-all duration-200 shadow-md hover:shadow-glow disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <span>🤖</span>
                  <span>AI 홍보 콘텐츠 생성</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ===== AI PREVIEW ===== */}
        {showAI && !deployed && (
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white text-xl">
                🤖
              </div>
              <div>
                <h2 className="text-xl font-black text-text">AI 홍보 콘텐츠 생성 완료!</h2>
                <p className="text-sm text-text-muted">각 채널에 맞게 자동 변환되었습니다. 내용을 수정하고 배포하세요.</p>
              </div>
            </div>

            {/* Channel Tabs */}
            <div className="flex gap-2 mb-6 flex-wrap" role="tablist">
              {channelPreviews.map(ch => (
                <button
                  key={ch.id}
                  role="tab"
                  aria-selected={aiTab === ch.id}
                  onClick={() => setAiTab(ch.id as typeof aiTab)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border ${
                    aiTab === ch.id ? 'bg-primary text-white border-primary shadow-md' : 'bg-white text-text-muted border-border hover:border-primary'
                  }`}
                >
                  <span>{ch.icon}</span>
                  <span>{ch.name}</span>
                  <span className="text-xs opacity-70 hidden md:block">({ch.badge})</span>
                </button>
              ))}
            </div>

            {channelPreviews.map(ch => (
              <div key={ch.id} className={aiTab === ch.id ? 'block' : 'hidden'}>
                <div className="card border border-border overflow-hidden mb-6">
                  <div className={`bg-gradient-to-r ${ch.color} px-5 py-3 flex items-center justify-between`}>
                    <div className="flex items-center gap-2 text-white">
                      <span className="text-xl">{ch.icon}</span>
                      <span className="font-bold">{ch.name} 홍보 콘텐츠</span>
                    </div>
                    <span className="text-xs text-white/80 bg-white/20 px-2 py-1 rounded-full">
                      AI 자동 생성
                    </span>
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs text-text-muted font-semibold uppercase tracking-wide">
                        {ch.badge}
                      </span>
                      <span className="text-xs text-text-light">
                        {(editableContent[ch.id] || '').length}자
                      </span>
                    </div>
                    <textarea
                      className="ai-tab-content w-full border-none bg-gray-50 rounded-xl p-4 text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-primary/30"
                      rows={10}
                      value={editableContent[ch.id] || ''}
                      onChange={e => setEditableContent(p => ({ ...p, [ch.id]: e.target.value }))}
                    />
                    {ch.id === 'instagram' && (
                      <div className="mt-4 p-4 bg-pink-50 rounded-xl">
                        <p className="text-xs font-semibold text-pink-600 mb-2">📱 이미지 규격 자동 변환</p>
                        <div className="flex gap-3">
                          {['피드용 (1:1)', '스토리용 (9:16)', '릴스 커버 (9:16)'].map(s => (
                            <span key={s} className="px-2 py-1 bg-white border border-pink-200 text-pink-600 text-xs rounded-lg font-medium">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {ch.id === 'blog' && (
                      <div className="mt-4 p-4 bg-green-50 rounded-xl">
                        <p className="text-xs font-semibold text-green-600 mb-2">🔍 SEO 키워드 자동 포함</p>
                        <div className="flex flex-wrap gap-2">
                          {['공모전', '대회', form.field || '디자인', '상금', '지원'].map(k => (
                            <span key={k} className="px-2 py-1 bg-white border border-green-200 text-green-600 text-xs rounded-lg">
                              #{k}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Deploy Section */}
            <div className="card p-8 border-2 border-primary/20 bg-primary/5">
              <h3 className="text-lg font-bold text-text mb-5">🚀 배포 채널 선택</h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mb-6">
                {[
                  { name: "씽굿", icon: "⚡" },
                  { name: "위비티", icon: "🏆" },
                  { name: "에브리타임", icon: "🎓" },
                  { name: "캠퍼스픽", icon: "📚" },
                  { name: "인스타그램", icon: "📸" },
                  { name: "페이스북", icon: "📘" },
                  { name: "네이버 블로그", icon: "📝" },
                  { name: "X(트위터)", icon: "✖️" },
                  { name: "카카오톡", icon: "💬" },
                  { name: "틱톡", icon: "🎵" },
                  { name: "티스토리", icon: "🔵" },
                  { name: "유튜브", icon: "▶️" },
                ].map(ch => (
                  <div key={ch.name} className="channel-badge justify-center text-xs font-semibold bg-green-50 border-green-200 text-green-700">
                    <span>{ch.icon}</span>
                    <span className="truncate">{ch.name}</span>
                  </div>
                ))}
              </div>
              <div className="text-center mb-4">
                <span className="inline-flex items-center gap-2 text-sm text-text-muted">
                  <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  총 40개 채널에 동시 배포됩니다
                </span>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setShowAI(false)}
                  className="px-6 py-3 bg-gray-100 text-text-muted rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                >
                  ← 수정하기
                </button>
                <button
                  onClick={handleDeploy}
                  disabled={deploying}
                  className="flex-1 py-4 bg-accent hover:bg-accent-dark text-text font-black rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-70 flex items-center justify-center gap-3"
                >
                  {deploying ? (
                    <>
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                      </svg>
                      <span>40개 채널 배포 중...</span>
                    </>
                  ) : (
                    <>
                      <span>🚀</span>
                      <span>원클릭 40채널 배포!</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ===== DEPLOYED SUCCESS ===== */}
        {deployed && (
          <div className="max-w-2xl mx-auto text-center py-16">
            <div className="text-7xl mb-6 animate-bounce">🎉</div>
            <h2 className="text-3xl font-black text-text mb-4">배포 완료!</h2>
            <p className="text-text-muted text-lg mb-6">
              <strong className="text-primary">{form.title}</strong> 공모전이<br />
              40개 채널에 성공적으로 배포되었습니다!
            </p>
            <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto mb-10">
              {['채널 배포', '콘텐츠 생성', '이미지 변환'].map((l, i) => (
                <div key={i} className="bg-green-50 rounded-xl p-4 text-center">
                  <div className="text-2xl mb-1">✅</div>
                  <div className="text-xs font-semibold text-green-600">{l}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => { setActiveTab('dashboard'); setDeployed(false); setShowAI(false); setForm({ type: '', title: '', organizer: '', sponsor: '', target: '', prize: '', prizeDetail: '', benefit: '', startDate: '', endDate: '', field: '', link: '', description: '', poster: null }); }}
                className="btn-primary px-8 py-3"
              >
                대시보드로 이동
              </button>
              <button
                onClick={() => { setStep(1); setShowAI(false); setDeployed(false); }}
                className="btn-outline px-8 py-3"
              >
                추가 등록하기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
