import { ICapacityService } from "./ICapacityService";
import { CapacityService } from "./CapacityService";
import { ICapacityRepository } from "./ICapacityRepository";
import { InMemoryCapacityRepository } from "./InMemoryCapacityRepository";

describe("CapacityService tests", () => {

    let _sut: ICapacityService;

    beforeEach(() => {
        _sut = new CapacityService(new InMemoryCapacityRepository());
    });

    it("CheckIn_IncrementsNumberAgainstProvidedLocationKey", async () => {
        _sut.CheckIn("gracechurch::245-210");

        var occupiedCount = await _sut.NumberOfDesksOccupiedForLocation("gracechurch");

        expect(occupiedCount).toBe(1);
    });
});