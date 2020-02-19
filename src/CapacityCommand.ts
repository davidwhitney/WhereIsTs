class CapacityCommand {
    
    private readonly _locations: LocationCollection;
    private readonly _urlHelper: IUrlHelper;
    private readonly _capacityService: ICapacityService;

    constructor(locations: LocationCollection, urlHelper: IUrlHelper, capacityService: ICapacityService) {
        this._locations = locations;
        this._urlHelper = urlHelper;
        this._capacityService = capacityService;
    }

    // Functions SDK method sig garbage goes here
    async execute(req, log) {
        try {
            var request = await req.ReadSlackRequest();
            if (request.Text.trim() === "") {
                return SlackResponse.NoLocationProvided().AsJson();
            }

            var location = new LocationFromRequest(request.Text);

            var totalAvailableSeats = _locations.TotalCapacityOf(location);
            var filledSeats = _capacityService.NumberOfDesksOccupiedForLocation(location);

            var result = $"There are {filledSeats} of {totalAvailableSeats} desks used in {request.Text}.";
            var imageUrl = _urlHelper.CapacityImageFor(location);
            return new SlackResponse(result, imageUrl).AsJson();
        }
        catch (ex) {
            log.LogError(ex.ToString());
            throw ex;
        }
    }

/*
        [FunctionName("Capacity")]
        public async Task<IActionResult> Execute([HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)]
            HttpRequest req,
            ILogger log)
        {
            try
            {
                var request = await req.ReadSlackRequest();
                if (string.IsNullOrWhiteSpace(request.Text))
                {
                    return SlackResponse.NoLocationProvided().AsJson();
                }

                var location = new LocationFromRequest(request.Text);

                var totalAvailableSeats = _locations.TotalCapacityOf(location);
                var filledSeats = _capacityService.NumberOfDesksOccupiedForLocation(location);

                var result = $"There are {filledSeats} of {totalAvailableSeats} desks used in {request.Text}.";
                var imageUrl = _urlHelper.CapacityImageFor(location);
                return new SlackResponse(result, imageUrl).AsJson();
            }
            catch (Exception ex)
            {
                log.LogError(ex.ToString());
                throw;
            }
        }*/
}