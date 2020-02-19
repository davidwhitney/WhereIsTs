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
            Root: "", 
            MapPath: ""
        }; // MAKE THIS SMALLER.

        const urlHelper: IUrlHelper = new UrlHelper(configuration);
        const locFinder: LocationFinder = new LocationFinder(_knownLocations);
        _sut = new WhereIsCommand(locFinder, urlHelper);
    });

    it("Run_NoValidDetailsFound_ReturnsFriendlyError", async () => {
        var request = ExpectedRequests.WhereIsFor(null);

        var response = await _sut.execute(request);

        expect(response.text).toBe("Sorry! We can't find that place either.");
    });

});

/*       

        [Test]
        public async Task Run_KnownLocation_ReturnsLocation()
        {
            var request = ExpectedRequests.WhereIsFor("Foo");

            var response = await _sut.Execute(request, _logger).AsSlackResponse();

            Assert.That(response.text, Is.EqualTo("Foo"));
        }

        [Test]
        public async Task Run_KnownLocation_ReturnsLocationMap()
        {
            var request = ExpectedRequests.WhereIsFor("Foo");

            var response = await _sut.Execute(request, _logger).AsSlackResponse();

            Assert.That(response.attachments[0].image_url, Is.EqualTo("https://localhost/api/Map?code=key123&key=foo"));
        }

        [Test]
        public async Task Run_KnownLocation_LocationMapHasCaption()
        {
            var request = ExpectedRequests.WhereIsFor("Foo");

            var response = await _sut.Execute(request, _logger).AsSlackResponse();

            Assert.That(response.attachments[0].text, Is.EqualTo("Foo is marked on the map."));
        }

        [Test]
        public async Task Run_MisspeltLocation_ReturnsLocation()
        {
            var request = ExpectedRequests.WhereIsFor("Fop");

            var response = await _sut.Execute(request, _logger).AsSlackResponse();

            Assert.That(response.text, Is.EqualTo("Foo"));
        }

        [Test]
        public void Run_ErrorIsThrown_LogsAndRethrows()
        {
            Assert.ThrowsAsync<NullReferenceException>(async () => await _sut.Execute(null, _logger));

            Assert.That(_logger.Entries.Count, Is.EqualTo(1));
        }

        */