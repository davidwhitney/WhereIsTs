"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MemoryCache_1 = require("./MemoryCache");
describe("MemoryCache", () => {
    it("GetOrCreate calls the create function when key not found", () => {
        const memCache = new MemoryCache_1.MemoryCache();
        const returned = memCache.GetOrCreate("some-key", (key) => ({ value: 1234 + key }));
        expect(returned.value).toBe("1234some-key");
    });
    it("GetOrCreate doesn't recreate values when it already has one.", () => {
        let calledCount = 0;
        const createFunc = (key) => {
            calledCount++;
            return { value: 1234 + key };
        };
        const memCache = new MemoryCache_1.MemoryCache();
        memCache.GetOrCreate("some-key", createFunc);
        memCache.GetOrCreate("some-key", createFunc);
        expect(calledCount).toBe(1);
    });
});
//# sourceMappingURL=MemoryCache.test.js.map