import { Loc } from "./Location";

export class LocationCollection extends Array<Loc> {

    public SublocationsOf(name: string): Array<Loc> { 
        return this.filter(x => x.Name.indexOf(name + "::") > -1); 
    }

    public TotalCapacityOf(name: string): number {
        return this.SublocationsOf(name).reduce((x, y) => x + y.Capacity, 0);
    }

    public GetByKey(mapKey: string): Loc {
        return this.filter(x => this.KeyFor(x) == mapKey)[0];     
    }

    private KeyFor(x: Loc) { 
        return encodeURIComponent(x.Name.toLowerCase()); 
    }
}