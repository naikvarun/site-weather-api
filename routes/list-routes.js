const weatherService = require('../service/weather');

function getLookupList(request) {

    return weatherService.getWeatherLookup();
}

module.exports = [
    {method: 'GET', path: '/list', handler: getLookupList}
];
