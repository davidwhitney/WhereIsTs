import { LocationCollection } from "./FindingPlaces/LocationCollection";
import { IImageGenerator } from "./ImageGeneration/IImageGenerator";
import { IMemoryCache } from "./Infrastructure/IMemoryCache";
import url = require("url");

export class MapCommand {
    private readonly _locations: LocationCollection;
    private readonly _cache: IMemoryCache;
    private readonly _generator: IImageGenerator;

    public constructor(locations: LocationCollection, generator: IImageGenerator, cache: IMemoryCache) {
        this._locations = locations;
        this._generator = generator;
        this._cache = cache;
    }

    async execute(req) {   

        const key = req.query.key || ""; 
        const mapKey = encodeURIComponent(key.toLowerCase());

        const location = this._locations.GetByKey(mapKey);
        if (location == null) {
            return { status: 404, FileContents: [], ContentType: "image/jpg" };
        }

        const outputBytes = await this._cache.GetOrCreate(
            location.Key(),
            async (entry) => await this._generator.GetImageFor(location.ImageLocation)
        );

        return { status: 200, FileContents: outputBytes, ContentType: "image/jpg" };
    }
}