import { LocationFromRequest } from '../Infrastructure/LocationFromRequest';

export interface ICapacityService {
    NumberOfDesksOccupiedForLocation(location: string): number;
    CheckIn(compoundKey: string): void;
}