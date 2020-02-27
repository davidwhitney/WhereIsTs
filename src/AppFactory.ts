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
import { CheckInCommand } from "./CheckInCommand";
import { CapacityCommand } from "./CapacityCommand";
import { Loc, LocationData } from './FindingPlaces/Location';

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
const knownLocations: LocationData[] = JSON.parse(locationsjson);
const asLocs = knownLocations.map(ld => new Loc(ld.Name, ld.ImageLocation, ld.Capacity));

const locations = new LocationCollection(...asLocs);
const locationFinder = new LocationFinder(locations);
const urlHelper = new UrlHelper(configuration);
const imageGenerator = new ImageGenerator(configuration);
const memoryCache = new MemoryCache();
const capacityService = new CapacityService(capacityRepository);

export const capacity = new CapacityCommand(locations, urlHelper, capacityService);
export const checkin = new CheckInCommand(capacityService);
export const heatmap = new HeatMapCommand(locations, imageGenerator, capacityService);
export const map = new MapCommand(locations, imageGenerator, memoryCache);
export const whereis = new WhereIsCommand(locationFinder, urlHelper);