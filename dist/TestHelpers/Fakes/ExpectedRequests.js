"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ExpectedRequests {
    static CapacityFor(text, command = "/capacity") {
        var encodedText = encodeURI(text);
        var encodedCommand = encodeURI(command).replace("%2f", "/"); // Slack is weird.
        var body = `token=gIkuvaNzQIHg97ATvDxqgjtO&channel_name=test&command=${encodedCommand}&text=${encodedText}`;
        return { body: body };
    }
    static CheckInFor(location) {
        return { Query: `location=${location}` };
    }
    static MapRequestForKey(key) {
        return { Query: `code=someApiKey&key=${key}` };
    }
    static WhereIsFor(text, command = "/whereis") {
        var encodedText = encodeURI(text || "");
        var encodedCommand = encodeURI(command).replace("%2f", "/"); // Slack is weird.
        var body = `token=gIkuvaNzQIHg97ATvDxqgjtO&channel_name=test&command=${encodedCommand}&text=${encodedText}`;
        return { body: body };
    }
}
exports.ExpectedRequests = ExpectedRequests;
//# sourceMappingURL=ExpectedRequests.js.map