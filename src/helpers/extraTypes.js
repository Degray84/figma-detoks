// Мутация токена с типом color в тип gradient
export const checkGradientType = (token) => {
  if (token.type === "color") {
    if (token.value.indexOf("gradient") != -1) token.type = "gradient";
  }
};
