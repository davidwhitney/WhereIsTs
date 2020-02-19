export interface Configuration {
    UrlRoot: string;
    ApiKey: string;
    CapacityApiKey: string;
    Root: string = "Environment.CurrentDirectory"; // WIP
    BlobCredentials: string;
    MapPath: string = "Root" + "/" + "App_Data" + "/" + "Maps"; // Make this real.
}