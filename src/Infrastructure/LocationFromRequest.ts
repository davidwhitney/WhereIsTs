export class LocationFromRequest {
    public Value: string;

    constructor(location: string | null) {
        location = location;
        if (!location) {
            location = "";
        }

        this.Value = location.toLocaleLowerCase().trim();
    }

    public IsValid(): boolean { return !(this.Value.trim() === ""); }
}