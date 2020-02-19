class ImageLocation extends Coord {
    public Map: string;

    constructor(x: number, y: number, map: string = "map") {
        super(x, y);
        this.Map = map;
        this.X = x;
        this.Y = y;
    }
}