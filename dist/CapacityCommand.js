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
class CapacityCommand {
    constructor(locations, urlHelper, capacityService) {
        this._locations = locations;
        this._urlHelper = urlHelper;
        this._capacityService = capacityService;
    }
    execute(request) {
        return __awaiter(this, void 0, void 0, function* () {
            if (request.text.trim() === "") {
                return SlackResponse_1.SlackResponse.NoLocationProvided();
            }
            const location = new LocationFromRequest_1.LocationFromRequest(request.text);
            console.log("Detected location is :" + location.Value);
            const totalAvailableSeats = this._locations.TotalCapacityOf(location.Value);
            const filledSeats = this._capacityService.NumberOfDesksOccupiedForLocation(location.Value);
            console.log("Capacity of " + totalAvailableSeats);
            const result = `There are ${filledSeats} of ${totalAvailableSeats} desks used in ${request.text}.`;
            const imageUrl = this._urlHelper.CapacityImageFor(location.Value);
            return new SlackResponse_1.SlackResponse(result, imageUrl);
        });
    }
}
exports.CapacityCommand = CapacityCommand;
//# sourceMappingURL=CapacityCommand.js.map