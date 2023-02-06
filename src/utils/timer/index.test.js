import { handleBpm, handleNoteValue } from ".";

describe("handleTimer Unit Test Suites", () => {
  it("should return something", () => {
    expect(handleBpm("60")).toBeDefined();
  });

  it("should return a number", () => {
    expect(typeof handleBpm("60")).toBe("number");
  });

  it("should return 1000", () => {
    expect(handleBpm("60")).toEqual(1000);
  });

  it("should return 500", () => {
    expect(handleBpm("120")).toEqual(500);
  });
});

describe("handleNoteValue Unit Test Suites", () => {
  it("should return something", () => {
    expect(handleNoteValue(handleBpm("60"), 1)).toBeDefined();
  });

  it("should return a number", () => {
    expect(typeof handleNoteValue(handleBpm("60"), 1)).toBe("number");
  });

  it("should return 1000", () => {
    expect(handleNoteValue(handleBpm("60"), 1)).toEqual(1000);
  });

  it("should return 500 - 60 BPM", () => {
    expect(handleNoteValue(handleBpm("60"), 0.5)).toEqual(500);
  });

  it("should return 250 - 60 BPM", () => {
    expect(handleNoteValue(handleBpm("60"), 0.25)).toEqual(250);
  });

  it("should return 500 - 120 BPM", () => {
    expect(handleNoteValue(handleBpm("120"), 1)).toEqual(500);
  });

  it("should return 250 - 120 BPM", () => {
    expect(handleNoteValue(handleBpm("120"), 0.5)).toEqual(250);
  });
});
