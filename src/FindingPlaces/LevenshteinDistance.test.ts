import each from "jest-each";
import { LevenshteinDistance } from "./LevenshteinDistance";

describe("LevenshteinDistance tests", () => {
    
    each([
        ["word", "word", 0],
        ["word", "worD", 1],
        ["word", "wordd", 1],
        ["word", "wor", 1],
        ["word", "worddd", 2],
        ["", "", 0],
        ["", "a", 1],
        ["a", "", 1]
      ]).test("Execute_NoValidKeyProvided_Returns404 %s %s %d", async (first, second, expectedDistance) => {
        expect(LevenshteinDistance.Compute(first, second)).toBe(expectedDistance);
    });
});