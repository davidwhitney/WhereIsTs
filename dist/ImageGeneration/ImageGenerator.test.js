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
const ImageGenerator_1 = require("./ImageGenerator");
const ImageLocation_1 = require("../FindingPlaces/ImageLocation");
const fs = require('fs');
const Jimp = require('jimp');
describe("ImageGenerator", () => {
    let _sut;
    let _config;
    beforeEach(() => {
        _config = {
            UrlRoot: "http://something",
            ApiKey: "key",
            CapacityApiKey: "",
            BlobCredentials: "",
            Root: process.cwd(),
            MapPath: process.cwd() + "/" + "App_Data" + "/" + "Maps"
        }; // MAKE THIS SMALLER.
        _sut = new ImageGenerator_1.ImageGenerator(_config);
    });
    it("GetImageFor_ForKnownKey_ReturnsModifiedImage", () => __awaiter(void 0, void 0, void 0, function* () {
        var defaultMap = fs.readFileSync("./App_Data/Maps/gracechurch.png");
        var location = new ImageLocation_1.ImageLocation(1, 1, "gracechurch");
        var response = yield _sut.GetImageFor(location);
        fs.writeFileSync('./test_results/GetImageFor_ForKnownKey_ReturnsModifiedImage.png', Buffer.from(response));
        expect(defaultMap).not.toStrictEqual(response);
    }), 15 * 1000);
    it("GetImageFor_ForKnownKeyPlaces_MarkerCoveringLocationOnMapInRed", () => __awaiter(void 0, void 0, void 0, function* () {
        const tempPath = './test_results/GetImageFor_ForKnownKeyPlaces_MarkerCoveringLocationOnMapInRed_temp.png';
        var location = new ImageLocation_1.ImageLocation(1, 1, "gracechurch");
        var response = yield _sut.GetImageFor(location);
        fs.writeFileSync(tempPath, Buffer.from(response));
        const reloaded = yield Jimp.read(tempPath);
        const pixel = reloaded.getPixelColor(10, 10);
        const argb = Jimp.intToRGBA(pixel);
        expect(argb.a).toBe(255);
        expect(argb.b).toBe(0);
        expect(argb.g).toBe(0);
        expect(argb.r).toBe(255);
    }), 15 * 1000);
    it("GetImageFor_ForKnownKeyPlaces_MarkerCoveringLocationOnMapInRedIsBiggerThanOnePixel", () => __awaiter(void 0, void 0, void 0, function* () {
        const tempPath = './test_results/GetImageFor_ForKnownKeyPlaces_MarkerCoveringLocationOnMapInRedIsBiggerThanOnePixel_temp.png';
        var location = new ImageLocation_1.ImageLocation(1, 1, "gracechurch");
        var response = yield _sut.GetImageFor(location);
        fs.writeFileSync(tempPath, Buffer.from(response));
        const reloaded = yield Jimp.read(tempPath);
        const pixel = reloaded.getPixelColor(10, 10);
        const argb = Jimp.intToRGBA(pixel);
        expect(argb.a).toBe(255);
        expect(argb.b).toBe(0);
        expect(argb.g).toBe(0);
        expect(argb.r).toBe(255);
    }), 15 * 1000);
});
//# sourceMappingURL=ImageGenerator.test.js.map