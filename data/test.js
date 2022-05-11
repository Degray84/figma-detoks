import tokens from "./tokens.json";
import { set, camelCase, kebabCase } from "lodash";

const obj = {};
const props = {};
const themes = ["light", "dark"];
const prefix = "plx";

function findTypes(tokens, theme = "") {
  Object.keys(tokens).forEach((key) => {
    const tokensType = tokens[key].type;
    if (tokensType) {
      const camelizedName = camelCase(`${key}-${theme}`);
      const propsName = (prefix ? `--${prefix}-` : "--") + kebabCase(key);
      if (theme) {
        set(obj, [theme, tokensType, camelizedName], tokens[key].value);
        set(
          props,
          [theme, tokensType, propsName],
          parser(tokensType, tokens[key].value)
        );
      } else {
        set(obj, [tokensType, camelizedName], tokens[key].value);
        set(
          props,
          [tokensType, propsName],
          parser(tokensType, tokens[key].value)
        );
      }
    } else {
      findTypes(tokens[key], theme || checkTheme(key));
    }
  });
}

function checkTheme(key) {
  const isAccepted = themes.includes(key);
  if (isAccepted) return key;
  return "";
}

function parser(type, value) {
  switch (type) {
    case "typography":
      return `${value.fontFamily}`;
    case "boxShadow":
      return `${value.x}px, ${value.y}px, ${value.blur}px, ${value.spread}px, ${value.color}`;
    default:
      return value;
  }
}

findTypes(tokens);

props;
