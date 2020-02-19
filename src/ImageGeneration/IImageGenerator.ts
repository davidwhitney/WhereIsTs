import { ImageLocation } from "../FindingPlaces/ImageLocation";
import { Highlight } from "./Highlight";

export interface IImageGenerator {
    GetImageFor(location: ImageLocation): Buffer;
    HighlightMap(map: string, highlights: Array<Highlight>): ArrayBuffer;
}