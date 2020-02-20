import { ICapacityService } from "./ICapacityService";
import { ICapacityRepository } from "./ICapacityRepository";

export class CapacityService implements ICapacityService {
    
    private readonly _repo: ICapacityRepository;

    constructor(capacityRepository: ICapacityRepository) {
        this._repo = capacityRepository;
    }

    NumberOfDesksOccupiedForLocation(location: string): number {
        var state = this._repo.Load();

        const valuesInThisRegion: number[] = [];
        const keysInThisRegion = Array.from(state.keys()).filter(x => x.toLowerCase().indexOf(location) == 0);
        keysInThisRegion.forEach(k => { valuesInThisRegion.push(<number>state.get(k)); });

        return valuesInThisRegion.reduce((total: number, next: number) => total + next, 0);
    }

    CheckIn(compoundKey: string): void {
        var state = this._repo.Load();    
       
        console.log(state);
        if (!state.has(compoundKey)) {
            state.set(compoundKey, 0);
        }

        state.set(compoundKey, <number>state.get(compoundKey) + 1);
        this._repo.Save(state);
    }
}