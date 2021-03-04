'use strict'

const question = require('../models/index').questions

async function setAnswerRight(questionId, answerId, user) {
    let result;
    try {
        result = await question.setAnswerRight(questionId, answerId, user);
    } catch (error) {
        console.error(error)
    }

    return result;
}
async function getLast(amount) {
    let questions; 
    try {
        questions = await question.getLast(10)
    } catch (error) {
        console.error(error);
    }
    console.log('se ejecuto el metodo de get last')
    return questions;
}

module.exports = {
    setAnswerRight,
    getLast,
}