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
const AppFactory_1 = require("./AppFactory");
exports.whereisCommand = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Incoming Request:");
        console.log(req.path);
        console.log(req.body);
        console.log(req.query);
        const slackRequest = req.body;
        let result = null;
        if (slackRequest.command === "/whereis") {
            result = yield AppFactory_1.whereis.execute(slackRequest);
        }
        else if (slackRequest.command === "/capacity") {
            result = yield AppFactory_1.capacity.execute(slackRequest);
        }
        else if (req.path.indexOf("/check-in") !== -1) {
            result = yield AppFactory_1.checkin.execute(req);
        }
        else if (req.path.indexOf("/map") !== -1) {
            const mapResult = yield AppFactory_1.map.execute(req);
            return imageFile(res, mapResult);
        }
        else if (req.path.indexOf("/heatmap") !== -1) {
            const mapResult = yield AppFactory_1.heatmap.execute(req);
            return imageFile(res, mapResult);
        }
        console.log(result);
        res.send(result);
    }
    catch (ex) {
        console.error(ex);
        res.status(500).send(ex);
    }
});
const imageFile = (res, fileResult) => {
    res.setHeader('Content-Type', fileResult.ContentType);
    res.send(fileResult.FileContents);
};
//# sourceMappingURL=index.js.map