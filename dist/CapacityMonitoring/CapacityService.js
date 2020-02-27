"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class CapacityService {
    constructor(capacityRepository) {
        this._repo = capacityRepository;
    }
    NumberOfDesksOccupiedForLocation(location) {
        return __awaiter(this, void 0, void 0, function* () {
            var state = yield this._repo.Load();
            const valuesInThisRegion = [];
            const keysInThisRegion = Array.from(state.keys()).filter(x => x.toLowerCase().indexOf(location) == 0);
            keysInThisRegion.forEach(k => { valuesInThisRegion.push(state.get(k)); });
            return valuesInThisRegion.reduce((total, next) => total + next, 0);
        });
    }
    CheckIn(compoundKey) {
        return __awaiter(this, void 0, void 0, function* () {
            var state = yield this._repo.Load();
            console.log(state);
            if (!state.has(compoundKey)) {
                state.set(compoundKey, 0);
            }
            state.set(compoundKey, state.get(compoundKey) + 1);
            this._repo.Save(state);
        });
    }
}
exports.CapacityService = CapacityService;
//# sourceMappingURL=CapacityService.js.map