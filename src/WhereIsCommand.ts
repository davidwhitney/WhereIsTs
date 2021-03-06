import { SlackResponse } from "./Slack/SlackResponse";
import { SlackRequest } from "./Slack/SlackRequest";
import { IUrlHelper } from "./Infrastructure/IUrlHelper";
import { ILocationFinder } from "./FindingPlaces/ILocationFinder";
import { Loc } from "./FindingPlaces/Location";
import url = require("url");

export class WhereIsCommand {
    private readonly _finder: ILocationFinder;
    private readonly _urlHelper: IUrlHelper;

    public constructor(finder: ILocationFinder, urlHelper: IUrlHelper) {
        this._finder = finder;
        this._urlHelper = urlHelper;
    }

    async execute(request: SlackRequest) {
        const result = this._finder.Find(request.text);
        if (result == null || result == Loc.NotFound) {
            return SlackResponse.NotFound();
        }

        const imageUrl = this._urlHelper.ImageFor(result.RawKey());
        return SlackResponse.forLocation(result, imageUrl);
    }
}