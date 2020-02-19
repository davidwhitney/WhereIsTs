import { LocationCollection } from "./LocationCollection";
import { ILocationFinder } from './ILocationFinder';
import { Loc } from "./Location";
import { LevenshteinDistance } from "./LevenshteinDistance";

type DistanceMap = { key: string, distance: number };

export class LocationFinder implements ILocationFinder {
    private readonly _locations: LocationCollection;
    private PercentageToleranceForMisspellings: number = 35;

    public constructor(locations: LocationCollection) {
        this._locations = locations;
    }

    Find(location: string): Loc {
        location = location || "";
        if (location.trim() === "") {
            return Loc.NotFound;
        }

        var key = encodeURIComponent(location.toLowerCase());
        var exactMatch = this._locations.filter(x => x.Key() == key)[0];
        if (exactMatch != null) {
            return exactMatch;  
        }

        var { nearest, distance }  = this.ReturnNearestSpellingMatch(key);

        var maxDistance = nearest.Name.length / 100 * this.PercentageToleranceForMisspellings;
        var roundedDistance = Math.round(maxDistance);

        return distance <= roundedDistance
            ? nearest
            : Loc.NotFound;
    } 

    private ReturnNearestSpellingMatch(key: string): { nearest: Loc, distance: number } {
        var distances: Array<DistanceMap> = this._locations.map(x => ({
            key: x.Key(),
            distance: LevenshteinDistance.Compute(x.Key(), key)
        })).sort((a, b) => a.distance - b.distance);

        return {
            nearest: this._locations.filter(x => x.Key() == distances[0].key)[0],
            distance: distances[0].distance
        }
    } 
}