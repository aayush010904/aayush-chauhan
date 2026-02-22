/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        base: '#121212',
        'base-highlight': '#161616',
        panel: '#121212',
        panelSoft: '#1a1a1a',
        panelHover: '#1f1f1f',
        accent: '#1DB954',
        'accent-hover': '#1ed760',
        'accent-muted': 'rgba(29, 185, 84, 0.12)',
        textMuted: '#a7a7a7',
        textSubtle: '#727272',
        border: 'transparent',
        'border-hover': 'transparent',
      },
      boxShadow: {
        glow: '0 0 20px rgba(29, 185, 84, 0.18)',
        'glow-lg': '0 0 40px rgba(29, 185, 84, 0.12), 0 0 80px rgba(29, 185, 84, 0.06)',
        panel: '0 8px 24px rgba(0, 0, 0, 0.5)',
        'panel-lg': '0 16px 48px rgba(0, 0, 0, 0.6)',
        card: '0 4px 16px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 8px 32px rgba(0, 0, 0, 0.5)',
        'inner-soft': 'inset 0 1px 0 rgba(255, 255, 255, 0.04)',
      },
      backgroundImage: {
        grain: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)',
        'gradient-card': 'linear-gradient(180deg, #161616 0%, #121212 100%)',
        'gradient-hero': 'linear-gradient(180deg, rgba(29, 185, 84, 0.12) 0%, #121212 45%)',
        'gradient-fade': 'linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.7))',
      },
      borderRadius: {
        'spotify': '8px',
        'spotify-lg': '12px',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'smooth': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      transitionDuration: {
        '180': '180ms',
        '220': '220ms',
        '280': '280ms',
        '350': '350ms',
      },
      animation: {
        pulseGlow: 'pulseGlow 3s ease-in-out infinite',
        shimmer: 'shimmer 1.5s ease-in-out infinite',
        'fade-in': 'fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'scale-in': 'scaleIn 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 rgba(29, 185, 84, 0.18)' },
          '50%': { boxShadow: '0 0 18px rgba(29, 185, 84, 0.22)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
