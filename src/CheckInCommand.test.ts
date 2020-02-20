import { ICapacityService } from "./CapacityMonitoring/ICapacityService";
import { CheckInCommand } from "./CheckInCommand";
import { ExpectedRequests } from "./TestHelpers/Fakes/ExpectedRequests";
import each from "jest-each";

describe("CheckInCommandTests", () => {

    let _sut: CheckInCommand;
    let _capacityService: ICapacityService;

    beforeEach(() => {
        _capacityService = {
            "Called": false,
            "CheckIn": function (){ this.Called = true; }
        } as any as ICapacityService;
        
        _sut = new CheckInCommand(_capacityService);
    });

    each([
        [""],
        [" "]
    ]).it("Run_NoLocationRequested_ReturnsBadRequest %s", async (val) => {
        const request = ExpectedRequests.CheckInFor(val);
        const response = await _sut.execute(request);
        expect(response.status).toBe(400);
    });

    it("Run_KnownLocationRequested_ReturnsHintAsToAvailability", async () => {
        const request = ExpectedRequests.CheckInFor("gracechurch::245-210");

        const response = await _sut.execute(request);

        expect(response.status).toBe(200);
    });

    it("Run_KnownLocationRequested_ThanksUserAtTheEnd", async () => {
        const request = ExpectedRequests.CheckInFor("gracechurch::245-210");

        const response = await _sut.execute(request);

        expect(response.message).toBe("Thanks for checking in!");
    });

    it("Run_KnownLocationRequested_LogsCheckinRequest", async () => {
        const request = ExpectedRequests.CheckInFor("gracechurch::245-210");

        await _sut.execute(request);

        expect((<any>_capacityService).Called).toBeTruthy();
    });
});