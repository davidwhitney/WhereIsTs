export class Hotness {
    _values = {};
    
    public constructor() {
        this._values[17] = "#90EE90";
        this._values[34] = "#008000";
        this._values[50] = "#FFFF00";
        this._values[67] = "#FFA500";
        this._values[100] = "#FFFFFF";
    }

    public Rank(percentageUsed: number): any {
        return percentageUsed >= 100
            ? "#FFFFFF"
            : Object.getOwnPropertyNames(this._values).filter(x => percentageUsed <= parseInt(x))[0];
    }
}