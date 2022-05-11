import tokens from "../data/tokens.json";

// const types: [string] = ["color"];
test("there is a new flavor idea", () => {
  expect(tokens).toBeDefined();
});

test("Имеет свойство Dark", () => {
  expect(tokens).toEqual(
    expect.objectContaining({
      dark: expect.any(Object),
    })
  );
});

test("Имеет свойство Light", () => {
  expect(tokens).toEqual(
    expect.objectContaining({
      light: expect.any(Object),
    })
  );
});
