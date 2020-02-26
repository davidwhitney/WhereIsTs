import { LocationFinder } from "./FindingPlaces/LocationFinder";
import { LocationCollection } from "./FindingPlaces/LocationCollection";
import { UrlHelper } from "./Infrastructure/UrlHelper";
import { Configuration } from "./Infrastructure/Configuration";

var fs = require('fs');

const configuration: Configuration = { 
  UrlRoot: "https://localhost/api", 
  ApiKey: "key123", 
  CapacityApiKey: "", 
  BlobCredentials: "", 
  Root: "", 
  MapPath: ""
};

const locationsjson: string = fs.readFileSync("./App_Data/locations.json", { encoding: "utf8" });
const knownLocations = JSON.parse(locationsjson);

export const locations = new LocationCollection(...knownLocations);
export const locationFinder = new LocationFinder(locations);
export const urlHelper = new UrlHelper(configuration);
