module.exports = {
  content: [
    "./src/templates/**/*.twig",
    "./src/js/**/*.{js,ts}",
    "./src/css/**/*.css",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
