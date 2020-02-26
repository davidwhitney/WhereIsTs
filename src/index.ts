import { WhereIsCommand } from "./WhereIsCommand";
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

const knownLocationsText = fs.readFileSync("./../App_Data/locations.json");
const knownLocations = JSON.parse(knownLocationsText);
const locations = new LocationCollection(...knownLocations);
const locationFinder = new LocationFinder(locations);
const urlHelper = new UrlHelper(configuration);

exports.whereIsCommand = (req, res) => {
    let message = req.query.message || req.body.message || 'Hello World!';
    const command = new WhereIsCommand(locationFinder, urlHelper);
    const result = command.execute(req);    

    res.status(200).send(result);
  };
  