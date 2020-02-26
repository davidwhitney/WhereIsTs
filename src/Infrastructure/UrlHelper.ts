import { Configuration } from "./Configuration";
import { IUrlHelper } from "./IUrlHelper";

export class UrlHelper implements IUrlHelper {
    private _config: Configuration;

    constructor(config: Configuration) {
        if (!config) { 
            throw "Expected an instance of Configuration to be injected by the runtime.";
        }
        this._config = config; 
    }

    public ImageFor(locationKey: string): string {        
        return `${this._config.UrlRoot}/Map?code=${this._config.ApiKey}&key=${encodeURI(locationKey)}`;
    }

    public CapacityImageFor(locationKey: string): string {
        const utcNow = Math.floor((new Date()).getTime() / 1000);
        return `${this._config.UrlRoot}/HeatMap?code=${this._config.CapacityApiKey}&key=${encodeURI(locationKey)}&ticks=${utcNow}`;
    }
}