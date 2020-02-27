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
const storage_1 = require("@google-cloud/storage");
const fs = require("fs");
class GcpCapacityRepository {
    constructor(config) {
        this._config = config;
        this._storage = new storage_1.Storage();
    }
    getFileName() {
        return "temp.json"; // utcnow
    }
    Load() {
        return __awaiter(this, void 0, void 0, function* () {
            const path = yield this.downloadFile();
            let contents = fs.readFileSync(path, { encoding: "utf8" });
            if (contents === "") {
                this.Save(new Map());
                contents = fs.readFileSync(path, { encoding: "utf8" });
            }
            console.log(contents);
            return JSON.parse(contents);
        });
    }
    Save(state) {
        return __awaiter(this, void 0, void 0, function* () {
            const asString = JSON.stringify(state);
        });
    }
    downloadFile() {
        return __awaiter(this, void 0, void 0, function* () {
            const tmpPath = "./tmp/" + this.getFileName();
            yield this._storage.bucket(this._config.BlobCredentials).file(this.getFileName()).download({ destination: tmpPath });
            return tmpPath;
        });
    }
    uploadFile() {
        return __awaiter(this, void 0, void 0, function* () {
            const tmpPath = "./tmp/" + this.getFileName();
            const bucket = yield this._storage.bucket(this._config.BlobCredentials);
            const result = yield bucket.upload(tmpPath, {
                gzip: true,
                metadata: { cacheControl: 'no-cache' }
            });
        });
    }
}
exports.GcpCapacityRepository = GcpCapacityRepository;
//# sourceMappingURL=GcpCapacityRepository.js.map