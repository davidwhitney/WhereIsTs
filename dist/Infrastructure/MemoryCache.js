"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MemoryCache {
    constructor() {
        this._storage = {};
    }
    Count() {
        return Object.keys(this._storage).length;
    }
    GetOrCreate(key, create) {
        if (!this._storage.hasOwnProperty(key)) {
            this._storage[key] = create(key);
        }
        return this._storage[key];
    }
}
exports.MemoryCache = MemoryCache;
//# sourceMappingURL=MemoryCache.js.map