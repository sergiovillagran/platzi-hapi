'use strict'

const { users  } = require('../models')

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
    } catch (error) {
        console.log(error);
        return h.response('Problemas validando el usuario').code(500)
    }
    return result;
}

module.exports = { 
    createUser,
    validateUser,
}