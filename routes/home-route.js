const {APP} = require('../config/config');

function getDocumentation() {
    return {
        "api": [{
            "path": '/lookup/[location]/(time)?days=(days)',
            "description": "Lookup historical information for [location]",
            "method": "GET",
            parameters: [
                {
                    "name": "location",
                    "description": "Comma separated latitude and longitude",
                    "required": true,
                    "type": "path"
                },
                {
                    "name": "time",
                    "description": "YYYYMMDD formatted date from which past weather information to be looked up, default to current",
                    "required": false,
                    "type": "path"
                },
                {
                    "name": "days",
                    "description": "number of historical days for which lookup is done. Limited to max days (currently " + APP.MAX_HISTORICAL_DAYS + " ). Defaults to " + APP.HISTORICAL_DAYS + " days.",
                    "required": false,
                    "type": "query"
                }
            ],
            "examples": [
                "/lookup/41.911515,-87.65982",
                "/lookup/41.911515,-87.65982?days=5",
                "/lookup/41.911515,-87.65982/20191225",
                "/lookup/41.911515,-87.65982/20191225?days=3",
            ]
        }, {
            "path": '/list',
            "description": "List all the lookups done",
            "method": "GET",
            parameters: [],
            "return": {
                "object": "Array of all the lookups performed"
            }
        }, {
            "path": '/status',
            "description": "Get the status message",
            "method": "GET",
            parameters: [],
            "return": {
                "object": "{ \"message\" : \"ok\" }"
            }
        }]
    }
}

module.exports = [{
    method: 'GET',
    path: '/',
    handler: getDocumentation
}];
