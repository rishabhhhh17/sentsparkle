export const tokens = {
  color: {
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
  font: {
    display: 'var(--font-display)',
    sans: 'var(--font-sans)',
  },
  radius: { sm: '2px', md: '4px', lg: '6px' },
  shadow: {
    soft: '0 2px 24px rgba(27,26,23,0.06)',
    card: '0 8px 40px rgba(27,26,23,0.08)',
  },
} as const;
