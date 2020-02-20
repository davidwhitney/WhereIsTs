import { ICapacityRepository } from "./ICapacityRepository";

export class GcpCapacityRepository implements ICapacityRepository {

    // Implement GCP blob storage here.

    Load(): Map<string, number> {
        throw new Error("Method not implemented.");
    }

    Save(state: Map<string, number>): void {
        throw new Error("Method not implemented.");
    }
}