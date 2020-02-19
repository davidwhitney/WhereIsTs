import { MemoryCache } from './MemoryCache';
describe("MemoryCache", () => {
    it("GetOrCreate calls the create function when key not found", () => {
        const memCache = new MemoryCache();
        
        const returned = memCache.GetOrCreate("some-key", (key) => ({ value: 1234 + key }));

        expect(returned.value).toBe("1234some-key");
    })

    it("GetOrCreate doesn't recreate values when it already has one.", () => {
        let calledCount = 0;
        const createFunc = (key: string) => {
            calledCount++;
            return { value: 1234 + key };
        };

        const memCache = new MemoryCache();
        memCache.GetOrCreate("some-key", createFunc);
        memCache.GetOrCreate("some-key", createFunc);

        expect(calledCount).toBe(1);
    })
});