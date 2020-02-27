import { ICapacityRepository } from "./ICapacityRepository";
import { Storage } from "@google-cloud/storage";
import { Configuration } from '../Infrastructure/Configuration';
import fs = require("fs");

export class GcpCapacityRepository implements ICapacityRepository {
    
    _config: Configuration;
    _storage: Storage;

    constructor(config: Configuration) {
        this._config = config;
        this._storage = new Storage();
    }

    getFileName(): string {
        return "temp.json"; // utcnow
    }

    async Load(): Promise<Map<string, number>> {
        const path = await this.downloadFile();
        let contents = fs.readFileSync(path, { encoding:  "utf8" });
        if(contents === "") {
            this.Save(new Map<string, number>())
            contents = fs.readFileSync(path, { encoding:  "utf8" });
        }

        console.log(contents);
        return JSON.parse(contents) as Map<string, number>;
    }

    async Save(state: Map<string, number>): Promise<void> {
        const asString = JSON.stringify(state);
    }

    async downloadFile() {
        const tmpPath = "./tmp/" + this.getFileName();
        await this._storage.bucket(this._config.BlobCredentials).file(this.getFileName()).download({destination: tmpPath });
        return tmpPath;
    } 

    async uploadFile() {
        const tmpPath = "./tmp/" + this.getFileName();
        
        const bucket = await this._storage.bucket(this._config.BlobCredentials);
        const result = await bucket.upload(tmpPath, {
            gzip: true,
            metadata: { cacheControl: 'no-cache'}
        });
    }
    
}

