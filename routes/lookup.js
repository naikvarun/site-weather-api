const weatherService = require('../service/weather');
const Boom = require('@hapi/boom');
const moment = require('moment');
const Joi = require('@hapi/joi');
const {APP} = require('../config/config');
const LOCATION_SPLITTER = ',';

const schema = Joi.object({
    latitude: Joi.number()
        .min(-90)
        .max(90)
        .required(),

    longitude: Joi.number()
        .min(-180)
        .max(180)
        .required(),

    days: Joi.number()
        .min(0)
        .max(APP.MAX_HISTORICAL_DAYS)
        .required()
});


function getHistoricalWeather(request) {
    const location = request.params.location;
    let split = location.split(LOCATION_SPLITTER);
    const latitude = Number(split[0]);
    const longitude = Number(split[1]);
    let queryDays = request.query.days ? request.query.days : APP.HISTORICAL_DAYS;
    const {error} = schema.validate({latitude: latitude, longitude: longitude, days: queryDays});

    if (error) {
        return Boom.badRequest(error.details[0].message);
    }
    const dateParameter = request.params.date;
    let start = moment().format('YYYY-MM-DD 00:00:00');

    // Check if passed date is valid
    if (dateParameter) {
        if (!moment(dateParameter, "YYYYMMDD", true).isValid()) {
            return Boom.badRequest('Invalid date format');
        } else {
            start = moment().startOf('day');
        }
    }
    return weatherService.getHistoricalWeather(latitude, longitude, start, queryDays);
}

module.exports = [
    {method: 'GET', path: '/lookup/{location}/{date?}', handler: getHistoricalWeather}
];
