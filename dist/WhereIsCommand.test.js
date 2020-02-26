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
const WhereIsCommand_1 = require("./WhereIsCommand");
const LocationCollection_1 = require("./FindingPlaces/LocationCollection");
const Location_1 = require("./FindingPlaces/Location");
const UrlHelper_1 = require("./Infrastructure/UrlHelper");
const LocationFinder_1 = require("./FindingPlaces/LocationFinder");
const ExpectedRequests_1 = require("./TestHelpers/Fakes/ExpectedRequests");
describe("WhereIsCommand tests", () => {
    let _sut;
    let _knownLocations;
    beforeEach(() => {
        _knownLocations = new LocationCollection_1.LocationCollection(new Location_1.Loc("Foo"), new Location_1.Loc("Bar"), new Location_1.Loc("Baz"));
        const configuration = {
            UrlRoot: "https://localhost/api",
            ApiKey: "key123",
            CapacityApiKey: "",
            BlobCredentials: "",
            Root: "",
            MapPath: ""
        }; // MAKE THIS SMALLER.
        const urlHelper = new UrlHelper_1.UrlHelper(configuration);
        const locFinder = new LocationFinder_1.LocationFinder(_knownLocations);
        _sut = new WhereIsCommand_1.WhereIsCommand(locFinder, urlHelper);
    });
    it("Run_NoValidDetailsFound_ReturnsFriendlyError", () => __awaiter(void 0, void 0, void 0, function* () {
        const request = ExpectedRequests_1.ExpectedRequests.WhereIsFor(null);
        const response = yield _sut.execute(request);
        expect(response.text).toBe("Sorry! We can't find that place either.");
    }));
    it("Run_KnownLocation_ReturnsLocation", () => __awaiter(void 0, void 0, void 0, function* () {
        const request = ExpectedRequests_1.ExpectedRequests.WhereIsFor("Foo");
        const response = yield _sut.execute(request);
        expect(response.text).toBe("Foo");
    }));
    it("Run_KnownLocation_ReturnsLocationMap", () => __awaiter(void 0, void 0, void 0, function* () {
        const request = ExpectedRequests_1.ExpectedRequests.WhereIsFor("Foo");
        const response = yield _sut.execute(request);
        const attachments = response.attachments || [];
        expect(attachments[0].image_url).toBe("https://localhost/api/Map?code=key123&key=foo");
    }));
    it("Run_KnownLocation_LocationMapHasCaption", () => __awaiter(void 0, void 0, void 0, function* () {
        const request = ExpectedRequests_1.ExpectedRequests.WhereIsFor("Foo");
        const response = yield _sut.execute(request);
        const attachments = response.attachments || [];
        expect(attachments[0].text).toBe("Foo is marked on the map.");
    }));
    it("Run_MisspeltLocation_ReturnsLocation", () => __awaiter(void 0, void 0, void 0, function* () {
        const request = ExpectedRequests_1.ExpectedRequests.WhereIsFor("Fop");
        const response = yield _sut.execute(request);
        expect(response.text).toBe("Foo");
    }));
});
//# sourceMappingURL=WhereIsCommand.test.js.map