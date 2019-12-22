const weatherService = require('../service/weather');

const LOCATION_SPLITTER = ',';
const HISTORICAL_DAYS = 7;


function getToday() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
}


function getHistoricalWeather(request ) {
    const location = request.params.location;
    let split = location.split(LOCATION_SPLITTER);
    const latitude = Number(split[0]);
    const longitude = Number(split[1]);
    return weatherService.getHistoricalWeather(latitude, longitude, getToday(), HISTORICAL_DAYS);
}

module.exports = [
    {method: 'GET', path: '/lookup/{location}', handler: getHistoricalWeather}
];
