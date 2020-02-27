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
        try {            
            const mapKey = encodeURIComponent(req.query.key.toLowerCase());

            const location = this._locations.filter(x => x.Key() == mapKey)[0];
            if (location == null) {
                return { status: 404 };
            }

            const outputBytes = await this._cache.GetOrCreate(
                location.Key(),
                async (entry) => await this._generator.GetImageFor(location.ImageLocation)
            );

            return { status: 200, FileContents: outputBytes, ContentType: "image/jpeg" };

        } catch (ex) {
            console.log(ex);
            throw ex;
        }
    }
}