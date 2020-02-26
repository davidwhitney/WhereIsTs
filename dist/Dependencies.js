"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LocationFinder_1 = require("./FindingPlaces/LocationFinder");
const LocationCollection_1 = require("./FindingPlaces/LocationCollection");
const UrlHelper_1 = require("./Infrastructure/UrlHelper");
var fs = require('fs');
const configuration = {
    UrlRoot: "https://localhost/api",
    ApiKey: "key123",
    CapacityApiKey: "",
    BlobCredentials: "",
    Root: "",
    MapPath: ""
};
const locationsjson = fs.readFileSync("./App_Data/locations.json", { encoding: "utf8" });
const knownLocations = JSON.parse(locationsjson);
exports.locations = new LocationCollection_1.LocationCollection(...knownLocations);
exports.locationFinder = new LocationFinder_1.LocationFinder(exports.locations);
exports.urlHelper = new UrlHelper_1.UrlHelper(configuration);
//# sourceMappingURL=Dependencies.js.map