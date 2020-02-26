"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WhereIsCommand_1 = require("./WhereIsCommand");
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
const knownLocationsText = fs.readFileSync("./../App_Data/locations.json");
const knownLocations = JSON.parse(knownLocationsText);
const locations = new LocationCollection_1.LocationCollection(...knownLocations);
const locationFinder = new LocationFinder_1.LocationFinder(locations);
const urlHelper = new UrlHelper_1.UrlHelper(configuration);
exports.whereIsCommand = (req, res) => {
    let message = req.query.message || req.body.message || 'Hello World!';
    const command = new WhereIsCommand_1.WhereIsCommand(locationFinder, urlHelper);
    const result = command.execute(req);
    res.status(200).send(result);
};
//# sourceMappingURL=index.js.map