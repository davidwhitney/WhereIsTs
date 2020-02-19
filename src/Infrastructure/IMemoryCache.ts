export interface IMemoryCache {
    Count(): number;
    GetOrCreate(key: string, create: CallableFunction);
}

