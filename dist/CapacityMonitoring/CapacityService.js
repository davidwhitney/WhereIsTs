"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CapacityService {
    constructor(capacityRepository) {
        this._repo = capacityRepository;
    }
    NumberOfDesksOccupiedForLocation(location) {
        var state = this._repo.Load();
        const valuesInThisRegion = [];
        const keysInThisRegion = Array.from(state.keys()).filter(x => x.toLowerCase().indexOf(location) == 0);
        keysInThisRegion.forEach(k => { valuesInThisRegion.push(state.get(k)); });
        return valuesInThisRegion.reduce((total, next) => total + next, 0);
    }
    CheckIn(compoundKey) {
        var state = this._repo.Load();
        console.log(state);
        if (!state.has(compoundKey)) {
            state.set(compoundKey, 0);
        }
        state.set(compoundKey, state.get(compoundKey) + 1);
        this._repo.Save(state);
    }
}
exports.CapacityService = CapacityService;
//# sourceMappingURL=CapacityService.js.map