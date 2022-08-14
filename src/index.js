import StyleDictionary from "style-dictionary";

import "./extensions/prepare.js";
import "./extensions/formats.js";
import "./extensions/transforms.js";
import "./extensions/transform-groups.js";
import "./extensions/filters.js";
import "./extensions/files.js";

const PATH = "data/tokens.json";

// ПРЕДВАРИТЕЛЬНЫЙ ПАРСИНГ ТОКЕНОВ
// ************************************ */

StyleDictionary.findAttributes(PATH);

// НАСТРОЙКА И ЗАПУСК StyleDictionary
// ************************************ */

const myStyleDictionary = StyleDictionary.extend({
  source: [PATH],
  platforms: {
    css: {
      transformGroup: "skr/css",
      prefix: "skr",
      files: [
        ...StyleDictionary.getFilters("css", "css", "css/variables"),
        ...StyleDictionary.getParts("css", "css", "css/variables"),
        {
          destination: "docs/props/css.md",
          format: "skr/docs/split",
          options: {
            showFileHeader: false,
          },
        },
      ],
    },
    js: {
      transformGroup: "skr/js",
      files: [
        ...StyleDictionary.getFilters("js", "js", "javascript/es6"),
        ...StyleDictionary.getFilters(
          "js",
          "d.ts",
          "typescript/es6-declarations"
        ),
        ...StyleDictionary.getParts("js", "js", "javascript/es6"),
        ...StyleDictionary.getParts(
          "js",
          "d.ts",
          "typescript/es6-declarations"
        ),
        {
          destination: "docs/props/js.md",
          format: "skr/docs",
          options: {
            showFileHeader: false,
          },
        },
      ],
    },
    scss: {
      transformGroup: "skr/scss",
      files: [
        ...StyleDictionary.getFilters("scss", "scss", "scss/variables"),
        ...StyleDictionary.getParts("scss", "scss", "scss/variables"),
        {
          destination: "docs/props/scss.md",
          format: "skr/docs",
          options: {
            showFileHeader: false,
          },
        },
      ],
    },
  },
});

myStyleDictionary.buildAllPlatforms();
