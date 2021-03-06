import { CapacityCommand } from './CapacityCommand';
import { IUrlHelper } from './Infrastructure/IUrlHelper';
import { ICapacityService } from './CapacityMonitoring/ICapacityService';
import { ExpectedRequests } from './TestHelpers/Fakes/ExpectedRequests';
import { LocationCollection } from "./FindingPlaces/LocationCollection";
import { Loc } from "./FindingPlaces/Location";
import { ImageLocation } from "./FindingPlaces/ImageLocation";
import { Configuration } from './Infrastructure/Configuration';
import { UrlHelper } from './Infrastructure/UrlHelper';

describe("Capacity command", () => {
    let _sut: CapacityCommand;
    let _capacityService: ICapacityService;
    let _knownLocations: LocationCollection;

    beforeEach(() => {
        _capacityService = {
            "NumberOfDesksOccupiedForLocation": () => { }
        } as any as ICapacityService;

        _knownLocations = new LocationCollection(
            new Loc("Foo"),
            new Loc("Bronte", new ImageLocation(0, 0, "gracechurch")),
            new Loc("gracechurch::245-210", new ImageLocation(245, 210, "gracechurch")),
        );

        const configuration: Configuration = { 
            UrlRoot: "https://localhost/api", 
            ApiKey: "key123", 
            CapacityApiKey: "", 
            BlobCredentials: "",
            MapPath: ""
        }; // MAKE THIS SMALLER.

        const urlHelper: IUrlHelper = new UrlHelper(configuration);
        _sut = new CapacityCommand(_knownLocations, urlHelper, _capacityService);
    });

    it("Run_NoLocationRequested_ReturnsFriendlyError", async () => {
        const request = ExpectedRequests.CapacityFor(" ");

        const response = await _sut.execute(request);

        expect(response.text).toBe("Sorry! You need to specify a location.");
    });

    it("Run_KnownLocationRequested_ReturnsHintAsToAvailability", async () => {
        const request = ExpectedRequests.CapacityFor("gracechurch");
        const capacity = 5;
        const used = 2;
        _knownLocations.slice(-1)[0].Capacity = capacity;
        _capacityService.NumberOfDesksOccupiedForLocation = () => used;

        const response = await _sut.execute(request);
        const attachments = response.attachments || [];

        expect(response.text).toEqual(`There are ${used} of ${capacity} desks used in gracechurch.`);
        expect(attachments[0].image_url).toBeDefined();
    });

    it("Run_KnownLocationRequested_IncludesAHeatMapImage", async () => {
        const request = ExpectedRequests.CapacityFor("gracechurch");

        const response = await _sut.execute(request);
        const attachments = response.attachments || [];

        expect(attachments[0].image_url).toBeDefined();
        expect(attachments[0].image_url).toContain("heatmap");
    });
});

describe("Acceptance test", () => {
    it("With real data, returns correct total capacity", async () => {
        const dep = require("./AppFactory");

        const result = await dep.capacity.execute({ text: "gracechurch" });

        expect(result.text).toBe("There are 0 of 107 desks used in gracechurch.");
    });

});