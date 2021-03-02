'use strict'

const { questions } = require('../models/index')

async function createQuestion (req, h) {
    let result 
    try {
        console.log('fasfasdfasa')
        result = await questions.create(req.payload, req.state.user)
        console.log(`Question created with id ${result}`)
    } catch (error) {
        console.error(error)
        return h.view('ask', { 
            title: 'Crear Pregunta', 
            error: 'Error creando una pregunta' 
        }).code(500).takeover();
    }

    return h.response(`Question created with id ${result}`);
}

async function answerQuestion(req, h) {
    let result
    try {
        result = await questions.answer(req.payload, req.state.user);
        console.log(`Respuesta creada: ${result}`)
    } catch (error) {
        console.log(error);
    }
    return h.redirect(`/question/${req.payload.id}`);
}

module.exports =  {
    createQuestion,
    answerQuestion
}