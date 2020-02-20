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
    
    // [FunctionName("HeatMap")]
    public execute(req) {
        try {            
            const keys = url.parse("http://tempuri.org/?" + req.Query, true).query.key;
            const mapKey = (<string>keys).toLowerCase();             
            var pointsOfInterest = this._locations.filter(x => x.RawKey().indexOf(mapKey + "::") == 0);
            
            var hotness = new Hotness();
            var highlights: Highlight[] = [];

            pointsOfInterest.forEach((poi) => {
                var location = this._locations.filter(x=>x.Key == poi.Key)[0];
                var totalAvailableSeats = location.Capacity;
                var filledSeats = this._capacityService.NumberOfDesksOccupiedForLocation(new LocationFromRequest(poi.RawKey()));
                filledSeats = filledSeats > totalAvailableSeats ? totalAvailableSeats : filledSeats;

                var percentage = Math.floor(filledSeats / totalAvailableSeats * 100);
                
                var colorGrade = hotness.Rank(percentage);

                highlights.push({ Location: poi.ImageLocation, Colour: colorGrade });
            });

            var outputBytes = this._generator.HighlightMap(mapKey, highlights);

            return { status: 200, FileContents: outputBytes, ContentType: "image/jpeg" };
        }
        catch (ex)
        {
            console.log(ex);
            throw ex;
        }
    }
}