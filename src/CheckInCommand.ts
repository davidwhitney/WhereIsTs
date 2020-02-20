import { ICapacityService } from "./CapacityMonitoring/ICapacityService";
import { LocationFromRequest } from "./Infrastructure/LocationFromRequest";
import url = require("url");

export class CheckInCommand {
    private readonly _capacityService: ICapacityService;

    constructor(capacityService: ICapacityService) {
        this._capacityService = capacityService;
    }

    // [FunctionName("CheckIn")]
    // Functions SDK method sig garbage goes here
    async execute(req) {    
        try
        {
            const request = url.parse("http://tempuri.org/?" + req.Query, true).query;
            var rawLocation = (<string>request.location) || null;
            var location = new LocationFromRequest(rawLocation);            
            if (!location.IsValid()) {
                return { status: 400 };
            }

            this._capacityService.CheckIn(location);
            
            return { status: 200, message: "Thanks for checking in!" };
        }
        catch (ex)
        {
            console.log(JSON.stringify(ex));
            throw ex;
        }
    }
}