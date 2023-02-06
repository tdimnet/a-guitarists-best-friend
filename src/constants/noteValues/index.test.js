import { NOTE_VALUES } from ".";

describe("NOTE_VALUES Snapshot Test Suites", () => {
  it("should match snapshot", () => {
    expect(NOTE_VALUES).toMatchInlineSnapshot(`
      Array [
        Object {
          "image": 1,
          "name": "noire",
          "value": 1,
        },
        Object {
          "image": 1,
          "name": "croche",
          "value": 0.5,
        },
      ]
    `);
  });
});
