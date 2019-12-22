const Hapi = require('@hapi/hapi');
const port = process.env.PORT || 3000;
const appRoutes = require('./routes/index');

const server = Hapi.server({port: port});

server.route(appRoutes);

exports.init = async () => {
    await server.initialize();
    return server;
};

exports.start = async () => {
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
    return server;
};


process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});
