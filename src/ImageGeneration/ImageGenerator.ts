import { IImageGenerator } from './IImageGenerator';
import { ImageLocation } from '../FindingPlaces/ImageLocation';
import { Highlight } from './Highlight';
import { Configuration } from '../Infrastructure/Configuration';
const Jimp = require('jimp');

export class ImageGenerator implements IImageGenerator {

    private readonly _config: Configuration;

    constructor(config: Configuration) {
        this._config = config;
    }

    public async GetImageFor(location: ImageLocation): Promise<Buffer> {
        return this.HighlightMap(location.Map, [
            { Location: location, Colour: "Rgba32.Red"}
        ]);
    }    
    
    public async HighlightMap(map: string, highlights: Highlight[]): Promise<Buffer> {
        var map = this._config.MapPath + "/" + `${map}.png`;
        return await ImageGenerator.HighlightAreaInImage(map, highlights);
    }

    private static async HighlightAreaInImage(path: string, highlights: Highlight[]): Promise<Buffer> {

        const image = await Jimp.read(path);                

        highlights.forEach((loc) => {
            const mask = new Jimp(40, 40, "#FF0000");
            image.composite(mask, loc.Location.X - 20, loc.Location.Y - 20);
        });
        
        image.quality(70);
        return await image.getBufferAsync(Jimp.MIME_PNG);
    }
}