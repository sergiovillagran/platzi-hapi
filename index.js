'use strict'

const inert = require('inert');
const Hapi = require('hapi');
const path = require('path');
const handleabars = require('handlebars');
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

        server.route({
            method: 'GET',
            path: '/',
            handler: (req, h) => {
                return h.view('index', 
                    { 
                        title: 'Home'  
                    },
                )
            }
        })
    
        server.route({
            method: 'GET',
            path: '/register',
            handler: (req, h) => {
                return h.view('register', 
                    { 
                        title: 'Register'  
                    },
                )
            }
        })

        server.route({
            method: 'POST',
            path: '/create-user',
            handler: (req, h) => {
                console.log(req.payload);
                return 'Usuario Creado'
            }
        })

        server.route({
            method: 'GET',
            path: '/{param*}',
            handler: {
                directory: {
                    path: '.',
                    index: ['index.html']
                }
            }
        })

        await server.start();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
    console.log(`servidor lanzado en : ${server.info.uri}`);
}

init();
