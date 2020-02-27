"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LocationFromRequest {
    constructor(location) {
        location = location;
        if (!location) {
            location = "";
        }
        this.Value = location.toLocaleLowerCase().trim();
    }
    IsValid() { return !(this.Value.trim() === ""); }
}
exports.LocationFromRequest = LocationFromRequest;
//# sourceMappingURL=LocationFromRequest.js.map