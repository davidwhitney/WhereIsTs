"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SlackResponse {
    constructor(result, imageUrl = null, overloadedAttachmentText = null) {
        this.attachments = new Array();
        this.text = result;
        this.attachments = new Array();
        this.attachments.push({
            text: overloadedAttachmentText || "Here's a heatmap of availability",
            image_url: imageUrl || ""
        });
    }
    static forLocation(result, imageUrl) {
        return new SlackResponse(result.Name, imageUrl, `${result.Name} is marked on the map.`);
    }
    static NotFound() { return { text: "Sorry! We can't find that place either.", attachments: null }; }
    static NoLocationProvided() { return new SlackResponse("Sorry! You need to specify a location."); }
}
exports.SlackResponse = SlackResponse;
//# sourceMappingURL=SlackResponse.js.map