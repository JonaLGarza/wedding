/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
      theme: {  
    extend: {
      colors: {
        // Wedding Brand Palette
        wedding: {
          // Light Theme Colors
          'rose-blush': '#F8E1E7',
          'ivory-white': '#FFFFFF',
          'champagne-gold': '#D4AF37',
          'sage-green': '#A3B18A',
          'charcoal-gray': '#2F2F2F',
          // Dark Theme Colors
          'midnight-plum': '#2B1B2D',
          'antique-rose': '#C08081',
          'pale-ivory': '#F5F5F0',
          'soft-gold': '#C9A66B',
          'deep-green': '#556B2F',
        },
        // Legacy brand colors for backward compatibility
        brand: {
          olive: '#6B705C',
          beige: '#D8C3A5',
          terracotta: '#B5651D',
          brown: '#8D6E63',
          ivory: '#F5F5DC',
          gold: '#C9A66B',
          'olive-700': '#5E6653',
          'olive-900': '#42483A',
          'terracotta-700': '#8F4E17',
          'terracotta-900': '#6D3A10',
          'brown-700': '#6E564E',
          'brown-900': '#4E3D38',
        },
        ring: {
          DEFAULT: 'rgba(212, 175, 55, 0.55)', // champagne gold with opacity
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'ui-serif', 'Georgia', 'serif'],
        script: ['var(--font-script)', 'Pinyon Script', 'cursive'],
        viaoda: ['Viaoda Libre', 'cursive'],
        // Legacy fonts for backward compatibility
        'body': ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
    },
  },
    plugins: [],
  };
  