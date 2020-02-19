import { Configuration } from "./Configuration";

export class UrlHelper implements IUrlHelper {
    private _config: Configuration;

    constructor(config: Configuration) {
        if (!config) { 
            throw "Expected an instance of Configuration to be injected by the runtime.";
        }
        this._config = config; 
    }

    public ImageFor(locationKey: string): string {        
        // Port urlencode + datetime.now();
        return `${this._config.UrlRoot}/Map?code=${this._config.ApiKey}&key={HttpUtility.UrlEncode(locationKey)}`;
    }

    public CapacityImageFor(locationKey: string): string {
        // Port urlencode + datetime.now();
        return `${this._config.UrlRoot}/HeatMap?code=${this._config.CapacityApiKey}&key={HttpUtility.UrlEncode(locationKey)}&ticks={DateTime.UtcNow.Ticks}`;
    }
}