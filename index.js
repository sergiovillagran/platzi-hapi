'use strict'

const inert = require('inert');
const Hapi = require('@hapi/hapi');
const path = require('path');
const handleabars = require('handlebars');
const routes = require('./routes');
const vision = require('vision');
const site = require('./controllers/site')

const server = Hapi.Server({
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'localhost',
    routes: {
        files: {
            relativeTo: path.join(__dirname, 'public'),
        }
    }
})

async function init () {
    try {
        await server.register(inert);
        await server.register(vision);

        server.state('user', {
            ttl: 1000 * 60 * 60 * 24 * 7,
            isSecure: process.env.NODE_ENV === 'prod',
            encoding: 'base64json',
        })

        server.views({ 
            engines: {
                hbs: handleabars,
            },
            relativeTo: __dirname,
            path: 'views',
            layout: true,
            layoutPath: 'views'
        })

        server.ext('onPreResponse', site.fileNotFound)

        server.route(routes);
        await server.start();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
    console.log(`servidor lanzado en : ${server.info.uri}`);
}

init();

process.on('unhandledRejection', error => console.error('Unhandled rejection', error.message, error))
process.on('uncaughtException', error => console.error('Unhandled rejection', error.message, error))