"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LocationFinder_1 = require("./FindingPlaces/LocationFinder");
const LocationCollection_1 = require("./FindingPlaces/LocationCollection");
const UrlHelper_1 = require("./Infrastructure/UrlHelper");
const ImageGenerator_1 = require("./ImageGeneration/ImageGenerator");
const MemoryCache_1 = require("./Infrastructure/MemoryCache");
const CapacityService_1 = require("./CapacityMonitoring/CapacityService");
const InMemoryCapacityRepository_1 = require("./CapacityMonitoring/InMemoryCapacityRepository");
const WhereIsCommand_1 = require("./WhereIsCommand");
const MapCommand_1 = require("./MapCommand");
const HeatMapCommand_1 = require("./HeatMapCommand");
const CheckInCommand_1 = require("./CheckInCommand");
const CapacityCommand_1 = require("./CapacityCommand");
const Location_1 = require("./FindingPlaces/Location");
var fs = require('fs');
const configuration = {
    UrlRoot: "https://us-central1-gfktemp.cloudfunctions.net/whereis",
    ApiKey: "unused",
    CapacityApiKey: "unused",
    BlobCredentials: "",
    MapPath: "./App_Data/Maps"
};
const capacityRepository = new InMemoryCapacityRepository_1.InMemoryCapacityRepository();
const locationsjson = fs.readFileSync("./App_Data/locations.json", { encoding: "utf8" });
const knownLocations = JSON.parse(locationsjson);
const asLocs = knownLocations.map(ld => new Location_1.Loc(ld.Name, ld.ImageLocation, ld.Capacity));
const locations = new LocationCollection_1.LocationCollection(...asLocs);
const locationFinder = new LocationFinder_1.LocationFinder(locations);
const urlHelper = new UrlHelper_1.UrlHelper(configuration);
const imageGenerator = new ImageGenerator_1.ImageGenerator(configuration);
const memoryCache = new MemoryCache_1.MemoryCache();
const capacityService = new CapacityService_1.CapacityService(capacityRepository);
exports.capacity = new CapacityCommand_1.CapacityCommand(locations, urlHelper, capacityService);
exports.checkin = new CheckInCommand_1.CheckInCommand(capacityService);
exports.heatmap = new HeatMapCommand_1.HeatMapCommand(locations, imageGenerator, capacityService);
exports.map = new MapCommand_1.MapCommand(locations, imageGenerator, memoryCache);
exports.whereis = new WhereIsCommand_1.WhereIsCommand(locationFinder, urlHelper);
//# sourceMappingURL=AppFactory.js.map