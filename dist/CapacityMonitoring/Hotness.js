"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Hotness {
    constructor() {
        this._values = {};
        this._values[17] = "#90EE90";
        this._values[34] = "#008000";
        this._values[50] = "#FFFF00";
        this._values[67] = "#FFA500";
        this._values[100] = "#FF0000";
    }
    Rank(percentageUsed) {
        return percentageUsed >= 100
            ? "#FF0000"
            : this._values[Object.getOwnPropertyNames(this._values).filter(x => percentageUsed <= parseInt(x))[0]];
    }
}
exports.Hotness = Hotness;
//# sourceMappingURL=Hotness.js.map