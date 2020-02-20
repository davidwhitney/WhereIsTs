import { ICapacityService } from "./CapacityMonitoring/ICapacityService";
import { CheckInCommand } from "./CheckInCommand";
import { ExpectedRequests } from "./TestHelpers/Fakes/ExpectedRequests";

describe("CheckInCommandTests", () => {

    let _sut: CheckInCommand;
    let _capacityService: ICapacityService;

    beforeEach(() => {
        _capacityService = {
            "Called": false
            "CheckIn": function (){ this.Called = true; }
        } as any as ICapacityService;
        
        _sut = new CheckInCommand(_capacityService);
    });

    it("Run_NoLocationRequested_ReturnsBadRequest", async () => {
        var request = ExpectedRequests.CheckInFor(" ");

        var response = await _sut.execute(request);

        expect(response.status).toBe(400);
    });

    it("Run_KnownLocationRequested_ReturnsHintAsToAvailability", async () => {
        var request = ExpectedRequests.CheckInFor("gracechurch::245-210");

        var response = await _sut.execute(request);

        expect(response.status).toBe(200);
    });

    it("Run_KnownLocationRequested_ThanksUserAtTheEnd", async () => {
        var request = ExpectedRequests.CheckInFor("gracechurch::245-210");

        var response = await _sut.execute(request);

        expect(response.message).toBe("Thanks for checking in!");
    });

    it("Run_KnownLocationRequested_LogsCheckinRequest", async () => {
        var request = ExpectedRequests.CheckInFor("gracechurch::245-210");

        await _sut.execute(request);

        expect((<any>_capacityService).Called).toBeTruthy();
    });
});