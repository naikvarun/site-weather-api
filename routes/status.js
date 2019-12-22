function getStatus() {
    return {
        "message": "ok"
    };
}

module.exports = [{
    method: 'GET',
    path: '/status',
    handler: getStatus
}];
