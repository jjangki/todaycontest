const channels = [
  { name: "Instagram", icon: "📸", color: "#E1306C" },
  { name: "Facebook", icon: "📘", color: "#1877F2" },
  { name: "YouTube", icon: "▶️", color: "#FF0000" },
  { name: "TikTok", icon: "🎵", color: "#010101" },
  { name: "X (Twitter)", icon: "✖️", color: "#000000" },
  { name: "카카오톡", icon: "💬", color: "#FEE500" },
  { name: "네이버 블로그", icon: "📝", color: "#03C75A" },
  { name: "티스토리", icon: "🔵", color: "#FF4D00" },
  { name: "씽굿", icon: "⚡", color: "#0052FF" },
  { name: "위비티", icon: "🏆", color: "#6B4EFF" },
  { name: "에브리타임", icon: "🎓", color: "#E8003D" },
  { name: "캠퍼스픽", icon: "📚", color: "#FF6B35" },
  { name: "링크드인", icon: "💼", color: "#0A66C2" },
  { name: "스펙업", icon: "📈", color: "#00C4FF" },
  { name: "잡코리아", icon: "💼", color: "#FF6600" },
  { name: "사람인", icon: "🔍", color: "#FF3E3E" },
  { name: "왓츠앱", icon: "💬", color: "#25D366" },
  { name: "텔레그램", icon: "✈️", color: "#2CA5E0" },
  { name: "네이버 카페", icon: "☕", color: "#03C75A" },
  { name: "다음 카페", icon: "🏠", color: "#FF5733" },
];

const row2Channels = [
  { name: "브런치", icon: "✍️", color: "#333333" },
  { name: "포스타입", icon: "🖊️", color: "#1E2226" },
  { name: "공모전 대회", icon: "🎯", color: "#FF6B35" },
  { name: "스타트업 IR", icon: "💡", color: "#FFD600" },
  { name: "유니타운", icon: "🏙️", color: "#4A90D9" },
  { name: "글로벌 SNS", icon: "🌍", color: "#34A853" },
  { name: "레딧", icon: "🔴", color: "#FF4500" },
  { name: "핀터레스트", icon: "📌", color: "#E60023" },
  { name: "플리커", icon: "🌊", color: "#FF0084" },
  { name: "미디엄", icon: "📰", color: "#000000" },
  { name: "네이버 밴드", icon: "📣", color: "#00D42B" },
  { name: "카카오 스토리", icon: "📖", color: "#FEE500" },
  { name: "슬라이드쉐어", icon: "📊", color: "#0077B5" },
  { name: "국민청원", icon: "🏛️", color: "#0052FF" },
  { name: "공공기관 포털", icon: "🔏", color: "#2D2D2D" },
];

function ChannelChip({ ch }: { ch: { name: string; icon: string; color: string } }) {
  return (
    <div className="flex items-center gap-2.5 px-5 py-3 bg-white rounded-2xl shadow-card border border-border mx-2 whitespace-nowrap hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 cursor-default">
      <span className="text-xl">{ch.icon}</span>
      <span className="text-sm font-semibold text-text">{ch.name}</span>
    </div>
  );
}

export default function MarqueeSection() {
  const doubled = [...channels, ...channels];
  const doubled2 = [...row2Channels, ...row2Channels];

  return (
    <section className="py-16 bg-background overflow-hidden" aria-label="연동 채널 목록">
      <div className="container-max mb-10 text-center">
        <p className="text-sm font-semibold text-primary mb-2 uppercase tracking-wider">1 TO 40 · 초연결 AI 자동 배포</p>
        <h2 className="text-2xl md:text-3xl font-black text-text">
          <span className="text-gradient">40개 이상</span>의 채널에 동시 배포됩니다
        </h2>
        <p className="text-text-muted mt-3">포털, SNS, 커뮤니티 전 채널을 커버합니다</p>
      </div>

      {/* Row 1 - Left scroll */}
      <div className="marquee-container relative overflow-hidden mb-3">
        <div className="marquee-inner flex animate-marquee">
          {doubled.map((ch, i) => (
            <ChannelChip key={i} ch={ch} />
          ))}
        </div>
      </div>

      {/* Row 2 - Right scroll */}
      <div className="marquee-container relative overflow-hidden">
        <div className="marquee-inner flex animate-marquee-reverse">
          {doubled2.map((ch, i) => (
            <ChannelChip key={i} ch={ch} />
          ))}
        </div>
      </div>
    </section>
  );
}
