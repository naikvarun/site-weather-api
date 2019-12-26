const statusRoutes = require('./status');
const lookupRoutes = require('./lookup');
const listRoutes = require('./list-routes');
module.exports = [].concat(statusRoutes, lookupRoutes, listRoutes);
