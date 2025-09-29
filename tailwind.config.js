/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'oscilloscope': '#00FF00',
      },
      fontFamily: {
        'mono': ['Press Start 2P', 'Courier New', 'monospace'],
        'press-start': ['Press Start 2P', 'monospace'],
      },
      textShadow: {
        'glow': '0 0 5px #00FF00, 0 0 10px #00FF00, 0 0 15px #00FF00',
      },
      boxShadow: {
        'glow': '0 0 5px #00FF00, 0 0 10px #00FF00, 0 0 15px #00FF00',
      }
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.text-glow': {
          'text-shadow': '0 0 5px #00FF00, 0 0 10px #00FF00, 0 0 15px #00FF00',
        },
        '.border-glow': {
          'box-shadow': '0 0 5px #00FF00, 0 0 10px #00FF00, 0 0 15px #00FF00',
        }
      }
      addUtilities(newUtilities)
    }
  ],
}
