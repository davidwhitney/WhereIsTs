import { IUrlHelper } from "./Infrastructure/IUrlHelper";
import { ICapacityService } from "./CapacityMonitoring/ICapacityService";
import { LocationCollection } from "./FindingPlaces/LocationCollection"
import { SlackResponse } from "./Slack/SlackResponse";
import { LocationFromRequest } from "./Infrastructure/LocationFromRequest";
import { SlackRequest } from "./Slack/SlackRequest";
import url = require("url");

export class CapacityCommand {
    
    private readonly _locations: LocationCollection;
    private readonly _urlHelper: IUrlHelper;
    private readonly _capacityService: ICapacityService;

    constructor(locations: LocationCollection, urlHelper: IUrlHelper, capacityService: ICapacityService) {
        this._locations = locations;
        this._urlHelper = urlHelper;
        this._capacityService = capacityService;
    }

    // Functions SDK method sig garbage goes here
    async execute(req, log) {
        try {

            const request = url.parse("http://tempuri.org/?" + req.body, true).query as any as SlackRequest;            
            if (request.text.trim() === "") {
                return SlackResponse.NoLocationProvided();
            }

            var location = new LocationFromRequest(request.text);

            var totalAvailableSeats = this._locations.TotalCapacityOf(location.Value);
            var filledSeats = this._capacityService.NumberOfDesksOccupiedForLocation(location);

            var result = `There are ${filledSeats} of ${totalAvailableSeats} desks used in ${request.text}.`;
            var imageUrl = this._urlHelper.CapacityImageFor(location.Value);
            return new SlackResponse(result, imageUrl);

        }
        catch (ex) {
            console.log(ex);
            throw ex;
        }
    }
}