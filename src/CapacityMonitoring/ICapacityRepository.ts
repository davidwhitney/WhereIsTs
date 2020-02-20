export interface ICapacityRepository {
    Load(): Map<string, number>;
    Save(state: Map<string, number>): void;
}