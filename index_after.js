'use strict';

const appInsights = require("applicationinsights");
appInsights.setup("TO DO ADD INSTRUMENTATION KEY HERE")
    .setSendLiveMetrics(true)
    .start();


const Hapi = require('@hapi/hapi');

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'Hello World!';
        }
    });

    server.route({
        method: 'GET',
        path: '/random',
        handler: (request, h) => {
            const min = 1;
            const max = 100000;
            const rnd = Math.random() * (max - min) + min;

            return rnd;
        }
    });

    server.route({
        method: 'GET',
        path: '/throw',
        handler: (request, h) => {
            throw new Error("Boom goes the dynamite");
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    
    console.log(err);
    process.exit(1);
});

init();