import { IUrlHelper } from "./Infrastructure/IUrlHelper";
import { ICapacityService } from "./CapacityMonitoring/ICapacityService";
import { LocationCollection } from "./FindingPlaces/LocationCollection"
import { SlackResponse } from "./Slack/SlackResponse";
import { LocationFromRequest } from "./Infrastructure/LocationFromRequest";
import { SlackRequest } from "./Slack/SlackRequest";

export class CapacityCommand {
    
    private readonly _locations: LocationCollection;
    private readonly _urlHelper: IUrlHelper;
    private readonly _capacityService: ICapacityService;

    constructor(locations: LocationCollection, urlHelper: IUrlHelper, capacityService: ICapacityService) {
        this._locations = locations;
        this._urlHelper = urlHelper;
        this._capacityService = capacityService;
    }

    async execute(request: SlackRequest) {
        if (request.text.trim() === "") {
            return SlackResponse.NoLocationProvided();
        }

        const location = new LocationFromRequest(request.text);
        const totalAvailableSeats = this._locations.TotalCapacityOf(location.Value);
        const filledSeats = this._capacityService.NumberOfDesksOccupiedForLocation(location.Value);

        const result = `There are ${filledSeats} of ${totalAvailableSeats} desks used in ${request.text}.`;
        const imageUrl = this._urlHelper.CapacityImageFor(location.Value);
        return new SlackResponse(result, imageUrl);
    }
}