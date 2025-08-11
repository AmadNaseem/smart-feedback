module.exports = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./styles/**/*.{css,scss}",
    "./lib/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // New modern aurora-inspired palette
        primary: {
          DEFAULT: '#6366F1', // fallback
          50: '#F2F5FF',
          100: '#E5EAFF',
          200: '#C7D0FE',
          300: '#A9B5FD',
          400: '#8B9BFC',
          500: '#6D80FA',
          600: '#4F65F9',
          700: '#314AF8',
          800: '#1730E6',
          900: '#1226B4'
        },
        brand: {
          pink: '#F472B6',
          violet: '#8B5CF6',
          sky: '#0EA5E9',
          teal: '#06B6D4',
          amber: '#F59E0B'
        },
        surface: {
          50: '#F9FAFB',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          800: '#1E293B',
          900: '#0F172A'
        },
        accent: '#0EA5E9',
        secondary: '#8B5CF6',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#0EA5E9',
      },
      textColor: {
        DEFAULT: 'var(--color-text)',
        soft: 'var(--color-text-soft)',
        strong: 'var(--color-text-strong)'
      },
      backgroundColor: {
        base: 'var(--color-bg-base)',
        muted: 'var(--color-bg-muted)',
        elevated: 'var(--color-bg-elevated)'
      },
      borderColor: {
        base: 'var(--color-border)'
      },
    },
  },
  plugins: [],
};
