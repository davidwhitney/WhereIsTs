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
const LocationCollection_1 = require("./FindingPlaces/LocationCollection");
const Location_1 = require("./FindingPlaces/Location");
const MapCommand_1 = require("./MapCommand");
const ImageLocation_1 = require("./FindingPlaces/ImageLocation");
const ExpectedRequests_1 = require("./TestHelpers/Fakes/ExpectedRequests");
const MemoryCache_1 = require("./Infrastructure/MemoryCache");
const jest_each_1 = require("jest-each");
describe("MapCommand tests", () => {
    let _sut;
    let _fakeGenerator;
    let _cache;
    let _knownLocations;
    beforeEach(() => {
        _fakeGenerator = {
            "Called": 0,
            "GetImageFor": function () { this["Called"]++; }
        };
        _cache = new MemoryCache_1.MemoryCache();
        _knownLocations = new LocationCollection_1.LocationCollection(new Location_1.Loc("Foo", new ImageLocation_1.ImageLocation(10, 10)), new Location_1.Loc("Foo Bar"));
        _sut = new MapCommand_1.MapCommand(_knownLocations, _fakeGenerator, _cache);
    });
    jest_each_1.default([
        [null],
        [" "],
        ["invalid-key"],
    ]).test("Execute_NoValidKeyProvided_Returns404 %s", (key) => __awaiter(void 0, void 0, void 0, function* () {
        const request = ExpectedRequests_1.ExpectedRequests.MapRequestForKey(key);
        const response = yield _sut.execute(request);
        expect(response.status).toEqual(404);
    }));
    jest_each_1.default([
        ["foo"],
        ["foo+bar"]
    ]).test("Execute_ForKnownKey_ReturnsJpegContentType %s", (key) => __awaiter(void 0, void 0, void 0, function* () {
        const request = ExpectedRequests_1.ExpectedRequests.MapRequestForKey(key);
        const response = yield _sut.execute(request);
        expect(response.ContentType).toEqual("image/jpeg");
    }));
    it("Execute_ForKnownKey_ReturnsJpegFileFromImageGenerator", () => __awaiter(void 0, void 0, void 0, function* () {
        _fakeGenerator.GetImageFor = () => __awaiter(void 0, void 0, void 0, function* () { return Buffer.from([1, 2, 3, 4]); });
        const request = ExpectedRequests_1.ExpectedRequests.MapRequestForKey(_knownLocations[0].Key());
        const response = yield _sut.execute(request);
        expect(response.FileContents).toStrictEqual(Buffer.from([1, 2, 3, 4]));
    }));
    it("Execute_ItemsAddedToCache", () => __awaiter(void 0, void 0, void 0, function* () {
        const request = ExpectedRequests_1.ExpectedRequests.MapRequestForKey(_knownLocations[0].Key());
        yield _sut.execute(request);
        expect(_cache.Count()).toBe(1);
    }));
    it("Execute_MultipleRequestsForSameKey_ImageSourcedFromCache", () => {
        const request = ExpectedRequests_1.ExpectedRequests.MapRequestForKey(_knownLocations[0].Key());
        _sut.execute(request);
        _sut.execute(request);
        expect(_fakeGenerator.Called).toBe(1);
    });
});
//# sourceMappingURL=MapCommand.test.js.map