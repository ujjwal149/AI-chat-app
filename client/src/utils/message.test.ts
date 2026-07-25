import { describe, it, expect } from "vitest";
import { isValidMessage } from "./message";

describe("isValidMessage", () => {
  it("returns true for a normal message", () => {
    expect(isValidMessage("Hello")).toBe(true);
  });

  it("returns false for an empty string", () => {
    expect(isValidMessage("")).toBe(false);
  });

  it("returns false for whitespace only", () => {
    expect(isValidMessage("     ")).toBe(false);
  });

  it("returns true after trimming whitespace", () => {
    expect(isValidMessage("   Hi   ")).toBe(true);
  });
});