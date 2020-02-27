import { GcpCapacityRepository } from './GcpCapacityRepository';
import { Configuration } from '../Infrastructure/Configuration';

describe("GCP storage", () => {
    it("is", async () => {
        const config = {
            BlobCredentials: "whereisgcptest"
        } as Configuration as any;
        const sut = new GcpCapacityRepository(config);

        await sut.Load();
    });
});