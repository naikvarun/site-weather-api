const mongoose = require('mongoose');
const {MONGO} = require('../config/config');
mongoose.connect(MONGO.URL, {useNewUrlParser: true, useUnifiedTopology: true});

const Schema = mongoose.Schema;

const WeatherInformation = new Schema({
    id: mongoose.Schema.Types.ObjectId,
    latitude: Number,
    longitude: Number,
    requestedTime: {type: Date},
    data: [{
        time: Number,
        precipType: String,
        precipAccumulation: Number,
        temperatureHigh: Number,
        temperatureLow: Number,
        humidity: Number
    }]
});

const LocationWeather = mongoose.model('LocationWeather', WeatherInformation, MONGO.LOCATION_WEATHER_COLLECTION);

module.exports = {
    save: (weatherData) => {
        const weather = new LocationWeather({...weatherData});
        return weather.save();
    },
    findOne: async (id) => {
        return await LocationWeather.findOne({id: id});
    },
    findAll: async () => {
        return await LocationWeather.find();
    }
};
