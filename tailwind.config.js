/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
      theme: {  
    extend: {
      fontFamily: {
        sans: ['Roboto', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
        script: ['var(--font-script)', 'Pinyon Script', 'cursive'],
        viaoda: ['Viaoda Libre', 'cursive'],
      },
    },
  },
    plugins: [],
  };
  