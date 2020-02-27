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
class MapCommand {
    constructor(locations, generator, cache) {
        this._locations = locations;
        this._generator = generator;
        this._cache = cache;
    }
    execute(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const mapKey = encodeURIComponent(req.query.key.toLowerCase());
            const location = this._locations.filter(x => x.Key() == mapKey)[0];
            if (location == null) {
                return { status: 404 };
            }
            const outputBytes = yield this._cache.GetOrCreate(location.Key(), (entry) => __awaiter(this, void 0, void 0, function* () { return yield this._generator.GetImageFor(location.ImageLocation); }));
            return { status: 200, FileContents: outputBytes, ContentType: "image/jpeg" };
        });
    }
}
exports.MapCommand = MapCommand;
//# sourceMappingURL=MapCommand.js.map