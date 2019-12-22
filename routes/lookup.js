const weatherService = require('../service/weather');
const Boom = require('@hapi/boom');
const moment = require('moment');
const {APP} = require('../config/config');
const LOCATION_SPLITTER = ',';

function getHistoricalWeather(request ) {
    const location = request.params.location;
    let split = location.split(LOCATION_SPLITTER);
    const latitude = Number(split[0]);
    const longitude = Number(split[1]);
    const dateParameter = request.params.date;
    let start = moment().format('YYYY-MM-DD 00:00:00');

    // Check if passed date is valid
    if (dateParameter) {
        if (! moment(dateParameter, "YYYYMMDD", true).isValid()) {
            return Boom.badRequest('Invalid date format');
        } else {
            start =  moment().startOf('day');
        }
    }

    // Validate days requested
    let queryDays = request.query.days ? request.query.days : APP.HISTORICAL_DAYS;
    if (isNaN(queryDays)) {
        return Boom.badRequest('Invalid days requested');
    }
    if (queryDays > APP.MAX_HISTORICAL_DAYS) {
        return Boom.badRequest(`Query days requested than ${APP.MAX_HISTORICAL_DAYS} days.`)
    }



    return weatherService.getHistoricalWeather(latitude, longitude, start, queryDays);
}

module.exports = [
    {method: 'GET', path: '/lookup/{location}/{date?}', handler: getHistoricalWeather}
];
