import { ICapacityRepository } from "./ICapacityRepository";

export class InMemoryCapacityRepository implements ICapacityRepository {
    
    private _storage: Map<string, number>;

    constructor() {        
        this._storage = new Map<string, number>();
    }

    Load(): Map<string, number> {
        return this._storage;
    }

    Save(state: Map<string, number>): void {
        this._storage = state;
    }
    
}