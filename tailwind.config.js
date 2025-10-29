/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,ts,tsx}', './src/**/*.{js,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        'primary-regular': ['Manrope_400Regular', 'sans-serif'],
        'primary-medium': ['Manrope_500Medium', 'sans-serif'],
        'primary-semibold': ['Manrope_600SemiBold', 'sans-serif'],
        'primary-bold': ['Manrope_700Bold', 'sans-serif'],
      },
      fontSize: {
        '3xl': [30, { lineHeight: 38/30 }],
        '2xl': [26, { lineHeight: 32/26 }],
        'xl': [20, { lineHeight: 26/20 }],
        'lg': [18, { lineHeight: 22/18 }],
        'base': [16, { lineHeight: 24/16 }],
        'sm': [14, { lineHeight: 20/14 }],
        'xs': [12, { lineHeight: 16/12 }],
      },
      colors: {
        'black': {
          main: '#1E222B',
          100: '#3E4554',
          200: '#616A7D',
          300: '#8891A5',
          400: '#B2BBCE',
          500: '#F8F9FB',
          600: '#FAFBFD',
        },
        'light-yellow': '#FFC83A',
        'dark-yellow': '#F9B023',
        'blue': {
          'light': '#2A4BA0',
          'dark': '#153075',
        },
        
      },
    },
  },
  plugins: [],
};
