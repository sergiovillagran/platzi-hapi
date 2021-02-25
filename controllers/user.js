'use strict'

const { users  } = require('../models')
const Boom = require('@hapi/boom')

async function createUser(req, h) {
    let result;
    try {
        result = await users.create(req.payload); 
    } catch (error) {
        console.log(error);
        return h.view('register', {
            title: 'Register',
            error: 'Error creando un usuario'
        });
    }

    return h.view('register', {
        title: 'Register',
        success: 'Usuario creado exitosamente'
    });
}

async function validateUser (req, h) {
    let result;

    try {
        result = await users.validateUser(req.payload);
        if (!result) {
            return h.view('login', {
                title: 'Register',
                error: 'Error on email or password'
            });
        }
    } catch (error) {
        console.log(error);
        return h.view('login', {
            title: 'Register',
            error: 'Problemas validando el usuario'
        });
    }
    return h.redirect('/').state('user', {
        name: result.name,
        email: result.email
    });
}

async function failValidation (req, h, error) {
    const templates = {
        '/create-user': 'register',
        '/validate-user': 'login',
    }
    return h.view(templates[req.path], { 
        title: 'Error de validacion',
        error: 'Por favor complete los campos requeridos'
    }).code(400)
}

module.exports = { 
    createUser,
    validateUser,
    failValidation,
}