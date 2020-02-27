import { IImageGenerator } from './IImageGenerator';
import { ImageLocation } from '../FindingPlaces/ImageLocation';
import { Highlight } from './Highlight';
import { Configuration } from '../Infrastructure/Configuration';
import Jimp = require('jimp');

export class ImageGenerator implements IImageGenerator {

    private readonly _config: Configuration;

    constructor(config: Configuration) {
        this._config = config;
    }

    public async GetImageFor(location: ImageLocation): Promise<Buffer> {
        return this.HighlightMap(location.Map, [
            { Location: location, Colour: "#FF0000"}
        ]);
    }    
    
    public async HighlightMap(map: string, highlights: Highlight[]): Promise<Buffer> {
        var map = this._config.MapPath + "/" + `${map}.jpg`;
        return await ImageGenerator.HighlightAreaInImage(map, highlights);
    }

    private static async HighlightAreaInImage(path: string, highlights: Highlight[]): Promise<Buffer> {

        const image = await Jimp.read(path);                

        highlights.forEach((loc) => {
            const mask = new Jimp(40, 40, loc.Colour);
            image.composite(mask, loc.Location.X - 20, loc.Location.Y - 20);
        });
        
        const compressed = await image.quality(30);
        return await compressed.getBufferAsync(Jimp.MIME_JPEG);
    }
}