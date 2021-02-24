'use strict'

const { users  } = require('../models')
const Boom = require('@hapi/boom')

async function createUser(req, h) {
    let result;
    try {
        result = await users.create(req.payload); 
    } catch (error) {
        console.log(error);
        return h.response('Problemas creando el usuario').code(500);
    }
    return h.response(`usuario creado con id ${result}`);
}

async function validateUser (req, h) {
    let result;

    try {
        result = await users.validateUser(req.payload);
        if (!result) {
            h.response('Error on email or password').code(401);
        }
    } catch (error) {
        console.log(error);
        return h.response('Problemas validando el usuario').code(500)
    }
    return h.redirect('/').state('user', {
        name: result.name,
        email: result.email
    });
}

async function failValidation (req, h, error) {
    return Boom.badRequest('Fallo la validacion', req.payload);
}

module.exports = { 
    createUser,
    validateUser,
    failValidation,
}