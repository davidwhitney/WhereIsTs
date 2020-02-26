"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Hotness_1 = require("./CapacityMonitoring/Hotness");
const LocationFromRequest_1 = require("./Infrastructure/LocationFromRequest");
const url = require("url");
class HeatMapCommand {
    constructor(locations, generator, capacityService) {
        this._locations = locations;
        this._generator = generator;
        this._capacityService = capacityService;
    }
    // [FunctionName("HeatMap")]
    execute(req) {
        try {
            const keys = url.parse("http://tempuri.org/?" + req.Query, true).query.key;
            const mapKey = keys.toLowerCase();
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
            const outputBytes = this._generator.HighlightMap(mapKey, highlights);
            return { status: 200, FileContents: outputBytes, ContentType: "image/jpeg" };
        }
        catch (ex) {
            console.log(ex);
            throw ex;
        }
    }
}
exports.HeatMapCommand = HeatMapCommand;
//# sourceMappingURL=HeatMapCommand.js.map