/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        skyblue: '#87CEEB',
        babypink: '#FFC0CB',
        purple: '#8A2BE2',
        mellowyellow: '#FFD54F',
        softgrey: '#F1F5F9'
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0,0,0,0.06)'
      }
    },
  },
  plugins: [],
}
