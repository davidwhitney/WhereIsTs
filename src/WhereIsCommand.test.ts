import { WhereIsCommand } from './WhereIsCommand';
import { LocationCollection } from './FindingPlaces/LocationCollection';
import { Loc } from './FindingPlaces/Location';
import { Configuration } from './Infrastructure/Configuration';
import { IUrlHelper } from './Infrastructure/IUrlHelper';
import { UrlHelper } from './Infrastructure/UrlHelper';
import { LocationFinder } from './FindingPlaces/LocationFinder';
import { ExpectedRequests } from './TestHelpers/Fakes/ExpectedRequests';

describe("WhereIsCommand tests", () => {
    let _sut: WhereIsCommand;
    let _knownLocations: LocationCollection;

    beforeEach(() => {
        _knownLocations = new LocationCollection(
            new Loc("Foo"),
            new Loc("Bar"),
            new Loc("Baz")
        );

        const configuration: Configuration = { 
            UrlRoot: "https://localhost/api", 
            ApiKey: "key123", 
            CapacityApiKey: "", 
            BlobCredentials: "",
            MapPath: ""
        }; // MAKE THIS SMALLER.

        const urlHelper: IUrlHelper = new UrlHelper(configuration);
        const locFinder: LocationFinder = new LocationFinder(_knownLocations);
        _sut = new WhereIsCommand(locFinder, urlHelper);
    });

    it("Run_NoValidDetailsFound_ReturnsFriendlyError", async () => {
        const request = ExpectedRequests.WhereIsFor(null);
        const response = await _sut.execute(request);
        expect(response.text).toBe("Sorry! We can't find that place either.");
    });
    
    it("Run_KnownLocation_ReturnsLocation", async () => {
        const request = { 
            token: 'Opl3njavAKDxHGtmYjT8N9r7', 
            team_id: 'TEM9Z8ZU6', 
            team_domain: 'electric-head', 
            channel_id: 'CEKQK997V',
            channel_name: 'general', 
            user_id: 'UELV368CX', 
            user_name: 'david', 
            command: '/whereis', 
            text: 'Foo', 
            response_url: 'https://hooks.slack.com/commands/TEM9Z8ZU6/971132768964/LVz2HXEFDOu9Y5S8SR47OgoG', 
            trigger_id: '973448460599.497339305958.98ea927296b6a810f2c29b2495d1832a' 
        };

        const response = await _sut.execute(request);
        expect(response.text).toBe("Foo");
    });

    it("Run_KnownLocation_ReturnsLocationMap", async () => {
        const response = await _sut.execute(requestForFoo);
        const attachments = response.attachments || [];

        expect(attachments[0].image_url).toBe("https://localhost/api/map?key=foo");
    });

    it("Run_KnownLocation_LocationMapHasCaption", async () => {
        const response = await _sut.execute(requestForFoo);
        const attachments = response.attachments || [];
        
        expect(attachments[0].text).toBe("Foo is marked on the map.");
    });

    it("Run_MisspeltLocation_ReturnsLocation", async () => {
        const response = await _sut.execute(requestForFop);
        expect(response.text).toBe("Foo");
    });
});


const requestForFoo = { 
    token: 'Opl3njavAKDxHGtmYjT8N9r7', 
    team_id: 'TEM9Z8ZU6', 
    team_domain: 'electric-head', 
    channel_id: 'CEKQK997V',
    channel_name: 'general', 
    user_id: 'UELV368CX', 
    user_name: 'david', 
    command: '/whereis', 
    text: 'Foo', 
    response_url: 'https://hooks.slack.com/commands/TEM9Z8ZU6/971132768964/LVz2HXEFDOu9Y5S8SR47OgoG', 
    trigger_id: '973448460599.497339305958.98ea927296b6a810f2c29b2495d1832a' 
};

const requestForFop = { 
    token: 'Opl3njavAKDxHGtmYjT8N9r7', 
    team_id: 'TEM9Z8ZU6', 
    team_domain: 'electric-head', 
    channel_id: 'CEKQK997V',
    channel_name: 'general', 
    user_id: 'UELV368CX', 
    user_name: 'david', 
    command: '/whereis', 
    text: 'Fop', 
    response_url: 'https://hooks.slack.com/commands/TEM9Z8ZU6/971132768964/LVz2HXEFDOu9Y5S8SR47OgoG', 
    trigger_id: '973448460599.497339305958.98ea927296b6a810f2c29b2495d1832a' 
};