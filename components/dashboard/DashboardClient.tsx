'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  FaInstagram, FaFacebook, FaYoutube, FaTiktok, FaLinkedin, FaPinterest,
  FaDiscord, FaTelegram, FaReddit, FaXTwitter, FaThreads, FaBandcamp,
  FaBlog, FaUserGraduate, FaRocket, FaTrophy, FaBullhorn, FaChartLine,
  FaGear, FaPlus, FaCheck, FaPenToSquare, FaEye, FaArrowLeft, FaRobot
} from 'react-icons/fa6'
import { SiNaver, SiKakaotalk, SiTistory, SiVelog } from 'react-icons/si'

/* ─── Brand Icons ─── */
const BRAND_ICON: Record<string, React.ReactNode> = {
  'Instagram':  <FaInstagram />,
  'Facebook':   <FaFacebook />,
  'YouTube':    <FaYoutube />,
  'TikTok':     <FaTiktok />,
  'X(Twitter)': <FaXTwitter />,
  'LinkedIn':   <FaLinkedin />,
  'Pinterest':  <FaPinterest />,
  'Threads':    <FaThreads />,
  'Discord':    <FaDiscord />,
  'Telegram':   <FaTelegram />,
  'Reddit':     <FaReddit />,
  'Band':       <FaBandcamp />,
  'Naver Blog': <SiNaver />,
  'Naver Cafe': <SiNaver />,
  'KakaoTalk':  <SiKakaotalk />,
  'Tistory':    <SiTistory />,
  'Velog':      <SiVelog />,
  'Brunch':     <FaBlog />,
  'Everytime':  <FaUserGraduate />,
  'Daum Cafe':  <FaBlog />,
}

/* ─── Channel Data ─── */
const SNS_CHANNELS = [
  { name:'Instagram',  color:'#E1306C', limit:'일 25개' },
  { name:'Facebook',   color:'#1877F2', limit:'일 25개' },
  { name:'YouTube',    color:'#FF0000', limit:'일 10개' },
  { name:'TikTok',     color:'#010101', limit:'일 10개' },
  { name:'X(Twitter)', color:'#000000', limit:'일 300개' },
  { name:'Threads',    color:'#000000', limit:'일 25개' },
  { name:'LinkedIn',   color:'#0A66C2', limit:'일 10개' },
  { name:'Pinterest',  color:'#E60023', limit:'일 50개' },
  { name:'Discord',    color:'#5865F2', limit:'일 100개' },
  { name:'Telegram',   color:'#26A5E4', limit:'일 200개' },
  { name:'Reddit',     color:'#FF4500', limit:'일 5개' },
  { name:'Band',       color:'#5BBA00', limit:'일 20개' },
  { name:'Everytime',  color:'#E03131', limit:'일 3개' },
  { name:'Daum Cafe',  color:'#FF5A00', limit:'일 10개' },
  { name:'KakaoTalk',  color:'#FEE500', limit:'일 50개' },
]

const BLOG_CHANNELS = [
  { name:'Naver Blog', color:'#03C75A', limit:'일 15개' },
  { name:'Naver Cafe', color:'#03C75A', limit:'일 20개' },
  { name:'Tistory',    color:'#FF6600', limit:'일 5개' },
  { name:'Velog',      color:'#20C997', limit:'일 5개' },
  { name:'Brunch',     color:'#555555', limit:'일 5개' },
]

const CONTEST_SITES = [
  { name:'씽굿',       color:'#FF6B35' }, { name:'위비티',     color:'#6C63FF' },
  { name:'콘테스트코리아', color:'#E63946' }, { name:'공모전알고', color:'#2196F3' },
  { name:'g콘테스트',  color:'#4CAF50' }, { name:'공모전인덱스', color:'#FF9800' },
  { name:'공모탑',     color:'#9C27B0' }, { name:'대티즌',     color:'#00BCD4' },
  { name:'데메이드',   color:'#F44336' }, { name:'더팀즈',     color:'#3F51B5' },
  { name:'디자인잡',   color:'#009688' }, { name:'디자인정글', color:'#4CAF50' },
  { name:'스펙토리',   color:'#FF5722' }, { name:'라우더스',   color:'#E91E63' },
  { name:'링커리어',   color:'#2196F3' }, { name:'슈퍼루키',   color:'#FFC107' },
  { name:'알럽콘',     color:'#F44336' }, { name:'요즘것들',   color:'#FF6B6B' },
  { name:'인크루트',   color:'#0066CC' }, { name:'캠퍼스픽',   color:'#FF4081' },
  { name:'캠퍼즈',     color:'#7C4DFF' }, { name:'에브리타임', color:'#E03131' },
  { name:'이벤터스',   color:'#FF6D00' },
]

const COMMUNITY_SITES = [
  { name:'에브리타임', color:'#FF4757' }, { name:'클리앙',     color:'#00BFFF' },
  { name:'루리웹',     color:'#FF6347' }, { name:'디시인사이드', color:'#00A86B' },
  { name:'블라인드',   color:'#333333' }, { name:'링커리어',   color:'#607D8B' },
  { name:'취뽀',       color:'#FF8C00' }, { name:'잡플래닛',   color:'#5C6BC0' },
  { name:'사람인',     color:'#1E90FF' }, { name:'잡코리아',   color:'#E53935' },
  { name:'인크루트',   color:'#009688' }, { name:'카페인',     color:'#795548' },
  { name:'네이버 카페', color:'#03C75A' }, { name:'다음 카페',  color:'#FF5A00' },
  { name:'이벤터스',   color:'#2196F3' }, { name:'위시켓',     color:'#7C4DFF' },
  { name:'크몽',       color:'#00BFA5' }, { name:'탈잉',       color:'#FF6D00' },
  { name:'숨고',       color:'#26A69A' }, { name:'인벤',       color:'#4A90D9' },
]

const AI_PREVIEW: Record<string, string> = {
  'Instagram': `🏆 [대회명]에 도전하세요!\n\n✨ 당신의 아이디어가 세상을 바꿀 수 있습니다.\n📅 접수: 2025.05.01 ~ 06.30\n💰 총상금: 3,000만원\n\n지금 바로 링크를 클릭해 지원하세요 🔗\n\n#공모전 #대외활동 #오늘의대회 #청년창업 #아이디어공모전`,
  'Naver Blog': `[대회 안내] 2025 청년 창업 아이디어 대회 참가자 모집\n\n안녕하세요! 오늘은 중소벤처기업부에서 주최하는 '2025 청년 창업 아이디어 대회'를 소개합니다.\n\n이 대회는 청년들의 혁신적인 아이디어를 발굴하고 지원하기 위해 마련되었습니다.\n\n■ 접수기간: 2025년 5월 1일 ~ 6월 30일\n■ 시상규모: 총상금 3,000만원\n■ 참여대상: 만 19세 ~ 39세 대한민국 국적자\n\n자세한 내용은 공식 홈페이지를 방문하세요.`,
  'X(Twitter)': `🚀 [2025 청년 창업 아이디어 대회] 참가자 모집!\n\n💡 아이디어 하나로 3,000만원 주인공이 될 수 있습니다\n📅 접수: 5/1~6/30\n🔗 todaycontest.kr\n\n#공모전 #청년창업 #아이디어대회`,
  '커뮤니티': `안녕하세요!\n\n2025 청년 창업 아이디어 대회 공고 드립니다.\n\n- 주최: 중소벤처기업부\n- 접수: 2025.05.01 ~ 06.30\n- 시상: 총 3,000만원\n- 대상: 만 19~39세 청년\n\n많은 관심과 참여 부탁드립니다 😊`,
}

const STATUS_DATA = [
  { st:'done',      time:'2025-05-01 09:00', url:'https://instagram.com/p/abc123' },
  { st:'done',      time:'2025-05-01 09:05', url:'https://facebook.com/post/111' },
  { st:'progress',  time:'진행 중',           url:'' },
  { st:'scheduled', time:'2025-05-02 10:00', url:'' },
  { st:'done',      time:'2025-05-01 09:15', url:'https://twitter.com/post/222' },
  { st:'done',      time:'2025-05-01 09:20', url:'https://blog.naver.com/post/333' },
  { st:'done',      time:'2025-05-01 09:22', url:'https://cafe.naver.com/444' },
  { st:'done',      time:'2025-05-01 09:25', url:'https://open.kakao.com/555' },
  { st:'done',      time:'2025-05-01 09:30', url:'https://brunch.co.kr/1' },
  { st:'progress',  time:'진행 중',           url:'' },
  { st:'progress',  time:'진행 중',           url:'' },
  { st:'done',      time:'2025-05-01 09:40', url:'https://band.us/666' },
  { st:'scheduled', time:'2025-05-03 09:00', url:'' },
  { st:'done',      time:'2025-05-01 09:45', url:'https://linkedin.com/777' },
  { st:'done',      time:'2025-05-01 09:50', url:'https://pinterest.com/888' },
  { st:'done',      time:'2025-05-01 09:55', url:'https://discord.com/999' },
  { st:'done',      time:'2025-05-01 10:00', url:'https://t.me/000' },
  { st:'progress',  time:'진행 중',           url:'' },
  { st:'done',      time:'2025-05-01 10:10', url:'https://everytime.kr/aaa' },
  { st:'done',      time:'2025-05-01 10:15', url:'https://cafe.daum.net/bbb' },
]

type Tab = 'overview' | 'write' | 'publish' | 'status' | 'stats' | 'settings'
type PostType = '' | 'contest' | 'general'
type WriteStep = 1 | 2 | 3

interface ContestForm {
  title:string; org:string; host:string; sponsor:string; regStart:string; regEnd:string
  totalPrize:string; prize:string; targets:string[]; category:string
  desc:string; how:string; eligibility:string; website:string; applyUrl:string
  manager:string; contact:string; email:string
}
interface GeneralForm {
  title:string; purpose:string; target:string; landingUrl:string
  headline:string; desc:string; image:string
}

const EMPTY_CONTEST: ContestForm = {
  title:'', org:'', host:'', sponsor:'', regStart:'', regEnd:'', totalPrize:'', prize:'',
  targets:[], category:'공모전', desc:'', how:'', eligibility:'', website:'', applyUrl:'',
  manager:'', contact:'', email:''
}
const EMPTY_GENERAL: GeneralForm = {
  title:'', purpose:'채용', target:'', landingUrl:'', headline:'', desc:'', image:''
}
const TARGET_LIST = ['대학생','고등학생','일반인','청소년','직장인','프리랜서','누구나']

export default function DashboardClient() {
  const [tab, setTab]           = useState<Tab>('overview')
  const [postType, setPostType] = useState<PostType>('')
  const [writeStep, setWriteStep] = useState<WriteStep>(1)
  const [showModal, setShowModal] = useState(false)
  const [publishing, setPublishing] = useState(false)
  const [publishDone, setPublishDone] = useState(false)
  const [aiTab, setAiTab]       = useState('Instagram')
  const [contestForm, setContestForm] = useState<ContestForm>(EMPTY_CONTEST)
  const [generalForm, setGeneralForm] = useState<GeneralForm>(EMPTY_GENERAL)
  const [selectedChannels, setSelectedChannels] = useState<string[]>(['Instagram','Naver Blog','KakaoTalk','X(Twitter)'])
  const [selectedSites,    setSelectedSites]    = useState<string[]>(CONTEST_SITES.slice(0,10).map(s=>s.name))
  const [selectedCommunity,setSelectedCommunity]= useState<string[]>(COMMUNITY_SITES.slice(0,5).map(s=>s.name))

  const ALL_CHANNELS = [...SNS_CHANNELS, ...BLOG_CHANNELS]
  const totalSelected = selectedChannels.length + selectedSites.length + selectedCommunity.length

  const toggleCh  = (ch:string) => setSelectedChannels(s => s.includes(ch)?s.filter(x=>x!==ch):[...s,ch])
  const toggleSite= (s:string)  => setSelectedSites(ss => ss.includes(s)?ss.filter(x=>x!==s):[...ss,s])
  const toggleCom = (s:string)  => setSelectedCommunity(ss => ss.includes(s)?ss.filter(x=>x!==s):[...ss,s])
  const toggleTarget = (t:string) => setContestForm(f=>({
    ...f, targets: f.targets.includes(t)?f.targets.filter(x=>x!==t):[...f.targets,t]
  }))

  const handleSaveAndDeploy = () => setShowModal(true)
  const handleStartAI = () => { setShowModal(false); setWriteStep(3) }
  const handlePublish = () => {
    setPublishing(true)
    setTimeout(()=>{ setPublishing(false); setPublishDone(true); setTab('status') }, 2500)
  }
  const startNew = () => {
    setPostType(''); setWriteStep(1); setShowModal(false)
    setPublishDone(false); setContestForm(EMPTY_CONTEST); setGeneralForm(EMPTY_GENERAL)
    setTab('write')
  }

  const navItems = [
    { key:'overview' as Tab, icon:<FaChartLine/>,  label:'게시글 등록 현황' },
    { key:'write'    as Tab, icon:<FaPenToSquare/>,  label:'새 게시글 작성' },
    { key:'publish'  as Tab, icon:<FaRocket/>,      label:'발행 관리' },
    { key:'status'   as Tab, icon:<FaEye/>,         label:'채널 현황' },
    { key:'stats'    as Tab, icon:<FaChartLine/>,   label:'성과 분석' },
    { key:'settings' as Tab, icon:<FaGear/>,         label:'설정' },
  ]

  /* ── Channel Checkbox Button ── */
  const ChBtn = ({ ch, selected, onToggle }: { ch:{name:string,color:string,limit?:string}, selected:boolean, onToggle:()=>void }) => (
    <button onClick={onToggle}
      className="group flex items-center gap-3 px-4 py-3 rounded-2xl border-2 transition-all duration-300 cursor-pointer text-left w-full hover:shadow-md"
      style={{
        borderColor: selected ? ch.color : '#E1E4E8',
        background:  selected ? ch.color+'12' : '#fff',
        boxShadow:   selected ? `0 0 0 3px ${ch.color}22` : undefined,
        transform:   selected ? 'translateY(-1px)' : undefined,
      }}>
      <span className="flex items-center justify-center w-9 h-9 rounded-xl text-lg shrink-0" style={{ background:ch.color+'22', color:ch.color }}>
        {BRAND_ICON[ch.name] || '📌'}
      </span>
      <span className="flex flex-col flex-1 min-w-0">
        <span className="font-bold text-sm text-gray-900 truncate">{ch.name}</span>
        {ch.limit && <span className="text-xs text-gray-400">{ch.limit}</span>}
      </span>
      <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all duration-200"
        style={{ background:selected?ch.color:'#E1E4E8', color:selected?'#fff':'transparent' }}>
        {selected && <FaCheck/>}
      </span>
    </button>
  )

  /* ── Section Header with Select All ── */
  const SecHeader = ({ badge, badgeColor, title, count, total, onAll, onNone }:
    { badge:string; badgeColor:string; title:string; count:number; total:number; onAll:()=>void; onNone:()=>void }) => (
    <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
      <div className="flex items-center gap-2">
        <span className="px-2.5 py-1 rounded-full text-xs font-bold" style={{ background:badgeColor+'22', color:badgeColor }}>{badge}</span>
        <h3 className="text-base font-extrabold text-gray-900">{title}</h3>
        <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-500">{count}/{total}</span>
      </div>
      <div className="flex gap-2">
        <button onClick={onAll}  className="px-4 py-1.5 rounded-full text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200">전체 선택</button>
        <button onClick={onNone} className="px-4 py-1.5 rounded-full text-xs font-bold border border-gray-200 text-gray-600 hover:bg-gray-50 transition-all duration-200">전체 해제</button>
      </div>
    </div>
  )

  /* ── Pub Row (horizontal card) ── */
  const PubRow = ({ ch, d }: { ch:{name:string,color:string}, d:{st:string,time:string,url:string} }) => {
    const stMap: Record<string,{label:string,bg:string,text:string}> = {
      done:      { label:'진행완료', bg:'#D1FAE5', text:'#059669' },
      progress:  { label:'진행중',   bg:'#DBEAFE', text:'#2563EB' },
      scheduled: { label:'발행예정', bg:'#FEF3C7', text:'#D97706' },
      wait:      { label:'대기',     bg:'#F1F3F5', text:'#6B7280' },
    }
    const s = stMap[d.st] || stMap.wait
    return (
      <div className="flex items-center gap-4 px-5 py-3.5 rounded-2xl border-2 transition-all duration-200 hover:shadow-md mb-2"
        style={{
          borderColor: d.st==='done'?'#A7F3D0':d.st==='progress'?'#BAE6FD':d.st==='scheduled'?'#FDE68A':'#E1E4E8',
          background:  d.st==='done'?'#F0FDF9':d.st==='progress'?'#F0F9FF':d.st==='scheduled'?'#FFFDF0':'#fff'
        }}>
        <div className="flex items-center gap-3 w-44 shrink-0">
          <span className="w-9 h-9 rounded-xl flex items-center justify-center text-lg" style={{ background:ch.color+'22', color:ch.color }}>
            {BRAND_ICON[ch.name] || '📌'}
          </span>
          <div className="font-bold text-sm text-gray-900">{ch.name}</div>
        </div>
        <div className="flex items-center gap-3 flex-1">
          <span className="px-3 py-1 rounded-full text-xs font-bold shrink-0" style={{ background:s.bg, color:s.text }}>{s.label}</span>
          <span className="text-xs text-gray-500">
            {d.st==='done'?`✅ ${d.time}`:d.st==='scheduled'?`📅 ${d.time}`:d.st==='progress'?'⏳ 발행 중...':'대기 중'}
          </span>
        </div>
        <div className="shrink-0">
          {d.url
            ? <a href={d.url} target="_blank" rel="noopener noreferrer"
                className="px-4 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-all duration-200">게시글 보기 →</a>
            : <span className="text-xs text-gray-400">{d.st==='scheduled'?'발행 후 생성':d.st==='progress'?'발행 중...':'-'}</span>
          }
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-50" style={{ marginTop:56 }}>

      {/* ─── Sidebar ─── */}
      <aside className="w-64 shrink-0 bg-white border-r border-gray-200 flex flex-col" style={{ minHeight:'calc(100vh - 56px)' }}>
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-100 flex items-center justify-center text-xl">🏢</div>
            <div>
              <div className="font-bold text-gray-900 text-sm">홍길동 주최사</div>
              <div className="text-xs text-blue-600 font-semibold">Standard 플랜</div>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 flex flex-col gap-1">
          {navItems.map(item => (
            <button key={item.key}
              onClick={() => { setTab(item.key); if(item.key==='write'){ setPostType(''); setWriteStep(1) } }}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 text-left ${tab===item.key?'bg-blue-600 text-white shadow-md':'text-gray-600 hover:bg-gray-100'}`}>
              <span className="text-base">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-100">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold text-gray-500 hover:bg-gray-100 transition-all duration-200">
            🏠 메인으로
          </Link>
        </div>
      </aside>

      {/* ─── Main ─── */}
      <main className="flex-1 p-8 overflow-y-auto">

        {/* ══ 게시글 등록 현황 (overview) ══ */}
        {tab === 'overview' && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-extrabold text-gray-900">게시글 등록 현황</h1>
                <p className="text-gray-500 mt-1 text-sm">등록한 게시글과 배포 현황을 확인하세요</p>
              </div>
              <button onClick={startNew}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                <FaPlus className="text-xs"/> 새 게시글 작성
              </button>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-8">
              {[
                { label:'등록 게시글',  value:'3건',    icon:'🏆', bg:'#EBF1FF', col:'#0052FF' },
                { label:'발행된 채널',  value:'120개',  icon:'📡', bg:'#F0FFF4', col:'#2F9E44' },
                { label:'총 조회수',    value:'45,230', icon:'👁️', bg:'#FFF9E6', col:'#E67700' },
                { label:'총 신청/클릭', value:'1,240',  icon:'👥', bg:'#FFF1F2', col:'#C92A2A' },
              ].map((s,i) => (
                <div key={i} className="rounded-2xl p-5 flex flex-col gap-2" style={{ background:s.bg }}>
                  <div className="text-2xl">{s.icon}</div>
                  <div className="text-2xl font-extrabold" style={{ color:s.col }}>{s.value}</div>
                  <div className="text-xs font-semibold text-gray-500">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h2 className="text-base font-extrabold text-gray-900 mb-4">📋 최근 등록한 게시글</h2>
              <div className="flex flex-col gap-3">
                {[
                  { title:'2025 청년 창업 아이디어 대회', type:'공모전', status:'진행완료', ch:40, views:12500 },
                  { title:'2025 여름 채용 홍보 캠페인',   type:'채용',   status:'진행중',  ch:25, views:3200 },
                  { title:'신제품 K-뷰티 런칭 이벤트',    type:'이벤트', status:'발행예정', ch:0,  views:0 },
                ].map((c,i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 hover:shadow-md transition-all duration-200">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-600">{c.type}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-sm text-gray-900 truncate">{c.title}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{c.ch}개 채널 · 조회 {c.views.toLocaleString()}</div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${c.status==='진행완료'?'bg-green-100 text-green-700':c.status==='진행중'?'bg-blue-100 text-blue-700':'bg-yellow-100 text-yellow-700'}`}>{c.status}</span>
                    <button onClick={()=>setTab('status')} className="px-4 py-1.5 rounded-xl text-xs font-bold border border-gray-200 text-gray-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-200">상세보기 →</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ══ 새 게시글 작성 ══ */}
        {tab === 'write' && (
          <div>

            {/* ── STEP 1: 유형 선택 (large modal-style cards) ── */}
            {writeStep === 1 && (
              <div>
                <div className="mb-8 text-center">
                  <h1 className="text-2xl font-extrabold text-gray-900">새 게시글 작성</h1>
                  <p className="text-gray-500 mt-2 text-sm">어떤 내용을 홍보하시겠습니까? 유형을 선택해주세요.</p>
                </div>

                <div className="grid grid-cols-2 gap-6 max-w-3xl mx-auto">

                  {/* 공모전/대회 홍보 */}
                  <button
                    onClick={() => { setPostType('contest'); setWriteStep(2) }}
                    className="group relative flex flex-col items-start text-left p-8 rounded-3xl border-2 border-gray-200 bg-white hover:border-blue-500 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                  >
                    {/* Top accent bar */}
                    <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl bg-blue-600 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-4xl mb-5 group-hover:bg-blue-100 transition-all duration-300">🏆</div>
                    <h3 className="text-xl font-extrabold text-gray-900 mb-2">공모전 / 대회 홍보</h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-5">대회명, 접수기간, 시상규모 등<br/>공모전 전용 정보를 입력합니다</p>
                    <div className="flex flex-col gap-1.5 mb-5">
                      {['대회명 & 주최·주관기관','접수기간','시상 규모 & 총상금','참여 대상','상세 모집요강','포스터 이미지 업로드'].map((f,i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-gray-600">
                          <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">✓</span>
                          {f}
                        </div>
                      ))}
                    </div>
                    <div className="mt-auto w-full py-2.5 rounded-2xl bg-blue-600 text-white text-sm font-bold text-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      공모전 홍보 시작하기 →
                    </div>
                  </button>

                  {/* 일반 마케팅 / 채용 */}
                  <button
                    onClick={() => { setPostType('general'); setWriteStep(2) }}
                    className="group relative flex flex-col items-start text-left p-8 rounded-3xl border-2 border-gray-200 bg-white hover:border-orange-500 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                  >
                    <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl bg-orange-500 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    <div className="w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center text-4xl mb-5 group-hover:bg-orange-100 transition-all duration-300">📢</div>
                    <h3 className="text-xl font-extrabold text-gray-900 mb-2">일반 마케팅 / 채용 홍보</h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-5">채용 공고, 신제품 출시, 이벤트 등<br/>범용 마케팅 콘텐츠를 작성합니다</p>
                    <div className="flex flex-col gap-1.5 mb-5">
                      {['홍보 제목 & 목적','타겟 고객 설정','랜딩 페이지 URL','핵심 문구 & 혜택','상세 설명','이미지 업로드'].map((f,i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-gray-600">
                          <span className="w-4 h-4 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-bold">✓</span>
                          {f}
                        </div>
                      ))}
                    </div>
                    <div className="mt-auto w-full py-2.5 rounded-2xl bg-orange-500 text-white text-sm font-bold text-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      마케팅 홍보 시작하기 →
                    </div>
                  </button>
                </div>

                <p className="text-center text-xs text-gray-400 mt-8">
                  AI가 선택한 유형에 맞게 70개 채널 맞춤 콘텐츠를 자동으로 생성합니다
                </p>
              </div>
            )}

            {/* ── STEP 2: 폼 입력 ── */}
            {writeStep === 2 && (
              <div>
                {/* Progress bar */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <button onClick={()=>setWriteStep(1)} className="flex items-center gap-1.5 text-gray-400 hover:text-gray-700 transition-colors text-sm">
                      <FaArrowLeft/> 뒤로
                    </button>
                    <div className="flex items-center gap-2">
                      {[1,2,3].map(s => (
                        <div key={s} className="flex items-center gap-2">
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${writeStep>=s?'bg-blue-600 text-white':'bg-gray-200 text-gray-400'}`}>{s}</div>
                          {s < 3 && <div className={`w-12 h-1 rounded-full ${writeStep>s?'bg-blue-600':'bg-gray-200'}`}/>}
                        </div>
                      ))}
                    </div>
                    <div>
                      <h1 className="text-xl font-extrabold text-gray-900">
                        {postType==='contest'?'🏆 공모전 / 대회 정보 입력':'📢 마케팅 / 채용 정보 입력'}
                      </h1>
                      <p className="text-sm text-gray-400 mt-0.5">정보를 입력하면 AI가 채널별 맞춤 콘텐츠를 생성합니다</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-gray-200 p-8 max-w-3xl">

                  {/* ── 공모전 폼 ── */}
                  {postType === 'contest' && (
                    <div className="grid grid-cols-2 gap-5">
                      <div className="col-span-2">
                        <label className="block text-sm font-bold text-gray-700 mb-2">대회명 <span className="text-red-500">*</span></label>
                        <input className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all duration-200 text-sm"
                          placeholder="예: 2025 청년 창업 아이디어 대회"
                          value={contestForm.title} onChange={e=>setContestForm(f=>({...f,title:e.target.value}))} />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">주최기관 <span className="text-red-500">*</span></label>
                        <input className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all duration-200 text-sm"
                          placeholder="예: 중소벤처기업부"
                          value={contestForm.org} onChange={e=>setContestForm(f=>({...f,org:e.target.value}))} />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">주관기관</label>
                        <input className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all duration-200 text-sm"
                          placeholder="예: 한국창업진흥원"
                          value={contestForm.host} onChange={e=>setContestForm(f=>({...f,host:e.target.value}))} />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">후원기관</label>
                        <input className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all duration-200 text-sm"
                          placeholder="예: 삼성전자"
                          value={contestForm.sponsor} onChange={e=>setContestForm(f=>({...f,sponsor:e.target.value}))} />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">접수 시작일 <span className="text-red-500">*</span></label>
                        <input type="date" className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all duration-200 text-sm"
                          value={contestForm.regStart} onChange={e=>setContestForm(f=>({...f,regStart:e.target.value}))} />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">접수 마감일 <span className="text-red-500">*</span></label>
                        <input type="date" className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all duration-200 text-sm"
                          value={contestForm.regEnd} onChange={e=>setContestForm(f=>({...f,regEnd:e.target.value}))} />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">총상금</label>
                        <input className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all duration-200 text-sm"
                          placeholder="예: 총상금 3,000만원"
                          value={contestForm.totalPrize} onChange={e=>setContestForm(f=>({...f,totalPrize:e.target.value}))} />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">시상 내역</label>
                        <input className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all duration-200 text-sm"
                          placeholder="예: 대상 500만원, 최우수상 200만원"
                          value={contestForm.prize} onChange={e=>setContestForm(f=>({...f,prize:e.target.value}))} />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-sm font-bold text-gray-700 mb-2">참여 대상</label>
                        <div className="flex flex-wrap gap-2">
                          {TARGET_LIST.map(t => (
                            <button key={t} onClick={()=>toggleTarget(t)}
                              className={`px-4 py-2 rounded-full text-xs font-bold border-2 transition-all duration-200 ${contestForm.targets.includes(t)?'bg-blue-600 text-white border-blue-600':'border-gray-200 text-gray-600 hover:border-blue-300'}`}>
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">대회 홈페이지</label>
                        <input type="url" className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all duration-200 text-sm"
                          placeholder="https://example.com"
                          value={contestForm.website} onChange={e=>setContestForm(f=>({...f,website:e.target.value}))} />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">접수 URL</label>
                        <input type="url" className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all duration-200 text-sm"
                          placeholder="https://example.com/apply"
                          value={contestForm.applyUrl} onChange={e=>setContestForm(f=>({...f,applyUrl:e.target.value}))} />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">담당자명</label>
                        <input className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all duration-200 text-sm"
                          placeholder="홍길동" value={contestForm.manager} onChange={e=>setContestForm(f=>({...f,manager:e.target.value}))} />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">연락처</label>
                        <input className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all duration-200 text-sm"
                          placeholder="02-0000-0000" value={contestForm.contact} onChange={e=>setContestForm(f=>({...f,contact:e.target.value}))} />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-sm font-bold text-gray-700 mb-2">대회 소개 / 상세 모집요강</label>
                        <textarea rows={5} className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all duration-200 text-sm resize-none"
                          placeholder="대회에 대한 소개와 모집요강을 입력하면 AI가 더 정확한 콘텐츠를 생성합니다"
                          value={contestForm.desc} onChange={e=>setContestForm(f=>({...f,desc:e.target.value}))} />
                      </div>
                      {/* 포스터 업로드 */}
                      <div className="col-span-2">
                        <label className="block text-sm font-bold text-gray-700 mb-2">포스터 이미지 업로드</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-blue-400 transition-all duration-200 cursor-pointer">
                          <div className="text-4xl mb-2">🖼️</div>
                          <div className="text-sm font-bold text-gray-600 mb-1">클릭하거나 드래그하여 업로드</div>
                          <div className="text-xs text-gray-400">JPG, PNG · 최대 10MB · 권장 1080×1350px</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ── 일반 마케팅 폼 ── */}
                  {postType === 'general' && (
                    <div className="grid grid-cols-2 gap-5">
                      <div className="col-span-2">
                        <label className="block text-sm font-bold text-gray-700 mb-2">홍보 제목 <span className="text-red-500">*</span></label>
                        <input className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all duration-200 text-sm"
                          placeholder="예: 2025 하반기 신입 개발자 채용"
                          value={generalForm.title} onChange={e=>setGeneralForm(f=>({...f,title:e.target.value}))} />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">홍보 목적 <span className="text-red-500">*</span></label>
                        <select className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all duration-200 text-sm"
                          value={generalForm.purpose} onChange={e=>setGeneralForm(f=>({...f,purpose:e.target.value}))}>
                          <option>채용</option><option>신제품 출시</option><option>이벤트/프로모션</option><option>브랜드 인지도</option><option>기타</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">타겟 고객</label>
                        <input className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all duration-200 text-sm"
                          placeholder="예: 20-30대 개발자"
                          value={generalForm.target} onChange={e=>setGeneralForm(f=>({...f,target:e.target.value}))} />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">랜딩 페이지 URL</label>
                        <input type="url" className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all duration-200 text-sm"
                          placeholder="https://example.com/landing"
                          value={generalForm.landingUrl} onChange={e=>setGeneralForm(f=>({...f,landingUrl:e.target.value}))} />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">핵심 문구</label>
                        <input className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all duration-200 text-sm"
                          placeholder="예: 연봉 6천, 원격 근무, 스톡옵션"
                          value={generalForm.headline} onChange={e=>setGeneralForm(f=>({...f,headline:e.target.value}))} />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-sm font-bold text-gray-700 mb-2">상세 설명</label>
                        <textarea rows={5} className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all duration-200 text-sm resize-none"
                          placeholder="홍보 내용을 상세히 입력해주세요"
                          value={generalForm.desc} onChange={e=>setGeneralForm(f=>({...f,desc:e.target.value}))} />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-sm font-bold text-gray-700 mb-2">이미지 업로드</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-orange-400 transition-all duration-200 cursor-pointer">
                          <div className="text-4xl mb-2">🖼️</div>
                          <div className="text-sm font-bold text-gray-600 mb-1">클릭하거나 드래그하여 업로드</div>
                          <div className="text-xs text-gray-400">JPG, PNG · 최대 10MB</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ── 채널 선택 ── */}
                  <div className="mt-8 pt-8 border-t border-gray-100">
                    <h3 className="text-base font-extrabold text-gray-900 mb-6">📡 발행할 채널 선택</h3>

                    <div className="mb-6">
                      <SecHeader badge="SNS" badgeColor="#E1306C" title="SNS 채널"
                        count={SNS_CHANNELS.filter(c=>selectedChannels.includes(c.name)).length} total={SNS_CHANNELS.length}
                        onAll={()=>setSelectedChannels(p=>[...new Set([...p,...SNS_CHANNELS.map(c=>c.name)])])}
                        onNone={()=>setSelectedChannels(p=>p.filter(c=>!SNS_CHANNELS.some(s=>s.name===c)))}/>
                      <div className="grid grid-cols-3 gap-2.5">
                        {SNS_CHANNELS.map(ch=><ChBtn key={ch.name} ch={ch} selected={selectedChannels.includes(ch.name)} onToggle={()=>toggleCh(ch.name)}/>)}
                      </div>
                    </div>

                    <div className="mb-6">
                      <SecHeader badge="블로그" badgeColor="#03C75A" title="블로그 채널"
                        count={BLOG_CHANNELS.filter(c=>selectedChannels.includes(c.name)).length} total={BLOG_CHANNELS.length}
                        onAll={()=>setSelectedChannels(p=>[...new Set([...p,...BLOG_CHANNELS.map(c=>c.name)])])}
                        onNone={()=>setSelectedChannels(p=>p.filter(c=>!BLOG_CHANNELS.some(b=>b.name===c)))}/>
                      <div className="grid grid-cols-3 gap-2.5">
                        {BLOG_CHANNELS.map(ch=><ChBtn key={ch.name} ch={ch} selected={selectedChannels.includes(ch.name)} onToggle={()=>toggleCh(ch.name)}/>)}
                      </div>
                    </div>

                    <div className="mb-6">
                      <SecHeader badge="공모전" badgeColor="#6C63FF" title="공모전 사이트"
                        count={selectedSites.length} total={CONTEST_SITES.length}
                        onAll={()=>setSelectedSites(CONTEST_SITES.map(s=>s.name))}
                        onNone={()=>setSelectedSites([])}/>
                      <div className="grid grid-cols-3 gap-2.5">
                        {CONTEST_SITES.map(s=><ChBtn key={s.name} ch={{...s,limit:'공모전 사이트'}} selected={selectedSites.includes(s.name)} onToggle={()=>toggleSite(s.name)}/>)}
                      </div>
                    </div>

                    <div className="mb-6">
                      <SecHeader badge="커뮤니티" badgeColor="#FF6B35" title="커뮤니티 채널"
                        count={selectedCommunity.length} total={COMMUNITY_SITES.length}
                        onAll={()=>setSelectedCommunity(COMMUNITY_SITES.map(s=>s.name))}
                        onNone={()=>setSelectedCommunity([])}/>
                      <div className="grid grid-cols-3 gap-2.5">
                        {COMMUNITY_SITES.map(s=><ChBtn key={s.name} ch={{...s,limit:'커뮤니티'}} selected={selectedCommunity.includes(s.name)} onToggle={()=>toggleCom(s.name)}/>)}
                      </div>
                    </div>

                    {/* Summary */}
                    <div className="flex items-center flex-wrap gap-4 p-5 rounded-2xl bg-blue-50 border border-blue-100">
                      {[
                        { label:'SNS',   val:SNS_CHANNELS.filter(c=>selectedChannels.includes(c.name)).length },
                        { label:'블로그', val:BLOG_CHANNELS.filter(c=>selectedChannels.includes(c.name)).length },
                        { label:'공모전', val:selectedSites.length },
                        { label:'커뮤니티',val:selectedCommunity.length },
                      ].map((item,i)=>(
                        <div key={i} className="flex items-center gap-2 text-sm">
                          <span className="text-gray-500 font-medium">{item.label}</span>
                          <strong className="text-blue-600 text-base font-extrabold">{item.val}개</strong>
                        </div>
                      ))}
                      <div className="ml-auto pl-4 border-l border-blue-200 text-sm text-gray-700">
                        합계 <strong className="text-lg font-extrabold text-blue-700">{totalSelected}개</strong> 선택
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <button onClick={()=>setWriteStep(1)} className="px-6 py-3 rounded-2xl border-2 border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50 transition-all duration-200">← 이전</button>
                    <button onClick={handleSaveAndDeploy}
                      className="flex-1 py-3 rounded-2xl bg-blue-600 text-white font-extrabold text-sm hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                      🚀 저장 및 AI 배포 준비
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ── STEP 3: AI 채널별 미리보기 에디터 ── */}
            {writeStep === 3 && (
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <button onClick={()=>setWriteStep(2)} className="flex items-center gap-1.5 text-gray-400 hover:text-gray-700 transition-colors text-sm">
                    <FaArrowLeft/> 뒤로
                  </button>
                  <div>
                    <h1 className="text-xl font-extrabold text-gray-900">🤖 AI 채널별 맞춤 콘텐츠</h1>
                    <p className="text-sm text-gray-400 mt-0.5">AI가 각 채널에 최적화된 콘텐츠를 생성했습니다. 수정 후 발행하세요.</p>
                  </div>
                </div>

                <div className="flex gap-6" style={{ minHeight:600 }}>
                  {/* 채널 탭 리스트 */}
                  <div className="w-56 shrink-0 flex flex-col gap-2">
                    {[
                      { key:'Instagram',  color:'#E1306C', icon:<FaInstagram/> },
                      { key:'Naver Blog', color:'#03C75A', icon:<SiNaver/> },
                      { key:'X(Twitter)',color:'#000000', icon:<FaXTwitter/> },
                      { key:'커뮤니티',   color:'#FF6B35', icon:<FaBullhorn/> },
                    ].map(ch => (
                      <button key={ch.key} onClick={()=>setAiTab(ch.key)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-2xl border-2 text-sm font-bold transition-all duration-200 text-left ${aiTab===ch.key?'bg-blue-600 text-white border-blue-600 shadow-md':'bg-white border-gray-200 text-gray-700 hover:border-gray-300 hover:shadow-sm'}`}>
                        <span className="text-xl" style={{ color: aiTab===ch.key?'#fff':ch.color }}>
                          {ch.icon}
                        </span>
                        <span>{ch.key}</span>
                      </button>
                    ))}

                    <div className="mt-4 p-4 rounded-2xl bg-gray-50 border border-gray-200">
                      <div className="text-xs font-bold text-gray-500 mb-2">선택된 채널</div>
                      <div className="text-2xl font-extrabold text-blue-600">{totalSelected}개</div>
                      <div className="text-xs text-gray-400">동시 배포 예정</div>
                    </div>

                    <div className="p-3 rounded-2xl bg-green-50 border border-green-200">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-green-700 mb-1">
                        <FaRobot/> AI 생성 완료
                      </div>
                      <div className="text-xs text-green-600">각 채널별 문체 최적화 완료</div>
                    </div>
                  </div>

                  {/* 미리보기 에디터 */}
                  <div className="flex-1 bg-white rounded-3xl border border-gray-200 overflow-hidden flex flex-col">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                      {(() => {
                        const chColor = { 'Instagram':'#E1306C','Naver Blog':'#03C75A','X(Twitter)':'#000','커뮤니티':'#FF6B35' }[aiTab] || '#666'
                        const chIcon = { 'Instagram':<FaInstagram/>,'Naver Blog':<SiNaver/>,'X(Twitter)':<FaXTwitter/>,'커뮤니티':<FaBullhorn/> }[aiTab]
                        return (
                          <div className="flex items-center gap-3">
                            <span className="w-9 h-9 rounded-xl flex items-center justify-center text-lg" style={{ background:chColor+'22', color:chColor }}>
                              {chIcon}
                            </span>
                            <div>
                              <div className="font-extrabold text-gray-900 text-sm">{aiTab} 미리보기</div>
                              <div className="text-xs text-gray-400">AI 생성 콘텐츠 · 직접 수정 가능</div>
                            </div>
                          </div>
                        )
                      })()}
                      <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold">✨ AI 생성 완료</span>
                    </div>

                    {aiTab === 'Instagram' && (
                      <div className="flex gap-4 p-6 flex-1">
                        <div className="w-52 shrink-0">
                          <div className="aspect-square rounded-2xl bg-gradient-to-br from-pink-400 via-purple-500 to-orange-400 flex items-center justify-center text-white text-4xl shadow-lg">🏆</div>
                          <div className="text-xs text-center text-gray-400 mt-2">1:1 정방형 크롭</div>
                          <button className="w-full mt-2 py-2 rounded-xl border-2 border-dashed border-gray-300 text-xs text-gray-500 hover:border-blue-400 hover:text-blue-500 transition-all duration-200">📷 이미지 변경</button>
                        </div>
                        <div className="flex-1 flex flex-col gap-2">
                          <div className="text-xs font-bold text-gray-500 mb-1">캡션 텍스트 (수정 가능)</div>
                          <textarea className="flex-1 w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-pink-400 focus:outline-none text-sm resize-none transition-all duration-200" defaultValue={AI_PREVIEW['Instagram']} />
                          <div className="flex items-center justify-between text-xs text-gray-400">
                            <span>#해시태그 자동 추가됨</span>
                            <span>0/2,200자</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {aiTab === 'Naver Blog' && (
                      <div className="flex-1 p-6 flex flex-col gap-3 overflow-y-auto">
                        <div className="text-xs font-bold text-gray-500">블로그 포스팅 (수정 가능)</div>
                        <textarea className="flex-1 w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-green-500 focus:outline-none text-sm resize-none transition-all duration-200 min-h-64" defaultValue={AI_PREVIEW['Naver Blog']} />
                        <div className="flex items-center gap-3">
                          <button className="px-4 py-2 rounded-xl border-2 border-dashed border-gray-300 text-xs text-gray-500 hover:border-green-400 hover:text-green-500 transition-all duration-200">📷 이미지 삽입</button>
                          <span className="text-xs text-gray-400">서론-본론-결론 구조 자동 적용</span>
                        </div>
                      </div>
                    )}

                    {aiTab === 'X(Twitter)' && (
                      <div className="flex-1 p-6 flex flex-col gap-3">
                        <div className="text-xs font-bold text-gray-500">트윗 (280자 이내)</div>
                        <textarea className="flex-1 w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-gray-800 focus:outline-none text-sm resize-none transition-all duration-200 min-h-40" defaultValue={AI_PREVIEW['X(Twitter)']} maxLength={280} />
                        <div className="flex items-center justify-between text-xs text-gray-400">
                          <span>🔗 단축 URL 자동 첨부</span>
                          <span>0/280자</span>
                        </div>
                      </div>
                    )}

                    {aiTab === '커뮤니티' && (
                      <div className="flex-1 p-6 flex flex-col gap-3">
                        <div className="text-xs font-bold text-gray-500">커뮤니티 게시글 (수정 가능)</div>
                        <textarea className="flex-1 w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-orange-400 focus:outline-none text-sm resize-none transition-all duration-200 min-h-40" defaultValue={AI_PREVIEW['커뮤니티']} />
                        <span className="text-xs text-gray-400">친근한 말투로 자동 변환됨</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* 고정 발행 바 */}
                <div className="sticky bottom-0 mt-6 flex items-center gap-4 p-5 rounded-3xl bg-white border-2 border-blue-100 shadow-xl">
                  <div className="flex-1">
                    <div className="font-extrabold text-gray-900 text-sm">
                      총 <span className="text-blue-600 text-xl">{totalSelected}개</span> 채널에 동시 발행됩니다
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">AI가 각 채널 문체로 최적화 완료</div>
                  </div>
                  <button onClick={handlePublish} disabled={publishing}
                    className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-blue-600 text-white font-extrabold text-sm hover:bg-blue-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 disabled:opacity-60">
                    {publishing ? '⏳ 발행 중...' : `✅ ${totalSelected}개 채널 일괄 자동 발행하기`}
                  </button>
                </div>

                {publishDone && (
                  <div className="mt-4 p-5 rounded-2xl bg-green-50 border-2 border-green-200 flex items-center justify-between">
                    <div>
                      <div className="font-extrabold text-green-800">🎉 발행 완료!</div>
                      <div className="text-sm text-green-600 mt-0.5">{totalSelected}개 채널/사이트에 성공적으로 배포되었습니다.</div>
                    </div>
                    <button onClick={()=>setTab('status')} className="px-5 py-2.5 rounded-2xl bg-green-600 text-white text-sm font-bold hover:bg-green-700 transition-all duration-200">발행 현황 보기 →</button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ══ 발행 관리 ══ */}
        {tab === 'publish' && (
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 mb-6">🚀 발행 관리</h1>
            <div className="flex flex-col gap-4">
              {[
                { title:'2025 청년 창업 아이디어 대회', ch:40, done:40, date:'2025-05-01' },
                { title:'디자인 공모전 2025',           ch:25, done:18, date:'2025-05-15' },
              ].map((p,i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-md transition-all duration-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="font-bold text-gray-900">{p.title}</div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${p.done===p.ch?'bg-green-100 text-green-700':'bg-blue-100 text-blue-700'}`}>{p.done===p.ch?'✅ 완료':'⏳ 진행중'}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
                    <div className="bg-blue-600 h-2 rounded-full transition-all duration-500" style={{ width:`${(p.done/p.ch)*100}%` }}/>
                  </div>
                  <div className="text-xs text-gray-400">{p.done}/{p.ch}개 채널 · {p.date}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══ 채널 현황 ══ */}
        {tab === 'status' && (
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 mb-2">📡 채널 발행 현황</h1>
            <p className="text-gray-500 text-sm mb-6">진행완료 / 진행중 / 발행예정 상태를 확인합니다</p>

            <div className="grid grid-cols-4 gap-4 mb-8">
              {[
                { label:'진행완료', val:14, bg:'#D1FAE5', col:'#059669' },
                { label:'진행중',   val:4,  bg:'#DBEAFE', col:'#2563EB' },
                { label:'발행예정', val:2,  bg:'#FEF3C7', col:'#D97706' },
                { label:'전체',     val:20, bg:'#F1F3F5', col:'#374151' },
              ].map((s,i) => (
                <div key={i} className="rounded-2xl p-4 text-center" style={{ background:s.bg }}>
                  <div className="text-3xl font-extrabold" style={{ color:s.col }}>{s.val}</div>
                  <div className="text-xs font-bold text-gray-500 mt-1">{s.label}</div>
                </div>
              ))}
            </div>

            <h2 className="font-extrabold text-gray-800 mb-4">📣 SNS / 블로그 채널</h2>
            <div className="flex flex-col gap-2 mb-8">
              {ALL_CHANNELS.slice(0,20).map((ch,i) => {
                const d = STATUS_DATA[i] || { st:'wait', time:'-', url:'' }
                return <PubRow key={i} ch={ch} d={d}/>
              })}
            </div>

            <h2 className="font-extrabold text-gray-800 mb-4">🏆 공모전 사이트 등록 현황</h2>
            <div className="flex flex-col gap-2 mb-8">
              {CONTEST_SITES.map((site,i) => {
                const st = i<18?'done':i<21?'progress':'scheduled'
                return <PubRow key={i} ch={site} d={{ st, time:st==='done'?'2025-05-01 09:00':st==='scheduled'?'2025-05-04 10:00':'진행 중', url:st==='done'?'#':'' }}/>
              })}
            </div>

            <h2 className="font-extrabold text-gray-800 mb-4">💬 커뮤니티 채널 현황</h2>
            <div className="flex flex-col gap-2">
              {COMMUNITY_SITES.slice(0,10).map((site,i) => {
                const st = i<6?'done':i<8?'progress':'scheduled'
                return <PubRow key={i} ch={site} d={{ st, time:st==='done'?'2025-05-01 09:30':st==='scheduled'?'2025-05-05 10:00':'진행 중', url:st==='done'?'#':'' }}/>
              })}
            </div>
          </div>
        )}

        {/* ══ 성과 분석 ══ */}
        {tab === 'stats' && (
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 mb-6">📈 성과 분석</h1>
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { label:'총 조회수', value:'45,230', change:'+12.3%', up:true,  icon:'👁️' },
                { label:'총 클릭수', value:'8,921',  change:'+8.7%',  up:true,  icon:'🖱️' },
                { label:'신청자수',  value:'1,240명', change:'+5.2%', up:true,  icon:'👥' },
                { label:'CTR',       value:'19.7%',  change:'-1.1%',  up:false, icon:'📊' },
                { label:'체류시간',  value:'2분 34초',change:'+0:12', up:true,  icon:'⏱️' },
                { label:'공유수',    value:'342',    change:'+21%',   up:true,  icon:'🔗' },
              ].map((k,i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-md transition-all duration-200">
                  <div className="text-2xl mb-2">{k.icon}</div>
                  <div className="text-2xl font-extrabold text-gray-900">{k.value}</div>
                  <div className="text-xs text-gray-500 mt-1">{k.label}</div>
                  <div className={`text-xs font-bold mt-1 ${k.up?'text-green-600':'text-red-500'}`}>{k.change}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══ 설정 ══ */}
        {tab === 'settings' && (
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 mb-6">⚙️ 계정 설정</h1>
            <div className="bg-white rounded-3xl border border-gray-200 p-8 max-w-lg">
              <h2 className="font-extrabold text-gray-800 mb-5">계정 정보</h2>
              <div className="flex flex-col gap-4">
                {[{l:'기관명',v:'홍길동 주최사'},{l:'담당자명',v:'홍길동'},{l:'이메일',v:'hong@example.com'},{l:'연락처',v:'02-0000-0000'}].map((f,i) => (
                  <div key={i}>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">{f.l}</label>
                    <input className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-sm transition-all duration-200" defaultValue={f.v} />
                  </div>
                ))}
              </div>
              <button className="mt-6 px-8 py-3 rounded-2xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">저장하기</button>
            </div>
          </div>
        )}
      </main>

      {/* ══ 저장 완료 모달 ══ */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={()=>setShowModal(false)}>
          <div className="bg-white rounded-3xl p-10 max-w-md w-full shadow-2xl" onClick={e=>e.stopPropagation()}>
            <div className="text-center mb-8">
              <div className="w-20 h-20 rounded-3xl bg-green-50 flex items-center justify-center text-5xl mx-auto mb-5">🎉</div>
              <h2 className="text-2xl font-extrabold text-gray-900 mb-3">게시글 작성 완료!</h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                지금 바로 AI를 통해<br/>
                <strong className="text-blue-600 text-base">{totalSelected}개 채널</strong>에 최적화된 콘텐츠로 배포하시겠습니까?
              </p>
              <div className="flex items-center justify-center gap-3 mt-4 text-xs text-gray-400">
                <span>📣 SNS {SNS_CHANNELS.filter(c=>selectedChannels.includes(c.name)).length}</span>
                <span>·</span>
                <span>📝 블로그 {BLOG_CHANNELS.filter(c=>selectedChannels.includes(c.name)).length}</span>
                <span>·</span>
                <span>🏆 공모전 {selectedSites.length}</span>
                <span>·</span>
                <span>💬 커뮤니티 {selectedCommunity.length}</span>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <button onClick={handleStartAI}
                className="w-full py-4 rounded-2xl bg-blue-600 text-white font-extrabold text-base hover:bg-blue-700 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2">
                <FaRobot/> AI 채널 연동하기
              </button>
              <button onClick={()=>setShowModal(false)}
                className="w-full py-3.5 rounded-2xl border-2 border-gray-200 text-gray-500 font-semibold hover:bg-gray-50 transition-all duration-200">
                나중에 하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
