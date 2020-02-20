import { ImageLocation } from "../FindingPlaces/ImageLocation";
import { Highlight } from "./Highlight";

export interface IImageGenerator {
    GetImageFor(location: ImageLocation): Promise<Buffer>;
    HighlightMap(map: string, highlights: Array<Highlight>): Promise<Buffer>;
}