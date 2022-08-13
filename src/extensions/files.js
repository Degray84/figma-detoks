import StyleDictionary from "style-dictionary";

import kebabCase from "lodash/kebabCase.js";

StyleDictionary.getFilters = function (
  dest,
  output,
  format,
  filters = ["common", "dark"]
) {
  return filters.map((filter) => ({
    destination: `dist/${dest}/${filter}.${output}`,
    format,
    filter,
    options: {
      showFileHeader: false,
      selector:
        output === "css" && filter === "dark"
          ? '[color-scheme = "dark"]'
          : null,
    },
  }));
};

StyleDictionary.getParts = function (dest, output, format) {
  return this.allThemes
    .map((theme) =>
      this.allTypes.map((filter) => ({
        destination: `dist/${dest}/parts/${kebabCase(
          theme + "-" + filter
        )}.${output}`,
        format,
        filter: ({ type, attributes }) =>
          type === filter && attributes.theme === theme,
        options: {
          showFileHeader: false,
          selector:
            output === "css" && theme.indexOf("dark") !== -1
              ? '[color-scheme = "dark"]'
              : null,
        },
      }))
    )
    .flat();
};
