const weatherService = require('../service/weather');
const Boom = require('@hapi/boom');
const moment = require('moment');

const LOCATION_SPLITTER = ',';
const HISTORICAL_DAYS = 7;

function getHistoricalWeather(request ) {
    const location = request.params.location;
    let split = location.split(LOCATION_SPLITTER);
    const latitude = Number(split[0]);
    const longitude = Number(split[1]);
    const dateParameter = request.params.date;
    let start = moment().format('YYYY-MM-DD 00:00:00');
    if (dateParameter) {
        if (! moment(dateParameter, "YYYYMMDD", true).isValid()) {
            return Boom.badRequest('Invalid date format');
        } else {
            start =  moment().startOf('day');
        }
    }
    //TODO: verify days is number and less than max limit
    const historicalDays = request.query.days ? request.query.days  : HISTORICAL_DAYS;
    return weatherService.getHistoricalWeather(latitude, longitude, start, historicalDays);
}

module.exports = [
    {method: 'GET', path: '/lookup/{location}/{date?}', handler: getHistoricalWeather}
];
