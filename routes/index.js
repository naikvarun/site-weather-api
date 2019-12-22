const statusRoutes = require('./status');
const lookupRoutes = require('./lookup');
module.exports = [].concat(statusRoutes, lookupRoutes);
