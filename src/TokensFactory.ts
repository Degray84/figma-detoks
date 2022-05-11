import fs from "fs";
import path from "path";
import { set, camelCase, kebabCase } from "lodash";

interface Options {
  source: any;
  output?: string;
  prefix?: string;
  themes?: any;
}

export default class TokensFactory {
  readonly source: any;
  readonly output: any;
  readonly propsCSS: Record<string, unknown> = {};
  readonly propsJS: Record<string, unknown> = {};
  readonly themes?: any;
  readonly prefix?: string;

  constructor(options: Options) {
    this.source = options.source;
    this.themes = options.themes || [];
    if (options.output) this.output = options.output;
    if (options.prefix) this.prefix = options.prefix;
    this._parse(this.source);
  }

  private _parse(src: any, theme = "") {
    Object.keys(src).forEach((key) => {
      const sourceItem = src[key];
      const tokensType = sourceItem.type;
      if (tokensType) {
        const camelizedName = camelCase(`${key}-${theme}`);
        const propsName =
          (this.prefix ? `--${this.prefix}-` : "--") + kebabCase(key);
        if (theme) {
          set(
            this.propsJS,
            [theme, tokensType, camelizedName],
            sourceItem.value
          );
          set(
            this.propsCSS,
            [theme, tokensType, propsName],
            this._parseCSS(tokensType, sourceItem.value)
          );
        } else {
          set(this.propsJS, [tokensType, camelizedName], sourceItem.value);
          set(
            this.propsCSS,
            [tokensType, propsName],
            this._parseCSS(tokensType, sourceItem.value)
          );
        }
      } else {
        this._parse(
          sourceItem,
          theme || (this.themes.includes(key) ? key : "")
        );
      }
    });
  }

  private _parseCSS(type: string, value: any): string {
    switch (type) {
      case "typography":
        return `${value.fontFamily}`;
      case "boxShadow":
        return `${value.x}px, ${value.y}px, ${value.blur}px, ${value.spread}px, ${value.color}`;
      default:
        return value;
    }
  }

  createDir(dir = ""): void {
    if (!fs.existsSync(path.resolve(this.output, dir)))
      fs.mkdirSync(path.resolve(this.output, dir), { recursive: true });
  }

  clean(dir = ""): void {
    if (fs.existsSync(path.resolve(this.output, dir)))
      fs.rmSync(path.resolve(this.output, dir), { recursive: true });
  }

  buildJS(): void {
    this.createDir(path.resolve(this.output, "js"));
    const file = fs.createWriteStream(
      path.resolve(this.output, "js", "index.js")
    );
    Object.keys(this.propsJS).forEach((key) => {
      file.write(`export const ${key} = ${JSON.stringify(this.propsJS[key])};`);
    });
    file.write(`export default {`);
    Object.keys(this.propsJS).forEach((key) => file.write(`${key},`));
    file.write(`};`);
    file.end();
  }

  buildCSS(): void {
    this.createDir(path.resolve(this.output, "css"));
    Object.keys(this.propsCSS).forEach((key: string) => {
      const propsType = this.propsCSS[key];
      const file = fs.createWriteStream(
        path.resolve(this.output, "css", `props.${key}.css`)
      );
      if (key.indexOf("dark") !== -1) {
        file.write("[color-scheme='dark']{\n");
        file.write("color-scheme: dark; \n");
        Object.values(propsType as any).forEach((value) =>
          file.write(JSON.stringify(value))
        );
      } else if (key.indexOf("light") !== -1) {
        file.write(":root{\n");
        file.write("color-scheme: light; \n");
      } else {
        file.write(":root");
        file.write(JSON.stringify(propsType));
      }
      file.end();
    });
  }
}
