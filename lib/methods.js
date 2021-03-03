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

module.exports = {
    setAnswerRight,
}