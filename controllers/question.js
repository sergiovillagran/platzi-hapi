'use strict'

const { writeFile, writeFileSync } = require('fs')
const path = require('path');
const uuid = require('uuid').v1
const { questions } = require('../models/index')

async function createQuestion (req, h) {
    const { user } = req.state;
    if (!user) {
        return h.redirect('/login')
    }

    let result, filename
    try {
        if (Buffer.isBuffer(req.payload.image)) {
            filename = `${uuid()}.png`
            writeFileSync(
                path.join(__dirname, '..', 'public', 'uploads', filename),
                req.payload.image
            )
        }
        result = await questions.create(req.payload, user, filename)
        req.log('Info -> question', `Question created with id ${result}`)
    } catch (error) {
        req.log('error', error)
        return h.view('ask', { 
            title: 'Crear Pregunta', 
            error: 'Error creando una pregunta' 
        }).code(500).takeover();
    }

    return h.redirect(`/question/${result}`);
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