import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        emerald: {
          900: "#002200",
          800: "#004400",
          700: "#005500",
          600: "#006600", // Pakistani Emerald Green
        },
        lime: {
          neon: "#c8f560",
        },
        surface: {
          DEFAULT: "#141714",
          light: "#1a1d1a",
        },
        border: {
          DEFAULT: "#252825",
          highlight: "#2f342f",
        }
      },
      fontFamily: {
        rajdhani: ["var(--font-rajdhani)"],
        space: ["var(--font-space-grotesk)"],
      },
      animation: {
        'scan': 'scan 2s linear infinite',
      },
      keyframes: {
        scan: {
          '0%': { top: '0%' },
          '100%': { top: '100%' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
