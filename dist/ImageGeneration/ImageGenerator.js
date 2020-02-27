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
const Jimp = require('jimp');
class ImageGenerator {
    constructor(config) {
        this._config = config;
    }
    GetImageFor(location) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.HighlightMap(location.Map, [
                { Location: location, Colour: "#FF0000" }
            ]);
        });
    }
    HighlightMap(map, highlights) {
        var map;
        return __awaiter(this, void 0, void 0, function* () {
            map = this._config.MapPath + "/" + `${map}.jpg`;
            return yield ImageGenerator.HighlightAreaInImage(map, highlights);
        });
    }
    static HighlightAreaInImage(path, highlights) {
        return __awaiter(this, void 0, void 0, function* () {
            const image = yield Jimp.read(path);
            highlights.forEach((loc) => {
                const mask = new Jimp(40, 40, loc.Colour);
                image.composite(mask, loc.Location.X - 20, loc.Location.Y - 20);
            });
            image.quality(70);
            return yield image.getBufferAsync(Jimp.MIME_PNG);
        });
    }
}
exports.ImageGenerator = ImageGenerator;
//# sourceMappingURL=ImageGenerator.js.map