"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UrlHelper {
    constructor(config) {
        if (!config) {
            throw "Expected an instance of Configuration to be injected by the runtime.";
        }
        this._config = config;
    }
    ImageFor(locationKey) {
        return `${this._config.UrlRoot}/map?key=${encodeURI(locationKey)}`;
    }
    CapacityImageFor(locationKey) {
        const utcNow = Math.floor((new Date()).getTime() / 1000);
        return `${this._config.UrlRoot}/heatmap?key=${encodeURI(locationKey)}&ticks=${utcNow}`;
    }
}
exports.UrlHelper = UrlHelper;
//# sourceMappingURL=UrlHelper.js.map