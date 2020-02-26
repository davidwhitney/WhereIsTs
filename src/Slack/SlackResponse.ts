import { SlackAttachment } from './SlackAttachment';
import { Loc } from "../FindingPlaces/Location";

export class SlackResponse {
    public text: string;
    public attachments: Array<SlackAttachment> | null = new Array<SlackAttachment>();

    constructor(result: string, imageUrl: string | null = null, overloadedAttachmentText: string | null = null) {

        this.text = result;
        this.attachments = new Array<SlackAttachment>();
        this.attachments.push({
            text: overloadedAttachmentText || "Here's a heatmap of availability",
            image_url: imageUrl || ""
        });
    }

    public static forLocation(result: Loc, imageUrl: string): SlackResponse {
        return new SlackResponse(result.Name, imageUrl, `${result.Name} is marked on the map.`);
    }

    public static NotFound(): SlackResponse { return { text: "Sorry! We can't find that place either.", attachments: null }; }
    public static NoLocationProvided(): SlackResponse { return  new SlackResponse("Sorry! You need to specify a location."); }
}