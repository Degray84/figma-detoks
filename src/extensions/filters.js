import StyleDictionary from "style-dictionary";

// РЕГИСТРАЦИЯ ФИЛЬТРОВ
// ************************************

// Фильтр токенов темной темы по атрибуту dark
StyleDictionary.registerFilter({
  name: "dark",
  matcher: function ({ attributes }) {
    return attributes.theme === "dark";
  },
});

// Фильтр всех токенов кроме темной темы по атрибуту dark
StyleDictionary.registerFilter({
  name: "common",
  matcher: function ({ attributes }) {
    return attributes.theme !== "dark";
  },
});
