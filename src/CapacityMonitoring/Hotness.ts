export class Hotness { // This gun be fun. ok so we need a colour thing here.
    public constructor() {
        this[17] = "Rgba32.LightGreen";
        this[34] = "Rgba32.Green";
        this[50] = "Rgba32.Yellow";
        this[67] = "Rgba32.Orange";
        this[100] = "Rgba32.Red";
    }

    public Rank(percentageUsed: number): any {
        return -1000; // fixme
        /*return percentageUsed >= 100
            ? Rgba32.Red
            : this.FirstOrDefault(x => percentageUsed <= x.Key).Value;*/
    }
}