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
const Hotness_1 = require("./CapacityMonitoring/Hotness");
const LocationFromRequest_1 = require("./Infrastructure/LocationFromRequest");
class HeatMapCommand {
    constructor(locations, generator, capacityService) {
        this._locations = locations;
        this._generator = generator;
        this._capacityService = capacityService;
    }
    execute(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const mapKey = encodeURIComponent(req.query.key.toLowerCase());
            const pointsOfInterest = this._locations.filter(x => x.RawKey().indexOf(mapKey + "::") == 0);
            const hotness = new Hotness_1.Hotness();
            const highlights = [];
            pointsOfInterest.forEach((poi) => {
                const location = this._locations.filter(x => x.Key == poi.Key)[0];
                const totalAvailableSeats = location.Capacity;
                let locationFromRequest = new LocationFromRequest_1.LocationFromRequest(poi.RawKey());
                let filledSeats = this._capacityService.NumberOfDesksOccupiedForLocation(locationFromRequest.Value);
                filledSeats = filledSeats > totalAvailableSeats ? totalAvailableSeats : filledSeats;
                const percentage = Math.floor(filledSeats / totalAvailableSeats * 100);
                const colorGrade = hotness.Rank(percentage);
                highlights.push({ Location: poi.ImageLocation, Colour: colorGrade });
            });
            const outputBytes = yield this._generator.HighlightMap(mapKey, highlights);
            return { status: 200, FileContents: outputBytes, ContentType: "image/jpeg" };
        });
    }
}
exports.HeatMapCommand = HeatMapCommand;
//# sourceMappingURL=HeatMapCommand.js.map