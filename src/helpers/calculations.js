import { checkGradientType } from "./extraTypes.js";

export const getTypes = (src) => {
  const types = new Set();
  const getType = (tokens) => {
    if (typeof tokens !== "object") return;
    Object.values(tokens).map((token) => {
      if (token?.type) {
        checkGradientType(token);
        types.add(token.type);
      } else {
        getType(token);
      }
    });
  };

  getType(src);

  return Array.from(types);
};

export const getThemes = (src) => Array.from(new Set(Object.keys(src)));
