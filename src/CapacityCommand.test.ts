import { CapacityCommand } from "./CapacityCommand";

describe("Capacity command", () => {
    let _sut: CapacityCommand;
    let _logger = {};

    beforeEach(() => {
        _sut = new CapacityCommand();
    });

    it("returns a friendly error when no location requested", async () => {
        const request = {};

        const response = await _sut.Execute(request, _logger).AsSlackResponse();

        expect(response.text).toBe("Sorry! You need to specify a location.");
    });
});