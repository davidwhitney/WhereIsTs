"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ExpectedRequests {
    static CapacityFor(text, command = "/capacity") {
        return {
            token: 'srVq4wcsocNXfTGeUzV0MjPE',
            team_id: 'TEM9Z8ZU6',
            team_domain: 'electric-head',
            channel_id: 'CEKQK997V',
            channel_name: 'general',
            user_id: 'UELV368CX',
            user_name: 'david',
            command: '/capacity',
            text: text,
            response_url: 'https://hooks.slack.com/commands/TEM9Z8ZU6/961832061745/EWXBp0BthzKc7jeUm2U8DiNX'
        };
    }
    static CheckInFor(location) {
        return { Query: `location=${location}` };
    }
    static MapRequestForKey(key) {
        return { query: { raw: `key=${key}`, key: key } };
    }
    static WhereIsFor(text, command = "/whereis") {
        return {
            token: 'Opl3njavAKDxHGtmYjT8N9r7',
            team_id: 'TEM9Z8ZU6',
            team_domain: 'electric-head',
            channel_id: 'CEKQK997V',
            channel_name: 'general',
            user_id: 'UELV368CX',
            user_name: 'david',
            command: command,
            text: text,
            response_url: 'https://hooks.slack.com/commands/TEM9Z8ZU6/971132768964/LVz2HXEFDOu9Y5S8SR47OgoG',
            trigger_id: '973448460599.497339305958.98ea927296b6a810f2c29b2495d1832a'
        };
    }
}
exports.ExpectedRequests = ExpectedRequests;
//# sourceMappingURL=ExpectedRequests.js.map