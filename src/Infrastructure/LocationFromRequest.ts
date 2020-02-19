class LocationFromRequest {
    public Value: string;

    constructor(location: string) {
        location = location ?? "";
        this.Value = location.toLocaleLowerCase().trim();
    }

    public IsValid = (): boolean => !(this.Value !== "");
}