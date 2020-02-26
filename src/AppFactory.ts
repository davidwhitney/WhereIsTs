import { LocationFinder } from "./FindingPlaces/LocationFinder";
import { LocationCollection } from "./FindingPlaces/LocationCollection";
import { UrlHelper } from "./Infrastructure/UrlHelper";
import { Configuration } from "./Infrastructure/Configuration";
import { ImageGenerator } from "./ImageGeneration/ImageGenerator";
import { MemoryCache } from "./Infrastructure/MemoryCache";
import { CapacityService } from "./CapacityMonitoring/CapacityService";
import { InMemoryCapacityRepository } from "./CapacityMonitoring/InMemoryCapacityRepository";
import { WhereIsCommand } from "./WhereIsCommand";
import { MapCommand } from "./MapCommand";
import { HeatMapCommand } from "./HeatMapCommand";

var fs = require('fs');

const configuration: Configuration = { 
  UrlRoot: "https://localhost/api", 
  ApiKey: "key123", 
  CapacityApiKey: "", 
  BlobCredentials: "", 
  Root: "", 
  MapPath: ""
};

const capacityRepository = new InMemoryCapacityRepository();
const locationsjson: string = fs.readFileSync("./App_Data/locations.json", { encoding: "utf8" });
const knownLocations = JSON.parse(locationsjson);

const locations = new LocationCollection(...knownLocations);
const locationFinder = new LocationFinder(locations);
const urlHelper = new UrlHelper(configuration);
const imageGenerator = new ImageGenerator(configuration);
const memoryCache = new MemoryCache();
const capacityService = new CapacityService(capacityRepository);

export const whereis = new WhereIsCommand(locationFinder, urlHelper);
export const map = new MapCommand(locations, imageGenerator, memoryCache);
export const heatmap = new HeatMapCommand(locations, imageGenerator, capacityService);