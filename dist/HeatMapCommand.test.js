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
const HeatMapCommand_1 = require("./HeatMapCommand");
const LocationCollection_1 = require("./FindingPlaces/LocationCollection");
const Location_1 = require("./FindingPlaces/Location");
const ImageLocation_1 = require("./FindingPlaces/ImageLocation");
const ExpectedRequests_1 = require("./TestHelpers/Fakes/ExpectedRequests");
describe("HeatMapCommandTests", () => {
    let _sut;
    let _knownLocations;
    let _fakeGenerator;
    let _capacityService;
    beforeEach(() => {
        _fakeGenerator = {
            "HighlightMap": () => { }
        };
        _capacityService = {
            "NumberOfDesksOccupiedForLocation": () => { }
        };
        _knownLocations = new LocationCollection_1.LocationCollection(new Location_1.Loc("Foo"), new Location_1.Loc("Bronte", new ImageLocation_1.ImageLocation(0, 0, "gracechurch")), new Location_1.Loc("gracechurch::245-210", new ImageLocation_1.ImageLocation(245, 210, "gracechurch"), 100));
        _sut = new HeatMapCommand_1.HeatMapCommand(_knownLocations, _fakeGenerator, _capacityService);
    });
    it("Execute_ForKnownKey_ReturnsJpegContentType", () => __awaiter(void 0, void 0, void 0, function* () {
        const request = ExpectedRequests_1.ExpectedRequests.MapRequestForKey("gracechurch");
        const response = yield _sut.execute(request);
        expect(response.ContentType).toBe("image/jpeg");
    }));
    it("Execute_ForKnownKey_ReturnsJpegFileFromImageGenerator", () => __awaiter(void 0, void 0, void 0, function* () {
        _fakeGenerator.HighlightMap = () => __awaiter(void 0, void 0, void 0, function* () { return Buffer.from([1, 2, 3, 4]); });
        const request = ExpectedRequests_1.ExpectedRequests.MapRequestForKey("gracechurch");
        const response = yield _sut.execute(request);
        expect(response.FileContents).toStrictEqual(Buffer.from([1, 2, 3, 4]));
    }));
});
//# sourceMappingURL=HeatMapCommand.test.js.map