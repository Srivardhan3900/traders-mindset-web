/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Apple dark palette
        apple: {
          black:   '#000000',
          bg1:     '#0a0a0a',
          bg2:     '#111111',
          bg3:     '#1a1a1a',
          bg4:     '#222222',
          white:   '#f5f5f7',   // Apple's off-white
          gray1:   '#a1a1a6',   // Apple's medium gray
          gray2:   '#6e6e73',   // Apple's muted gray
          gray3:   '#3a3a3c',   // Apple's very muted
          gray4:   '#2a2a2a',
          blue:    '#2997ff',   // Apple's signature blue
          blueDim: '#0077ed',
        },
      },
      fontFamily: {
        // SF Pro stack — falls back through system fonts to Inter
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          '"SF Pro Text"',
          '"Helvetica Neue"',
          'Inter',
          'sans-serif',
        ],
      },
      fontSize: {
        // Apple-scale type sizes
        'display-xl': ['clamp(3rem,7vw,5.5rem)',  { lineHeight: '1.03', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2.25rem,5vw,4rem)',  { lineHeight: '1.06', letterSpacing: '-0.028em' }],
        'display-md': ['clamp(1.75rem,3.5vw,2.75rem)', { lineHeight: '1.1',  letterSpacing: '-0.024em' }],
        'headline':   ['clamp(1.25rem,2.5vw,1.75rem)', { lineHeight: '1.18', letterSpacing: '-0.018em' }],
        'body-lg':    ['1.0625rem',  { lineHeight: '1.53', letterSpacing: '-0.014em' }],  // 17px
        'body':       ['0.9375rem',  { lineHeight: '1.47', letterSpacing: '-0.012em' }],  // 15px
        'caption':    ['0.8125rem',  { lineHeight: '1.38', letterSpacing: '-0.008em' }],  // 13px
        'micro':      ['0.6875rem',  { lineHeight: '1.3',  letterSpacing: '0.04em'  }],  // 11px
      },
      borderRadius: {
        'apple-sm': '10px',
        'apple':    '18px',
        'apple-lg': '24px',
        'apple-xl': '32px',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },
      transitionTimingFunction: {
        'apple': 'cubic-bezier(0.25,0.46,0.45,0.94)',
        'apple-bounce': 'cubic-bezier(0.34,1.56,0.64,1)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
      backdropBlur: {
        'apple': '20px',
        'apple-xl': '40px',
      },
      keyframes: {
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%':   { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-up':  'fade-up 0.7s cubic-bezier(0.25,0.46,0.45,0.94) both',
        'fade-in':  'fade-in 0.5s ease both',
        'scale-in': 'scale-in 0.5s cubic-bezier(0.25,0.46,0.45,0.94) both',
      },
      boxShadow: {
        'apple-card':  '0 0 0 1px rgba(255,255,255,0.06)',
        'apple-float': '0 20px 60px rgba(0,0,0,0.5)',
        'apple-hero':  '0 40px 120px rgba(0,0,0,0.7)',
        'apple-glow':  '0 0 40px rgba(41,151,255,0.15)',
      },
    },
  },
  plugins: [],
};
