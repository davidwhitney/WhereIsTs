export class ExpectedRequests {
    
    public static CapacityFor(text: string, command: string = "/capacity"): any {      
        var encodedText = encodeURI(text);
        var encodedCommand = encodeURI(command).replace("%2f", "/"); // Slack is weird.
        var body = `token=gIkuvaNzQIHg97ATvDxqgjtO&channel_name=test&command=${encodedCommand}&text=${encodedText}`;
        return { body: body }      
    }

    public static CheckInFor(location: string): any {
        return { Query: `location=${location}` };
    }
    
    public static MapRequestForKey(key: string): any {
        return { Query: `code=someApiKey&key=${key}` };
    }

    public static WhereIsFor(text: string | null, command: string = "/whereis"): any {
        var encodedText = encodeURI(text || "");
        var encodedCommand = encodeURI(command).replace("%2f", "/"); // Slack is weird.
        var body = `token=gIkuvaNzQIHg97ATvDxqgjtO&channel_name=test&command=${encodedCommand}&text=${encodedText}`;
        return { body: body }
    }
}