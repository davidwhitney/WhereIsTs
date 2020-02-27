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
const SlackResponse_1 = require("./Slack/SlackResponse");
const LocationFromRequest_1 = require("./Infrastructure/LocationFromRequest");
const url = require("url");
class CapacityCommand {
    constructor(locations, urlHelper, capacityService) {
        this._locations = locations;
        this._urlHelper = urlHelper;
        this._capacityService = capacityService;
    }
    // Functions SDK method sig garbage goes here
    execute(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = url.parse("http://tempuri.org/?" + req.body, true).query;
                if (request.text.trim() === "") {
                    return SlackResponse_1.SlackResponse.NoLocationProvided();
                }
                const location = new LocationFromRequest_1.LocationFromRequest(request.text);
                const totalAvailableSeats = this._locations.TotalCapacityOf(location.Value);
                const filledSeats = this._capacityService.NumberOfDesksOccupiedForLocation(location.Value);
                const result = `There are ${filledSeats} of ${totalAvailableSeats} desks used in ${request.text}.`;
                const imageUrl = this._urlHelper.CapacityImageFor(location.Value);
                return new SlackResponse_1.SlackResponse(result, imageUrl);
            }
            catch (ex) {
                console.log(ex);
                throw ex;
            }
        });
    }
}
exports.CapacityCommand = CapacityCommand;
//# sourceMappingURL=CapacityCommand.js.map