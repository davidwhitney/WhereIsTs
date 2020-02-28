import { GcpCapacityRepository } from './GcpCapacityRepository';
import { Configuration } from '../Infrastructure/Configuration';

describe("GCP storage", () => {

    let _sut;

    beforeEach(() => {
        const config = {
            BlobCredentials: "whereisgcptest"
        } as Configuration as any;
        _sut = new GcpCapacityRepository(config);
    });

    it("can calculate a tempfile name based on the date", () => {
        const databasedFilename = _sut.getFileName();

        const now = new Date().toISOString().split("T")[0];
        expect(databasedFilename).toContain(now);
    });

    it("can save it's state", async ()=> {
        _sut.overriddenStorageFileName = "unittestfile.json";

        const map = await _sut.Load();
        map.set("testKey", 1000);

        await _sut.Save(map);
        const reloaded = await _sut.Load();

        expect(reloaded.get("testKey")).toBe(1000);
    });

    it("is", async () => {
        const config = {
            BlobCredentials: "whereisgcptest"
        } as Configuration as any;
        const sut = new GcpCapacityRepository(config);

        await sut.Load();
    });
});
