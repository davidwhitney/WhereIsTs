import { ImageLocation } from "./ImageLocation";

export interface LocationData {
    Name: string;
    Capacity: number;
    ImageLocation: ImageLocation;
}

export class Loc implements LocationData {
    public Name: string;
    public Capacity: number = 0;
    public ImageLocation: ImageLocation;

    constructor(name: string, imageLocation: ImageLocation | null = null, capacity: number = 0) {
        this.Name = name;
        this.ImageLocation = imageLocation || new ImageLocation(0, 0);
    }

    public RawKey() : string {
        return decodeURIComponent(this.Key());
    }

    public Key() : string {
        return encodeURIComponent(this.Name.toLowerCase());
    }

    public static NotFound: Loc = new Loc("NOTFOUND");
}