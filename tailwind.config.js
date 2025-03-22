/** @type {import('tailwindcss').Config} */
const { heroui } = require("@heroui/react");

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}', 
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],

  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        md: '1.5rem',
        lg: '2rem',
      },
    },
    extend: {
      colors: {
		  azul: '#004aad',
        'celeste-fuerte': '#90C0E8',
        plomo: '#B7BDC5',
        'plomo-oscuro': '#94aab8',
        'celeste-plomado-oscuro': '#CDDAE3',
        'plomo-claro': '#cddae3',
        'celeste-plomado-claro': '#E3E7F0',
        rosado: '#FFF9F9',
        primary: {
          DEFAULT: '#004aad', // Azul base
          50: '#D4E1F1', // Azul muy claro
          100: '#A8C3E6', // Azul claro
          200: '#7BA5DB', // Azul medio claro
          300: '#4E87D0', // Azul medio
          400: '#2171C5', // Azul más fuerte
          500: '#000361', // Azul base
          600: '#00004E', // Azul más oscuro
          700: '#00003B', // Azul muy oscuro
          800: '#000028', // Azul muy oscuro
          900: '#000015', // Azul casi negro
        },
      },
    },
  },
  plugins: [
    heroui({
      themes: {
        modern: {
          extend: 'dark', 
          colors: {
            background: '#0D001A',
            foreground: '#ffffff',
            primary: {
              50: '#D4E1F1',
              100: '#A8C3E6',
              200: '#7BA5DB',
              300: '#4E87D0',
              400: '#2171C5',
              500: '#000361',
              600: '#00004E',
              700: '#00003B',
              800: '#000028',
              900: '#000015',
              DEFAULT: '#000361', // Azul base predeterminado
            },
            focus: '#2171C5', // Azul brillante para foco
          },
        },
      },
    }),
  ],
};
