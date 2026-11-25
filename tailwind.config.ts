import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        workspace: { base: '#101210', panel: '#151815', line: '#2a302a', muted: '#899188', text: '#d6dbd4', green: '#a8c98a' },
      },
      fontFamily: { mono: ['"IBM Plex Mono"', '"SFMono-Regular"', 'Consolas', 'monospace'] },
    },
  },
  plugins: [],
} satisfies Config
