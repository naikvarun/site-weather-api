const LOCATION_SPLITTER = ',';

function getEpochDate(date) {
    return date.getTime() / 1000;
}

function getWeather(request, h) {
    const location = request.params.location;
    let split = location.split(LOCATION_SPLITTER);
    const latitude = Number(split[0]);
    const longitude = Number(split[1]);
    const current = new Date();
    current.setHours(0,0,0,0);
    const time = getEpochDate(current);
    return {
        "latitude": latitude,
        "longitude": longitude,
        "time": time,
        "requestedTime": new Date()
    }
}

module.exports = [
    {method: 'GET', path: '/lookup/{location}', handler: getWeather}
];
