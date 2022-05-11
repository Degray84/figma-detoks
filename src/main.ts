import TokensFactory from "./TokensFactory";
import config from "../tokens.config.json";
import tokens from "../data/tokens.json";

const tokensGenerator = new TokensFactory({
  ...config,
  source: tokens,
});

tokensGenerator.clean();
// tokensGenerator.createDir("dir/dir2");

tokensGenerator.buildJS();
tokensGenerator.buildCSS();

tokensGenerator.propsCSS; //?.
tokensGenerator.propsJS; //?.

export default tokensGenerator;
