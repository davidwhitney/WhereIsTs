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
var fs = require('fs');
const configuration = {
    UrlRoot: "https://localhost/api",
    ApiKey: "key123",
    CapacityApiKey: "",
    BlobCredentials: "",
    Root: "",
    MapPath: ""
};
const capacityRepository = new InMemoryCapacityRepository_1.InMemoryCapacityRepository();
const locationsjson = fs.readFileSync("./App_Data/locations.json", { encoding: "utf8" });
const knownLocations = JSON.parse(locationsjson);
const locations = new LocationCollection_1.LocationCollection(...knownLocations);
const locationFinder = new LocationFinder_1.LocationFinder(locations);
const urlHelper = new UrlHelper_1.UrlHelper(configuration);
const imageGenerator = new ImageGenerator_1.ImageGenerator(configuration);
const memoryCache = new MemoryCache_1.MemoryCache();
const capacityService = new CapacityService_1.CapacityService(capacityRepository);
exports.whereis = new WhereIsCommand_1.WhereIsCommand(locationFinder, urlHelper);
exports.map = new MapCommand_1.MapCommand(locations, imageGenerator, memoryCache);
exports.heatmap = new HeatMapCommand_1.HeatMapCommand(locations, imageGenerator, capacityService);
//# sourceMappingURL=AppFactory.js.map