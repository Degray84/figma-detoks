import StyleDictionary from "style-dictionary";

// РЕГИСТРАЦИЯ ГРУПП ТРАНСФОРМАЦИЙ
// ************************************ */

const COMMON = [
  "size/px",
  "skr/gradient",
  "skr/boxShadow",
  "skr/typography",
  "skr/opacity",
];

// Группа трансформаций для CSS токенов
StyleDictionary.registerTransformGroup({
  name: "skr/css",
  transforms: [
    "skr/attribute/split",
    "name/cti/kebab",
    "time/seconds",
    "content/icon",
    "color/hex",
    ...COMMON,
  ],
});

// Группа трансформаций для JS токенов
StyleDictionary.registerTransformGroup({
  name: "skr/js",
  transforms: [
    "skr/attribute/common",
    "name/cti/pascal",
    "color/hex",
    ...COMMON,
  ],
});

// Группа трансформаций для SCSS токенов
StyleDictionary.registerTransformGroup({
  name: "skr/scss",
  transforms: [
    "skr/attribute/common",
    "name/cti/kebab",
    "time/seconds",
    "content/icon",
    "color/css",
    ...COMMON,
  ],
});
