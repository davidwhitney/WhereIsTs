import { LocationFromRequest } from '../Infrastructure/LocationFromRequest';

export interface ICapacityService {
    NumberOfDesksOccupiedForLocation(location: LocationFromRequest): number;
    CheckIn(compoundKey: LocationFromRequest): void;
}