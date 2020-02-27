"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Location_1 = require("./Location");
const LevenshteinDistance_1 = require("./LevenshteinDistance");
class LocationFinder {
    constructor(locations) {
        this.PercentageToleranceForMisspellings = 35;
        this._locations = locations;
    }
    Find(location) {
        location = location || "";
        if (location.trim() === "") {
            return Location_1.Loc.NotFound;
        }
        var key = encodeURIComponent(location.toLowerCase());
        var exactMatch = this._locations.filter(x => x.Key() == key)[0];
        if (exactMatch != null) {
            return exactMatch;
        }
        var { nearest, distance } = this.ReturnNearestSpellingMatch(key);
        var maxDistance = nearest.Name.length / 100 * this.PercentageToleranceForMisspellings;
        var roundedDistance = Math.round(maxDistance);
        return distance <= roundedDistance
            ? nearest
            : Location_1.Loc.NotFound;
    }
    ReturnNearestSpellingMatch(key) {
        var distances = this._locations.map(x => ({
            key: x.Key(),
            distance: LevenshteinDistance_1.LevenshteinDistance.Compute(x.Key(), key)
        })).sort((a, b) => a.distance - b.distance);
        return {
            nearest: this._locations.filter(x => x.Key() == distances[0].key)[0],
            distance: distances[0].distance
        };
    }
}
exports.LocationFinder = LocationFinder;
//# sourceMappingURL=LocationFinder.js.map