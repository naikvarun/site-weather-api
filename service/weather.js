'use strict';
const darkSky = require('../external/dark_sky');
const moment = require('moment');

module.exports = {
    /**
     * Get the historical data for a location identified by latitude and longitude for past 'days'
     * @param latitude of the location
     * @param longitude of the location
     * @param from this date
     * @param days of historical data to be pulled
     * @returns {Promise<{data: [], requestedTime: Date, latitude: *, longitude: *}>}
     */
    getHistoricalWeather: async (latitude, longitude, from, days) => {
        const weatherData = [];
        for (let i = 0; i < days; i++) {
            const weather = await darkSky.getWeather(latitude, longitude, moment(from).add({days: (i*-1)}).unix() );
            weatherData.push({...weather.data});
        }
        return {
            "latitude": latitude,
            "longitude": longitude,
            "requestedTime": new Date(),
            data: weatherData
        }
    }
};
