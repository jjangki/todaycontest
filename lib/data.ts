// 공모전 데이터 타입 정의
export interface Contest {
  id: number;
  title: string;
  organizer: string;
  category: string;
  prize: number;
  prizeText: string;
  deadline: string;
  dday: number;
  target: string;
  field: string;
  thumbnail: string;
  color: string;
  isNew: boolean;
  isHot: boolean;
  tags: string[];
  description: string;
  officialUrl: string;
  startDate: string;
  endDate: string;
  benefits: string[];
  eligibility: string;
}

// 색상 팔레트 (썸네일용)
const colors = [
  "from-blue-500 to-blue-700",
  "from-purple-500 to-purple-700",
  "from-emerald-500 to-teal-700",
  "from-orange-500 to-red-600",
  "from-pink-500 to-rose-600",
  "from-indigo-500 to-blue-700",
  "from-amber-500 to-orange-600",
  "from-cyan-500 to-blue-600",
  "from-violet-500 to-purple-700",
  "from-lime-500 to-green-700",
  "from-red-500 to-pink-600",
  "from-sky-500 to-indigo-600",
];

// 공모전 목 데이터 (60개)
export const contests: Contest[] = [
  { id: 1, title: "2025 K-스타트업 창업 아이디어 공모전", organizer: "중소벤처기업부", category: "창업", prize: 10000000, prizeText: "1,000만원", deadline: "2025-05-31", dday: 37, target: "전국민", field: "비즈니스", thumbnail: "", color: colors[0], isNew: true, isHot: true, tags: ["창업", "스타트업", "아이디어"], description: "청년 창업가들의 혁신적인 아이디어를 발굴하는 전국 규모의 공모전입니다.", officialUrl: "#", startDate: "2025-04-01", endDate: "2025-05-31", benefits: ["상금 지원", "멘토링 제공", "투자 연계"], eligibility: "만 19세~39세 청년" },
  { id: 2, title: "제7회 대학생 광고 창작 대전", organizer: "한국방송광고진흥공사", category: "광고", prize: 5000000, prizeText: "500만원", deadline: "2025-05-15", dday: 21, target: "대학생", field: "마케팅", thumbnail: "", color: colors[1], isNew: false, isHot: true, tags: ["광고", "마케팅", "대학생"], description: "대학생들의 창의적인 광고 아이디어를 발굴하는 공모전입니다.", officialUrl: "#", startDate: "2025-03-01", endDate: "2025-05-15", benefits: ["상금", "인턴십 기회"], eligibility: "전국 대학교 재학생" },
  { id: 3, title: "2025 환경부 그린디자인 공모전", organizer: "환경부", category: "디자인", prize: 3000000, prizeText: "300만원", deadline: "2025-06-30", dday: 67, target: "전국민", field: "환경/디자인", thumbnail: "", color: colors[2], isNew: true, isHot: false, tags: ["환경", "디자인", "친환경"], description: "환경 보호를 주제로 한 디자인 공모전입니다.", officialUrl: "#", startDate: "2025-04-15", endDate: "2025-06-30", benefits: ["상금", "전시 기회"], eligibility: "제한 없음" },
  { id: 4, title: "AI 혁신 솔루션 챌린지 2025", organizer: "과학기술정보통신부", category: "IT", prize: 20000000, prizeText: "2,000만원", deadline: "2025-05-20", dday: 26, target: "개발자/팀", field: "IT/AI", thumbnail: "", color: colors[3], isNew: true, isHot: true, tags: ["AI", "개발", "혁신"], description: "인공지능 기반의 혁신적인 솔루션을 개발하는 해커톤 형식의 대회입니다.", officialUrl: "#", startDate: "2025-04-01", endDate: "2025-05-20", benefits: ["상금", "사업화 지원"], eligibility: "개인 또는 팀(5인 이하)" },
  { id: 5, title: "전국 청년 문학상 대회", organizer: "문화체육관광부", category: "문학", prize: 2000000, prizeText: "200만원", deadline: "2025-05-10", dday: 16, target: "청년", field: "문학", thumbnail: "", color: colors[4], isNew: false, isHot: false, tags: ["문학", "글쓰기", "청년"], description: "청년들의 문학적 재능을 발굴하는 공모전입니다.", officialUrl: "#", startDate: "2025-03-01", endDate: "2025-05-10", benefits: ["상금", "출판 기회"], eligibility: "만 18세~34세" },
  { id: 6, title: "서울 스마트시티 아이디어 공모전", organizer: "서울특별시", category: "도시/IT", prize: 5000000, prizeText: "500만원", deadline: "2025-07-15", dday: 82, target: "전국민", field: "도시계획/IT", thumbnail: "", color: colors[5], isNew: true, isHot: false, tags: ["스마트시티", "서울", "아이디어"], description: "서울을 더 스마트하게 만들 아이디어를 공모합니다.", officialUrl: "#", startDate: "2025-05-01", endDate: "2025-07-15", benefits: ["상금", "시범 사업 참여"], eligibility: "제한 없음" },
  { id: 7, title: "K-뷰티 패키지 디자인 공모전", organizer: "코스맥스", category: "디자인", prize: 8000000, prizeText: "800만원", deadline: "2025-05-25", dday: 31, target: "디자이너", field: "패키지 디자인", thumbnail: "", color: colors[6], isNew: false, isHot: true, tags: ["뷰티", "패키지", "디자인"], description: "K-뷰티 제품을 위한 혁신적인 패키지 디자인을 공모합니다.", officialUrl: "#", startDate: "2025-04-01", endDate: "2025-05-25", benefits: ["상금", "상품화 기회"], eligibility: "디자인 관련 전공자 우대" },
  { id: 8, title: "전국 대학생 사진 공모전", organizer: "한국사진작가협회", category: "사진", prize: 1500000, prizeText: "150만원", deadline: "2025-06-01", dday: 38, target: "대학생", field: "사진/예술", thumbnail: "", color: colors[7], isNew: false, isHot: false, tags: ["사진", "예술", "대학생"], description: "대학생들의 창의적인 사진 작품을 공모합니다.", officialUrl: "#", startDate: "2025-03-01", endDate: "2025-06-01", benefits: ["상금", "전시 기회"], eligibility: "대학교 재학생" },
  { id: 9, title: "2025 바이오헬스 창업 경진대회", organizer: "보건복지부", category: "창업", prize: 15000000, prizeText: "1,500만원", deadline: "2025-05-08", dday: 14, target: "창업팀", field: "바이오/헬스", thumbnail: "", color: colors[8], isNew: false, isHot: true, tags: ["바이오", "헬스", "창업"], description: "바이오헬스 분야 혁신 스타트업을 발굴합니다.", officialUrl: "#", startDate: "2025-03-15", endDate: "2025-05-08", benefits: ["상금", "투자 연계"], eligibility: "창업 3년 이내 기업" },
  { id: 10, title: "청소년 과학 탐구 올림피아드", organizer: "한국과학창의재단", category: "과학", prize: 500000, prizeText: "50만원", deadline: "2025-06-20", dday: 57, target: "청소년", field: "과학", thumbnail: "", color: colors[9], isNew: true, isHot: false, tags: ["과학", "청소년", "탐구"], description: "청소년들의 과학적 사고력과 탐구 능력을 겨루는 대회입니다.", officialUrl: "#", startDate: "2025-04-01", endDate: "2025-06-20", benefits: ["상금", "장학금"], eligibility: "중고등학생" },
  { id: 11, title: "2025 국제 게임 개발 대회 코리아", organizer: "게임물관리위원회", category: "게임", prize: 30000000, prizeText: "3,000만원", deadline: "2025-07-01", dday: 68, target: "게임 개발자", field: "IT/게임", thumbnail: "", color: colors[10], isNew: true, isHot: true, tags: ["게임", "개발", "국제"], description: "국내외 게임 개발자들이 참여하는 국제 게임 개발 대회입니다.", officialUrl: "#", startDate: "2025-04-01", endDate: "2025-07-01", benefits: ["상금", "투자 유치 기회"], eligibility: "제한 없음" },
  { id: 12, title: "농촌 경관 사진 공모전", organizer: "농림축산식품부", category: "사진", prize: 2000000, prizeText: "200만원", deadline: "2025-05-30", dday: 36, target: "전국민", field: "사진", thumbnail: "", color: colors[11], isNew: false, isHot: false, tags: ["농촌", "사진", "경관"], description: "아름다운 농촌의 모습을 담은 사진을 공모합니다.", officialUrl: "#", startDate: "2025-03-01", endDate: "2025-05-30", benefits: ["상금", "전시"], eligibility: "제한 없음" },
  { id: 13, title: "글로벌 소셜벤처 아이디어 경진대회", organizer: "사회적기업진흥원", category: "사회혁신", prize: 10000000, prizeText: "1,000만원", deadline: "2025-06-15", dday: 52, target: "청년/팀", field: "사회혁신", thumbnail: "", color: colors[0], isNew: true, isHot: false, tags: ["소셜벤처", "사회혁신", "글로벌"], description: "사회 문제를 해결하는 혁신적인 아이디어를 발굴합니다.", officialUrl: "#", startDate: "2025-04-15", endDate: "2025-06-15", benefits: ["상금", "멘토링"], eligibility: "만 19세~45세" },
  { id: 14, title: "대한민국 웹툰 신인 공모전", organizer: "한국콘텐츠진흥원", category: "웹툰", prize: 5000000, prizeText: "500만원", deadline: "2025-05-05", dday: 11, target: "웹툰 작가", field: "만화/콘텐츠", thumbnail: "", color: colors[1], isNew: false, isHot: true, tags: ["웹툰", "만화", "신인"], description: "차세대 웹툰 작가를 발굴하는 공모전입니다.", officialUrl: "#", startDate: "2025-02-01", endDate: "2025-05-05", benefits: ["상금", "연재 기회"], eligibility: "신인 웹툰 작가" },
  { id: 15, title: "ESG 경영 우수사례 공모전", organizer: "한국경제연구원", category: "경영", prize: 3000000, prizeText: "300만원", deadline: "2025-06-30", dday: 67, target: "기업/개인", field: "경영/ESG", thumbnail: "", color: colors[2], isNew: true, isHot: false, tags: ["ESG", "경영", "지속가능"], description: "ESG 경영의 우수 사례를 발굴하고 공유합니다.", officialUrl: "#", startDate: "2025-04-01", endDate: "2025-06-30", benefits: ["상금", "인증서"], eligibility: "기업 또는 개인" },
  { id: 16, title: "2025 전국 고교생 수학 올림피아드", organizer: "대한수학회", category: "학술", prize: 1000000, prizeText: "100만원", deadline: "2025-05-12", dday: 18, target: "고등학생", field: "수학", thumbnail: "", color: colors[3], isNew: false, isHot: false, tags: ["수학", "올림피아드", "고등학생"], description: "전국 고등학생들의 수학 실력을 겨루는 올림피아드입니다.", officialUrl: "#", startDate: "2025-03-01", endDate: "2025-05-12", benefits: ["상금", "장학금"], eligibility: "전국 고등학생" },
  { id: 17, title: "힐링 여행 사진 공모전", organizer: "한국관광공사", category: "사진", prize: 2000000, prizeText: "200만원", deadline: "2025-07-20", dday: 87, target: "전국민", field: "여행/사진", thumbnail: "", color: colors[4], isNew: true, isHot: false, tags: ["여행", "사진", "힐링"], description: "국내 힐링 여행지를 담은 사진을 공모합니다.", officialUrl: "#", startDate: "2025-05-01", endDate: "2025-07-20", benefits: ["상금", "여행 패키지"], eligibility: "제한 없음" },
  { id: 18, title: "스마트팜 혁신 기술 공모전", organizer: "농촌진흥청", category: "농업/IT", prize: 5000000, prizeText: "500만원", deadline: "2025-06-01", dday: 38, target: "농업인/개발자", field: "농업/기술", thumbnail: "", color: colors[5], isNew: false, isHot: false, tags: ["스마트팜", "농업", "기술"], description: "농업 혁신을 위한 스마트팜 기술 아이디어를 공모합니다.", officialUrl: "#", startDate: "2025-03-15", endDate: "2025-06-01", benefits: ["상금", "시범 사업"], eligibility: "제한 없음" },
  { id: 19, title: "대학생 UX/UI 디자인 챌린지", organizer: "카카오", category: "디자인", prize: 7000000, prizeText: "700만원", deadline: "2025-05-18", dday: 24, target: "대학생", field: "디자인/UX", thumbnail: "", color: colors[6], isNew: true, isHot: true, tags: ["UX", "UI", "디자인"], description: "사용자 경험을 혁신하는 디자인 챌린지입니다.", officialUrl: "#", startDate: "2025-04-01", endDate: "2025-05-18", benefits: ["상금", "인턴십"], eligibility: "대학교 재학생/졸업생" },
  { id: 20, title: "전국 청년 창작 음악 대회", organizer: "한국음악협회", category: "음악", prize: 3000000, prizeText: "300만원", deadline: "2025-06-10", dday: 47, target: "청년", field: "음악", thumbnail: "", color: colors[7], isNew: false, isHot: false, tags: ["음악", "청년", "창작"], description: "청년 음악가들의 창작 능력을 발굴하는 대회입니다.", officialUrl: "#", startDate: "2025-03-01", endDate: "2025-06-10", benefits: ["상금", "음반 제작 기회"], eligibility: "만 19세~35세" },
  { id: 21, title: "헬스케어 앱 개발 경진대회", organizer: "건강보험심사평가원", category: "IT", prize: 10000000, prizeText: "1,000만원", deadline: "2025-05-28", dday: 34, target: "개발자", field: "IT/헬스케어", thumbnail: "", color: colors[8], isNew: true, isHot: false, tags: ["헬스케어", "앱", "개발"], description: "국민 건강 증진을 위한 혁신적인 앱을 개발합니다.", officialUrl: "#", startDate: "2025-04-01", endDate: "2025-05-28", benefits: ["상금", "사업화"], eligibility: "개인 또는 팀" },
  { id: 22, title: "지역 특산물 브랜딩 공모전", organizer: "행정안전부", category: "마케팅", prize: 2000000, prizeText: "200만원", deadline: "2025-07-05", dday: 72, target: "전국민", field: "마케팅/디자인", thumbnail: "", color: colors[9], isNew: false, isHot: false, tags: ["브랜딩", "지역", "특산물"], description: "지역 특산물의 브랜드 가치를 높이는 아이디어를 공모합니다.", officialUrl: "#", startDate: "2025-05-01", endDate: "2025-07-05", benefits: ["상금", "상품화"], eligibility: "제한 없음" },
  { id: 23, title: "클린테크 스타트업 경진대회", organizer: "산업통상자원부", category: "창업", prize: 20000000, prizeText: "2,000만원", deadline: "2025-05-22", dday: 28, target: "스타트업", field: "환경/에너지", thumbnail: "", color: colors[10], isNew: true, isHot: true, tags: ["클린테크", "환경", "에너지"], description: "친환경 기술 스타트업을 발굴하고 지원합니다.", officialUrl: "#", startDate: "2025-04-01", endDate: "2025-05-22", benefits: ["상금", "투자 연계"], eligibility: "창업 5년 이내 기업" },
  { id: 24, title: "전국 어린이 동화 공모전", organizer: "교육부", category: "문학", prize: 1000000, prizeText: "100만원", deadline: "2025-06-25", dday: 62, target: "전국민", field: "동화/문학", thumbnail: "", color: colors[11], isNew: false, isHot: false, tags: ["동화", "어린이", "문학"], description: "어린이를 위한 창의적인 동화를 공모합니다.", officialUrl: "#", startDate: "2025-04-01", endDate: "2025-06-25", benefits: ["상금", "출판"], eligibility: "제한 없음" },
  { id: 25, title: "모빌리티 혁신 아이디어 공모전", organizer: "현대자동차", category: "산업", prize: 15000000, prizeText: "1,500만원", deadline: "2025-05-14", dday: 20, target: "전국민", field: "자동차/모빌리티", thumbnail: "", color: colors[0], isNew: false, isHot: true, tags: ["모빌리티", "자동차", "혁신"], description: "미래 모빌리티를 혁신할 아이디어를 공모합니다.", officialUrl: "#", startDate: "2025-03-01", endDate: "2025-05-14", benefits: ["상금", "인턴십"], eligibility: "제한 없음" },
  { id: 26, title: "사이버 보안 해커톤 2025", organizer: "한국인터넷진흥원", category: "IT", prize: 12000000, prizeText: "1,200만원", deadline: "2025-06-05", dday: 42, target: "개발자", field: "보안/IT", thumbnail: "", color: colors[1], isNew: true, isHot: false, tags: ["보안", "해커톤", "IT"], description: "사이버 보안 기술을 겨루는 해커톤 대회입니다.", officialUrl: "#", startDate: "2025-04-15", endDate: "2025-06-05", benefits: ["상금", "채용 연계"], eligibility: "개인 또는 팀(3인 이하)" },
  { id: 27, title: "한식 레시피 창작 대회", organizer: "한식진흥원", category: "요리", prize: 2000000, prizeText: "200만원", deadline: "2025-07-10", dday: 77, target: "전국민", field: "요리/식품", thumbnail: "", color: colors[2], isNew: false, isHot: false, tags: ["한식", "요리", "레시피"], description: "전통 한식을 현대적으로 재해석한 레시피를 공모합니다.", officialUrl: "#", startDate: "2025-05-01", endDate: "2025-07-10", benefits: ["상금", "출판"], eligibility: "제한 없음" },
  { id: 28, title: "스포츠 브랜드 네이밍 공모전", organizer: "국민체육진흥공단", category: "마케팅", prize: 1000000, prizeText: "100만원", deadline: "2025-05-09", dday: 15, target: "전국민", field: "마케팅", thumbnail: "", color: colors[3], isNew: false, isHot: false, tags: ["스포츠", "브랜딩", "네이밍"], description: "새로운 스포츠 브랜드 이름을 공모합니다.", officialUrl: "#", startDate: "2025-04-01", endDate: "2025-05-09", benefits: ["상금", "인증서"], eligibility: "제한 없음" },
  { id: 29, title: "빅데이터 분석 챌린지", organizer: "통계청", category: "IT", prize: 8000000, prizeText: "800만원", deadline: "2025-05-30", dday: 36, target: "데이터 분석가", field: "데이터/IT", thumbnail: "", color: colors[4], isNew: true, isHot: false, tags: ["빅데이터", "분석", "AI"], description: "빅데이터를 활용한 혁신적인 분석 결과를 공모합니다.", officialUrl: "#", startDate: "2025-04-01", endDate: "2025-05-30", benefits: ["상금", "채용"], eligibility: "제한 없음" },
  { id: 30, title: "청년 영화제 단편 공모전", organizer: "영화진흥위원회", category: "영상", prize: 3000000, prizeText: "300만원", deadline: "2025-06-20", dday: 57, target: "청년 영화인", field: "영화/영상", thumbnail: "", color: colors[5], isNew: false, isHot: false, tags: ["영화", "단편", "청년"], description: "청년 영화감독들의 단편 작품을 공모합니다.", officialUrl: "#", startDate: "2025-03-01", endDate: "2025-06-20", benefits: ["상금", "상영 기회"], eligibility: "만 19세~39세" },
  { id: 31, title: "인테리어 공간 디자인 공모전", organizer: "한국실내건축가협회", category: "건축", prize: 5000000, prizeText: "500만원", deadline: "2025-05-17", dday: 23, target: "디자이너", field: "인테리어/건축", thumbnail: "", color: colors[6], isNew: false, isHot: false, tags: ["인테리어", "공간", "디자인"], description: "혁신적인 공간 디자인 아이디어를 공모합니다.", officialUrl: "#", startDate: "2025-03-15", endDate: "2025-05-17", benefits: ["상금", "전시"], eligibility: "디자인 전공자" },
  { id: 32, title: "글로벌 핀테크 경진대회", organizer: "금융위원회", category: "핀테크", prize: 25000000, prizeText: "2,500만원", deadline: "2025-06-28", dday: 65, target: "핀테크 스타트업", field: "금융/IT", thumbnail: "", color: colors[7], isNew: true, isHot: true, tags: ["핀테크", "금융", "IT"], description: "금융 혁신을 이끄는 핀테크 스타트업을 발굴합니다.", officialUrl: "#", startDate: "2025-04-15", endDate: "2025-06-28", benefits: ["상금", "투자 유치"], eligibility: "창업 3년 이내 기업" },
  { id: 33, title: "전통공예 현대화 공모전", organizer: "문화재청", category: "공예", prize: 2000000, prizeText: "200만원", deadline: "2025-07-25", dday: 92, target: "공예가", field: "공예/문화", thumbnail: "", color: colors[8], isNew: false, isHot: false, tags: ["전통공예", "현대화", "문화"], description: "전통공예를 현대적으로 재해석한 작품을 공모합니다.", officialUrl: "#", startDate: "2025-05-01", endDate: "2025-07-25", benefits: ["상금", "전시"], eligibility: "공예 관련 종사자" },
  { id: 34, title: "에듀테크 혁신 아이디어 공모전", organizer: "교육부", category: "교육", prize: 5000000, prizeText: "500만원", deadline: "2025-05-26", dday: 32, target: "전국민", field: "교육/IT", thumbnail: "", color: colors[9], isNew: true, isHot: false, tags: ["에듀테크", "교육", "혁신"], description: "교육의 미래를 혁신하는 에듀테크 아이디어를 공모합니다.", officialUrl: "#", startDate: "2025-04-01", endDate: "2025-05-26", benefits: ["상금", "시범 사업"], eligibility: "제한 없음" },
  { id: 35, title: "반려동물 용품 디자인 공모전", organizer: "농림축산식품부", category: "디자인", prize: 3000000, prizeText: "300만원", deadline: "2025-06-08", dday: 45, target: "디자이너", field: "디자인/펫", thumbnail: "", color: colors[10], isNew: false, isHot: false, tags: ["반려동물", "펫", "디자인"], description: "반려동물을 위한 혁신적인 용품 디자인을 공모합니다.", officialUrl: "#", startDate: "2025-04-01", endDate: "2025-06-08", benefits: ["상금", "상품화"], eligibility: "제한 없음" },
  { id: 36, title: "2025 자유공원 조각 공모전", organizer: "인천광역시", category: "미술", prize: 10000000, prizeText: "1,000만원", deadline: "2025-07-30", dday: 97, target: "조각가", field: "미술/조각", thumbnail: "", color: colors[11], isNew: true, isHot: false, tags: ["조각", "미술", "공공예술"], description: "인천 자유공원에 설치될 조각 작품을 공모합니다.", officialUrl: "#", startDate: "2025-05-01", endDate: "2025-07-30", benefits: ["상금", "영구 설치"], eligibility: "조각 전문가" },
  { id: 37, title: "청년 글로벌 무역 아이디어 공모전", organizer: "KOTRA", category: "무역", prize: 5000000, prizeText: "500만원", deadline: "2025-05-16", dday: 22, target: "청년", field: "무역/비즈니스", thumbnail: "", color: colors[0], isNew: false, isHot: false, tags: ["무역", "글로벌", "청년"], description: "글로벌 무역을 혁신하는 아이디어를 공모합니다.", officialUrl: "#", startDate: "2025-03-01", endDate: "2025-05-16", benefits: ["상금", "해외 연수"], eligibility: "만 18세~39세" },
  { id: 38, title: "국민 아이디어 공모전 - 정부24", organizer: "행정안전부", category: "정책", prize: 3000000, prizeText: "300만원", deadline: "2025-06-12", dday: 49, target: "전국민", field: "정책/행정", thumbnail: "", color: colors[1], isNew: false, isHot: false, tags: ["정책", "아이디어", "공공"], description: "더 나은 정부 서비스를 위한 국민 아이디어를 공모합니다.", officialUrl: "#", startDate: "2025-04-01", endDate: "2025-06-12", benefits: ["상금", "정책 반영"], eligibility: "대한민국 국민" },
  { id: 39, title: "스마트 물류 혁신 공모전", organizer: "국토교통부", category: "물류", prize: 8000000, prizeText: "800만원", deadline: "2025-05-28", dday: 34, target: "물류 종사자", field: "물류/IT", thumbnail: "", color: colors[2], isNew: true, isHot: false, tags: ["물류", "스마트", "혁신"], description: "물류 산업의 디지털 혁신 아이디어를 공모합니다.", officialUrl: "#", startDate: "2025-04-01", endDate: "2025-05-28", benefits: ["상금", "시범 사업"], eligibility: "물류 관련 종사자/팀" },
  { id: 40, title: "전국 학생 과학 발명대회", organizer: "특허청", category: "발명", prize: 2000000, prizeText: "200만원", deadline: "2025-06-30", dday: 67, target: "학생", field: "발명/과학", thumbnail: "", color: colors[3], isNew: false, isHot: false, tags: ["발명", "과학", "학생"], description: "학생들의 창의적인 발명 아이디어를 발굴합니다.", officialUrl: "#", startDate: "2025-04-01", endDate: "2025-06-30", benefits: ["상금", "특허 지원"], eligibility: "초중고 학생" },
  { id: 41, title: "클라우드 네이티브 개발 챌린지", organizer: "네이버클라우드", category: "IT", prize: 15000000, prizeText: "1,500만원", deadline: "2025-05-20", dday: 26, target: "개발자", field: "클라우드/IT", thumbnail: "", color: colors[4], isNew: true, isHot: true, tags: ["클라우드", "개발", "네이버"], description: "클라우드 기술을 활용한 혁신적인 서비스를 개발합니다.", officialUrl: "#", startDate: "2025-04-01", endDate: "2025-05-20", benefits: ["상금", "채용"], eligibility: "개인 또는 팀" },
  { id: 42, title: "탄소중립 생활 실천 공모전", organizer: "환경부", category: "환경", prize: 1000000, prizeText: "100만원", deadline: "2025-07-15", dday: 82, target: "전국민", field: "환경", thumbnail: "", color: colors[5], isNew: false, isHot: false, tags: ["탄소중립", "환경", "생활"], description: "일상에서 탄소 중립을 실천하는 아이디어를 공모합니다.", officialUrl: "#", startDate: "2025-05-01", endDate: "2025-07-15", benefits: ["상금", "인증서"], eligibility: "제한 없음" },
  { id: 43, title: "푸드테크 창업 아이디어 공모전", organizer: "식품의약품안전처", category: "식품/IT", prize: 7000000, prizeText: "700만원", deadline: "2025-06-01", dday: 38, target: "창업자", field: "식품/기술", thumbnail: "", color: colors[6], isNew: true, isHot: false, tags: ["푸드테크", "식품", "창업"], description: "음식 산업의 혁신을 이끄는 푸드테크 아이디어를 공모합니다.", officialUrl: "#", startDate: "2025-04-01", endDate: "2025-06-01", benefits: ["상금", "사업화"], eligibility: "창업 예정자 또는 기업" },
  { id: 44, title: "대학생 마케팅 전략 경진대회", organizer: "삼성전자", category: "마케팅", prize: 5000000, prizeText: "500만원", deadline: "2025-05-10", dday: 16, target: "대학생", field: "마케팅", thumbnail: "", color: colors[7], isNew: false, isHot: true, tags: ["마케팅", "전략", "대학생"], description: "삼성전자 제품의 마케팅 전략을 제안하는 경진대회입니다.", officialUrl: "#", startDate: "2025-03-15", endDate: "2025-05-10", benefits: ["상금", "인턴십"], eligibility: "대학교 재학생" },
  { id: 45, title: "스마트 홈 IoT 솔루션 공모전", organizer: "LG전자", category: "IT", prize: 10000000, prizeText: "1,000만원", deadline: "2025-05-25", dday: 31, target: "개발자", field: "IoT/스마트홈", thumbnail: "", color: colors[8], isNew: true, isHot: false, tags: ["IoT", "스마트홈", "LG"], description: "스마트 홈을 위한 혁신적인 IoT 솔루션을 개발합니다.", officialUrl: "#", startDate: "2025-04-01", endDate: "2025-05-25", benefits: ["상금", "채용"], eligibility: "개발자/팀" },
  { id: 46, title: "그래픽 노블 신인 작가 공모전", organizer: "서울국제만화애니메이션페스티벌", category: "만화", prize: 3000000, prizeText: "300만원", deadline: "2025-06-15", dday: 52, target: "만화가", field: "만화/그래픽", thumbnail: "", color: colors[9], isNew: false, isHot: false, tags: ["그래픽노블", "만화", "신인"], description: "신인 그래픽 노블 작가를 발굴합니다.", officialUrl: "#", startDate: "2025-03-01", endDate: "2025-06-15", benefits: ["상금", "출판"], eligibility: "신인 작가" },
  { id: 47, title: "공공데이터 활용 서비스 공모전", organizer: "행정안전부", category: "IT", prize: 8000000, prizeText: "800만원", deadline: "2025-05-22", dday: 28, target: "개발자", field: "공공데이터/IT", thumbnail: "", color: colors[10], isNew: false, isHot: false, tags: ["공공데이터", "서비스", "개발"], description: "공공데이터를 활용한 유용한 서비스를 개발합니다.", officialUrl: "#", startDate: "2025-03-15", endDate: "2025-05-22", benefits: ["상금", "사업화"], eligibility: "개인 또는 팀" },
  { id: 48, title: "소셜미디어 콘텐츠 크리에이터 공모전", organizer: "방송통신위원회", category: "콘텐츠", prize: 2000000, prizeText: "200만원", deadline: "2025-07-01", dday: 68, target: "크리에이터", field: "SNS/콘텐츠", thumbnail: "", color: colors[11], isNew: true, isHot: false, tags: ["소셜미디어", "콘텐츠", "크리에이터"], description: "소셜미디어 콘텐츠 창작자를 발굴하고 지원합니다.", officialUrl: "#", startDate: "2025-05-01", endDate: "2025-07-01", benefits: ["상금", "지원금"], eligibility: "제한 없음" },
  { id: 49, title: "신재생에너지 기술 개발 공모전", organizer: "한국에너지기술연구원", category: "에너지", prize: 15000000, prizeText: "1,500만원", deadline: "2025-06-20", dday: 57, target: "연구자/기업", field: "에너지/기술", thumbnail: "", color: colors[0], isNew: false, isHot: false, tags: ["신재생에너지", "기술", "연구"], description: "신재생에너지 분야의 혁신 기술을 공모합니다.", officialUrl: "#", startDate: "2025-03-15", endDate: "2025-06-20", benefits: ["상금", "연구 지원"], eligibility: "연구자 또는 기업" },
  { id: 50, title: "대한민국 로봇 올림피아드", organizer: "한국로봇산업진흥원", category: "로봇", prize: 5000000, prizeText: "500만원", deadline: "2025-05-05", dday: 11, target: "학생/팀", field: "로봇/AI", thumbnail: "", color: colors[1], isNew: false, isHot: true, tags: ["로봇", "올림피아드", "AI"], description: "로봇 제작 및 프로그래밍 실력을 겨루는 대회입니다.", officialUrl: "#", startDate: "2025-03-01", endDate: "2025-05-05", benefits: ["상금", "장학금"], eligibility: "초중고대학생 팀" },
  { id: 51, title: "착한 소비 UCC 공모전", organizer: "소비자원", category: "영상", prize: 1000000, prizeText: "100만원", deadline: "2025-06-30", dday: 67, target: "전국민", field: "영상/소비", thumbnail: "", color: colors[2], isNew: false, isHot: false, tags: ["착한소비", "UCC", "영상"], description: "착한 소비 문화를 알리는 UCC 작품을 공모합니다.", officialUrl: "#", startDate: "2025-04-01", endDate: "2025-06-30", benefits: ["상금", "인증서"], eligibility: "제한 없음" },
  { id: 52, title: "2025 건축 학생 설계 공모전", organizer: "대한건축학회", category: "건축", prize: 5000000, prizeText: "500만원", deadline: "2025-07-20", dday: 87, target: "건축학과 학생", field: "건축/설계", thumbnail: "", color: colors[3], isNew: true, isHot: false, tags: ["건축", "설계", "학생"], description: "건축학과 학생들의 창의적인 설계 작품을 공모합니다.", officialUrl: "#", startDate: "2025-05-01", endDate: "2025-07-20", benefits: ["상금", "전시"], eligibility: "건축학과 재학생" },
  { id: 53, title: "패션 브랜드 창업 경진대회", organizer: "섬유패션진흥원", category: "패션", prize: 7000000, prizeText: "700만원", deadline: "2025-05-18", dday: 24, target: "패션 디자이너", field: "패션/창업", thumbnail: "", color: colors[4], isNew: false, isHot: false, tags: ["패션", "창업", "브랜드"], description: "패션 브랜드 창업 아이디어를 공모합니다.", officialUrl: "#", startDate: "2025-03-15", endDate: "2025-05-18", benefits: ["상금", "브랜드 런칭 지원"], eligibility: "패션 관련 전공자" },
  { id: 54, title: "장애인 보조기기 디자인 공모전", organizer: "보건복지부", category: "복지/디자인", prize: 3000000, prizeText: "300만원", deadline: "2025-06-05", dday: 42, target: "디자이너", field: "복지/디자인", thumbnail: "", color: colors[5], isNew: true, isHot: false, tags: ["보조기기", "장애인", "디자인"], description: "장애인의 삶을 개선하는 보조기기 디자인을 공모합니다.", officialUrl: "#", startDate: "2025-04-01", endDate: "2025-06-05", benefits: ["상금", "상품화"], eligibility: "제한 없음" },
  { id: 55, title: "스포츠테크 혁신 공모전", organizer: "문화체육관광부", category: "스포츠", prize: 8000000, prizeText: "800만원", deadline: "2025-05-29", dday: 35, target: "스포츠 관련자", field: "스포츠/IT", thumbnail: "", color: colors[6], isNew: false, isHot: false, tags: ["스포츠테크", "혁신", "IT"], description: "스포츠와 기술을 융합한 혁신 아이디어를 공모합니다.", officialUrl: "#", startDate: "2025-04-01", endDate: "2025-05-29", benefits: ["상금", "시범 사업"], eligibility: "제한 없음" },
  { id: 56, title: "전국 시니어 창업 경진대회", organizer: "중소벤처기업부", category: "창업", prize: 5000000, prizeText: "500만원", deadline: "2025-06-22", dday: 59, target: "중장년층", field: "창업/시니어", thumbnail: "", color: colors[7], isNew: false, isHot: false, tags: ["시니어", "창업", "중장년"], description: "중장년층의 창업 아이디어를 발굴합니다.", officialUrl: "#", startDate: "2025-04-15", endDate: "2025-06-22", benefits: ["상금", "창업 지원"], eligibility: "만 40세 이상" },
  { id: 57, title: "문화유산 디지털화 공모전", organizer: "문화재청", category: "문화", prize: 5000000, prizeText: "500만원", deadline: "2025-07-10", dday: 77, target: "IT/문화 전문가", field: "문화/디지털", thumbnail: "", color: colors[8], isNew: true, isHot: false, tags: ["문화유산", "디지털", "AI"], description: "문화유산을 디지털로 보존하고 활용하는 아이디어를 공모합니다.", officialUrl: "#", startDate: "2025-05-01", endDate: "2025-07-10", benefits: ["상금", "시범 사업"], eligibility: "제한 없음" },
  { id: 58, title: "블록체인 기술 활용 공모전", organizer: "과학기술정보통신부", category: "블록체인", prize: 12000000, prizeText: "1,200만원", deadline: "2025-05-23", dday: 29, target: "개발자", field: "블록체인/IT", thumbnail: "", color: colors[9], isNew: false, isHot: true, tags: ["블록체인", "Web3", "개발"], description: "블록체인 기술을 활용한 혁신 서비스를 개발합니다.", officialUrl: "#", startDate: "2025-03-15", endDate: "2025-05-23", benefits: ["상금", "사업화"], eligibility: "개인 또는 팀" },
  { id: 59, title: "웰니스 라이프스타일 콘텐츠 공모전", organizer: "국민건강보험공단", category: "건강", prize: 2000000, prizeText: "200만원", deadline: "2025-06-18", dday: 55, target: "전국민", field: "건강/콘텐츠", thumbnail: "", color: colors[10], isNew: false, isHot: false, tags: ["웰니스", "건강", "라이프스타일"], description: "건강한 생활 방식을 알리는 콘텐츠를 공모합니다.", officialUrl: "#", startDate: "2025-04-01", endDate: "2025-06-18", benefits: ["상금", "건강 지원"], eligibility: "제한 없음" },
  { id: 60, title: "지속가능한 도시 솔루션 해커톤", organizer: "국토연구원", category: "도시", prize: 10000000, prizeText: "1,000만원", deadline: "2025-05-11", dday: 17, target: "전문가/팀", field: "도시/환경", thumbnail: "", color: colors[11], isNew: true, isHot: true, tags: ["지속가능", "도시", "해커톤"], description: "지속가능한 도시를 만들기 위한 혁신 솔루션을 개발합니다.", officialUrl: "#", startDate: "2025-04-01", endDate: "2025-05-11", benefits: ["상금", "사업화"], eligibility: "제한 없음" },
];

// 서비스 아이템 데이터
export interface ServiceItem {
  id: string;
  category: string;
  categoryColor: string;
  name: string;
  price: number;
  priceText: string;
  icon: string;
  description: string;
}

export const serviceItems: ServiceItem[] = [
  // 기획/디자인
  { id: "s1", category: "기획/디자인", categoryColor: "blue", name: "홈페이지 구축", price: 3000000, priceText: "300만원~", icon: "🌐", description: "공모전 전용 마이크로사이트" },
  { id: "s2", category: "기획/디자인", categoryColor: "blue", name: "포스터 제작", price: 500000, priceText: "50만원~", icon: "🎨", description: "전문 디자이너 포스터 1종" },
  { id: "s3", category: "기획/디자인", categoryColor: "blue", name: "카드뉴스 제작", price: 300000, priceText: "30만원~", icon: "📰", description: "SNS 최적화 카드뉴스 5장" },
  { id: "s4", category: "기획/디자인", categoryColor: "blue", name: "브랜드 로고", price: 800000, priceText: "80만원~", icon: "✨", description: "공모전 전용 CI/BI 개발" },
  { id: "s5", category: "기획/디자인", categoryColor: "blue", name: "영상 광고", price: 2000000, priceText: "200만원~", icon: "🎬", description: "15초~30초 홍보 영상 제작" },
  { id: "s6", category: "기획/디자인", categoryColor: "blue", name: "운영 매뉴얼", price: 500000, priceText: "50만원~", icon: "📋", description: "대회 운영 가이드 문서 작성" },
  // 온라인 홍보
  { id: "s7", category: "온라인 홍보", categoryColor: "purple", name: "배너 광고", price: 1000000, priceText: "100만원~", icon: "📢", description: "포털 배너 광고 2주 집행" },
  { id: "s8", category: "온라인 홍보", categoryColor: "purple", name: "커뮤니티 바이럴", price: 800000, priceText: "80만원~", icon: "💬", description: "에브리타임/DC 등 40개 채널" },
  { id: "s9", category: "온라인 홍보", categoryColor: "purple", name: "SNS 광고", price: 1500000, priceText: "150만원~", icon: "📱", description: "인스타/페이스북 타겟 광고" },
  { id: "s10", category: "온라인 홍보", categoryColor: "purple", name: "AI 자동 배포", price: 500000, priceText: "50만원~", icon: "🤖", description: "40개 채널 AI 자동 홍보" },
  { id: "s11", category: "온라인 홍보", categoryColor: "purple", name: "인플루언서", price: 2000000, priceText: "200만원~", icon: "⭐", description: "분야별 인플루언서 협업" },
  { id: "s12", category: "온라인 홍보", categoryColor: "purple", name: "이메일 마케팅", price: 300000, priceText: "30만원~", icon: "📧", description: "타겟 DB 이메일 발송" },
  // 오프라인
  { id: "s13", category: "오프라인", categoryColor: "green", name: "우편 발송", price: 1500000, priceText: "150만원~", icon: "📮", description: "전국 기관/학교 우편 발송" },
  { id: "s14", category: "오프라인", categoryColor: "green", name: "대학 포스터", price: 2000000, priceText: "200만원~", icon: "🏫", description: "전국 200개 대학 게시판 부착" },
  { id: "s15", category: "오프라인", categoryColor: "green", name: "현수막 제작", price: 500000, priceText: "50만원~", icon: "🎪", description: "공모전 현수막 제작 및 게시" },
  { id: "s16", category: "오프라인", categoryColor: "green", name: "인쇄물 제작", price: 400000, priceText: "40만원~", icon: "📄", description: "리플렛/브로슈어 인쇄" },
  // 프로모션/운영
  { id: "s17", category: "프로모션", categoryColor: "orange", name: "경품 발송", price: 500000, priceText: "50만원~", icon: "🎁", description: "수상자 경품 구매 및 발송" },
  { id: "s18", category: "프로모션", categoryColor: "orange", name: "대국민 투표", price: 1000000, priceText: "100만원~", icon: "🗳️", description: "온라인 투표 시스템 구축" },
  { id: "s19", category: "프로모션", categoryColor: "orange", name: "접수 시스템", price: 800000, priceText: "80만원~", icon: "📝", description: "작품 접수 플랫폼 구축" },
  { id: "s20", category: "프로모션", categoryColor: "orange", name: "심사 대행", price: 2000000, priceText: "200만원~", icon: "⚖️", description: "전문 심사위원 섭외 및 운영" },
  { id: "s21", category: "프로모션", categoryColor: "orange", name: "작품 필터링", price: 1000000, priceText: "100만원~", icon: "🔍", description: "AI 기반 작품 사전 검토" },
  { id: "s22", category: "프로모션", categoryColor: "orange", name: "사무국 운영", price: 3000000, priceText: "300만원~", icon: "🏢", description: "대회 전담 사무국 운영" },
  // 시상식
  { id: "s23", category: "시상식", categoryColor: "red", name: "전문 사회자", price: 1000000, priceText: "100만원~", icon: "🎤", description: "행사 전문 MC 섭외" },
  { id: "s24", category: "시상식", categoryColor: "red", name: "시상식 기획", price: 2000000, priceText: "200만원~", icon: "🏆", description: "시상식 전체 기획 및 진행" },
  { id: "s25", category: "시상식", categoryColor: "red", name: "영상 촬영", price: 1500000, priceText: "150만원~", icon: "📹", description: "행사 사진/영상 기록" },
  { id: "s26", category: "시상식", categoryColor: "red", name: "상패/트로피", price: 500000, priceText: "50만원~", icon: "🥇", description: "맞춤 제작 상패/트로피" },
];

export const snsChannels = [
  { name: "인스타그램", icon: "📸", color: "#E1306C" },
  { name: "페이스북", icon: "📘", color: "#1877F2" },
  { name: "유튜브", icon: "▶️", color: "#FF0000" },
  { name: "틱톡", icon: "🎵", color: "#010101" },
  { name: "X(트위터)", icon: "✖️", color: "#000000" },
  { name: "카카오톡", icon: "💬", color: "#FEE500" },
  { name: "네이버 블로그", icon: "📝", color: "#03C75A" },
  { name: "티스토리", icon: "🔵", color: "#FF4D00" },
  { name: "씽굿", icon: "⚡", color: "#0052FF" },
  { name: "위비티", icon: "🏆", color: "#6B4EFF" },
  { name: "에브리타임", icon: "🎓", color: "#E8003D" },
  { name: "스펙업", icon: "📈", color: "#00C4FF" },
];
