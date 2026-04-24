'use client'
import { useState, useRef } from 'react'

/* ══════════════════════════════════════
   데이터 / 상수
══════════════════════════════════════ */
const NAV_ITEMS = [
  { id:'overview',  icon:'📊', label:'대시보드 홈' },
  { id:'register',  icon:'📝', label:'게시글 등록' },
  { id:'publish',   icon:'🚀', label:'채널별 발행 현황' },
  { id:'stats',     icon:'📈', label:'성과 분석' },
  { id:'settings',  icon:'⚙️', label:'설정' },
]

type ChannelStatus = { name:string; emoji:string; color:string; done:boolean; loading?:boolean; url?:string; postTitle?:string }

const BASE_CHANNELS: ChannelStatus[] = [
  {name:'인스타그램', emoji:'📸', color:'#E1306C', done:true, url:'https://instagram.com', postTitle:'2026 길 사진 공모전 참가자 모집'},
  {name:'페이스북', emoji:'📘', color:'#1877F2', done:true, url:'https://facebook.com', postTitle:'[공모전] 2026 길 사진 공모전'},
  {name:'유튜브', emoji:'▶️', color:'#FF0000', done:true, url:'https://youtube.com', postTitle:'2026 길 사진 공모전 홍보 영상'},
  {name:'틱톡', emoji:'🎵', color:'#010101', done:false, loading:true},
  {name:'X(트위터)', emoji:'🐦', color:'#000', done:false},
  {name:'카카오톡', emoji:'💬', color:'#FEE500', done:true, url:'https://kakao.com', postTitle:'📢 공모전 안내'},
  {name:'네이버 블로그', emoji:'📝', color:'#03C75A', done:true, url:'https://blog.naver.com', postTitle:'2026 길 사진 공모전 안내'},
  {name:'티스토리', emoji:'🔷', color:'#FF6600', done:true, url:'https://tistory.com', postTitle:'공모전 소개 포스팅'},
  {name:'브런치', emoji:'✍️', color:'#555', done:false},
  {name:'벨로그', emoji:'💻', color:'#20C997', done:false, loading:true},
  {name:'링크드인', emoji:'💼', color:'#0A66C2', done:true, url:'https://linkedin.com', postTitle:'Contest Announcement'},
  {name:'핀터레스트', emoji:'📌', color:'#E60023', done:false},
  {name:'스레드', emoji:'🧵', color:'#000', done:false},
  {name:'밴드', emoji:'🎸', color:'#5BBA00', done:true, url:'https://band.us', postTitle:'공모전 안내 게시글'},
  {name:'에브리타임', emoji:'📅', color:'#E03131', done:false},
  {name:'디스코드', emoji:'🎮', color:'#5865F2', done:false},
  {name:'텔레그램', emoji:'✈️', color:'#26A5E4', done:false},
  {name:'레딧', emoji:'🤖', color:'#FF4500', done:false},
  {name:'네이버 카페', emoji:'☕', color:'#03C75A', done:true, url:'https://cafe.naver.com', postTitle:'공모전 홍보'},
  {name:'다음 카페', emoji:'🌐', color:'#FF5A00', done:false},
]

const RECENT_POSTS = [
  {title:'2026 길 사진 공모전', status:'발행완료', channels:40, views:2847, date:'2026-04-20', id:'c1'},
  {title:'청년 창업 아이디어 대회', status:'발행중', channels:23, views:1203, date:'2026-04-18', id:'c2'},
  {title:'글로벌 디자인 어워드 2026', status:'임시저장', channels:0, views:0, date:'2026-04-17', id:'c3'},
  {title:'AI 그림 공모전', status:'발행완료', channels:40, views:5120, date:'2026-04-15', id:'c4'},
]

/* AI 생성 콘텐츠 */
function makePreview(data: FormData2) {
  const title = data.title || '2026 AI 공모전'
  const org = data.org || '주최기관'
  const deadline = data.deadline || '2026-06-30'
  const prize = data.prize || '총상금 1,000만원'
  const desc = data.desc || '창의적인 아이디어로 도전하세요!'
  return {
    instagram: `🏆 [${title}] 참가자 모집!\n\n${desc}\n\n📅 마감: ${deadline}\n💰 ${prize}\n🔗 링크 인 바이오\n\n#공모전 #${org.replace(/[()주]/g,'')} #대회 #아이디어 #챌린지`,
    naver_blog: `## ${title}\n\n### 공모 개요\n${desc}\n\n### 일정\n- 접수기간: ${data.startDate||'미정'} ~ ${deadline}\n\n### 시상\n${prize}\n\n### 주최\n${org}\n\n### 신청\n홈페이지 참조 (${data.url||'todaycontest.kr'})`,
    twitter: `🏆 ${title}!\n💰 ${prize}\n📅 마감 ${deadline}\n🔗 ${data.url||'todaycontest.kr'}\n#공모전 #대회`,
    facebook: `📢 ${org}이 주관하는 [${title}]이 시작되었습니다!\n\n${desc}\n\n✅ 마감: ${deadline}\n✅ 시상: ${prize}\n\n지금 바로 신청하세요! 👇`,
    tistory: `# [공모전 안내] ${title}\n\n주최: ${org}\n기간: ${data.startDate||'미정'} ~ ${deadline}\n상금: ${prize}\n\n${desc}\n\n더 자세한 내용은 공식 홈페이지를 확인하세요.`,
    kakao: `📢 공모전 안내\n\n[${title}]\n📌 주최: ${org}\n📅 마감: ${deadline}\n💰 ${prize}\n\n▶ 자세히 보기`,
  }
}

type FormData2 = {
  title:string; org:string; orgType:string;
  startDate:string; endDate:string; deadline:string;
  prize:string; prizeAmount:string; desc:string;
  target:string[]; benefit:string[]; how:string; url:string;
  requirement:string;
}

const PREVIEW_TABS = [
  {id:'instagram', label:'인스타그램', emoji:'📸', color:'#E1306C'},
  {id:'naver_blog', label:'네이버 블로그', emoji:'📝', color:'#03C75A'},
  {id:'twitter', label:'X(트위터)', emoji:'🐦', color:'#000'},
  {id:'facebook', label:'페이스북', emoji:'📘', color:'#1877F2'},
  {id:'tistory', label:'티스토리', emoji:'🔷', color:'#FF6600'},
  {id:'kakao', label:'카카오톡', emoji:'💬', color:'#FEE500'},
]

/* ══════════════════════════════════════
   컴포넌트
══════════════════════════════════════ */
export default function DashboardClient() {
  const [activeNav, setActiveNav] = useState('overview')
  const [previewTab, setPreviewTab] = useState('instagram')
  const [isPublishing, setIsPublishing] = useState(false)
  const [publishProgress, setPublishProgress] = useState(0)
  const [publishDone, setPublishDone] = useState(false)
  const [channels, setChannels] = useState<ChannelStatus[]>(BASE_CHANNELS)
  const [selectedPostId, setSelectedPostId] = useState('c1')
  const [channelImages, setChannelImages] = useState<Record<string, string>>({})
  const imgInputRefs = useRef<Record<string, HTMLInputElement|null>>({})

  const [formData, setFormData] = useState<FormData2>({
    title:'', org:'', orgType:'기업',
    startDate:'', endDate:'', deadline:'',
    prize:'', prizeAmount:'', desc:'', requirement:'',
    target:[], benefit:[], how:'온라인', url:'',
  })
  const [posterFile, setPosterFile] = useState<string|null>(null)
  const [step, setStep] = useState<1|2|3>(1)
  const [aiMode, setAiMode] = useState(true)
  const [editedContent, setEditedContent] = useState<Record<string,string>>({})

  const preview = makePreview(formData)
  const getContent = (ch: string) => editedContent[ch] ?? preview[ch as keyof typeof preview] ?? ''

  const setF = (k: keyof FormData2, v: string) => setFormData(f => ({...f, [k]: v}))
  const toggleArr = (k: 'target'|'benefit', val: string) =>
    setFormData(f => ({...f, [k]: f[k].includes(val) ? f[k].filter(x=>x!==val) : [...f[k], val]}))

  const handlePublish = () => {
    setIsPublishing(true)
    setPublishProgress(0)
    const ch = [...channels]
    let progress = 0
    const interval = setInterval(() => {
      progress += 2
      setPublishProgress(progress)
      // 랜덤하게 채널 완료 표시
      if (progress % 10 === 0) {
        const pending = ch.filter(c => !c.done)
        if (pending.length > 0) {
          const idx = ch.indexOf(pending[0])
          ch[idx] = { ...ch[idx], done: true, url: 'https://todaycontest.kr', postTitle: formData.title || '공모전 홍보' }
          setChannels([...ch])
        }
      }
      if (progress >= 100) {
        clearInterval(interval)
        setPublishDone(true)
        setIsPublishing(false)
        setChannels(prev => prev.map(c => ({...c, done:true, loading:false, url:c.url||'https://todaycontest.kr', postTitle:c.postTitle||(formData.title||'공모전 홍보')})))
      }
    }, 80)
  }

  const handleImageUpload = (chName: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setChannelImages(prev => ({...prev, [chName]: url}))
  }

  const doneCount = channels.filter(c => c.done).length
  const loadingCount = channels.filter(c => c.loading).length

  return (
    <main style={{marginTop:56, background:'var(--bg)', minHeight:'calc(100vh - 56px)'}}>
      <div className="dashboard-wrap">

        {/* ── 사이드바 ── */}
        <aside className="dash-sidebar">
          <div className="dash-user-box">
            <div className="dash-user-avatar">🏢</div>
            <div>
              <div className="dash-user-name">주최사 관리자</div>
              <div className="dash-user-plan">Standard 플랜</div>
            </div>
          </div>
          <nav className="dash-nav">
            {NAV_ITEMS.map(item => (
              <button key={item.id}
                className={`dash-nav-btn${activeNav===item.id?' active':''}`}
                onClick={() => setActiveNav(item.id)}>
                <span className="dash-nav-icon">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* ── 메인 ── */}
        <div className="dash-main">

          {/* ════ 대시보드 홈 ════ */}
          {activeNav === 'overview' && (
            <div className="dash-content">
              <h2 className="dash-page-title">대시보드 홈</h2>
              {/* 통계 카드 */}
              <div className="dash-stat-grid">
                {[
                  {icon:'🚀', label:'총 발행 게시글', val:'124건', sub:'이번 달 +12'},
                  {icon:'📡', label:'연동 채널', val:'40개', sub:'모두 정상'},
                  {icon:'👁️', label:'총 조회수', val:'284,710', sub:'이번 달 +38,200'},
                  {icon:'🏆', label:'등록 대회', val:'32건', sub:'진행중 18건'},
                ].map((s,i) => (
                  <div key={i} className="dash-stat-card">
                    <div className="dsc-icon">{s.icon}</div>
                    <div className="dsc-val">{s.val}</div>
                    <div className="dsc-label">{s.label}</div>
                    <div className="dsc-sub">{s.sub}</div>
                  </div>
                ))}
              </div>
              {/* 최근 게시글 */}
              <div className="dash-section">
                <div className="dash-section-header">
                  <h3 className="dash-section-title">최근 등록 게시글</h3>
                  <button className="btn-sm btn-secondary" style={{fontSize:12}} onClick={()=>setActiveNav('register')}>+ 새 게시글 등록</button>
                </div>
                <div className="recent-posts-list">
                  {RECENT_POSTS.map(p => (
                    <div key={p.id} className="rp-row" onClick={()=>{setSelectedPostId(p.id); setActiveNav('publish')}}>
                      <div className="rp-title">{p.title}</div>
                      <div className="rp-meta">
                        <span className={`rp-status ${p.status==='발행완료'?'done':p.status==='발행중'?'loading':'draft'}`}>{p.status}</span>
                        <span className="rp-channels">📡 {p.channels}개 채널</span>
                        <span className="rp-views">👁️ {p.views.toLocaleString()}</span>
                        <span className="rp-date">{p.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ════ 게시글 등록 ════ */}
          {activeNav === 'register' && (
            <div className="dash-content">
              <h2 className="dash-page-title">게시글 등록</h2>
              {/* 스텝 표시 */}
              <div className="reg-steps">
                {['기본 정보', 'AI 콘텐츠 생성', '채널별 수정 및 발행'].map((s, i) => (
                  <div key={i} className={`reg-step${step === i+1 ? ' active' : step > i+1 ? ' done' : ''}`}>
                    <div className="reg-step-num">{step > i+1 ? '✓' : i+1}</div>
                    <div className="reg-step-label">{s}</div>
                    {i < 2 && <div className="reg-step-line" />}
                  </div>
                ))}
              </div>

              {/* STEP 1 */}
              {step === 1 && (
                <div className="reg-form">
                  <div className="rf-section">
                    <h3 className="rf-section-title">📌 포스터 업로드</h3>
                    <div className="poster-upload-area"
                      onClick={() => document.getElementById('poster-input')?.click()}
                      style={{backgroundImage: posterFile ? `url(${posterFile})` : undefined}}>
                      {!posterFile && (
                        <div className="pua-placeholder">
                          <div style={{fontSize:40}}>🖼️</div>
                          <div>클릭하거나 파일을 끌어다 놓으세요</div>
                          <div style={{fontSize:11,color:'var(--gray-400)'}}>JPG, PNG, PDF 지원 (최대 20MB)</div>
                        </div>
                      )}
                      <input id="poster-input" type="file" accept="image/*,application/pdf" hidden
                        onChange={e => { const f=e.target.files?.[0]; if(f) setPosterFile(URL.createObjectURL(f)) }} />
                    </div>
                  </div>

                  <div className="rf-section">
                    <h3 className="rf-section-title">📋 대회 기본 정보</h3>
                    <div className="form-grid">
                      <div className="form-group">
                        <label className="form-label">대회명 *</label>
                        <input className="form-input" placeholder="ex) 2026 AI 창작 공모전" value={formData.title} onChange={e=>setF('title',e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label className="form-label">주최기관 *</label>
                        <input className="form-input" placeholder="ex) 한국도로공사" value={formData.org} onChange={e=>setF('org',e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label className="form-label">접수 시작일</label>
                        <input className="form-input" type="date" value={formData.startDate} onChange={e=>setF('startDate',e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label className="form-label">접수 마감일 *</label>
                        <input className="form-input" type="date" value={formData.deadline} onChange={e=>setF('deadline',e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label className="form-label">시상 내역</label>
                        <input className="form-input" placeholder="ex) 총상금 2,000만원" value={formData.prize} onChange={e=>setF('prize',e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label className="form-label">공식 홈페이지</label>
                        <input className="form-input" type="url" placeholder="https://" value={formData.url} onChange={e=>setF('url',e.target.value)} />
                      </div>
                    </div>
                    <div className="form-group" style={{marginTop:12}}>
                      <label className="form-label">대회 소개 *</label>
                      <textarea className="form-textarea" rows={4} placeholder="대회 소개, 참가 자격, 제출 방법 등을 입력하세요." value={formData.desc} onChange={e=>setF('desc',e.target.value)} />
                    </div>
                    <div className="form-group" style={{marginTop:12}}>
                      <label className="form-label">참가 대상</label>
                      <div className="checkbox-group">
                        {['대학생','일반인','청소년','직장인','외국인','기업'].map(t=>(
                          <label key={t} className="checkbox-label">
                            <input type="checkbox" checked={formData.target.includes(t)} onChange={()=>toggleArr('target',t)} />
                            {t}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="reg-form-footer">
                    <button className="btn-sm btn-primary" onClick={()=>setStep(2)} disabled={!formData.title || !formData.deadline}>
                      다음: AI 콘텐츠 생성 →
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <div className="reg-form">
                  <div className="ai-mode-toggle">
                    <div className="ai-mode-label">AI 자동 생성 모드</div>
                    <button className={`toggle-sw${aiMode?' on':''}`} onClick={()=>setAiMode(v=>!v)}>
                      <div className="toggle-knob" />
                    </button>
                    <div className="ai-mode-desc">{aiMode ? 'ON - AI가 각 채널에 맞게 자동 생성' : 'OFF - 직접 입력'}</div>
                  </div>

                  {/* 채널별 미리보기 */}
                  <div className="preview-tabs">
                    {PREVIEW_TABS.map(pt => (
                      <button key={pt.id} className={`preview-tab${previewTab===pt.id?' active':''}`}
                        style={previewTab===pt.id ? {borderColor:pt.color, color:pt.color} : {}}
                        onClick={()=>setPreviewTab(pt.id)}>
                        <span>{pt.emoji}</span> {pt.label}
                      </button>
                    ))}
                  </div>
                  <div className="preview-pane">
                    <div className="preview-pane-header">
                      {PREVIEW_TABS.find(p=>p.id===previewTab)?.emoji}&nbsp;
                      {PREVIEW_TABS.find(p=>p.id===previewTab)?.label} 미리보기
                      {aiMode && <span className="ai-badge">AI 생성</span>}
                    </div>
                    <textarea
                      className="preview-textarea"
                      value={getContent(previewTab)}
                      onChange={e => setEditedContent(prev => ({...prev, [previewTab]: e.target.value}))}
                      rows={12}
                      placeholder={aiMode ? '대회 정보를 입력하면 AI가 자동으로 콘텐츠를 생성합니다.' : '직접 내용을 입력하세요.'}
                    />
                    {aiMode && (
                      <div className="preview-regenerate">
                        <button className="btn-sm btn-secondary" style={{fontSize:12}} onClick={()=>setEditedContent(prev=>({...prev, [previewTab]: preview[previewTab as keyof typeof preview]||''}))}>
                          🔄 AI 재생성
                        </button>
                        <span style={{fontSize:11, color:'var(--gray-400)'}}>AI 생성 후 직접 수정 가능합니다</span>
                      </div>
                    )}
                  </div>

                  <div className="reg-form-footer">
                    <button className="btn-sm btn-secondary" onClick={()=>setStep(1)}>← 이전</button>
                    <button className="btn-sm btn-primary" onClick={()=>setStep(3)}>다음: 채널별 수정 및 발행 →</button>
                  </div>
                </div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <div className="reg-form">
                  <p style={{fontSize:13,color:'var(--gray-500)',marginBottom:16}}>
                    각 채널별로 내용을 수정하고, 필요시 별도 이미지를 업로드하세요.
                  </p>
                  <div className="channel-publish-list">
                    {PREVIEW_TABS.map(pt => (
                      <div key={pt.id} className="cpl-item">
                        <div className="cpl-header">
                          <span style={{color:pt.color}}>{pt.emoji} {pt.label}</span>
                          <div className="cpl-actions">
                            <span style={{fontSize:11,color:'var(--gray-400)'}}>채널별 이미지 업로드:</span>
                            <button className="btn-sm btn-secondary" style={{fontSize:11,padding:'4px 10px'}}
                              onClick={()=> imgInputRefs.current[pt.id]?.click()}>
                              🖼️ 이미지
                            </button>
                            <input type="file" accept="image/*" hidden
                              ref={el => { imgInputRefs.current[pt.id] = el }}
                              onChange={e => handleImageUpload(pt.id, e)} />
                          </div>
                        </div>
                        {channelImages[pt.id] && (
                          <img src={channelImages[pt.id]} alt="채널 이미지" className="cpl-img-preview" />
                        )}
                        <textarea className="cpl-textarea" rows={5}
                          value={getContent(pt.id)}
                          onChange={e => setEditedContent(prev => ({...prev, [pt.id]: e.target.value}))}
                          placeholder="내용을 입력하세요." />
                      </div>
                    ))}
                  </div>

                  {/* 발행 버튼 / 진행 바 */}
                  {!isPublishing && !publishDone && (
                    <div className="reg-form-footer">
                      <button className="btn-sm btn-secondary" onClick={()=>setStep(2)}>← 이전</button>
                      <button className="btn-sm btn-yellow btn-xl" onClick={handlePublish}>
                        🚀 40개 채널 동시 발행
                      </button>
                    </div>
                  )}
                  {isPublishing && (
                    <div className="publish-progress-box">
                      <div className="ppb-title">🚀 채널별 발행 중...</div>
                      <div className="ppb-bar-bg"><div className="ppb-bar-fill" style={{width:`${publishProgress}%`}} /></div>
                      <div className="ppb-pct">{publishProgress}% 완료</div>
                      <div className="ppb-channels">
                        {channels.map(ch => (
                          <div key={ch.name} className={`ppb-ch${ch.done?' done':ch.loading?' loading':''}`}>
                            <span>{ch.emoji}</span>
                            {ch.done ? '✓' : ch.loading ? '⟳' : '·'}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {publishDone && (
                    <div className="publish-done-box">
                      <div className="pdb-icon">🎉</div>
                      <div className="pdb-title">발행 완료!</div>
                      <div className="pdb-desc">40개 채널에 성공적으로 발행되었습니다.</div>
                      <button className="btn-sm btn-primary" onClick={()=>{setActiveNav('publish'); setPublishDone(false); setPublishProgress(0)}}>
                        발행 현황 보기 →
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ════ 채널별 발행 현황 ════ */}
          {activeNav === 'publish' && (
            <div className="dash-content">
              <h2 className="dash-page-title">채널별 발행 현황</h2>
              <p style={{fontSize:13,color:'var(--gray-500)',marginBottom:20}}>
                각 채널의 게시글 링크를 클릭하면 실제 게시글을 확인할 수 있습니다.
              </p>

              {/* 요약 */}
              <div className="publish-summary">
                <div className="pub-sum-item green">
                  <div className="psi-num">{doneCount}</div>
                  <div className="psi-label">발행 완료</div>
                </div>
                <div className="pub-sum-item yellow">
                  <div className="psi-num">{loadingCount}</div>
                  <div className="psi-label">발행 중</div>
                </div>
                <div className="pub-sum-item gray">
                  <div className="psi-num">{channels.length - doneCount - loadingCount}</div>
                  <div className="psi-label">대기 중</div>
                </div>
                <div className="pub-sum-item blue">
                  <div className="psi-num">{channels.length}</div>
                  <div className="psi-label">전체 채널</div>
                </div>
              </div>

              {/* 채널 카드 그리드 */}
              <div className="publish-channel-grid">
                {channels.map((ch, i) => (
                  <div key={i} className={`pub-ch-card${ch.done?' done':ch.loading?' loading':''}`}>
                    <div className="pcc-header">
                      <div className="pcc-icon" style={{background:ch.color}}>
                        <span style={{fontSize:16}}>{ch.emoji}</span>
                      </div>
                      <div className="pcc-name">{ch.name}</div>
                      <div className={`pcc-status ${ch.done?'done':ch.loading?'loading':'pending'}`}>
                        {ch.done ? '✓ 완료' : ch.loading ? '⟳ 발행중' : '대기'}
                      </div>
                    </div>
                    {ch.done && ch.postTitle && (
                      <div className="pcc-body">
                        <div className="pcc-post-title">{ch.postTitle}</div>
                        {ch.url && (
                          <a href={ch.url} target="_blank" rel="noopener noreferrer" className="pcc-link">
                            🔗 게시글 보기 →
                          </a>
                        )}
                      </div>
                    )}
                    {ch.loading && (
                      <div className="pcc-body" style={{color:'var(--gray-400)',fontSize:11}}>발행 진행 중...</div>
                    )}
                    {!ch.done && !ch.loading && (
                      <div className="pcc-body" style={{color:'var(--gray-300)',fontSize:11}}>발행 대기 중</div>
                    )}
                    {/* 채널별 이미지 업로드 */}
                    <div className="pcc-footer">
                      <button className="pcc-img-btn" onClick={()=>imgInputRefs.current[`ch_${ch.name}`]?.click()}>
                        🖼️ 이미지 추가
                      </button>
                      <input type="file" accept="image/*" hidden
                        ref={el=>{ imgInputRefs.current[`ch_${ch.name}`] = el }}
                        onChange={e=>{
                          const f=e.target.files?.[0]; if(f) {
                            const url=URL.createObjectURL(f)
                            setChannelImages(prev=>({...prev,[`ch_${ch.name}`]:url}))
                          }
                        }} />
                      {channelImages[`ch_${ch.name}`] && (
                        <img src={channelImages[`ch_${ch.name}`]} alt="업로드 이미지" className="pcc-img-preview" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ════ 성과 분석 ════ */}
          {activeNav === 'stats' && (
            <div className="dash-content">
              <h2 className="dash-page-title">성과 분석</h2>
              <div className="stats-chart-grid">
                {[
                  {label:'총 조회수', val:'284,710', change:'+38,200 (이번 달)', icon:'👁️'},
                  {label:'총 클릭수', val:'12,480', change:'+2,100 (이번 달)', icon:'🖱️'},
                  {label:'신청자 수', val:'3,240', change:'+580 (이번 달)', icon:'✋'},
                  {label:'클릭률', val:'4.38%', change:'+0.5%p', icon:'📊'},
                ].map((s,i) => (
                  <div key={i} className="stat-analysis-card">
                    <div className="sac-icon">{s.icon}</div>
                    <div className="sac-val">{s.val}</div>
                    <div className="sac-label">{s.label}</div>
                    <div className="sac-change">{s.change}</div>
                  </div>
                ))}
              </div>
              <div className="dash-section" style={{marginTop:24}}>
                <h3 className="dash-section-title">채널별 성과</h3>
                <div className="channel-stats-list">
                  {[
                    {name:'인스타그램', emoji:'📸', color:'#E1306C', views:58200, clicks:3200, rate:'5.5%'},
                    {name:'네이버 블로그', emoji:'📝', color:'#03C75A', views:45600, clicks:2800, rate:'6.1%'},
                    {name:'유튜브', emoji:'▶️', color:'#FF0000', views:38700, clicks:1900, rate:'4.9%'},
                    {name:'페이스북', emoji:'📘', color:'#1877F2', views:32100, clicks:1500, rate:'4.7%'},
                    {name:'카카오톡', emoji:'💬', color:'#FEE500', views:28800, clicks:2100, rate:'7.3%'},
                    {name:'밴드', emoji:'🎸', color:'#5BBA00', views:21300, clicks:980, rate:'4.6%'},
                  ].map((ch,i) => (
                    <div key={i} className="csl-row">
                      <div className="csl-ch" style={{color:ch.color}}>{ch.emoji} {ch.name}</div>
                      <div className="csl-bar-wrap">
                        <div className="csl-bar" style={{width:`${(ch.views/58200*100).toFixed(0)}%`, background:ch.color}} />
                      </div>
                      <div className="csl-views">{ch.views.toLocaleString()} 뷰</div>
                      <div className="csl-clicks">{ch.clicks.toLocaleString()} 클릭</div>
                      <div className="csl-rate">{ch.rate}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ════ 설정 ════ */}
          {activeNav === 'settings' && (
            <div className="dash-content">
              <h2 className="dash-page-title">설정</h2>
              <div className="settings-sections">
                <div className="settings-card">
                  <h3 className="settings-section-title">계정 정보</h3>
                  <div className="form-grid">
                    <div className="form-group"><label className="form-label">기관명</label><input className="form-input" defaultValue="오늘의대회㈜" /></div>
                    <div className="form-group"><label className="form-label">담당자</label><input className="form-input" defaultValue="홍길동" /></div>
                    <div className="form-group"><label className="form-label">이메일</label><input className="form-input" type="email" defaultValue="admin@todaycontest.kr" /></div>
                    <div className="form-group"><label className="form-label">연락처</label><input className="form-input" defaultValue="02-1234-5678" /></div>
                  </div>
                  <button className="btn-sm btn-primary" style={{marginTop:16}}>저장</button>
                </div>
                <div className="settings-card">
                  <h3 className="settings-section-title">알림 설정</h3>
                  {[
                    '발행 완료 알림 (이메일)',
                    '마감 임박 알림 (3일 전)',
                    '성과 리포트 (주간)',
                    '새 기능 안내',
                  ].map((label,i) => (
                    <div key={i} className="setting-toggle-row">
                      <span>{label}</span>
                      <button className={`toggle-sw${i < 2 ? ' on' : ''}`}>
                        <div className="toggle-knob" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>{/* dash-main */}
      </div>{/* dashboard-wrap */}
    </main>
  )
}
