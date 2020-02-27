export interface ICapacityService {
    NumberOfDesksOccupiedForLocation(location: string): Promise<number>;
    CheckIn(compoundKey: string): Promise<void>;
}