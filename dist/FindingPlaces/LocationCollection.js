"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LocationCollection extends Array {
    SublocationsOf(name) {
        return this.filter(x => x.Name.indexOf(name + "::") > -1);
    }
    TotalCapacityOf(name) {
        return this.SublocationsOf(name).reduce((x, y) => x + y.Capacity, 0);
    }
    GetByKey(mapKey) {
        return this.filter(x => this.KeyFor(x) == mapKey)[0];
    }
    KeyFor(x) {
        return encodeURIComponent(x.Name.toLowerCase());
    }
}
exports.LocationCollection = LocationCollection;
//# sourceMappingURL=LocationCollection.js.map