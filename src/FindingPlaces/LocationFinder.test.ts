import { LocationFinder } from './LocationFinder';
import { LocationCollection } from './LocationCollection';
import { Loc } from './Location';
import each from "jest-each";

describe("LocationFinderTests", () => {
    
    let _sut: LocationFinder;

    beforeEach(() => {
        _sut = new LocationFinder(new LocationCollection(
            new Loc("one"),
            new Loc("Place that exists"),
            new Loc("two")
        ));
    });

    each([
        [""],
        [" "],
        [null]
      ]).test("Find_NullOrWhitespace_ReturnsErrorMessage %s", async (searchTerm) => {
        var result = _sut.Find(searchTerm);

        expect(result).toBe(Loc.NotFound);
    });

    it("Find_PlaceDoesNotExist_ReturnsErrorMessage", async () => {
        var result = _sut.Find("junk-place");

        expect(result).toBe(Loc.NotFound);
    });

    it("Find_PlaceKnown_ReturnsNotNullLocationResult", async () => {
        var result = _sut.Find("Place that exists");

        expect(result).not.toBe(Loc.NotFound);
    });

    it("Find_PlaceKnown_LocationResultContainsLocation", async () => {
        var result = _sut.Find("Place that exists");

        expect(result.Name).toBe("Place that exists");
    });

    it("Find_PlaceKnown_IgnoresCase", async () => {
        var result = _sut.Find("place tHat exists");

        expect(result.Name).toBe("Place that exists");
    });

    each([
        ["place tcat exists"],
        ["place tcbt exists"],
        ["place tcbh exists"],
        ["place tcbh cxists"],
    ]).test("Find_FindingAMisspellingOfAKnownPlace_SuggestsMatchesWhenNoExactMatchIsPresent %s", async (supportedMisspelling) => {
        var result = _sut.Find(supportedMisspelling);

        expect(result.Name).toBe("Place that exists");
    });

    it("Find_AllFuzzySpellingsTooDifferent_ReturnsNotFound", async () => {
        var result = _sut.Find("pplace ttcbh cxasts");

        expect(result).toBe(Loc.NotFound);
    });
});