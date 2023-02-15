import { numberRange } from ".";

describe("numberRange Unit Test Suites", () => {
  it("should return something", () => {
    expect(numberRange(1, 10, 1)).toBeDefined();
  });

  it("should return an array of numbers", () => {
    const numbers = numberRange(1, 10, 1);
    numbers.forEach((number) => expect(typeof number).toBe("number"));
  });

  it("should match the following array [1, 2, 3, 4, 5]", () => {
    const expected = [1, 2, 3, 4, 5];
    const numbers = numberRange(1, 5, 1);

    expect(numbers).toEqual(expect.arrayContaining(expected));
  });
});
