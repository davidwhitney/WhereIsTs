"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ImageLocation_1 = require("./ImageLocation");
class Loc {
    constructor(name, imageLocation = null, capacity = 0) {
        this.Capacity = 0;
        this.Name = name;
        this.ImageLocation = imageLocation || new ImageLocation_1.ImageLocation(0, 0);
    }
    RawKey() {
        return decodeURIComponent(this.Key());
    }
    Key() {
        return encodeURIComponent(this.Name.toLowerCase());
    }
}
exports.Loc = Loc;
Loc.NotFound = new Loc("NOTFOUND");
//# sourceMappingURL=Location.js.map