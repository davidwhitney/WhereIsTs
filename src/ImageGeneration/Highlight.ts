import { Coord } from "../FindingPlaces/Coord";

export interface Highlight {
    Location: Coord;
    Colour: any; // Rgba32 - hmm need something for whatever image lib we use, gimp?
}