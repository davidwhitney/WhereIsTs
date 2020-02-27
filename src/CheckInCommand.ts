import { ICapacityService } from "./CapacityMonitoring/ICapacityService";
import { LocationFromRequest } from "./Infrastructure/LocationFromRequest";
import url = require("url");

export class CheckInCommand {
    private readonly _capacityService: ICapacityService;

    constructor(capacityService: ICapacityService) {
        this._capacityService = capacityService;
    }

    async execute(req) {   

        const request = url.parse("http://tempuri.org/?" + req.Query, true).query;
        const rawLocation = (<string>request.location) || null;
        const location = new LocationFromRequest(rawLocation);
        if (!location.IsValid()) {
            return { status: 400 };
        }

        this._capacityService.CheckIn(location.Value);

        return { status: 200, message: "Thanks for checking in!" };
    }
}