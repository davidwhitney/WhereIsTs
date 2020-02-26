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
const CheckInCommand_1 = require("./CheckInCommand");
const ExpectedRequests_1 = require("./TestHelpers/Fakes/ExpectedRequests");
const jest_each_1 = require("jest-each");
describe("CheckInCommandTests", () => {
    let _sut;
    let _capacityService;
    beforeEach(() => {
        _capacityService = {
            "Called": false,
            "CheckIn": function () { this.Called = true; }
        };
        _sut = new CheckInCommand_1.CheckInCommand(_capacityService);
    });
    jest_each_1.default([
        [""],
        [" "]
    ]).it("Run_NoLocationRequested_ReturnsBadRequest %s", (val) => __awaiter(void 0, void 0, void 0, function* () {
        const request = ExpectedRequests_1.ExpectedRequests.CheckInFor(val);
        const response = yield _sut.execute(request);
        expect(response.status).toBe(400);
    }));
    it("Run_KnownLocationRequested_ReturnsHintAsToAvailability", () => __awaiter(void 0, void 0, void 0, function* () {
        const request = ExpectedRequests_1.ExpectedRequests.CheckInFor("gracechurch::245-210");
        const response = yield _sut.execute(request);
        expect(response.status).toBe(200);
    }));
    it("Run_KnownLocationRequested_ThanksUserAtTheEnd", () => __awaiter(void 0, void 0, void 0, function* () {
        const request = ExpectedRequests_1.ExpectedRequests.CheckInFor("gracechurch::245-210");
        const response = yield _sut.execute(request);
        expect(response.message).toBe("Thanks for checking in!");
    }));
    it("Run_KnownLocationRequested_LogsCheckinRequest", () => __awaiter(void 0, void 0, void 0, function* () {
        const request = ExpectedRequests_1.ExpectedRequests.CheckInFor("gracechurch::245-210");
        yield _sut.execute(request);
        expect(_capacityService.Called).toBeTruthy();
    }));
});
//# sourceMappingURL=CheckInCommand.test.js.map