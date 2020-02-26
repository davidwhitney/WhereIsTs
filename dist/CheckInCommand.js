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
const LocationFromRequest_1 = require("./Infrastructure/LocationFromRequest");
const url = require("url");
class CheckInCommand {
    constructor(capacityService) {
        this._capacityService = capacityService;
    }
    // [FunctionName("CheckIn")]
    // Functions SDK method sig garbage goes here
    execute(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = url.parse("http://tempuri.org/?" + req.Query, true).query;
                const rawLocation = request.location || null;
                const location = new LocationFromRequest_1.LocationFromRequest(rawLocation);
                if (!location.IsValid()) {
                    return { status: 400 };
                }
                this._capacityService.CheckIn(location.Value);
                return { status: 200, message: "Thanks for checking in!" };
            }
            catch (ex) {
                console.log(JSON.stringify(ex));
                throw ex;
            }
        });
    }
}
exports.CheckInCommand = CheckInCommand;
//# sourceMappingURL=CheckInCommand.js.map