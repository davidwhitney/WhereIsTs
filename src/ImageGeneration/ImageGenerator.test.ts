import { ImageGenerator } from './ImageGenerator';
import { Configuration } from '../Infrastructure/Configuration';
import { ImageLocation } from '../FindingPlaces/ImageLocation';
const fs = require('fs');
const Jimp = require('jimp');

describe("ImageGenerator", () => {

    let _sut: ImageGenerator;
    let _config: Configuration;

    beforeEach(() => {
        _config = { 
            UrlRoot: "http://something", 
            ApiKey: "key", 
            CapacityApiKey: "", 
            BlobCredentials: "", 
            Root: process.cwd(),
            MapPath: process.cwd() + "/" + "App_Data" + "/" + "Maps"
        }; // MAKE THIS SMALLER.

        _sut = new ImageGenerator(_config);
    });

    it("GetImageFor_ForKnownKey_ReturnsModifiedImage", async () => {
        var defaultMap = fs.readFileSync("./App_Data/Maps/gracechurch.png");
        var location = new ImageLocation(1, 1, "gracechurch");

        var response = await _sut.GetImageFor(location);
        fs.writeFileSync('./test_results/GetImageFor_ForKnownKey_ReturnsModifiedImage.png', Buffer.from(response));
        expect(defaultMap).not.toStrictEqual(response);
    }, 15 * 1000);

    it("GetImageFor_ForKnownKeyPlaces_MarkerCoveringLocationOnMapInRed", async () => {
        const tempPath = './test_results/GetImageFor_ForKnownKeyPlaces_MarkerCoveringLocationOnMapInRed_temp.png';
        var location = new ImageLocation(1, 1, "gracechurch");

        var response = await _sut.GetImageFor(location);        
        fs.writeFileSync(tempPath, Buffer.from(response));

        const reloaded = await Jimp.read(tempPath);
        const pixel = reloaded.getPixelColor(10, 10);
        const argb = Jimp.intToRGBA(pixel);

        expect(argb.a).toBe(255);
        expect(argb.b).toBe(0);
        expect(argb.g).toBe(0);
        expect(argb.r).toBe(255);
    }, 15 * 1000);

    it("GetImageFor_ForKnownKeyPlaces_MarkerCoveringLocationOnMapInRedIsBiggerThanOnePixel", async () => {
        const tempPath = './test_results/GetImageFor_ForKnownKeyPlaces_MarkerCoveringLocationOnMapInRedIsBiggerThanOnePixel_temp.png';
        var location = new ImageLocation(1, 1, "gracechurch");

        var response = await _sut.GetImageFor(location);        
        fs.writeFileSync(tempPath, Buffer.from(response));

        const reloaded = await Jimp.read(tempPath);
        const pixel = reloaded.getPixelColor(10, 10);
        const argb = Jimp.intToRGBA(pixel);

        expect(argb.a).toBe(255);
        expect(argb.b).toBe(0);
        expect(argb.g).toBe(0);
        expect(argb.r).toBe(255);
    }, 15 * 1000);

});