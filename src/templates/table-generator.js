import types from "./types.js";
import { propString, headString } from "./box-templates.js";

export default function (type, obj, dependent) {
  let parser, split;
  if (!types[type]) {
    parser = null;
    split = false;
  } else {
    ({ parser, split } = types[type]);
  }
  if (split && dependent) {
    return (
      `## Переменные ${type}\n` +
      headString("Имя", ["Светлый", "Темный"]) +
      `${Object.entries(obj)
        .map(([name, value]) =>
          propString(name, [value.light, value.dark], parser)
        )
        .join("")}\n`
    );
  } else {
    return (
      `## Переменные ${type}\n` +
      headString("Имя", ["Значение"]) +
      `${Object.entries(obj)
        .map(([name, value]) => propString(name, [value.global], parser))
        .join("")}\n`
    );
  }
}
