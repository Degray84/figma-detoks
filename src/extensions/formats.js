import StyleDictionary from "style-dictionary";
import tableGenerator from "../templates/table-generator.js";
import { checkGradientType } from "../helpers/extraTypes.js";
import priority from "../constants/priority.js";

import _ from "lodash";

// РЕГИСТРАЦИЯ ФОРМАТОВ ВЫВОДА ФАЙЛОВ
// ************************************ */

// Формат вывода документации с разделением столбцов на глобальные и тематические
StyleDictionary.registerFormat({
  name: "plx/docs",
  formatter: function (token) {
    const { allTokens } = token;
    const other = {};
    allTokens.forEach(({ name, value, type }) => {
      checkGradientType({ type, value });
      _.set(other, [type, name, "global"], value);
    });
    other;
    return Object.entries(other)
      .sort(sortByKey)
      .map(([key, value]) => tableGenerator(key, value))
      .join("");
  },
});

// Формат вывода документации без разделения столбцов
StyleDictionary.registerFormat({
  name: "plx/docs/split",
  formatter: function (token) {
    const { allTokens } = token;
    const dependent = {};
    const other = {};
    allTokens.forEach(({ name, value, type, attributes }) => {
      const { theme } = attributes;
      checkGradientType({ type, value });
      if (theme === "global") {
        _.set(other, [type, name, theme], value);
      } else {
        _.set(dependent, [type, name, theme], value);
      }
    });
    return (
      "## Зависимые \n" +
      "> Переменные изменяют значение в зависимости от цветовой схемы \n" +
      Object.entries(dependent)
        .sort(sortByKey)
        .map(([key, value]) => tableGenerator(key, value, true))
        .join("") +
      "## Независимые \n" +
      "> Переменные не изменяют значение в зависимости от цветовой схемы \n" +
      Object.entries(other)
        .sort(sortByKey)
        .map(([key, value]) => tableGenerator(key, value))
        .join("")
    );
  },
});

function sortByKey(a, b) {
  const key1 = a[0];
  const key2 = b[0];
  const reversed = [...priority].reverse();
  const priorityKey1 = reversed.indexOf(key1);
  const priorityKey2 = reversed.indexOf(key2);
  if (priorityKey1 < priorityKey2) {
    return 1;
  }
  if (priorityKey1 > priorityKey2) {
    return -1;
  }
  return 0;
}
