export interface ICapacityRepository {
    Load(): Promise<Map<string, number>>;
    Save(state: Map<string, number>);
}
