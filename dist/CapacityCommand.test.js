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
const CapacityCommand_1 = require("./CapacityCommand");
const ExpectedRequests_1 = require("./TestHelpers/Fakes/ExpectedRequests");
const LocationCollection_1 = require("./FindingPlaces/LocationCollection");
const Location_1 = require("./FindingPlaces/Location");
const ImageLocation_1 = require("./FindingPlaces/ImageLocation");
const UrlHelper_1 = require("./Infrastructure/UrlHelper");
describe("Capacity command", () => {
    let _sut;
    let _capacityService;
    let _knownLocations;
    beforeEach(() => {
        _capacityService = {
            "NumberOfDesksOccupiedForLocation": () => { }
        };
        _knownLocations = new LocationCollection_1.LocationCollection(new Location_1.Loc("Foo"), new Location_1.Loc("Bronte", new ImageLocation_1.ImageLocation(0, 0, "gracechurch")), new Location_1.Loc("gracechurch::245-210", new ImageLocation_1.ImageLocation(245, 210, "gracechurch")));
        const configuration = {
            UrlRoot: "https://localhost/api",
            ApiKey: "key123",
            CapacityApiKey: "",
            BlobCredentials: "",
            Root: "",
            MapPath: ""
        }; // MAKE THIS SMALLER.
        const urlHelper = new UrlHelper_1.UrlHelper(configuration);
        _sut = new CapacityCommand_1.CapacityCommand(_knownLocations, urlHelper, _capacityService);
    });
    it("Run_NoLocationRequested_ReturnsFriendlyError", () => __awaiter(void 0, void 0, void 0, function* () {
        const request = ExpectedRequests_1.ExpectedRequests.CapacityFor(" ");
        const response = yield _sut.execute(request);
        expect(response.text).toBe("Sorry! You need to specify a location.");
    }));
    it("Run_KnownLocationRequested_ReturnsHintAsToAvailability", () => __awaiter(void 0, void 0, void 0, function* () {
        const request = ExpectedRequests_1.ExpectedRequests.CapacityFor("gracechurch");
        const capacity = 5;
        const used = 2;
        _knownLocations.slice(-1)[0].Capacity = capacity;
        _capacityService.NumberOfDesksOccupiedForLocation = () => used;
        const response = yield _sut.execute(request);
        const attachments = response.attachments || [];
        expect(response.text).toEqual(`There are ${used} of ${capacity} desks used in gracechurch.`);
        expect(attachments[0].image_url).toBeDefined();
    }));
    it("Run_KnownLocationRequested_IncludesAHeatMapImage", () => __awaiter(void 0, void 0, void 0, function* () {
        const request = ExpectedRequests_1.ExpectedRequests.CapacityFor("gracechurch");
        const response = yield _sut.execute(request);
        const attachments = response.attachments || [];
        expect(attachments[0].image_url).toBeDefined();
        expect(attachments[0].image_url).toContain("HeatMap");
    }));
});
//# sourceMappingURL=CapacityCommand.test.js.map