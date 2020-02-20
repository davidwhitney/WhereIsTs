import { LocationCollection } from "./FindingPlaces/LocationCollection";
import { Loc } from "./FindingPlaces/Location";
import { ICapacityService } from "./CapacityMonitoring/ICapacityService";
import { MapCommand } from "./MapCommand";
import { ImageLocation } from "./FindingPlaces/ImageLocation";
import { IImageGenerator } from "./ImageGeneration/IImageGenerator";
import { ExpectedRequests } from "./TestHelpers/Fakes/ExpectedRequests";
import { IMemoryCache } from './Infrastructure/IMemoryCache';
import { MemoryCache } from "./Infrastructure/MemoryCache";
import each from "jest-each";

describe("MapCommand tests", () => {

    let _sut: MapCommand;
    let _fakeGenerator: IImageGenerator;
    let _cache: IMemoryCache;
    let _knownLocations: LocationCollection;

    beforeEach(() => {
        _fakeGenerator = {
            "Called": 0,
            "GetImageFor": function () { this["Called"]++; }
        } as any as IImageGenerator;

        _cache = new MemoryCache();
        
        _knownLocations = new LocationCollection(
            new Loc("Foo", new ImageLocation(10, 10)),
            new Loc("Foo Bar"),
        );

        _sut = new MapCommand(_knownLocations, _fakeGenerator, _cache);
    });

    each([
        [null],
        [" "],
        ["invalid-key"],
      ]).test("Execute_NoValidKeyProvided_Returns404 %s", async (key) => {
        var request = ExpectedRequests.MapRequestForKey(key);

        var response = await _sut.execute(request);

        expect(response.status).toEqual(404);
    });

    each([
        ["foo"],
        ["foo+bar"]
      ]).test("Execute_ForKnownKey_ReturnsJpegContentType %s", async (key) => {
        var request = ExpectedRequests.MapRequestForKey(key);

        var response = await _sut.execute(request);

        expect(response.ContentType).toEqual("image/jpeg");
    });

    it("Execute_ForKnownKey_ReturnsJpegFileFromImageGenerator", async () => {
        _fakeGenerator.GetImageFor = async () => Buffer.from([1, 2, 3, 4]);
        var request = ExpectedRequests.MapRequestForKey(_knownLocations[0].Key());

        var response = await _sut.execute(request);
        
        expect(response.FileContents).toStrictEqual(Buffer.from([1, 2, 3, 4]));
    });

      it("Execute_ItemsAddedToCache", async () => {
        var request = ExpectedRequests.MapRequestForKey(_knownLocations[0].Key());

        await _sut.execute(request);

        expect(_cache.Count()).toBe(1);
    });

      it("Execute_MultipleRequestsForSameKey_ImageSourcedFromCache", () => {
        var request = ExpectedRequests.MapRequestForKey(_knownLocations[0].Key());

        _sut.execute(request);
        _sut.execute(request);

        expect((<any>_fakeGenerator).Called).toBe(1);
    });
});