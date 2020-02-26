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
const LocationFinder_1 = require("./LocationFinder");
const LocationCollection_1 = require("./LocationCollection");
const Location_1 = require("./Location");
const jest_each_1 = require("jest-each");
describe("LocationFinderTests", () => {
    let _sut;
    beforeEach(() => {
        _sut = new LocationFinder_1.LocationFinder(new LocationCollection_1.LocationCollection(new Location_1.Loc("one"), new Location_1.Loc("Place that exists"), new Location_1.Loc("two")));
    });
    jest_each_1.default([
        [""],
        [" "],
        [null]
    ]).test("Find_NullOrWhitespace_ReturnsErrorMessage %s", (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
        var result = _sut.Find(searchTerm);
        expect(result).toBe(Location_1.Loc.NotFound);
    }));
    it("Find_PlaceDoesNotExist_ReturnsErrorMessage", () => __awaiter(void 0, void 0, void 0, function* () {
        var result = _sut.Find("junk-place");
        expect(result).toBe(Location_1.Loc.NotFound);
    }));
    it("Find_PlaceKnown_ReturnsNotNullLocationResult", () => __awaiter(void 0, void 0, void 0, function* () {
        var result = _sut.Find("Place that exists");
        expect(result).not.toBe(Location_1.Loc.NotFound);
    }));
    it("Find_PlaceKnown_LocationResultContainsLocation", () => __awaiter(void 0, void 0, void 0, function* () {
        var result = _sut.Find("Place that exists");
        expect(result.Name).toBe("Place that exists");
    }));
    it("Find_PlaceKnown_IgnoresCase", () => __awaiter(void 0, void 0, void 0, function* () {
        var result = _sut.Find("place tHat exists");
        expect(result.Name).toBe("Place that exists");
    }));
    jest_each_1.default([
        ["place tcat exists"],
        ["place tcbt exists"],
        ["place tcbh exists"],
        ["place tcbh cxists"],
    ]).test("Find_FindingAMisspellingOfAKnownPlace_SuggestsMatchesWhenNoExactMatchIsPresent %s", (supportedMisspelling) => __awaiter(void 0, void 0, void 0, function* () {
        var result = _sut.Find(supportedMisspelling);
        expect(result.Name).toBe("Place that exists");
    }));
    it("Find_AllFuzzySpellingsTooDifferent_ReturnsNotFound", () => __awaiter(void 0, void 0, void 0, function* () {
        var result = _sut.Find("pplace ttcbh cxasts");
        expect(result).toBe(Location_1.Loc.NotFound);
    }));
});
//# sourceMappingURL=LocationFinder.test.js.map