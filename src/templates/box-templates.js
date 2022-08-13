const HEIGHT = 40;

export function headString(name, values, parser) {
  if (!parser) parser = defaultBox;
  return `
  <div style="display: flex; gap: 10px; background: white">
    <div style="width: 240px; flex-shrink: 0;  line-height:${HEIGHT}px">${name}</div>
    ${values.map((value) => parser(value)).join("")}
  </div>\n
  `;
}

export function propString(name, values, parser) {
  if (!parser) parser = defaultBox;
  return `
  <div style="display: flex; gap: 10px">
    <div style="width: 240px; flex-shrink: 0;  line-height:${HEIGHT}px">${name}</div>
    ${values.map((value) => parser(value)).join("")}
  </div>\n
  `;
}

export function colorBox(value) {
  return `
  <div style="text-align: center; width: 100%; margin-bottom: 20px;">
    <div style="background-color:${value}; height: ${HEIGHT}px; border-radius: 8px; border: 1px solid grey"></div>
    ${value}
  </div>
`;
}

export function shadowBox(value) {
  return `
  <div style="text-align: center; width: 100%; margin-bottom: 30px;">
    <div style="display: flex; align-items: center; justify-content: center; background-color:white; box-shadow:${value}; height: ${HEIGHT}px; border-radius: 8px; border: 1px solid grey; font-size: 12px;">${value}</div>
  </div>
`;
}

export function gradientBox(value) {
  return `
  <div style="text-align: center; width: 100%; margin-bottom: 30px;">
    <div style="display: flex; align-items: center; justify-content: center; background-color:white; background-image:${value}; height: ${HEIGHT}px; border-radius: 8px; border: 1px solid grey; font-size: 12px; color: grey;">${value}</div>
  </div>
`;
}

export function typographyBox(value) {
  return `
  <div style="text-align: center; width: 100%; margin-bottom: 30px;">
    <div style="display: flex; align-items: center; justify-content: center; background-color:white; font: ${value}">${value}</div>
  </div>
`;
}

export function defaultBox(value) {
  return `<div style="text-align: center; width: 100%; line-height:${HEIGHT}px">${value}</div>`;
}
