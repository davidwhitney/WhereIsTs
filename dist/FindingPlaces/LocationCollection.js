"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LocationCollection extends Array {
    SublocationsOf(name) {
        return this.filter(x => x.Name.indexOf(name + "::") > -1);
    }
    TotalCapacityOf(name) {
        return this.SublocationsOf(name).reduce((x, y) => x + y.Capacity, 0);
    }
}
exports.LocationCollection = LocationCollection;
//# sourceMappingURL=LocationCollection.js.map