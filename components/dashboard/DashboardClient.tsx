'use client'
import { useState } from 'react'

const NAV_ITEMS = [
  {id:'overview',label:'📊 대시보드',},
  {id:'register',label:'➕ 대회 등록',},
  {id:'publish',label:'🚀 AI 발행',},
  {id:'stats',label:'📈 성과 분석',},
  {id:'settings',label:'⚙️ 설정',},
]

const CHANNELS_DIST = [
  {name:'인스타',emoji:'📸',done:true},
  {name:'페이스북',emoji:'📘',done:true},
  {name:'유튜브',emoji:'▶️',done:true},
  {name:'틱톡',emoji:'🎵',done:false,loading:true},
  {name:'트위터',emoji:'🐦',done:false},
  {name:'카카오',emoji:'💬',done:true},
  {name:'블로그',emoji:'📝',done:true},
  {name:'카페',emoji:'☕',done:false},
  {name:'브런치',emoji:'✍️',done:false},
  {name:'벨로그',emoji:'💻',done:false},
  {name:'링크드인',emoji:'💼',done:true},
  {name:'핀터레스트',emoji:'📌',done:false,loading:true},
  {name:'스레드',emoji:'🧵',done:false},
  {name:'밴드',emoji:'🎸',done:true},
  {name:'에타',emoji:'📅',done:false},
  {name:'디스코드',emoji:'🎮',done:false},
]

const RECENT_CONTESTS = [
  {title:'2024 AI 창작 공모전',status:'발행완료',channels:40,views:2847,date:'2024-01-15'},
  {title:'청년 창업 아이디어 대회',status:'발행중',channels:23,views:1203,date:'2024-01-14'},
  {title:'글로벌 디자인 어워드',status:'임시저장',channels:0,views:0,date:'2024-01-13'},
]

type FormStep = 'basic' | 'detail' | 'media' | 'review'

export default function DashboardClient() {
  const [activeNav, setActiveNav] = useState('overview')
  const [step, setStep] = useState<FormStep>('basic')
  const [previewTab, setPreviewTab] = useState('instagram')
  const [isPublishing, setIsPublishing] = useState(false)
  const [publishProgress, setPublishProgress] = useState(0)
  const [publishDone, setPublishDone] = useState(false)
  const [formData, setFormData] = useState({
    title:'', org:'', orgType:'기업',
    startDate:'', endDate:'', deadline:'',
    prize:'', prizeAmount:'',
    target:[] as string[], targetEtc:'',
    benefit:[] as string[],
    field1:'', field2:'', field3:'',
    how:'온라인', url:'',
    desc:'', requirement:'',
  })

  const toggleArr = (arr: string[], val: string) =>
    arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val]

  const handlePublish = () => {
    setIsPublishing(true)
    setPublishProgress(0)
    const interval = setInterval(() => {
      setPublishProgress(p => {
        if (p >= 100) {
          clearInterval(interval)
          setPublishDone(true)
          setIsPublishing(false)
          return 100
        }
        return p + 2
      })
    }, 80)
  }

  const previewContents: Record<string, string> = {
    instagram: `🏆 [${formData.title || '2024 AI 창작 공모전'}]\n\n${formData.desc || '창의적인 아이디어로 도전하세요! AI 기술과 창작의 경계를 넘나드는 작품을 공모합니다.'}\n\n📅 마감: ${formData.deadline || '2024-03-31'}\n💰 시상: ${formData.prize || '총상금 1,000만원'}\n🔗 접수: 링크 인 바이오\n\n#공모전 #AI창작 #대회 #${formData.org || '주최기관'} #창작 #아이디어 #공모 #대학생 #청년`,
    blog: `# ${formData.title || '2024 AI 창작 공모전'} 참가자 모집\n\n안녕하세요! ${formData.org || '오늘의 대회'}입니다.\n\n## 📋 공모 개요\n\n${formData.desc || '이번 공모전은 AI 기술과 창작 활동을 결합한 새로운 형태의 대회입니다. 인공지능을 활용한 혁신적인 작품을 기다립니다.'}\n\n## 📅 일정\n- **접수 기간**: ${formData.startDate || '2024-02-01'} ~ ${formData.endDate || '2024-03-31'}\n- **최종 마감**: ${formData.deadline || '2024-03-31'}\n\n## 🏆 시상 내역\n${formData.prize || '총상금 1,000만원 (대상 500만원, 최우수상 300만원 외)'}\n\n## 👥 참가 자격\n${formData.target.join(', ') || '대학생, 일반인 누구나 참여 가능'}\n\n## 📮 접수 방법\n홈페이지(${formData.url || 'https://todaycontest.kr'})를 통해 온라인 접수`,
    twitter: `🏆 ${formData.title || '2024 AI 창작 공모전'} 참가자 모집!\n\n💰 ${formData.prize || '총상금 1,000만원'}\n📅 마감: ${formData.deadline || '3월 31일'}\n🔗 ${formData.url || 'todaycontest.kr'}\n\n#공모전 #AI #창작 #대상`,
  }

  return (
    <main style={{marginTop:64,background:'var(--gray-50)',minHeight:'calc(100vh - 64px)'}}>
      <div className="container" style={{padding:'24px 20px'}}>
        <div className="dashboard-grid">
          {/* Sidebar */}
          <aside className="dashboard-sidebar">
            <div style={{padding:'12px 20px 20px',borderBottom:'1px solid var(--gray-200)',marginBottom:8}}>
              <div style={{fontSize:13,color:'var(--gray-400)',marginBottom:4}}>로그인 계정</div>
              <div style={{fontSize:15,fontWeight:700,color:'var(--gray-900)'}}>주최사 관리자</div>
              <div style={{
                display:'inline-block',marginTop:4,
                padding:'3px 8px',background:'var(--blue-light)',
                borderRadius:100,fontSize:11,fontWeight:700,color:'var(--blue)'
              }}>Standard 플랜</div>
            </div>
            {NAV_ITEMS.map(item => (
              <div
                key={item.id}
                className={`dashboard-nav-item${activeNav===item.id?' active':''}`}
                onClick={() => setActiveNav(item.id)}
              >
                {item.label}
              </div>
            ))}
            <div style={{margin:'12px 16px',padding:'16px',background:'var(--blue-light)',borderRadius:'var(--radius)',marginTop:24}}>
              <div style={{fontSize:12,fontWeight:700,color:'var(--blue)',marginBottom:4}}>💡 이번 달 현황</div>
              <div style={{fontSize:13,color:'var(--gray-600)'}}>발행 완료: <strong>23건</strong></div>
              <div style={{fontSize:13,color:'var(--gray-600)'}}>남은 횟수: <strong>27건</strong></div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="dashboard-content">
            {/* Overview */}
            {activeNav === 'overview' && (
              <>
                <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16,marginBottom:20}}>
                  {[
                    {icon:'📝',label:'이번 달 등록',num:23,sub:'총 147건 누적'},
                    {icon:'🚀',label:'발행 완료',num:920,sub:'채널 발행 합산'},
                    {icon:'👀',label:'총 조회수',num:'48,231',sub:'이번 달 기준'},
                  ].map((s,i) => (
                    <div key={i} style={{
                      background:'white',borderRadius:'var(--radius-md)',
                      padding:'20px',border:'1px solid var(--gray-200)',
                      boxShadow:'var(--shadow)'
                    }}>
                      <div style={{fontSize:24,marginBottom:8}}>{s.icon}</div>
                      <div style={{fontSize:26,fontWeight:900,color:'var(--blue)'}}>{s.num}</div>
                      <div style={{fontSize:13,color:'var(--gray-500)',marginTop:2}}>{s.label}</div>
                      <div style={{fontSize:11,color:'var(--gray-400)',marginTop:2}}>{s.sub}</div>
                    </div>
                  ))}
                </div>

                <div className="dash-card">
                  <h2 className="dash-card-title">📋 최근 등록 대회</h2>
                  <div style={{overflowX:'auto'}}>
                    <table style={{width:'100%',borderCollapse:'collapse',fontSize:14}}>
                      <thead>
                        <tr style={{borderBottom:'2px solid var(--gray-200)'}}>
                          {['대회명','상태','발행 채널','조회수','등록일'].map(h => (
                            <th key={h} style={{
                              padding:'10px 14px',textAlign:'left',
                              color:'var(--gray-500)',fontWeight:600,fontSize:13
                            }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {RECENT_CONTESTS.map((c,i) => (
                          <tr key={i} style={{borderBottom:'1px solid var(--gray-100)'}}>
                            <td style={{padding:'12px 14px',fontWeight:600,color:'var(--gray-800)'}}>{c.title}</td>
                            <td style={{padding:'12px 14px'}}>
                              <span className={`chip ${c.status==='발행완료'?'chip-green':c.status==='발행중'?'chip-blue':'chip-gray'}`}>
                                {c.status}
                              </span>
                            </td>
                            <td style={{padding:'12px 14px',color:'var(--blue)',fontWeight:700}}>{c.channels}개</td>
                            <td style={{padding:'12px 14px',color:'var(--gray-600)'}}>{c.views.toLocaleString()}</td>
                            <td style={{padding:'12px 14px',color:'var(--gray-400)'}}>{c.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <button
                    className="btn-primary"
                    style={{marginTop:16,width:'100%',justifyContent:'center'}}
                    onClick={() => setActiveNav('register')}
                  >
                    + 새 대회 등록하기
                  </button>
                </div>
              </>
            )}

            {/* Registration */}
            {activeNav === 'register' && (
              <div className="dash-card">
                <h2 className="dash-card-title">➕ 대회 등록</h2>

                {/* Step Indicator */}
                <div style={{display:'flex',gap:4,marginBottom:28}}>
                  {(['basic','detail','media','review'] as FormStep[]).map((s,i) => {
                    const labels = ['기본 정보','상세 정보','이미지·링크','검토 및 발행']
                    const isActive = step === s
                    const isDone = ['basic','detail','media','review'].indexOf(step) > i
                    return (
                      <div key={s} style={{flex:1,position:'relative'}}>
                        <div style={{
                          padding:'10px 8px',borderRadius:'var(--radius)',textAlign:'center',
                          background: isActive?'var(--blue)': isDone?'var(--blue-light)':'var(--gray-100)',
                          color: isActive?'white': isDone?'var(--blue)':'var(--gray-400)',
                          fontWeight:700,fontSize:13,cursor:'pointer',transition:'all 0.2s'
                        }}
                          onClick={() => setStep(s)}
                        >
                          <div>{isDone?'✓':i+1}</div>
                          <div style={{fontSize:11,marginTop:2}}>{labels[i]}</div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* STEP 1: Basic */}
                {step === 'basic' && (
                  <div className="form-grid">
                    <div className="form-group full">
                      <label className="form-label">대회명 <span className="required">*</span></label>
                      <input className="form-input" placeholder="예: 2024 AI 창작 공모전"
                        value={formData.title} onChange={e => setFormData({...formData,title:e.target.value})} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">주최기관명 <span className="required">*</span></label>
                      <input className="form-input" placeholder="예: 문화체육관광부"
                        value={formData.org} onChange={e => setFormData({...formData,org:e.target.value})} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">주최기관 유형 <span className="required">*</span></label>
                      <select className="form-select"
                        value={formData.orgType} onChange={e => setFormData({...formData,orgType:e.target.value})}>
                        {['정부기관','공공기관','기업','대학교','NGO/비영리','기타'].map(o => <option key={o}>{o}</option>)}
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">접수 시작일 <span className="required">*</span></label>
                      <input className="form-input" type="date"
                        value={formData.startDate} onChange={e => setFormData({...formData,startDate:e.target.value})} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">접수 마감일 <span className="required">*</span></label>
                      <input className="form-input" type="date"
                        value={formData.deadline} onChange={e => setFormData({...formData,deadline:e.target.value})} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">시상 유형 <span className="required">*</span></label>
                      <select className="form-select"
                        value={formData.prize} onChange={e => setFormData({...formData,prize:e.target.value})}>
                        {['상금','상품','장학금','인턴십','해외연수','기타'].map(o => <option key={o}>{o}</option>)}
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">총 시상액</label>
                      <input className="form-input" placeholder="예: 1,000만원"
                        value={formData.prizeAmount} onChange={e => setFormData({...formData,prizeAmount:e.target.value})} />
                    </div>
                    <div className="form-group full">
                      <label className="form-label">참가 대상</label>
                      <div style={{display:'flex',gap:10,flexWrap:'wrap',marginTop:4}}>
                        {['대학생','대학원생','일반인','청소년','직장인','제한없음'].map(t => (
                          <label key={t} style={{display:'flex',alignItems:'center',gap:6,cursor:'pointer',fontSize:14}}>
                            <input type="checkbox"
                              checked={formData.target.includes(t)}
                              onChange={() => setFormData({...formData,target:toggleArr(formData.target,t)})} />
                            {t}
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="form-group full" style={{marginTop:8}}>
                      <button className="btn-primary" style={{width:'100%',justifyContent:'center'}}
                        onClick={() => setStep('detail')}>
                        다음 단계 →
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2: Detail */}
                {step === 'detail' && (
                  <div className="form-grid">
                    <div className="form-group full">
                      <label className="form-label">공모 분야 (최대 3개)</label>
                      <div style={{display:'flex',gap:8,flexWrap:'wrap',marginTop:4}}>
                        {['디자인','IT/개발','영상/사진','음악/공연','글쓰기','예술/미술','사회혁신','창업/스타트업','환경','건축','과학/기술','기타'].map(f => (
                          <button key={f}
                            onClick={() => {
                              const arr = [formData.field1,formData.field2,formData.field3].filter(Boolean)
                              if (arr.includes(f)) {
                                const updated = arr.filter(x=>x!==f)
                                setFormData({...formData,field1:updated[0]||'',field2:updated[1]||'',field3:updated[2]||''})
                              } else if (arr.length < 3) {
                                const updated = [...arr,f]
                                setFormData({...formData,field1:updated[0]||'',field2:updated[1]||'',field3:updated[2]||''})
                              }
                            }}
                            style={{
                              padding:'7px 14px',borderRadius:100,fontSize:13,fontWeight:600,cursor:'pointer',
                              border:`1.5px solid ${[formData.field1,formData.field2,formData.field3].includes(f)?'var(--blue)':'var(--gray-300)'}`,
                              background:[formData.field1,formData.field2,formData.field3].includes(f)?'var(--blue)':'white',
                              color:[formData.field1,formData.field2,formData.field3].includes(f)?'white':'var(--gray-600)',
                              transition:'all 0.2s'
                            }}>
                            {f}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="form-group full">
                      <label className="form-label">혜택 유형</label>
                      <div style={{display:'flex',gap:10,flexWrap:'wrap',marginTop:4}}>
                        {['가산점','인턴십','해외연수','취업연계','멘토링','교육수강권'].map(b => (
                          <label key={b} style={{display:'flex',alignItems:'center',gap:6,cursor:'pointer',fontSize:14}}>
                            <input type="checkbox"
                              checked={formData.benefit.includes(b)}
                              onChange={() => setFormData({...formData,benefit:toggleArr(formData.benefit,b)})} />
                            {b}
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="form-group full">
                      <label className="form-label">공모 내용 상세 <span className="required">*</span></label>
                      <textarea className="form-textarea" style={{minHeight:140}}
                        placeholder="공모전의 목적, 주제, 참가 방법 등을 상세히 입력해주세요."
                        value={formData.desc} onChange={e => setFormData({...formData,desc:e.target.value})} />
                    </div>
                    <div className="form-group full">
                      <label className="form-label">제출 요건</label>
                      <textarea className="form-textarea"
                        placeholder="제출물 형식, 파일 규격, 분량 등을 입력해주세요."
                        value={formData.requirement} onChange={e => setFormData({...formData,requirement:e.target.value})} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">접수 방법</label>
                      <select className="form-select"
                        value={formData.how} onChange={e => setFormData({...formData,how:e.target.value})}>
                        {['온라인','이메일','우편','직접 방문','기타'].map(o => <option key={o}>{o}</option>)}
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">접수 링크</label>
                      <input className="form-input" placeholder="https://"
                        value={formData.url} onChange={e => setFormData({...formData,url:e.target.value})} />
                    </div>
                    <div className="form-group full" style={{display:'flex',gap:8}}>
                      <button className="btn-secondary" style={{flex:1,justifyContent:'center'}}
                        onClick={() => setStep('basic')}>← 이전</button>
                      <button className="btn-primary" style={{flex:2,justifyContent:'center'}}
                        onClick={() => setStep('media')}>다음 단계 →</button>
                    </div>
                  </div>
                )}

                {/* STEP 3: Media */}
                {step === 'media' && (
                  <div>
                    <div style={{
                      border:'2px dashed var(--gray-300)',
                      borderRadius:'var(--radius-lg)',
                      padding:'48px 24px',
                      textAlign:'center',
                      marginBottom:20,
                      cursor:'pointer',
                      transition:'all 0.2s',
                      background:'var(--gray-50)'
                    }}>
                      <div style={{fontSize:48,marginBottom:12}}>🖼️</div>
                      <p style={{fontSize:16,fontWeight:700,color:'var(--gray-700)',marginBottom:6}}>포스터 이미지 업로드</p>
                      <p style={{fontSize:13,color:'var(--gray-400)',marginBottom:16}}>
                        JPG, PNG, WebP 지원 · 최대 10MB · 권장 크기: 1414×2000px (1:1.4 비율)
                      </p>
                      <button className="btn-primary">이미지 선택</button>
                    </div>
                    <div style={{
                      background:'var(--blue-light)',
                      borderRadius:'var(--radius)',
                      padding:'14px 18px',
                      fontSize:13,
                      color:'var(--blue)',
                      marginBottom:20
                    }}>
                      ✨ <strong>자동 변환 안내:</strong> 업로드된 이미지는 인스타그램(1:1), 유튜브 썸네일(16:9), 스토리(9:16) 등 각 플랫폼 규격에 맞게 자동 변환됩니다.
                    </div>
                    <div style={{display:'flex',gap:8}}>
                      <button className="btn-secondary" style={{flex:1,justifyContent:'center'}}
                        onClick={() => setStep('detail')}>← 이전</button>
                      <button className="btn-primary" style={{flex:2,justifyContent:'center'}}
                        onClick={() => setStep('review')}>AI 콘텐츠 생성 →</button>
                    </div>
                  </div>
                )}

                {/* STEP 4: Review & Publish */}
                {step === 'review' && (
                  <div>
                    {/* Preview Tabs */}
                    <div className="preview-tabs">
                      {[
                        {id:'instagram',label:'📸 인스타그램'},
                        {id:'blog',label:'📝 네이버 블로그'},
                        {id:'twitter',label:'🐦 X (트위터)'},
                      ].map(tab => (
                        <button
                          key={tab.id}
                          className={`preview-tab${previewTab===tab.id?' active':''}`}
                          onClick={() => setPreviewTab(tab.id)}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>

                    <div style={{
                      border:'1px solid var(--gray-200)',
                      borderRadius:'var(--radius-md)',
                      overflow:'hidden',
                      marginBottom:20
                    }}>
                      <div style={{
                        background:'var(--gray-50)',
                        padding:'10px 16px',
                        borderBottom:'1px solid var(--gray-200)',
                        display:'flex',justifyContent:'space-between',alignItems:'center',
                        fontSize:13,color:'var(--gray-500)'
                      }}>
                        <span>AI 생성 미리보기</span>
                        <button className="btn-secondary" style={{padding:'4px 12px',fontSize:12}}>✏️ 편집</button>
                      </div>
                      <div className="preview-box" style={{
                        whiteSpace:'pre-wrap',
                        fontFamily: previewTab === 'blog' ? 'monospace' : 'inherit'
                      }}>
                        {previewContents[previewTab]}
                      </div>
                    </div>

                    {/* Channel Selection */}
                    <div style={{marginBottom:20}}>
                      <div style={{
                        display:'flex',justifyContent:'space-between',alignItems:'center',
                        marginBottom:12
                      }}>
                        <span style={{fontWeight:700,color:'var(--gray-800)'}}>발행 채널 선택</span>
                        <button style={{fontSize:12,color:'var(--blue)',fontWeight:600,cursor:'pointer'}}>전체 선택</button>
                      </div>
                      <div className="channel-dist-grid">
                        {CHANNELS_DIST.map((ch,i) => (
                          <div key={i} className={`channel-dist-item${ch.done?' done':ch.loading?' loading':''}`}>
                            <span style={{fontSize:18}}>{ch.emoji}</span>
                            <span style={{fontSize:10}}>{ch.name}</span>
                            {ch.done && <span style={{fontSize:10}}>✓</span>}
                            {ch.loading && <span className="animate-spin" style={{fontSize:10}}>⟳</span>}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Publish Button */}
                    {!publishDone ? (
                      <>
                        {isPublishing && (
                          <div style={{marginBottom:16}}>
                            <div style={{
                              display:'flex',justifyContent:'space-between',
                              fontSize:13,fontWeight:600,marginBottom:6,color:'var(--gray-700)'
                            }}>
                              <span>발행 중...</span>
                              <span style={{color:'var(--blue)'}}>{publishProgress}%</span>
                            </div>
                            <div style={{height:8,background:'var(--gray-200)',borderRadius:4,overflow:'hidden'}}>
                              <div style={{
                                height:'100%',
                                width:`${publishProgress}%`,
                                background:'var(--blue)',
                                borderRadius:4,
                                transition:'width 0.15s'
                              }} />
                            </div>
                          </div>
                        )}
                        <div style={{display:'flex',gap:8}}>
                          <button className="btn-secondary" style={{flex:1,justifyContent:'center'}}
                            onClick={() => setStep('media')}>← 이전</button>
                          <button
                            className="btn-primary"
                            style={{flex:2,justifyContent:'center',opacity:isPublishing?0.7:1}}
                            onClick={handlePublish}
                            disabled={isPublishing}
                          >
                            {isPublishing ? '⟳ 발행 중...' : '🚀 40개 채널 동시 발행'}
                          </button>
                        </div>
                      </>
                    ) : (
                      <div style={{
                        textAlign:'center',
                        padding:'32px',
                        background:'linear-gradient(135deg,var(--blue-light),#F0FFF4)',
                        borderRadius:'var(--radius-lg)',
                        border:'2px solid var(--green)'
                      }}>
                        <div style={{fontSize:48,marginBottom:12}}>🎉</div>
                        <h3 style={{fontSize:20,fontWeight:800,color:'var(--gray-900)',marginBottom:8}}>발행 완료!</h3>
                        <p style={{fontSize:14,color:'var(--gray-600)',marginBottom:20}}>
                          40개 채널에 성공적으로 발행되었습니다.
                        </p>
                        <div style={{display:'flex',gap:10,justifyContent:'center'}}>
                          <button className="btn-secondary" onClick={() => {
                            setPublishDone(false);setStep('basic');
                            setFormData({title:'',org:'',orgType:'기업',startDate:'',endDate:'',deadline:'',prize:'',prizeAmount:'',target:[],targetEtc:'',benefit:[],field1:'',field2:'',field3:'',how:'온라인',url:'',desc:'',requirement:''})
                          }}>새 대회 등록</button>
                          <button className="btn-primary" onClick={() => setActiveNav('stats')}>성과 분석 보기 →</button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Publish Tab */}
            {activeNav === 'publish' && (
              <div className="dash-card">
                <h2 className="dash-card-title">🚀 AI 자동 발행</h2>
                <p style={{color:'var(--gray-500)',marginBottom:24,fontSize:14}}>
                  등록된 대회를 선택하고 원클릭으로 40개 채널에 동시 발행하세요.
                </p>
                <div style={{
                  background:'var(--gray-50)',borderRadius:'var(--radius-md)',
                  padding:24,textAlign:'center'
                }}>
                  <div style={{fontSize:48,marginBottom:12}}>📋</div>
                  <p style={{fontWeight:700,marginBottom:8}}>등록된 대회를 먼저 선택하세요</p>
                  <button className="btn-primary" onClick={() => setActiveNav('register')}>
                    대회 등록하러 가기
                  </button>
                </div>
              </div>
            )}

            {/* Stats Tab */}
            {activeNav === 'stats' && (
              <div className="dash-card">
                <h2 className="dash-card-title">📈 성과 분석</h2>
                <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:20}}>
                  {[
                    {label:'인스타그램',emoji:'📸',views:12483,likes:934,shares:234,color:'#E1306C'},
                    {label:'네이버 블로그',emoji:'📝',views:8921,likes:456,shares:123,color:'#03C75A'},
                    {label:'유튜브',emoji:'▶️',views:6723,likes:789,shares:89,color:'#FF0000'},
                    {label:'X(트위터)',emoji:'🐦',views:5234,likes:321,shares:456,color:'#000'},
                  ].map((ch,i) => (
                    <div key={i} style={{
                      background:'white',border:'1px solid var(--gray-200)',
                      borderRadius:'var(--radius-md)',padding:20,
                      borderTop:`3px solid ${ch.color}`
                    }}>
                      <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:14,fontSize:16,fontWeight:700}}>
                        <span>{ch.emoji}</span>{ch.label}
                      </div>
                      {[
                        {l:'조회수',v:ch.views.toLocaleString()},
                        {l:'좋아요',v:ch.likes.toLocaleString()},
                        {l:'공유',v:ch.shares.toLocaleString()},
                      ].map((s,j) => (
                        <div key={j} style={{
                          display:'flex',justifyContent:'space-between',
                          padding:'6px 0',borderBottom:'1px solid var(--gray-100)',fontSize:13
                        }}>
                          <span style={{color:'var(--gray-500)'}}>{s.l}</span>
                          <span style={{fontWeight:700,color:'var(--gray-800)'}}>{s.v}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Settings */}
            {activeNav === 'settings' && (
              <div className="dash-card">
                <h2 className="dash-card-title">⚙️ 계정 설정</h2>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">기관명</label>
                    <input className="form-input" defaultValue="(주)수상한콘텐츠" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">대표자명</label>
                    <input className="form-input" defaultValue="신현화, 박현학" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">연락처</label>
                    <input className="form-input" defaultValue="02-6953-1996" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">이메일</label>
                    <input className="form-input" type="email" defaultValue="abc@babkorea.com" />
                  </div>
                </div>
                <button className="btn-primary" style={{marginTop:16}}>저장하기</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
