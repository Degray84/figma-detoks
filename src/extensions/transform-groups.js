import StyleDictionary from "style-dictionary";

// РЕГИСТРАЦИЯ ГРУПП ТРАНСФОРМАЦИЙ
// ************************************ */

const COMMON = [
  "size/px",
  "plx/gradient",
  "plx/boxShadow",
  "plx/typography",
  "plx/opacity",
];

// Группа трансформаций для CSS токенов
StyleDictionary.registerTransformGroup({
  name: "plx/css",
  transforms: [
    "plx/attribute/split",
    "name/cti/kebab",
    "time/seconds",
    "content/icon",
    "color/hex",
    ...COMMON,
  ],
});

// Группа трансформаций для JS токенов
StyleDictionary.registerTransformGroup({
  name: "plx/js",
  transforms: [
    "plx/attribute/common",
    "name/cti/pascal",
    "color/hex",
    ...COMMON,
  ],
});

// Группа трансформаций для SCSS токенов
StyleDictionary.registerTransformGroup({
  name: "plx/scss",
  transforms: [
    "plx/attribute/common",
    "name/cti/kebab",
    "time/seconds",
    "content/icon",
    "color/css",
    ...COMMON,
  ],
});
