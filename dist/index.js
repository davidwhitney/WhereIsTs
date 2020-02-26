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
const Dependencies_1 = require("./Dependencies");
const WhereIsCommand_1 = require("./WhereIsCommand");
exports.whereIsCommand = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const command = new WhereIsCommand_1.WhereIsCommand(Dependencies_1.locationFinder, Dependencies_1.urlHelper);
    const result = yield command.execute(req);
    res.status(200).send(result);
});
//# sourceMappingURL=index.js.map