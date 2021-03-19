module.exports = {
  purge: false,
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'sans': ['Roboto'],
    },
    extend: {},
  },
  variants: {
    extend: {
      position: ['hover', 'group-hover'],
      zIndex: ['hover', 'group-hover'],
      scale: ['hover', 'group-hover'],
      fill: ['hover'],
    },
  },
  plugins: [],
}
