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
const SlackResponse_1 = require("./Slack/SlackResponse");
const Location_1 = require("./FindingPlaces/Location");
class WhereIsCommand {
    constructor(finder, urlHelper) {
        this._finder = finder;
        this._urlHelper = urlHelper;
    }
    execute(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = this._finder.Find(request.text);
            if (result == null || result == Location_1.Loc.NotFound) {
                return SlackResponse_1.SlackResponse.NotFound();
            }
            const imageUrl = this._urlHelper.ImageFor(result.RawKey());
            return SlackResponse_1.SlackResponse.forLocation(result, imageUrl);
        });
    }
}
exports.WhereIsCommand = WhereIsCommand;
//# sourceMappingURL=WhereIsCommand.js.map