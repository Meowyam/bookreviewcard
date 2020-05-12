module.exports = {
  purge: [],
  theme: {
    fontFamily: {
      'serif': ['"Playfair Display SC"', 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
      'sans': ['Montserrat', 'Roboto', '"Helvetica Neue"', 'Arial', '"Noto Sans"', '"Noto Color Emoji"', 'sans-serif'],
    },
    extend: {},
  },
  variants: {},
  plugins: [
    require('@tailwindcss/custom-forms')
  ],
}
