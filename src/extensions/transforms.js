import StyleDictionary from "style-dictionary";
import { checkGradientType } from "../helpers/extraTypes.js";
import ignored from "../constants/ignored-words.js";
import { weights } from "../constants/typography.js";
import { sizes } from "../constants/categories.js";

// РЕГИСТРАЦИЯ ТРАНСФОРМАЦИЙ ТОКЕНОВ
// ************************************ */

// Attribute: создание атрибута темы и удаление ее из массива path
StyleDictionary.registerTransform({
  type: "attribute",
  name: "skr/attribute/split",
  transformer: function (token) {
    const { path, type } = token;
    const themes = ["global", "light", "dark"];
    const possibleTheme = path[0];
    const attributes = {};
    const isTheme = themes.some((theme) => possibleTheme.indexOf(theme) !== -1);
    attributes.theme = isTheme ? possibleTheme : "global";

    if (sizes.includes(type)) attributes.category = "size";

    checkGradientType(token);

    path[0] = "";

    if (ignored.includes(path[1])) path[1] = "";

    return attributes;
  },
});

// Attribute: создание атрибута темы и удаление ее из массива path, если тема global
// *Название темы сохраняется для дальнейшей генерации имен переменных
StyleDictionary.registerTransform({
  type: "attribute",
  name: "skr/attribute/common",
  transformer: function (token) {
    const { path, type } = token;
    const themes = ["global", "light", "dark"];
    const possibleTheme = path[0];
    const attributes = {};
    const isTheme = themes.some((theme) => possibleTheme.indexOf(theme) !== -1);
    attributes.theme = isTheme ? possibleTheme : "global";

    checkGradientType(token);

    if (sizes.includes(type)) attributes.category = "size";

    if (attributes.theme === "global") path[0] = "";

    if (ignored.includes(path[1])) path[1] = "";

    return attributes;
  },
});

// Value: мутация значений color в gradient для отделения цветов
StyleDictionary.registerTransform({
  type: `value`,
  transitive: true,
  name: `skr/gradient`,
  matcher: ({ type }) => type == "color",
  transformer: (token) => {
    checkGradientType(token);
    return token.value;
  },
});

// Value: трансформация значений opacity
// В Figma можно задавать значения в % или дробью
StyleDictionary.registerTransform({
  type: `value`,
  transitive: true,
  name: `skr/opacity`,
  matcher: ({ type }) => type == "opacity",
  transformer: ({ value }) =>
    value[value.length] === "%" ? value : +value.slice(0, -1) / 100,
});

// Value: трансформация значений typography в строку для переменных font
StyleDictionary.registerTransform({
  type: `value`,
  transitive: true,
  name: `skr/typography`,
  matcher: ({ type }) => type == "typography",
  transformer: ({ value }) =>
    `${weights[value.fontWeight]} ${value.fontSize}/${value.lineHeight} ${
      value.fontFamily
    }`,
});

// Value: трансформация значений boxShadow в строку для переменных box-shadow
StyleDictionary.registerTransform({
  type: `value`,
  transitive: true,
  name: `skr/boxShadow`,
  matcher: ({ type }) => type === "boxShadow",
  transformer: ({ value }) => {
    const shadowString = ({ x, y, blur, spread, color }) =>
      `${x}px ${y}px ${blur}px ${spread}px ${color}`;
    return Array.isArray(value)
      ? value.map((part) => shadowString(part)).join(", ")
      : shadowString(value);
  },
});
