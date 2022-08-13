import {
  colorBox,
  shadowBox,
  gradientBox,
  typographyBox,
  defaultBox,
} from "../templates/box-templates.js";

export default {
  color: {
    split: true,
    parser: colorBox,
  },
  boxShadow: {
    split: true,
    parser: shadowBox,
  },
  gradient: {
    split: true,
    parser: gradientBox,
  },
  typography: {
    parser: typographyBox,
  },
  default: {
    parser: defaultBox,
  },
};
