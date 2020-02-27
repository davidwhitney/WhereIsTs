import { ICapacityRepository } from "./ICapacityRepository";

export class InMemoryCapacityRepository implements ICapacityRepository {
    
    private _storage: Map<string, number>;

    constructor() {        
        this._storage = new Map<string, number>();
    }

    async Load(): Promise<Map<string, number>> {
        return this._storage;
    }

    async Save(state: Map<string, number>): Promise<void> {
        this._storage = state;
    }
    
}