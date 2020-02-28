import { ICapacityRepository } from "./ICapacityRepository";
import { Storage } from "@google-cloud/storage";
import { Configuration } from '../Infrastructure/Configuration';
import fs = require("fs");

export class GcpCapacityRepository implements ICapacityRepository {
    
    private readonly _config: Configuration;
    private readonly _storage: Storage;
    public overriddenStorageFileName: string;

    constructor(config: Configuration) {
        this._config = config;
        this._storage = new Storage();
        this.overriddenStorageFileName = "";
    }

    public async Load(): Promise<Map<string, number>> {
        const bucket = await this._storage.bucket(this._config.BlobCredentials);
        const file = await bucket.file(this.getFileName());
        const exists = (await file.exists())[0];
        if (!exists) {
            this.Save(new Map<string, number>());
        }

        const response = await file.download();
        const contents = response[0].toString();
        return new Map<string, number>(JSON.parse(contents));
    }

    public async Save(state: Map<string, number>) {
        const asString = JSON.stringify(Array.from(state.entries()));;
        await this.upload(asString);
    }

    public getFileName(): string {
        if(this.overriddenStorageFileName != "") {
            return this.overriddenStorageFileName;
        }
        return new Date().toISOString().split("T")[0] + ".json";
    }

    private async upload(contents: string) {
        const tmpPath = "./tmp/" + this.getFileName();
        fs.writeFileSync(tmpPath, contents);
        const bucket = await this._storage.bucket(this._config.BlobCredentials);
        await bucket.upload(tmpPath, {
            gzip: true,
            metadata: {
                destination: this.getFileName(),
                cacheControl: 'no-cache',
            }
        });
    }
}

