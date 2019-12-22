module.exports = {
    APP: {
        MAX_HISTORICAL_DAYS : process.env.MAX_HISTORICAL_DAYS || 14,
        HISTORICAL_DAYS: process.env.HISTORICAL_DAYS || 7
    },
    DARK_SKY : {
        KEY: process.env.DARK_SKY_KEY,
        BASE_URL: process.env.DART_SKY_BASE_URL,
        EXCLUDE: 'exclude=currently, minutely, hourly, alerts, flags'
    },
    MONGO:  {
        URL: process.env.MONGO_URL
    }
};
