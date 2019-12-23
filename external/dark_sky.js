const wrek = require('@hapi/wreck');
const {DARK_SKY} = require('../config/config');

const DARK_SKY_URL = `${DARK_SKY.BASE_URL}/${DARK_SKY.KEY}`;

function getDarkSkyURI(latitude, longitude, time) {
    return `${DARK_SKY_URL}/${latitude},${longitude},${time}?${DARK_SKY.EXCLUDE}`
}

module.exports = {
    /***
     * Fetches the weather information from DarkSky API
     * @param latitude
     * @param longitude
     * @param time - epoch time
     * @returns {Promise<{data: {temperatureHigh: any, temperatureLow: any, precipType: any, precipAccumulation: any, humidity: any, time: ((label?: string) => void) | number}, latitude: number, time: *, longitude: number}>}
     */
    getWeather: async (latitude, longitude, time) => {
        const {payload} = await wrek.get(getDarkSkyURI(latitude, longitude, time), {json: true});
        const weatherData = payload.daily.data[0];
        return {
            "latitude": payload.latitude,
            "longitude": payload.longitude,
            "time": time,
            data: {
                "time": weatherData.time,
                "precipType": weatherData.precipType,
                "precipAccumulation": weatherData.precipAccumulation,
                "temperatureHigh": weatherData.temperatureHigh,
                "temperatureLow": weatherData.temperatureLow,
                "humidity": weatherData.humidity
            }
        };
    }
};
