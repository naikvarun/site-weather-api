const weatherService = require('../service/weather');
const Boom = require('@hapi/boom');
const moment = require('moment');
const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));
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
        .required(),
    fromDate: Joi.date().format("YYYYMMDD")
});


function getHistoricalWeather(request) {
    const location = request.params.location;
    let split = location.split(LOCATION_SPLITTER);
    const latitude = Number(split[0]);
    const longitude = Number(split[1]);
    let queryDays = request.query.days ? request.query.days : APP.HISTORICAL_DAYS;
    const dateParameter = request.params.date;
    let validationObject = {latitude: latitude, longitude: longitude, fromDate: queryDays};
    if (dateParameter) {
        validationObject = {...validationObject, from: dateParameter}
    }
    const {error} = schema.validate(validationObject);

    if (error) {
        return Boom.badRequest(error.details[0].message);
    }

    let start = dateParameter ? moment(dateParameter, "YYYYMMDD", true) : moment().startOf('day');

    return weatherService.getHistoricalWeather(latitude, longitude, start, queryDays);
}

module.exports = [
    {method: 'GET', path: '/lookup/{location}/{date?}', handler: getHistoricalWeather}
];
