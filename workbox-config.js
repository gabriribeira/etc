//eslint-disable-next-line no-undef
module.exports = {
  globDirectory: "build/",
  globPatterns: ["**/*.{json,ico,html,png,txt,css,js,webp,ttf}"],
  swDest: "build/sw.js",
  ignoreURLParametersMatching: [/^utm_/, /^fbclid$/],
};
