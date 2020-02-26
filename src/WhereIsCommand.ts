import { SlackResponse } from "./Slack/SlackResponse";
import url = require("url");
import { SlackRequest } from "./Slack/SlackRequest";
import { IUrlHelper } from "./Infrastructure/IUrlHelper";
import { ILocationFinder } from "./FindingPlaces/ILocationFinder";
import { Loc } from "./FindingPlaces/Location";

export class WhereIsCommand {
    private readonly _finder: ILocationFinder;
    private readonly _urlHelper: IUrlHelper;

    public constructor(finder: ILocationFinder, urlHelper: IUrlHelper) {
        this._finder = finder;
        this._urlHelper = urlHelper;
    }

    //[FunctionName("WhereIs")]
    async execute(req) {
        try {
            console.log(req.body);
            const request = url.parse("http://tempuri.org/?" + req.body, true).query as any as SlackRequest;
            const result = this._finder.Find(request.text);
            if (result == null || result == Loc.NotFound) {
                return SlackResponse.NotFound();
            }

            const imageUrl = this._urlHelper.ImageFor(result.Key());
            return SlackResponse.forLocation(result, imageUrl);
        } catch (ex) {
            console.log(ex);
            throw ex;
        }
    }
}