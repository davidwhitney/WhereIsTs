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
        this.overriddenStorageFileName = "";
    }
    Load() {
        return __awaiter(this, void 0, void 0, function* () {
            const bucket = yield this._storage.bucket(this._config.BlobCredentials);
            const file = yield bucket.file(this.getFileName());
            const exists = (yield file.exists())[0];
            if (!exists) {
                this.Save(new Map());
            }
            const response = yield file.download();
            const contents = response[0].toString();
            return new Map(JSON.parse(contents));
        });
    }
    Save(state) {
        return __awaiter(this, void 0, void 0, function* () {
            const asString = JSON.stringify(Array.from(state.entries()));
            ;
            yield this.upload(asString);
        });
    }
    getFileName() {
        if (this.overriddenStorageFileName != "") {
            return this.overriddenStorageFileName;
        }
        return new Date().toISOString().split("T")[0] + ".json";
    }
    upload(contents) {
        return __awaiter(this, void 0, void 0, function* () {
            const tmpPath = "./tmp/" + this.getFileName();
            fs.writeFileSync(tmpPath, contents);
            const bucket = yield this._storage.bucket(this._config.BlobCredentials);
            yield bucket.upload(tmpPath, {
                gzip: true,
                metadata: {
                    destination: this.getFileName(),
                    cacheControl: 'no-cache',
                }
            });
        });
    }
}
exports.GcpCapacityRepository = GcpCapacityRepository;
//# sourceMappingURL=GcpCapacityRepository.js.map