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
const CapacityService_1 = require("./CapacityService");
const InMemoryCapacityRepository_1 = require("./InMemoryCapacityRepository");
describe("CapacityService tests", () => {
    let _sut;
    beforeEach(() => {
        _sut = new CapacityService_1.CapacityService(new InMemoryCapacityRepository_1.InMemoryCapacityRepository());
    });
    it("CheckIn_IncrementsNumberAgainstProvidedLocationKey", () => __awaiter(void 0, void 0, void 0, function* () {
        _sut.CheckIn("gracechurch::245-210");
        var occupiedCount = _sut.NumberOfDesksOccupiedForLocation("gracechurch");
        expect(occupiedCount).toBe(1);
    }));
});
//# sourceMappingURL=CapacityService.test.js.map