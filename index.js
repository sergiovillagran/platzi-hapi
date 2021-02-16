'use strict'

const inert = require('inert');
const Hapi = require('hapi');
const path = require('path');
const handleabars = require('handlebars');
const routes = require('./routes');
const vision = require('vision');

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

        server.views({ 
            engines: {
                hbs: handleabars,
            },
            relativeTo: __dirname,
            path: 'views',
            layout: true,
            layoutPath: 'views'
        })

        server.route(routes);
        await server.start();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
    console.log(`servidor lanzado en : ${server.info.uri}`);
}

init();
