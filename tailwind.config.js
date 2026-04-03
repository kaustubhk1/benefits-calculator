/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        accessible: {
          50: '#f8fafc',
          900: '#0f172a',
          primary: '#4338ca', // indigo-700
          hover: '#3730a3',
          border: '#cbd5e1',
        }
      }
    },
  },
  plugins: [],
};
