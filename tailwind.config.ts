import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#1c1917',
        foreground: '#e7e5e4',
        'muted-foreground': '#a8a29e',
        border: '#44403c',
        'code-bg': '#292524',
        'sidebar-bg': '#161412',
        'accent-blue': '#6ba3d6',
        'accent-orange': '#e8834a',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      spacing: {
        'sidebar-width': '280px',
        'sidebar-mobile': '240px',
        'content-max': '900px',
      },
    },
  },
  plugins: [],
};

export default config;
