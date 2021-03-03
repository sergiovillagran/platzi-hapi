'use strict'

const { questions } = require('../models/index')

async function createQuestion (req, h) {
    const { user } = req.state;
    if (!user) {
        return h.redirect('/login')
    }

    let result 
    try {
        console.log('fasfasdfasa')
        result = await questions.create(req.payload, user)
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
    const { user } = req.state;
    if (!user) {
        return h.redirect('/login')
    }

    let result
    try {
        result = await questions.answer(req.payload, user);
        console.log(`Respuesta creada: ${result}`)
    } catch (error) {
        console.log(error);
    }
    return h.redirect(`/question/${req.payload.id}`);
}

async function setAnswerRight(req, h) {
    const { user } = req.state;
    if (!user) {
        return h.redirect('/login')
    }
    const { id, answerId } = req.params;

    let result
    try{
        result = await req.server.methods.setAnswerRight(id, answerId, user );
        console.log(result);
    } catch(error) {
        console.error(error);
    }
    return h.redirect(`/question/${id}`)
}

module.exports =  {
    createQuestion,
    answerQuestion,
    setAnswerRight
}