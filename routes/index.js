const statusRoutes = require('./status');
const lookupRoutes = require('./lookup');
const listRoutes = require('./list-routes');
const homeRoutes = require('./home-route');
module.exports = [].concat(homeRoutes, statusRoutes, lookupRoutes, listRoutes);
