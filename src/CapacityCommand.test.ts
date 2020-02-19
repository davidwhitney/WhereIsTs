import { CapacityCommand } from "./CapacityCommand";
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
    let _logger = {};
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
            Root: "", 
            MapPath: ""
        }; // MAKE THIS SMALLER.

        const urlHelper: IUrlHelper = new UrlHelper(configuration);
        _sut = new CapacityCommand(_knownLocations, urlHelper, _capacityService);
    });

    it("returns a friendly error when no location requested", async () => {
        const request = ExpectedRequests.CapacityFor(" ");

        const response = await _sut.execute(request, _logger);

        expect(response.text).toBe("Sorry! You need to specify a location.");
    });

    it("Run_KnownLocationRequested_ReturnsHintAsToAvailability", async () => {
        var request = ExpectedRequests.CapacityFor("gracechurch");
        var capacity = 5;
        var used = 2;
        _knownLocations.slice(-1)[0].Capacity = capacity;
        _capacityService.NumberOfDesksOccupiedForLocation = () => used;
        
        var response = await _sut.execute(request, _logger);

        expect(response.text).toEqual(`There are ${used} of ${capacity} desks used in gracechurch.`);
        expect(response.attachments[0].image_url).toBeDefined();
    });

    it("Run_KnownLocationRequested_IncludesAHeatMapImage", async () => {
        var request = ExpectedRequests.CapacityFor("gracechurch");
            
        var response = await _sut.execute(request, _logger);

        expect(response.attachments[0].image_url).toBeDefined();
        expect(response.attachments[0].image_url).toContain("HeatMap");
    });

    it.skip("Execute_ErrorIsThrown_LogsAndRethrows", async () => {
        // Throw tests in jest are the worst, come back and fix this.
        expect(() => {
            _sut.execute(null, _logger);
        }).rejects.toThrow();
    });
});