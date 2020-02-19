import { HeatMapCommand } from "./HeatMapCommand";
import { LocationCollection } from './FindingPlaces/LocationCollection';
import { ICapacityService } from './CapacityMonitoring/ICapacityService';
import { Loc } from "./FindingPlaces/Location";
import { ImageLocation } from "./FindingPlaces/ImageLocation";
import { ExpectedRequests } from "./TestHelpers/Fakes/ExpectedRequests";
import { IImageGenerator } from './ImageGeneration/IImageGenerator';

describe("HeatMapCommandTests", () => {

    let _sut: HeatMapCommand;
    let _knownLocations: LocationCollection;
    let _fakeGenerator: IImageGenerator;
    let _capacityService: ICapacityService;

    beforeEach(() => {
        _fakeGenerator = {
            "HighlightMap": () => { }
        } as any as IImageGenerator;
        
        _capacityService = {
            "NumberOfDesksOccupiedForLocation": () => { }
        } as any as ICapacityService;
        
        _knownLocations = new LocationCollection(
            new Loc("Foo"),
            new Loc("Bronte", new ImageLocation(0, 0, "gracechurch")),
            new Loc("gracechurch::245-210", new ImageLocation(245, 210, "gracechurch"), 100),
        );
        
        _sut = new HeatMapCommand(_knownLocations, _fakeGenerator, _capacityService);
    });

    it("Execute_ForKnownKey_ReturnsJpegContentType", async () => {
        var request = ExpectedRequests.MapRequestForKey("gracechurch");

        var response = await _sut.execute(request);
        
        expect(response.ContentType).toBe("image/jpeg");
    });

    it("Execute_ForKnownKey_ReturnsJpegFileFromImageGenerator", async () => {
        _fakeGenerator.HighlightMap = () => Buffer.from([1, 2, 3, 4]);
        var request = ExpectedRequests.MapRequestForKey("gracechurch");

        var response = await _sut.execute(request);

        expect(response.FileContents).toStrictEqual(Buffer.from([1, 2, 3, 4]));
    });

    // TBC
    /*
        [Test]
        public void Execute_ErrorIsThrown_LogsAndRethrows()
        {
            Assert.Throws<NullReferenceException>(() => _sut.Execute(null, _logger));

            Assert.That(_logger.Entries.Count, Is.EqualTo(1));
        }*/

});