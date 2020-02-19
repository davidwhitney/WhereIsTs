import { IMemoryCache } from "./IMemoryCache";

export class MemoryCache implements IMemoryCache {
    private _storage: {};

    constructor() {
        this._storage = {};
    }

    Count(): number {
        return Object.keys(this._storage).length;
    }

    GetOrCreate(key: string, create: { (x: string): any} ): any {
        if (!this._storage.hasOwnProperty(key)){
            this._storage[key] = create(key);
        }        
        return this._storage[key];
    }
}
