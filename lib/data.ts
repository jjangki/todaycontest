export const CHANNELS = [
  {name:'Instagram',emoji:'📸',short:'인스타',color:'#E1306C'},
  {name:'Facebook',emoji:'📘',short:'페이스북',color:'#1877F2'},
  {name:'YouTube',emoji:'▶️',short:'유튜브',color:'#FF0000'},
  {name:'TikTok',emoji:'🎵',short:'틱톡',color:'#010101'},
  {name:'X(Twitter)',emoji:'🐦',short:'트위터',color:'#000000'},
  {name:'KakaoTalk',emoji:'💬',short:'카카오',color:'#FEE500'},
  {name:'Naver Blog',emoji:'📝',short:'블로그',color:'#03C75A'},
  {name:'Naver Cafe',emoji:'☕',short:'카페',color:'#03C75A'},
  {name:'Brunch',emoji:'✍️',short:'브런치',color:'#333333'},
  {name:'Velog',emoji:'💻',short:'벨로그',color:'#20C997'},
  {name:'LinkedIn',emoji:'💼',short:'링크드인',color:'#0A66C2'},
  {name:'Pinterest',emoji:'📌',short:'핀터레스트',color:'#E60023'},
  {name:'Threads',emoji:'🧵',short:'스레드',color:'#000000'},
  {name:'Band',emoji:'🎸',short:'밴드',color:'#5BBA00'},
  {name:'Everytime',emoji:'📅',short:'에타',color:'#E03131'},
  {name:'Discord',emoji:'🎮',short:'디스코드',color:'#5865F2'},
  {name:'Telegram',emoji:'✈️',short:'텔레그램',color:'#26A5E4'},
  {name:'Notion',emoji:'📋',short:'노션',color:'#37352F'},
  {name:'Reddit',emoji:'🤖',short:'레딧',color:'#FF4500'},
  {name:'Medium',emoji:'📰',short:'미디엄',color:'#000000'},
  {name:'Naver Post',emoji:'📮',short:'포스트',color:'#03C75A'},
  {name:'Tistory',emoji:'🔷',short:'티스토리',color:'#FF6600'},
  {name:'Daum Cafe',emoji:'🌐',short:'다음카페',color:'#FF5A00'},
  {name:'Kakao Story',emoji:'🌸',short:'카스',color:'#FEE500'},
  {name:'Whalespace',emoji:'🐋',short:'웨일',color:'#2563EB'},
  {name:'Instagram Reels',emoji:'🎬',short:'릴스',color:'#E1306C'},
  {name:'YouTube Shorts',emoji:'🩳',short:'쇼츠',color:'#FF0000'},
  {name:'네이버 지식인',emoji:'❓',short:'지식인',color:'#03C75A'},
  {name:'Google My',emoji:'🗺️',short:'구글',color:'#4285F4'},
  {name:'Tumblr',emoji:'🌀',short:'텀블러',color:'#35465C'},
  {name:'Flickr',emoji:'📷',short:'플리커',color:'#FF0084'},
  {name:'Twitter Space',emoji:'🎙️',short:'스페이스',color:'#000000'},
  {name:'Clubhouse',emoji:'🏠',short:'클하',color:'#F4E0C6'},
  {name:'Spotify',emoji:'🎧',short:'스포티파이',color:'#1DB954'},
  {name:'Apple Podcast',emoji:'🎙',short:'팟캐스트',color:'#8B5CF6'},
  {name:'Naver TV',emoji:'📺',short:'네이버TV',color:'#03C75A'},
  {name:'Kakao TV',emoji:'🎥',short:'카카오TV',color:'#FEE500'},
  {name:'Afreeca TV',emoji:'🔴',short:'아프리카',color:'#FF6600'},
  {name:'Twitch',emoji:'💜',short:'트위치',color:'#9146FF'},
  {name:'Chzzk',emoji:'🎯',short:'치지직',color:'#00C73C'},
]

const CATEGORIES = ['공모전','대외활동','공모전','대외활동','공모전','공모전','대외활동','공모전']
const ORGS = ['문화체육관광부','한국콘텐츠진흥원','삼성전자','LG전자','현대자동차','SK텔레콤','KT','카카오','네이버','롯데그룹','포스코','한국관광공사','서울시','교육부','국토부','환경부','CJ ENM','제일기획','그래픽코리아','한국예술종합학교']
const EMOJIS = ['🏆','🎨','🖥️','🌿','✈️','🎬','📱','🎵','📚','🏗️','🔬','💡','🌊','🎭','🏛️','🎯','💰','🚀','🎪','🌈']
const COLORS = ['#EBF1FF','#FFF9E6','#F0FFF4','#FFF1F2','#F5F3FF','#FFF7ED','#F0F9FF','#FEFCE8','#FDF4FF','#F0FDFA']
const PRIZES = ['총상금 1,000만원','총상금 500만원','총상금 3,000만원','총상금 2,000만원','상금 없음 (인턴십)','총상금 300만원','총상금 5,000만원','특산품 증정','총상금 800만원','총상금 1,500만원','총상금 10,000만원','해외연수 기회']
const STATUSES: Array<{status:string,statusLabel:string,dday:string}> = [
  {status:'new',statusLabel:'NEW',dday:'D-45'},
  {status:'closing',statusLabel:'마감임박',dday:'D-3'},
  {status:'open',statusLabel:'접수중',dday:'D-20'},
  {status:'upcoming',statusLabel:'예정',dday:'D+10'},
  {status:'open',statusLabel:'접수중',dday:'D-14'},
  {status:'closing',statusLabel:'마감임박',dday:'D-7'},
]
const TITLES = [
  '2024 AI 창작 공모전','청년 창업 아이디어 대회','글로벌 디자인 어워드','K-콘텐츠 영상 공모전',
  '사회혁신 아이디어 챌린지','스마트시티 해커톤','환경 UCC 공모전','웹툰 신인 발굴전',
  '음악 창작 경연대회','건축·도시 설계 공모전','과학기술 아이디어 마켓','문학 작품 공모전',
  '게임 개발 챌린지','브랜드 네이밍 공모전','사진 작품 공모전','광고 캠페인 아이디어전',
  '앱 개발 대회','패션 디자인 공모전','빅데이터 분석 대회','로봇 경진대회',
  '미술 작품 공모전','SW 개발 공모전','3D 프린팅 디자인 대회','요리·식품 아이디어전',
  '뷰티·화장품 아이디어전','관광 콘텐츠 공모전','교육 콘텐츠 대회','농업·식품 창업 대회',
  '헬스케어 아이디어 대회','스포츠 창업 아이디어전','소셜벤처 아이디어 대회','에너지 절약 아이디어전',
  '청소년 UCC 공모전','대학생 광고 공모전','취업 스펙 강화 프로그램','해외 인턴십 공모',
  '정부혁신 아이디어 공모','AI 그림 공모전','동영상 편집 대회','카드뉴스 제작 공모전',
  '팟캐스트 제작 대회','숏폼 영상 공모전','독후감 공모전','논문·리포트 공모전',
  '스타트업 피칭 대회','소비자 아이디어 공모','청년 정책 제안 대회','지역 발전 아이디어전',
  '문화유산 홍보 공모전','친환경 제품 디자인전','모바일 앱 UI/UX 대회','반려동물 사진 공모전',
  '캐릭터 디자인 공모전','웹소설 창작 대회','만화·애니메이션 공모전','K-POP 댄스 챌린지',
  '천문·우주 사진 공모전','바다·해양 환경 공모전','산림·녹지 사진 공모전','도시재생 아이디어 공모',
]
const TAGS_POOL = [['AI','창작'],['창업','대학생'],['디자인','글로벌'],['영상','콘텐츠'],['사회','혁신'],['IT','해커톤'],['환경','UCC'],['웹툰','만화'],['음악','공연'],['건축','도시']]

export const CONTESTS = Array.from({length: 60}, (_, i) => {
  const statusObj = STATUSES[i % STATUSES.length]
  return {
    id: String(i + 1),
    title: TITLES[i % TITLES.length],
    org: ORGS[i % ORGS.length],
    category: CATEGORIES[i % CATEGORIES.length],
    prize: PRIZES[i % PRIZES.length],
    emoji: EMOJIS[i % EMOJIS.length],
    bgColor: COLORS[i % COLORS.length],
    tags: TAGS_POOL[i % TAGS_POOL.length],
    ...statusObj,
    deadline: `2024-${String((i % 11) + 1).padStart(2,'0')}-${String((i % 27) + 1).padStart(2,'0')}`,
    views: Math.floor(Math.random() * 9000) + 1000,
    applicants: Math.floor(Math.random() * 900) + 100,
    desc: `본 공모전은 ${ORGS[i % ORGS.length]}에서 주최하는 대회입니다. 창의적인 아이디어와 실력 있는 인재를 발굴하고자 합니다. 대학생, 일반인, 청소년 등 누구나 참여할 수 있으며, 우수 작품에는 다양한 시상과 혜택이 제공됩니다.`,
    target: '대학생, 일반인, 청소년',
    how: '이메일 또는 홈페이지 온라인 접수',
  }
})

export const PARTNERS = [
  {name:'문화체육관광부',icon:'🏛️'},
  {name:'한국콘텐츠진흥원',icon:'🎨'},
  {name:'교육부',icon:'📚'},
  {name:'중소벤처기업부',icon:'🏢'},
  {name:'서울특별시',icon:'🌆'},
  {name:'삼성전자',icon:'📱'},
  {name:'현대자동차',icon:'🚗'},
  {name:'LG전자',icon:'💡'},
  {name:'SK텔레콤',icon:'📡'},
  {name:'KT',icon:'🌐'},
  {name:'카카오',icon:'💬'},
  {name:'네이버',icon:'📝'},
]
