const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");
module.exports = {
  plugins: [// require('@csstools/postcss-sass')
  require("autoprefixer"), require("postcss-selector-matches")({
    lineBreak: true,
  }), //Some plugins, like tailwindcss/nesting, need to run before Tailwind, tailwindcss(), //But others, like autoprefixer, need to run after, autoprefixer],
};
