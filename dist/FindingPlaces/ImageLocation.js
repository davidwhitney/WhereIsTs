"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Coord_1 = require("./Coord");
class ImageLocation extends Coord_1.Coord {
    constructor(x, y, map = "map") {
        super(x, y);
        this.Map = map;
        this.X = x;
        this.Y = y;
    }
}
exports.ImageLocation = ImageLocation;
//# sourceMappingURL=ImageLocation.js.map