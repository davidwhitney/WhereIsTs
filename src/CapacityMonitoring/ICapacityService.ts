interface ICapacityService {
    NumberOfDesksOccupiedForLocation(location: LocationFromRequest): number;
    CheckIn(compoundKey: LocationFromRequest): void;
}