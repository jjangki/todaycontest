// Design Tokens
export const C = {
  primary: '#0052FF',
  primaryDark: '#003FCC',
  primaryLight: '#4080FF',
  primaryBg: 'rgba(0,82,255,0.08)',
  accent: '#FFD600',
  accentDark: '#E6C000',
  accentBg: 'rgba(255,214,0,0.15)',
  bg: '#F8FAFC',
  white: '#FFFFFF',
  text: '#1E293B',
  textMuted: '#64748B',
  textLight: '#94A3B8',
  border: '#E2E8F0',
  borderLight: '#F1F5F9',
  red: '#EF4444',
  redBg: '#FEF2F2',
  green: '#22C55E',
  greenBg: '#F0FDF4',
  purple: '#8B5CF6',
  purpleBg: '#F5F3FF',
  orange: '#F97316',
  orangeBg: '#FFF7ED',
  darkBg: '#030B2E',
  cardShadow: '0 2px 16px rgba(0,82,255,0.08)',
  cardHover: '0 8px 32px rgba(0,82,255,0.16)',
  floatShadow: '0 20px 60px rgba(0,0,0,0.15)',
};

export const radius = {
  sm: '8px', md: '12px', lg: '16px', xl: '20px', xxl: '24px', full: '9999px',
};

export const font = {
  xs: '11px', sm: '13px', base: '15px', md: '16px', lg: '18px',
  xl: '20px', '2xl': '24px', '3xl': '30px', '4xl': '36px', '5xl': '48px',
};

// Reusable style objects
export const flex = (align='center', justify='flex-start', gap=0): React.CSSProperties => ({
  display:'flex', alignItems:align, justifyContent:justify, gap: gap || undefined,
});

export const card = (hover=false): React.CSSProperties => ({
  background: C.white,
  borderRadius: radius.xl,
  boxShadow: hover ? C.cardHover : C.cardShadow,
  overflow: 'hidden',
});
