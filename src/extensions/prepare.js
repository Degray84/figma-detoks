import fs from "fs";
import StyleDictionary from "style-dictionary";
import { getTypes, getThemes } from "../helpers/calculations.js";

StyleDictionary.findAttributes = function (path) {
  const tokens = JSON.parse(fs.readFileSync(path));

  // Собираем из токенов все типы
  // [borderWidth, opacity, color, ...]
  this.allTypes = getTypes(tokens);

  // Собираем из токенов все темы
  // [global, dark, light, ...]
  this.allThemes = getThemes(tokens);
};
