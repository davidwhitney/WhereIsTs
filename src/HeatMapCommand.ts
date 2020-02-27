import { LocationCollection } from './FindingPlaces/LocationCollection';
import { ICapacityService } from './CapacityMonitoring/ICapacityService';
import { Hotness } from './CapacityMonitoring/Hotness';
import { Highlight } from './ImageGeneration/Highlight';
import { LocationFromRequest } from './Infrastructure/LocationFromRequest';
import { IImageGenerator } from './ImageGeneration/IImageGenerator';
import url = require("url");

export class HeatMapCommand {
    private readonly _locations: LocationCollection;
    private readonly _capacityService: ICapacityService;
    private readonly _generator: IImageGenerator;

    public constructor(locations: LocationCollection, generator: IImageGenerator, capacityService: ICapacityService) {
        this._locations = locations;
        this._generator = generator;
        this._capacityService = capacityService;
    }
    
    public async execute(req) {

        const mapKey = encodeURIComponent(req.query.key.toLowerCase());
        const pointsOfInterest = this._locations.filter(x => x.RawKey().indexOf(mapKey + "::") == 0);

        const hotness = new Hotness();
        const highlights: Highlight[] = [];

        pointsOfInterest.forEach((poi) => {
            const location = this._locations.filter(x => x.Key == poi.Key)[0];
            const totalAvailableSeats = location.Capacity;
            let locationFromRequest = new LocationFromRequest(poi.RawKey());
            let filledSeats = this._capacityService.NumberOfDesksOccupiedForLocation(locationFromRequest.Value);
            filledSeats = filledSeats > totalAvailableSeats ? totalAvailableSeats : filledSeats;

            const percentage = Math.floor(filledSeats / totalAvailableSeats * 100);

            const colorGrade = hotness.Rank(percentage);

            highlights.push({ Location: poi.ImageLocation, Colour: colorGrade });
        });

        const outputBytes = await this._generator.HighlightMap(mapKey, highlights);

        return { status: 200, FileContents: outputBytes, ContentType: "image/jpeg" };
    }
}