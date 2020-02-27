"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InMemoryCapacityRepository {
    constructor() {
        this._storage = new Map();
    }
    Load() {
        return this._storage;
    }
    Save(state) {
        this._storage = state;
    }
}
exports.InMemoryCapacityRepository = InMemoryCapacityRepository;
//# sourceMappingURL=InMemoryCapacityRepository.js.map