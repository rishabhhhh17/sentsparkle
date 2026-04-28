import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ivory: '#F4EFE6',
        cream: '#EDE6D6',
        parchment: '#FAF6EC',
        ink: '#1B1A17',
        graphite: '#2C2A26',
        smoke: '#6E685D',
        stone: '#A6A095',
        gold: '#9A7E4F',
        ember: '#7A4B2A',
        rose: '#C9A48A',
        muted: '#D9CFB8',
        line: '#D8CFB8',
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.22em',
      },
      borderRadius: {
        none: '0',
        sm: '2px',
        DEFAULT: '4px',
        md: '6px',
      },
      boxShadow: {
        soft: '0 2px 24px rgba(27,26,23,0.06)',
        card: '0 8px 40px rgba(27,26,23,0.08)',
      },
      maxWidth: {
        prose: '62ch',
      },
    },
  },
  plugins: [],
};
export default config;
