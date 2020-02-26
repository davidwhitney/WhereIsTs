"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const jest_each_1 = require("jest-each");
const LevenshteinDistance_1 = require("./LevenshteinDistance");
describe("LevenshteinDistance tests", () => {
    jest_each_1.default([
        ["word", "word", 0],
        ["word", "worD", 1],
        ["word", "wordd", 1],
        ["word", "wor", 1],
        ["word", "worddd", 2],
        ["", "", 0],
        ["", "a", 1],
        ["a", "", 1]
    ]).test("Execute_NoValidKeyProvided_Returns404 %s %s %d", (first, second, expectedDistance) => __awaiter(void 0, void 0, void 0, function* () {
        expect(LevenshteinDistance_1.LevenshteinDistance.Compute(first, second)).toBe(expectedDistance);
    }));
});
//# sourceMappingURL=LevenshteinDistance.test.js.map