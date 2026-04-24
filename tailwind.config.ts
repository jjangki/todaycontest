import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0052FF",
        "primary-dark": "#0040CC",
        "primary-light": "#4080FF",
        accent: "#FFD600",
        "accent-dark": "#E6C000",
        background: "#F8FAFC",
        text: "#1E293B",
        "text-muted": "#64748B",
        "text-light": "#94A3B8",
        border: "#E2E8F0",
        "card-bg": "#FFFFFF",
      },
      fontFamily: {
        sans: ["Pretendard", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      lineHeight: {
        relaxed: "1.6",
      },
      letterSpacing: {
        tight: "-0.02em",
      },
      maxWidth: {
        container: "1200px",
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        "marquee-reverse": "marquee-reverse 30s linear infinite",
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 3s ease-in-out infinite",
        "slide-in-right": "slideInRight 0.5s ease-out forwards",
        "count-up": "countUp 2s ease-out forwards",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        slideInRight: {
          from: { opacity: "0", transform: "translateX(50px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        countUp: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      boxShadow: {
        card: "0 2px 16px rgba(0, 82, 255, 0.08)",
        "card-hover": "0 8px 32px rgba(0, 82, 255, 0.18)",
        floating: "0 20px 60px rgba(0, 0, 0, 0.12)",
        glow: "0 0 20px rgba(0, 82, 255, 0.3)",
      },
    },
  },
  plugins: [],
};
export default config;
